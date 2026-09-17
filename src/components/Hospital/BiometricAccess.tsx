import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, ScanBarcode, User, AlertTriangle, FileText, CheckCircle, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { appendAuditLogEntry } from '../../utils/pmidService';

export default function BiometricAccess() {
  const [isScanning, setIsScanning] = useState(false);
  const [patientData, setPatientData] = useState<any>(null);
  const [scanMethod, setScanMethod] = useState<'fingerprint' | 'barcode' | 'aadhaar'>('fingerprint');

  const handleScan = () => {
    setIsScanning(true);
    setPatientData(null);
    
    // Simulate API delay and processing
    setTimeout(() => {
      setIsScanning(false);
      const patients = JSON.parse(localStorage.getItem('hb_patients') || '[]');
      const patient = patients.length > 0 ? patients[0] : null;

      const mockPatient = patient ? {
        name: patient.name,
        id: patient.id,
        pmid: patient.pmid || 'PMID-IND-8F42K91X',
        age: patient.age,
        bloodGroup: patient.bloodGroup,
        allergies: patient.allergies || ['Penicillin', 'Sulfa drugs'],
        conditions: (patient.diseases || []).map((d: any) => d.name),
        emergencyContact: patient.emergencyContact?.phone || '+91-98765-00002'
      } : {
        name: 'Rahul Kumar',
        id: 'pat-1',
        pmid: 'PMID-IND-8F42K91X',
        age: 24,
        bloodGroup: 'B+',
        allergies: ['Penicillin', 'Sulfa drugs'],
        conditions: ['Bronchial Asthma', 'Mild Mitral Valve Prolapse'],
        emergencyContact: '+91-98765-00002'
      };

      setPatientData(mockPatient);
      toast.success(`Patient identified: ${mockPatient.name} (${mockPatient.pmid})`);
      
      // Cryptographic Audit log entry
      appendAuditLogEntry({
        patientId: mockPatient.id,
        patientName: mockPatient.name,
        actorId: 'doc-1',
        actorName: 'Dr. Priya Sharma',
        actorRole: 'doctor',
        action: `Emergency ${scanMethod.toUpperCase()} Scan`,
        accessReason: 'Emergency Trauma Identification',
        details: `Identified patient by ${scanMethod}. PMID: ${mockPatient.pmid}. Records loaded for acute triage.`,
        hospitalName: 'Apollo Multispeciality Hospital'
      });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="section-title text-3xl mb-2">Emergency Biometric Access</h1>
        <p className="text-[var(--text-secondary)]">Bypass standard registration for critical trauma and unconscious patients</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Scanner Panel */}
        <div className="glass-card p-8 flex flex-col items-center justify-center min-h-[400px]">
          <div className="flex gap-4 mb-8 bg-[var(--bg-secondary)] p-1 rounded-xl">
            {['fingerprint', 'barcode', 'aadhaar'].map((method) => (
              <button
                key={method}
                onClick={() => setScanMethod(method as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                  scanMethod === method 
                    ? 'bg-[var(--bg-card)] shadow-sm text-blue-500' 
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {method}
              </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col items-center justify-center w-full">
            {scanMethod === 'fingerprint' && (
              <motion.button
                onClick={handleScan}
                disabled={isScanning}
                className="relative group p-12 rounded-full border-2 border-red-500/30 bg-red-500/5 hover:bg-red-500/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isScanning && (
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-red-500/20"
                    animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                )}
                <Fingerprint size={80} className={`text-red-500 ${isScanning ? 'animate-pulse' : ''}`} />
              </motion.button>
            )}

            {scanMethod === 'barcode' && (
              <div className="w-full space-y-4 text-center">
                <ScanBarcode size={64} className="mx-auto text-blue-500 mb-4" />
                <input type="text" placeholder="Scan Patient Wristband..." className="input-field text-center" />
                <button onClick={handleScan} className="btn-primary w-full justify-center">Verify Barcode</button>
              </div>
            )}

            {scanMethod === 'aadhaar' && (
              <div className="w-full space-y-4 text-center">
                <User size={64} className="mx-auto text-emerald-500 mb-4" />
                <input type="text" placeholder="Enter Aadhaar Number" className="input-field text-center tracking-widest" maxLength={12} />
                <button onClick={handleScan} className="btn-primary w-full justify-center">Authenticate</button>
              </div>
            )}
            
            <p className="mt-8 text-sm text-[var(--text-muted)]">
              {isScanning ? 'Scanning and matching health records...' : 'Initiate scan to retrieve critical health data'}
            </p>
          </div>
        </div>

        {/* Results Panel */}
        <div className="glass-card p-6 min-h-[400px] flex flex-col">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <FileText className="text-blue-500" /> Medical Profile Summary
          </h2>

          <AnimatePresence mode="wait">
            {patientData ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 flex-1"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)]">{patientData.name}</h3>
                    <p className="text-[var(--text-secondary)] font-mono">{patientData.id}</p>
                  </div>
                  <div className="badge-success px-3 py-1 flex items-center gap-1">
                    <CheckCircle size={14} /> Verified
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)]">
                    <p className="text-xs text-[var(--text-muted)]">Age/Sex</p>
                    <p className="font-semibold">{patientData.age} Y</p>
                  </div>
                  <div className="p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)]">
                    <p className="text-xs text-[var(--text-muted)]">Blood Group</p>
                    <p className="font-bold text-red-500">{patientData.bloodGroup}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-[var(--text-secondary)] mb-2 flex items-center gap-1">
                    <AlertTriangle size={16} className="text-amber-500" /> Allergies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {patientData.allergies.map((allergy: string) => (
                      <span key={allergy} className="badge-danger">{allergy}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-[var(--text-secondary)] mb-2">Chronic Conditions</h4>
                  <div className="flex flex-wrap gap-2">
                    {patientData.conditions.map((condition: string) => (
                      <span key={condition} className="badge-warning">{condition}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-[var(--border-color)]">
                  <button className="btn-primary w-full justify-center">Create Emergency Admission</button>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                <User size={48} className="mb-4 text-[var(--text-muted)]" />
                <p className="text-[var(--text-secondary)]">Awaiting patient identification...</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
