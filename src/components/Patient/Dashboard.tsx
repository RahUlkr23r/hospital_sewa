import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { Activity, Heart, Moon, Footprints, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import StatCard from '../Common/StatCard';
import type { Patient, HealthAlert } from '../../utils/types';

const Dashboard: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [alerts, setAlerts] = useState<HealthAlert[]>([]);

  useEffect(() => {
    const patients = JSON.parse(localStorage.getItem('hb_patients') || '[]');
    if (patients.length > 0) setPatient(patients[0]);
    const healthAlerts: HealthAlert[] = JSON.parse(localStorage.getItem('hb_health_alerts') || '[]');
    setAlerts(healthAlerts.filter(a => a.isActive));
  }, []);

  if (!patient) return <div className="p-8 text-center text-[var(--text-muted)]">Loading patient data...</div>;

  const vitalityScore = patient.vitalityScore || 78;
  const data = [{ name: 'Score', value: vitalityScore, fill: vitalityScore >= 70 ? '#10b981' : vitalityScore >= 40 ? '#f59e0b' : '#ef4444' }];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Health ID Card */}
        <div className="glass-card p-6 flex-1 relative overflow-hidden gradient-purple text-white shadow-xl">
          <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
            <ShieldCheck size={120} />
          </div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold mb-1 drop-shadow-md">{patient.name}</h2>
              <p className="opacity-90 mb-4 font-mono bg-white/20 inline-block px-2 py-1 rounded text-sm">ID: {patient.id}</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <div>
                  <p className="opacity-75 uppercase text-xs font-bold tracking-wider">Age</p>
                  <p className="font-semibold text-lg">{patient.age} yrs</p>
                </div>
                <div>
                  <p className="opacity-75 uppercase text-xs font-bold tracking-wider">Blood Group</p>
                  <p className="font-semibold text-lg">{patient.bloodGroup}</p>
                </div>
                <div>
                  <p className="opacity-75 uppercase text-xs font-bold tracking-wider">Gender</p>
                  <p className="font-semibold text-lg">{patient.gender}</p>
                </div>
                <div>
                  <p className="opacity-75 uppercase text-xs font-bold tracking-wider">Aadhaar</p>
                  <p className="font-semibold text-sm">{patient.aadhaar}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform">
              <QRCodeSVG value={JSON.stringify({ id: patient.id, name: patient.name, blood: patient.bloodGroup })} size={110} />
            </div>
          </div>
        </div>

        {/* Vitality Score */}
        <div className="glass-card p-6 flex-1 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="section-title">Vitality Score</h3>
            <p className="text-[var(--text-muted)] text-sm mb-4">Based on your recent health metrics and daily activity.</p>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg w-max border ${
              vitalityScore >= 70 ? 'bg-success/10 border-success/20' : 'bg-warning/10 border-warning/20'
            }`}>
              <Zap className={`w-5 h-5 ${vitalityScore >= 70 ? 'text-success' : 'text-warning'}`} />
              <span className={`font-bold ${vitalityScore >= 70 ? 'text-success' : 'text-warning'}`}>
                {vitalityScore >= 80 ? 'Excellent' : vitalityScore >= 60 ? 'Good' : 'Needs Attention'}
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

      {/* Wearable Devices Strip */}
      {patient.wearableDevices && patient.wearableDevices.length > 0 && (
        <div className="glass-card-sm p-4">
          <h4 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Connected Devices</h4>
          <div className="flex flex-wrap gap-3">
            {patient.wearableDevices.map(device => (
              <div key={device.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <div className={`w-2 h-2 rounded-full ${device.connected ? 'bg-success animate-pulse-slow' : 'bg-surface-400'}`} />
                <span className="text-sm font-medium text-[var(--text-primary)]">{device.name}</span>
                <span className="text-xs text-[var(--text-muted)]">{device.battery}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daily Quest */}
      {patient.dailyQuest && (
        <div className="glass-card-sm p-4 border-l-4 border-brand-500">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-brand-500" />
              <span className="font-bold text-[var(--text-primary)]">{patient.dailyQuest.title}</span>
            </div>
            <span className="badge badge-brand">+{patient.dailyQuest.reward} pts</span>
          </div>
          <p className="text-sm text-[var(--text-muted)] mb-2">{patient.dailyQuest.description}</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
              <div className="h-full gradient-brand rounded-full transition-all duration-500" style={{ width: `${(patient.dailyQuest.current / patient.dailyQuest.target) * 100}%` }} />
            </div>
            <span className="text-sm font-semibold text-[var(--text-primary)]">{patient.dailyQuest.current}/{patient.dailyQuest.target} {patient.dailyQuest.unit}</span>
          </div>
        </div>
      )}

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
    </motion.div>
  );
};

export default Dashboard;
