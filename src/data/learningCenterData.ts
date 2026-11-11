export interface LearningArticle {
  id: string;
  category: 'Basics' | 'Comparison' | 'Enrollment' | 'Prescription' | 'Costs';
  title: string;
  readTime: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
}

export const LEARNING_ARTICLES: LearningArticle[] = [
  {
    id: 'medicare-parts-explained',
    category: 'Basics',
    title: 'The ABCDs of Medicare: Understanding Parts A, B, C, and D',
    readTime: '4 min read',
    summary: 'A clear guide to what each Medicare part covers, how much it costs, and how to choose the right combination.',
    content: [
      'Medicare is the United States federal health insurance program primarily for adults aged 65 and older, as well as younger individuals with specific disabilities or End-Stage Renal Disease.',
      'Part A (Hospital Insurance): Covers inpatient hospital stays, care in a skilled nursing facility, hospice care, and some home health care. Most individuals pay $0 premium for Part A if they or their spouse paid Medicare taxes for at least 10 years (40 quarters).',
      'Part B (Medical Insurance): Covers certain doctors\' services, outpatient care, medical supplies, and preventive services. Part B requires a standard monthly premium set annually by CMS ($174.70 in 2024; projected standard around $185 in 2025/2026).',
      'Part C (Medicare Advantage): An "all-in-one" alternative offered by private Medicare-approved insurance companies. Bundles Part A, Part B, and usually Part D drug coverage, plus extra benefits like dental, vision, hearing, and gym memberships.',
      'Part D (Prescription Drug Coverage): Run by private insurance companies to cover the cost of outpatient prescription drugs. Under the Inflation Reduction Act, out-of-pocket prescription drug costs are capped at $2,000 annually.'
    ],
    keyTakeaways: [
      'Original Medicare consists of Part A (Hospital) and Part B (Medical).',
      'Medicare Advantage (Part C) replaces Original Medicare with a private carrier network plan.',
      'Prescription coverage can come from a standalone Part D plan or an all-in-one Medicare Advantage plan.'
    ]
  },
  {
    id: 'medigap-vs-medicare-advantage',
    category: 'Comparison',
    title: 'Medicare Advantage vs. Medicare Supplement (Medigap): Which Is Best for You?',
    readTime: '6 min read',
    summary: 'Compare monthly premiums, network flexibility, out-of-pocket risk, and prescription drug bundling side by side.',
    content: [
      'One of the most crucial decisions for new Medicare beneficiaries is choosing between Medicare Advantage (Part C) and Original Medicare paired with a Medicare Supplement (Medigap) policy.',
      'Medicare Advantage Plans offer low or $0 monthly premiums and wrap medical, hospital, prescription, and extra benefits (dental, vision, gym) into one plan. However, you generally must use network doctors (HMO/PPO) and may need prior authorizations for certain specialist care.',
      'Medicare Supplement (Medigap) policies have higher monthly premiums ($100-$200+/month) but allow you to see ANY doctor or hospital across the United States that accepts Medicare without network limitations or referrals. Once you meet the small Part B annual deductible ($240), Medigap Plan G covers 100% of Medicare-approved costs.',
      'Medigap plans DO NOT include prescription drugs, so you must purchase a standalone Part D Prescription Drug Plan (PDP).'
    ],
    keyTakeaways: [
      'Choose Medicare Advantage if you want $0 monthly premiums, extra dental/vision perks, and are comfortable staying within a local doctor network.',
      'Choose Medigap (e.g. Plan G) if you travel frequently, want total freedom to see any doctor in the country, and want predictable, near-zero out-of-pocket medical bills.'
    ]
  },
  {
    id: 'enrollment-periods-guide',
    category: 'Enrollment',
    title: 'Medicare Enrollment Periods: Deadlines You Cannot Afford to Miss',
    readTime: '5 min read',
    summary: 'Never miss an enrollment window. Learn the rules for IEP, AEP, OEP, and Special Enrollment Periods (SEP).',
    content: [
      'Initial Enrollment Period (IEP): A 7-month window when you first become eligible for Medicare. It includes the 3 months before your 65th birthday month, your birthday month, and the 3 months after.',
      'Annual Enrollment Period (AEP): Occurs every year from October 15 through December 7. Anyone with Medicare can join, switch, or drop a Medicare Advantage or Part D prescription plan. Coverage takes effect January 1.',
      'Medicare Advantage Open Enrollment Period (OEP): From January 1 through March 31. If you are already enrolled in a Medicare Advantage plan, you can switch to another Medicare Advantage plan or return to Original Medicare and add a Part D plan.',
      'Special Enrollment Periods (SEP): Triggered by qualifying life events, such as moving to a new county/state, losing employer-sponsored group coverage, qualifying for Medicaid or Extra Help, or if your plan leaves the service area.'
    ],
    keyTakeaways: [
      'Mark your calendar: AEP is October 15 – December 7 every year.',
      'Late enrollment penalties for Part B and Part D can last for life if you do not have creditable coverage.',
      'Qualifying life changes grant you an SEP to make mid-year adjustments without penalties.'
    ]
  },
  {
    id: 'extra-help-and-dsnp',
    category: 'Costs',
    title: 'Extra Help & Dual-Eligible Special Needs Plans (D-SNP)',
    readTime: '4 min read',
    summary: 'Discover financial assistance programs that reduce or eliminate premiums, copays, and prescription drug costs.',
    content: [
      'The Extra Help program (also known as the Low-Income Subsidy / LIS) is a federal program that helps Medicare beneficiaries with limited income and resources pay for prescription drug costs, including premiums, deductibles, and copayments.',
      'Dual-Eligible Special Needs Plans (D-SNP): If you qualify for both Medicare and state Medicaid, you are considered "dual eligible." D-SNPs are specialized Medicare Advantage plans that coordinate both programs.',
      'D-SNP benefits often feature $0 monthly plan premiums, $0 copays on doctor visits, $0 copays on prescriptions, and generous monthly allowances (often $100-$200+/month) on prepaid cards for healthy groceries, utilities, and OTC health products.'
    ],
    keyTakeaways: [
      'Extra Help can reduce generic prescription copays to $0 - $4.50.',
      'D-SNP plans bundle Medicare and Medicaid coverage with extra perks like grocery credits and dental allowances.',
      'You can check your eligibility anytime with a licensed Medicare insurance agent.'
    ]
  }
];

export const MEDICARE_DISCLAIMERS = {
  cmsTPMO: 'We do not offer every plan available in your area. Currently we represent 10 organizations which offer 54 products in your area. Please contact Medicare.gov, 1-800-MEDICARE, or your local State Health Insurance Program (SHIP) to get information on all of your options.',
  nonGovernmentAffiliation: 'PlanEnroll and this application are operated by Integrity Marketing Group, LLC, a non-government licensed insurance agency. This application and its operators are not connected with or endorsed by the U.S. government or the federal Medicare program.',
  estimatesNotice: 'All premium, copay, deductible, and prescription drug estimates displayed in this application are for informational and illustrative purposes only. Actual costs depend on your specific enrollment date, carrier contract approval, pharmacy tier status, and medical history. Enrollment in any Medicare plan depends on contract renewal.',
  agentAssistanceNotice: 'Licensed insurance agents contracted with Medicare-approved carriers are available to provide personalized advice, plan explanations, and application assistance at no cost or obligation to you.'
};

