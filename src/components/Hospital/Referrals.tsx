import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck,
  FileDown,
  FileText,
  HeartPulse,
  Hospital as HospitalIcon,
  MessageSquare,
  PhoneCall,
  PlusCircle,
  RefreshCw,
  Send,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  UserCheck,
  Users,
  Activity,
  AlertOctagon,
  X,
  Sparkles,
  QrCode,
  Lock,
  Unlock,
} from 'lucide-react';
import toast from 'react-hot-toast';
import type { 
  Referral, 
  ReferralPriority, 
  ReferralStatus, 
  Patient, 
  Hospital as HospitalType, 
  Doctor, 
  ReferralAttachedRecord 
} from '../../utils/types';
import { 
  getStoredReferrals, 
  saveReferrals, 
  createReferral, 
  updateReferralStatus, 
  addDoctorCommunication, 
  executeBreakGlassAccess 
} from '../../utils/pmidService';

const PIPELINE_STEPS: ReferralStatus[] = [
  'CREATED',
  'SENT',
  'RECEIVED',
  'ACCEPTED',
  'PREPARING',
  'PATIENT ARRIVED',
  'ADMITTED',
  'COMPLETED',
];

export default function Referrals() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [activeTab, setActiveTab] = useState<'incoming' | 'outgoing' | 'all'>('incoming');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  
  // Modals
  const [showReferModal, setShowReferModal] = useState(false);
  const [showBreakGlassModal, setShowBreakGlassModal] = useState(false);
  const [showDocCommsModal, setShowDocCommsModal] = useState(false);
  const [viewingDocument, setViewingDocument] = useState<ReferralAttachedRecord | null>(null);

  // Communication message draft
  const [docMessageDraft, setDocMessageDraft] = useState('');
  const [isUrgentMsg, setIsUrgentMsg] = useState(false);

  // Audio alert toggle
  const [audioAlertActive, setAudioAlertActive] = useState(true);

  // Available data from localStorage
  const [patients, setPatients] = useState<Patient[]>([]);
  const [hospitals, setHospitals] = useState<HospitalType[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  // Current Logged-in doctor / hospital context
  const currentHospitalName = 'Apollo Multispeciality Hospital';
  const currentHospitalId = 'hosp-1';
  const currentDoctorName = 'Dr. Priya Sharma';
  const currentDoctorId = 'doc-1';

  // Referral creation wizard state
  const [wizardStep, setWizardStep] = useState(1);
  const [referralForm, setReferralForm] = useState({
    selectedPatientId: '',
    toHospitalId: 'hosp-2',
    priority: 'CRITICAL' as ReferralPriority,
    reason: '',
    expectedArrivalMinutes: 20,
    bp: '130/85',
    pulse: 110,
    spo2: 88,
    temp: 99.8,
    respRate: 26,
    treatmentProvided: '',
    medicationAdministered: '',
    importantWarnings: '',
    doctorNotes: '',
    attachReports: true,
  });

  // Break-glass modal state
  const [breakGlassForm, setBreakGlassForm] = useState({
    pmid: '',
    reason: 'Unconscious Trauma Patient - Severe Hypoxemia / Cardiac Emergency',
    confirmConsentBypass: false,
  });

  const loadData = () => {
    const refs = getStoredReferrals();
    setReferrals(refs);
    if (!selectedReferral && refs.length > 0) {
      // Pick first critical incoming referral if available
      const criticalIncoming = refs.find(r => r.toHospitalId === currentHospitalId && (r.priority === 'CRITICAL' || r.priority === 'EMERGENCY'));
      setSelectedReferral(criticalIncoming || refs[0]);
    } else if (selectedReferral) {
      const updated = refs.find(r => r.id === selectedReferral.id);
      if (updated) setSelectedReferral(updated);
    }

    try {
      setPatients(JSON.parse(localStorage.getItem('hb_patients') || '[]'));
      setHospitals(JSON.parse(localStorage.getItem('hb_hospitals') || '[]'));
      setDoctors(JSON.parse(localStorage.getItem('hb_doctors') || '[]'));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter referrals based on tab and priority
  const incomingReferrals = referrals.filter(r => r.toHospitalId === currentHospitalId);
  const outgoingReferrals = referrals.filter(r => r.fromHospitalId === currentHospitalId);

  const displayedReferrals = (activeTab === 'incoming' 
    ? incomingReferrals 
    : activeTab === 'outgoing' 
    ? outgoingReferrals 
    : referrals
  ).filter(r => priorityFilter === 'ALL' || r.priority === priorityFilter);

  // Critical incoming alerts pending acceptance or arrival
  const activeCriticalAlerts = incomingReferrals.filter(
    r => (r.priority === 'CRITICAL' || r.priority === 'EMERGENCY') && 
         (r.status === 'SENT' || r.status === 'RECEIVED' || r.status === 'ACCEPTED' || r.status === 'PREPARING')
  );

  const handleAdvanceStatus = (targetStatus: ReferralStatus) => {
    if (!selectedReferral) return;
    const updated = updateReferralStatus(
      selectedReferral.id,
      targetStatus,
      `${currentDoctorName} (${currentHospitalName})`,
      `Status transitioned to ${targetStatus} by receiving care team.`
    );
    if (updated) {
      setSelectedReferral(updated);
      loadData();
      toast.success(`Referral status updated to ${targetStatus}`);
    }
  };

  const handleSendDocMessage = () => {
    if (!selectedReferral || !docMessageDraft.trim()) return;
    addDoctorCommunication(
      selectedReferral.id,
      docMessageDraft.trim(),
      currentDoctorId,
      currentDoctorName,
      currentHospitalName,
      isUrgentMsg
    );
    setDocMessageDraft('');
    setIsUrgentMsg(false);
    loadData();
    toast.success('Handoff note sent to referring doctor');
  };

  const handleCreateReferralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === referralForm.selectedPatientId);
    const targetHosp = hospitals.find(h => h.id === referralForm.toHospitalId);

    if (!patient || !targetHosp) {
      toast.error('Please select both a patient and destination hospital');
      return;
    }

    const attachedReportsList: ReferralAttachedRecord[] = [];
    if (referralForm.attachReports && patient.labReports) {
      patient.labReports.forEach(lr => {
        attachedReportsList.push({
          id: `att-${lr.id}`,
          title: lr.testName,
          type: 'lab_report',
          date: lr.date,
          fileSize: '1.4 MB',
          summary: lr.interpretation,
        });
      });
    }

    const warningsArray = referralForm.importantWarnings
      ? referralForm.importantWarnings.split('\n').filter(w => w.trim().length > 0)
      : patient.allergies.map(a => `ALLERGY ALERT: ${a}`);

    const newRef = createReferral({
      patient,
      fromHospitalId: currentHospitalId,
      fromHospitalName: currentHospitalName,
      fromDoctorId: currentDoctorId,
      fromDoctorName: currentDoctorName,
      fromDoctorContact: '+91-98765-43210',
      fromEmergencyPhone: '108 / +91-22-26815000',
      toHospitalId: targetHosp.id,
      toHospitalName: targetHosp.name,
      priority: referralForm.priority,
      reason: referralForm.reason || 'Tertiary emergency and specialized care',
      doctorNotes: referralForm.doctorNotes || 'Transferring patient for tertiary medical stabilization.',
      treatmentProvided: referralForm.treatmentProvided || 'Supplemental oxygen and intravenous hydration.',
      medicationAdministered: referralForm.medicationAdministered || 'None prior to transport.',
      importantWarnings: warningsArray,
      attachedReports: attachedReportsList,
      expectedArrivalMinutes: Number(referralForm.expectedArrivalMinutes) || 20,
      latestVitals: {
        bp: referralForm.bp || '120/80',
        pulse: Number(referralForm.pulse) || 80,
        spo2: Number(referralForm.spo2) || 98,
        temp: Number(referralForm.temp) || 98.6,
        respRate: Number(referralForm.respRate) || 18,
      },
    });

    toast.success(`Emergency referral dispatched to ${targetHosp.name}!`);
    setShowReferModal(false);
    setWizardStep(1);
    loadData();
    setSelectedReferral(newRef);
    setActiveTab('outgoing');
  };

  const handleBreakGlassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!breakGlassForm.confirmConsentBypass) {
      toast.error('You must certify clinical emergency necessity to break glass');
      return;
    }

    const cleanPMID = breakGlassForm.pmid.trim().toUpperCase();
    const matchedPatient = patients.find(
      p => (p.pmid && p.pmid.toUpperCase() === cleanPMID) || p.id.toUpperCase() === cleanPMID
    );

    if (!matchedPatient) {
      toast.error(`No patient record found matching PMID: ${cleanPMID}`);
      return;
    }

    executeBreakGlassAccess({
      patient: matchedPatient,
      doctorName: currentDoctorName,
      hospitalName: currentHospitalName,
      reason: breakGlassForm.reason,
    });

    toast.success(`BREAK-GLASS SUCCESS: Records unlocked & logged to Blockchain Audit Trail.`);
    setShowBreakGlassModal(false);
    
    // If there is an active referral for this patient, select it
    const activeRef = referrals.find(r => r.pmid.toUpperCase() === cleanPMID || r.patientId === matchedPatient.id);
    if (activeRef) {
      setSelectedReferral(activeRef);
    }
  };

  const getPriorityBadgeClass = (priority: ReferralPriority) => {
    switch (priority) {
      case 'CRITICAL':
        return 'bg-red-500/20 text-red-500 border border-red-500/40 animate-pulse';
      case 'EMERGENCY':
        return 'bg-orange-500/20 text-orange-500 border border-orange-500/40';
      case 'URGENT':
        return 'bg-amber-500/20 text-amber-500 border border-amber-500/40';
      default:
        return 'bg-blue-500/20 text-blue-500 border border-blue-500/40';
    }
  };

  const getStatusBadgeClass = (status: ReferralStatus) => {
    switch (status) {
      case 'CREATED':
      case 'SENT':
        return 'bg-amber-500/10 text-amber-500 border border-amber-500/20';
      case 'RECEIVED':
        return 'bg-blue-500/10 text-blue-500 border border-blue-500/20 animate-pulse';
      case 'ACCEPTED':
      case 'PREPARING':
        return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
      case 'PATIENT ARRIVED':
        return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
      case 'ADMITTED':
      case 'COMPLETED':
        return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400';
    }
  };

  const calculateStepIndex = (status: ReferralStatus): number => {
    const idx = PIPELINE_STEPS.indexOf(status);
    return idx === -1 ? 0 : idx;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner & Emergency Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 glass-card p-6 border-l-4 border-l-blue-500">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <HospitalIcon size={24} />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                Hospital Referral & Pre-Arrival Medical Handoff
              </h1>
              <p className="text-xs text-[var(--text-muted)] flex items-center gap-2">
                <span>Facility: <strong>{currentHospitalName}</strong></span>
                <span>•</span>
                <span>Doctor: <strong>{currentDoctorName}</strong></span>
                <span>•</span>
                <span className="text-emerald-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Real-time Handoff Sync Active
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              if (patients.length > 0) {
                setReferralForm(prev => ({ ...prev, selectedPatientId: patients[0].id }));
              }
              setShowReferModal(true);
            }}
            className="btn-primary flex items-center gap-2 px-4 py-2 text-sm font-semibold shadow-lg shadow-blue-500/20"
          >
            <PlusCircle size={18} />
            <span>Refer Patient</span>
          </button>

          <button
            onClick={() => setShowBreakGlassModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 transition-colors"
          >
            <ShieldAlert size={18} />
            <span>Break-Glass Override</span>
          </button>

          <button
            onClick={loadData}
            title="Refresh Referrals"
            className="p-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] transition-colors"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* EMERGENCY PRE-ARRIVAL ALERT BANNER (Matching exact user specification) */}
      {activeCriticalAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-950/80 via-red-900/40 to-slate-900 border-2 border-red-500/80 p-6 shadow-2xl shadow-red-500/20 text-white"
        >
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 border-b border-red-500/30 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-red-600/30 border border-red-500 animate-bounce">
                <AlertOctagon size={28} className="text-red-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-red-600 font-bold tracking-widest">
                    🚨 INCOMING PRE-ARRIVAL EMERGENCY
                  </span>
                  <span className="text-xs text-red-300 font-mono">
                    Priority: <strong>{activeCriticalAlerts[0].priority}</strong>
                  </span>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white mt-1">
                  {activeCriticalAlerts[0].reason}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-red-950/60 border border-red-500/40 rounded-xl px-4 py-2">
              <Clock className="text-red-400 animate-pulse" size={20} />
              <div>
                <p className="text-[10px] uppercase text-red-300 font-bold">Estimated Physical Arrival</p>
                <p className="text-lg font-mono font-bold text-white">
                  ~{activeCriticalAlerts[0].expectedArrivalMinutes} Minutes
                </p>
              </div>
            </div>
          </div>

          {/* Key Summary Line */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-sm bg-black/30 p-3 rounded-xl border border-red-500/20">
            <div>
              <p className="text-xs text-red-300 font-medium">Patient Medical ID</p>
              <p className="font-mono font-bold text-white text-base">{activeCriticalAlerts[0].pmid}</p>
            </div>
            <div>
              <p className="text-xs text-red-300 font-medium">Patient Name / Demographics</p>
              <p className="font-bold text-white">{activeCriticalAlerts[0].patientName}, {activeCriticalAlerts[0].patientAge}y ({activeCriticalAlerts[0].patientGender})</p>
            </div>
            <div>
              <p className="text-xs text-red-300 font-medium">Blood Group</p>
              <p className="font-bold text-red-400 text-lg">{activeCriticalAlerts[0].bloodGroup}</p>
            </div>
            <div>
              <p className="text-xs text-red-300 font-medium">Referral From</p>
              <p className="font-bold text-white truncate">{activeCriticalAlerts[0].fromHospitalName}</p>
            </div>
          </div>

          {/* Fast Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="text-xs text-red-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              <span>ALS Ambulance En-Route • Critical Trauma Protocol Active</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedReferral(activeCriticalAlerts[0]);
                  setShowDocCommsModal(true);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/20"
              >
                <PhoneCall size={14} />
                <span>Contact Referring Doctor</span>
              </button>

              {activeCriticalAlerts[0].status === 'SENT' || activeCriticalAlerts[0].status === 'RECEIVED' ? (
                <button
                  onClick={() => {
                    setSelectedReferral(activeCriticalAlerts[0]);
                    handleAdvanceStatus('ACCEPTED');
                  }}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 transition-all"
                >
                  <CheckCircle2 size={14} />
                  <span>ACCEPT REFERRAL</span>
                </button>
              ) : activeCriticalAlerts[0].status === 'ACCEPTED' ? (
                <button
                  onClick={() => {
                    setSelectedReferral(activeCriticalAlerts[0]);
                    handleAdvanceStatus('PREPARING');
                  }}
                  className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center gap-1.5 transition-all"
                >
                  <HeartPulse size={14} />
                  <span>PREPARE TRAUMA BAY / ICU</span>
                </button>
              ) : activeCriticalAlerts[0].status === 'PREPARING' ? (
                <button
                  onClick={() => {
                    setSelectedReferral(activeCriticalAlerts[0]);
                    handleAdvanceStatus('PATIENT ARRIVED');
                  }}
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-1.5 transition-all"
                >
                  <UserCheck size={14} />
                  <span>CONFIRM PATIENT ARRIVAL</span>
                </button>
              ) : null}

              <button
                onClick={() => setSelectedReferral(activeCriticalAlerts[0])}
                className="px-3 py-1.5 rounded-lg bg-red-600/50 hover:bg-red-600 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <span>View Full Handoff</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Grid: Left List (35%) & Right Detailed Pre-Arrival Handoff (65%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Tabs & Referral Directory */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card p-4 space-y-3">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-[var(--bg-secondary)] p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('incoming')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'incoming'
                    ? 'bg-[var(--bg-card)] text-blue-500 shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>Incoming</span>
                {incomingReferrals.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-blue-500 text-white text-[10px]">
                    {incomingReferrals.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('outgoing')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'outgoing'
                    ? 'bg-[var(--bg-card)] text-blue-500 shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>Outgoing</span>
                {outgoingReferrals.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-slate-500 text-white text-[10px]">
                    {outgoingReferrals.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('all')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'all'
                    ? 'bg-[var(--bg-card)] text-blue-500 shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>All History</span>
              </button>
            </div>

            {/* Priority Filters */}
            <div className="flex items-center gap-1 overflow-x-auto text-[11px] pb-1">
              {['ALL', 'CRITICAL', 'EMERGENCY', 'URGENT', 'NORMAL'].map(p => (
                <button
                  key={p}
                  onClick={() => setPriorityFilter(p)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    priorityFilter === p
                      ? 'bg-blue-500 text-white font-semibold'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Referral Cards List */}
          <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
            {displayedReferrals.length === 0 ? (
              <div className="glass-card p-8 text-center text-[var(--text-muted)]">
                <Users size={36} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm font-medium">No referrals match current filters</p>
              </div>
            ) : (
              displayedReferrals.map(referral => {
                const isSelected = selectedReferral?.id === referral.id;
                const isIncoming = referral.toHospitalId === currentHospitalId;

                return (
                  <div
                    key={referral.id}
                    onClick={() => setSelectedReferral(referral)}
                    className={`glass-card p-4 cursor-pointer transition-all border-l-4 hover:border-l-blue-500 relative ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-500/5 shadow-md' 
                        : 'border-l-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${getPriorityBadgeClass(referral.priority)}`}>
                            {referral.priority}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusBadgeClass(referral.status)}`}>
                            {referral.status}
                          </span>
                        </div>
                        <h3 className="font-bold text-[var(--text-primary)] text-base mt-1">
                          {referral.patientName}
                        </h3>
                        <p className="font-mono text-xs text-blue-500 font-semibold">{referral.pmid}</p>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-xs font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded">
                          {referral.bloodGroup}
                        </span>
                        <p className="text-[10px] text-[var(--text-muted)] mt-1">
                          {new Date(referral.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-[var(--text-secondary)] line-clamp-1 mb-2 font-medium">
                      {referral.reason}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] border-t border-[var(--border-color)] pt-2 mt-2">
                      <span className="truncate max-w-[180px]">
                        {isIncoming ? `From: ${referral.fromHospitalName}` : `To: ${referral.toHospitalName}`}
                      </span>
                      {referral.expectedArrivalMinutes > 0 && referral.status !== 'COMPLETED' && (
                        <span className="text-blue-500 font-semibold flex items-center gap-1">
                          <Clock size={12} /> ETA ~{referral.expectedArrivalMinutes}m
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Pre-Arrival Clinical Handoff Dossier */}
        <div className="lg:col-span-7">
          {selectedReferral ? (
            <div className="space-y-6">
              
              {/* Header Card with State Machine Pipeline */}
              <div className="glass-card p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase ${getPriorityBadgeClass(selectedReferral.priority)}`}>
                        {selectedReferral.priority} PRIORITY
                      </span>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${getStatusBadgeClass(selectedReferral.status)}`}>
                        {selectedReferral.status}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                      {selectedReferral.patientName}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[var(--text-muted)]">Permanent Medical ID:</span>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/30">
                        {selectedReferral.pmid}
                      </span>
                      <span className="badge-success text-[10px] px-1.5 py-0.2 flex items-center gap-0.5">
                        <ShieldCheck size={12} /> Verified
                      </span>
                    </div>
                  </div>

                  {/* Top action controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowDocCommsModal(true)}
                      className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5 font-semibold"
                    >
                      <MessageSquare size={16} className="text-blue-500" />
                      <span>Doctor Notes ({selectedReferral.communicationLog?.length || 0})</span>
                    </button>

                    <button
                      onClick={() => {
                        const tel = selectedReferral.fromEmergencyPhone || selectedReferral.fromDoctorContact;
                        toast(`Emergency Contact: ${tel}`, { icon: '📞' });
                      }}
                      className="p-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-card)] border border-[var(--border-color)] text-emerald-500"
                      title="Call Referring Doctor"
                    >
                      <PhoneCall size={18} />
                    </button>
                  </div>
                </div>

                {/* VISUAL 8-STAGE STATE MACHINE TRACKER */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">
                      Referral State Machine Progress
                    </h4>
                    <span className="text-xs font-semibold text-blue-500">
                      Stage {calculateStepIndex(selectedReferral.status) + 1} of {PIPELINE_STEPS.length}
                    </span>
                  </div>

                  {/* Stepper Bar */}
                  <div className="relative flex items-center justify-between">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[var(--bg-secondary)] -z-0 rounded-full" />
                    <div 
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 -z-0 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(calculateStepIndex(selectedReferral.status) / (PIPELINE_STEPS.length - 1)) * 100}%` 
                      }}
                    />

                    {PIPELINE_STEPS.map((step, idx) => {
                      const currentIdx = calculateStepIndex(selectedReferral.status);
                      const isPast = idx < currentIdx;
                      const isCurrent = idx === currentIdx;

                      return (
                        <div key={step} className="flex flex-col items-center group relative z-10">
                          <button
                            onClick={() => handleAdvanceStatus(step)}
                            title={`Transition to ${step}`}
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                              isPast
                                ? 'bg-blue-500 text-white shadow-sm'
                                : isCurrent
                                ? 'bg-blue-600 text-white ring-4 ring-blue-500/20 animate-pulse'
                                : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border-color)] hover:border-blue-500'
                            }`}
                          >
                            {isPast ? <CheckCircle2 size={14} /> : idx + 1}
                          </button>
                          <span className={`text-[9px] mt-1 font-semibold whitespace-nowrap hidden sm:block ${
                            isCurrent ? 'text-blue-500' : 'text-[var(--text-muted)]'
                          }`}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Stage Transition Buttons */}
                  <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-[var(--border-color)]">
                    <span className="text-xs text-[var(--text-muted)] mr-2 font-medium">Quick Advance:</span>
                    {selectedReferral.status === 'SENT' && (
                      <button
                        onClick={() => handleAdvanceStatus('RECEIVED')}
                        className="btn-secondary text-xs py-1 px-3"
                      >
                        Mark Received
                      </button>
                    )}
                    {(selectedReferral.status === 'SENT' || selectedReferral.status === 'RECEIVED') && (
                      <button
                        onClick={() => handleAdvanceStatus('ACCEPTED')}
                        className="btn-primary text-xs py-1 px-3 bg-emerald-600 hover:bg-emerald-500"
                      >
                        Accept Referral
                      </button>
                    )}
                    {selectedReferral.status === 'ACCEPTED' && (
                      <button
                        onClick={() => handleAdvanceStatus('PREPARING')}
                        className="btn-primary text-xs py-1 px-3 bg-purple-600 hover:bg-purple-500"
                      >
                        Team Preparing ER/ICU
                      </button>
                    )}
                    {selectedReferral.status === 'PREPARING' && (
                      <button
                        onClick={() => handleAdvanceStatus('PATIENT ARRIVED')}
                        className="btn-primary text-xs py-1 px-3 bg-blue-600 hover:bg-blue-500"
                      >
                        Patient Arrived at Facility
                      </button>
                    )}
                    {selectedReferral.status === 'PATIENT ARRIVED' && (
                      <button
                        onClick={() => handleAdvanceStatus('ADMITTED')}
                        className="btn-primary text-xs py-1 px-3 bg-emerald-600 hover:bg-emerald-500"
                      >
                        Admit to Ward / ICU
                      </button>
                    )}
                    {selectedReferral.status === 'ADMITTED' && (
                      <button
                        onClick={() => handleAdvanceStatus('COMPLETED')}
                        className="btn-secondary text-xs py-1 px-3"
                      >
                        Complete Case
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Pre-Arrival Clinical Handoff Metrics & Vitals Card */}
              <div className="glass-card p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <Activity className="text-red-500" />
                    <span>Pre-Arrival Critical Vitals & Symptoms</span>
                  </h3>
                  <span className="text-xs text-[var(--text-muted)]">
                    Recorded by {selectedReferral.fromDoctorName}
                  </span>
                </div>

                {/* Vitals Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-center">
                    <p className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Blood Pressure</p>
                    <p className="text-lg font-mono font-bold text-[var(--text-primary)] mt-1">
                      {selectedReferral.latestVitals.bp}
                    </p>
                    <span className="text-[10px] text-amber-500">mmHg</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-center">
                    <p className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Heart Rate / Pulse</p>
                    <p className={`text-lg font-mono font-bold mt-1 ${
                      selectedReferral.latestVitals.pulse > 100 ? 'text-red-500' : 'text-emerald-500'
                    }`}>
                      {selectedReferral.latestVitals.pulse}
                    </p>
                    <span className="text-[10px] text-[var(--text-muted)]">bpm</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-center">
                    <p className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Oxygen (SpO₂)</p>
                    <p className={`text-lg font-mono font-bold mt-1 ${
                      selectedReferral.latestVitals.spo2 < 90 ? 'text-red-500 animate-pulse' : 'text-emerald-500'
                    }`}>
                      {selectedReferral.latestVitals.spo2}%
                    </p>
                    <span className="text-[10px] text-red-500 font-bold">
                      {selectedReferral.latestVitals.spo2 < 90 ? 'Hypoxic' : 'Normal'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-center">
                    <p className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Temperature</p>
                    <p className="text-lg font-mono font-bold text-[var(--text-primary)] mt-1">
                      {selectedReferral.latestVitals.temp}°F
                    </p>
                    <span className="text-[10px] text-[var(--text-muted)]">Oral</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-center">
                    <p className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Resp Rate</p>
                    <p className="text-lg font-mono font-bold text-[var(--text-primary)] mt-1">
                      {selectedReferral.latestVitals.respRate || 24}
                    </p>
                    <span className="text-[10px] text-[var(--text-muted)]">breaths/min</span>
                  </div>
                </div>

                {/* Important Clinical Warnings */}
                {selectedReferral.importantWarnings && selectedReferral.importantWarnings.length > 0 && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 space-y-2">
                    <h4 className="text-xs font-bold uppercase text-red-500 flex items-center gap-1.5">
                      <AlertTriangle size={16} />
                      <span>Pre-Arrival Safety Warnings & Critical Hazards</span>
                    </h4>
                    <ul className="space-y-1">
                      {selectedReferral.importantWarnings.map((warn, i) => (
                        <li key={i} className="text-xs text-red-400 font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <span>{warn}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Clinical Handoff Details: Known Conditions, Allergies, Meds */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]">
                    <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase mb-2">
                      Known Conditions
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedReferral.knownConditions.map(c => (
                        <span key={c} className="text-[11px] px-2 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]">
                    <h4 className="text-xs font-bold text-red-400 uppercase mb-2">
                      Confirmed Allergies
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedReferral.allergies.map(a => (
                        <span key={a} className="badge-danger text-[11px] px-2 py-0.5">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]">
                    <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase mb-2">
                      Active Medications
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedReferral.currentMedications.map(m => (
                        <span key={m} className="text-[11px] px-2 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)]">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Treatment Administered & Doctor Notes */}
                <div className="space-y-3 pt-2">
                  <div>
                    <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase mb-1">
                      Pre-Transfer Treatment Provided & Medication Administered:
                    </h4>
                    <p className="text-xs text-[var(--text-primary)] p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] leading-relaxed">
                      {selectedReferral.treatmentProvided} {selectedReferral.medicationAdministered && `| ${selectedReferral.medicationAdministered}`}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase mb-1">
                      Doctor Clinical Notes & Handoff Summary:
                    </h4>
                    <p className="text-xs text-[var(--text-primary)] p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] leading-relaxed">
                      {selectedReferral.doctorNotes}
                    </p>
                  </div>
                </div>

                {/* Attached Medical Reports & Scans */}
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase mb-2 flex items-center gap-1.5">
                    <FileText size={14} />
                    <span>Attached Medical Records & Scans ({selectedReferral.attachedReports?.length || 0})</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedReferral.attachedReports && selectedReferral.attachedReports.length > 0 ? (
                      selectedReferral.attachedReports.map(rep => (
                        <div
                          key={rep.id}
                          onClick={() => setViewingDocument(rep)}
                          className="p-3 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-blue-500 cursor-pointer transition-all flex flex-col justify-between"
                        >
                          <div>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 uppercase">
                              {rep.type}
                            </span>
                            <h5 className="font-semibold text-xs text-[var(--text-primary)] mt-1.5 line-clamp-2">
                              {rep.title}
                            </h5>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] mt-2 pt-2 border-t border-[var(--border-color)]">
                            <span>{rep.fileSize || 'PDF'}</span>
                            <span className="text-blue-500 font-semibold flex items-center gap-1">
                              View <ExternalLink size={10} />
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-[var(--text-muted)] col-span-3">No documents attached.</p>
                    )}
                  </div>
                </div>

                {/* Referral History / Timeline Log */}
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase mb-2">
                    Handoff Audit Log & Timeline
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {selectedReferral.timeline?.map((t, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-[var(--text-primary)] font-semibold">
                            {t.status} — <span className="font-normal text-[var(--text-secondary)]">{t.note}</span>
                          </p>
                          <p className="text-[10px] text-[var(--text-muted)]">
                            By {t.actor} • {new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="glass-card p-12 text-center text-[var(--text-muted)] min-h-[400px] flex flex-col items-center justify-center">
              <Stethoscope size={48} className="opacity-30 mb-3" />
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Select a Referral</h3>
              <p className="text-xs max-w-sm mt-1">
                Choose an incoming or outgoing referral from the left directory to view full pre-arrival clinical handoff details.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* ============================================================== */}
      {/* MODAL 1: REFER PATIENT WIZARD (Hospital A -> Hospital B) */}
      {/* ============================================================== */}
      <AnimatePresence>
        {showReferModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
                <div>
                  <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <PlusCircle className="text-blue-500" />
                    <span>Initiate Patient Referral (Hospital A &rarr; Hospital B)</span>
                  </h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    Create electronic pre-arrival medical handoff dossier
                  </p>
                </div>
                <button
                  onClick={() => setShowReferModal(false)}
                  className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateReferralSubmit} className="space-y-4">
                {/* Step 1: Patient Selection */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase mb-1">
                    Select Patient
                  </label>
                  <select
                    value={referralForm.selectedPatientId}
                    onChange={(e) => {
                      const p = patients.find(pt => pt.id === e.target.value);
                      setReferralForm(prev => ({
                        ...prev,
                        selectedPatientId: e.target.value,
                        reason: p?.diseases?.length ? `Acute aggravation of ${p.diseases[0].name}` : prev.reason
                      }));
                    }}
                    className="input-field w-full"
                    required
                  >
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.pmid || p.id}) — {p.age}y, {p.gender}, Blood: {p.bloodGroup}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Step 2: Destination Hospital & Priority */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase mb-1">
                      Destination Hospital
                    </label>
                    <select
                      value={referralForm.toHospitalId}
                      onChange={(e) => setReferralForm({ ...referralForm, toHospitalId: e.target.value })}
                      className="input-field w-full"
                    >
                      {hospitals.map(h => (
                        <option key={h.id} value={h.id}>
                          {h.name} ({h.city})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase mb-1">
                      Priority Level
                    </label>
                    <select
                      value={referralForm.priority}
                      onChange={(e) => setReferralForm({ ...referralForm, priority: e.target.value as ReferralPriority })}
                      className="input-field w-full font-bold text-red-500"
                    >
                      <option value="CRITICAL">🚨 CRITICAL (Immediate Life Threat)</option>
                      <option value="EMERGENCY">⚡ EMERGENCY (Within 30 mins)</option>
                      <option value="URGENT">⚠️ URGENT (Within 2 hours)</option>
                      <option value="NORMAL">📋 NORMAL (Elective Transfer)</option>
                    </select>
                  </div>
                </div>

                {/* Reason and ETA */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase mb-1">
                      Primary Reason for Referral
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Acute respiratory distress, cardiogenic shock"
                      value={referralForm.reason}
                      onChange={(e) => setReferralForm({ ...referralForm, reason: e.target.value })}
                      className="input-field w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase mb-1">
                      Expected Arrival (Minutes)
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="300"
                      value={referralForm.expectedArrivalMinutes}
                      onChange={(e) => setReferralForm({ ...referralForm, expectedArrivalMinutes: Number(e.target.value) })}
                      className="input-field w-full"
                      required
                    />
                  </div>
                </div>

                {/* Vitals Handoff */}
                <div className="border border-[var(--border-color)] p-3 rounded-xl bg-[var(--bg-secondary)] space-y-2">
                  <p className="text-xs font-bold uppercase text-[var(--text-muted)]">Current Patient Vitals</p>
                  <div className="grid grid-cols-5 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)]">BP</span>
                      <input
                        type="text"
                        value={referralForm.bp}
                        onChange={(e) => setReferralForm({ ...referralForm, bp: e.target.value })}
                        className="input-field w-full text-center py-1 text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)]">Pulse</span>
                      <input
                        type="number"
                        value={referralForm.pulse}
                        onChange={(e) => setReferralForm({ ...referralForm, pulse: Number(e.target.value) })}
                        className="input-field w-full text-center py-1 text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)]">SpO2 %</span>
                      <input
                        type="number"
                        value={referralForm.spo2}
                        onChange={(e) => setReferralForm({ ...referralForm, spo2: Number(e.target.value) })}
                        className="input-field w-full text-center py-1 text-xs text-red-500 font-bold"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)]">Temp °F</span>
                      <input
                        type="number"
                        step="0.1"
                        value={referralForm.temp}
                        onChange={(e) => setReferralForm({ ...referralForm, temp: Number(e.target.value) })}
                        className="input-field w-full text-center py-1 text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)]">Resp Rate</span>
                      <input
                        type="number"
                        value={referralForm.respRate}
                        onChange={(e) => setReferralForm({ ...referralForm, respRate: Number(e.target.value) })}
                        className="input-field w-full text-center py-1 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Treatment Provided and Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase mb-1">
                      Treatment & Medication Administered
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. O2 10L, IV Hydrocortisone 100mg stat, Nebulized DuoResp"
                      value={referralForm.treatmentProvided}
                      onChange={(e) => setReferralForm({ ...referralForm, treatmentProvided: e.target.value })}
                      className="input-field w-full text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase mb-1">
                      Doctor Clinical Notes & Warnings
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Impending respiratory exhaustion, keep intubation tray ready"
                      value={referralForm.doctorNotes}
                      onChange={(e) => setReferralForm({ ...referralForm, doctorNotes: e.target.value })}
                      className="input-field w-full text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <input
                    type="checkbox"
                    id="attachReportsCheckbox"
                    checked={referralForm.attachReports}
                    onChange={(e) => setReferralForm({ ...referralForm, attachReports: e.target.checked })}
                    className="rounded text-blue-500"
                  />
                  <label htmlFor="attachReportsCheckbox">
                    Auto-attach recent Lab Reports, Imaging, and active Prescriptions to transfer bundle
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
                  <button
                    type="button"
                    onClick={() => setShowReferModal(false)}
                    className="btn-secondary text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-sm font-semibold flex items-center gap-2"
                  >
                    <Send size={16} />
                    <span>Transmit Referral to Receiving Hospital</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* MODAL 2: BREAK-GLASS EMERGENCY OVERRIDE */}
      {/* ============================================================== */}
      <AnimatePresence>
        {showBreakGlassModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[var(--bg-card)] border-2 border-red-500 rounded-2xl max-w-lg w-full p-6 shadow-2xl shadow-red-500/30 space-y-6"
            >
              <div className="flex items-start justify-between border-b border-[var(--border-color)] pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-red-500/20 text-red-500">
                    <ShieldAlert size={28} />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-red-500 uppercase tracking-tight">
                      Emergency Break-Glass Protocol
                    </h2>
                    <p className="text-xs text-[var(--text-muted)]">
                      Override consent barriers for critical/unconscious trauma cases
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowBreakGlassModal(false)}
                  className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <Lock size={12} />
                  <span>MANDATORY AUDIT NOTICE:</span>
                </p>
                <p>
                  All break-glass events are recorded to the tamper-proof SHA-256 Blockchain Audit Trail with your credentials, hospital ID, exact timestamp, and clinical justification.
                </p>
              </div>

              <form onSubmit={handleBreakGlassSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase mb-1">
                    Enter Patient Medical ID (PMID)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PMID-IND-8F42K91X"
                    value={breakGlassForm.pmid}
                    onChange={(e) => setBreakGlassForm({ ...breakGlassForm, pmid: e.target.value })}
                    className="input-field w-full font-mono uppercase tracking-wider"
                    required
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] text-[var(--text-muted)]">Quick Fill Demo:</span>
                    <button
                      type="button"
                      onClick={() => setBreakGlassForm(prev => ({ ...prev, pmid: 'PMID-IND-8F42K91X' }))}
                      className="text-[10px] font-mono text-blue-500 hover:underline"
                    >
                      PMID-IND-8F42K91X
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => setBreakGlassForm(prev => ({ ...prev, pmid: 'PMID-IND-7T19K52Z' }))}
                      className="text-[10px] font-mono text-blue-500 hover:underline"
                    >
                      PMID-IND-7T19K52Z
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase mb-1">
                    Clinical Emergency Justification
                  </label>
                  <select
                    value={breakGlassForm.reason}
                    onChange={(e) => setBreakGlassForm({ ...breakGlassForm, reason: e.target.value })}
                    className="input-field w-full text-xs"
                  >
                    <option value="Unconscious Trauma Patient - Severe Hypoxemia / Cardiac Emergency">
                      Unconscious Trauma Patient — Severe Hypoxemia / Cardiac Emergency
                    </option>
                    <option value="Refractory Anaphylactic Shock - Immediate Medication Verification">
                      Refractory Anaphylactic Shock — Immediate Medication Verification
                    </option>
                    <option value="Emergency Surgical Candidate - Immediate Cross-Match Verification">
                      Emergency Surgical Candidate — Immediate Cross-Match Verification
                    </option>
                    <option value="Patient Incapacitated - Zero Surrogate Contact">
                      Patient Incapacitated — Zero Surrogate Contact
                    </option>
                  </select>
                </div>

                <div className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                  <input
                    type="checkbox"
                    id="consentBypassCheckbox"
                    checked={breakGlassForm.confirmConsentBypass}
                    onChange={(e) => setBreakGlassForm({ ...breakGlassForm, confirmConsentBypass: e.target.checked })}
                    className="mt-0.5 rounded text-red-500"
                    required
                  />
                  <label htmlFor="consentBypassCheckbox">
                    I certify under penalty of professional review that this access is necessitated by an acute life-threatening medical emergency.
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-color)]">
                  <button
                    type="button"
                    onClick={() => setShowBreakGlassModal(false)}
                    className="btn-secondary text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary bg-red-600 hover:bg-red-500 text-sm font-bold flex items-center gap-2"
                  >
                    <Unlock size={16} />
                    <span>Authorize Break-Glass Override</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* MODAL 3: DOCTOR-TO-DOCTOR COMMUNICATION LOG */}
      {/* ============================================================== */}
      <AnimatePresence>
        {showDocCommsModal && selectedReferral && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="text-blue-500" />
                  <div>
                    <h3 className="font-bold text-base text-[var(--text-primary)]">
                      Doctor-to-Doctor Handoff Thread
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">
                      {selectedReferral.fromDoctorName} ({selectedReferral.fromHospitalName}) &harr; {selectedReferral.toDoctorName || currentDoctorName}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDocCommsModal(false)}
                  className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Messages container */}
              <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] max-h-80">
                {selectedReferral.communicationLog && selectedReferral.communicationLog.length > 0 ? (
                  selectedReferral.communicationLog.map(msg => {
                    const isSelf = msg.senderDoctorId === currentDoctorId;
                    return (
                      <div
                        key={msg.id}
                        className={`p-3 rounded-xl max-w-[85%] text-xs space-y-1 ${
                          isSelf
                            ? 'ml-auto bg-blue-600 text-white rounded-br-none'
                            : 'mr-auto bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-bl-none'
                        } ${msg.urgent ? 'border-2 border-red-500' : ''}`}
                      >
                        <div className="flex items-center justify-between gap-2 text-[10px] opacity-80">
                          <span className="font-bold">{msg.senderDoctorName} ({msg.senderHospitalName})</span>
                          <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        {msg.urgent && (
                          <span className="inline-block px-1.5 py-0.2 bg-red-500 text-white font-bold rounded text-[9px]">
                            URGENT CLINICAL ALERT
                          </span>
                        )}
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-xs text-[var(--text-muted)] py-8">
                    No communication messages exchanged yet.
                  </p>
                )}
              </div>

              {/* Message Input */}
              <div className="space-y-2 pt-2 border-t border-[var(--border-color)]">
                <textarea
                  rows={2}
                  placeholder="Send direct doctor note to counterpart (e.g. ICU bed reserved, ABG confirmed)..."
                  value={docMessageDraft}
                  onChange={(e) => setDocMessageDraft(e.target.value)}
                  className="input-field w-full text-xs"
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-1.5 text-xs text-red-400 font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isUrgentMsg}
                      onChange={(e) => setIsUrgentMsg(e.target.checked)}
                      className="rounded text-red-500"
                    />
                    <span>Mark as Urgent Alert</span>
                  </label>

                  <button
                    onClick={handleSendDocMessage}
                    className="btn-primary text-xs px-4 py-1.5 flex items-center gap-1.5"
                  >
                    <Send size={14} />
                    <span>Send Note</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* MODAL 4: ATTACHED DOCUMENT / SCAN VIEWER */}
      {/* ============================================================== */}
      <AnimatePresence>
        {viewingDocument && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="text-blue-500" />
                  <div>
                    <h3 className="font-bold text-base text-[var(--text-primary)]">
                      {viewingDocument.title}
                    </h3>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 uppercase">
                      {viewingDocument.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setViewingDocument(null)}
                  className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] space-y-3">
                <div>
                  <p className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Diagnostic Summary / Finding:</p>
                  <p className="text-xs text-[var(--text-primary)] font-mono mt-1 bg-[var(--bg-card)] p-3 rounded border border-[var(--border-color)] leading-relaxed">
                    {viewingDocument.summary || 'Diagnostic interpretation verified by referring radiologist / pathologist.'}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border-color)]">
                  <span>Date: {viewingDocument.date}</span>
                  <span>File Size: {viewingDocument.fileSize || '1.4 MB'}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    toast.success('Document downloaded for ER trauma bay review');
                    setViewingDocument(null);
                  }}
                  className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 font-semibold"
                >
                  <FileDown size={14} />
                  <span>Download Report</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
