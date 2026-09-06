import React from 'react';
import { Cloud, Wind, ThermometerSun, AlertTriangle } from 'lucide-react';

export default function EnvironmentalOverlay() {
  const regions = [
    { name: 'Delhi NCR', aqi: 312, temp: 35, humidity: 45, status: 'Severe' },
    { name: 'Mumbai', aqi: 145, temp: 32, humidity: 80, status: 'Moderate' },
    { name: 'Bangalore', aqi: 85, temp: 28, humidity: 60, status: 'Good' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Cloud className="w-6 h-6 text-blue-500" />
          Environmental Health Overlay
        </h1>
      </div>

      {regions[0].aqi > 300 && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-500 flex items-center gap-3 animate-pulse-slow">
          <AlertTriangle className="w-6 h-6 flex-shrink-0" />
          <div>
            <h4 className="font-bold">Severe AQI Alert: Delhi NCR</h4>
            <p className="text-sm">Respiratory cases predicted to spike by 40% in next 48 hours. Advisory issued to local hospitals.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {regions.map((r, i) => (
          <div key={i} className="glass-card p-6">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">{r.name}</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[var(--text-secondary)] flex items-center gap-2"><Wind className="w-4 h-4" /> AQI</span>
                <span className={`font-bold text-lg ${r.aqi > 300 ? 'text-red-500' : r.aqi > 100 ? 'text-orange-500' : 'text-green-500'}`}>{r.aqi}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--text-secondary)] flex items-center gap-2"><ThermometerSun className="w-4 h-4" /> Temp</span>
                <span className="font-bold text-[var(--text-primary)]">{r.temp}°C</span>
              </div>
              <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden mt-4">
                <div className={`h-full ${r.aqi > 300 ? 'bg-red-500' : r.aqi > 100 ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${Math.min((r.aqi/500)*100, 100)}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
