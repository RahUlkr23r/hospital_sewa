import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { 
  Activity, 
  Heart, 
  Moon, 
  Footprints, 
  AlertTriangle, 
  ShieldCheck, 
  Zap, 
  Copy, 
  QrCode, 
  X, 
  ArrowRight, 
  Clock, 
  ArrowRightLeft, 
  FileText, 
  Pill, 
  Lock, 
  Eye, 
  EyeOff, 
  Hospital 
} from 'lucide-react';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import StatCard from '../Common/StatCard';
import type { Patient, HealthAlert, Referral } from '../../utils/types';
import { getStoredReferrals } from '../../utils/pmidService';

const Dashboard: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [alerts, setAlerts] = useState<HealthAlert[]>([]);
  const [activeReferral, setActiveReferral] = useState<Referral | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showSensitiveData, setShowSensitiveData] = useState(true);

  useEffect(() => {
    const patients = JSON.parse(localStorage.getItem('hb_patients') || '[]');
    if (patients.length > 0) setPatient(patients[0]);
    const healthAlerts: HealthAlert[] = JSON.parse(localStorage.getItem('hb_health_alerts') || '[]');
    setAlerts(healthAlerts.filter(a => a.isActive));

    const referrals = getStoredReferrals();
    const active = referrals.find(
      r => (r.patientId === 'pat-1' || r.pmid === 'PMID-IND-8F42K91X') &&
           r.status !== 'COMPLETED' && r.status !== 'CANCELLED'
    );
    if (active) setActiveReferral(active);
  }, []);

  if (!patient) return <div className="p-8 text-center text-[var(--text-muted)]">Loading patient data...</div>;

  const vitalityScore = patient.vitalityScore || 78;
  const pmid = patient.pmid || 'PMID-IND-8F42K91X';
  const data = [{ name: 'Score', value: vitalityScore, fill: vitalityScore >= 70 ? '#10b981' : vitalityScore >= 40 ? '#f59e0b' : '#ef4444' }];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Patient Medical ID copied to clipboard');
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ACTIVE PRE-ARRIVAL REFERRAL TRANSFER HERO (If in transit/referred) */}
      {activeReferral && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-[var(--bg-card)] border-2 border-blue-500/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40 animate-pulse">
              <ArrowRightLeft size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase bg-blue-600 text-white px-2 py-0.5 rounded">
                  ACTIVE HOSPITAL REFERRAL HANDOFF
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  activeReferral.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {activeReferral.priority}
                </span>
                <span className="text-xs text-blue-300 font-semibold">
                  Status: <strong>{activeReferral.status}</strong>
                </span>
              </div>
              <h3 className="font-bold text-lg text-[var(--text-primary)] mt-1">
                {activeReferral.reason}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] flex items-center gap-2">
                <span>From: <strong>{activeReferral.fromHospitalName}</strong></span>
                <span>&rarr;</span>
                <span className="text-blue-400 font-semibold">To: <strong>{activeReferral.toHospitalName}</strong></span>
                {activeReferral.expectedArrivalMinutes > 0 && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <Clock size={12} /> ETA ~{activeReferral.expectedArrivalMinutes} mins
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          <Link
            to="/patient/referrals"
            className="btn-primary text-xs px-4 py-2 font-bold flex items-center gap-1.5 self-end md:self-auto shadow-lg shadow-blue-500/20"
          >
            <span>Track Handoff Progress</span>
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      )}

      {/* Top Row: Unique Patient Medical ID Card & Vitality Score */}
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* UNIQUE PATIENT MEDICAL ID CARD */}
        <div className="glass-card p-6 flex-1 relative overflow-hidden gradient-purple text-white shadow-xl">
          <div className="absolute top-0 right-0 p-4 opacity-15 pointer-events-none">
            <ShieldCheck size={140} />
          </div>

          <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-extrabold opacity-90 flex items-center gap-1">
                  <ShieldCheck size={16} /> UNIQUE PATIENT MEDICAL ID
                </span>
                <span className="badge-success text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                  <ShieldCheck size={12} /> Status: Verified
                </span>
              </div>

              <div className="flex items-center gap-2 my-2">
                <span className="font-mono text-xl sm:text-2xl font-black tracking-wider bg-white/20 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-white/20">
                  {pmid}
                </span>
                <button
                  onClick={() => copyToClipboard(pmid)}
                  title="Copy Medical ID"
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <Copy size={16} />
                </button>
              </div>

              <h2 className="text-2xl font-bold mt-2 drop-shadow-md">{patient.name}</h2>
              <p className="text-xs opacity-80 mb-3">
                Decoupled Identity • Aadhaar KYC Verified: {patient.aadhaar ? `XXXX-XXXX-${patient.aadhaar.slice(-4)}` : 'Verified'}
              </p>
            </div>

            <div className="flex items-end justify-between gap-4 pt-2 border-t border-white/20">
              <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-sm">
                <div>
                  <p className="opacity-75 uppercase text-[10px] font-bold tracking-wider">Age</p>
                  <p className="font-semibold text-base">{patient.age} yrs</p>
                </div>
                <div>
                  <p className="opacity-75 uppercase text-[10px] font-bold tracking-wider">Blood Group</p>
                  <p className="font-bold text-lg text-red-200">{patient.bloodGroup}</p>
                </div>
                <div>
                  <p className="opacity-75 uppercase text-[10px] font-bold tracking-wider">Gender</p>
                  <p className="font-semibold text-base">{patient.gender}</p>
                </div>
              </div>

              {/* QR Code trigger */}
              <div 
                onClick={() => setShowQrModal(true)}
                className="bg-white p-2.5 rounded-xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform cursor-pointer group text-center"
                title="Click to enlarge QR Code for hospital check-in"
              >
                <QRCodeSVG 
                  value={JSON.stringify({ pmid: pmid, name: patient.name, blood: patient.bloodGroup })} 
                  size={75} 
                />
                <span className="text-[9px] text-slate-800 font-bold block mt-1 group-hover:text-blue-600">
                  Scan / Share
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Vitality Score */}
        <div className="glass-card p-6 flex-1 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="section-title">Vitality Score</h3>
            <p className="text-[var(--text-muted)] text-sm mb-4">Based on your recent health metrics, daily activity, and biomarker stability.</p>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg w-max border ${
              vitalityScore >= 70 ? 'bg-success/10 border-success/20' : 'bg-warning/10 border-warning/20'
            }`}>
              <Zap className={`w-5 h-5 ${vitalityScore >= 70 ? 'text-success' : 'text-warning'}`} />
              <span className={`font-bold ${vitalityScore >= 70 ? 'text-success' : 'text-warning'}`}>
                {vitalityScore >= 80 ? 'Excellent Health' : vitalityScore >= 60 ? 'Good Condition' : 'Needs Attention'}
              </span>
            </div>
          </div>
          <div className="w-40 h-40 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="75%"
                outerRadius="100%"
                barSize={12}
                data={data}
                startAngle={180}
                endAngle={0}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar background dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center mt-4">
              <span className="text-4xl font-bold text-[var(--text-primary)]">{vitalityScore}</span>
              <span className="text-xs text-[var(--text-muted)] uppercase font-bold tracking-wide">/ 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* SENSITIVE INFORMATION CONTROL & CLINICAL SUMMARY TILES */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-3">
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <FileText className="text-blue-500" />
              <span>Medical Summary & Handoff Records</span>
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Authorized clinical view governed by your Patient Medical ID consent rules
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSensitiveData(!showSensitiveData)}
              className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"
            >
              {showSensitiveData ? <EyeOff size={14} /> : <Eye size={14} />}
              <span>{showSensitiveData ? 'Hide Sensitive Data' : 'Show Sensitive Data'}</span>
            </button>

            <Link
              to="/patient/referrals"
              className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1.5 font-semibold"
            >
              <ArrowRightLeft size={14} />
              <span>Referral History</span>
            </Link>
          </div>
        </div>

        {/* Clinical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          {/* Confirmed Allergies */}
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-2">
            <h4 className="font-bold text-red-500 uppercase flex items-center gap-1.5">
              <AlertTriangle size={14} />
              <span>Allergies ({patient.allergies?.length || 0})</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {patient.allergies?.map((a, i) => (
                <span key={i} className="badge-danger px-2 py-0.5">
                  {showSensitiveData ? a : '••••••••'}
                </span>
              ))}
            </div>
          </div>

          {/* Existing Conditions */}
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-2">
            <h4 className="font-bold text-[var(--text-muted)] uppercase flex items-center gap-1.5">
              <Activity size={14} />
              <span>Known Conditions ({patient.diseases?.length || 0})</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {patient.diseases?.map((d, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)]">
                  {showSensitiveData ? d.name : '••••••••'}
                </span>
              ))}
            </div>
          </div>

          {/* Current Medications */}
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-2">
            <h4 className="font-bold text-[var(--text-muted)] uppercase flex items-center gap-1.5">
              <Pill size={14} />
              <span>Active Medications ({patient.medications?.length || 0})</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {patient.medications?.filter(m => m.active).map((m, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)]">
                  {showSensitiveData ? `${m.name} (${m.dosage})` : '••••••••'}
                </span>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-2">
            <h4 className="font-bold text-emerald-500 uppercase flex items-center gap-1.5">
              <ShieldCheck size={14} />
              <span>Emergency Contact</span>
            </h4>
            {patient.emergencyContact && (
              <div className="space-y-0.5 text-[var(--text-secondary)]">
                <p className="font-bold text-[var(--text-primary)]">{patient.emergencyContact.name} ({patient.emergencyContact.relation})</p>
                <p className="font-mono">{showSensitiveData ? patient.emergencyContact.phone : '••••••••••'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Health Forecast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {patient.healthForecast && [
          { days: 30, items: patient.healthForecast.thirtyDay, color: 'success' },
          { days: 90, items: patient.healthForecast.ninetyDay, color: 'warning' },
          { days: 180, items: patient.healthForecast.oneEightyDay, color: 'info' },
        ].map((f, i) => (
          <div key={i} className="glass-card-sm p-4 border-l-4" style={{ borderLeftColor: f.color === 'success' ? '#10b981' : f.color === 'warning' ? '#f59e0b' : '#3b82f6' }}>
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-[var(--text-primary)]">{f.days}-Day Forecast</h4>
              <span className={`badge badge-${f.color}`}>{f.items.length} risks</span>
            </div>
            {f.items.length > 0 ? (
              f.items.slice(0, 2).map((item, j) => (
                <div key={j} className="mt-2 p-2 rounded-lg bg-[var(--bg-secondary)]">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{item.condition}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${item.probability}%`, backgroundColor: item.probability > 25 ? '#ef4444' : item.probability > 10 ? '#f59e0b' : '#10b981' }} />
                    </div>
                    <span className="text-xs font-semibold text-[var(--text-muted)]">{item.probability}%</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--text-muted)] mt-2">No significant risks detected</p>
            )}
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Heart Rate" value={`${72 + Math.floor(Math.random() * 5)} bpm`} icon={<Heart size={24} />} color="danger" />
        <StatCard label="Blood Pressure" value={`${patient.fitnessMetrics?.bmi ? '130/82' : '120/80'}`} icon={<Activity size={24} />} color="brand" />
        <StatCard label="Steps Today" value={patient.fitnessMetrics?.steps?.toLocaleString() || '6,420'} icon={<Footprints size={24} />} color="success" trend={{ value: 8, label: 'vs yesterday' }} />
        <StatCard label="Sleep" value={`${patient.fitnessMetrics?.sleepHours || 7}h`} icon={<Moon size={24} />} color="purple" />
      </div>

      {/* Active Alerts */}
      {alerts.length > 0 && alerts.map(alert => (
        <div key={alert.id} className={`glass-card p-4 border-l-4 ${alert.severity === 'critical' ? 'border-red-500 bg-red-500/5' : alert.severity === 'warning' ? 'border-yellow-500 bg-yellow-500/5' : 'border-blue-500 bg-blue-500/5'}`}>
          <div className="flex items-center gap-3">
            <AlertTriangle className={`w-6 h-6 ${alert.severity === 'critical' ? 'text-red-500' : alert.severity === 'warning' ? 'text-yellow-500' : 'text-blue-500'}`} />
            <div>
              <h4 className={`font-bold ${alert.severity === 'critical' ? 'text-red-500' : alert.severity === 'warning' ? 'text-yellow-500' : 'text-blue-500'}`}>{alert.title}</h4>
              <p className="text-sm text-[var(--text-secondary)]">{alert.message.substring(0, 120)}...</p>
            </div>
          </div>
        </div>
      ))}

      {/* ENLARGED QR CODE MODAL FOR HOSPITAL CHECK-IN */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                <h3 className="font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
                  <QrCode className="text-blue-500" />
                  <span>Scan Patient Medical ID</span>
                </h3>
                <button
                  onClick={() => setShowQrModal(false)}
                  className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-inner inline-block mx-auto border-4 border-slate-100">
                <QRCodeSVG
                  value={JSON.stringify({
                    pmid: pmid,
                    name: patient.name,
                    blood: patient.bloodGroup,
                    emergencyContact: patient.emergencyContact?.phone,
                    allergies: patient.allergies,
                  })}
                  size={200}
                />
              </div>

              <div>
                <p className="font-mono font-bold text-lg text-blue-500">{pmid}</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Present this QR code to triage nurses, ambulance paramedics, or registration desks for instant electronic record retrieval.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowQrModal(false)}
                  className="btn-primary w-full justify-center text-xs py-2"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;
