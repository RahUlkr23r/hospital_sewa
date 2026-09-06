import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Activity, Users, Database, Settings as SettingsIcon, LayoutDashboard } from 'lucide-react';
import SystemDashboard from '../components/Admin/SystemDashboard';
import UserManagement from '../components/Admin/UserManagement';
import DataManagement from '../components/Admin/DataManagement';
import PerformanceMonitor from '../components/Admin/PerformanceMonitor';
import Settings from '../components/Admin/Settings';

const AdminPortal = () => {
  const navItems = [
    { path: '', label: 'Dashboard', icon: LayoutDashboard },
    { path: 'users', label: 'Users', icon: Users },
    { path: 'data', label: 'Data', icon: Database },
    { path: 'performance', label: 'Performance', icon: Activity },
    { path: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-[var(--bg-primary)] overflow-hidden">
      <aside className="w-64 glass-card border-r border-[var(--border-color)] hidden md:block rounded-none">
        <div className="p-6">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Admin Portal</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">System Management</p>
        </div>
        <nav className="mt-6 px-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/admin/${item.path}`}
              end={item.path === ''}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[var(--bg-card)] text-amber-500 shadow-md border border-[var(--border-color)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'
                }`
              }
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      
      <main className="flex-1 overflow-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<SystemDashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/data" element={<DataManagement />} />
            <Route path="/performance" element={<PerformanceMonitor />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminPortal;
