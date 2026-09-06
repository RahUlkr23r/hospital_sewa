import React from 'react';
import { Settings as SettingsIcon, Bell, Monitor, Globe, Info, Save } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import toast from 'react-hot-toast';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in">
      <header>
        <h1 className="section-title">Platform Settings</h1>
        <p className="text-[var(--text-secondary)]">Configure system-wide parameters and defaults</p>
      </header>

      <div className="card space-y-8">
        <section>
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-[var(--text-primary)]">
            <Monitor className="text-amber-500" />
            Appearance & Localization
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-color)]">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Theme Preference</label>
              <div className="flex items-center gap-4">
                <button onClick={toggleTheme} className="btn-secondary w-full justify-center">
                  Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">System Language</label>
              <select className="input-field w-full bg-[var(--bg-card)]">
                <option>English (US)</option>
                <option>Hindi (भारत)</option>
                <option>Spanish (Español)</option>
                <option>French (Français)</option>
              </select>
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-[var(--border-color)]" />

        <section>
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-[var(--text-primary)]">
            <Bell className="text-amber-500" />
            System Notifications
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Critical Alerts', desc: 'System failures, security breaches', defaultOn: true },
              { label: 'Warning Alerts', desc: 'High load, approaching limits', defaultOn: true },
              { label: 'Info Notifications', desc: 'Routine updates, backups completed', defaultOn: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors border border-transparent hover:border-[var(--border-color)]">
                <div>
                  <div className="font-medium text-[var(--text-primary)]">{item.label}</div>
                  <div className="text-sm text-[var(--text-secondary)]">{item.desc}</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked={item.defaultOn} />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-[var(--border-color)]" />

        <section>
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-[var(--text-primary)]">
            <Globe className="text-amber-500" />
            API & Integrations
          </h3>
          <div className="space-y-4 bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-color)]">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">ABHA API Key</label>
              <input type="password" value="************************" readOnly className="input-field w-full opacity-70 bg-[var(--bg-card)] cursor-not-allowed" />
              <p className="text-xs text-[var(--text-muted)] mt-1">Managed via environment variables</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Webhook URL</label>
              <input type="url" defaultValue="https://api.healthbridge.local/webhook" className="input-field w-full bg-[var(--bg-card)]" />
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-[var(--border-color)]" />

        <section className="bg-amber-500/10 p-5 rounded-xl flex items-start gap-4 border border-amber-500/20">
          <Info className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-500">HealthBridge v2.0 (Build 2024.10)</h4>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Core modules active. Blockchain audit trail enabled. 
              Licensed to: System Administrator.
            </p>
          </div>
        </section>

        <div className="flex justify-end gap-4 pt-4">
          <button className="btn-ghost">Discard Changes</button>
          <button className="btn-primary bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-2" onClick={handleSave}>
            <Save size={18} />
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
