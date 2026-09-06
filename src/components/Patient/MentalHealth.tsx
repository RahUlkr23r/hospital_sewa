import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Smile, Meh, Frown, BookOpen } from 'lucide-react';
import { getPHQ9Category } from '../../utils/calculations';

const MentalHealth: React.FC = () => {
  const [phqScore, setPhqScore] = useState<number | null>(null);

  const calculateScore = () => {
    // Mock score calculation
    setPhqScore(8);
  };

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="section-title">Mental Health & Well-being</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Brain className="text-purple-500"/> PHQ-9 Assessment</h3>
          {phqScore === null ? (
            <div className="space-y-4">
              <p className="text-[var(--text-secondary)] text-sm mb-4">A brief questionnaire to screen for depression. Your answers are private.</p>
              <button className="btn-primary w-full" onClick={calculateScore}>Start Assessment</button>
            </div>
          ) : (
            <div className="text-center p-6 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]">
              <div className="text-5xl font-bold text-[var(--text-primary)] mb-2">{phqScore}</div>
              <span className={`badge ${phqScore > 9 ? 'badge-warning' : 'badge-success'} text-sm px-3 py-1 mb-4`}>
                {getPHQ9Category(phqScore).label}
              </span>
              <p className="text-sm text-[var(--text-muted)] mt-4">Based on your score, you are experiencing mild symptoms. Consider exploring our wellness resources.</p>
              <button className="btn-secondary mt-4 w-full" onClick={() => setPhqScore(null)}>Retake</button>
            </div>
          )}
        </div>

        <div className="glass-card p-6">
          <h3 className="font-bold text-lg mb-4">Daily Mood Tracker</h3>
          <div className="flex justify-between items-center mb-6">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-2">
                <span className="text-xs text-[var(--text-muted)]">{day}</span>
                <button className={`p-2 rounded-full transition-colors ${i === 4 ? 'bg-green-500/20 text-green-500' : 'bg-[var(--bg-secondary)] hover:bg-[var(--bg-card)]'}`}>
                  {i === 1 || i === 3 ? <Meh size={20} /> : i === 2 ? <Frown size={20} /> : <Smile size={20} />}
                </button>
              </div>
            ))}
          </div>
          <div className="border-t border-[var(--border-color)] pt-4">
            <h4 className="text-sm font-bold mb-3 flex items-center gap-2"><BookOpen size={16} className="text-blue-500"/> Recommended Reading</h4>
            <div className="p-3 bg-[var(--bg-secondary)] rounded-lg hover:bg-[var(--bg-card)] cursor-pointer transition-colors border border-transparent hover:border-[var(--border-color)]">
              <h5 className="font-medium text-[var(--text-primary)] text-sm">Managing Workplace Stress</h5>
              <p className="text-xs text-[var(--text-muted)] mt-1">5-minute read • Mindfulness</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MentalHealth;
