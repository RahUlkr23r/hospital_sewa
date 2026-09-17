import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Users, BedDouble, AlertTriangle, Activity, ArrowRight, Ambulance, Share2, Clock, ShieldAlert } from 'lucide-react';
import type { Referral } from '../../utils/types';

export default function DoctorDashboard() {
  const [stats, setStats] = useState({
    patientsToday: 42,
    pendingConsultations: 8,
    bedsAvailable: 15,
    criticalAlerts: 3
  });

  const [topTriage, setTopTriage] = useState<any[]>([]);
  const [criticalReferral, setCriticalReferral] = useState<Referral | null>(null);

  useEffect(() => {
    // Read from localStorage (simulate real data)
    const triageData = JSON.parse(localStorage.getItem('hb_triage_queue') || '[]');
    setTopTriage(triageData.sort((a: any, b: any) => b.cdi - a.cdi).slice(0, 3));

    const refs: Referral[] = JSON.parse(localStorage.getItem('hb_referrals') || '[]');
    const critical = refs.find(
      r => (r.priority === 'CRITICAL' || r.priority === 'EMERGENCY') && 
           r.status !== 'COMPLETED' && r.status !== 'ADMITTED'
    );
    if (critical) setCriticalReferral(critical);
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="section-title">Doctor Dashboard</h1>
        <p className="text-[var(--text-secondary)]">Welcome back, Dr. Priya Sharma. Here is your overview for today.</p>
      </header>

      {/* Pre-Arrival Emergency Referral Banner */}
      {criticalReferral && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-red-500/10 border-2 border-red-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-red-500/20 text-red-500 animate-bounce">
              <ShieldAlert size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase bg-red-600 text-white px-2 py-0.5 rounded font-bold">
                  🚨 PRE-ARRIVAL EMERGENCY REFERRAL
                </span>
                <span className="text-xs font-mono font-bold text-red-400">
                  {criticalReferral.pmid}
                </span>
              </div>
              <h3 className="font-bold text-base text-[var(--text-primary)] mt-0.5">
                {criticalReferral.patientName} ({criticalReferral.bloodGroup}) — {criticalReferral.reason}
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                From: <strong>{criticalReferral.fromHospitalName}</strong> • ETA: ~{criticalReferral.expectedArrivalMinutes} mins
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <Link
              to="/hospital/referrals"
              className="btn-primary bg-red-600 hover:bg-red-500 text-xs px-4 py-2 font-bold shadow-lg shadow-red-600/30 flex items-center gap-1.5"
            >
              <span>Inspect Handoff & Accept</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} title="Patients Today" value={stats.patientsToday} color="blue" />
        <StatCard icon={Activity} title="Pending Consults" value={stats.pendingConsultations} color="yellow" />
        <StatCard icon={BedDouble} title="Available Beds" value={stats.bedsAvailable} color="green" />
        <StatCard icon={AlertTriangle} title="Critical Alerts" value={stats.criticalAlerts} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Triage Mini-queue */}
        <div className="glass-card col-span-1 lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Activity className="text-red-500" /> Critical Triage Queue
            </h2>
            <Link to="/hospital/triage" className="btn-ghost text-sm flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="space-y-3">
            {topTriage.length > 0 ? topTriage.map((patient, i) => (
              <motion.div 
                key={patient.id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
              >
                <div>
                  <h3 className="font-medium">{patient.name || 'Unknown'}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{patient.chiefComplaint || 'No complaint listed'}</p>
                </div>
                <div className="text-right">
                  <div className="badge-danger font-bold text-lg">CDI: {patient.cdi || 0}</div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">{patient.status || 'Waiting'}</div>
                </div>
              </motion.div>
            )) : (
              <div className="text-center py-6 text-[var(--text-muted)]">No critical patients in queue.</div>
            )}
          </div>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          <motion.div 
            className="card p-6 bg-red-500/10 border-red-500/20 relative overflow-hidden"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Ambulance size={64} />
            </div>
            <h3 className="text-red-500 font-semibold flex items-center gap-2 mb-2">
              <span className="animate-pulse-fast h-2 w-2 bg-red-500 rounded-full inline-block"></span>
              Ambulance En Route
            </h3>
            <p className="text-sm mb-4">ETA: 4 mins • Cardiac Arrest</p>
            <Link to="/hospital/ambulance" className="btn-danger w-full justify-center">View Telemetry</Link>
          </motion.div>
          
          <div className="glass-card p-6">
            <h3 className="font-medium mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/hospital/referrals" className="btn-primary w-full justify-center flex items-center gap-1.5">
                <Share2 size={16} />
                <span>Hospital Referrals & Pre-Arrival</span>
              </Link>
              <Link to="/hospital/consultation" className="btn-secondary w-full justify-center">New Consultation</Link>
              <Link to="/hospital/pill-scanner" className="btn-secondary w-full justify-center">Scan Medication</Link>
              <Link to="/hospital/biometric" className="btn-secondary w-full justify-center">Emergency Access</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, color }: { icon: any, title: string, value: number, color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-500 bg-blue-500/10',
    red: 'text-red-500 bg-red-500/10',
    green: 'text-emerald-500 bg-emerald-500/10',
    yellow: 'text-amber-500 bg-amber-500/10',
  };

  return (
    <div className="glass-card p-5 flex items-center gap-4">
      <div className={`p-3 rounded-xl ${colorMap[color]}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="stat-label">{title}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}
