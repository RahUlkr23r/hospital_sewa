// ================================
// HealthBridge v2.0 — Type Definitions
// ================================

export type UserRole = 'patient' | 'doctor' | 'government' | 'admin';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  hospitalId?: string;
  avatar?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  mobile: string;
  email: string;
  address: string;
  aadhaar: string;
  fingerprintHash: string;
  familyId: string;
  geneticMarkers: GeneticMarker[];
  diseases: Disease[];
  allergies: string[];
  medications: Medication[];
  surgeries: Surgery[];
  vitalityScore: number;
  emergencyContact: EmergencyContact;
  wearableDevices: WearableDevice[];
  insurancePolicy: InsurancePolicy;
  mentalHealthScore: number;
  fitnessMetrics: FitnessMetrics;
  vaccinationStatus: VaccinationStatus;
  emergencyActionPlan: EmergencyActionPlan;
  labReports: LabReport[];
  prescriptions: string[]; // prescription IDs
  organDonor: boolean;
  healthForecast: HealthForecast;
  achievements: Achievement[];
  dailyQuest: DailyQuest;
  consentStatus: ConsentRecord[];
}

export interface GeneticMarker {
  gene: string;
  variant: string;
  riskLevel: 'low' | 'moderate' | 'high';
  condition: string;
}

export interface Disease {
  name: string;
  diagnosedDate: string;
  status: 'active' | 'resolved' | 'chronic';
  severity: 'mild' | 'moderate' | 'severe';
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  active: boolean;
}

export interface Surgery {
  name: string;
  date: string;
  hospital: string;
  outcome: string;
}

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
  email: string;
}

export interface WearableDevice {
  id: string;
  type: 'fitness_band' | 'bp_monitor' | 'glucose_meter' | 'pulse_oximeter';
  name: string;
  lastSync: string;
  battery: number;
  connected: boolean;
}

export interface InsurancePolicy {
  provider: string;
  policyId: string;
  coverage: number;
  premium: number;
  validUntil: string;
  type: string;
  status: 'active' | 'expired' | 'pending';
}

export interface FitnessMetrics {
  steps: number;
  calories: number;
  sleepHours: number;
  waterIntake: number;
  bmi: number;
  height: number;
  weight: number;
}

export interface VaccinationStatus {
  vaccines: Vaccine[];
  travelEligible: boolean;
}

export interface Vaccine {
  name: string;
  date: string;
  doseNumber: number;
  totalDoses: number;
  batchNumber: string;
  provider: string;
  nextDueDate?: string;
}

export interface EmergencyActionPlan {
  contacts: EmergencyContact[];
  preferredHospital: string;
  instructions: string;
  bloodGroup: string;
  knownConditions: string[];
}

export interface LabReport {
  id: string;
  testName: string;
  date: string;
  values: LabValue[];
  interpretation: string;
  doctorId: string;
  status: 'normal' | 'abnormal' | 'critical';
}

export interface LabValue {
  parameter: string;
  value: number;
  unit: string;
  normalRange: string;
  status: 'normal' | 'low' | 'high' | 'critical';
}

export interface HealthForecast {
  thirtyDay: ForecastItem[];
  ninetyDay: ForecastItem[];
  oneEightyDay: ForecastItem[];
  overallRisk: 'low' | 'moderate' | 'high';
  lastUpdated: string;
}

export interface ForecastItem {
  condition: string;
  probability: number;
  riskFactors: string[];
  recommendation: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
  category: 'health' | 'fitness' | 'medication' | 'checkup';
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  reward: number;
  completed: boolean;
}

export interface ConsentRecord {
  entityId: string;
  entityType: 'hospital' | 'doctor' | 'government';
  consentGiven: boolean;
  date: string;
  scope: string[];
}

// ================================
// Hospital & Doctor Types
// ================================

export interface Hospital {
  id: string;
  name: string;
  city: string;
  state: string;
  beds: number;
  departments: string[];
  accreditation: 'NABH' | 'JCI' | 'ISO' | 'None';
  licenseStatus: 'active' | 'suspended' | 'revoked';
  rating: number;
  contact: string;
  address: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospitalId: string;
  department: string;
  qualification: string;
  experience: number;
  rating: number;
  availability: 'on_duty' | 'off_duty' | 'on_leave';
  patientsToday: number;
  avgConsultationTime: number;
  contact: string;
}

export interface TriagePatient {
  patientId: string;
  name: string;
  age: number;
  gender: string;
  cdiScore: number;
  predictedSeverity: number;
  bloodGroup: string;
  comorbidities: string[];
  chiefComplaint: string;
  arrivalTime: string;
  status: 'waiting' | 'in_progress' | 'discharged' | 'admitted';
  insuranceStatus: boolean;
  vaccineStatus: string;
  bedAssigned?: string;
}

export interface WearableData {
  id: string;
  patientId: string;
  timestamp: string;
  heartRate: number;
  bloodPressure: { systolic: number; diastolic: number };
  glucose: number;
  spo2: number;
  steps: number;
  temperature: number;
  sleepQuality: number;
}

