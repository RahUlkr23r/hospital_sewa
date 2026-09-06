// ================================
// HealthBridge v2.0 — Complete Seed Data
// ================================

import { sha256 } from './crypto';
import type {
  User, Patient, Hospital, Doctor, TriagePatient, WearableData,
  Consultation, Prescription, InsuranceClaim, BedInfo, AmbulanceData,
  HealthAlert, AuditLog, VaccinationCamp, DiseaseCluster, EnvironmentalData,
  GovernmentScheme, TelemedicineAppointment, MentalHealthAssessment,
  ChatMessage, LabReport,
} from './types';

// ===== USERS =====
export const seedUsers: User[] = [
  { id: 'user-patient-1', email: 'patient@healthbridge.demo', password: 'Demo@123', role: 'patient', name: 'Arjun Mehta', avatar: '👤' },
  { id: 'user-doctor-1', email: 'doctor@healthbridge.demo', password: 'Demo@123', role: 'doctor', name: 'Dr. Priya Sharma', hospitalId: 'hosp-1', avatar: '👩‍⚕️' },
  { id: 'user-gov-1', email: 'gov@healthbridge.demo', password: 'Demo@123', role: 'government', name: 'Dir. Rajesh Kumar', avatar: '🏛️' },
  { id: 'user-admin-1', email: 'admin@healthbridge.demo', password: 'Demo@123', role: 'admin', name: 'CMO Dr. Anita Desai', avatar: '🔐' },
];

