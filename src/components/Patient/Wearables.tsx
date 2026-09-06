import React from 'react';
import { motion } from 'framer-motion';
import { Watch, HeartPulse, Activity, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Wearables: React.FC = () => {
  const data = [
    { time: '08:00', hr: 68, spO2: 98 },
    { time: '10:00', hr: 72, spO2: 99 },
    { time: '12:00', hr: 85, spO2: 97 },
    { time: '14:00', hr: 110, spO2: 96 },
    { time: '16:00', hr: 75, spO2: 98 },
    { time: '18:00', hr: 70, spO2: 99 }
  ];

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between items-center">
        <h2 className="section-title">Connected Devices</h2>
        <button className="btn-primary flex items-center gap-2"><Zap size={16}/> Sync Now</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-t-4 border-blue-500">
          <div className="flex justify-between items-start mb-4">
            <Watch className="text-blue-500 w-8 h-8" />
            <span className="badge badge-success">Connected</span>
          </div>
          <h3 className="font-bold text-lg mb-1">Apple Watch Series 8</h3>
          <p className="text-sm text-[var(--text-muted)] mb-4">Last synced: 2 mins ago • Battery: 84%</p>
          <div className="flex justify-between text-sm">
            <span className="text-[var(--text-secondary)]">Sensors</span>
            <span className="font-semibold text-[var(--text-primary)]">HR, ECG, SpO2</span>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><HeartPulse className="text-red-500"/> Real-time Trends</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis dataKey="time" stroke="var(--text-muted)" />
              <YAxis yAxisId="left" stroke="var(--text-muted)" />
              <YAxis yAxisId="right" orientation="right" stroke="var(--text-muted)" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
              <Line yAxisId="left" type="monotone" dataKey="hr" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} name="Heart Rate" />
              <Line yAxisId="right" type="monotone" dataKey="spO2" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} name="SpO2 %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card bg-red-500/10 border-l-4 border-red-500 p-4">
        <div className="flex items-center gap-3">
          <Activity className="text-red-500" />
          <div>
            <h4 className="font-bold text-red-500">Threshold Alert: Elevated Heart Rate</h4>
            <p className="text-sm text-red-400">Heart rate reached 110 bpm at 14:00. This is above your resting threshold.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Wearables;
