import React from 'react';
import { Syringe, Calendar, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'North', covered: 4000, target: 5000 },
  { name: 'South', covered: 3000, target: 3500 },
  { name: 'East', covered: 2000, target: 4000 },
  { name: 'West', covered: 2780, target: 3000 },
];

export default function VaccinationDrive() {
  const camps = [
    { name: 'Mega Polio Camp', location: 'Govt School, Delhi', date: 'Oct 20, 2023', vaccine: 'Polio Drops', registered: 450, capacity: 500 },
    { name: 'COVID Booster Drive', location: 'City Center, Mumbai', date: 'Oct 22, 2023', vaccine: 'Covishield', registered: 800, capacity: 1000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Syringe className="w-6 h-6 text-blue-500" />
          Vaccination Drives
        </h1>
        <button className="btn-primary">Schedule New Camp</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Upcoming Camps</h2>
          {camps.map((camp, i) => (
            <div key={i} className="glass-card p-5 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-[var(--text-primary)]">{camp.name}</h3>
                <span className="badge badge-info">{camp.vaccine}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {camp.location}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {camp.date}</span>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--text-secondary)]">Registrations</span>
                  <span className="text-[var(--text-primary)]">{camp.registered} / {camp.capacity}</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${(camp.registered / camp.capacity) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Regional Coverage vs Target</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                <Bar dataKey="target" fill="#4b5563" radius={[4, 4, 0, 0]} />
                <Bar dataKey="covered" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
