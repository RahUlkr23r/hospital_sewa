import React from 'react';
import { motion } from 'framer-motion';
import { Pill, AlertTriangle, CheckCircle, RefreshCcw, DollarSign } from 'lucide-react';

const Prescriptions: React.FC = () => {
  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="section-title">Active Prescriptions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 rounded-lg"><Pill className="text-blue-500"/></div>
              <div>
                <h3 className="font-bold text-lg text-[var(--text-primary)]">Lisinopril</h3>
                <p className="text-sm text-[var(--text-secondary)]">10mg Tablet</p>
              </div>
            </div>
            <span className="badge badge-success">Active</span>
          </div>
          
          <div className="bg-[var(--bg-secondary)] p-4 rounded-lg mb-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-muted)]">Dosage</span>
              <span className="font-medium text-[var(--text-primary)]">1 tab daily, Morning</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-muted)]">Duration</span>
              <span className="font-medium text-[var(--text-primary)]">90 days (60 remaining)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-muted)]">Prescribed by</span>
              <span className="font-medium text-[var(--text-primary)]">Dr. Sarah Jenkins</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="btn-primary flex-1 flex justify-center items-center gap-2"><RefreshCcw size={16}/> Refill Now</button>
            <button className="btn-secondary flex-1 flex justify-center items-center gap-2"><DollarSign size={16}/> Compare Prices</button>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><AlertTriangle className="text-yellow-500"/> Interaction Warnings</h3>
          <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-4">
            <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium mb-1">Moderate Interaction Detected</p>
            <p className="text-xs text-yellow-700 dark:text-yellow-500">Lisinopril + Potassium Supplements may lead to increased potassium levels in blood.</p>
          </div>
          <div className="bg-green-500/10 border-l-4 border-green-500 p-4 rounded-r-lg">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="text-green-500 w-4 h-4" />
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">No Food Interactions</p>
            </div>
            <p className="text-xs text-green-700 dark:text-green-500">Current medications are safe to take with your standard diet.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Prescriptions;
