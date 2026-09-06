import React, { useState, useEffect } from 'react';
import { Shield, ArrowRight, AlertTriangle, CheckCircle, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlockchainAudit() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [tamperedIdx, setTamperedIdx] = useState<number | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    // Dummy initial blocks
    setBlocks([
      { index: 0, hash: '0000a1b2c3d4...', actor: 'System', action: 'Genesis Block', time: '2023-01-01 00:00:00' },
      { index: 1, hash: '0000x9y8z7w6...', actor: 'Dr. Sharma', action: 'Update Record', time: '2023-10-12 10:30:15' },
      { index: 2, hash: '0000q1w2e3r4...', actor: 'Apollo Hospital', action: 'Admit Patient', time: '2023-10-12 14:45:20' },
      { index: 3, hash: '0000m9n8b7v6...', actor: 'Gov Portal', action: 'Issue Alert', time: '2023-10-13 09:15:00' },
    ]);
  }, []);

  const simulateTamper = (index: number) => {
    setTamperedIdx(index);
    setVerified(false);
  };

  const verifyChain = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerified(tamperedIdx === null);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-500" />
          Blockchain Audit Trail
        </h1>
        <div className="flex gap-3">
          <button onClick={verifyChain} className="btn-primary flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {isVerifying ? 'Verifying...' : 'Verify Chain'}
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Log
          </button>
        </div>
      </div>

      {verified === true && (
        <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-500 flex items-center gap-3">
          <CheckCircle className="w-5 h-5" />
          Chain integrity verified successfully. No tampering detected.
        </div>
      )}
      {verified === false && tamperedIdx !== null && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-500 flex items-center gap-3 animate-pulse-fast">
          <AlertTriangle className="w-5 h-5" />
          CRITICAL: Chain integrity compromised starting at Block #{tamperedIdx}!
        </div>
      )}

      {/* Chain Visualization */}
      <div className="overflow-x-auto pb-8">
        <div className="flex items-center min-w-max p-4">
          {blocks.map((block, idx) => {
            const isTampered = tamperedIdx !== null && idx >= tamperedIdx;
            return (
              <React.Fragment key={block.index}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                  className={`glass-card p-4 w-64 flex-shrink-0 relative ${isTampered ? 'border-red-500 bg-red-500/10' : 'border-green-500/30'}`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-[var(--bg-secondary)] text-[var(--text-secondary)]">Block #{block.index}</span>
                    <button 
                      onClick={() => simulateTamper(idx)}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors"
                      title="Simulate Tampering"
                    >
                      Tamper
                    </button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="truncate"><span className="text-[var(--text-muted)]">Hash:</span> <span className={`font-mono ${isTampered ? 'text-red-400' : 'text-green-400'}`}>{isTampered ? 'INVALID_HASH...' : block.hash}</span></p>
                    <p className="truncate"><span className="text-[var(--text-muted)]">Actor:</span> <span className="text-[var(--text-primary)]">{block.actor}</span></p>
                    <p className="truncate"><span className="text-[var(--text-muted)]">Action:</span> <span className="text-[var(--text-primary)]">{block.action}</span></p>
                    <p className="truncate text-xs text-[var(--text-muted)]">{block.time}</p>
                  </div>
                </motion.div>
                {idx < blocks.length - 1 && (
                  <div className={`w-12 h-0.5 ${isTampered ? 'bg-red-500' : 'bg-blue-500/50'} relative mx-2`}>
                    <ArrowRight className={`absolute -right-3 -top-2.5 w-6 h-6 ${isTampered ? 'text-red-500' : 'text-blue-500/50'}`} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Access Heatmap & Audit Log</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-color)] text-[var(--text-muted)]">
                <th className="p-3">Timestamp</th>
                <th className="p-3">Actor</th>
                <th className="p-3">Action</th>
                <th className="p-3">Resource</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { t: '2023-10-13 09:15:00', a: 'Gov System', ac: 'Issue Alert', r: 'System Wide', s: 'Success' },
                { t: '2023-10-12 14:45:20', a: 'Apollo Hospital', ac: 'Admit Patient', r: 'Patient #8271', s: 'Success' },
                { t: '2023-10-12 11:20:05', a: 'Unknown IP', ac: 'Access Attempt', r: 'Admin DB', s: 'Failed' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-[var(--border-color)]/50 hover:bg-[var(--bg-secondary)]">
                  <td className="p-3 text-sm text-[var(--text-secondary)]">{row.t}</td>
                  <td className="p-3 text-sm text-[var(--text-primary)]">{row.a}</td>
                  <td className="p-3 text-sm text-[var(--text-secondary)]">{row.ac}</td>
                  <td className="p-3 text-sm text-[var(--text-secondary)]">{row.r}</td>
                  <td className="p-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${row.s === 'Success' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                      {row.s}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
