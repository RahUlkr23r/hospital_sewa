// ==============================================================
// HealthBridge v2.0 — PMID & Pre-Arrival Referral Handoff Service
// ==============================================================

import { sha256 } from './crypto';
import type { 
  Referral, 
  ReferralStatus, 
  ReferralPriority, 
  AuditLog, 
  Patient, 
  DoctorCommunicationNote,
  ReferralAttachedRecord
} from './types';

/**
 * Generates a permanent, unique Patient Medical ID (PMID).
 * Format: PMID-IND-XXXXXXXX (e.g. PMID-IND-8F42K91X)
 */
export function generatePMID(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let randomPart = '';
  for (let i = 0; i < 8; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `PMID-IND-${randomPart}`;
}

/**
 * Retrieve all referrals from localStorage
 */
export function getStoredReferrals(): Referral[] {
  try {
    const raw = localStorage.getItem('hb_referrals');
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to parse hb_referrals:', err);
  }
  return [];
}

/**
 * Save referrals to localStorage
 */
export function saveReferrals(referrals: Referral[]): void {
  localStorage.setItem('hb_referrals', JSON.stringify(referrals));
}

/**
 * Look up a patient by their unique PMID or patient ID
 */
export function findPatientByPMID(pmid: string): Patient | null {
  try {
    const patients: Patient[] = JSON.parse(localStorage.getItem('hb_patients') || '[]');
    const cleanPMID = pmid.trim().toUpperCase();
    return patients.find(p => (p.pmid && p.pmid.toUpperCase() === cleanPMID) || p.id === cleanPMID) || null;
  } catch {
    return null;
  }
}

/**
 * Create a new hospital referral
 */
export function createReferral(data: {
  patient: Patient;
  fromHospitalId: string;
  fromHospitalName: string;
  fromDoctorId: string;
  fromDoctorName: string;
  fromDoctorContact?: string;
  fromEmergencyPhone?: string;
  toHospitalId: string;
  toHospitalName: string;
  priority: ReferralPriority;
  reason: string;
  doctorNotes: string;
  treatmentProvided: string;
  medicationAdministered: string;
  importantWarnings: string[];
  attachedReports: ReferralAttachedRecord[];
  expectedArrivalMinutes: number;
  latestVitals: {
    bp: string;
    pulse: number;
    spo2: number;
    temp: number;
    respRate?: number;
  };
}): Referral {
  const now = new Date().toISOString();
  const referralId = `ref-${Date.now()}`;
  const pmid = data.patient.pmid || generatePMID();

  const newReferral: Referral = {
    id: referralId,
    pmid: pmid,
    patientId: data.patient.id,
    patientName: data.patient.name,
    patientAge: data.patient.age,
    patientGender: data.patient.gender,
    bloodGroup: data.patient.bloodGroup,
    fromHospitalId: data.fromHospitalId,
    fromHospitalName: data.fromHospitalName,
    fromDoctorId: data.fromDoctorId,
    fromDoctorName: data.fromDoctorName,
    fromDoctorContact: data.fromDoctorContact || '+91-9876543210',
    fromEmergencyPhone: data.fromEmergencyPhone || '108 / +91-22-26815000',
    toHospitalId: data.toHospitalId,
    toHospitalName: data.toHospitalName,
    priority: data.priority,
    status: 'SENT',
    reason: data.reason,
    knownConditions: (data.patient.diseases || []).map(d => d.name),
    allergies: data.patient.allergies || [],
    currentMedications: (data.patient.medications || []).filter(m => m.active).map(m => `${m.name} (${m.dosage})`),
    latestVitals: data.latestVitals,
    treatmentProvided: data.treatmentProvided,
    medicationAdministered: data.medicationAdministered,
    importantWarnings: data.importantWarnings,
    doctorNotes: data.doctorNotes,
    attachedReports: data.attachedReports,
    expectedArrivalMinutes: data.expectedArrivalMinutes,
    date: now,
    createdAt: now,
    updatedAt: now,
    timeline: [
      {
        status: 'CREATED',
        timestamp: now,
        actor: `${data.fromDoctorName} (${data.fromHospitalName})`,
        note: 'Referral handoff package initiated'
      },
      {
        status: 'SENT',
        timestamp: now,
        actor: 'HealthBridge Pre-Arrival Dispatch System',
        note: `Dispatched to ${data.toHospitalName} with priority: ${data.priority}`
      }
    ],
    communicationLog: [
      {
        id: `com-${Date.now()}`,
        senderDoctorId: data.fromDoctorId,
        senderDoctorName: data.fromDoctorName,
        senderHospitalName: data.fromHospitalName,
        timestamp: now,
        message: `Referral initiated. Patient ${data.patient.name} (${pmid}) en-route with priority: ${data.priority}. Please prepare ER/ICU.`,
        urgent: data.priority === 'CRITICAL' || data.priority === 'EMERGENCY'
      }
    ]
  };

  const referrals = getStoredReferrals();
  referrals.unshift(newReferral);
  saveReferrals(referrals);

  // Add audit log entry
  appendAuditLogEntry({
    patientId: data.patient.id,
    patientName: data.patient.name,
    actorId: data.fromDoctorId,
    actorName: data.fromDoctorName,
    actorRole: 'doctor',
    action: `Hospital Referral Dispatched [${data.priority}]`,
    accessReason: `Referral to ${data.toHospitalName}`,
    details: `Reason: ${data.reason}. Sent to ${data.toHospitalName}. ETA: ${data.expectedArrivalMinutes} mins.`,
    hospitalName: data.fromHospitalName,
  });

  return newReferral;
}

/**
 * Advance referral through the state machine
 */
export function updateReferralStatus(
  referralId: string, 
  newStatus: ReferralStatus, 
  actor: string, 
  note?: string
): Referral | null {
  const referrals = getStoredReferrals();
  const index = referrals.findIndex(r => r.id === referralId);
  if (index === -1) return null;

  const now = new Date().toISOString();
  const referral = { ...referrals[index] };
  referral.status = newStatus;
  referral.updatedAt = now;

  referral.timeline.push({
    status: newStatus,
    timestamp: now,
    actor: actor,
    note: note || `Status updated to ${newStatus}`
  });

  referrals[index] = referral;
  saveReferrals(referrals);

  // Log state transition to audit trail
  appendAuditLogEntry({
    patientId: referral.patientId,
    patientName: referral.patientName,
    actorId: 'doc-action',
    actorName: actor,
    actorRole: 'doctor',
    action: `Referral Status: ${newStatus}`,
    accessReason: `Handoff Transition (${referral.fromHospitalName} -> ${referral.toHospitalName})`,
    details: note || `Referral transitioned to ${newStatus}`,
    hospitalName: referral.toHospitalName,
  });

  return referral;
}

/**
 * Add a doctor communication message to the referral thread
 */
export function addDoctorCommunication(
  referralId: string,
  message: string,
  senderDoctorId: string,
  senderDoctorName: string,
  senderHospitalName: string,
  urgent: boolean = false
): DoctorCommunicationNote | null {
  const referrals = getStoredReferrals();
  const index = referrals.findIndex(r => r.id === referralId);
  if (index === -1) return null;

  const newMsg: DoctorCommunicationNote = {
    id: `com-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    senderDoctorId,
    senderDoctorName,
    senderHospitalName,
    timestamp: new Date().toISOString(),
    message,
    urgent
  };

  referrals[index].communicationLog = referrals[index].communicationLog || [];
  referrals[index].communicationLog.push(newMsg);
  referrals[index].updatedAt = new Date().toISOString();

  saveReferrals(referrals);
  return newMsg;
}

/**
 * Break-glass emergency override access logger
 */
export function executeBreakGlassAccess(params: {
  patient: Patient;
  doctorName: string;
  hospitalName: string;
  reason: string;
}): AuditLog {
  const log = appendAuditLogEntry({
    patientId: params.patient.id,
    patientName: params.patient.name,
    actorId: 'emergency-doc',
    actorName: params.doctorName,
    actorRole: 'doctor',
    action: '🚨 EMERGENCY BREAK-GLASS OVERRIDE',
    accessReason: params.reason,
    details: `Full medical history & genomic markers unlocked under Emergency Trauma Protocol without explicit biometric/OTP consent. Patient PMID: ${params.patient.pmid || params.patient.id}.`,
    hospitalName: params.hospitalName,
  });

  return log;
}

/**
 * Appends a record to the cryptographic blockchain audit log in localStorage
 */
export function appendAuditLogEntry(entry: {
  patientId: string;
  patientName: string;
  actorId: string;
  actorName: string;
  actorRole: 'doctor' | 'patient' | 'government' | 'admin';
  action: string;
  accessReason: string;
  details: string;
  hospitalName?: string;
}): AuditLog {
  try {
    const logs: AuditLog[] = JSON.parse(localStorage.getItem('hb_audit_logs') || '[]');
    const prevHash = logs.length > 0 ? logs[logs.length - 1].blockchainHash : '0000000000000000000000000000000000000000000000000000000000000000';
    const timestamp = new Date().toISOString();
    const blockData = `${entry.patientId}|${entry.actorId}|${entry.action}|${timestamp}|${prevHash}`;
    const hash = sha256(blockData);

    const newLog: AuditLog = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      patientId: entry.patientId,
      patientName: entry.patientName,
      actorId: entry.actorId,
      actorName: entry.actorName,
      actorRole: entry.actorRole,
      action: entry.action,
      timestamp,
      blockchainHash: hash,
      previousHash: prevHash,
      isTampered: false,
      accessReason: entry.accessReason,
      details: entry.details,
      hospitalName: entry.hospitalName,
    };

    logs.push(newLog);
    localStorage.setItem('hb_audit_logs', JSON.stringify(logs));
    return newLog;
  } catch (err) {
    console.error('Failed to append audit log:', err);
    return {
      id: `audit-${Date.now()}`,
      patientId: entry.patientId,
      patientName: entry.patientName,
      actorId: entry.actorId,
      actorName: entry.actorName,
      actorRole: entry.actorRole,
      action: entry.action,
      timestamp: new Date().toISOString(),
      blockchainHash: 'simulated-hash',
      previousHash: '000000',
      isTampered: false,
      accessReason: entry.accessReason,
      details: entry.details,
      hospitalName: entry.hospitalName
    };
  }
}