// ===== HOSPITALS =====
export const seedHospitals: Hospital[] = [
  { id: 'hosp-1', name: 'Apollo Multispeciality Hospital', city: 'Mumbai', state: 'Maharashtra', beds: 450, departments: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Emergency', 'ICU', 'General Medicine'], accreditation: 'NABH', licenseStatus: 'active', rating: 4.6, contact: '+91-22-26815000', address: 'Navi Mumbai, Sector 23' },
  { id: 'hosp-2', name: 'Fortis Heart Institute', city: 'Delhi', state: 'Delhi', beds: 310, departments: ['Cardiology', 'Cardiac Surgery', 'Emergency', 'ICU'], accreditation: 'JCI', licenseStatus: 'active', rating: 4.8, contact: '+91-11-42776222', address: 'Okhla Road, New Delhi' },
  { id: 'hosp-3', name: 'Government District Hospital', city: 'Pune', state: 'Maharashtra', beds: 200, departments: ['General Medicine', 'Surgery', 'OB-GYN', 'Pediatrics', 'Emergency'], accreditation: 'None', licenseStatus: 'active', rating: 3.2, contact: '+91-20-24261651', address: 'Sassoon Road, Pune' },
  { id: 'hosp-4', name: 'Sunrise Community Clinic', city: 'Jaipur', state: 'Rajasthan', beds: 50, departments: ['General Medicine', 'Pediatrics'], accreditation: 'ISO', licenseStatus: 'suspended', rating: 2.8, contact: '+91-141-2220045', address: 'MI Road, Jaipur' },
];

// ===== DOCTORS =====
export const seedDoctors: Doctor[] = [
  { id: 'doc-1', name: 'Dr. Priya Sharma', specialization: 'Cardiologist', hospitalId: 'hosp-1', department: 'Cardiology', qualification: 'MD, DM Cardiology', experience: 12, rating: 4.8, availability: 'on_duty', patientsToday: 14, avgConsultationTime: 18, contact: '+91-9876543210' },
  { id: 'doc-2', name: 'Dr. Vikram Patel', specialization: 'Neurologist', hospitalId: 'hosp-1', department: 'Neurology', qualification: 'MD, DM Neurology', experience: 15, rating: 4.7, availability: 'on_duty', patientsToday: 11, avgConsultationTime: 22, contact: '+91-9876543211' },
  { id: 'doc-3', name: 'Dr. Meera Reddy', specialization: 'General Physician', hospitalId: 'hosp-1', department: 'General Medicine', qualification: 'MBBS, MD', experience: 8, rating: 4.5, availability: 'on_duty', patientsToday: 22, avgConsultationTime: 12, contact: '+91-9876543212' },
  { id: 'doc-4', name: 'Dr. Anil Kapoor', specialization: 'Orthopedic Surgeon', hospitalId: 'hosp-2', department: 'Orthopedics', qualification: 'MS Orthopedics', experience: 20, rating: 4.9, availability: 'off_duty', patientsToday: 0, avgConsultationTime: 25, contact: '+91-9876543213' },
  { id: 'doc-5', name: 'Dr. Sunita Joshi', specialization: 'Psychiatrist', hospitalId: 'hosp-1', department: 'Psychiatry', qualification: 'MD Psychiatry', experience: 10, rating: 4.6, availability: 'on_duty', patientsToday: 8, avgConsultationTime: 30, contact: '+91-9876543214' },
];

// ===== PATIENTS =====
export const seedPatients: Patient[] = [
  {
    id: 'pat-1', name: 'Arjun Mehta', age: 45, gender: 'Male', bloodGroup: 'B+', mobile: '+91-9876500001', email: 'arjun.m@email.com', address: '24, Palm Road, Andheri, Mumbai', aadhaar: '1234-5678-9012',
    fingerprintHash: sha256('arjun-fingerprint-001'),
    familyId: 'fam-1',
    geneticMarkers: [
      { gene: 'BRCA1', variant: 'Normal', riskLevel: 'low', condition: 'Breast Cancer' },
      { gene: 'APOE', variant: 'ε3/ε4', riskLevel: 'moderate', condition: "Alzheimer's Disease" },
      { gene: 'FTO', variant: 'AA', riskLevel: 'high', condition: 'Obesity Predisposition' },
    ],
    diseases: [
      { name: 'Type 2 Diabetes', diagnosedDate: '2019-03-15', status: 'chronic', severity: 'moderate' },
      { name: 'Hypertension', diagnosedDate: '2020-07-22', status: 'chronic', severity: 'mild' },
    ],
    allergies: ['Penicillin', 'Sulfa drugs'],
    medications: [
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2019-04-01', active: true },
      { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', startDate: '2020-08-01', active: true },
      { name: 'Atorvastatin', dosage: '10mg', frequency: 'Once daily', startDate: '2021-01-15', active: true },
    ],
    surgeries: [
      { name: 'Appendectomy', date: '2005-08-20', hospital: 'Apollo Hospital', outcome: 'Successful' },
    ],
    vitalityScore: 78,
    emergencyContact: { name: 'Kavita Mehta', relation: 'Wife', phone: '+91-9876500002', email: 'kavita.m@email.com' },
    wearableDevices: [
      { id: 'wear-1', type: 'fitness_band', name: 'Mi Band 8', lastSync: new Date(Date.now() - 120000).toISOString(), battery: 72, connected: true },
      { id: 'wear-2', type: 'bp_monitor', name: 'Omron HEM-7156', lastSync: new Date(Date.now() - 3600000).toISOString(), battery: 88, connected: true },
      { id: 'wear-3', type: 'glucose_meter', name: 'Accu-Chek Guide', lastSync: new Date(Date.now() - 7200000).toISOString(), battery: 45, connected: true },
    ],
    insurancePolicy: { provider: 'Star Health Insurance', policyId: 'SH-2024-78291', coverage: 500000, premium: 12000, validUntil: '2027-03-31', type: 'Family Floater', status: 'active' },
    mentalHealthScore: 8,
    fitnessMetrics: { steps: 6420, calories: 2100, sleepHours: 6.5, waterIntake: 2.1, bmi: 27.3, height: 175, weight: 83.5 },
    vaccinationStatus: {
      vaccines: [
        { name: 'COVID-19 (Covishield)', date: '2021-05-15', doseNumber: 1, totalDoses: 2, batchNumber: 'ABV5678', provider: 'Apollo Hospital' },
        { name: 'COVID-19 (Covishield)', date: '2021-08-20', doseNumber: 2, totalDoses: 2, batchNumber: 'ABV9012', provider: 'Apollo Hospital' },
        { name: 'COVID-19 Booster', date: '2022-04-10', doseNumber: 1, totalDoses: 1, batchNumber: 'COR3456', provider: 'Apollo Hospital' },
        { name: 'Influenza', date: '2024-10-05', doseNumber: 1, totalDoses: 1, batchNumber: 'FLU7890', provider: 'Fortis Hospital' },
        { name: 'Hepatitis B', date: '2015-02-20', doseNumber: 3, totalDoses: 3, batchNumber: 'HBV1234', provider: 'City Clinic' },
      ],
      travelEligible: true,
    },
    emergencyActionPlan: {
      contacts: [
        { name: 'Kavita Mehta', relation: 'Wife', phone: '+91-9876500002', email: 'kavita.m@email.com' },
        { name: 'Rohit Mehta', relation: 'Brother', phone: '+91-9876500003', email: 'rohit.m@email.com' },
      ],
      preferredHospital: 'Apollo Multispeciality Hospital',
      instructions: 'Patient is diabetic. If unconscious, check blood sugar immediately. Do NOT administer Penicillin (ALLERGY). Use fingerprint for health record access.',
      bloodGroup: 'B+',
      knownConditions: ['Type 2 Diabetes', 'Hypertension', 'Penicillin Allergy'],
    },
    labReports: [
      {
        id: 'lab-1', testName: 'Complete Blood Count', date: '2024-11-15',
        values: [
          { parameter: 'Hemoglobin', value: 13.5, unit: 'g/dL', normalRange: '12-17.5', status: 'normal' },
          { parameter: 'WBC', value: 8200, unit: '/µL', normalRange: '4000-11000', status: 'normal' },
          { parameter: 'Platelets', value: 245000, unit: '/µL', normalRange: '150000-400000', status: 'normal' },
        ],
        interpretation: 'All values within normal limits. Blood counts are healthy.',
        doctorId: 'doc-1', status: 'normal',
      },
      {
        id: 'lab-2', testName: 'HbA1c & Glucose', date: '2024-12-01',
        values: [
          { parameter: 'HbA1c', value: 7.2, unit: '%', normalRange: '4-5.6', status: 'high' },
          { parameter: 'Fasting Glucose', value: 142, unit: 'mg/dL', normalRange: '70-100', status: 'high' },
        ],
        interpretation: 'HbA1c of 7.2% indicates moderate diabetes control. Fasting glucose elevated. Consider medication adjustment. Target HbA1c < 7%.',
        doctorId: 'doc-1', status: 'abnormal',
      },
      {
        id: 'lab-3', testName: 'Lipid Profile', date: '2024-12-01',
        values: [
          { parameter: 'Cholesterol Total', value: 218, unit: 'mg/dL', normalRange: '125-200', status: 'high' },
          { parameter: 'HDL', value: 42, unit: 'mg/dL', normalRange: '40-60', status: 'normal' },
          { parameter: 'LDL', value: 148, unit: 'mg/dL', normalRange: '0-100', status: 'high' },
          { parameter: 'Triglycerides', value: 168, unit: 'mg/dL', normalRange: '0-150', status: 'high' },
        ],
        interpretation: 'Total cholesterol and LDL elevated. Triglycerides above optimal. Continue statin therapy. Dietary modifications recommended.',
        doctorId: 'doc-1', status: 'abnormal',
      },
    ],
    prescriptions: ['rx-1'],
    organDonor: false,
    healthForecast: {
      thirtyDay: [
        { condition: 'Hypoglycemic Episode', probability: 15, riskFactors: ['Diabetes', 'Metformin'], recommendation: 'Monitor fasting glucose daily' },
        { condition: 'Hypertensive Crisis', probability: 8, riskFactors: ['Hypertension', 'Stress'], recommendation: 'Continue Amlodipine, reduce salt intake' },
      ],
      ninetyDay: [
        { condition: 'Cardiovascular Event', probability: 12, riskFactors: ['Hypertension', 'High LDL', 'Diabetes'], recommendation: 'Schedule cardiac stress test' },
        { condition: 'Diabetic Neuropathy', probability: 18, riskFactors: ['Diabetes duration 5+ years'], recommendation: 'Annual foot exam, HbA1c target < 7%' },
      ],
      oneEightyDay: [
        { condition: 'Hospitalization', probability: 35, riskFactors: ['Multiple comorbidities', 'Sedentary lifestyle', 'Elevated BMI'], recommendation: 'Increase physical activity, dietician consult' },
      ],
      overallRisk: 'moderate',
      lastUpdated: new Date().toISOString(),
    },
    achievements: [
      { id: 'ach-1', name: 'First Checkup', description: 'Completed your first health checkup', icon: '🏥', earnedDate: '2024-01-15', category: 'checkup' },
      { id: 'ach-2', name: 'Med Adherent 30', description: '30 consecutive days of medication adherence', icon: '💊', earnedDate: '2024-03-01', category: 'medication' },
      { id: 'ach-3', name: '5K Steps Club', description: 'Walked 5000+ steps for 7 consecutive days', icon: '🚶', earnedDate: '2024-05-20', category: 'fitness' },
      { id: 'ach-4', name: 'Blood Donor', description: 'Donated blood this year', icon: '🩸', earnedDate: '2024-06-14', category: 'health' },
      { id: 'ach-5', name: 'Vaccine Champion', description: 'All vaccinations up to date', icon: '💉', earnedDate: '2024-10-05', category: 'health' },
    ],
    dailyQuest: { id: 'quest-1', title: 'Walk 7,000 Steps', description: 'Complete 7,000 steps today to earn bonus vitality points', target: 7000, current: 6420, unit: 'steps', reward: 10, completed: false },
    consentStatus: [
      { entityId: 'hosp-1', entityType: 'hospital', consentGiven: true, date: '2024-01-01', scope: ['medical_records', 'lab_reports', 'prescriptions'] },
      { entityId: 'doc-1', entityType: 'doctor', consentGiven: true, date: '2024-01-01', scope: ['medical_records', 'lab_reports'] },
    ],
  },
  {
    id: 'pat-2', name: 'Sneha Iyer', age: 32, gender: 'Female', bloodGroup: 'O+', mobile: '+91-9876500010', email: 'sneha.i@email.com', address: '12, MG Road, Bangalore', aadhaar: '2345-6789-0123',
    fingerprintHash: sha256('sneha-fingerprint-002'),
    familyId: 'fam-2',
    geneticMarkers: [{ gene: 'BRCA2', variant: 'Pathogenic', riskLevel: 'high', condition: 'Breast/Ovarian Cancer' }],
    diseases: [{ name: 'Asthma', diagnosedDate: '2010-05-10', status: 'chronic', severity: 'mild' }],
    allergies: ['NSAIDs', 'Latex'],
    medications: [{ name: 'Budesonide Inhaler', dosage: '200mcg', frequency: 'Twice daily', startDate: '2010-06-01', active: true }],
    surgeries: [],
    vitalityScore: 88,
    emergencyContact: { name: 'Ravi Iyer', relation: 'Husband', phone: '+91-9876500011', email: 'ravi.i@email.com' },
    wearableDevices: [{ id: 'wear-4', type: 'fitness_band', name: 'Apple Watch SE', lastSync: new Date(Date.now() - 60000).toISOString(), battery: 91, connected: true }],
    insurancePolicy: { provider: 'HDFC ERGO', policyId: 'HE-2024-33421', coverage: 1000000, premium: 18000, validUntil: '2027-06-30', type: 'Individual', status: 'active' },
    mentalHealthScore: 3,
    fitnessMetrics: { steps: 9200, calories: 1800, sleepHours: 7.5, waterIntake: 2.8, bmi: 22.1, height: 162, weight: 58 },
    vaccinationStatus: { vaccines: [
      { name: 'COVID-19 (Covaxin)', date: '2021-06-10', doseNumber: 2, totalDoses: 2, batchNumber: 'CVX4567', provider: 'Govt Hospital' },
    ], travelEligible: true },
    emergencyActionPlan: { contacts: [{ name: 'Ravi Iyer', relation: 'Husband', phone: '+91-9876500011', email: 'ravi.i@email.com' }], preferredHospital: 'Apollo Multispeciality Hospital', instructions: 'Asthmatic patient. Has rescue inhaler. Do NOT give NSAIDs.', bloodGroup: 'O+', knownConditions: ['Asthma'] },
    labReports: [{ id: 'lab-4', testName: 'Thyroid Panel', date: '2024-11-20', values: [{ parameter: 'TSH', value: 3.2, unit: 'mIU/L', normalRange: '0.4-4.0', status: 'normal' }], interpretation: 'Thyroid function normal.', doctorId: 'doc-3', status: 'normal' }],
    prescriptions: ['rx-2'],
    organDonor: true,
    healthForecast: { thirtyDay: [{ condition: 'Asthma Exacerbation', probability: 10, riskFactors: ['Seasonal change', 'Air quality'], recommendation: 'Keep inhaler accessible' }], ninetyDay: [], oneEightyDay: [{ condition: 'Breast Cancer Screening', probability: 5, riskFactors: ['BRCA2 variant'], recommendation: 'Annual mammogram recommended' }], overallRisk: 'low', lastUpdated: new Date().toISOString() },
    achievements: [
      { id: 'ach-6', name: '10K Steps Daily', description: 'Averaged 10K steps for a month', icon: '🏃', earnedDate: '2024-04-01', category: 'fitness' },
      { id: 'ach-7', name: 'Stress-Free Week', description: '7 days of positive mood tracking', icon: '😊', earnedDate: '2024-09-15', category: 'health' },
    ],
    dailyQuest: { id: 'quest-2', title: 'Drink 3L Water', description: 'Stay hydrated with 3 litres today', target: 3, current: 2.8, unit: 'litres', reward: 5, completed: false },
    consentStatus: [],
  },
  {
    id: 'pat-3', name: 'Ramesh Gupta', age: 68, gender: 'Male', bloodGroup: 'A-', mobile: '+91-9876500020', email: 'ramesh.g@email.com', address: '56, Civil Lines, Delhi', aadhaar: '3456-7890-1234',
    fingerprintHash: sha256('ramesh-fingerprint-003'),
    familyId: 'fam-3',
    geneticMarkers: [{ gene: 'APOE', variant: 'ε4/ε4', riskLevel: 'high', condition: "Alzheimer's Disease" }],
    diseases: [
      { name: 'Coronary Artery Disease', diagnosedDate: '2018-11-05', status: 'chronic', severity: 'severe' },
      { name: 'Type 2 Diabetes', diagnosedDate: '2012-04-20', status: 'chronic', severity: 'moderate' },
      { name: 'Chronic Kidney Disease Stage 3', diagnosedDate: '2022-06-10', status: 'chronic', severity: 'moderate' },
    ],
    allergies: ['Aspirin'],
    medications: [
      { name: 'Clopidogrel', dosage: '75mg', frequency: 'Once daily', startDate: '2018-12-01', active: true },
      { name: 'Metformin', dosage: '250mg', frequency: 'Once daily', startDate: '2012-05-01', active: true },
      { name: 'Warfarin', dosage: '5mg', frequency: 'Once daily', startDate: '2019-01-15', active: true },
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2022-07-01', active: true },
    ],
    surgeries: [
      { name: 'Coronary Angioplasty', date: '2018-11-10', hospital: 'Fortis Heart Institute', outcome: 'Successful, 2 stents placed' },
    ],
    vitalityScore: 52,
    emergencyContact: { name: 'Sunita Gupta', relation: 'Wife', phone: '+91-9876500021', email: 'sunita.g@email.com' },
    wearableDevices: [
      { id: 'wear-5', type: 'bp_monitor', name: 'Omron HEM-7120', lastSync: new Date(Date.now() - 1800000).toISOString(), battery: 60, connected: true },
      { id: 'wear-6', type: 'pulse_oximeter', name: 'BPL Smart Oxy', lastSync: new Date(Date.now() - 900000).toISOString(), battery: 35, connected: true },
    ],
    insurancePolicy: { provider: 'Ayushman Bharat', policyId: 'AB-2024-99012', coverage: 500000, premium: 0, validUntil: '2027-12-31', type: 'Government', status: 'active' },
    mentalHealthScore: 12,
    fitnessMetrics: { steps: 2100, calories: 1600, sleepHours: 5.5, waterIntake: 1.5, bmi: 30.2, height: 168, weight: 85 },
    vaccinationStatus: { vaccines: [
      { name: 'COVID-19 (Covishield)', date: '2021-04-10', doseNumber: 2, totalDoses: 2, batchNumber: 'ABV1111', provider: 'Govt Hospital' },
      { name: 'Pneumococcal', date: '2023-01-15', doseNumber: 1, totalDoses: 1, batchNumber: 'PCV2222', provider: 'Fortis Hospital' },
    ], travelEligible: false },
    emergencyActionPlan: { contacts: [{ name: 'Sunita Gupta', relation: 'Wife', phone: '+91-9876500021', email: 'sunita.g@email.com' }], preferredHospital: 'Fortis Heart Institute', instructions: 'Cardiac patient on Warfarin. DO NOT give Aspirin. Check INR before any procedure. CKD Stage 3 - adjust all drug doses.', bloodGroup: 'A-', knownConditions: ['CAD', 'Diabetes', 'CKD Stage 3', 'Aspirin Allergy'] },
    labReports: [
      { id: 'lab-5', testName: 'Renal Function', date: '2024-12-10', values: [{ parameter: 'Creatinine', value: 2.1, unit: 'mg/dL', normalRange: '0.7-1.3', status: 'high' }], interpretation: 'Creatinine elevated consistent with CKD Stage 3. eGFR ~38. Monitor closely.', doctorId: 'doc-1', status: 'abnormal' },
    ],
    prescriptions: ['rx-3'],
    organDonor: false,
    healthForecast: { thirtyDay: [{ condition: 'Cardiac Event', probability: 22, riskFactors: ['CAD', 'Age', 'CKD'], recommendation: 'Strict medication adherence, weekly BP monitoring' }], ninetyDay: [{ condition: 'Hospitalization', probability: 40, riskFactors: ['Multiple comorbidities', 'CKD progression'], recommendation: 'Nephrology follow-up, dietary protein restriction' }], oneEightyDay: [{ condition: 'Dialysis Initiation', probability: 15, riskFactors: ['CKD Stage 3 progression'], recommendation: 'AV fistula planning consultation' }], overallRisk: 'high', lastUpdated: new Date().toISOString() },
    achievements: [{ id: 'ach-8', name: 'Med Warrior', description: '90 days medication adherence', icon: '🛡️', earnedDate: '2024-03-15', category: 'medication' }],
    dailyQuest: { id: 'quest-3', title: 'Take All Medications', description: 'Complete all 4 medications today', target: 4, current: 3, unit: 'meds', reward: 15, completed: false },
    consentStatus: [{ entityId: 'hosp-2', entityType: 'hospital', consentGiven: true, date: '2024-01-01', scope: ['medical_records', 'lab_reports', 'prescriptions'] }],
  },
  {
    id: 'pat-4', name: 'Fatima Khan', age: 28, gender: 'Female', bloodGroup: 'AB+', mobile: '+91-9876500030', email: 'fatima.k@email.com', address: '78, Jubilee Hills, Hyderabad', aadhaar: '4567-8901-2345',
    fingerprintHash: sha256('fatima-fingerprint-004'),
    familyId: 'fam-4',
    geneticMarkers: [],
    diseases: [{ name: 'Iron Deficiency Anemia', diagnosedDate: '2024-02-10', status: 'active', severity: 'mild' }],
    allergies: [],
    medications: [{ name: 'Ferrous Sulfate', dosage: '325mg', frequency: 'Once daily', startDate: '2024-03-01', active: true }],
    surgeries: [],
    vitalityScore: 92,
    emergencyContact: { name: 'Ahmed Khan', relation: 'Father', phone: '+91-9876500031', email: 'ahmed.k@email.com' },
    wearableDevices: [{ id: 'wear-7', type: 'fitness_band', name: 'Fitbit Charge 6', lastSync: new Date(Date.now() - 300000).toISOString(), battery: 95, connected: true }],
    insurancePolicy: { provider: 'Max Bupa', policyId: 'MB-2024-55678', coverage: 750000, premium: 15000, validUntil: '2027-09-30', type: 'Individual', status: 'active' },
    mentalHealthScore: 2,
    fitnessMetrics: { steps: 11500, calories: 1950, sleepHours: 8, waterIntake: 3.2, bmi: 21.5, height: 165, weight: 58.5 },
    vaccinationStatus: { vaccines: [{ name: 'COVID-19 (Moderna)', date: '2021-09-15', doseNumber: 2, totalDoses: 2, batchNumber: 'MOD9999', provider: 'Apollo Hospital' }], travelEligible: true },
    emergencyActionPlan: { contacts: [{ name: 'Ahmed Khan', relation: 'Father', phone: '+91-9876500031', email: 'ahmed.k@email.com' }], preferredHospital: 'Apollo Multispeciality Hospital', instructions: 'No known allergies. Mild anemia - may need iron infusion if symptomatic.', bloodGroup: 'AB+', knownConditions: ['Iron Deficiency Anemia'] },
    labReports: [{ id: 'lab-6', testName: 'CBC', date: '2024-11-28', values: [{ parameter: 'Hemoglobin', value: 10.8, unit: 'g/dL', normalRange: '12-17.5', status: 'low' }], interpretation: 'Hemoglobin slightly below normal. Continue iron supplementation. Recheck in 3 months.', doctorId: 'doc-3', status: 'abnormal' }],
    prescriptions: [],
    organDonor: true,
    healthForecast: { thirtyDay: [{ condition: 'Anemia Worsening', probability: 8, riskFactors: ['Iron deficiency'], recommendation: 'Continue supplementation, iron-rich diet' }], ninetyDay: [], oneEightyDay: [], overallRisk: 'low', lastUpdated: new Date().toISOString() },
    achievements: [
      { id: 'ach-9', name: 'Marathon Runner', description: 'Completed a 10K run', icon: '🏅', earnedDate: '2024-07-20', category: 'fitness' },
      { id: 'ach-10', name: 'Hydration Hero', description: '30 days of 3L water intake', icon: '💧', earnedDate: '2024-08-30', category: 'health' },
    ],
    dailyQuest: { id: 'quest-4', title: 'Sleep 8 Hours', description: 'Get a full 8 hours of sleep tonight', target: 8, current: 0, unit: 'hours', reward: 8, completed: false },
    consentStatus: [],
  },
  {
    id: 'pat-5', name: 'Vikram Singh', age: 55, gender: 'Male', bloodGroup: 'O-', mobile: '+91-9876500040', email: 'vikram.s@email.com', address: '33, Sector 15, Chandigarh', aadhaar: '5678-9012-3456',
    fingerprintHash: sha256('vikram-fingerprint-005'),
    familyId: 'fam-5',
    geneticMarkers: [{ gene: 'HFE', variant: 'C282Y', riskLevel: 'moderate', condition: 'Hemochromatosis' }],
    diseases: [
      { name: 'COPD', diagnosedDate: '2020-01-15', status: 'chronic', severity: 'moderate' },
      { name: 'Hypertension', diagnosedDate: '2017-08-10', status: 'chronic', severity: 'moderate' },
    ],
    allergies: ['Erythromycin'],
    medications: [
      { name: 'Tiotropium Inhaler', dosage: '18mcg', frequency: 'Once daily', startDate: '2020-02-01', active: true },
      { name: 'Losartan', dosage: '50mg', frequency: 'Once daily', startDate: '2017-09-01', active: true },
    ],
    surgeries: [],
    vitalityScore: 61,
    emergencyContact: { name: 'Deepa Singh', relation: 'Wife', phone: '+91-9876500041', email: 'deepa.s@email.com' },
    wearableDevices: [{ id: 'wear-8', type: 'pulse_oximeter', name: 'Beurer PO 30', lastSync: new Date(Date.now() - 600000).toISOString(), battery: 55, connected: true }],
    insurancePolicy: { provider: 'ICICI Lombard', policyId: 'IL-2024-11223', coverage: 300000, premium: 9500, validUntil: '2026-12-31', type: 'Individual', status: 'active' },
    mentalHealthScore: 6,
    fitnessMetrics: { steps: 3800, calories: 1900, sleepHours: 6, waterIntake: 1.8, bmi: 26.8, height: 172, weight: 79 },
    vaccinationStatus: { vaccines: [{ name: 'COVID-19 (Covishield)', date: '2021-07-20', doseNumber: 2, totalDoses: 2, batchNumber: 'ABV3333', provider: 'Govt Hospital' }], travelEligible: true },
    emergencyActionPlan: { contacts: [{ name: 'Deepa Singh', relation: 'Wife', phone: '+91-9876500041', email: 'deepa.s@email.com' }], preferredHospital: 'Apollo Multispeciality Hospital', instructions: 'COPD patient. Needs oxygen if SpO2 < 90%. Do NOT give Erythromycin.', bloodGroup: 'O-', knownConditions: ['COPD', 'Hypertension'] },
    labReports: [],
    prescriptions: [],
    organDonor: false,
    healthForecast: { thirtyDay: [{ condition: 'COPD Exacerbation', probability: 20, riskFactors: ['Air quality', 'Seasonal change'], recommendation: 'Avoid polluted areas, use inhaler as prescribed' }], ninetyDay: [{ condition: 'Respiratory Failure', probability: 8, riskFactors: ['COPD progression'], recommendation: 'Pulmonary function test recommended' }], oneEightyDay: [], overallRisk: 'moderate', lastUpdated: new Date().toISOString() },
    achievements: [{ id: 'ach-11', name: 'Quit Smoking', description: '1 year smoke-free', icon: '🚭', earnedDate: '2024-01-15', category: 'health' }],
    dailyQuest: { id: 'quest-5', title: 'Use Inhaler', description: 'Use your tiotropium inhaler today', target: 1, current: 1, unit: 'use', reward: 5, completed: true },
    consentStatus: [],
  },
];

// ===== TRIAGE QUEUE =====
export const seedTriageQueue: TriagePatient[] = [
  { patientId: 'pat-3', name: 'Ramesh Gupta', age: 68, gender: 'Male', cdiScore: 78, predictedSeverity: 85, bloodGroup: 'A-', comorbidities: ['CAD', 'Diabetes', 'CKD'], chiefComplaint: 'Chest pain, shortness of breath', arrivalTime: new Date(Date.now() - 1800000).toISOString(), status: 'waiting', insuranceStatus: true, vaccineStatus: 'Partial', bedAssigned: undefined },
  { patientId: 'pat-5', name: 'Vikram Singh', age: 55, gender: 'Male', cdiScore: 52, predictedSeverity: 60, bloodGroup: 'O-', comorbidities: ['COPD', 'Hypertension'], chiefComplaint: 'Acute breathlessness, SpO2 88%', arrivalTime: new Date(Date.now() - 3600000).toISOString(), status: 'in_progress', insuranceStatus: true, vaccineStatus: 'Full', bedAssigned: 'ER-3' },
  { patientId: 'pat-1', name: 'Arjun Mehta', age: 45, gender: 'Male', cdiScore: 35, predictedSeverity: 42, bloodGroup: 'B+', comorbidities: ['Diabetes', 'Hypertension'], chiefComplaint: 'Dizziness, elevated blood sugar', arrivalTime: new Date(Date.now() - 5400000).toISOString(), status: 'waiting', insuranceStatus: true, vaccineStatus: 'Full' },
  { patientId: 'pat-2', name: 'Sneha Iyer', age: 32, gender: 'Female', cdiScore: 18, predictedSeverity: 20, bloodGroup: 'O+', comorbidities: ['Asthma'], chiefComplaint: 'Mild wheezing, follow-up', arrivalTime: new Date(Date.now() - 7200000).toISOString(), status: 'waiting', insuranceStatus: true, vaccineStatus: 'Full' },
  { patientId: 'pat-4', name: 'Fatima Khan', age: 28, gender: 'Female', cdiScore: 12, predictedSeverity: 10, bloodGroup: 'AB+', comorbidities: ['Anemia'], chiefComplaint: 'Fatigue, routine checkup', arrivalTime: new Date(Date.now() - 9000000).toISOString(), status: 'waiting', insuranceStatus: true, vaccineStatus: 'Full' },
];

// ===== WEARABLE DATA (last 7 days for pat-1) =====
export const seedWearableData: WearableData[] = Array.from({ length: 7 }, (_, i) => ({
  id: `wd-${i}`,
  patientId: 'pat-1',
  timestamp: new Date(Date.now() - i * 86400000).toISOString(),
  heartRate: 72 + Math.round(Math.random() * 15 - 5),
  bloodPressure: { systolic: 130 + Math.round(Math.random() * 20 - 10), diastolic: 82 + Math.round(Math.random() * 10 - 5) },
  glucose: 140 + Math.round(Math.random() * 30 - 15),
  spo2: 96 + Math.round(Math.random() * 3),
  steps: 5000 + Math.round(Math.random() * 4000),
  temperature: 36.5 + Math.round(Math.random() * 10) / 10,
  sleepQuality: 60 + Math.round(Math.random() * 30),
}));

// ===== PRESCRIPTIONS =====
export const seedPrescriptions: Prescription[] = [
  {
    id: 'rx-1', patientId: 'pat-1', doctorId: 'doc-1', date: '2024-12-01', status: 'active', digitalSignature: 'DS-PRIYA-2024-001',
    drugs: [
      { name: 'Metformin', genericName: 'Metformin HCl', dosage: '500mg', frequency: 'Twice daily', duration: '90 days', quantity: 180, brandPrice: 85, genericPrice: 32, instructions: 'Take with meals' },
      { name: 'Amlodipine', genericName: 'Amlodipine Besylate', dosage: '5mg', frequency: 'Once daily', duration: '90 days', quantity: 90, brandPrice: 120, genericPrice: 45, instructions: 'Take in the morning' },
      { name: 'Atorvastatin', genericName: 'Atorvastatin Calcium', dosage: '10mg', frequency: 'Once daily at bedtime', duration: '90 days', quantity: 90, brandPrice: 150, genericPrice: 55, instructions: 'Take at bedtime' },
    ],
    interactions: [
      { drug1: 'Metformin', drug2: 'Amlodipine', severity: 'safe', warning: 'No significant interaction' },
    ],
    ePharmacyOrder: { orderId: 'EPH-2024-001', status: 'delivered', deliveryDate: '2024-12-05', totalCost: 132, items: [{ drug: 'Metformin 500mg', quantity: 180, price: 32 }, { drug: 'Amlodipine 5mg', quantity: 90, price: 45 }, { drug: 'Atorvastatin 10mg', quantity: 90, price: 55 }] },
  },
  {
    id: 'rx-2', patientId: 'pat-2', doctorId: 'doc-3', date: '2024-11-15', status: 'active', digitalSignature: 'DS-MEERA-2024-002',
    drugs: [{ name: 'Budesonide Inhaler', genericName: 'Budesonide', dosage: '200mcg', frequency: 'Twice daily', duration: '180 days', quantity: 2, brandPrice: 450, genericPrice: 280, instructions: 'Rinse mouth after use' }],
    interactions: [],
  },
  {
    id: 'rx-3', patientId: 'pat-3', doctorId: 'doc-1', date: '2024-12-10', status: 'active', digitalSignature: 'DS-PRIYA-2024-003',
    drugs: [
      { name: 'Clopidogrel', genericName: 'Clopidogrel Bisulfate', dosage: '75mg', frequency: 'Once daily', duration: '180 days', quantity: 180, brandPrice: 180, genericPrice: 65, instructions: 'Do not stop without consulting doctor' },
      { name: 'Warfarin', genericName: 'Warfarin Sodium', dosage: '5mg', frequency: 'Once daily', duration: '90 days', quantity: 90, brandPrice: 95, genericPrice: 40, instructions: 'Monitor INR weekly' },
    ],
    interactions: [{ drug1: 'Clopidogrel', drug2: 'Warfarin', severity: 'monitor', warning: 'Increased bleeding risk. Monitor INR closely.' }],
  },
];

// ===== CONSULTATIONS =====
export const seedConsultations: Consultation[] = [
  {
    id: 'consult-1', patientId: 'pat-1', doctorId: 'doc-1', date: '2024-12-01', status: 'completed',
    symptoms: ['Dizziness', 'Frequent urination', 'Blurred vision'],
    subjective: 'Patient reports intermittent dizziness for past 2 weeks, increased urination frequency, and occasional blurred vision. No chest pain or palpitations.',
    objective: 'BP: 145/92 mmHg, HR: 78 bpm, Temp: 36.8°C, BMI: 27.3. Fundoscopy: No diabetic retinopathy.',
    assessment: 'Uncontrolled Type 2 Diabetes with mild hypertension. Possible early diabetic symptoms requiring medication adjustment.',
    plan: 'Increase Metformin to 1000mg/day. Add Atorvastatin 10mg. Recheck HbA1c in 3 months. Dietary counseling referral.',
    diagnosis: 'Type 2 Diabetes Mellitus - Inadequate Control',
    treatment: 'Medication adjustment, lifestyle modification',
    aiSuggestions: [
      { diagnosis: 'Type 2 Diabetes - Poor Control', probability: 92, icd10Code: 'E11.65', evidence: ['Elevated HbA1c', 'Polyuria', 'Blurred vision'] },
      { diagnosis: 'Hypertensive Crisis', probability: 45, icd10Code: 'I16.0', evidence: ['Elevated BP', 'Dizziness'] },
      { diagnosis: 'Diabetic Retinopathy', probability: 25, icd10Code: 'E11.319', evidence: ['Blurred vision', 'Diabetes history'] },
    ],
    investigations: ['HbA1c', 'Fasting Glucose', 'Lipid Profile', 'Renal Function Panel', 'Urine Microalbumin'],
  },
];

// ===== BED MANAGEMENT =====
export const seedBeds: BedInfo[] = [
  { roomId: 'GEN-101', department: 'General Medicine', floor: 1, type: 'general', status: 'occupied', occupancy: { patientId: 'pat-5', patientName: 'Vikram Singh', admitDate: '2024-12-12', estimatedLOS: 3 } },
  { roomId: 'GEN-102', department: 'General Medicine', floor: 1, type: 'general', status: 'available' },
  { roomId: 'GEN-103', department: 'General Medicine', floor: 1, type: 'semi_private', status: 'available' },
  { roomId: 'GEN-104', department: 'General Medicine', floor: 1, type: 'general', status: 'maintenance' },
  { roomId: 'CAR-201', department: 'Cardiology', floor: 2, type: 'private', status: 'occupied', occupancy: { patientId: 'pat-3', patientName: 'Ramesh Gupta', admitDate: '2024-12-10', estimatedLOS: 5 } },
  { roomId: 'CAR-202', department: 'Cardiology', floor: 2, type: 'semi_private', status: 'available' },
  { roomId: 'CAR-203', department: 'Cardiology', floor: 2, type: 'private', status: 'occupied', occupancy: { patientId: 'pat-temp-1', patientName: 'Suresh Nair', admitDate: '2024-12-11', estimatedLOS: 4 } },
  { roomId: 'ICU-301', department: 'ICU', floor: 3, type: 'icu', status: 'occupied', occupancy: { patientId: 'pat-temp-2', patientName: 'Lakshmi Devi', admitDate: '2024-12-09', estimatedLOS: 7 } },
  { roomId: 'ICU-302', department: 'ICU', floor: 3, type: 'icu', status: 'occupied', occupancy: { patientId: 'pat-temp-3', patientName: 'Aakash Verma', admitDate: '2024-12-08', estimatedLOS: 10 } },
  { roomId: 'ICU-303', department: 'ICU', floor: 3, type: 'icu', status: 'reserved' },
  { roomId: 'ICU-304', department: 'ICU', floor: 3, type: 'icu', status: 'available' },
  { roomId: 'ER-1', department: 'Emergency', floor: 0, type: 'er', status: 'available' },
  { roomId: 'ER-2', department: 'Emergency', floor: 0, type: 'er', status: 'occupied', occupancy: { patientId: 'pat-temp-4', patientName: 'Priya Reddy', admitDate: '2024-12-12', estimatedLOS: 1 } },
  { roomId: 'ER-3', department: 'Emergency', floor: 0, type: 'er', status: 'occupied', occupancy: { patientId: 'pat-5', patientName: 'Vikram Singh', admitDate: '2024-12-12', estimatedLOS: 2 } },
  { roomId: 'ER-4', department: 'Emergency', floor: 0, type: 'er', status: 'available' },
  { roomId: 'PED-401', department: 'Pediatrics', floor: 4, type: 'general', status: 'available' },
  { roomId: 'PED-402', department: 'Pediatrics', floor: 4, type: 'semi_private', status: 'available' },
  { roomId: 'ORT-501', department: 'Orthopedics', floor: 5, type: 'semi_private', status: 'occupied', occupancy: { patientId: 'pat-temp-5', patientName: 'Mohan Das', admitDate: '2024-12-11', estimatedLOS: 6 } },
  { roomId: 'ORT-502', department: 'Orthopedics', floor: 5, type: 'general', status: 'available' },
];

// ===== AMBULANCE DATA =====
export const seedAmbulanceData: AmbulanceData = {
  id: 'amb-1',
  patientName: 'Unknown Male (~60 years)',
  patientAge: 60,
  chiefComplaint: 'Sudden collapse, unresponsive, suspected cardiac arrest',
  vitals: { heartRate: 52, bloodPressure: { systolic: 88, diastolic: 55 }, spo2: 89, temperature: 37.2, glucose: 245 },
  location: { lat: 19.076, lng: 72.877, label: 'Near Andheri Station, Mumbai' },
  eta: 8,
  distance: 4.2,
  paramedicNotes: ['Patient found unresponsive on sidewalk', 'CPR initiated immediately', 'IV line established', 'ECG shows ST elevation in leads II, III, aVF'],
  drugsAdministered: ['Aspirin 300mg', 'Nitroglycerin SL', 'Normal Saline 500ml'],
  cprRounds: 3,
  status: 'en_route',
  reservedBed: 'ICU-303',
};

// ===== INSURANCE CLAIMS =====
export const seedInsuranceClaims: InsuranceClaim[] = [
  { id: 'claim-1', patientId: 'pat-1', hospitalId: 'hosp-1', claimDate: '2024-11-20', amount: 45000, services: [{ name: 'Consultation', cost: 1500, covered: true }, { name: 'Lab Tests', cost: 3500, covered: true }, { name: 'Medications', cost: 2000, covered: true }], status: 'approved', reimbursement: 7000 },
  { id: 'claim-2', patientId: 'pat-3', hospitalId: 'hosp-2', claimDate: '2024-12-10', amount: 250000, services: [{ name: 'ICU Stay (5 days)', cost: 150000, covered: true }, { name: 'Cardiac Monitoring', cost: 50000, covered: true }, { name: 'Medications', cost: 30000, covered: true }, { name: 'Room Upgrade', cost: 20000, covered: false }], status: 'processing', reimbursement: 230000 },
  { id: 'claim-3', patientId: 'pat-2', hospitalId: 'hosp-1', claimDate: '2024-10-15', amount: 8000, services: [{ name: 'Consultation', cost: 1000, covered: true }, { name: 'Pulmonary Function Test', cost: 5000, covered: true }, { name: 'Inhaler', cost: 2000, covered: true }], status: 'approved', reimbursement: 8000 },
];

// ===== HEALTH ALERTS =====
export const seedHealthAlerts: HealthAlert[] = [
  { id: 'alert-1', type: 'heatwave', title: '🌡️ Severe Heatwave Warning', message: 'Extreme heat expected in Mumbai, Delhi, and Rajasthan. Temperature may exceed 45°C. Stay hydrated, avoid outdoor activities between 11 AM - 4 PM. Vulnerable populations (elderly, children, chronic illness patients) should remain indoors.', severity: 'critical', targetDemographic: { region: 'Maharashtra' }, languages: ['English', 'Hindi', 'Marathi'], timestamp: new Date(Date.now() - 3600000).toISOString(), expiresAt: new Date(Date.now() + 172800000).toISOString(), readBy: ['pat-1', 'pat-2'], totalRecipients: 45000, isActive: true },
  { id: 'alert-2', type: 'outbreak', title: '🦟 Dengue Outbreak Alert - Sector 12', message: 'Confirmed dengue cluster in Sector 12, Navi Mumbai. 47 cases reported in the last 7 days. Fumigation drives scheduled. Remove standing water. Seek medical attention if you experience high fever, joint pain, or rash.', severity: 'warning', targetDemographic: { region: 'Mumbai' }, languages: ['English', 'Hindi', 'Marathi'], timestamp: new Date(Date.now() - 86400000).toISOString(), expiresAt: new Date(Date.now() + 604800000).toISOString(), readBy: ['pat-1'], totalRecipients: 12000, isActive: true },
  { id: 'alert-3', type: 'general', title: '💉 Free Flu Vaccination Drive', message: 'Free influenza vaccination available at all government hospitals from Dec 15-25. Priority for elderly (60+), pregnant women, and immunocompromised individuals. Bring Aadhaar card for registration.', severity: 'info', targetDemographic: { ageMin: 60 }, languages: ['English', 'Hindi'], timestamp: new Date(Date.now() - 172800000).toISOString(), expiresAt: new Date(Date.now() + 1209600000).toISOString(), readBy: ['pat-3'], totalRecipients: 80000, isActive: true },
];

// ===== AUDIT LOGS =====
function buildAuditChain(): AuditLog[] {
  const logs: AuditLog[] = [];
  let prevHash = '0'.repeat(64);

  const entries = [
    { patientId: 'pat-1', patientName: 'Arjun Mehta', actorId: 'doc-1', actorName: 'Dr. Priya Sharma', actorRole: 'doctor' as const, action: 'Viewed medical records', accessReason: 'Scheduled Consultation', details: 'Annual diabetes checkup consultation', hospitalName: 'Apollo Multispeciality Hospital' },
    { patientId: 'pat-1', patientName: 'Arjun Mehta', actorId: 'doc-1', actorName: 'Dr. Priya Sharma', actorRole: 'doctor' as const, action: 'Ordered lab tests', accessReason: 'Consultation', details: 'Ordered HbA1c, Lipid Profile, Renal Panel', hospitalName: 'Apollo Multispeciality Hospital' },
    { patientId: 'pat-1', patientName: 'Arjun Mehta', actorId: 'doc-1', actorName: 'Dr. Priya Sharma', actorRole: 'doctor' as const, action: 'Updated prescription', accessReason: 'Consultation', details: 'Added Atorvastatin 10mg, increased Metformin', hospitalName: 'Apollo Multispeciality Hospital' },
    { patientId: 'pat-3', patientName: 'Ramesh Gupta', actorId: 'doc-1', actorName: 'Dr. Priya Sharma', actorRole: 'doctor' as const, action: 'Emergency biometric access', accessReason: 'Cardiac Arrest', details: 'Patient presented with chest pain. Emergency fingerprint scan used.', hospitalName: 'Apollo Multispeciality Hospital' },
    { patientId: 'pat-3', patientName: 'Ramesh Gupta', actorId: 'doc-2', actorName: 'Dr. Vikram Patel', actorRole: 'doctor' as const, action: 'Viewed medical records', accessReason: 'Referral', details: 'Neurology referral for cognitive assessment', hospitalName: 'Apollo Multispeciality Hospital' },
    { patientId: 'pat-2', patientName: 'Sneha Iyer', actorId: 'doc-3', actorName: 'Dr. Meera Reddy', actorRole: 'doctor' as const, action: 'Viewed medical records', accessReason: 'Follow-up', details: 'Asthma follow-up appointment', hospitalName: 'Apollo Multispeciality Hospital' },
    { patientId: 'pat-1', patientName: 'Arjun Mehta', actorId: 'user-gov-1', actorName: 'Dir. Rajesh Kumar', actorRole: 'government' as const, action: 'Accessed anonymized data', accessReason: 'Public Health Surveillance', details: 'Diabetes prevalence study - Region: Mumbai' },
    { patientId: 'pat-4', patientName: 'Fatima Khan', actorId: 'doc-3', actorName: 'Dr. Meera Reddy', actorRole: 'doctor' as const, action: 'Viewed lab results', accessReason: 'Consultation', details: 'Reviewed CBC for anemia follow-up', hospitalName: 'Apollo Multispeciality Hospital' },
  ];

  for (let i = 0; i < entries.length; i++) {
    const e = entries[i];
    const timestamp = new Date(Date.now() - (entries.length - i) * 7200000).toISOString();
    const blockData = `${e.patientId}|${e.actorId}|${e.action}|${timestamp}|${prevHash}`;
    const hash = sha256(blockData);

    logs.push({
      id: `audit-${i + 1}`,
      ...e,
      timestamp,
      blockchainHash: hash,
      previousHash: prevHash,
      isTampered: false,
    });
    prevHash = hash;
  }
  return logs;
}

export const seedAuditLogs: AuditLog[] = buildAuditChain();

// ===== DISEASE CLUSTERS =====
export const seedDiseaseClusters: DiseaseCluster[] = [
  { disease: 'Dengue', region: 'Mumbai - Sector 12', cases: 47, trend: 'increasing', riskLevel: 'high', coordinates: { x: 35, y: 55 }, timelineData: Array.from({ length: 30 }, (_, i) => ({ date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0], cases: Math.max(0, Math.round(5 + i * 1.4 + Math.random() * 5)) })) },
  { disease: 'Malaria', region: 'Delhi - South', cases: 23, trend: 'stable', riskLevel: 'moderate', coordinates: { x: 50, y: 25 }, timelineData: Array.from({ length: 30 }, (_, i) => ({ date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0], cases: Math.round(20 + Math.random() * 8) })) },
  { disease: 'COVID-19', region: 'Pune', cases: 12, trend: 'decreasing', riskLevel: 'low', coordinates: { x: 30, y: 60 }, timelineData: Array.from({ length: 30 }, (_, i) => ({ date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0], cases: Math.max(0, Math.round(25 - i * 0.5 + Math.random() * 3)) })) },
  { disease: 'Tuberculosis', region: 'Rajasthan', cases: 34, trend: 'stable', riskLevel: 'moderate', coordinates: { x: 30, y: 30 }, timelineData: Array.from({ length: 30 }, (_, i) => ({ date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0], cases: Math.round(30 + Math.random() * 10) })) },
  { disease: 'Chikungunya', region: 'Hyderabad', cases: 18, trend: 'increasing', riskLevel: 'moderate', coordinates: { x: 45, y: 65 }, timelineData: Array.from({ length: 30 }, (_, i) => ({ date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0], cases: Math.round(8 + i * 0.3 + Math.random() * 4) })) },
];

