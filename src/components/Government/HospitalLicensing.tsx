import React, { useState } from 'react';
import { Building2, Search, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function HospitalLicensing() {
  const [hospitals, setHospitals] = useState([
    { id: 1, name: 'Apollo City Hospital', city: 'Delhi', beds: 500, accr: 'NABH Gold', status: 'Active' },
    { id: 2, name: 'Sunrise Care', city: 'Mumbai', beds: 150, accr: 'Pending', status: 'Suspended' },
    { id: 3, name: 'Metro Life Care', city: 'Bangalore', beds: 300, accr: 'NABH Silver', status: 'Active' },
    { id: 4, name: 'City Central', city: 'Chennai', beds: 200, accr: 'None', status: 'Revoked' },
  ]);

  const updateStatus = (id: number, status: string) => {
    setHospitals(hospitals.map(h => h.id === id ? { ...h, status } : h));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Building2 className="w-6 h-6 text-blue-500" />
          Hospital Licensing & Accreditation
        </h1>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" />
          <input type="text" placeholder="Search hospitals..." className="input-field pl-10 w-64" />
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] text-[var(--text-primary)]">
              <th className="p-4 font-semibold">Hospital Name</th>
              <th className="p-4 font-semibold">Location</th>
              <th className="p-4 font-semibold">Beds</th>
              <th className="p-4 font-semibold">Accreditation</th>
              <th className="p-4 font-semibold">License Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map((hospital) => (
              <tr key={hospital.id} className="border-b border-[var(--border-color)]/50 hover:bg-[var(--bg-secondary)]/50 transition-colors">
                <td className="p-4 font-medium text-[var(--text-primary)]">{hospital.name}</td>
                <td className="p-4 text-[var(--text-secondary)]">{hospital.city}</td>
                <td className="p-4 text-[var(--text-secondary)]">{hospital.beds}</td>
                <td className="p-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {hospital.accr}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    hospital.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                    hospital.status === 'Suspended' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                    'bg-red-500/10 text-red-400 border-red-500/30'
                  }`}>
                    {hospital.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  {hospital.status !== 'Active' && (
                    <button onClick={() => updateStatus(hospital.id, 'Active')} className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors" title="Approve">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  )}
                  {hospital.status !== 'Suspended' && (
                    <button onClick={() => updateStatus(hospital.id, 'Suspended')} className="p-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-colors" title="Suspend">
                      <AlertCircle className="w-5 h-5" />
                    </button>
                  )}
                  {hospital.status !== 'Revoked' && (
                    <button onClick={() => updateStatus(hospital.id, 'Revoked')} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors" title="Revoke">
                      <XCircle className="w-5 h-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
