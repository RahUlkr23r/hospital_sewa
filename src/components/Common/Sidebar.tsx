import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, FileHeart, Watch, Video, Pill, FlaskConical,
  Shield, Brain, Dumbbell, Syringe, AlertTriangle, Trophy, Heart,
  Users, Fingerprint, Ambulance, ScanLine, Stethoscope, MessageSquare,
  ArrowRightLeft, Activity, BedDouble, BarChart3, UserCog, Building2,
  Boxes, FileCheck, CreditCard, MapPin, Link2, Building, Bell,
  Leaf, Landmark, Lock, TrendingUp, Settings, Database, Gauge,
  X,
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
}

const patientMenu: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/patient' },
  { id: 'history', label: 'Medical History', icon: <FileHeart size={18} />, path: '/patient/history' },
  { id: 'wearables', label: 'Wearable IoT', icon: <Watch size={18} />, path: '/patient/wearables' },
  { id: 'telemedicine', label: 'Telemedicine', icon: <Video size={18} />, path: '/patient/telemedicine' },
  { id: 'prescriptions', label: 'Prescriptions', icon: <Pill size={18} />, path: '/patient/prescriptions' },
  { id: 'lab-results', label: 'Lab Results', icon: <FlaskConical size={18} />, path: '/patient/lab-results' },
  { id: 'insurance', label: 'Insurance', icon: <Shield size={18} />, path: '/patient/insurance' },
  { id: 'mental-health', label: 'Mental Health', icon: <Brain size={18} />, path: '/patient/mental-health' },
  { id: 'fitness', label: 'Fitness & Nutrition', icon: <Dumbbell size={18} />, path: '/patient/fitness' },
  { id: 'vaccines', label: 'Vaccine Passport', icon: <Syringe size={18} />, path: '/patient/vaccines' },
  { id: 'emergency', label: 'Emergency Plan', icon: <AlertTriangle size={18} />, path: '/patient/emergency' },
  { id: 'gamification', label: 'Achievements', icon: <Trophy size={18} />, path: '/patient/achievements' },
  { id: 'organ-donation', label: 'Organ Donation', icon: <Heart size={18} />, path: '/patient/organ-donation' },
];

const doctorMenu: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/hospital' },
  { id: 'triage', label: 'Triage Queue', icon: <Users size={18} />, path: '/hospital/triage', badge: 5 },
  { id: 'biometric', label: 'Biometric Access', icon: <Fingerprint size={18} />, path: '/hospital/biometric' },
  { id: 'ambulance', label: 'Ambulance Telemetry', icon: <Ambulance size={18} />, path: '/hospital/ambulance' },
  { id: 'pill-scanner', label: 'Drug Verification', icon: <ScanLine size={18} />, path: '/hospital/pill-scanner' },
  { id: 'consultation', label: 'Consultation', icon: <Stethoscope size={18} />, path: '/hospital/consultation' },
  { id: 'messaging', label: 'Messaging', icon: <MessageSquare size={18} />, path: '/hospital/messaging', badge: 1 },
  { id: 'referrals', label: 'Referrals', icon: <ArrowRightLeft size={18} />, path: '/hospital/referrals' },
  { id: 'diagnostics', label: 'Diagnostic Tools', icon: <Activity size={18} />, path: '/hospital/diagnostics' },
  { id: 'beds', label: 'Bed Management', icon: <BedDouble size={18} />, path: '/hospital/beds' },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} />, path: '/hospital/analytics' },
  { id: 'staff', label: 'Staff Management', icon: <UserCog size={18} />, path: '/hospital/staff' },
  { id: 'pharmacy', label: 'Pharmacy', icon: <Boxes size={18} />, path: '/hospital/pharmacy' },
  { id: 'compliance', label: 'Compliance', icon: <FileCheck size={18} />, path: '/hospital/compliance' },
  { id: 'billing', label: 'Billing', icon: <CreditCard size={18} />, path: '/hospital/billing' },
];

const governmentMenu: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/government' },
  { id: 'surveillance', label: 'Disease Surveillance', icon: <MapPin size={18} />, path: '/government/surveillance' },
  { id: 'blockchain', label: 'Blockchain Audit', icon: <Link2 size={18} />, path: '/government/blockchain' },
  { id: 'licensing', label: 'Hospital Licensing', icon: <Building size={18} />, path: '/government/licensing' },
  { id: 'alerts', label: 'Alert System', icon: <Bell size={18} />, path: '/government/alerts' },
  { id: 'vaccination', label: 'Vaccination Drives', icon: <Syringe size={18} />, path: '/government/vaccination' },
  { id: 'environment', label: 'Environmental Data', icon: <Leaf size={18} />, path: '/government/environment' },
  { id: 'schemes', label: 'Gov Schemes', icon: <Landmark size={18} />, path: '/government/schemes' },
  { id: 'privacy', label: 'Privacy & GDPR', icon: <Lock size={18} />, path: '/government/privacy' },
  { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={18} />, path: '/government/analytics' },
];

const adminMenu: MenuItem[] = [
  { id: 'dashboard', label: 'System Dashboard', icon: <LayoutDashboard size={18} />, path: '/admin' },
  { id: 'users', label: 'User Management', icon: <UserCog size={18} />, path: '/admin/users' },
  { id: 'data', label: 'Data Management', icon: <Database size={18} />, path: '/admin/data' },
  { id: 'performance', label: 'Performance', icon: <Gauge size={18} />, path: '/admin/performance' },
  { id: 'settings', label: 'Settings', icon: <Settings size={18} />, path: '/admin/settings' },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { role } = useAuth();

  const menuMap: Record<string, MenuItem[]> = {
    patient: patientMenu,
    doctor: doctorMenu,
    government: governmentMenu,
    admin: adminMenu,
  };

  const menu = role ? menuMap[role] || [] : [];

  return (
    <>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[var(--bg-card)] border-r border-[var(--border-color)] 
          transform transition-transform duration-300 ease-in-out pt-16 lg:pt-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex items-center justify-between px-4 py-4 lg:hidden">
          <span className="font-bold text-gradient">Menu</span>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800">
            <X size={18} />
          </button>
        </div>

        <nav className="px-3 py-2 space-y-0.5 overflow-y-auto h-full pb-20 scrollbar-hide">
          {menu.map(item => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === '/patient' || item.path === '/hospital' || item.path === '/government' || item.path === '/admin'}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? 'sidebar-item-active' : ''}`
              }
            >
              {item.icon}
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="w-5 h-5 rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
