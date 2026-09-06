import React from 'react';
import { Users, Building2, Bell, Syringe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GovDashboard() {
  const stats = [
    { title: 'Total Patients', value: '1.2M', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Registered Hospitals', value: '4,521', icon: Building2, color: 'text-green-500', bg: 'bg-green-500/10' },
    { title: 'Active Alerts', value: '12', icon: Bell, color: 'text-red-500', bg: 'bg-red-500/10' },
    { title: 'Vaccination Coverage', value: '82%', icon: Syringe, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[var(--text-primary)]">National Health Scoreboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="glass-card p-6 flex items-center space-x-4"
          >
            <div className={`p-4 rounded-full ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-secondary)]">{stat.title}</p>
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Disease Burden Summary</h2>
          <div className="space-y-4">
            {['Dengue', 'Malaria', 'Typhoid', 'COVID-19', 'Tuberculosis'].map((disease, i) => (
              <div key={disease} className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg">
                <span className="font-medium text-[var(--text-primary)]">{disease}</span>
                <div className="flex items-center space-x-4">
                  <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${80 - i * 10}%` }} />
                  </div>
                  <span className="text-sm text-[var(--text-secondary)] w-12">{`${80 - i * 10}%`}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full btn-primary py-3 flex items-center justify-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Issue Alert</span>
            </button>
            <button className="w-full btn-secondary py-3 flex items-center justify-center space-x-2">
              <Syringe className="w-5 h-5" />
              <span>Schedule Camp</span>
            </button>
            <button className="w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--border-color)] py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors">
              <Building2 className="w-5 h-5" />
              <span>View Audit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
