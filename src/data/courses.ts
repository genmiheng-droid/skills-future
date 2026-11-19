export type CourseCategory =
  | 'Info & Communications'
  | 'Business & Management'
  | 'Sustainability'
  | 'Healthcare'
  | 'Workplace Safety & Health'
  | 'Engineering'
  | 'Training & Adult Ed';

export type TrainingMode =
  | 'Classroom'
  | 'Synchronised E-Learning'
  | 'Asynchronous E-Learning'
  | 'Blended';

export type SkillsFutureScheme =
  | 'SkillsFuture Credit'
  | 'Mid-Career Enhanced Subsidy'
  | 'Workfare Training Support'
  | 'Level-Up Programme (40+)';

export interface Course {
  id: string;
  referenceNumber: string;
  title: string;
  provider: string;
  providerShort: string;
  category: CourseCategory;
  mode: TrainingMode;
  durationHours: number;
  durationLabel: string;
  rating: number;
  ratingCount: number;
  attendanceCount: number;
  fullFee: number;
  subsidyPercentBelow40: number;
  subsidyPercentAbove40: number;
  schemes: SkillsFutureScheme[];
  nextStartDate: string | null;
  upcomingDates: string[];
  location: string;
  isFeaturedAI?: boolean;
  isTrending?: boolean;
  summary: string;
  objectives: string[];
  certification: string;
  image?: string;
}

export interface PriorityTrack {
  id: string;
  title: string;
  category: CourseCategory;
  courseCount: string;
  subtitle: string;
  image: string;
  searchQuery?: string;
}

export const PRIORITY_TRACKS: PriorityTrack[] = [
  {
    id: 'track-ai',
    title: 'Artificial Intelligence & Data',
    category: 'Info & Communications',
    courseCount: '1,420+ courses',
    subtitle: 'Applied generative AI, prompt engineering, machine learning, and enterprise analytics.',
    image: '/src/assets/images/course_ai_tech_1795062668325.jpg',
    searchQuery: 'AI',
  },
  {
    id: 'track-sustainability',
    title: 'Green Economy & Sustainability',
    category: 'Sustainability',
    courseCount: '680+ courses',
    subtitle: 'Carbon accounting, ESG reporting, Green Mark buildings, and clean energy systems.',
    image: '/src/assets/images/course_sustainability_1795062668193.jpg',
  },
  {
    id: 'track-healthcare',
    title: 'Healthcare & Care Economy',
    category: 'Healthcare',
    courseCount: '910+ courses',
    subtitle: 'Clinical informatics, community care leadership, and allied health support.',
    image: '/src/assets/images/course_healthcare_care_1795062668385.jpg',
  },
  {
    id: 'track-leadership',
    title: 'Business & Executive Leadership',
    category: 'Business & Management',
    courseCount: '3,150+ courses',
    subtitle: 'Strategic finance, agile project delivery, digital commerce, and people management.',
    image: '/src/assets/images/course_business_leadership_1795062669019.jpg',
  },
];

export const CATEGORIES: CourseCategory[] = [
  'Info & Communications',
  'Business & Management',
  'Sustainability',
  'Healthcare',
  'Workplace Safety & Health',
  'Engineering',
  'Training & Adult Ed',
];

export const PROVIDERS: string[] = [
  'NUS-ISS',
  'NTU PaCE',
  'SMU Academy',
  'Singapore Polytechnic',
  'Ngee Ann Polytechnic',
  'NTUC LearningHub',
  'Eversafe Academy',
  'Lithan Academy',
];

export const SCHEMES: SkillsFutureScheme[] = [
  'SkillsFuture Credit',
  'Mid-Career Enhanced Subsidy',
  'Level-Up Programme (40+)',
  'Workfare Training Support',
];

export const TRAINING_MODES: TrainingMode[] = [
  'Classroom',
  'Synchronised E-Learning',
  'Asynchronous E-Learning',
  'Blended',
];

