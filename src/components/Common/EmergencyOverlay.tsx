import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Phone, Ambulance as AmbulanceIcon } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export default function EmergencyOverlay() {
  const { emergency, dismissEmergency } = useEmergency();

  const typeConfig: Record<string, { title: string; icon: React.ReactNode; color: string }> = {
    cardiac: { title: '🚨 CARDIAC EMERGENCY', icon: <AlertTriangle size={48} />, color: 'text-red-500' },
    allergy: { title: '⚠️ SEVERE ALLERGY ALERT', icon: <AlertTriangle size={48} />, color: 'text-orange-500' },
    tamper: { title: '🔒 TAMPER DETECTED', icon: <AlertTriangle size={48} />, color: 'text-red-600' },
    sos: { title: '🆘 SOS ACTIVATED', icon: <AmbulanceIcon size={48} />, color: 'text-red-500' },
    deterioration: { title: '📉 PATIENT DETERIORATION', icon: <AlertTriangle size={48} />, color: 'text-red-500' },
  };

  const config = emergency.type ? typeConfig[emergency.type] : typeConfig.cardiac;

  return (
    <AnimatePresence>
      {emergency.isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="emergency-overlay"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className="emergency-card text-center"
          >
            <div className={`${config.color} mb-4 flex justify-center`}>
              {config.icon}
            </div>
            <h2 className="text-2xl font-black text-danger mb-3">{config.title}</h2>
            {emergency.patientName && (
              <p className="text-lg font-semibold mb-2">Patient: {emergency.patientName}</p>
            )}
            <p className="text-[var(--text-secondary)] mb-6">{emergency.message}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={dismissEmergency}
                className="btn-danger flex items-center gap-2"
              >
                <X size={16} />
                Acknowledge & Dismiss
              </button>
              {emergency.type === 'sos' && (
                <button className="btn-primary flex items-center gap-2">
                  <Phone size={16} />
                  Call Emergency
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
