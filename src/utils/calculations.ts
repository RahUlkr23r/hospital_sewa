// ================================
// HealthBridge v2.0 — Calculation Utilities
// ================================

import type { Patient, TriagePatient, AIDiagnosis, DrugInteraction, ForecastItem } from './types';

// Clinical Deterioration Index (CDI)
export function calculateCDI(patient: {
  age: number;
  diseases: { severity: string }[];
  heartRate?: number;
  bloodPressure?: { systolic: number; diastolic: number };
  spo2?: number;
  temperature?: number;
}): number {
  let score = 0;
  
  // Age factor
  if (patient.age > 70) score += 25;
  else if (patient.age > 60) score += 15;
  else if (patient.age > 50) score += 10;
  else if (patient.age > 40) score += 5;

  // Disease severity
  patient.diseases.forEach(d => {
    if (d.severity === 'severe') score += 20;
    else if (d.severity === 'moderate') score += 10;
    else score += 3;
  });

  // Vitals
  if (patient.heartRate) {
    if (patient.heartRate > 120 || patient.heartRate < 50) score += 20;
    else if (patient.heartRate > 100 || patient.heartRate < 60) score += 10;
  }

  if (patient.bloodPressure) {
    if (patient.bloodPressure.systolic > 180 || patient.bloodPressure.systolic < 90) score += 20;
    else if (patient.bloodPressure.systolic > 140 || patient.bloodPressure.systolic < 100) score += 10;
  }

  if (patient.spo2 !== undefined) {
    if (patient.spo2 < 90) score += 25;
    else if (patient.spo2 < 95) score += 10;
  }

  if (patient.temperature) {
    if (patient.temperature > 39.5 || patient.temperature < 35) score += 15;
    else if (patient.temperature > 38 || patient.temperature < 36) score += 5;
  }

  return Math.min(100, Math.max(0, score));
}

export function getCDILevel(score: number): 'critical' | 'warning' | 'stable' {
  if (score >= 60) return 'critical';
  if (score >= 30) return 'warning';
  return 'stable';
}

export function getCDIColor(score: number): string {
  if (score >= 60) return '#ef4444';
  if (score >= 30) return '#f59e0b';
  return '#10b981';
}

// BMI Calculator
export function calculateBMI(heightCm: number, weightKg: number): number {
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
}

export function getBMICategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: 'Underweight', color: '#3b82f6' };
  if (bmi < 25) return { label: 'Normal', color: '#10b981' };
  if (bmi < 30) return { label: 'Overweight', color: '#f59e0b' };
  return { label: 'Obese', color: '#ef4444' };
}

// Vitality Score
export function calculateVitalityScore(patient: Patient): number {
  let score = 50; // Base

  // Medication adherence (active meds)
  const activeMeds = patient.medications.filter(m => m.active).length;
  if (activeMeds > 0) score += 5;

  // Fitness
  if (patient.fitnessMetrics.steps > 8000) score += 10;
  else if (patient.fitnessMetrics.steps > 5000) score += 5;

  if (patient.fitnessMetrics.sleepHours >= 7 && patient.fitnessMetrics.sleepHours <= 9) score += 8;
  
  // BMI
  const bmi = patient.fitnessMetrics.bmi;
  if (bmi >= 18.5 && bmi < 25) score += 10;
  else if (bmi >= 25 && bmi < 30) score += 3;

  // No chronic diseases = bonus
  const chronicDiseases = patient.diseases.filter(d => d.status === 'chronic').length;
  if (chronicDiseases === 0) score += 10;
  else score -= chronicDiseases * 5;

  // Vaccinations up to date
  if (patient.vaccinationStatus.travelEligible) score += 5;

  // Mental health
  if (patient.mentalHealthScore < 5) score += 7; // Low PHQ-9 = good

  // Achievements
  score += Math.min(5, patient.achievements.length);

  return Math.min(100, Math.max(0, score));
}

// PHQ-9 Depression Scoring
export function getPHQ9Category(score: number): { label: string; color: string; severity: string } {
  if (score <= 4) return { label: 'Minimal', color: '#10b981', severity: 'none' };
  if (score <= 9) return { label: 'Mild', color: '#84cc16', severity: 'mild' };
  if (score <= 14) return { label: 'Moderate', color: '#f59e0b', severity: 'moderate' };
  if (score <= 19) return { label: 'Moderately Severe', color: '#f97316', severity: 'moderately_severe' };
  return { label: 'Severe', color: '#ef4444', severity: 'severe' };
}

