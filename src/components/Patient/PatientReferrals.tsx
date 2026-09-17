import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRightLeft, 
  Clock, 
  Hospital, 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  PhoneCall, 
  ExternalLink,
  ShieldCheck,
  Building2,
  Calendar,
  Activity,
  HeartPulse
} from 'lucide-react';
import type { Referral, ReferralPriority, ReferralStatus } from '../../utils/types';
import { getStoredReferrals } from '../../utils/pmidService';

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

export default function PatientReferrals() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);

  useEffect(() => {
    const allRefs = getStoredReferrals();
    // Default logged in patient is pat-1 (Rahul Kumar)
    const patientRefs = allRefs.filter(r => r.patientId === 'pat-1' || r.pmid === 'PMID-IND-8F42K91X');
    setReferrals(patientRefs.length > 0 ? patientRefs : allRefs);
    if (patientRefs.length > 0) {
      setSelectedReferral(patientRefs[0]);
    } else if (allRefs.length > 0) {
      setSelectedReferral(allRefs[0]);
    }
  }, []);

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
      case 'ACCEPTED':
      case 'PREPARING':
        return 'bg-purple-500/10 text-purple-400 border border-purple-500/30';
      case 'PATIENT ARRIVED':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/30';
      case 'ADMITTED':
      case 'COMPLETED':
        return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30';
      default:
        return 'bg-amber-500/10 text-amber-500 border border-amber-500/30';
    }
  };

  const calculateStepIndex = (status: ReferralStatus): number => {
    const idx = PIPELINE_STEPS.indexOf(status);
    return idx === -1 ? 0 : idx;
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="glass-card p-6 border-l-4 border-l-blue-500 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <ArrowRightLeft size={24} />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                My Hospital Referrals & Pre-Arrival Transfers
              </h1>
              <p className="text-xs text-[var(--text-muted)]">
                Live visibility into inter-hospital handoffs, medical preparation, and care continuity
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[var(--text-muted)]">Unique Medical ID:</span>
          <span className="font-mono font-bold px-2 py-1 rounded bg-blue-500/10 text-blue-500 border border-blue-500/30">
            PMID-IND-8F42K91X
          </span>
          <span className="badge-success text-[10px] px-1.5 py-0.5 flex items-center gap-1">
            <ShieldCheck size={12} /> Verified
          </span>
        </div>
      </div>

      {referrals.length === 0 ? (
        <div className="glass-card p-12 text-center text-[var(--text-muted)] space-y-2">
          <Hospital size={48} className="mx-auto opacity-30" />
          <h3 className="text-base font-bold text-[var(--text-primary)]">No Active or Past Referrals</h3>
          <p className="text-xs">You currently do not have any inter-hospital transfers on record.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Referrals List (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider px-1">
              Referral Transfers ({referrals.length})
            </h3>

            {referrals.map(ref => {
              const isSelected = selectedReferral?.id === ref.id;
              const isActive = ref.status !== 'COMPLETED' && ref.status !== 'CANCELLED';

              return (
                <div
                  key={ref.id}
                  onClick={() => setSelectedReferral(ref)}
                  className={`glass-card p-4 cursor-pointer transition-all border-l-4 hover:border-l-blue-500 ${
                    isSelected
                      ? 'border-l-blue-500 bg-blue-500/5 shadow-md'
                      : 'border-l-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${getPriorityBadgeClass(ref.priority)}`}>
                      {ref.priority}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusBadgeClass(ref.status)}`}>
                      {ref.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-[var(--text-primary)] line-clamp-1">
                    {ref.reason}
                  </h4>

                  <div className="mt-2 text-xs space-y-1 text-[var(--text-secondary)]">
                    <p className="flex items-center gap-1 truncate">
                      <span className="text-[var(--text-muted)]">From:</span>
                      <strong className="truncate">{ref.fromHospitalName}</strong>
                    </p>
                    <p className="flex items-center gap-1 truncate">
                      <span className="text-[var(--text-muted)]">To:</span>
                      <strong className="text-blue-500 truncate">{ref.toHospitalName}</strong>
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] mt-3 pt-2 border-t border-[var(--border-color)]">
                    <span>{new Date(ref.createdAt).toLocaleDateString()}</span>
                    {isActive && ref.expectedArrivalMinutes > 0 && (
                      <span className="text-blue-500 font-semibold flex items-center gap-1">
                        <Clock size={11} /> ETA ~{ref.expectedArrivalMinutes}m
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed View (8 cols) */}
          <div className="lg:col-span-8">
            {selectedReferral && (
              <div className="space-y-6">
                {/* State Machine Tracker Card */}
                <div className="glass-card p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase ${getPriorityBadgeClass(selectedReferral.priority)}`}>
                          {selectedReferral.priority} Priority
                        </span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getStatusBadgeClass(selectedReferral.status)}`}>
                          {selectedReferral.status}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-[var(--text-primary)]">
                        {selectedReferral.reason}
                      </h2>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-[var(--text-muted)]">Transfer Initiated</p>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">
                        {new Date(selectedReferral.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                      </p>
                    </div>
                  </div>

                  {/* 8-Stage Stepper for Patient */}
                  <div>
                    <h4 className="text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider mb-3">
                      Transfer & Pre-Arrival Status Machine
                    </h4>

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
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                                isPast
                                  ? 'bg-blue-500 text-white shadow-sm'
                                  : isCurrent
                                  ? 'bg-blue-600 text-white ring-4 ring-blue-500/20 animate-pulse'
                                  : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border-color)]'
                              }`}
                            >
                              {isPast ? <CheckCircle2 size={14} /> : idx + 1}
                            </div>
                            <span className={`text-[9px] mt-1 font-semibold whitespace-nowrap hidden sm:block ${
                              isCurrent ? 'text-blue-500' : 'text-[var(--text-muted)]'
                            }`}>
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Transfer Route Card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Referring Facility (Hospital A)</span>
                      <h4 className="font-bold text-sm text-[var(--text-primary)] mt-0.5">{selectedReferral.fromHospitalName}</h4>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">Doctor: {selectedReferral.fromDoctorName}</p>
                      <p className="text-xs text-[var(--text-muted)]">Contact: {selectedReferral.fromEmergencyPhone || selectedReferral.fromDoctorContact}</p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-500">Destination Facility (Hospital B)</span>
                      <h4 className="font-bold text-sm text-[var(--text-primary)] mt-0.5">{selectedReferral.toHospitalName}</h4>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">Attending: {selectedReferral.toDoctorName || 'Emergency Trauma Team'}</p>
                      {selectedReferral.expectedArrivalMinutes > 0 && selectedReferral.status !== 'COMPLETED' && (
                        <p className="text-xs text-blue-500 font-bold mt-1 flex items-center gap-1">
                          <Clock size={12} /> Expected Arrival: ~{selectedReferral.expectedArrivalMinutes} mins
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Attached Medical Records Shared in Handoff */}
                  <div>
                    <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase mb-2 flex items-center gap-1.5">
                      <FileText size={14} />
                      <span>Electronic Records Transmitted with Handoff ({selectedReferral.attachedReports?.length || 0})</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedReferral.attachedReports && selectedReferral.attachedReports.length > 0 ? (
                        selectedReferral.attachedReports.map(rep => (
                          <div
                            key={rep.id}
                            className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex flex-col justify-between text-xs"
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-500 uppercase">
                                  {rep.type}
                                </span>
                                <span className="text-[10px] text-[var(--text-muted)]">{rep.date}</span>
                              </div>
                              <h5 className="font-bold text-[var(--text-primary)] mt-1">{rep.title}</h5>
                              <p className="text-[11px] text-[var(--text-secondary)] mt-1 line-clamp-2">{rep.summary}</p>
                            </div>
                            <span className="text-[10px] text-emerald-500 font-semibold mt-2 flex items-center gap-1">
                              <ShieldCheck size={12} /> Secured by Consent Key
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-[var(--text-muted)]">No external documents attached.</p>
                      )}
                    </div>
                  </div>

                  {/* Doctor Notes Shared */}
                  <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-2">
                    <h4 className="text-xs font-bold uppercase text-[var(--text-muted)]">
                      Referring Doctor Instructions & Treatment Note
                    </h4>
                    <p className="text-xs text-[var(--text-primary)] leading-relaxed">
                      {selectedReferral.doctorNotes}
                    </p>
                  </div>

                  {/* Timeline Events */}
                  <div>
                    <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase mb-2">
                      Transfer Timeline
                    </h4>
                    <div className="space-y-2">
                      {selectedReferral.timeline?.map((t, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-[var(--text-primary)] font-semibold">
                              {t.status} — <span className="font-normal text-[var(--text-secondary)]">{t.note}</span>
                            </p>
                            <p className="text-[10px] text-[var(--text-muted)]">
                              By {t.actor} • {new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
