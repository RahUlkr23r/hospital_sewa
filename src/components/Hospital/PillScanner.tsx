import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill, AlertOctagon, CheckCircle2, AlertTriangle, ScanLine, Info } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PillScanner() {
  const [drug, setDrug] = useState('');
  const [patient, setPatient] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Mock checking logic
  const handleVerify = () => {
    if (!drug || !patient) return toast.error("Enter drug and patient");
    
    setIsScanning(true);
    setResult(null);

    setTimeout(() => {
      setIsScanning(false);
      const drugLower = drug.toLowerCase();
      
      if (drugLower.includes('penicillin')) {
        setResult({
          status: 'danger',
          message: 'CRITICAL ALLERGY CONFLICT',
          details: 'Patient has a documented anaphylactic allergy to Penicillin.',
          alternatives: ['Azithromycin', 'Clindamycin']
        });
      } else if (drugLower.includes('warfarin')) {
        setResult({
          status: 'warning',
          message: 'DRUG INTERACTION DETECTED',
          details: 'Interaction with currently prescribed Aspirin. May increase bleeding risk.',
          alternatives: ['Rivaroxaban (Requires consult)']
        });
      } else {
        setResult({
          status: 'success',
          message: 'SAFE TO PRESCRIBE',
          details: 'No known allergies or interactions detected.',
          alternatives: []
        });
      }
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <header>
        <h1 className="section-title flex items-center gap-2">
          <Pill className="text-purple-500" /> Smart Pill Scanner & Verifier
        </h1>
        <p className="text-[var(--text-secondary)]">AI-powered cross-check for allergies, interactions, and dosage.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scanner Form */}
        <div className="glass-card p-6 lg:col-span-1 space-y-6 h-fit">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Patient</label>
            <select 
              className="input-field w-full"
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
            >
              <option value="">Select Patient...</option>
              <option value="p1">Rahul Sharma (UID-9876)</option>
              <option value="p2">Priya Patel (UID-1234)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Drug Name / Barcode</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Scan or type..." 
                className="input-field w-full pl-10"
                value={drug}
                onChange={(e) => setDrug(e.target.value)}
              />
              <ScanLine className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            </div>
          </div>

          <button 
            className="btn-primary w-full justify-center py-3"
            onClick={handleVerify}
            disabled={isScanning}
          >
            {isScanning ? 'Verifying...' : 'Verify Prescription'}
          </button>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                {/* Status Banner */}
                <div className={`p-6 rounded-xl border ${
                  result.status === 'danger' ? 'bg-red-500/10 border-red-500/50 text-red-500' :
                  result.status === 'warning' ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' :
                  'bg-emerald-500/10 border-emerald-500/50 text-emerald-500'
                }`}>
                  <div className="flex items-center gap-4">
                    {result.status === 'danger' && <AlertOctagon size={48} className="animate-pulse" />}
                    {result.status === 'warning' && <AlertTriangle size={48} />}
                    {result.status === 'success' && <CheckCircle2 size={48} />}
                    <div>
                      <h2 className="text-2xl font-bold">{result.message}</h2>
                      <p className="mt-1 opacity-90">{result.details}</p>
                    </div>
                  </div>
                </div>

                {/* Alternatives */}
                {result.alternatives.length > 0 && (
                  <div className="glass-card p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Info className="text-blue-500" /> Suggested Alternatives
                    </h3>
                    <div className="flex gap-2">
                      {result.alternatives.map((alt: string) => (
                        <span key={alt} className="badge badge-brand text-sm px-3 py-1">{alt}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Generic vs Brand Comparison */}
                <div className="glass-card p-6 overflow-hidden">
                  <h3 className="font-semibold mb-4">Cost Comparison</h3>
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border-color)]">
                        <th className="py-2">Variant</th>
                        <th className="py-2">Manufacturer</th>
                        <th className="py-2">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-color)]">
                      <tr>
                        <td className="py-3 font-medium text-[var(--text-primary)]">Generic Equivalent</td>
                        <td className="py-3 text-[var(--text-secondary)]">JanAushadhi</td>
                        <td className="py-3 text-emerald-500 font-bold">₹45.00</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium text-[var(--text-primary)]">{drug || 'Branded'}</td>
                        <td className="py-3 text-[var(--text-secondary)]">PharmaCorp Inc.</td>
                        <td className="py-3">₹350.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
            {!result && !isScanning && (
              <div className="h-full min-h-[300px] glass-card flex flex-col items-center justify-center text-[var(--text-muted)] p-8 text-center">
                <Pill size={64} className="mb-4 opacity-20" />
                <p>Scan or enter a drug name to verify safety against the patient's medical history.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
