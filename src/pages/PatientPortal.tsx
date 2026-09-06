import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/Patient/Dashboard';
import MedicalHistory from '../components/Patient/MedicalHistory';
import Wearables from '../components/Patient/Wearables';
import Telemedicine from '../components/Patient/Telemedicine';
import Prescriptions from '../components/Patient/Prescriptions';
import LabResults from '../components/Patient/LabResults';
import Insurance from '../components/Patient/Insurance';
import MentalHealth from '../components/Patient/MentalHealth';
import Fitness from '../components/Patient/Fitness';
import VaccinePassport from '../components/Patient/VaccinePassport';
import EmergencyPlan from '../components/Patient/EmergencyPlan';
import Gamification from '../components/Patient/Gamification';
import OrganDonation from '../components/Patient/OrganDonation';

const PatientPortal: React.FC = () => {
  return (
    <div className="flex-1 w-full p-4 lg:p-6 overflow-y-auto bg-[var(--bg-primary)]">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/history" element={<MedicalHistory />} />
        <Route path="/wearables" element={<Wearables />} />
        <Route path="/telemedicine" element={<Telemedicine />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/lab-results" element={<LabResults />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/mental-health" element={<MentalHealth />} />
        <Route path="/fitness" element={<Fitness />} />
        <Route path="/vaccines" element={<VaccinePassport />} />
        <Route path="/emergency" element={<EmergencyPlan />} />
        <Route path="/achievements" element={<Gamification />} />
        <Route path="/organ-donation" element={<OrganDonation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default PatientPortal;
