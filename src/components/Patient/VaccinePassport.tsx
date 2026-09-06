import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, Syringe, Plane } from 'lucide-react';

const VaccinePassport: React.FC = () => {
  const qrData = JSON.stringify({ type: 'VACCINE_PASSPORT', status: 'FULLY_VACCINATED', id: 'VP-9982' });

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="section-title">Vaccine Passport</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 md:col-span-1 flex flex-col items-center justify-center text-center border-t-4 border-green-500">
          <div className="bg-white p-4 rounded-2xl shadow-lg mb-4">
            <QRCodeSVG value={qrData} size={150} />
          </div>
          <h3 className="font-bold text-lg text-[var(--text-primary)]">Verified Status</h3>
          <p className="text-sm text-[var(--text-muted)] mb-3">ID: VP-9982-XYZ</p>
          <span className="badge badge-success flex items-center gap-1"><ShieldCheck size={14}/> Fully Vaccinated</span>
        </div>

        <div className="glass-card p-6 md:col-span-2">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Syringe className="text-blue-500"/> Immunization History</h3>
          <div className="space-y-4">
            {[
              { name: 'COVID-19 Bivalent Booster', date: 'Oct 12, 2025', brand: 'Pfizer-BioNTech', status: 'Valid' },
              { name: 'Influenza (Flu)', date: 'Sep 01, 2025', brand: 'Flucelvax', status: 'Valid' },
              { name: 'Tetanus, Diphtheria, Pertussis', date: 'Mar 15, 2020', brand: 'Boostrix', status: 'Expiring Soon' }
            ].map((v, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)]">
                <div>
                  <h4 className="font-bold text-[var(--text-primary)]">{v.name}</h4>
                  <p className="text-xs text-[var(--text-muted)]">{v.date} • {v.brand}</p>
                </div>
                <span className={`badge ${v.status === 'Valid' ? 'badge-success' : 'badge-warning'}`}>{v.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-4 bg-blue-500/5 border border-blue-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-full"><Plane className="text-blue-500"/></div>
          <div>
            <h4 className="font-bold text-[var(--text-primary)]">Travel Eligibility</h4>
            <p className="text-sm text-[var(--text-secondary)]">Your vaccination status meets the entry requirements for 142 countries.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VaccinePassport;
