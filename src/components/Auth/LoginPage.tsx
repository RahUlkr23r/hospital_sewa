import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Shield, User, Stethoscope, Building2, KeyRound, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const demoAccounts = [
  { role: 'patient', label: 'Patient', icon: <User size={24} />, email: 'patient@healthbridge.demo', color: 'from-teal-500 to-emerald-600', description: 'View your health records, wearables & AI forecasts' },
  { role: 'doctor', label: 'Hospital', icon: <Stethoscope size={24} />, email: 'doctor@healthbridge.demo', color: 'from-brand-500 to-blue-600', description: 'AI triage, ambulance telemetry & prescriptions' },
  { role: 'government', label: 'Government', icon: <Building2 size={24} />, email: 'gov@healthbridge.demo', color: 'from-purple-500 to-violet-600', description: 'Disease surveillance, blockchain audit & alerts' },
  { role: 'admin', label: 'CMO Admin', icon: <KeyRound size={24} />, email: 'admin@healthbridge.demo', color: 'from-amber-500 to-orange-600', description: 'System-wide controls & user management' },
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        toast.success('Welcome to HealthBridge!');
        const users = JSON.parse(localStorage.getItem('hb_users') || '[]');
        const user = users.find((u: any) => u.email === email);
        const routes: Record<string, string> = { patient: '/patient', doctor: '/hospital', government: '/government', admin: '/admin' };
        navigate(routes[user?.role] || '/patient');
      } else {
        toast.error('Invalid credentials');
      }
      setLoading(false);
    }, 600);
  };

  const quickLogin = (email: string) => {
    setEmail(email);
    setPassword('Demo@123');
  };

  return (
    <div className="min-h-screen flex gradient-mesh">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-center px-16 relative overflow-hidden">
        <div className="absolute inset-0 gradient-brand opacity-[0.03] dark:opacity-[0.06]" />
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center shadow-glow">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gradient">HealthBridge</h1>
              <p className="text-xs text-[var(--text-muted)] font-medium">v2.0 — Predictive Health Infrastructure</p>
            </div>
          </div>

          <h2 className="text-4xl xl:text-5xl font-bold leading-tight mb-6 text-[var(--text-primary)]">
            Your medical identity.<br />
            <span className="text-gradient">Your nation's health.</span><br />
            Your future predicted.
          </h2>

          <p className="text-lg text-[var(--text-secondary)] max-w-lg mb-10">
            A cognitive national health grid that decentralizes medical records, 
            predicts health crises, and connects IoT wearables — all with blockchain-grade transparency.
          </p>

          {/* Architecture Diagram */}
          <div className="glass-card-sm p-6 max-w-md">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-brand-500" />
              <span className="text-sm font-semibold text-[var(--text-primary)]">System Architecture</span>
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500" />
                <span className="text-[var(--text-secondary)]">Patient → [Biometric / QR / IoT]</span>
              </div>
              <div className="flex items-center gap-2 pl-6">
                <div className="w-1 h-4 bg-brand-500/30 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-500" />
                <span className="text-[var(--text-secondary)]">Hospital → [AI Triage + Drug Engine]</span>
              </div>
              <div className="flex items-center gap-2 pl-6">
                <div className="w-1 h-4 bg-brand-500/30 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-[var(--text-secondary)]">Blockchain → [Tamper-Proof Audit]</span>
              </div>
              <div className="flex items-center gap-2 pl-6">
                <div className="w-1 h-4 bg-brand-500/30 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-[var(--text-secondary)]">Government → [Surveillance + Alerts]</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <h1 className="text-2xl font-black text-gradient">HealthBridge</h1>
          </div>

          <div className="card-static p-8">
            <h3 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">Sign In</h3>
            <p className="text-sm text-[var(--text-muted)] mb-6">Select a demo account or enter credentials</p>

            {/* Quick Login Cards */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {demoAccounts.map(acc => (
                <button
                  key={acc.role}
                  onClick={() => quickLogin(acc.email)}
                  className={`p-3 rounded-xl border border-[var(--border-color)] hover:border-brand-500/50 
                    transition-all duration-200 text-left group hover:shadow-glow/30
                    ${email === acc.email ? 'border-brand-500 bg-brand-500/5' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${acc.color} flex items-center justify-center text-white mb-2`}>
                    {acc.icon}
                  </div>
                  <p className="text-xs font-semibold text-[var(--text-primary)]">{acc.label}</p>
                  <p className="text-[10px] text-[var(--text-muted)] mt-0.5 line-clamp-2">{acc.description}</p>
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="input-field pl-10"
                    placeholder="Enter demo email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="input-field pl-10"
                    placeholder="Demo@123"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <p className="text-[10px] text-center text-[var(--text-muted)] mt-4">
              🔒 All data stored locally in your browser. No server. No tracking.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