// ===== VACCINATION CAMPS =====
export const seedVaccinationCamps: VaccinationCamp[] = [
  { id: 'camp-1', location: 'Sector 12 Community Hall, Mumbai', address: 'Near Metro Station', date: '2025-01-05', vaccine: 'Influenza', targetGroup: 'Elderly (60+)', capacity: 500, registrations: 345, coverage: 69, status: 'upcoming' },
  { id: 'camp-2', location: 'Government School, Pune', address: 'Sassoon Road', date: '2024-12-20', vaccine: 'COVID-19 Booster', targetGroup: 'All Adults', capacity: 1000, registrations: 780, coverage: 78, status: 'ongoing' },
  { id: 'camp-3', location: 'PHC Center, Jaipur', address: 'MI Road', date: '2024-12-01', vaccine: 'Polio', targetGroup: 'Children (0-5)', capacity: 300, registrations: 298, coverage: 99, status: 'completed' },
];

// ===== ENVIRONMENTAL DATA =====
export const seedEnvironmentalData: EnvironmentalData[] = [
  { region: 'Mumbai', temperature: 34, humidity: 78, aqi: 142, literacy: 89, avgIncome: 45000, healthSpending: 3200 },
  { region: 'Delhi', temperature: 38, humidity: 45, aqi: 285, disasterAlert: 'Severe Air Quality', literacy: 86, avgIncome: 48000, healthSpending: 3800 },
  { region: 'Pune', temperature: 31, humidity: 62, aqi: 98, literacy: 91, avgIncome: 42000, healthSpending: 2900 },
  { region: 'Jaipur', temperature: 42, humidity: 22, aqi: 120, disasterAlert: 'Heatwave Warning', literacy: 75, avgIncome: 32000, healthSpending: 1800 },
  { region: 'Hyderabad', temperature: 33, humidity: 70, aqi: 105, literacy: 83, avgIncome: 40000, healthSpending: 2600 },
  { region: 'Chandigarh', temperature: 28, humidity: 55, aqi: 75, literacy: 97, avgIncome: 52000, healthSpending: 4200 },
];

