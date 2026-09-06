import React, { useEffect, useState } from 'react';
import { Users, Building2, HardDrive, ShieldCheck, Activity, Power, Settings2, FileText, CheckCircle2, XCircle } from 'lucide-react';
import StatCard from '../Common/StatCard';
import { verifyChain } from '../../utils/crypto';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const SystemDashboard = () => {
  const [users] = useLocalStorage('hb_users', []);
  const [patients] = useLocalStorage('hb_patients', []);
  const [hospitals] = useLocalStorage('hb_hospitals', []);
  const [auditLogs] = useLocalStorage('hb_audit_logs', []);
  
  const [storageSize, setStorageSize] = useState('0 KB');
  const [isChainValid, setIsChainValid] = useState(true);


  useEffect(() => {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('hb_')) {
        total += localStorage.getItem(key)?.length || 0;
      }
    }
    setStorageSize((total / 1024).toFixed(2) + ' KB');
    const result = verifyChain(auditLogs);
    setIsChainValid(result.valid);
  }, [auditLogs]);

  const features = [
    { name: 'AI Diagnosis Engine', status: true },
    { name: 'Telemedicine Gateway', status: true },
    { name: 'E-Pharmacy Integration', status: false },
    { name: 'Blockchain Audit Trail', status: true },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <h1 className="section-title">System Dashboard</h1>
        <p className="text-[var(--text-secondary)]">Overview of HealthBridge platform health and metrics</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Users" value={users.length || 150} icon={<Users size={24} />} trend={{ value: 12, label: 'this week' }} color="brand" />
        <StatCard label="Active Patients" value={patients.length || 1200} icon={<Activity size={24} />} trend={{ value: 5, label: 'this week' }} color="teal" />
        <StatCard label="Registered Hospitals" value={hospitals.length || 45} icon={<Building2 size={24} />} trend={{ value: 0, label: 'stable' }} color="purple" />
        <StatCard label="Storage Used" value={storageSize} icon={<HardDrive size={24} />} color="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <ShieldCheck className="text-amber-500" />
              System Integrity
            </h3>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className={`p-4 rounded-xl flex items-center gap-3 flex-1 min-w-[200px] border ${isChainValid ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                {isChainValid ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
                <div>
                  <div className="font-bold">{isChainValid ? 'Blockchain Intact' : 'Integrity Compromised'}</div>
                  <div className="text-sm opacity-80">{isChainValid ? 'All audit logs verified' : 'Tampering detected in logs'}</div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center gap-3 flex-1 min-w-[200px]">
                <Activity size={32} />
                <div>
                  <div className="font-bold">99.97% Uptime</div>
                  <div className="text-sm opacity-80">Last 30 days</div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20 flex items-center gap-3 flex-1 min-w-[200px]">
                <Users size={32} />
                <div>
                  <div className="font-bold">4,231</div>
                  <div className="text-sm opacity-80">Active Sessions</div>
                </div>
              </div>
            </div>
            
            <h4 className="text-sm font-medium text-[var(--text-secondary)] mb-3">Recent Audit Logs</h4>
            <div className="space-y-2">
              {(auditLogs.length ? auditLogs.slice(-5).reverse() : [
                { action: 'USER_LOGIN', timestamp: new Date().toISOString(), details: 'Admin login' },
                { action: 'DATA_BACKUP', timestamp: new Date(Date.now() - 3600000).toISOString(), details: 'Automated backup completed' },
              ]).map((log: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-[var(--text-muted)]" />
                    <span className="font-medium text-[var(--text-primary)]">{log.action}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                    <span className="hidden sm:inline">{log.details}</span>
                    <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Settings2 className="text-amber-500" />
              Feature Toggles
            </h3>
            <div className="space-y-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)]">
                  <span className="font-medium">{feature.name}</span>
                  <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${feature.status ? 'bg-amber-500' : 'bg-gray-600'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${feature.status ? 'translate-x-6' : 'translate-x-0'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Power className="text-amber-500" />
              Service Status
            </h3>
            <div className="space-y-3">
              {['Database', 'Auth Server', 'AI Inference', 'Storage'].map((service, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors">
                  <span className="text-[var(--text-secondary)]">{service}</span>
                  <div className="flex items-center gap-2 text-emerald-500 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-slow" />
                    Online
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemDashboard;
