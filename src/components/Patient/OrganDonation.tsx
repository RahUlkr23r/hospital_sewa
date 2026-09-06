import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Info } from 'lucide-react';
import toast from 'react-hot-toast';

const OrganDonation: React.FC = () => {
  const [enrolled, setEnrolled] = useState(true);

  const toggleEnrollment = () => {
    setEnrolled(!enrolled);
    toast.success(enrolled ? 'Opted out of organ donation' : 'Enrolled in organ donation', { icon: '🫀' });
  };

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="section-title">Organ & Tissue Donation</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Heart size={150} />
          </div>
          <Heart className={`w-20 h-20 mb-4 transition-colors ${enrolled ? 'text-red-500' : 'text-slate-400'}`} />
          <h3 className="text-2xl font-bold mb-2">Registered Donor</h3>
          <p className="text-[var(--text-secondary)] mb-6 max-w-sm z-10">One donor can save up to 8 lives and enhance the lives of up to 75 more.</p>
          
          <div className="flex items-center gap-3 bg-[var(--bg-secondary)] p-2 rounded-full border border-[var(--border-color)] z-10">
            <span className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-colors ${!enrolled ? 'bg-slate-500 text-white' : 'text-[var(--text-muted)]'}`} onClick={() => enrolled && toggleEnrollment()}>Opt Out</span>
            <span className={`px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-colors ${enrolled ? 'bg-red-500 text-white shadow-lg shadow-red-500/50' : 'text-[var(--text-muted)]'}`} onClick={() => !enrolled && toggleEnrollment()}>Enrolled</span>
          </div>
        </div>

        {enrolled && (
          <div className="glass-card p-0 overflow-hidden flex flex-col relative gradient-danger text-white">
            <div className="p-6 flex-1 relative z-10">
              <div className="flex justify-between items-start mb-8">
                <h3 className="font-bold text-xl uppercase tracking-widest opacity-80">Donor Card</h3>
                <Heart className="text-white fill-white" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">John Doe</p>
                <p className="opacity-80 font-mono">ID: 9876-5432-10</p>
                <p className="opacity-80 text-sm mt-4">I hereby consent to donate all organs and tissues for transplant, therapy, research, or education upon my death.</p>
              </div>
            </div>
            <div className="bg-black/20 p-4 backdrop-blur-md flex justify-between items-center z-10">
              <span className="text-xs uppercase font-bold tracking-wider opacity-75">HealthBridge Registry</span>
              <button className="flex items-center gap-2 text-sm font-bold hover:bg-white/10 px-3 py-1 rounded transition-colors"><Share2 size={16}/> Share with Family</button>
            </div>
          </div>
        )}
      </div>

      <div className="glass-card p-6 bg-blue-500/5 border border-blue-500/20">
        <h4 className="font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2"><Info className="text-blue-500" size={18}/> Why Share Your Decision?</h4>
        <p className="text-sm text-[var(--text-secondary)]">Your family will be asked to authorize your donation before it can proceed. Making your wishes known to them in advance relieves them of making a difficult decision during a time of grief.</p>
      </div>
    </motion.div>
  );
};

export default OrganDonation;
