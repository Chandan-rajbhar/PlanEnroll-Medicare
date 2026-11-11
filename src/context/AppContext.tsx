import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MedicarePlan,
  PlanCategory,
  ScreenType,
  FilterState,
  UserProfile,
  UserPrescriptionItem,
  AppNotification,
  QuoteRequest,
  AgentCallbackRequest
} from '../types';
import { MEDICARE_PLANS } from '../data/medicarePlansData';
import { PRESCRIPTIONS_DATA } from '../data/prescriptionsData';

interface AppContextType {
  // Navigation
  currentScreen: ScreenType;
  navigateTo: (screen: ScreenType) => void;

  // Plan discovery & Location
  selectedCategory: PlanCategory;
  setSelectedCategory: (category: PlanCategory) => void;
  zipCode: string;
  setZipCode: (zip: string) => void;
  countyState: string;
  isZipModalOpen: boolean;
  setIsZipModalOpen: (open: boolean) => void;
  effectiveDate: string;
  setEffectiveDate: (date: string) => void;
  coveragePreference: 'all' | 'medical-only' | 'rx-only' | 'medical-and-rx';
  setCoveragePreference: (pref: 'all' | 'medical-only' | 'rx-only' | 'medical-and-rx') => void;

  // Plans & Comparison
  plans: MedicarePlan[];
  filteredPlans: MedicarePlan[];
  savedPlanIds: string[];
  toggleSavePlan: (planId: string) => void;
  comparePlanIds: string[];
  toggleComparePlan: (planId: string) => void;
  clearComparison: () => void;
  selectedPlanForDetails: MedicarePlan | null;
  openPlanDetails: (plan: MedicarePlan) => void;
  closePlanDetails: () => void;

  // User healthcare assets
  userDoctorIds: string[];
  addDoctor: (doctorId: string) => void;
  removeDoctor: (doctorId: string) => void;
  userPharmacyIds: string[];
  addPharmacy: (pharmacyId: string) => void;
  removePharmacy: (pharmacyId: string) => void;
  userPrescriptions: UserPrescriptionItem[];
  addPrescription: (item: UserPrescriptionItem) => void;
  removePrescription: (prescriptionId: string) => void;

  // Filters & Sorting
  filters: FilterState;
  updateFilters: (updates: Partial<FilterState>) => void;
  resetFilters: () => void;

  // Auth & Profile
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string) => boolean;
  logout: () => void;
  registerUser: (profile: Partial<UserProfile>) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Notifications
  notifications: AppNotification[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Agent & Support
  isAgentChatOpen: boolean;
  toggleAgentChat: (open?: boolean) => void;
  quoteRequests: QuoteRequest[];
  submitQuoteRequest: (req: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>) => void;
  callbackRequests: AgentCallbackRequest[];
  submitCallbackRequest: (req: Omit<AgentCallbackRequest, 'id' | 'createdAt' | 'status'>) => void;

  // Device frame toggle (for mobile preview vs full-width)
  isDeviceFrameView: boolean;
  toggleDeviceFrameView: () => void;

  // Computed helper
  calculatePlanAnnualCost: (plan: MedicarePlan) => number;
}

const defaultFilters: FilterState = {
  carrier: 'all',
  networkType: 'all',
  maxPremium: 200,
  maxDeductible: 1000,
  minStarRating: 0,
  prescriptionCoverageOnly: false,
  hasDental: false,
  hasVision: false,
  hasHearing: false,
  sortBy: 'recommended',
  searchQuery: ''
};

const defaultUserProfile: UserProfile = {
  id: 'usr-101',
  firstName: 'Eleanor',
  lastName: 'Vance',
  email: 'eleanor.vance@gmail.com',
  phone: '(971) 752-9054',
  zipCode: '75080',
  county: 'Collin County',
  state: 'TX',
  birthDate: '1959-04-18',
  medicareNumber: '1EG4-TE5-MK72',
  medicarePartAStartDate: '2024-05-01',
  medicarePartBStartDate: '2024-05-01',
  hasMedicaid: false,
  hasExtraHelp: false,
  coveragePreference: 'medical-and-rx',
  selectedEffectiveDate: '2026-01-01'
};

