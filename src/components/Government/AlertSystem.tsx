import React, { useState } from 'react';
import { Bell, Send, Users, Eye, Megaphone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AlertSystem() {
  const [alerts, setAlerts] = useState([
    { id: 1, title: 'Dengue Outbreak Warning', type: 'Health Warning', severity: 'High', recipients: '1.2M', read: '850K', active: true },
    { id: 2, title: 'Pulse Polio Drive', type: 'Campaign', severity: 'Info', recipients: '5.4M', read: '4.1M', active: true },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Megaphone className="w-6 h-6 text-blue-500" />
          National Alert System
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Alert Form */}
        <div className="lg:col-span-1 glass-card p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Broadcast New Alert</h2>
          
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">Alert Type</label>
            <select className="input-field w-full">
              <option>Health Warning</option>
              <option>Vaccination Drive</option>
              <option>Disaster Advisory</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">Title</label>
            <input type="text" className="input-field w-full" placeholder="e.g., Heat Wave Advisory" />
          </div>
          
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">Message</label>
            <textarea className="input-field w-full h-24 resize-none" placeholder="Enter alert details..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Severity</label>
              <select className="input-field w-full">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Target Region</label>
              <select className="input-field w-full">
                <option>All India</option>
                <option>North Region</option>
                <option>South Region</option>
              </select>
            </div>
          </div>

          <button className="w-full btn-primary py-3 flex items-center justify-center gap-2 mt-4">
            <Send className="w-4 h-4" />
            Broadcast Alert
          </button>
        </div>

        {/* Active Alerts */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Active Broadcasts & Metrics</h2>
          {alerts.map((alert) => (
            <motion.div key={alert.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">{alert.title}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full border ${
                      alert.severity === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/30' : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{alert.type}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked={alert.active} />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[var(--border-color)]">
                <div className="flex flex-col">
                  <span className="text-xs text-[var(--text-muted)] flex items-center gap-1"><Users className="w-3 h-3" /> Sent to</span>
                  <span className="font-semibold text-[var(--text-primary)]">{alert.recipients}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-[var(--text-muted)] flex items-center gap-1"><Eye className="w-3 h-3" /> Read by</span>
                  <span className="font-semibold text-[var(--text-primary)]">{alert.read}</span>
                </div>
                <div className="flex flex-col md:col-span-2">
                  <span className="text-xs text-[var(--text-muted)] mb-1">Engagement Rate</span>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-green-500" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
