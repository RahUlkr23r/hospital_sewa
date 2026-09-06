import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Analytics() {
  const adminData = [
    { name: 'Mon', admissions: 12, discharges: 8 },
    { name: 'Tue', admissions: 15, discharges: 10 },
    { name: 'Wed', admissions: 8, discharges: 14 },
    { name: 'Thu', admissions: 10, discharges: 12 },
    { name: 'Fri', admissions: 18, discharges: 9 },
    { name: 'Sat', admissions: 20, discharges: 15 },
    { name: 'Sun', admissions: 14, discharges: 11 },
  ];

  const deptData = [
    { name: 'Cardiology', value: 400 },
    { name: 'Neurology', value: 300 },
    { name: 'Orthopedics', value: 300 },
    { name: 'Pediatrics', value: 200 },
  ];
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      <h1 className="section-title">Hospital Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 h-80">
          <h3 className="font-semibold mb-4">Admissions vs Discharges (Week)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={adminData}>
              <XAxis dataKey="name" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }} />
              <Bar dataKey="admissions" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="discharges" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6 h-80">
          <h3 className="font-semibold mb-4">Patient Distribution by Department</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={deptData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {deptData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
