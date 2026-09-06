import React, { useState } from 'react';
import { FileText, Save, BrainCircuit, Activity, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Consultation() {
  const [notes, setNotes] = useState({ s: '', o: '', a: '', p: '' });

  const aiSuggestions = [
    { diagnosis: 'Acute Bronchitis', prob: 85, icd: 'J20.9' },
    { diagnosis: 'Pneumonia', prob: 45, icd: 'J18.9' },
    { diagnosis: 'Asthma Exacerbation', prob: 30, icd: 'J45.901' },
  ];

  const handleSave = () => {
    toast.success('Consultation saved successfully');
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="section-title flex items-center gap-2">
            <FileText className="text-blue-500" /> E-Consultation
          </h1>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={handleSave}>
          <Save size={18} /> Save Record
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* SOAP Notes */}
        <div className="lg:col-span-2 space-y-4 flex flex-col">
          <div className="glass-card p-4">
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold text-sm">Subjective (Patient's words)</h3>
            </div>
            <textarea 
              className="input-field w-full h-24 resize-none" 
              placeholder="e.g. Patient complains of severe headache for 3 days..."
              value={notes.s} onChange={e => setNotes({...notes, s: e.target.value})}
            />
          </div>
          
          <div className="glass-card p-4">
            <h3 className="font-semibold text-sm mb-2">Objective (Vitals & Exam)</h3>
            <textarea 
              className="input-field w-full h-24 resize-none" 
              placeholder="e.g. BP 140/90, HR 88, Temp 99.1F..."
              value={notes.o} onChange={e => setNotes({...notes, o: e.target.value})}
            />
          </div>

          <div className="glass-card p-4">
            <h3 className="font-semibold text-sm mb-2">Assessment (Diagnosis)</h3>
            <textarea 
              className="input-field w-full h-24 resize-none" 
              placeholder="Enter diagnosis details..."
              value={notes.a} onChange={e => setNotes({...notes, a: e.target.value})}
            />
          </div>

          <div className="glass-card p-4">
            <h3 className="font-semibold text-sm mb-2">Plan (Treatment & Rx)</h3>
            <textarea 
              className="input-field w-full h-24 resize-none" 
              placeholder="Prescriptions, follow-ups, advice..."
              value={notes.p} onChange={e => setNotes({...notes, p: e.target.value})}
            />
          </div>
        </div>

        {/* AI Sidebar */}
        <div className="space-y-6 flex flex-col">
          <div className="glass-card p-5 border-blue-500/20 bg-gradient-to-b from-blue-500/5 to-transparent">
            <h3 className="font-semibold flex items-center gap-2 mb-4 text-blue-500">
              <BrainCircuit size={18} /> AI Differential Diagnosis
            </h3>
            
            <div className="space-y-4">
              {aiSuggestions.map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.diagnosis}</span>
                    <span className="text-[var(--text-muted)] text-xs">{item.icd}</span>
                  </div>
                  <div className="h-1.5 w-full bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.prob > 70 ? 'bg-emerald-500' : item.prob > 40 ? 'bg-amber-500' : 'bg-blue-500'}`}
                      style={{ width: `${item.prob}%` }}
                    />
                  </div>
                  <div className="text-right text-xs text-[var(--text-muted)]">{item.prob}% match</div>
                </div>
              ))}
            </div>
            <button className="btn-secondary w-full mt-4 text-xs">Run Deeper Analysis</button>
          </div>

          <div className="glass-card p-5 flex-1">
            <h3 className="font-semibold flex items-center gap-2 mb-4">
              <Activity size={18} /> Recommended Investigations
            </h3>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2 p-2 hover:bg-[var(--bg-secondary)] rounded cursor-pointer">
                <input type="checkbox" className="rounded border-[var(--border-color)] bg-transparent text-blue-500 focus:ring-blue-500" />
                Complete Blood Count (CBC)
              </label>
              <label className="flex items-center gap-2 p-2 hover:bg-[var(--bg-secondary)] rounded cursor-pointer">
                <input type="checkbox" className="rounded border-[var(--border-color)] bg-transparent text-blue-500 focus:ring-blue-500" />
                Chest X-Ray (PA View)
              </label>
            </div>
            
            <button className="btn-ghost w-full mt-2 text-xs flex items-center justify-center gap-1">
              <Plus size={14} /> Add Custom Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
