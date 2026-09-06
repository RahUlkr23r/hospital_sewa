import React from 'react';
import { Activity, Cpu, HardDrive, Network } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

const PerformanceMonitor = () => {
  const cpuData = [{ name: 'CPU', value: 65, fill: '#f59e0b' }];
  const memData = [{ name: 'Memory', value: 42, fill: '#3b82f6' }];
  
  const responseTimeData = Array.from({ length: 20 }, (_, i) => ({
    time: `${i}:00`,
    ms: 120 + Math.random() * 50
  }));

  const featureUsage = [
    { name: 'Dashboard', users: 420 },
    { name: 'Consultations', users: 380 },
    { name: 'Prescriptions', users: 250 },
    { name: 'Analytics', users: 150 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <h1 className="section-title">Performance Monitor</h1>
        <p className="text-[var(--text-secondary)]">System telemetry and resource utilization</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card flex flex-col items-center">
          <h3 className="font-semibold flex items-center gap-2 mb-4 w-full"><Cpu className="text-amber-500"/> CPU Usage</h3>
          <div className="h-48 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={15} data={cpuData} startAngle={180} endAngle={0}>
                <RadialBar background dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-8">
              <span className="text-3xl font-bold text-amber-500">65%</span>
            </div>
          </div>
        </div>
        
        <div className="card flex flex-col items-center">
          <h3 className="font-semibold flex items-center gap-2 mb-4 w-full"><HardDrive className="text-blue-500"/> Memory Usage</h3>
          <div className="h-48 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={15} data={memData} startAngle={180} endAngle={0}>
                <RadialBar background dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-8">
              <span className="text-3xl font-bold text-blue-500">42%</span>
            </div>
          </div>
        </div>
        
        <div className="card flex flex-col">
          <h3 className="font-semibold flex items-center gap-2 mb-4"><Network className="text-emerald-500"/> Active Connections</h3>
          <div className="flex-1 flex flex-col items-center justify-center h-48">
            <div className="text-5xl font-bold text-emerald-500 mb-4 animate-pulse-slow">4,231</div>
            <div className="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-2 bg-[var(--bg-secondary)] px-4 py-2 rounded-full border border-[var(--border-color)]">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              Live WebSocket Links
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold mb-6 flex items-center gap-2"><Activity className="text-purple-500"/> API Response Time (ms)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTimeData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} />
                <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '0.5rem' }} 
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Line type="monotone" dataKey="ms" stroke="#8b5cf6" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#8b5cf6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="card">
          <h3 className="font-semibold mb-6">Feature Utilization</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureUsage} layout="vertical" margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} />
                <YAxis dataKey="name" type="category" stroke="var(--text-primary)" tick={{ fill: 'var(--text-primary)' }} width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '0.5rem' }}
                  cursor={{ fill: 'var(--bg-secondary)' }}
                />
                <Bar dataKey="users" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