// GAD-7 Anxiety Scoring
export function getGAD7Category(score: number): { label: string; color: string } {
  if (score <= 4) return { label: 'Minimal', color: '#10b981' };
  if (score <= 9) return { label: 'Mild', color: '#84cc16' };
  if (score <= 14) return { label: 'Moderate', color: '#f59e0b' };
  return { label: 'Severe', color: '#ef4444' };
}

// AI Diagnosis Simulator
const diagnosisMap: Record<string, AIDiagnosis[]> = {
  'fever,cough,fatigue': [
    { diagnosis: 'Upper Respiratory Tract Infection', probability: 89, icd10Code: 'J06.9', evidence: ['Fever', 'Cough', 'Fatigue'] },
    { diagnosis: 'Influenza', probability: 76, icd10Code: 'J11.1', evidence: ['Fever', 'Fatigue'] },
    { diagnosis: 'COVID-19', probability: 65, icd10Code: 'U07.1', evidence: ['Fever', 'Cough', 'Fatigue'] },
    { diagnosis: 'Pneumonia', probability: 42, icd10Code: 'J18.9', evidence: ['Fever', 'Cough'] },
    { diagnosis: 'Bronchitis', probability: 38, icd10Code: 'J20.9', evidence: ['Cough'] },
  ],
  'chest_pain,shortness_of_breath': [
    { diagnosis: 'Acute Coronary Syndrome', probability: 82, icd10Code: 'I24.9', evidence: ['Chest pain', 'Shortness of breath'] },
    { diagnosis: 'Pulmonary Embolism', probability: 64, icd10Code: 'I26.9', evidence: ['Chest pain', 'Dyspnea'] },
    { diagnosis: 'Costochondritis', probability: 48, icd10Code: 'M94.0', evidence: ['Chest pain'] },
    { diagnosis: 'GERD', probability: 35, icd10Code: 'K21.0', evidence: ['Chest pain'] },
    { diagnosis: 'Anxiety/Panic Attack', probability: 28, icd10Code: 'F41.0', evidence: ['Shortness of breath'] },
  ],
  'headache,nausea,dizziness': [
    { diagnosis: 'Migraine', probability: 85, icd10Code: 'G43.9', evidence: ['Headache', 'Nausea'] },
    { diagnosis: 'Benign Positional Vertigo', probability: 62, icd10Code: 'H81.1', evidence: ['Dizziness'] },
    { diagnosis: 'Tension Headache', probability: 55, icd10Code: 'G44.2', evidence: ['Headache'] },
    { diagnosis: 'Hypertensive Crisis', probability: 40, icd10Code: 'I16.0', evidence: ['Headache', 'Dizziness'] },
    { diagnosis: 'Meningitis', probability: 18, icd10Code: 'G03.9', evidence: ['Headache', 'Nausea'] },
  ],
  'default': [
    { diagnosis: 'Viral Syndrome', probability: 72, icd10Code: 'B34.9', evidence: ['General symptoms'] },
    { diagnosis: 'Dehydration', probability: 55, icd10Code: 'E86.0', evidence: ['General symptoms'] },
    { diagnosis: 'Stress-Related Disorder', probability: 45, icd10Code: 'F43.9', evidence: ['General symptoms'] },
    { diagnosis: 'Nutritional Deficiency', probability: 32, icd10Code: 'E63.9', evidence: ['General symptoms'] },
    { diagnosis: 'Anemia', probability: 28, icd10Code: 'D64.9', evidence: ['General symptoms'] },
  ],
};

export function getAIDiagnoses(symptoms: string[]): AIDiagnosis[] {
  const key = symptoms.sort().join(',').toLowerCase().replace(/\s/g, '_');
  return diagnosisMap[key] || diagnosisMap['default'];
}