// ===== GOVERNMENT SCHEMES =====
export const seedGovernmentSchemes: GovernmentScheme[] = [
  { id: 'scheme-1', name: 'Ayushman Bharat - PMJAY', description: 'Free health coverage up to ₹5 lakh per family per year for secondary and tertiary hospitalization.', eligibility: { maxIncome: 200000, ageRange: { min: 0, max: 100 } }, benefits: ['Free hospitalization up to ₹5 lakh', 'Cashless treatment at empaneled hospitals', 'Pre/post hospitalization coverage', 'No cap on family size'], enrolledCount: 125000, budget: 6400000000, status: 'active' },
  { id: 'scheme-2', name: 'Janani Suraksha Yojana', description: 'Cash assistance to pregnant women for institutional delivery.', eligibility: { maxIncome: 150000, ageRange: { min: 18, max: 45 }, diseases: ['Pregnancy'] }, benefits: ['₹1400 cash assistance (urban)', '₹700 cash assistance (rural)', 'Free delivery services', 'Free transport'], enrolledCount: 45000, budget: 1600000000, status: 'active' },
  { id: 'scheme-3', name: 'National Mental Health Programme', description: 'Free mental health services at district-level hospitals.', eligibility: { maxIncome: 300000, ageRange: { min: 12, max: 100 } }, benefits: ['Free psychiatry consultation', 'Free medications', 'Counseling services', 'Rehabilitation support'], enrolledCount: 18000, budget: 800000000, status: 'active' },
];