export const COURSES: Course[] = [
  {
    id: 'crs-001',
    referenceNumber: 'TGS-2024041822',
    title: 'Generative AI & Prompt Engineering for Enterprise Productivity',
    provider: 'National University of Singapore (NUS-ISS)',
    providerShort: 'NUS-ISS',
    category: 'Info & Communications',
    mode: 'Classroom',
    durationHours: 24,
    durationLabel: '3 Days (24 hrs)',
    rating: 4.9,
    ratingCount: 1420,
    attendanceCount: 5310,
    fullFee: 2100,
    subsidyPercentBelow40: 70,
    subsidyPercentAbove40: 90,
    schemes: ['SkillsFuture Credit', 'Mid-Career Enhanced Subsidy', 'Level-Up Programme (40+)'],
    nextStartDate: '2026-12-08',
    upcomingDates: ['08 Dec 2026', '14 Jan 2027', '11 Feb 2027'],
    location: '25 Heng Mui Keng Terrace, Kent Ridge',
    isFeaturedAI: true,
    isTrending: true,
    image: '/src/assets/images/course_ai_tech_1795062668325.jpg',
    summary:
      'Master practical prompt architecture, retrieval-augmented workflows, and governance frameworks to deploy generative AI safely across Singapore enterprise teams.',
    objectives: [
      'Design structured system prompts and evaluation rubrics for business automation',
      'Integrate retrieval-augmented generation (RAG) over internal policy documents',
      'Apply PDPC Model AI Governance guidelines for enterprise risk mitigation',
    ],
    certification: 'NICF Certificate in Applied Generative AI (NUS-ISS)',
  },
  {
    id: 'crs-002',
    referenceNumber: 'TGS-2023039104',
    title: 'Applied Data Analytics & Visual Storytelling with Python and Power BI',
    provider: 'Singapore Management University (SMU Academy)',
    providerShort: 'SMU Academy',
    category: 'Info & Communications',
    mode: 'Blended',
    durationHours: 32,
    durationLabel: '4 Days (32 hrs)',
    rating: 4.8,
    ratingCount: 980,
    attendanceCount: 4120,
    fullFee: 2400,
    subsidyPercentBelow40: 70,
    subsidyPercentAbove40: 90,
    schemes: ['SkillsFuture Credit', 'Mid-Career Enhanced Subsidy', 'Level-Up Programme (40+)'],
    nextStartDate: '2026-12-14',
    upcomingDates: ['14 Dec 2026', '18 Jan 2027', '22 Feb 2027'],
    location: '81 Victoria Street, Bras Basah',
    isTrending: true,
    summary:
      'Transform raw operational datasets into executive dashboards and predictive insights using Python pandas workflows and Power BI data models.',
    objectives: [
      'Clean, join, and model multi-table enterprise datasets using Python and DAX',
      'Build interactive executive KPI dashboards aligned to decision workflows',
      'Present statistical findings with clear visual hierarchy for stakeholders',
    ],
    certification: 'SMU Academy Professional Certificate in Data Analytics',
  },
  {
    id: 'crs-003',
    referenceNumber: 'TGS-2024045519',
    title: 'ESG Carbon Accounting & ISSB Sustainability Reporting',
    provider: 'Nanyang Technological University (NTU PaCE)',
    providerShort: 'NTU PaCE',
    category: 'Sustainability',
    mode: 'Synchronised E-Learning',
    durationHours: 21,
    durationLabel: '3 Days (21 hrs)',
    rating: 4.8,
    ratingCount: 645,
    attendanceCount: 2290,
    fullFee: 1950,
    subsidyPercentBelow40: 70,
    subsidyPercentAbove40: 90,
    schemes: ['SkillsFuture Credit', 'Mid-Career Enhanced Subsidy', 'Level-Up Programme (40+)'],
    nextStartDate: '2026-12-10',
    upcomingDates: ['10 Dec 2026', '21 Jan 2027'],
    location: 'Online (Live Instructor-Led)',
    isTrending: true,
    image: '/src/assets/images/course_sustainability_1795062668193.jpg',
    summary:
      'Equip sustainability practitioners and finance leaders to measure Scope 1, 2, and 3 greenhouse gas emissions and prepare SGX-compliant ISSB disclosures.',
    objectives: [
      'Quantify Scope 1, 2, and 3 GHG inventories using GHG Protocol standards',
      'Map climate transition risks under IFRS S1 and S2 reporting frameworks',
      'Establish auditable data collection controls across supply chains',
    ],
    certification: 'NTU PaCE Certificate in Sustainability Reporting',
  },
  {
    id: 'crs-004',
    referenceNumber: 'TGS-2022018433',
    title: 'WSQ Food Safety Course Level 1 (Refresher & Certification)',
    provider: 'NTUC LearningHub Pte Ltd',
    providerShort: 'NTUC LearningHub',
    category: 'Workplace Safety & Health',
    mode: 'Classroom',
    durationHours: 7.5,
    durationLabel: '1 Day (7.5 hrs)',
    rating: 4.7,
    ratingCount: 5890,
    attendanceCount: 28400,
    fullFee: 160,
    subsidyPercentBelow40: 50,
    subsidyPercentAbove40: 70,
    schemes: ['SkillsFuture Credit', 'Mid-Career Enhanced Subsidy', 'Workfare Training Support'],
    nextStartDate: '2026-11-28',
    upcomingDates: ['28 Nov 2026', '02 Dec 2026', '05 Dec 2026', '09 Dec 2026'],
    location: '73 Bras Basah Road, NTUC Trade Union House',
    isTrending: true,
    summary:
      'Mandatory SFA-recognised food hygiene certification covering safe food handling, temperature control, cross-contamination prevention, and personal hygiene.',
    objectives: [
      'Practise proper personal hygiene and handwashing protocols in F&B settings',
      'Store and thaw perishable ingredients within SFA temperature thresholds',
      'Sanitise kitchen surfaces and equipment to prevent foodborne illness',
    ],
    certification: 'WSQ Statement of Attainment (SFA Food Hygiene)',
  },
  {
    id: 'crs-005',
    referenceNumber: 'TGS-2024040211',
    title: 'Clinical Informatics & Digital Health Systems Management',
    provider: 'Ngee Ann Polytechnic (CET Academy)',
    providerShort: 'Ngee Ann Polytechnic',
    category: 'Healthcare',
    mode: 'Blended',
    durationHours: 30,
    durationLabel: '4 Weeks Part-Time (30 hrs)',
    rating: 4.9,
    ratingCount: 412,
    attendanceCount: 1580,
    fullFee: 1800,
    subsidyPercentBelow40: 70,
    subsidyPercentAbove40: 90,
    schemes: ['SkillsFuture Credit', 'Mid-Career Enhanced Subsidy', 'Level-Up Programme (40+)'],
    nextStartDate: '2026-12-16',
    upcomingDates: ['16 Dec 2026', '27 Jan 2027'],
    location: '535 Clementi Road, Block 22',
    image: '/src/assets/images/course_healthcare_care_1795062668385.jpg',
    summary:
      'Designed for nurses, allied health professionals, and healthcare administrators transitioning to interoperable EHR systems and telehealth workflows.',
    objectives: [
      'Evaluate HL7 FHIR interoperability standards in acute and community care',
      'Optimise clinical decision support workflows to reduce documentation load',
      'Maintain PDPA and healthcare cybersecurity compliance for patient records',
    ],
    certification: 'Post-Diploma Certificate Module in Digital Health (NP)',
  },
  {
    id: 'crs-006',
    referenceNumber: 'TGS-2023029910',
    title: 'Strategic Financial Management & Capital Budgeting for Leaders',
    provider: 'Singapore Management University (SMU Academy)',
    providerShort: 'SMU Academy',
    category: 'Business & Management',
    mode: 'Classroom',
    durationHours: 16,
    durationLabel: '2 Days (16 hrs)',
    rating: 4.8,
    ratingCount: 730,
    attendanceCount: 2890,
    fullFee: 1650,
    subsidyPercentBelow40: 70,
    subsidyPercentAbove40: 90,
    schemes: ['SkillsFuture Credit', 'Mid-Career Enhanced Subsidy'],
    nextStartDate: '2026-12-09',
    upcomingDates: ['09 Dec 2026', '15 Jan 2027'],
    location: '81 Victoria Street, Bras Basah',
    image: '/src/assets/images/course_business_leadership_1795062669019.jpg',
    summary:
      'Strengthen boardroom decision-making with practical frameworks in free cash flow valuation, working capital optimisation, and investment risk analysis.',
    objectives: [
      'Interpret P&L, balance sheet, and cash flow drivers across business units',
      'Evaluate capital expenditure proposals using NPV, IRR, and payback metrics',
      'Structure resilient budgets under interest rate and currency volatility',
    ],
    certification: 'SMU Executive Certificate in Financial Acumen',
  },
  {
    id: 'crs-007',
    referenceNumber: 'TGS-2021008742',
    title: 'WSQ Supervise Construction Work for Workplace Safety & Health (BCSS)',
    provider: 'Eversafe Academy Pte Ltd',
    providerShort: 'Eversafe Academy',
    category: 'Workplace Safety & Health',
    mode: 'Classroom',
    durationHours: 32,
    durationLabel: '4 Days (32 hrs)',
    rating: 4.7,
    ratingCount: 3120,
    attendanceCount: 16400,
    fullFee: 320,
    subsidyPercentBelow40: 50,
    subsidyPercentAbove40: 70,
    schemes: ['SkillsFuture Credit', 'Mid-Career Enhanced Subsidy', 'Workfare Training Support'],
    nextStartDate: '2026-12-01',
    upcomingDates: ['01 Dec 2026', '07 Dec 2026', '15 Dec 2026'],
    location: '2 Kampong Kapor Road, Little India',
    summary:
      'MOM-accredited mandatory safety supervisor certification covering Risk Assessment, Permit-to-Work systems, and WSH Act compliance at construction sites.',
    objectives: [
      'Conduct structured hazard identification and risk control matrices',
      'Implement Permit-to-Work (PTW) checks for working-at-height and confined spaces',
      'Lead daily toolbox briefings and statutory incident investigations',
    ],
    certification: 'WSQ Statement of Attainment (MOM BCSS)',
  },
  {
    id: 'crs-008',
    referenceNumber: 'TGS-2024043902',
    title: 'Specialist Diploma in Full-Stack Cloud & DevSecOps Engineering',
    provider: 'Singapore Polytechnic (PACE Academy)',
    providerShort: 'Singapore Polytechnic',
    category: 'Info & Communications',
    mode: 'Blended',
    durationHours: 180,
    durationLabel: '6 Months Part-Time (180 hrs)',
    rating: 4.9,
    ratingCount: 540,
    attendanceCount: 1920,
    fullFee: 3800,
    subsidyPercentBelow40: 70,
    subsidyPercentAbove40: 90,
    schemes: ['SkillsFuture Credit', 'Mid-Career Enhanced Subsidy', 'Level-Up Programme (40+)'],
    nextStartDate: '2027-01-11',
    upcomingDates: ['11 Jan 2027', '12 Apr 2027'],
    location: '500 Dover Road, Singapore Polytechnic',
    summary:
      'Comprehensive career-conversion diploma covering TypeScript microservices, Kubernetes orchestration, CI/CD security pipelines, and cloud-native observability.',
    objectives: [
      'Architect containerised applications on AWS and Azure with Terraform IaC',
      'Embed automated SAST/DAST security gates inside GitHub Actions pipelines',
      'Deliver a production capstone application evaluated by industry mentors',
    ],
    certification: 'Specialist Diploma in Cloud & DevSecOps (SP)',
  },
  {
    id: 'crs-009',
    referenceNumber: 'TGS-2023031507',
    title: 'WSQ Advanced Certificate in Learning and Performance (ACLP)',
    provider: 'NTUC LearningHub Pte Ltd',
    providerShort: 'NTUC LearningHub',
    category: 'Training & Adult Ed',
    mode: 'Blended',
    durationHours: 140,
    durationLabel: '4 Months Part-Time (140 hrs)',
    rating: 4.8,
    ratingCount: 1180,
    attendanceCount: 4650,
    fullFee: 3400,
    subsidyPercentBelow40: 70,
    subsidyPercentAbove40: 90,
    schemes: ['SkillsFuture Credit', 'Mid-Career Enhanced Subsidy', 'Level-Up Programme (40+)'],
    nextStartDate: '2026-12-19',
    upcomingDates: ['19 Dec 2026', '16 Jan 2027'],
    location: '73 Bras Basah Road & Online',
    summary:
      'The recognised credential for aspiring adult educators, corporate trainers, and curriculum designers delivering WSQ and CET programmes in Singapore.',
    objectives: [
      'Design competency-based learning curricula and blended e-learning modules',
      'Facilitate interactive adult workshops grounded in andragogy principles',
      'Conduct valid, reliable, and fair competency assessments',
    ],
    certification: 'WSQ Advanced Certificate in Learning and Performance (ACLP)',
  },
  {
    id: 'crs-010',
    referenceNumber: 'TGS-2024046100',
    title: 'Smart Building Automation & Green Mark Energy Management',
    provider: 'Singapore Polytechnic (PACE Academy)',
    providerShort: 'Singapore Polytechnic',
    category: 'Engineering',
    mode: 'Classroom',
    durationHours: 24,
    durationLabel: '3 Days (24 hrs)',
    rating: 4.7,
    ratingCount: 285,
    attendanceCount: 1090,
    fullFee: 1450,
    subsidyPercentBelow40: 70,
    subsidyPercentAbove40: 90,
    schemes: ['SkillsFuture Credit', 'Mid-Career Enhanced Subsidy'],
    nextStartDate: '2026-12-17',
    upcomingDates: ['17 Dec 2026', '28 Jan 2027'],
    location: '500 Dover Road, Block T14',
    summary:
      'Hands-on engineering workshop covering IoT HVAC optimisation, chiller plant efficiency auditing, and BCA Green Mark Super Low Energy standards.',
    objectives: [
      'Audit commercial HVAC and lighting power density against Green Mark criteria',
      'Configure BACnet/Modbus telemetry sensors for predictive fault detection',
      'Calculate energy savings ROI for retrofitting Singapore commercial buildings',
    ],
    certification: 'Certificate in Smart Building Energy Systems (SP)',
  },
  {
    id: 'crs-011',
    referenceNumber: 'TGS-2024042088',
    title: 'Digital Marketing Strategy, SEO & Performance Analytics',
    provider: 'Lithan Academy Pte Ltd',
    providerShort: 'Lithan Academy',
    category: 'Business & Management',
    mode: 'Asynchronous E-Learning',
    durationHours: 40,
    durationLabel: 'Self-Paced (40 hrs)',
    rating: 4.6,
    ratingCount: 840,
    attendanceCount: 3740,
    fullFee: 1200,
    subsidyPercentBelow40: 70,
    subsidyPercentAbove40: 90,
    schemes: ['SkillsFuture Credit', 'Mid-Career Enhanced Subsidy'],
    nextStartDate: null,
    upcomingDates: ['Flexible On-Demand Enrolment'],
    location: '11 Eunos Road 8, Lifelong Learning Institute',
    summary:
      'Self-paced mastery track covering technical SEO, Google Analytics 4 attribution modelling, paid search bidding, and conversion funnel optimisation.',
    objectives: [
      'Audit website crawlability, Core Web Vitals, and search intent keywords',
      'Configure GA4 conversion events and multi-channel attribution reports',
      'Plan full-funnel acquisition budgets across search and social channels',
    ],
    certification: 'NICF Professional Certificate in Digital Growth',
  },
  {
    id: 'crs-012',
    referenceNumber: 'TGS-2023037741',
    title: 'Cybersecurity Incident Response & Cloud Security Operations',
    provider: 'National University of Singapore (NUS-ISS)',
    providerShort: 'NUS-ISS',
    category: 'Info & Communications',
    mode: 'Classroom',
    durationHours: 28,
    durationLabel: '3.5 Days (28 hrs)',
    rating: 4.9,
    ratingCount: 510,
    attendanceCount: 1840,
    fullFee: 2650,
    subsidyPercentBelow40: 70,
    subsidyPercentAbove40: 90,
    schemes: ['SkillsFuture Credit', 'Mid-Career Enhanced Subsidy', 'Level-Up Programme (40+)'],
    nextStartDate: '2026-12-11',
    upcomingDates: ['11 Dec 2026', '22 Jan 2027'],
    location: '25 Heng Mui Keng Terrace, Kent Ridge',
    isFeaturedAI: false,
    summary:
      'Simulated SOC tabletop and lab exercises on threat hunting, SIEM log triage, ransomware containment, and CSA Cybersecurity Act reporting.',
    objectives: [
      'Triage suspicious telemetry alerts using MITRE ATT&CK detection playbooks',
      'Execute containment and forensic preservation across cloud workloads',
      'Coordinate statutory incident notifications under Singapore CSA guidelines',
    ],
    certification: 'NICF Certificate in Cyber Incident Response (NUS-ISS)',
  },
];