// Drug Interaction Checker
const interactionRules: DrugInteraction[] = [
  { drug1: 'Aspirin', drug2: 'Warfarin', severity: 'contraindicated', warning: 'High risk of bleeding. Use alternative antiplatelet.', alternative: 'Clopidogrel' },
  { drug1: 'Amoxicillin', drug2: 'Methotrexate', severity: 'contraindicated', warning: 'Increased methotrexate toxicity.', alternative: 'Azithromycin' },
  { drug1: 'Metformin', drug2: 'Contrast Dye', severity: 'monitor', warning: 'Risk of lactic acidosis. Withhold metformin 48h before/after contrast.' },
  { drug1: 'Lisinopril', drug2: 'Potassium', severity: 'monitor', warning: 'Risk of hyperkalemia. Monitor potassium levels.' },
  { drug1: 'Simvastatin', drug2: 'Erythromycin', severity: 'contraindicated', warning: 'Risk of rhabdomyolysis.', alternative: 'Rosuvastatin' },
  { drug1: 'Omeprazole', drug2: 'Clopidogrel', severity: 'monitor', warning: 'Reduced clopidogrel efficacy. Consider Pantoprazole.' },
  { drug1: 'Fluoxetine', drug2: 'Tramadol', severity: 'contraindicated', warning: 'Risk of serotonin syndrome.', alternative: 'Ibuprofen' },
  { drug1: 'Ciprofloxacin', drug2: 'Antacids', severity: 'monitor', warning: 'Reduced absorption. Space 2 hours apart.' },
];

export function checkDrugInteractions(newDrug: string, currentMeds: string[]): DrugInteraction[] {
  const interactions: DrugInteraction[] = [];
  const drugLower = newDrug.toLowerCase();
  
  for (const med of currentMeds) {
    const medLower = med.toLowerCase();
    for (const rule of interactionRules) {
      if (
        (rule.drug1.toLowerCase() === drugLower && rule.drug2.toLowerCase() === medLower) ||
        (rule.drug2.toLowerCase() === drugLower && rule.drug1.toLowerCase() === medLower)
      ) {
        interactions.push(rule);
      }
    }
  }
  return interactions;
}

export function checkAllergyConflict(drug: string, allergies: string[]): boolean {
  const allergyMap: Record<string, string[]> = {
    'penicillin': ['amoxicillin', 'ampicillin', 'penicillin', 'augmentin'],
    'sulfa': ['sulfamethoxazole', 'sulfasalazine', 'dapsone'],
    'nsaid': ['ibuprofen', 'naproxen', 'aspirin', 'diclofenac'],
    'aspirin': ['aspirin'],
  };

  const drugLower = drug.toLowerCase();
  for (const allergy of allergies) {
    const allergyLower = allergy.toLowerCase();
    const relatedDrugs = allergyMap[allergyLower] || [allergyLower];
    if (relatedDrugs.includes(drugLower)) return true;
  }
  return false;
}

// Health Forecast Generator
export function generateHealthForecast(patient: Patient): {
  thirtyDay: ForecastItem[];
  ninetyDay: ForecastItem[];
  oneEightyDay: ForecastItem[];
  overallRisk: 'low' | 'moderate' | 'high';
} {
  const forecasts = {
    thirtyDay: [] as ForecastItem[],
    ninetyDay: [] as ForecastItem[],
    oneEightyDay: [] as ForecastItem[],
    overallRisk: 'low' as 'low' | 'moderate' | 'high',
  };

  const hasHypertension = patient.diseases.some(d => d.name.toLowerCase().includes('hypertension'));
  const hasDiabetes = patient.diseases.some(d => d.name.toLowerCase().includes('diabetes'));
  const isSedentary = patient.fitnessMetrics.steps < 3000;
  const isOverweight = patient.fitnessMetrics.bmi >= 25;

  if (hasHypertension) {
    forecasts.thirtyDay.push({
      condition: 'Hypertensive Crisis',
      probability: isSedentary ? 25 : 8,
      riskFactors: ['Existing hypertension', isSedentary ? 'Sedentary lifestyle' : ''].filter(Boolean),
      recommendation: 'Maintain medication adherence and monitor BP daily',
    });
    forecasts.ninetyDay.push({
      condition: 'Cardiovascular Event',
      probability: isOverweight ? 18 : 6,
      riskFactors: ['Hypertension', isOverweight ? 'Elevated BMI' : ''].filter(Boolean),
      recommendation: 'Schedule cardiac stress test',
    });
  }

  if (hasDiabetes) {
    forecasts.thirtyDay.push({
      condition: 'Hypoglycemic Episode',
      probability: 15,
      riskFactors: ['Diabetes', 'Medication interactions'],
      recommendation: 'Monitor blood glucose before meals',
    });
    forecasts.ninetyDay.push({
      condition: 'Diabetic Neuropathy Progression',
      probability: 22,
      riskFactors: ['Diabetes', 'Duration of disease'],
      recommendation: 'Regular foot examinations',
    });
  }

  if (isSedentary) {
    forecasts.oneEightyDay.push({
      condition: 'Hospitalization Risk',
      probability: 35,
      riskFactors: ['Sedentary lifestyle', 'Low physical activity'],
      recommendation: 'Start with 30-minute daily walks',
    });
  }

  if (isOverweight) {
    forecasts.oneEightyDay.push({
      condition: 'Metabolic Syndrome',
      probability: 28,
      riskFactors: ['Elevated BMI', 'Potential insulin resistance'],
      recommendation: 'Consult nutritionist, reduce caloric intake',
    });
  }

  // Default mild forecasts
  if (forecasts.thirtyDay.length === 0) {
    forecasts.thirtyDay.push({
      condition: 'Seasonal Illness',
      probability: 12,
      riskFactors: ['Environmental factors'],
      recommendation: 'Maintain hygiene, stay hydrated',
    });
  }

  // Calculate overall risk
  const maxProb = Math.max(
    ...forecasts.thirtyDay.map(f => f.probability),
    ...forecasts.ninetyDay.map(f => f.probability),
    ...forecasts.oneEightyDay.map(f => f.probability),
    0
  );

  if (maxProb >= 30) forecasts.overallRisk = 'high';
  else if (maxProb >= 15) forecasts.overallRisk = 'moderate';

  return forecasts;
}

