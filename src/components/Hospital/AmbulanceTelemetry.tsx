import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, Thermometer, Droplets, MapPin, MessageSquare, AlertCircle } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

export default function AmbulanceTelemetry() {
  const [vitals, setVitals] = useState({
    hr: 82, bpSystolic: 120, bpDiastolic: 80, spo2: 98, temp: 98.6
  });
  
  const [history, setHistory] = useState<any[]>([]);

  // Simulate real-time vitals
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => {
        const newVitals = {
          hr: prev.hr + (Math.random() * 4 - 2),
          bpSystolic: prev.bpSystolic + (Math.random() * 2 - 1),
          bpDiastolic: prev.bpDiastolic + (Math.random() * 2 - 1),
          spo2: Math.min(100, Math.max(85, prev.spo2 + (Math.random() * 2 - 1))),
          temp: prev.temp
        };
        
        setHistory(h => {
          const newH = [...h, { time: new Date().toISOString(), value: newVitals.hr }];
          return newH.slice(-20); // keep last 20 points
        });
        
        return newVitals;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const isCritical = vitals.spo2 < 92 || vitals.hr > 120 || vitals.hr < 50;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="section-title flex items-center gap-2">
            <Activity className="text-red-500" /> Live Ambulance Telemetry
          </h1>
          <p className="text-[var(--text-secondary)]">Unit #42 - ETA: 4 mins - Suspected MI</p>
        </div>
        <div className={`px-4 py-2 rounded-lg font-bold border ${isCritical ? 'bg-red-500/10 text-red-500 border-red-500' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500'} animate-pulse`}>
          {isCritical ? 'CRITICAL CONDITION' : 'STABLE'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vitals Panel */}
        <div className={`col-span-1 lg:col-span-2 glass-card p-6 transition-colors duration-500 ${isCritical ? 'ring-2 ring-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : ''}`}>
          <h2 className="text-lg font-semibold mb-4">Patient Vitals</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <VitalCard 
              icon={Heart} title="Heart Rate" value={Math.round(vitals.hr)} unit="bpm" 
              color={vitals.hr > 100 || vitals.hr < 60 ? 'red' : 'green'} 
            />
            <VitalCard 
              icon={Activity} title="Blood Pressure" value={`${Math.round(vitals.bpSystolic)}/${Math.round(vitals.bpDiastolic)}`} unit="mmHg" 
              color="blue" 
            />
            <VitalCard 
              icon={Droplets} title="SpO2" value={Math.round(vitals.spo2)} unit="%" 
              color={vitals.spo2 < 95 ? 'red' : 'green'} 
            />
            <VitalCard 
              icon={Thermometer} title="Temperature" value={vitals.temp.toFixed(1)} unit="°F" 
              color="yellow" 
            />
          </div>

          <div className="h-48 w-full bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] p-4">
            <div className="text-xs text-[var(--text-muted)] mb-2">ECG Simulation</div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <YAxis domain={['auto', 'auto']} hide />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={isCritical ? "#ef4444" : "#10b981"} 
                  strokeWidth={2} 
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Map Simulation */}
          <div className="glass-card p-4 overflow-hidden relative">
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <MapPin size={18} className="text-blue-500" /> Route Tracking
            </h3>
            <div className="h-40 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)] relative overflow-hidden flex items-center justify-center">
              {/* Fake grid map */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, var(--text-primary) 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
              <motion.div 
                className="absolute w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                animate={{ x: [-50, 0, 50], y: [-20, 10, 20] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute bottom-4 right-4 w-4 h-4 bg-blue-500 rounded-sm"></div>
            </div>
          </div>

          {/* Chat with Paramedic */}
          <div className="glass-card p-4 flex flex-col h-64">
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <MessageSquare size={18} className="text-green-500" /> Paramedic Comms
            </h3>
            <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-2 text-sm">
              <div className="bg-[var(--bg-secondary)] p-2 rounded-lg rounded-tl-none self-start max-w-[80%]">
                Patient secured. Administered 300mg Aspirin.
              </div>
              <div className="bg-blue-500/20 text-blue-100 p-2 rounded-lg rounded-tr-none ml-auto max-w-[80%] border border-blue-500/30">
                Copy that. Cath lab is prepped. Have you established IV?
              </div>
              <div className="bg-[var(--bg-secondary)] p-2 rounded-lg rounded-tl-none self-start max-w-[80%]">
                Yes, 18G left AC. Vitals trending down slightly.
              </div>
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="Type message..." className="input-field py-1 px-2 text-sm" />
              <button className="btn-primary py-1 px-3 text-sm">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VitalCard({ icon: Icon, title, value, unit, color }: any) {
  const colorClasses = {
    red: 'text-red-500 bg-red-500/10 border-red-500/20',
    green: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    yellow: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  };

  return (
    <div className={`p-4 rounded-xl border ${colorClasses[color as keyof typeof colorClasses]} flex flex-col items-center justify-center text-center`}>
      <Icon size={24} className="mb-2 opacity-80" />
      <div className="text-xs font-medium opacity-80 mb-1">{title}</div>
      <div className="text-2xl font-bold font-mono">
        {value} <span className="text-sm font-normal opacity-70">{unit}</span>
      </div>
    </div>
  );
}
