export type PlanCategory = 
  | 'all'
  | 'medicare-advantage'
  | 'medicare-supplement'
  | 'prescription-drug'
  | 'special-needs';

export type NetworkType = 'HMO' | 'PPO' | 'PFFS' | 'HMO-POS' | 'Medigap' | 'PDP';

export interface BenefitItem {
  name: string;
  covered: boolean;
  cost: string;
  description?: string;
  icon?: string;
}

export interface CopaySummary {
  primaryCareDoctor: string;
  specialist: string;
  emergencyRoom: string;
  urgentCare: string;
  inpatientHospital: string;
  ambulance: string;
  outpatientSurgery: string;
  preventiveCare: string;
}

export interface RxTierCopay {
  tier: number;
  tierName: string;
  standardRetail30Day: string;
  preferredRetail30Day: string;
  mailOrder90Day: string;
}

export interface MedicarePlan {
  id: string;
  name: string;
  carrier: string;
  carrierLogo: string;
  carrierColor: string;
  category: PlanCategory;
  planType: NetworkType;
  subType?: string; // e.g. D-SNP, C-SNP, Plan G, Plan N
  zipCodes: string[];
  state: string;
  monthlyPremium: number;
  medicalDeductible: number;
  drugDeductible: number;
  maxOutOfPocket: number;
  starRating: number;
  ratingCount: number;
  prescriptionDrugCoverage: boolean;
  extraHelpAvailable: boolean;
  summaryHighlights: string[];
  benefits: {
    dental: BenefitItem;
    vision: BenefitItem;
    hearing: BenefitItem;
    fitness: BenefitItem;
    overTheCounterAllowance: BenefitItem;
    transportation: BenefitItem;
    meals: BenefitItem;
    telehealth: BenefitItem;
  };
  copays: CopaySummary;
  rxTiers?: RxTierCopay[];
  formularyDrugCount?: number;
  networkSize?: {
    doctors: number;
    hospitals: number;
    pharmacies: number;
  };
  contractId: string;
  cmsPlanId: string;
  effectiveYear: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  hospitalAffiliation: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  acceptingNewPatients: boolean;
  inNetworkCarriers: string[]; // e.g. ['Humana', 'Aetna', 'UnitedHealthcare']
  imageUrl?: string;
  gender: 'Male' | 'Female';
  languages: string[];
}

export interface Pharmacy {
  id: string;
  name: string;
  chain: string;
  type: 'Retail' | 'Mail Order' | 'Specialty' | '24-Hour';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  distanceMiles: number;
  preferredInCarriers: string[]; // e.g. ['Blue Cross Blue Shield', 'Aetna']
  driveThru: boolean;
  is24Hours: boolean;
}

export interface Prescription {
  id: string;
  name: string;
  genericFor?: string;
  dosage: string;
  frequency: string;
  form: string; // e.g. Tablet, Capsule, Solution
  tier: number; // Tier 1 (Generic) to Tier 5 (Specialty)
  avgRetailPrice30Day: number;
  avgPreferredPrice30Day: number;
  avgMailOrderPrice90Day: number;
  requiresPriorAuth: boolean;
  quantityLimit: string;
  stepTherapyRequired: boolean;
}

export interface UserPrescriptionItem {
  prescriptionId: string;
  name: string;
  dosage: string;
  frequency: string;
  quantityPerMonth: number;
  preferredPharmacyId?: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photoUrl?: string;
  zipCode: string;
  county: string;
  state: string;
  birthDate: string;
  medicareNumber?: string;
  medicarePartAStartDate?: string;
  medicarePartBStartDate?: string;
  hasMedicaid: boolean;
  hasExtraHelp: boolean;
  coveragePreference: 'all' | 'medical-only' | 'rx-only' | 'medical-and-rx';
  selectedEffectiveDate: string;
}

export interface QuoteRequest {
  id: string;
  createdAt: string;
  planId: string;
  planName: string;
  carrier: string;
  monthlyPremium: number;
  zipCode: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  preferredContactTime: string;
  notes: string;
  status: 'Pending' | 'Agent Assigned' | 'Contacted' | 'Completed';
}

export interface AgentCallbackRequest {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  zipCode: string;
  preferredTime: string;
  topic: string;
  message: string;
  status: 'Received' | 'Scheduled' | 'Completed';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'enrollment' | 'prescription' | 'plan_update' | 'agent' | 'prior_auth';
  timestamp: string;
  read: boolean;
  actionScreen?: ScreenType;
  actionLabel?: string;
}

export interface FilterState {
  carrier: string;
  networkType: string;
  maxPremium: number;
  maxDeductible: number;
  minStarRating: number;
  prescriptionCoverageOnly: boolean;
  hasDental: boolean;
  hasVision: boolean;
  hasHearing: boolean;
  sortBy: 'recommended' | 'premium-asc' | 'premium-desc' | 'deductible-asc' | 'star-desc' | 'moop-asc';
  searchQuery: string;
}

export type ScreenType =
  | 'home'
  | 'products'
  | 'plan-search'
  | 'plan-details'
  | 'plan-comparison'
  | 'my-doctors'
  | 'my-pharmacies'
  | 'my-prescriptions'
  | 'personalized-quote'
  | 'saved-plans'
  | 'notifications'
  | 'contact-agent'
  | 'user-profile'
  | 'login'
  | 'registration'
  | 'forgot-password'
  | 'learning-center'
  | 'medicare-disclaimers'
  | 'settings'
  | 'help-support';

