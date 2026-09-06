import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Shield, Building2, Bell, Syringe, Cloud, FileText, Lock, BarChart2 } from 'lucide-react';

import GovDashboard from '../components/Government/GovDashboard';
import SurveillanceMap from '../components/Government/SurveillanceMap';
import BlockchainAudit from '../components/Government/BlockchainAudit';
import HospitalLicensing from '../components/Government/HospitalLicensing';
import AlertSystem from '../components/Government/AlertSystem';
import VaccinationDrive from '../components/Government/VaccinationDrive';
import EnvironmentalOverlay from '../components/Government/EnvironmentalOverlay';
import Schemes from '../components/Government/Schemes';
import Privacy from '../components/Government/Privacy';
import GovAnalytics from '../components/Government/GovAnalytics';

export default function GovernmentPortal() {
  const location = useLocation();
  
  const navItems = [
    { path: '', icon: Activity, label: 'Dashboard' },
    { path: 'surveillance', icon: Activity, label: 'Surveillance' },
    { path: 'blockchain', icon: Shield, label: 'Audit Trail' },
    { path: 'licensing', icon: Building2, label: 'Licensing' },
    { path: 'alerts', icon: Bell, label: 'Alerts' },
    { path: 'vaccination', icon: Syringe, label: 'Vaccination' },
    { path: 'environment', icon: Cloud, label: 'Environment' },
    { path: 'schemes', icon: FileText, label: 'Schemes' },
    { path: 'privacy', icon: Lock, label: 'Privacy' },
    { path: 'analytics', icon: BarChart2, label: 'Analytics' }
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <aside className="w-64 border-r border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gradient gradient-brand">Gov Portal</h2>
        </div>
        <nav className="px-4 space-y-2 pb-6">
          {navItems.map((item) => {
            const fullPath = item.path ? `/gov/${item.path}` : '/gov';
            const isActive = location.pathname === fullPath || (location.pathname === '/gov/' && item.path === '');
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' 
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)]'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 bg-[var(--bg-primary)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<GovDashboard />} />
            <Route path="/surveillance" element={<SurveillanceMap />} />
            <Route path="/blockchain" element={<BlockchainAudit />} />
            <Route path="/licensing" element={<HospitalLicensing />} />
            <Route path="/alerts" element={<AlertSystem />} />
            <Route path="/vaccination" element={<VaccinationDrive />} />
            <Route path="/environment" element={<EnvironmentalOverlay />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/analytics" element={<GovAnalytics />} />
          </Routes>
        </motion.div>
      </main>
    </div>
  );
}
