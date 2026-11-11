import { MedicarePlan } from '../types';

export const MEDICARE_PLANS: MedicarePlan[] = [
  // 1. Molina Healthcare - Medicare Advantage Prescription Drug (MAPD)
  {
    id: 'molina-complete-care-hmo',
    name: 'Molina Medicare Complete Care (HMO)',
    carrier: 'Molina Healthcare',
    carrierLogo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=120&auto=format&fit=crop&q=80',
    carrierColor: '#00838F',
    category: 'medicare-advantage',
    planType: 'HMO',
    subType: 'HMO with Drug Coverage',
    zipCodes: ['75080', '75081', '75082', '75001', '75201', '90001', '33101'],
    state: 'TX',
    monthlyPremium: 22.50,
    medicalDeductible: 0,
    drugDeductible: 0,
    maxOutOfPocket: 7550,
    starRating: 4.0,
    ratingCount: 1840,
    prescriptionDrugCoverage: true,
    extraHelpAvailable: true,
    summaryHighlights: [
      '$0 Primary Care Doctor Copay',
      'Comprehensive Dental ($2,000 allowance)',
      '$0 Tier 1 Generic Prescriptions',
      'SilverSneakers Fitness Program included'
    ],
    benefits: {
      dental: { name: 'Comprehensive & Preventive Dental', covered: true, cost: '$0 copay ($2,000 max/yr)', description: 'Cleanings, exams, fillings, crowns, and dentures' },
      vision: { name: 'Routine Vision & Eyewear', covered: true, cost: '$0 copay ($300 eyewear allowance)', description: 'Annual exam plus allowance for contacts/lenses/frames' },
      hearing: { name: 'Hearing Exam & Aids', covered: true, cost: '$0 exam ($1,500/yr hearing aids)', description: 'Annual diagnostic hearing exam and premium aid fittings' },
      fitness: { name: 'SilverSneakers® Fitness', covered: true, cost: '$0 membership fee', description: 'Access to 15,000+ participating fitness facilities nationwide' },
      overTheCounterAllowance: { name: 'OTC Benefit Allowance', covered: true, cost: '$75 quarterly allowance', description: 'Order health products, vitamins, first aid kits by mail' },
      transportation: { name: 'Medical Transportation', covered: true, cost: '24 one-way trips / year', description: 'Rides to doctors, hospitals, and pharmacies' },
      meals: { name: 'Post-Discharge Meals', covered: true, cost: '28 meals after hospital stay', description: 'Nutritious meals delivered directly to your home' },
      telehealth: { name: '24/7 Virtual Telehealth', covered: true, cost: '$0 copay anytime', description: 'Board-certified doctors via phone or smartphone app' }
    },
    copays: {
      primaryCareDoctor: '$0',
      specialist: '$35',
      emergencyRoom: '$120 (waived if admitted)',
      urgentCare: '$35',
      inpatientHospital: '$295/day (days 1-6)',
      ambulance: '$250',
      outpatientSurgery: '$250',
      preventiveCare: '$0'
    },
    rxTiers: [
      { tier: 1, tierName: 'Preferred Generic', standardRetail30Day: '$2', preferredRetail30Day: '$0', mailOrder90Day: '$0' },
      { tier: 2, tierName: 'Generic', standardRetail30Day: '$12', preferredRetail30Day: '$5', mailOrder90Day: '$10' },
      { tier: 3, tierName: 'Preferred Brand', standardRetail30Day: '$47', preferredRetail30Day: '$42', mailOrder90Day: '$110' },
      { tier: 4, tierName: 'Non-Preferred Drug', standardRetail30Day: '$100', preferredRetail30Day: '$90', mailOrder90Day: '$250' },
      { tier: 5, tierName: 'Specialty Tier', standardRetail30Day: '33% coinsurance', preferredRetail30Day: '33% coinsurance', mailOrder90Day: 'Not available' }
    ],
    formularyDrugCount: 3850,
    networkSize: { doctors: 4200, hospitals: 28, pharmacies: 185 },
    contractId: 'H8176-004',
    cmsPlanId: 'H8176-004-001',
    effectiveYear: 2026
  },

  // 2. Blue Cross Blue Shield - Medicare Advantage Value (HMO) - $0 Premium
  {
    id: 'bcbs-medicare-advantage-value-hmo',
    name: 'Blue Cross Medicare Advantage Value (HMO)',
    carrier: 'Blue Cross Blue Shield',
    carrierLogo: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=120&auto=format&fit=crop&q=80',
    carrierColor: '#005596',
    category: 'medicare-advantage',
    planType: 'HMO',
    subType: 'Value HMO Plan',
    zipCodes: ['75080', '75081', '75082', '75001', '75201', '90001', '10001'],
    state: 'TX',
    monthlyPremium: 0.00,
    medicalDeductible: 0,
    drugDeductible: 0,
    maxOutOfPocket: 3900,
    starRating: 4.5,
    ratingCount: 3420,
    prescriptionDrugCoverage: true,
    extraHelpAvailable: true,
    summaryHighlights: [
      '$0 Monthly Premium',
      '$0 Copay for Primary Care Visits',
      'Low $3,900 Maximum Out-of-Pocket',
      'Top-rated Blue Cross Provider Network'
    ],
    benefits: {
      dental: { name: 'Comprehensive Dental Coverage', covered: true, cost: '$0 copay ($2,500 max/yr)', description: 'Preventive plus restorations, endodontics, periodontics' },
      vision: { name: 'Vision Care with Hardware Allowance', covered: true, cost: '$0 exam ($250 eyewear credit)', description: 'Designer frames and lenses through Davis Vision network' },
      hearing: { name: 'Hearing Healthcare', covered: true, cost: '$0 exam ($1,000 aid allowance)', description: 'State of the art digital hearing aid options' },
      fitness: { name: 'Blue365 & SilverSneakers', covered: true, cost: '$0 fee', description: 'Nationwide fitness access and nutrition classes' },
      overTheCounterAllowance: { name: 'Quarterly OTC Card', covered: true, cost: '$60 every 3 months', description: 'Use at Walgreens, CVS, or home delivery' },
      transportation: { name: 'Routine Rides', covered: true, cost: '12 one-way rides / yr', description: 'Scheduled rides to healthcare appointments' },
      meals: { name: 'Post-Inpatient Meals', covered: true, cost: '14 meals delivered', description: '2 meals per day for 7 days post-discharge' },
      telehealth: { name: 'Virtual Doctor Visits', covered: true, cost: '$0 24/7 access', description: 'MDLive secure video consultations' }
    },
    copays: {
      primaryCareDoctor: '$0',
      specialist: '$25',
      emergencyRoom: '$90 (waived if admitted within 24h)',
      urgentCare: '$25',
      inpatientHospital: '$250/day (days 1-5)',
      ambulance: '$200',
      outpatientSurgery: '$175',
      preventiveCare: '$0'
    },
    rxTiers: [
      { tier: 1, tierName: 'Preferred Generic', standardRetail30Day: '$3', preferredRetail30Day: '$0', mailOrder90Day: '$0' },
      { tier: 2, tierName: 'Generic', standardRetail30Day: '$10', preferredRetail30Day: '$4', mailOrder90Day: '$8' },
      { tier: 3, tierName: 'Preferred Brand', standardRetail30Day: '$45', preferredRetail30Day: '$40', mailOrder90Day: '$100' },
      { tier: 4, tierName: 'Non-Preferred Drug', standardRetail30Day: '$95', preferredRetail30Day: '$85', mailOrder90Day: '$225' },
      { tier: 5, tierName: 'Specialty Tier', standardRetail30Day: '33% coinsurance', preferredRetail30Day: '33% coinsurance', mailOrder90Day: 'Not available' }
    ],
    formularyDrugCount: 4120,
    networkSize: { doctors: 7800, hospitals: 45, pharmacies: 320 },
    contractId: 'H5883-012',
    cmsPlanId: 'H5883-012-002',
    effectiveYear: 2026
  },

  // 3. UnitedHealthcare - AARP Medicare Advantage Choice (PPO)
  {
    id: 'uhc-aarp-medicare-advantage-ppo',
    name: 'AARP Medicare Advantage Choice (PPO)',
    carrier: 'UnitedHealthcare',
    carrierLogo: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=120&auto=format&fit=crop&q=80',
    carrierColor: '#002677',
    category: 'medicare-advantage',
    planType: 'PPO',
    subType: 'National PPO Network',
    zipCodes: ['75080', '75081', '75082', '75001', '75201', '90001', '33101', '10001', '60601'],
    state: 'TX',
    monthlyPremium: 19.00,
    medicalDeductible: 0,
    drugDeductible: 150,
    maxOutOfPocket: 4900,
    starRating: 4.5,
    ratingCount: 5210,
    prescriptionDrugCoverage: true,
    extraHelpAvailable: true,
    summaryHighlights: [
      'PPO Freedom: See any doctor who accepts Medicare',
      'No referrals needed to see specialists',
      '$0 Copay for Annual Physical & Labs',
      'Renew Active® Premier Gym Network'
    ],
    benefits: {
      dental: { name: 'AARP Dental Network', covered: true, cost: '$0 preventive ($1,500 comprehensive)', description: 'Broadest national dental network with out-of-network benefits' },
      vision: { name: 'Eyewear Benefit Allowance', covered: true, cost: '$0 copay ($200 eyewear benefit)', description: 'Annual exam plus eyeglasses or contact lenses' },
      hearing: { name: 'UnitedHealthcare Hearing', covered: true, cost: '$0 exam ($299-$1,249 per aid)', description: 'Custom-fit digital hearing aids with 3-year warranty' },
      fitness: { name: 'Renew Active® by UnitedHealthcare', covered: true, cost: '$0 free membership', description: 'Thousands of gyms, boutique studios, and brain games' },
      overTheCounterAllowance: { name: 'UCard® Spending Balance', covered: true, cost: '$50 per quarter', description: 'Load directly on your single integrated UCard®' },
      transportation: { name: 'Non-emergency Medical Rides', covered: true, cost: '18 rides per year', description: 'Lyft or private curb-to-curb transportation' },
      meals: { name: 'Mom’s Meals Post-Hospitalization', covered: true, cost: '28 meals post-stay', description: 'Refrigerated home-delivered medically tailored meals' },
      telehealth: { name: 'Optum Virtual Care', covered: true, cost: '$0 virtual copay', description: 'Access medical and mental health clinicians 24/7' }
    },
    copays: {
      primaryCareDoctor: '$0 in-network / $20 out-of-network',
      specialist: '$30 in-network / $45 out-of-network',
      emergencyRoom: '$110',
      urgentCare: '$30',
      inpatientHospital: '$295/day (days 1-5 in-network)',
      ambulance: '$225',
      outpatientSurgery: '$225',
      preventiveCare: '$0'
    },
    rxTiers: [
      { tier: 1, tierName: 'Preferred Generic', standardRetail30Day: '$2', preferredRetail30Day: '$0', mailOrder90Day: '$0' },
      { tier: 2, tierName: 'Generic', standardRetail30Day: '$10', preferredRetail30Day: '$4', mailOrder90Day: '$0' },
      { tier: 3, tierName: 'Preferred Brand', standardRetail30Day: '$47', preferredRetail30Day: '$40', mailOrder90Day: '$100' },
      { tier: 4, tierName: 'Non-Preferred Drug', standardRetail30Day: '$100', preferredRetail30Day: '$95', mailOrder90Day: '$275' },
      { tier: 5, tierName: 'Specialty Tier', standardRetail30Day: '30% coinsurance', preferredRetail30Day: '30% coinsurance', mailOrder90Day: 'Not available' }
    ],
    formularyDrugCount: 4300,
    networkSize: { doctors: 12500, hospitals: 62, pharmacies: 540 },
    contractId: 'H1278-002',
    cmsPlanId: 'H1278-002-005',
    effectiveYear: 2026
  },

  // 4. Humana - Humana Gold Plus HMO
  {
    id: 'humana-gold-plus-hmo',
    name: 'Humana Gold Plus HMO',
    carrier: 'Humana',
    carrierLogo: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=120&auto=format&fit=crop&q=80',
    carrierColor: '#4C8C2B',
    category: 'medicare-advantage',
    planType: 'HMO',
    subType: 'Comprehensive HMO',
    zipCodes: ['75080', '75081', '75082', '75001', '75201', '90001', '33101'],
    state: 'TX',
    monthlyPremium: 0.00,
    medicalDeductible: 0,
    drugDeductible: 0,
    maxOutOfPocket: 3400,
    starRating: 5.0,
    ratingCount: 6100,
    prescriptionDrugCoverage: true,
    extraHelpAvailable: true,
    summaryHighlights: [
      'CMS 5-Star Highest Quality Rating',
      '$0 Monthly Plan Premium',
      'Industry-leading $3,400 Out-of-Pocket Cap',
      'Healthy Options Allowance for Groceries & Utilities'
    ],
    benefits: {
      dental: { name: 'DEN123 Dental Rider', covered: true, cost: '$0 copay ($2,000 annual max)', description: 'Exams, fillings, root canals, oral surgery' },
      vision: { name: 'Humana Vision Powered by EyeMed', covered: true, cost: '$0 exam ($300 frame credit)', description: 'Frames, progressive lenses, contacts' },
      hearing: { name: 'TruHearing Advanced', covered: true, cost: '$0 exam ($499-$799 aids)', description: 'Advanced rechargeable hearing aids with 48 channels' },
      fitness: { name: 'SilverSneakers Membership', covered: true, cost: '$0 unlimited access', description: 'Participating YMCAs, gyms, and home fitness kits' },
      overTheCounterAllowance: { name: 'Healthy Foods & OTC Card', covered: true, cost: '$75/month for qualifying members', description: 'Spend on healthy food items, produce, and medications' },
      transportation: { name: 'Non-emergency Health Rides', covered: true, cost: '36 one-way rides / yr', description: 'Door-to-door escort rides for medical visits' },
      meals: { name: 'Well Dine Meal Delivery', covered: true, cost: '20 meals delivered', description: 'Nutritious meals tailored to diabetic or heart-healthy needs' },
      telehealth: { name: 'Humana Telehealth', covered: true, cost: '$0 copay 24/7', description: 'Board-certified physicians available on mobile video' }
    },
    copays: {
      primaryCareDoctor: '$0',
      specialist: '$20',
      emergencyRoom: '$90',
      urgentCare: '$20',
      inpatientHospital: '$195/day (days 1-5)',
      ambulance: '$175',
      outpatientSurgery: '$150',
      preventiveCare: '$0'
    },
    rxTiers: [
      { tier: 1, tierName: 'Preferred Generic', standardRetail30Day: '$2', preferredRetail30Day: '$0', mailOrder90Day: '$0' },
      { tier: 2, tierName: 'Generic', standardRetail30Day: '$8', preferredRetail30Day: '$2', mailOrder90Day: '$0' },
      { tier: 3, tierName: 'Preferred Brand', standardRetail30Day: '$45', preferredRetail30Day: '$38', mailOrder90Day: '$95' },
      { tier: 4, tierName: 'Non-Preferred Drug', standardRetail30Day: '$90', preferredRetail30Day: '$80', mailOrder90Day: '$240' },
      { tier: 5, tierName: 'Specialty Tier', standardRetail30Day: '33% coinsurance', preferredRetail30Day: '33% coinsurance', mailOrder90Day: 'Not available' }
    ],
    formularyDrugCount: 4450,
    networkSize: { doctors: 9100, hospitals: 52, pharmacies: 410 },
    contractId: 'H1036-088',
    cmsPlanId: 'H1036-088-001',
    effectiveYear: 2026
  },

  // 5. Medicare Supplement (Medigap) - Mutual of Omaha Plan G
  {
    id: 'mutual-of-omaha-medigap-plan-g',
    name: 'Mutual of Omaha Plan G (Medigap)',
    carrier: 'Mutual of Omaha',
    carrierLogo: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=120&auto=format&fit=crop&q=80',
    carrierColor: '#123D69',
    category: 'medicare-supplement',
    planType: 'Medigap',
    subType: 'Medigap Plan Letter G',
    zipCodes: ['75080', '75081', '75082', '75001', '75201', '90001', '33101', '10001', '60601'],
    state: 'TX',
    monthlyPremium: 142.00,
    medicalDeductible: 240, // Part B deductible in 2024-2026
    drugDeductible: 0,
    maxOutOfPocket: 240, // Only pays Part B deductible, then 100% covered!
    starRating: 4.8,
    ratingCount: 2980,
    prescriptionDrugCoverage: false, // Medigap does not include drug coverage; pair with PDP
    extraHelpAvailable: false,
    summaryHighlights: [
      '100% Coverage of Part A Hospital Deductible ($1,632)',
      '100% Coverage of Part B 20% Coinsurance',
      'See ANY Medicare doctor in all 50 states—No network restrictions',
      'Foreign travel emergency coverage up to $50,000'
    ],
    benefits: {
      dental: { name: 'Dental Coverage', covered: false, cost: 'Not included in standard Medigap', description: 'Standalone dental policies can be purchased separately' },
      vision: { name: 'Vision Eyewear', covered: false, cost: 'Not included in standard Medigap', description: 'Standalone vision policies available' },
      hearing: { name: 'Hearing Aid Benefit', covered: false, cost: 'Not included in standard Medigap', description: 'Discounts available through Mutually Well program' },
      fitness: { name: 'Mutually Well Fitness Program', covered: true, cost: 'Discounted gym memberships', description: 'Access to 10,000+ fitness facilities across US' },
      overTheCounterAllowance: { name: 'OTC Allowance', covered: false, cost: 'Not included', description: 'Standard Medigap covers Medicare gap costs' },
      transportation: { name: 'Non-emergency Transport', covered: false, cost: 'Not included', description: 'Not covered under standard Medicare Part A/B' },
      meals: { name: 'Meal Delivery', covered: false, cost: 'Not included', description: 'Not covered by standard Medicare' },
      telehealth: { name: 'Medicare Telehealth', covered: true, cost: '100% covered after Part B deductible', description: 'Any Medicare-approved telehealth provider' }
    },
    copays: {
      primaryCareDoctor: '$0 after $240 Part B deductible',
      specialist: '$0 after $240 Part B deductible',
      emergencyRoom: '$0 after $240 Part B deductible',
      urgentCare: '$0 after $240 Part B deductible',
      inpatientHospital: '$0 (Part A deductible 100% paid)',
      ambulance: '$0 after $240 Part B deductible',
      outpatientSurgery: '$0 after $240 Part B deductible',
      preventiveCare: '$0'
    },
    formularyDrugCount: 0,
    contractId: 'MED-G-OMH',
    cmsPlanId: 'MED-G-OMH-2026',
    effectiveYear: 2026
  },

  // 6. Medicare Supplement - Aetna Medigap Plan N
  {
    id: 'aetna-medigap-plan-n',
    name: 'Aetna Health Plan N (Medigap)',
    carrier: 'Aetna',
    carrierLogo: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=120&auto=format&fit=crop&q=80',
    carrierColor: '#7D3F98',
    category: 'medicare-supplement',
    planType: 'Medigap',
    subType: 'Medigap Plan Letter N',
    zipCodes: ['75080', '75081', '75082', '75001', '75201', '90001', '33101', '10001', '60601'],
    state: 'TX',
    monthlyPremium: 98.00,
    medicalDeductible: 240,
    drugDeductible: 0,
    maxOutOfPocket: 500,
    starRating: 4.6,
    ratingCount: 1950,
    prescriptionDrugCoverage: false,
    extraHelpAvailable: false,
    summaryHighlights: [
      'Lower monthly premium than Plan G',
      'Small copays: Up to $20 office visit copay',
      'Up to $50 emergency room copay (waived if admitted)',
      '100% Coverage of Part A Hospital Deductible'
    ],
    benefits: {
      dental: { name: 'Dental Discount Access', covered: false, cost: 'Discount card included', description: 'Discounts on dental exams and cleanings' },
      vision: { name: 'Vision Eyewear Discount', covered: false, cost: 'Discounts available', description: 'Discounts via EyeMed discount network' },
      hearing: { name: 'Hearing Aid Discounts', covered: false, cost: 'Discounts available', description: 'Hearing exams and discounted instruments via Amplifon' },
      fitness: { name: 'SilverSneakers® Program', covered: true, cost: 'Included at no cost', description: 'Full access to participating fitness locations' },
      overTheCounterAllowance: { name: 'OTC Allowance', covered: false, cost: 'Not included', description: 'Medigap supplemental standard policy' },
      transportation: { name: 'Transport', covered: false, cost: 'Not included', description: 'Standard Medicare rules' },
      meals: { name: 'Meal delivery', covered: false, cost: 'Not included', description: 'Not covered by Medigap' },
      telehealth: { name: 'Medicare Telehealth Visits', covered: true, cost: 'Covered with max $20 copay', description: 'All licensed Medicare doctors nationwide' }
    },
    copays: {
      primaryCareDoctor: 'Up to $20 copay',
      specialist: 'Up to $20 copay',
      emergencyRoom: 'Up to $50 copay (waived if admitted)',
      urgentCare: '$0 after Part B deductible',
      inpatientHospital: '$0 (Part A deductible 100% paid)',
      ambulance: '$0 after Part B deductible',
      outpatientSurgery: '$0 after Part B deductible',
      preventiveCare: '$0'
    },
    formularyDrugCount: 0,
    contractId: 'MED-N-AET',
    cmsPlanId: 'MED-N-AET-2026',
    effectiveYear: 2026
  },

  // 7. Prescription Drug Plan (Part D) - SilverScript Choice (PDP) by CVS Health
  {
    id: 'silverscript-choice-pdp',
    name: 'SilverScript Choice (PDP)',
    carrier: 'CVS Health / SilverScript',
    carrierLogo: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=120&auto=format&fit=crop&q=80',
    carrierColor: '#CC0000',
    category: 'prescription-drug',
    planType: 'PDP',
    subType: 'Stand-alone Part D Plan',
    zipCodes: ['75080', '75081', '75082', '75001', '75201', '90001', '33101', '10001', '60601'],
    state: 'TX',
    monthlyPremium: 34.20,
    medicalDeductible: 0,
    drugDeductible: 545, // CMS Standard Part D Deductible
    maxOutOfPocket: 2000, // Inflation Reduction Act $2,000 Out-of-Pocket Cap!
    starRating: 4.2,
    ratingCount: 4560,
    prescriptionDrugCoverage: true,
    extraHelpAvailable: true,
    summaryHighlights: [
      'Pairs seamlessly with Original Medicare or Medigap Plan G/N',
      '$2,000 Maximum Annual Drug Out-of-Pocket Cap',
      'Preferred pricing at CVS Pharmacy, Walmart, and Kroger',
      '90-Day Mail Order delivery straight to your doorstep'
    ],
    benefits: {
      dental: { name: 'Dental', covered: false, cost: 'Part D Drug Plan only', description: 'Prescription drug coverage focus' },
      vision: { name: 'Vision', covered: false, cost: 'Part D Drug Plan only', description: 'Prescription drug coverage focus' },
      hearing: { name: 'Hearing', covered: false, cost: 'Part D Drug Plan only', description: 'Prescription drug coverage focus' },
      fitness: { name: 'Fitness', covered: false, cost: 'Part D Drug Plan only', description: 'Prescription drug coverage focus' },
      overTheCounterAllowance: { name: 'OTC', covered: false, cost: 'Not included', description: 'Covers outpatient prescription formulary' },
      transportation: { name: 'Transport', covered: false, cost: 'Not included', description: 'Not included' },
      meals: { name: 'Meals', covered: false, cost: 'Not included', description: 'Not included' },
      telehealth: { name: 'Pharmacist Consultations', covered: true, cost: '$0 24/7 Rx counseling', description: 'Direct access to clinical pharmacists' }
    },
    copays: {
      primaryCareDoctor: 'N/A (Medical covered by Part B)',
      specialist: 'N/A (Medical covered by Part B)',
      emergencyRoom: 'N/A',
      urgentCare: 'N/A',
      inpatientHospital: 'N/A',
      ambulance: 'N/A',
      outpatientSurgery: 'N/A',
      preventiveCare: '$0 Part D Vaccines (Shingrix, Tdap, Flu, COVID-19)'
    },
    rxTiers: [
      { tier: 1, tierName: 'Preferred Generic', standardRetail30Day: '$7', preferredRetail30Day: '$1', mailOrder90Day: '$0' },
      { tier: 2, tierName: 'Generic', standardRetail30Day: '$15', preferredRetail30Day: '$6', mailOrder90Day: '$12' },
      { tier: 3, tierName: 'Preferred Brand', standardRetail30Day: '20% coinsurance', preferredRetail30Day: '16% coinsurance', mailOrder90Day: '16% coinsurance' },
      { tier: 4, tierName: 'Non-Preferred Drug', standardRetail30Day: '45% coinsurance', preferredRetail30Day: '40% coinsurance', mailOrder90Day: '40% coinsurance' },
      { tier: 5, tierName: 'Specialty Tier', standardRetail30Day: '25% coinsurance', preferredRetail30Day: '25% coinsurance', mailOrder90Day: 'Not available' }
    ],
    formularyDrugCount: 3950,
    networkSize: { doctors: 0, hospitals: 0, pharmacies: 66000 },
    contractId: 'S5601-001',
    cmsPlanId: 'S5601-001-001',
    effectiveYear: 2026
  },

  // 8. Prescription Drug Plan - Wellcare Value Script (PDP) - Low $0-$0.40 Premium
  {
    id: 'wellcare-value-script-pdp',
    name: 'Wellcare Value Script (PDP)',
    carrier: 'Wellcare by Centene',
    carrierLogo: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=120&auto=format&fit=crop&q=80',
    carrierColor: '#005A9C',
    category: 'prescription-drug',
    planType: 'PDP',
    subType: 'Budget Part D Standalone',
    zipCodes: ['75080', '75081', '75082', '75001', '75201', '90001', '33101', '10001'],
    state: 'TX',
    monthlyPremium: 0.50,
    medicalDeductible: 0,
    drugDeductible: 545,
    maxOutOfPocket: 2000,
    starRating: 3.5,
    ratingCount: 3820,
    prescriptionDrugCoverage: true,
    extraHelpAvailable: true,
    summaryHighlights: [
      'Ultra-low monthly premium ($0.50/mo)',
      '$0 Copay for Tier 1 generics at preferred pharmacies',
      '$2,000 maximum out-of-pocket cap protection',
      'Preferred pharmacy savings at Walgreens & grocery chains'
    ],
    benefits: {
      dental: { name: 'Dental', covered: false, cost: 'PDP only', description: 'Prescriptions only' },
      vision: { name: 'Vision', covered: false, cost: 'PDP only', description: 'Prescriptions only' },
      hearing: { name: 'Hearing', covered: false, cost: 'PDP only', description: 'Prescriptions only' },
      fitness: { name: 'Fitness', covered: false, cost: 'PDP only', description: 'Prescriptions only' },
      overTheCounterAllowance: { name: 'OTC', covered: false, cost: 'Not included', description: 'Part D drugs only' },
      transportation: { name: 'Transport', covered: false, cost: 'Not included', description: 'Not included' },
      meals: { name: 'Meals', covered: false, cost: 'Not included', description: 'Not included' },
      telehealth: { name: 'Clinical Pharmacist Consultation', covered: true, cost: '$0 phone consultation', description: 'Review drug interactions and cost savings' }
    },
    copays: {
      primaryCareDoctor: 'N/A',
      specialist: 'N/A',
      emergencyRoom: 'N/A',
      urgentCare: 'N/A',
      inpatientHospital: 'N/A',
      ambulance: 'N/A',
      outpatientSurgery: 'N/A',
      preventiveCare: '$0 Part D Vaccines (Shingles, Flu, Pneumonia)'
    },
    rxTiers: [
      { tier: 1, tierName: 'Preferred Generic', standardRetail30Day: '$6', preferredRetail30Day: '$0', mailOrder90Day: '$0' },
      { tier: 2, tierName: 'Generic', standardRetail30Day: '$14', preferredRetail30Day: '$5', mailOrder90Day: '$10' },
      { tier: 3, tierName: 'Preferred Brand', standardRetail30Day: '22% coinsurance', preferredRetail30Day: '17% coinsurance', mailOrder90Day: '17% coinsurance' },
      { tier: 4, tierName: 'Non-Preferred Drug', standardRetail30Day: '48% coinsurance', preferredRetail30Day: '42% coinsurance', mailOrder90Day: '42% coinsurance' },
      { tier: 5, tierName: 'Specialty Tier', standardRetail30Day: '25% coinsurance', preferredRetail30Day: '25% coinsurance', mailOrder90Day: 'Not available' }
    ],
    formularyDrugCount: 3620,
    networkSize: { doctors: 0, hospitals: 0, pharmacies: 60000 },
    contractId: 'S4802-145',
    cmsPlanId: 'S4802-145-001',
    effectiveYear: 2026
  },

  // 9. Special Needs Plan (D-SNP) - UnitedHealthcare Dual Complete (HMO-POS D-SNP)
  {
    id: 'uhc-dual-complete-dsnp',
    name: 'UnitedHealthcare Dual Complete (HMO-POS D-SNP)',
    carrier: 'UnitedHealthcare',
    carrierLogo: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=120&auto=format&fit=crop&q=80',
    carrierColor: '#002677',
    category: 'special-needs',
    planType: 'HMO-POS',
    subType: 'Dual-Eligible (Medicare + Medicaid)',
    zipCodes: ['75080', '75081', '75082', '75001', '75201', '90001', '33101', '10001', '60601'],
    state: 'TX',
    monthlyPremium: 0.00,
    medicalDeductible: 0,
    drugDeductible: 0,
    maxOutOfPocket: 0, // With full Medicaid cost-sharing assistance
    starRating: 4.5,
    ratingCount: 3890,
    prescriptionDrugCoverage: true,
    extraHelpAvailable: true,
    summaryHighlights: [
      '$0 Plan Premium for Dual-Eligibles',
      '$0 Copay for ALL Covered Prescriptions',
      '$185 Monthly Food, OTC, and Utility Assistance Credit',
      'Unlimited transportation rides to medical & social service visits'
    ],
    benefits: {
      dental: { name: 'Full Dual Dental Coverage', covered: true, cost: '$0 copay ($3,500 annual allowance)', description: 'Full dentures, implants, root canals, cleanings, and exams' },
      vision: { name: 'Comprehensive Eyewear', covered: true, cost: '$0 exam ($400 eyewear credit)', description: 'Designer frames and unlimited replacement lenses' },
      hearing: { name: 'Hearing Aids & Batteries', covered: true, cost: '$0 copay ($2,500 aid allowance)', description: 'Top-tier digital hearing aids with 3-year supply of batteries' },
      fitness: { name: 'Renew Active & Fitness Coaching', covered: true, cost: '$0 membership fee', description: 'Gym access, personal fitness consultation, and home kits' },
      overTheCounterAllowance: { name: 'Monthly Food & Utility Credit', covered: true, cost: '$185 credit every month', description: 'Spend on healthy food, produce, electric/gas bills, and OTC products' },
      transportation: { name: 'Unlimited Medical Transport', covered: true, cost: 'Unlimited rides', description: 'Rides to medical appointments, pharmacies, community centers' },
      meals: { name: 'Post-discharge & Chronic Meals', covered: true, cost: '42 meals delivered', description: 'Fresh, nutritious meals following hospital or SNF discharge' },
      telehealth: { name: 'Dedicated Care Coordinator & Telehealth', covered: true, cost: '$0 24/7 dedicated support', description: 'Personal nurse navigator to coordinate Medicare and Medicaid' }
    },
    copays: {
      primaryCareDoctor: '$0',
      specialist: '$0',
      emergencyRoom: '$0',
      urgentCare: '$0',
      inpatientHospital: '$0',
      ambulance: '$0',
      outpatientSurgery: '$0',
      preventiveCare: '$0'
    },
    rxTiers: [
      { tier: 1, tierName: 'Generic Drugs', standardRetail30Day: '$0', preferredRetail30Day: '$0', mailOrder90Day: '$0' },
      { tier: 2, tierName: 'Brand Name Drugs', standardRetail30Day: '$0', preferredRetail30Day: '$0', mailOrder90Day: '$0' },
      { tier: 3, tierName: 'Specialty Tier', standardRetail30Day: '$0', preferredRetail30Day: '$0', mailOrder90Day: '$0' }
    ],
    formularyDrugCount: 4600,
    networkSize: { doctors: 14200, hospitals: 68, pharmacies: 580 },
    contractId: 'H0271-019',
    cmsPlanId: 'H0271-019-001',
    effectiveYear: 2026
  },

  // 10. Special Needs Plan (C-SNP) - Cigna Healthcare Diabetes & Heart Care (C-SNP)
  {
    id: 'cigna-diabetes-heart-csnp',
    name: 'Cigna TotalCare Diabetes & Heart (HMO C-SNP)',
    carrier: 'Cigna Healthcare',
    carrierLogo: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=120&auto=format&fit=crop&q=80',
    carrierColor: '#0982C6',
    category: 'special-needs',
    planType: 'HMO',
    subType: 'Chronic Condition Special Needs (C-SNP)',
    zipCodes: ['75080', '75081', '75082', '75001', '75201', '90001', '33101'],
    state: 'TX',
    monthlyPremium: 0.00,
    medicalDeductible: 0,
    drugDeductible: 0,
    maxOutOfPocket: 2900,
    starRating: 4.5,
    ratingCount: 2150,
    prescriptionDrugCoverage: true,
    extraHelpAvailable: true,
    summaryHighlights: [
      'Tailored for individuals with Diabetes, Hypertension, or Heart Failure',
      '$0 Copay for Insulin ($35 max cap on all formulations)',
      '$0 Copay for Diabetic Monitoring Supplies & Continuous Glucose Monitors',
      'Personalized Chronic Disease Care Navigator'
    ],
    benefits: {
      dental: { name: 'Enhanced Dental Care', covered: true, cost: '$0 copay ($2,200 annual max)', description: 'Periodontal maintenance for diabetics, crowns, dentures' },
      vision: { name: 'Diabetic Eye Care & Eyewear', covered: true, cost: '$0 annual retinal exam ($300 eyewear allowance)', description: 'Diabetic retinopathy screening and designer eyewear' },
      hearing: { name: 'Diagnostic & Hearing Aids', covered: true, cost: '$0 exam ($1,500 allowance)', description: 'High-definition digital aids and annual cleanings' },
      fitness: { name: 'Specialized Cardiac Rehab & Fitness', covered: true, cost: '$0 SilverSneakers gym access', description: 'Custom exercise routines for cardiovascular and diabetic health' },
      overTheCounterAllowance: { name: 'Cigna Healthy Living Card', covered: true, cost: '$90 per month allowance', description: 'Healthy groceries, diabetes supplies, blood pressure cuffs, OTC items' },
      transportation: { name: 'Specialist Medical Rides', covered: true, cost: '30 one-way rides / yr', description: 'Rides to cardiologists, endocrinologists, dialysis centers' },
      meals: { name: 'Diabetic & Renal Tailored Meals', covered: true, cost: '28 meals delivered', description: 'Low-sodium, diabetic-friendly fresh meals' },
      telehealth: { name: 'MDLive Chronic Telehealth', covered: true, cost: '$0 24/7 video visits', description: 'Remote glucose monitoring and doctor consultations' }
    },
    copays: {
      primaryCareDoctor: '$0',
      specialist: '$15 (Cardiology & Endocrinology $10)',
      emergencyRoom: '$85',
      urgentCare: '$15',
      inpatientHospital: '$175/day (days 1-5)',
      ambulance: '$150',
      outpatientSurgery: '$125',
      preventiveCare: '$0'
    },
    rxTiers: [
      { tier: 1, tierName: 'Preferred Generic', standardRetail30Day: '$0', preferredRetail30Day: '$0', mailOrder90Day: '$0' },
      { tier: 2, tierName: 'Generic & Diabete Rx', standardRetail30Day: '$5', preferredRetail30Day: '$0', mailOrder90Day: '$0' },
      { tier: 3, tierName: 'Preferred Brand & Insulin', standardRetail30Day: '$25', preferredRetail30Day: '$15', mailOrder90Day: '$35' },
      { tier: 4, tierName: 'Non-Preferred Drug', standardRetail30Day: '$85', preferredRetail30Day: '$75', mailOrder90Day: '$210' },
      { tier: 5, tierName: 'Specialty Tier', standardRetail30Day: '33% coinsurance', preferredRetail30Day: '33% coinsurance', mailOrder90Day: 'Not available' }
    ],
    formularyDrugCount: 4200,
    networkSize: { doctors: 8400, hospitals: 44, pharmacies: 390 },
    contractId: 'H7849-014',
    cmsPlanId: 'H7849-014-003',
    effectiveYear: 2026
  }
];

