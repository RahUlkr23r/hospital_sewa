import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Apple, Target } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

const Fitness: React.FC = () => {
  const macroData = [
    { name: 'Protein', value: 120, color: '#ef4444' },
    { name: 'Carbs', value: 250, color: '#3b82f6' },
    { name: 'Fat', value: 65, color: '#f59e0b' }
  ];

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="section-title">Fitness & Nutrition</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
          <Target className="text-blue-500 w-10 h-10 mb-2" />
          <h3 className="font-bold text-lg mb-1">BMI Calculator</h3>
          <div className="text-4xl font-bold text-[var(--text-primary)] my-3">23.4</div>
          <span className="badge badge-success">Normal Weight</span>
          <p className="text-xs text-[var(--text-muted)] mt-3">Target: 22.0 - 24.9</p>
        </div>

        <div className="glass-card p-6 md:col-span-2">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Apple className="text-green-500"/> Daily Nutrition Goal</h3>
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={macroData} innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                    {macroData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {macroData.map(macro => (
                <div key={macro.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[var(--text-secondary)]">{macro.name}</span>
                    <span className="font-medium">{macro.value}g</span>
                  </div>
                  <div className="w-full bg-[var(--bg-secondary)] rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ width: '70%', backgroundColor: macro.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Dumbbell className="text-orange-500"/> AI Recommended Workout</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl hover:border-orange-500/50 transition-colors">
            <h4 className="font-bold text-[var(--text-primary)] mb-1">HIIT Cardio</h4>
            <p className="text-sm text-[var(--text-muted)] mb-3">20 mins • High Intensity</p>
            <button className="text-orange-500 text-sm font-medium hover:underline">View Routine</button>
          </div>
          <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl hover:border-blue-500/50 transition-colors">
            <h4 className="font-bold text-[var(--text-primary)] mb-1">Core & Flexibility</h4>
            <p className="text-sm text-[var(--text-muted)] mb-3">15 mins • Low Intensity</p>
            <button className="text-blue-500 text-sm font-medium hover:underline">View Routine</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Fitness;