const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Ready for Refill: Lantus 15ml',
    message: 'Your Lantus 100u/mL insulin is ready for pickup at CVS Pharmacy (605 W Campbell Rd). 3 refills remaining with Dr. Lubin.',
    type: 'prescription',
    timestamp: '10m ago',
    read: false,
    actionScreen: 'my-prescriptions',
    actionLabel: 'View Medication'
  },
  {
    id: 'notif-2',
    title: 'Annual Enrollment Period (AEP) Reminder',
    message: 'Medicare Annual Enrollment is active. Check for 2026 formulary updates and compare available plans in 75080.',
    type: 'enrollment',
    timestamp: '2h ago',
    read: false,
    actionScreen: 'plan-search',
    actionLabel: 'Compare Plans'
  },
  {
    id: 'notif-3',
    title: 'Agent Callback Scheduled',
    message: 'Licensed Agent Sarah Miller is confirmed to call you tomorrow at 10:30 AM CST regarding Molina Complete Care.',
    type: 'agent',
    timestamp: '1d ago',
    read: true,
    actionScreen: 'contact-agent',
    actionLabel: 'View Schedule'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [selectedCategory, setSelectedCategory] = useState<PlanCategory>('all');
  const [zipCode, setZipCodeState] = useState<string>('75080');
  const [countyState, setCountyState] = useState<string>('Collin County, TX');
  const [isZipModalOpen, setIsZipModalOpen] = useState<boolean>(false);
  const [effectiveDate, setEffectiveDate] = useState<string>('2026-01-01');
  const [coveragePreference, setCoveragePreference] = useState<'all' | 'medical-only' | 'rx-only' | 'medical-and-rx'>('medical-and-rx');

  const [savedPlanIds, setSavedPlanIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('medicare_saved_plans');
      return saved ? JSON.parse(saved) : ['molina-complete-care-hmo'];
    } catch {
      return ['molina-complete-care-hmo'];
    }
  });

  const [comparePlanIds, setComparePlanIds] = useState<string[]>(['molina-complete-care-hmo', 'bcbs-medicare-advantage-value-hmo']);
  const [selectedPlanForDetails, setSelectedPlanForDetails] = useState<MedicarePlan | null>(null);

  // User healthcare assets (Pre-seeded with screenshot items)
  const [userDoctorIds, setUserDoctorIds] = useState<string[]>(['doc-1', 'doc-2']);
  const [userPharmacyIds, setUserPharmacyIds] = useState<string[]>(['pharm-1', 'pharm-6']);
  const [userPrescriptions, setUserPrescriptions] = useState<UserPrescriptionItem[]>([
    {
      prescriptionId: 'rx-lantus',
      name: 'Lantus 100 units/mL (15mL vial)',
      dosage: '100 units/mL (15 mL)',
      frequency: 'Once daily at bedtime',
      quantityPerMonth: 1,
      preferredPharmacyId: 'pharm-1'
    },
    {
      prescriptionId: 'rx-enalapril',
      name: 'Enalapril Maleate 2.5mg',
      dosage: '2.5 mg',
      frequency: 'Once daily',
      quantityPerMonth: 30,
      preferredPharmacyId: 'pharm-1'
    }
  ]);

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(defaultUserProfile);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [isAgentChatOpen, setIsAgentChatOpen] = useState<boolean>(false);
  const [isDeviceFrameView, setIsDeviceFrameView] = useState<boolean>(true);

  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [callbackRequests, setCallbackRequests] = useState<AgentCallbackRequest[]>([]);

  // Persist saved plans
  useEffect(() => {
    try {
      localStorage.setItem('medicare_saved_plans', JSON.stringify(savedPlanIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedPlanIds]);

  const navigateTo = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setZipCode = (newZip: string) => {
    setZipCodeState(newZip);
    if (newZip.startsWith('75')) {
      setCountyState('Collin / Dallas County, TX');
    } else if (newZip.startsWith('90')) {
      setCountyState('Los Angeles County, CA');
    } else if (newZip.startsWith('33')) {
      setCountyState('Miami-Dade County, FL');
    } else if (newZip.startsWith('10')) {
      setCountyState('New York County, NY');
    } else if (newZip.startsWith('60')) {
      setCountyState('Cook County, IL');
    } else {
      setCountyState('United States Service Area');
    }
  };

  const toggleSavePlan = (planId: string) => {
    setSavedPlanIds(prev => 
      prev.includes(planId) ? prev.filter(id => id !== planId) : [...prev, planId]
    );
  };

  const toggleComparePlan = (planId: string) => {
    setComparePlanIds(prev => {
      if (prev.includes(planId)) {
        return prev.filter(id => id !== planId);
      }
      if (prev.length >= 4) {
        alert('You can compare a maximum of 4 plans at once.');
        return prev;
      }
      return [...prev, planId];
    });
  };

  const clearComparison = () => {
    setComparePlanIds([]);
  };

  const openPlanDetails = (plan: MedicarePlan) => {
    setSelectedPlanForDetails(plan);
    navigateTo('plan-details');
  };

  const closePlanDetails = () => {
    setSelectedPlanForDetails(null);
  };

  const addDoctor = (doctorId: string) => {
    if (!userDoctorIds.includes(doctorId)) {
      setUserDoctorIds(prev => [...prev, doctorId]);
    }
  };

  const removeDoctor = (doctorId: string) => {
    setUserDoctorIds(prev => prev.filter(id => id !== doctorId));
  };

  const addPharmacy = (pharmacyId: string) => {
    if (!userPharmacyIds.includes(pharmacyId)) {
      setUserPharmacyIds(prev => [...prev, pharmacyId]);
    }
  };

  const removePharmacy = (pharmacyId: string) => {
    setUserPharmacyIds(prev => prev.filter(id => id !== pharmacyId));
  };

  const addPrescription = (item: UserPrescriptionItem) => {
    setUserPrescriptions(prev => {
      const existing = prev.findIndex(p => p.prescriptionId === item.prescriptionId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = item;
        return updated;
      }
      return [...prev, item];
    });
  };

  const removePrescription = (prescriptionId: string) => {
    setUserPrescriptions(prev => prev.filter(p => p.prescriptionId !== prescriptionId));
  };

  const updateFilters = (updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const login = (email: string) => {
    setIsAuthenticated(true);
    setUserProfile({
      ...defaultUserProfile,
      email: email || defaultUserProfile.email
    });
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const registerUser = (profile: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      ...defaultUserProfile,
      ...profile,
      id: `usr-${Date.now()}`
    };
    setUserProfile(newUser);
    setIsAuthenticated(true);
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile(prev => prev ? { ...prev, ...profile } : null);
  };

  const submitQuoteRequest = (req: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: QuoteRequest = {
      ...req,
      id: `quote-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Pending'
    };
    setQuoteRequests(prev => [newReq, ...prev]);
    // Also generate a notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Quote Request Received',
        message: `Your personalized quote for ${req.planName} has been submitted. A licensed specialist will contact you shortly.`,
        type: 'agent',
        timestamp: 'Just now',
        read: false,
        actionScreen: 'saved-plans',
        actionLabel: 'View Quotes'
      },
      ...prev
    ]);
  };

  const submitCallbackRequest = (req: Omit<AgentCallbackRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: AgentCallbackRequest = {
      ...req,
      id: `call-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Received'
    };
    setCallbackRequests(prev => [newReq, ...prev]);
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Agent Callback Scheduled',
        message: `Licensed agent requested for ${req.preferredTime}. We will call ${req.phone}.`,
        type: 'agent',
        timestamp: 'Just now',
        read: false,
        actionScreen: 'contact-agent',
        actionLabel: 'View Details'
      },
      ...prev
    ]);
  };

  const toggleAgentChat = (open?: boolean) => {
    setIsAgentChatOpen(prev => (open !== undefined ? open : !prev));
  };

  const toggleDeviceFrameView = () => {
    setIsDeviceFrameView(prev => !prev);
  };

  // Helper calculation for personalized annual cost
  const calculatePlanAnnualCost = (plan: MedicarePlan): number => {
    const annualPremium = plan.monthlyPremium * 12;
    // Estimate prescription annual cost
    let rxAnnualCost = 0;
    if (plan.prescriptionDrugCoverage) {
      userPrescriptions.forEach(userRx => {
        const drug = PRESCRIPTIONS_DATA.find(d => d.id === userRx.prescriptionId);
        if (drug) {
          // If user has preferred pharmacy, use preferred price
          const monthlyDrugCost = drug.avgPreferredPrice30Day;
          rxAnnualCost += monthlyDrugCost * 12;
        }
      });
      // Add drug deductible if applicable
      if (rxAnnualCost > 0 && plan.drugDeductible > 0) {
        rxAnnualCost = Math.min(rxAnnualCost + plan.drugDeductible, plan.maxOutOfPocket);
      }
    } else {
      // If plan has no drug coverage, out of pocket full retail
      userPrescriptions.forEach(userRx => {
        const drug = PRESCRIPTIONS_DATA.find(d => d.id === userRx.prescriptionId);
        if (drug) {
          rxAnnualCost += drug.avgRetailPrice30Day * 12;
        }
      });
    }

    // Estimate doctor visits (e.g. 4 primary visits + 2 specialist visits per year)
    const pcpCopayNum = parseInt(plan.copays.primaryCareDoctor.replace(/[^0-9]/g, '')) || 0;
    const specialistCopayNum = parseInt(plan.copays.specialist.replace(/[^0-9]/g, '')) || 25;
    const estDoctorCopays = (pcpCopayNum * 4) + (specialistCopayNum * 2);

    return Math.round(annualPremium + rxAnnualCost + estDoctorCopays);
  };

  // Filter plans dynamically
  const filteredPlans = MEDICARE_PLANS.filter(plan => {
    // Category filter
    if (selectedCategory !== 'all' && plan.category !== selectedCategory) {
      return false;
    }
    // Carrier filter
    if (filters.carrier !== 'all' && plan.carrier !== filters.carrier) {
      return false;
    }
    // Network type filter
    if (filters.networkType !== 'all' && plan.planType !== filters.networkType) {
      return false;
    }
    // Premium filter
    if (plan.monthlyPremium > filters.maxPremium) {
      return false;
    }
    // Star rating filter
    if (plan.starRating < filters.minStarRating) {
      return false;
    }
    // Prescription filter
    if (filters.prescriptionCoverageOnly && !plan.prescriptionDrugCoverage) {
      return false;
    }
    // Dental filter
    if (filters.hasDental && !plan.benefits.dental.covered) {
      return false;
    }
    // Vision filter
    if (filters.hasVision && !plan.benefits.vision.covered) {
      return false;
    }
    // Hearing filter
    if (filters.hasHearing && !plan.benefits.hearing.covered) {
      return false;
    }
    // Search query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchName = plan.name.toLowerCase().includes(q);
      const matchCarrier = plan.carrier.toLowerCase().includes(q);
      const matchType = plan.planType.toLowerCase().includes(q);
      if (!matchName && !matchCarrier && !matchType) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'premium-asc':
        return a.monthlyPremium - b.monthlyPremium;
      case 'premium-desc':
        return b.monthlyPremium - a.monthlyPremium;
      case 'deductible-asc':
        return a.medicalDeductible - b.medicalDeductible;
      case 'star-desc':
        return b.starRating - a.starRating;
      case 'moop-asc':
        return a.maxOutOfPocket - b.maxOutOfPocket;
      case 'recommended':
      default:
        // Highest star rating with lowest premium combination
        return (b.starRating * 100 - b.monthlyPremium) - (a.starRating * 100 - a.monthlyPremium);
    }
  });

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        navigateTo,
        selectedCategory,
        setSelectedCategory,
        zipCode,
        setZipCode,
        countyState,
        isZipModalOpen,
        setIsZipModalOpen,
        effectiveDate,
        setEffectiveDate,
        coveragePreference,
        setCoveragePreference,
        plans: MEDICARE_PLANS,
        filteredPlans,
        savedPlanIds,
        toggleSavePlan,
        comparePlanIds,
        toggleComparePlan,
        clearComparison,
        selectedPlanForDetails,
        openPlanDetails,
        closePlanDetails,
        userDoctorIds,
        addDoctor,
        removeDoctor,
        userPharmacyIds,
        addPharmacy,
        removePharmacy,
        userPrescriptions,
        addPrescription,
        removePrescription,
        filters,
        updateFilters,
        resetFilters,
        userProfile,
        isAuthenticated,
        login,
        logout,
        registerUser,
        updateUserProfile,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        isAgentChatOpen,
        toggleAgentChat,
        quoteRequests,
        submitQuoteRequest,
        callbackRequests,
        submitCallbackRequest,
        isDeviceFrameView,
        toggleDeviceFrameView,
        calculatePlanAnnualCost
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

