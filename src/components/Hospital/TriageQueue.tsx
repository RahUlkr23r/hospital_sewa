import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, AlertCircle, HeartPulse, Activity } from 'lucide-react';
import { getCDIColor } from '../../utils/calculations';

// Mock calculations for missing utils
const fallbackGetCDIColor = (cdi: number) => {
  if (cdi >= 60) return 'text-red-500 bg-red-500/10 border-red-500/30';
  if (cdi >= 30) return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
  return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
};

export default function TriageQueue() {
  const [patients, setPatients] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Generate mock data if empty
    const localData = localStorage.getItem('hb_triage_queue');
    if (!localData) {
      const mock = [
        { id: '1', name: 'John Doe', age: 45, cdi: 85, bloodGroup: 'O+', chiefComplaint: 'Chest Pain', status: 'Pending', bed: 'ER-1', comorbidities: ['Hypertension', 'Diabetes'] },
        { id: '2', name: 'Jane Smith', age: 32, cdi: 45, bloodGroup: 'A-', chiefComplaint: 'Abdominal Pain', status: 'In Progress', bed: 'Wait-2', comorbidities: [] },
        { id: '3', name: 'Robert Johnson', age: 28, cdi: 15, bloodGroup: 'B+', chiefComplaint: 'Sprained Ankle', status: 'Waiting', bed: 'Wait-5', comorbidities: ['Asthma'] },
        { id: '4', name: 'Emily Davis', age: 62, cdi: 70, bloodGroup: 'AB+', chiefComplaint: 'Shortness of breath', status: 'Pending', bed: 'ER-3', comorbidities: ['COPD'] },
      ];
      localStorage.setItem('hb_triage_queue', JSON.stringify(mock));
      setPatients(mock.sort((a, b) => b.cdi - a.cdi));
    } else {
      setPatients(JSON.parse(localData).sort((a: any, b: any) => b.cdi - a.cdi));
    }
  }, []);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.chiefComplaint.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="section-title">AI Triage Queue</h1>
          <p className="text-[var(--text-secondary)]">Real-time patient prioritization based on Clinical Deterioration Index (CDI)</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input 
              type="text" 
              placeholder="Search patients..." 
              className="input-field pl-10"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="btn-secondary px-3"><Filter size={18} /></button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
              <tr>
                <th className="table-header">Patient</th>
                <th className="table-header">CDI Score</th>
                <th className="table-header">Predicted Severity</th>
                <th className="table-header">Vitals/Blood</th>
                <th className="table-header">Comorbidities</th>
                <th className="table-header">Status / Bed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              <AnimatePresence>
                {filteredPatients.map((patient, idx) => {
                  const colorClass = (typeof getCDIColor === 'function' ? getCDIColor(patient.cdi) : fallbackGetCDIColor(patient.cdi)) || fallbackGetCDIColor(patient.cdi);
                  const isCritical = patient.cdi >= 60;
                  
                  return (
                    <motion.tr 
                      key={patient.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer ${isCritical ? 'bg-red-500/5' : ''}`}
                    >
                      <td className="table-cell">
                        <div className="flex items-center gap-3">
                          {isCritical && (
                            <div className="animate-pulse-fast text-red-500">
                              <AlertCircle size={20} />
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-[var(--text-primary)]">{patient.name}</div>
                            <div className="text-xs text-[var(--text-muted)]">{patient.age} yrs • {patient.chiefComplaint}</div>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full border font-bold ${colorClass}`}>
                          {patient.cdi}
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="w-32 h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full ${isCritical ? 'bg-red-500' : patient.cdi >= 30 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(patient.cdi, 100)}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="flex gap-2">
                          <span className="badge badge-info">{patient.bloodGroup}</span>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="flex flex-wrap gap-1">
                          {patient.comorbidities?.length > 0 ? (
                            patient.comorbidities.map((c: string) => (
                              <span key={c} className="badge badge-warning text-[10px] py-0">{c}</span>
                            ))
                          ) : (
                            <span className="text-xs text-[var(--text-muted)]">None</span>
                          )}
                        </div>
                      </td>
                      <td className="table-cell">
                        <div>
                          <div className="text-sm">{patient.status}</div>
                          <div className="text-xs text-[var(--text-muted)]">{patient.bed}</div>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
