import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Gift } from 'lucide-react';

const Gamification: React.FC = () => {
  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between items-center">
        <h2 className="section-title">Health Achievements</h2>
        <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-600 dark:text-yellow-500 px-4 py-2 rounded-full font-bold">
          <Star size={18} className="fill-current" /> 1,250 Points
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 md:col-span-2">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Trophy className="text-purple-500"/> Badges Earned</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Early Bird', desc: 'Workout before 7AM', icon: '🌅', unlocked: true },
              { name: 'Hydrated', desc: 'Drink 2L water 7 days', icon: '💧', unlocked: true },
              { name: 'Step Master', desc: '10k steps 30 days', icon: '👟', unlocked: true },
              { name: 'Zen Mind', desc: 'Meditate 5 hours', icon: '🧘', unlocked: false }
            ].map((badge, i) => (
              <div key={i} className={`flex flex-col items-center text-center p-4 rounded-xl border ${badge.unlocked ? 'border-purple-500/30 bg-purple-500/5' : 'border-[var(--border-color)] bg-[var(--bg-secondary)] opacity-50 grayscale'}`}>
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h4 className="font-bold text-sm text-[var(--text-primary)]">{badge.name}</h4>
                <p className="text-xs text-[var(--text-muted)] mt-1">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Target className="text-red-500"/> Daily Quests</h3>
          <div className="space-y-4 flex-1">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-[var(--text-primary)]">Log Blood Pressure</span>
                <span className="text-[var(--text-muted)]">50 pts</span>
              </div>
              <div className="w-full bg-[var(--bg-secondary)] rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-[var(--text-primary)]">Walk 8,000 steps</span>
                <span className="text-[var(--text-muted)]">100 pts</span>
              </div>
              <div className="w-full bg-[var(--bg-secondary)] rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
          <button className="btn-primary w-full mt-4">Claim Rewards</button>
        </div>
      </div>

      <div className="glass-card p-6 border-l-4 border-green-500 bg-green-500/5">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-500/20 rounded-full"><Gift className="text-green-500 w-8 h-8"/></div>
          <div>
            <h4 className="font-bold text-lg text-[var(--text-primary)]">Premium Discount Unlocked!</h4>
            <p className="text-[var(--text-secondary)]">Because you maintained an excellent Vitality Score for 3 months, your next insurance premium is discounted by 5%.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Gamification;