// Dosage Calculator
export function calculateDosage(
  drugName: string,
  ageYears: number,
  weightKg: number,
  kidneyFunction?: 'normal' | 'mild' | 'moderate' | 'severe'
): { dosage: string; frequency: string; adjustment: string } {
  let baseMultiplier = 1;
  
  // Age adjustment
  if (ageYears > 65) baseMultiplier *= 0.75;
  if (ageYears < 12) baseMultiplier *= 0.5;

  // Kidney function adjustment
  if (kidneyFunction === 'mild') baseMultiplier *= 0.75;
  if (kidneyFunction === 'moderate') baseMultiplier *= 0.5;
  if (kidneyFunction === 'severe') baseMultiplier *= 0.25;

  const adjustmentNote = baseMultiplier < 1
    ? `Dose reduced to ${Math.round(baseMultiplier * 100)}% due to ${ageYears > 65 ? 'age' : ''}${kidneyFunction && kidneyFunction !== 'normal' ? ' renal impairment' : ''}`
    : 'Standard dosing';

  return {
    dosage: `${Math.round(500 * baseMultiplier)}mg`,
    frequency: kidneyFunction === 'severe' ? 'Once daily' : 'Twice daily',
    adjustment: adjustmentNote,
  };
}

// Lab Value Interpretation
export function interpretLabValue(parameter: string, value: number): {
  status: 'normal' | 'low' | 'high' | 'critical';
  interpretation: string;
} {
  const ranges: Record<string, { low: number; high: number; critLow: number; critHigh: number; unit: string }> = {
    'hemoglobin': { low: 12, high: 17.5, critLow: 7, critHigh: 20, unit: 'g/dL' },
    'hba1c': { low: 4, high: 5.6, critLow: 3, critHigh: 10, unit: '%' },
    'fasting_glucose': { low: 70, high: 100, critLow: 40, critHigh: 400, unit: 'mg/dL' },
    'cholesterol_total': { low: 125, high: 200, critLow: 100, critHigh: 300, unit: 'mg/dL' },
    'creatinine': { low: 0.7, high: 1.3, critLow: 0.4, critHigh: 4, unit: 'mg/dL' },
    'wbc': { low: 4000, high: 11000, critLow: 2000, critHigh: 30000, unit: '/µL' },
    'platelets': { low: 150000, high: 400000, critLow: 50000, critHigh: 1000000, unit: '/µL' },
    'tsh': { low: 0.4, high: 4.0, critLow: 0.1, critHigh: 10, unit: 'mIU/L' },
  };

  const range = ranges[parameter.toLowerCase().replace(/\s/g, '_')];
  if (!range) return { status: 'normal', interpretation: 'Within expected parameters' };

  if (value < range.critLow || value > range.critHigh) {
    return { status: 'critical', interpretation: `Critical value (${value} ${range.unit}). Immediate medical attention required.` };
  }
  if (value < range.low) {
    return { status: 'low', interpretation: `Below normal range (${range.low}-${range.high} ${range.unit}). Consult physician.` };
  }
  if (value > range.high) {
    return { status: 'high', interpretation: `Above normal range (${range.low}-${range.high} ${range.unit}). Follow up recommended.` };
  }
  return { status: 'normal', interpretation: `Normal (${range.low}-${range.high} ${range.unit}).` };
}
