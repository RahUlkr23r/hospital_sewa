import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Ambulance, AlertOctagon, Info } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import toast from 'react-hot-toast';

const EmergencyPlan: React.FC = () => {
  const { triggerEmergency } = useEmergency();
  const [sosSent, setSosSent] = useState(false);

  const handleSOS = () => {
    triggerEmergency({ 
      type: 'sos', 
      message: 'SOS Alert sent to emergency contacts and nearest hospital.',
      timestamp: new Date().toISOString()
    });
    setSosSent(true);
    toast.error('EMERGENCY SOS ACTIVATED', { icon: '🚨' });
  };

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="glass-card p-8 border-2 border-red-500 bg-red-500/5 text-center flex flex-col items-center justify-center relative overflow-hidden">
        {sosSent && (
          <div className="absolute inset-0 bg-red-500/20 animate-siren pointer-events-none"></div>
        )}
        <h2 className="text-2xl font-bold text-red-500 mb-2">Emergency Assistance</h2>
        <p className="text-[var(--text-secondary)] mb-8 max-w-md">Pressing this button will immediately notify your emergency contacts and dispatch an ambulance to your location.</p>
        
        <button 
          onClick={handleSOS}
          disabled={sosSent}
          className={`w-40 h-40 rounded-full flex flex-col items-center justify-center text-white font-bold text-2xl shadow-[0_0_50px_rgba(239,68,68,0.5)] transition-all transform hover:scale-105 active:scale-95 ${sosSent ? 'bg-red-700 opacity-50 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 animate-pulse-slow'}`}
        >
          <AlertOctagon size={48} className="mb-2" />
          {sosSent ? 'DISPATCHED' : 'SOS'}
        </button>
        
        {sosSent && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-4 bg-[var(--bg-card)] rounded-lg border border-red-500/50 w-full max-w-md text-left flex gap-4">
            <Ambulance className="text-red-500 shrink-0 animate-bounce" size={32} />
            <div>
              <h4 className="font-bold text-red-500">Ambulance Dispatched</h4>
              <p className="text-sm text-[var(--text-primary)]">ETA: 6 Minutes</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">Keep your phone nearby. Responders have been sent your medical history.</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Phone className="text-blue-500"/> Emergency Contacts</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)]">
              <div>
                <h4 className="font-medium text-[var(--text-primary)]">Jane Doe (Spouse)</h4>
                <p className="text-sm text-[var(--text-muted)]">+1 (555) 123-4567</p>
              </div>
              <button className="p-2 bg-green-500/20 text-green-500 rounded-full hover:bg-green-500/30 transition-colors"><Phone size={16}/></button>
            </div>
            <div className="flex justify-between items-center p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)]">
              <div>
                <h4 className="font-medium text-[var(--text-primary)]">Dr. Smith (Primary)</h4>
                <p className="text-sm text-[var(--text-muted)]">+1 (555) 987-6543</p>
              </div>
              <button className="p-2 bg-green-500/20 text-green-500 rounded-full hover:bg-green-500/30 transition-colors"><Phone size={16}/></button>
            </div>
          </div>
          <button className="mt-4 text-blue-500 text-sm font-medium hover:underline w-full text-center">+ Add New Contact</button>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Info className="text-purple-500"/> Medical Instructions for EMS</h3>
          <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-3 mb-4 rounded-r-lg">
            <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">Allergic to Penicillin</p>
          </div>
          <textarea 
            className="input-field w-full h-32 resize-none"
            placeholder="Add specific instructions for emergency responders..."
            defaultValue="I have a pacemaker (implanted 2022). Type 2 Diabetic."
          ></textarea>
          <button className="btn-primary w-full mt-4">Save Instructions</button>
        </div>
      </div>
    </motion.div>
  );
};

export default EmergencyPlan;