export interface Consultation {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  symptoms: string[];
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  diagnosis: string;
  treatment: string;
  aiSuggestions: AIDiagnosis[];
  investigations: string[];
  telemedicineLink?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
}

export interface AIDiagnosis {
  diagnosis: string;
  probability: number;
  icd10Code: string;
  evidence: string[];
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  drugs: PrescribedDrug[];
  interactions: DrugInteraction[];
  ePharmacyOrder?: EPharmacyOrder;
  status: 'active' | 'completed' | 'cancelled';
  digitalSignature: string;
}

export interface PrescribedDrug {
  name: string;
  genericName: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  brandPrice: number;
  genericPrice: number;
  instructions: string;
}

export interface DrugInteraction {
  drug1: string;
  drug2: string;
  severity: 'safe' | 'monitor' | 'contraindicated';
  warning: string;
  alternative?: string;
}

export interface EPharmacyOrder {
  orderId: string;
  status: 'placed' | 'confirmed' | 'in_transit' | 'delivered';
  deliveryDate: string;
  totalCost: number;
  items: { drug: string; quantity: number; price: number }[];
}

export interface InsuranceClaim {
  id: string;
  patientId: string;
  hospitalId: string;
  claimDate: string;
  amount: number;
  services: { name: string; cost: number; covered: boolean }[];
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  reimbursement: number;
  remarks?: string;
}

export interface BedInfo {
  roomId: string;
  department: string;
  floor: number;
  type: 'general' | 'semi_private' | 'private' | 'icu' | 'er';
  occupancy?: {
    patientId: string;
    patientName: string;
    admitDate: string;
    estimatedLOS: number;
  };
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
}

export interface AmbulanceData {
  id: string;
  patientName: string;
  patientAge: number;
  chiefComplaint: string;
  vitals: {
    heartRate: number;
    bloodPressure: { systolic: number; diastolic: number };
    spo2: number;
    temperature: number;
    glucose: number;
  };
  location: { lat: number; lng: number; label: string };
  eta: number;
  distance: number;
  paramedicNotes: string[];
  drugsAdministered: string[];
  cprRounds: number;
  status: 'en_route' | 'arriving' | 'arrived';
  reservedBed?: string;
}

// ================================
// Government Types
// ================================

export interface HealthAlert {
  id: string;
  type: 'heatwave' | 'flood' | 'outbreak' | 'earthquake' | 'air_quality' | 'general';
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  targetDemographic: {
    ageMin?: number;
    ageMax?: number;
    region?: string;
    diseaseStatus?: string;
  };
  languages: string[];
  timestamp: string;
  expiresAt: string;
  readBy: string[];
  totalRecipients: number;
  isActive: boolean;
}

export interface AuditLog {
  id: string;
  patientId: string;
  patientName: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  timestamp: string;
  blockchainHash: string;
  previousHash: string;
  isTampered: boolean;
  accessReason: string;
  details: string;
  hospitalName?: string;
}

export interface VaccinationCamp {
  id: string;
  location: string;
  address: string;
  date: string;
  vaccine: string;
  targetGroup: string;
  capacity: number;
  registrations: number;
  coverage: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface DiseaseCluster {
  disease: string;
  region: string;
  cases: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  coordinates: { x: number; y: number };
  timelineData: { date: string; cases: number }[];
}

export interface EnvironmentalData {
  region: string;
  temperature: number;
  humidity: number;
  aqi: number;
  disasterAlert?: string;
  literacy: number;
  avgIncome: number;
  healthSpending: number;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  description: string;
  eligibility: {
    maxIncome: number;
    ageRange: { min: number; max: number };
    diseases?: string[];
  };
  benefits: string[];
  enrolledCount: number;
  budget: number;
  status: 'active' | 'inactive';
}

export interface TelemedicineAppointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  scheduledTime: string;
  duration: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  notes: string;
  prescriptionId?: string;
}

export interface MentalHealthAssessment {
  id: string;
  patientId: string;
  date: string;
  phq9Score: number;
  gad7Score: number;
  sentiment: 'happy' | 'neutral' | 'sad' | 'anxious' | 'stressed';
  counselorAssigned?: string;
  notes: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientId: string;
  message: string;
  timestamp: string;
  read: boolean;
  attachments?: string[];
  type: 'text' | 'prescription' | 'lab_result' | 'file';
}

export interface Referral {
  id: string;
  patientId: string;
  fromDoctorId: string;
  toDoctorId: string;
  reason: string;
  notes: string;
  date: string;
  status: 'pending' | 'accepted' | 'completed' | 'declined';
}

// ================================
// Notification & UI Types
// ================================

export type NotificationPriority = 'critical' | 'warning' | 'info' | 'success';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  priority: NotificationPriority;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  icon?: string;
}

export interface EmergencyState {
  isActive: boolean;
  type?: 'cardiac' | 'allergy' | 'tamper' | 'sos' | 'deterioration';
  message?: string;
  patientId?: string;
  patientName?: string;
  timestamp?: string;
}

export type ThemeMode = 'light' | 'dark';

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
  children?: SidebarItem[];
}
