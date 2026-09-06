import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Sun, Moon, Bell, LogOut, Menu, X, Shield, AlertTriangle } from 'lucide-react';
import type { HealthAlert } from '../../utils/types';

export default function Navbar({ onMenuToggle, menuOpen }: { onMenuToggle: () => void; menuOpen: boolean }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const alerts: HealthAlert[] = JSON.parse(localStorage.getItem('hb_health_alerts') || '[]');
  const activeAlerts = alerts.filter(a => a.isActive);

  const roleColors: Record<string, string> = {
    patient: 'bg-teal-500/20 text-teal-400',
    doctor: 'bg-brand-500/20 text-brand-400',
    government: 'bg-purple-500/20 text-purple-400',
    admin: 'bg-amber-500/20 text-amber-400',
  };

  const roleLabels: Record<string, string> = {
    patient: '👤 Patient',
    doctor: '🏥 Hospital',
    government: '🏛️ Government',
    admin: '🔐 Admin',
  };

  return (
    <nav className="sticky top-0 z-50 glass-card rounded-none border-x-0 border-t-0 px-4 lg:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button onClick={onMenuToggle} className="lg:hidden p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gradient hidden sm:inline">HealthBridge</span>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-500 hidden sm:inline">v2.0</span>
          </div>
        </div>

        {/* Center - Active Alert Banner */}
        {activeAlerts.length > 0 && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/10 border border-warning/20 max-w-md">
            <AlertTriangle size={14} className="text-warning flex-shrink-0" />
            <p className="text-xs text-warning truncate">{activeAlerts[0].title}</p>
          </div>
        )}

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition text-[var(--text-secondary)]"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition text-[var(--text-secondary)] relative"
            >
              <Bell size={18} />
              {activeAlerts.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-danger text-white text-[9px] font-bold flex items-center justify-center animate-pulse-fast">
                  {activeAlerts.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 card-static p-0 overflow-hidden animate-slide-down z-50">
                <div className="px-4 py-3 border-b border-[var(--border-color)]">
                  <h3 className="font-semibold text-sm">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {activeAlerts.map(alert => (
                    <div key={alert.id} className="px-4 py-3 border-b border-[var(--border-color)] hover:bg-surface-50 dark:hover:bg-surface-800 transition">
                      <p className="text-sm font-medium">{alert.title}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-2">{alert.message}</p>
                    </div>
                  ))}
                  {activeAlerts.length === 0 && (
                    <p className="px-4 py-6 text-sm text-[var(--text-muted)] text-center">No new notifications</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Info */}
          {user && (
            <div className="flex items-center gap-2 pl-2 border-l border-[var(--border-color)]">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-[var(--text-primary)]">{user.name}</p>
                <span className={`badge text-[10px] ${roleColors[user.role]}`}>
                  {roleLabels[user.role]}
                </span>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-xl hover:bg-danger/10 text-[var(--text-secondary)] hover:text-danger transition"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Click outside handler */}
      {showNotifications && (
        <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
      )}
    </nav>
  );
}
