import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Activity, ArrowRight, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LabResults: React.FC = () => {
  const trendData = [
    { date: 'Jan', ldl: 140, hdl: 45 },
    { date: 'Mar', ldl: 135, hdl: 48 },
    { date: 'Jun', ldl: 125, hdl: 52 },
    { date: 'Sep', ldl: 115, hdl: 55 }
  ];

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between items-center">
        <h2 className="section-title">Lab Results</h2>
      </div>

      {/* AI Interpretation Banner */}
      <div className="glass-card p-5 border-l-4 border-purple-500 bg-purple-500/5">
        <div className="flex gap-4 items-start">
          <div className="p-2 bg-purple-500/20 rounded-lg shrink-0"><Activity className="text-purple-500" /></div>
          <div>
            <h4 className="font-bold text-[var(--text-primary)] mb-1">AI Health Summary - Latest Lipid Panel</h4>
            <p className="text-sm text-[var(--text-secondary)]">Your LDL cholesterol has improved by 8% since your last test. HDL (good cholesterol) is trending upwards. Keep up the dietary changes!</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-0 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-secondary)]">
            <h3 className="font-bold flex items-center gap-2"><FileText size={18}/> Lipid Panel</h3>
            <span className="text-sm text-[var(--text-muted)]">Sept 15, 2026</span>
          </div>
          <div className="p-0 flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="table-header">Test</th>
                  <th className="table-header">Result</th>
                  <th className="table-header">Ref Range</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-[var(--border-color)]">
                <tr>
                  <td className="table-cell font-medium">Total Chol</td>
                  <td className="table-cell text-yellow-500 font-bold">210 mg/dL</td>
                  <td className="table-cell text-[var(--text-muted)]">&lt;200</td>
                </tr>
                <tr>
                  <td className="table-cell font-medium">LDL</td>
                  <td className="table-cell text-green-500 font-bold">115 mg/dL</td>
                  <td className="table-cell text-[var(--text-muted)]">&lt;130</td>
                </tr>
                <tr>
                  <td className="table-cell font-medium">HDL</td>
                  <td className="table-cell text-green-500 font-bold">55 mg/dL</td>
                  <td className="table-cell text-[var(--text-muted)]">&gt;40</td>
                </tr>
                <tr>
                  <td className="table-cell font-medium">Triglycerides</td>
                  <td className="table-cell text-green-500 font-bold">140 mg/dL</td>
                  <td className="table-cell text-[var(--text-muted)]">&lt;150</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
            <button className="btn-secondary w-full flex items-center justify-center gap-2"><Download size={16}/> Export PDF</button>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-blue-500"/> Cholesterol Trend</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="date" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }} />
                <Line type="monotone" dataKey="ldl" stroke="#f59e0b" strokeWidth={3} name="LDL" />
                <Line type="monotone" dataKey="hdl" stroke="#10b981" strokeWidth={3} name="HDL" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LabResults;
