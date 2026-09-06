import React from 'react';
import { motion } from 'framer-motion';
import { Video, Calendar, MessageSquare, Clock } from 'lucide-react';

const Telemedicine: React.FC = () => {
  return (
    <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between items-center">
        <h2 className="section-title">Telemedicine Hub</h2>
        <button className="btn-primary flex items-center gap-2"><Calendar size={18}/> Book Consult</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 border-l-4 border-blue-500">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="badge badge-info mb-2 inline-block">Upcoming</span>
              <h3 className="font-bold text-xl text-[var(--text-primary)]">Dr. Sarah Jenkins</h3>
              <p className="text-[var(--text-secondary)]">Cardiologist</p>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-xl">
              <Video className="text-blue-500 w-8 h-8" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mb-6">
            <Clock size={16} />
            <span>Today, 14:30 PM (in 2 hours)</span>
          </div>
          <div className="flex gap-3">
            <button className="btn-primary flex-1 flex justify-center items-center gap-2">Join Call</button>
            <button className="btn-secondary flex-1">Reschedule</button>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col h-full">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><MessageSquare className="text-purple-500"/> AI Health Assistant</h3>
          <div className="flex-1 bg-[var(--bg-secondary)] rounded-lg p-4 mb-4 min-h-[200px] overflow-y-auto space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white shrink-0">AI</div>
              <div className="bg-[var(--bg-card)] p-3 rounded-lg rounded-tl-none border border-[var(--border-color)] text-sm text-[var(--text-secondary)]">
                Hello! I notice you have an upcoming cardiology consult. Have you experienced any chest pain or shortness of breath today?
              </div>
            </div>
            <div className="flex gap-3 flex-row-reverse">
              <div className="bg-blue-500 text-white p-3 rounded-lg rounded-tr-none text-sm">
                No chest pain, just feeling a bit fatigued after my morning walk.
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <input type="text" className="input-field flex-1" placeholder="Type your message..." />
            <button className="btn-primary px-6">Send</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Telemedicine;
