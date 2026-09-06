import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Activity, AlertCircle, Dna, Pill, Scissors } from 'lucide-react';
import type { Patient } from '../../utils/types';

const MedicalHistory: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const patients = JSON.parse(localStorage.getItem('hb_patients') || '[]');
    if (patients.length > 0) setPatient(patients[0]);
  }, []);

  if (!patient) return null;

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="section-title">Medical History</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline of Conditions & Surgeries */}
        <div className="lg:col-span-2 space-y-6">
          {/* Diseases */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Clock className="text-blue-500" /> Conditions Timeline</h3>
            <div className="space-y-4">
              {patient.diseases.map((disease, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full mt-1.5 ${disease.status === 'chronic' ? 'bg-danger' : disease.status === 'active' ? 'bg-warning' : 'bg-success'}`} />
                    {i < patient.diseases.length - 1 && <div className="w-0.5 h-12 bg-surface-200 dark:bg-surface-700 mt-1" />}
                  </div>
                  <div className="flex-1 glass-card-sm p-4">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-[var(--text-primary)]">{disease.name}</h4>
                      <span className={`badge ${disease.status === 'chronic' ? 'badge-danger' : disease.status === 'active' ? 'badge-warning' : 'badge-success'}`}>
                        {disease.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                      <span>Diagnosed: {disease.diagnosedDate}</span>
                      <span className={`badge ${disease.severity === 'severe' ? 'badge-danger' : disease.severity === 'moderate' ? 'badge-warning' : 'badge-info'}`}>
                        {disease.severity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Surgeries */}
          {patient.surgeries.length > 0 && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Scissors className="text-purple-500" /> Surgical History</h3>
              <div className="space-y-3">
                {patient.surgeries.map((surgery, i) => (
                  <div key={i} className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]">
                    <h4 className="font-bold text-[var(--text-primary)]">{surgery.name}</h4>
                    <div className="flex flex-wrap gap-4 mt-1 text-sm text-[var(--text-muted)]">
                      <span>Date: {surgery.date}</span>
                      <span>Hospital: {surgery.hospital}</span>
                      <span className="badge badge-success">{surgery.outcome}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Medications */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Pill className="text-teal-500" /> Current Medications</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-header rounded-tl-lg">Medication</th>
                    <th className="table-header">Dosage</th>
                    <th className="table-header">Frequency</th>
                    <th className="table-header rounded-tr-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.medications.map((med, i) => (
                    <tr key={i} className="hover:bg-surface-50 dark:hover:bg-surface-800 transition">
                      <td className="table-cell font-medium text-[var(--text-primary)]">{med.name}</td>
                      <td className="table-cell">{med.dosage}</td>
                      <td className="table-cell">{med.frequency}</td>
                      <td className="table-cell">
                        <span className={`badge ${med.active ? 'badge-success' : 'badge-warning'}`}>
                          {med.active ? 'Active' : 'Completed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Allergies */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-red-500"><AlertCircle /> Allergies</h3>
            <div className="flex flex-wrap gap-2">
              {patient.allergies.map((allergy, i) => (
                <span key={i} className="badge badge-danger text-sm px-3 py-1.5">{allergy}</span>
              ))}
              {patient.allergies.length === 0 && <p className="text-sm text-[var(--text-muted)]">No known allergies</p>}
            </div>
          </div>

          {/* Genetic Risk Map */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-purple-500"><Dna /> Genetic Risk Map</h3>
            <div className="space-y-3">
              {patient.geneticMarkers.map((gm, i) => (
                <div key={i} className="p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-[var(--text-primary)] text-sm">{gm.gene}</span>
                    <span className={`badge ${gm.riskLevel === 'high' ? 'badge-danger' : gm.riskLevel === 'moderate' ? 'badge-warning' : 'badge-success'}`}>
                      {gm.riskLevel}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">{gm.condition}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">Variant: {gm.variant}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MedicalHistory;