// ===== TELEMEDICINE APPOINTMENTS =====
export const seedTelemedicineAppointments: TelemedicineAppointment[] = [
  { id: 'tele-1', patientId: 'pat-1', patientName: 'Arjun Mehta', doctorId: 'doc-1', doctorName: 'Dr. Priya Sharma', scheduledTime: new Date(Date.now() + 86400000).toISOString(), duration: 30, status: 'scheduled', notes: 'Follow-up for diabetes management', prescriptionId: undefined },
  { id: 'tele-2', patientId: 'pat-2', patientName: 'Sneha Iyer', doctorId: 'doc-3', doctorName: 'Dr. Meera Reddy', scheduledTime: new Date(Date.now() + 172800000).toISOString(), duration: 20, status: 'scheduled', notes: 'Asthma quarterly review', prescriptionId: undefined },
  { id: 'tele-3', patientId: 'pat-4', patientName: 'Fatima Khan', doctorId: 'doc-3', doctorName: 'Dr. Meera Reddy', scheduledTime: new Date(Date.now() - 172800000).toISOString(), duration: 15, status: 'completed', notes: 'Anemia follow-up. Iron levels improving. Continue supplementation.', prescriptionId: undefined },
];

// ===== MENTAL HEALTH ASSESSMENTS =====
export const seedMentalHealthAssessments: MentalHealthAssessment[] = [
  { id: 'mha-1', patientId: 'pat-1', date: new Date(Date.now() - 604800000).toISOString(), phq9Score: 8, gad7Score: 5, sentiment: 'neutral', notes: 'Mild depressive symptoms, likely stress-related. Recommended daily walks and mindfulness.' },
  { id: 'mha-2', patientId: 'pat-3', date: new Date(Date.now() - 1209600000).toISOString(), phq9Score: 12, gad7Score: 10, sentiment: 'anxious', counselorAssigned: 'doc-5', notes: 'Moderate depression and anxiety. Multiple chronic illnesses contributing. Referral to psychiatrist.' },
  { id: 'mha-3', patientId: 'pat-2', date: new Date(Date.now() - 2592000000).toISOString(), phq9Score: 3, gad7Score: 2, sentiment: 'happy', notes: 'No significant mental health concerns. Patient coping well.' },
];

