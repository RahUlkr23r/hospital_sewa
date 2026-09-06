import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Activity, 
  Users, 
  ScanLine, 
  Ambulance, 
  Pill, 
  FileText, 
  MessageSquare, 
  Share2, 
  Stethoscope, 
  BedDouble, 
  BarChart3, 
  UserCog, 
  Cross, 
  ShieldCheck, 
  Receipt 
} from 'lucide-react';
import DoctorDashboard from '../components/Hospital/DoctorDashboard';
import TriageQueue from '../components/Hospital/TriageQueue';
import BiometricAccess from '../components/Hospital/BiometricAccess';
import AmbulanceTelemetry from '../components/Hospital/AmbulanceTelemetry';
import PillScanner from '../components/Hospital/PillScanner';
import Consultation from '../components/Hospital/Consultation';
import Messaging from '../components/Hospital/Messaging';
import Referrals from '../components/Hospital/Referrals';
import DiagnosticTools from '../components/Hospital/DiagnosticTools';
import BedManagement from '../components/Hospital/Admin/BedManagement';
import Analytics from '../components/Hospital/Admin/Analytics';
import StaffManagement from '../components/Hospital/Admin/StaffManagement';
import PharmacyManagement from '../components/Hospital/Admin/PharmacyManagement';
import Compliance from '../components/Hospital/Admin/Compliance';
import Billing from '../components/Hospital/Admin/Billing';

const navItems = [
  { path: '', icon: Activity, label: 'Dashboard' },
  { path: 'triage', icon: Users, label: 'Triage Queue' },
  { path: 'biometric', icon: ScanLine, label: 'Emergency Access' },
  { path: 'ambulance', icon: Ambulance, label: 'Ambulance' },
  { path: 'pill-scanner', icon: Pill, label: 'Pill Scanner' },
  { path: 'consultation', icon: FileText, label: 'Consultation' },
  { path: 'messaging', icon: MessageSquare, label: 'Messaging' },
  { path: 'referrals', icon: Share2, label: 'Referrals' },
  { path: 'diagnostics', icon: Stethoscope, label: 'Diagnostics' },
  { path: 'beds', icon: BedDouble, label: 'Bed Management' },
  { path: 'analytics', icon: BarChart3, label: 'Analytics' },
  { path: 'staff', icon: UserCog, label: 'Staff' },
  { path: 'pharmacy', icon: Cross, label: 'Pharmacy' },
  { path: 'compliance', icon: ShieldCheck, label: 'Compliance' },
  { path: 'billing', icon: Receipt, label: 'Billing' },
];

export default function HospitalPortal() {
  const location = useLocation();

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-[var(--bg-primary)]">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[var(--bg-card)] border-r border-[var(--border-color)] overflow-y-auto hidden md:block">
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === `/hospital${item.path ? `/${item.path}` : ''}`;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-500/10 text-blue-500 font-medium' 
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <Routes>
          <Route path="/" element={<DoctorDashboard />} />
          <Route path="/triage" element={<TriageQueue />} />
          <Route path="/biometric" element={<BiometricAccess />} />
          <Route path="/ambulance" element={<AmbulanceTelemetry />} />
          <Route path="/pill-scanner" element={<PillScanner />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/diagnostics" element={<DiagnosticTools />} />
          <Route path="/beds" element={<BedManagement />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/staff" element={<StaffManagement />} />
          <Route path="/pharmacy" element={<PharmacyManagement />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/billing" element={<Billing />} />
        </Routes>
      </main>
    </div>
  );
}
