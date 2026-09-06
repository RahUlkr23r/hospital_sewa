import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, CheckCircle, Clock } from 'lucide-react';

const Insurance: React.FC = () => {
  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="section-title">Insurance & Claims</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 relative overflow-hidden gradient-brand text-white">
          <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
            <Shield size={100} />
          </div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-bold text-2xl drop-shadow-md">HealthGuard Premium</h3>
                <p className="opacity-90">Policy: #HG-9823-XYZ</p>
              </div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium border border-white/30">Active</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Coverage Utilized</span>
                  <span className="font-bold">$2,450 / $10,000</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '24.5%' }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm bg-black/10 p-3 rounded-lg backdrop-blur-sm">
                <div>
                  <p className="opacity-75 text-xs uppercase tracking-wider">Valid Till</p>
                  <p className="font-bold">Dec 31, 2026</p>
                </div>
                <div>
                  <p className="opacity-75 text-xs uppercase tracking-wider">Co-Pay</p>
                  <p className="font-bold">20%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><FileText className="text-blue-500"/> Recent Claims</h3>
          <div className="space-y-4">
            <div className="p-4 border border-[var(--border-color)] rounded-lg bg-[var(--bg-secondary)]">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-[var(--text-primary)]">Cardiology Consult</h4>
                  <p className="text-xs text-[var(--text-muted)]">Sept 10, 2026 • City Hospital</p>
                </div>
                <span className="text-lg font-bold text-[var(--text-primary)]">$150.00</span>
              </div>
              <div className="flex items-center gap-2 mt-3 text-sm">
                <CheckCircle className="text-green-500 w-4 h-4" />
                <span className="text-green-500 font-medium">Approved & Paid</span>
              </div>
            </div>
            
            <div className="p-4 border border-[var(--border-color)] rounded-lg bg-[var(--bg-secondary)]">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-[var(--text-primary)]">Lipid Panel Lab Test</h4>
                  <p className="text-xs text-[var(--text-muted)]">Sept 15, 2026 • PathLabs</p>
                </div>
                <span className="text-lg font-bold text-[var(--text-primary)]">$85.00</span>
              </div>
              <div className="flex items-center gap-2 mt-3 text-sm">
                <Clock className="text-yellow-500 w-4 h-4" />
                <span className="text-yellow-500 font-medium">Processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Insurance;