// ===== CHAT MESSAGES =====
export const seedChatMessages: ChatMessage[] = [
  { id: 'msg-1', senderId: 'pat-1', senderName: 'Arjun Mehta', senderRole: 'patient', recipientId: 'doc-1', message: 'Good morning Dr. Sharma. My blood sugar was 168 this morning, should I be concerned?', timestamp: new Date(Date.now() - 7200000).toISOString(), read: true, type: 'text' },
  { id: 'msg-2', senderId: 'doc-1', senderName: 'Dr. Priya Sharma', senderRole: 'doctor', recipientId: 'pat-1', message: 'Good morning Arjun. 168 fasting is slightly elevated. Make sure you took Metformin last night. Monitor again tomorrow. If it stays above 160, we should adjust your dosage.', timestamp: new Date(Date.now() - 6000000).toISOString(), read: true, type: 'text' },
  { id: 'msg-3', senderId: 'pat-1', senderName: 'Arjun Mehta', senderRole: 'patient', recipientId: 'doc-1', message: 'Thank you doctor. Yes I took it. I will check again tomorrow. Also, I uploaded my latest lab results.', timestamp: new Date(Date.now() - 5400000).toISOString(), read: false, type: 'text' },
];

// ===== SEED DATA INITIALIZATION =====
export function initializeData(): void {
  const keys = [
    'hb_users', 'hb_patients', 'hb_hospitals', 'hb_doctors',
    'hb_triage_queue', 'hb_wearable_data', 'hb_prescriptions',
    'hb_consultations', 'hb_beds', 'hb_ambulance',
    'hb_insurance_claims', 'hb_health_alerts', 'hb_audit_logs',
    'hb_disease_clusters', 'hb_vaccination_camps', 'hb_environmental_data',
    'hb_government_schemes', 'hb_telemedicine', 'hb_mental_health',
    'hb_chat_messages',
  ];

  // Only seed if not already seeded
  if (localStorage.getItem('hb_initialized') === 'true') return;

  localStorage.setItem('hb_users', JSON.stringify(seedUsers));
  localStorage.setItem('hb_patients', JSON.stringify(seedPatients));
  localStorage.setItem('hb_hospitals', JSON.stringify(seedHospitals));
  localStorage.setItem('hb_doctors', JSON.stringify(seedDoctors));
  localStorage.setItem('hb_triage_queue', JSON.stringify(seedTriageQueue));
  localStorage.setItem('hb_wearable_data', JSON.stringify(seedWearableData));
  localStorage.setItem('hb_prescriptions', JSON.stringify(seedPrescriptions));
  localStorage.setItem('hb_consultations', JSON.stringify(seedConsultations));
  localStorage.setItem('hb_beds', JSON.stringify(seedBeds));
  localStorage.setItem('hb_ambulance', JSON.stringify(seedAmbulanceData));
  localStorage.setItem('hb_insurance_claims', JSON.stringify(seedInsuranceClaims));
  localStorage.setItem('hb_health_alerts', JSON.stringify(seedHealthAlerts));
  localStorage.setItem('hb_audit_logs', JSON.stringify(seedAuditLogs));
  localStorage.setItem('hb_disease_clusters', JSON.stringify(seedDiseaseClusters));
  localStorage.setItem('hb_vaccination_camps', JSON.stringify(seedVaccinationCamps));
  localStorage.setItem('hb_environmental_data', JSON.stringify(seedEnvironmentalData));
  localStorage.setItem('hb_government_schemes', JSON.stringify(seedGovernmentSchemes));
  localStorage.setItem('hb_telemedicine', JSON.stringify(seedTelemedicineAppointments));
  localStorage.setItem('hb_mental_health', JSON.stringify(seedMentalHealthAssessments));
  localStorage.setItem('hb_chat_messages', JSON.stringify(seedChatMessages));

  localStorage.setItem('hb_initialized', 'true');
}

export function resetData(): void {
  const keys = Object.keys(localStorage).filter(k => k.startsWith('hb_'));
  keys.forEach(k => localStorage.removeItem(k));
  initializeData();
}
