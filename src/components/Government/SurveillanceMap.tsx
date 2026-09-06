import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, AlertTriangle, TrendingUp, X } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  cases: Math.floor(Math.random() * 500) + 100,
}));

export default function SurveillanceMap() {
  const [selectedCluster, setSelectedCluster] = useState<any>(null);

  const clusters = [
    { id: 1, name: 'Mumbai', disease: 'Dengue', cases: 450, risk: 'Critical', x: '25%', y: '60%', color: 'bg-red-500' },
    { id: 2, name: 'Delhi', disease: 'Air Quality/Asthma', cases: 820, risk: 'High', x: '35%', y: '30%', color: 'bg-orange-500' },
    { id: 3, name: 'Bangalore', disease: 'Typhoid', cases: 120, risk: 'Moderate', x: '32%', y: '75%', color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Map className="w-6 h-6 text-blue-500" />
          Disease Surveillance Map
        </h1>
        <div className="badge badge-warning animate-pulse-slow px-4 py-2">
          <AlertTriangle className="w-4 h-4 inline mr-2" />
          Predictive Hotspot Alert: Rising Dengue cases in Western Region
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2 glass-card p-6 min-h-[500px] relative overflow-hidden flex items-center justify-center">
          {/* Mock Map Outline */}
          <div className="w-full h-[400px] border-2 border-dashed border-[var(--border-color)] rounded-xl relative bg-[var(--bg-secondary)] flex items-center justify-center">
            <span className="text-[var(--text-muted)]">Map visualization area</span>
            {clusters.map((cluster) => (
              <button
                key={cluster.id}
                onClick={() => setSelectedCluster(cluster)}
                className={`absolute w-6 h-6 rounded-full ${cluster.color} shadow-lg shadow-black/50 transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform animate-pulse-fast cursor-pointer`}
                style={{ left: cluster.x, top: cluster.y }}
              />
            ))}
          </div>

          {selectedCluster && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="absolute top-8 right-8 w-64 glass-card-sm p-4 shadow-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/95 backdrop-blur-xl"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-[var(--text-primary)]">{selectedCluster.name}</h3>
                <button onClick={() => setSelectedCluster(null)} className="text-[var(--text-muted)] hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-1">Disease: <span className="text-white font-medium">{selectedCluster.disease}</span></p>
              <p className="text-sm text-[var(--text-secondary)] mb-1">Active Cases: <span className="text-white font-medium">{selectedCluster.cases}</span></p>
              <div className="mt-3">
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  selectedCluster.risk === 'Critical' ? 'bg-red-500/20 text-red-500' :
                  selectedCluster.risk === 'High' ? 'bg-orange-500/20 text-orange-500' :
                  'bg-yellow-500/20 text-yellow-500'
                }`}>
                  {selectedCluster.risk} Risk
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar Data */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              30-Day Trend (National)
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dummyData}>
                  <defs>
                    <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#6b7280" fontSize={12} tickLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} />
                  <Area type="monotone" dataKey="cases" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCases)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Top Regions by Prevalence</h3>
            <div className="space-y-3">
              {clusters.map((c, i) => (
                <div key={i} className="flex justify-between items-center p-2 rounded bg-[var(--bg-secondary)]">
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">{c.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{c.disease}</p>
                  </div>
                  <span className="text-sm font-bold text-[var(--text-primary)]">{c.cases} cases</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
