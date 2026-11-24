export type CurrencyCode = 'BHD' | 'USD' | 'AED' | 'SAR' | 'QAR';

export const CURRENCY_RATES: Record<CurrencyCode, number> = {
  BHD: 1,
  USD: 2.66,
  AED: 9.79,
  SAR: 9.97,
  QAR: 9.68,
};

export function formatMoney(bhdAmount: number, currency: CurrencyCode): string {
  const val = bhdAmount * CURRENCY_RATES[currency];
  if (currency === 'BHD') {
    return `BHD ${Number.isInteger(val) ? val.toLocaleString('en-US') : val.toFixed(3)}`;
  }
  return `${currency} ${Math.round(val).toLocaleString('en-US')}`;
}

export const HERO_UNITS = [
  { unit: 'Building A, Unit 12', amountBhd: 450, status: 'Paid' as const },
  { unit: 'Building B, Unit 3', amountBhd: 380, status: 'Paid' as const },
  { unit: 'Building C, Suite 5', amountBhd: 620, status: 'Due' as const },
  { unit: 'Building D, Unit 8', amountBhd: 350, status: 'Overdue' as const },
];

export const GCC_REGIONS = [
  'Bahrain',
  'Saudi Arabia',
  'the UAE',
  'Qatar',
  'Kuwait',
  'Oman',
  'the GCC and beyond',
];

export const CURRENCY_TICKER: Array<{ label: string; selectable?: CurrencyCode }> = [
  { label: 'BHD', selectable: 'BHD' },
  { label: 'AED', selectable: 'AED' },
  { label: 'SAR', selectable: 'SAR' },
  { label: 'QAR', selectable: 'QAR' },
  { label: 'KWD' },
  { label: 'OMR' },
  { label: 'USD', selectable: 'USD' },
  { label: 'EUR' },
  { label: 'GBP' },
  { label: 'and more' },
];

export interface RoleItem {
  tabLabel: string;
  heading: string;
  description: string;
  bullets: string[];
  cardHeader: string;
  rows: Array<{
    title: string;
    subtitle: string;
    badge: string;
    tone: 'paid' | 'warn' | 'info' | 'danger';
  }>;
}

export const ROLES: RoleItem[] = [
  {
    tabLabel: 'Landlord',
    heading: 'For landlords',
    description:
      'Keep your own rental income organised without spreadsheets or chasing messages.',
    bullets: [
      'Rent invoices created and sent automatically',
      'Payment reminders before and after the due date',
      'Every tenant, lease and document in one place',
      'A clear monthly view of what came in and what is outstanding',
    ],
    cardHeader: 'THIS MONTH',
    rows: [
      { title: 'Flat 12, Building A', subtitle: 'Rent due 1 Dec', badge: 'Paid', tone: 'paid' },
      { title: 'Shop 3, Building C', subtitle: 'Rent due 5 Dec', badge: 'Reminder sent', tone: 'warn' },
      { title: 'Villa 7', subtitle: 'Lease ends 14 Jan', badge: 'Renew', tone: 'info' },
    ],
  },
  {
    tabLabel: 'Property manager',
    heading: 'For property managers',
    description:
      'Run many buildings and owners from one screen, with your team working in the same system.',
    bullets: [
      'Multiple buildings, owners and currencies in one account',
      'Maintenance tickets assigned and tracked to completion',
      'Owner statements and reports without manual work',
      'Team roles so each person sees what they need',
    ],
    cardHeader: 'TODAY ACROSS 4 BUILDINGS',
    rows: [
      { title: 'AC not cooling · Unit 12', subtitle: 'Assigned to technician', badge: 'High', tone: 'danger' },
      { title: 'Water leak · Suite 5', subtitle: 'Awaiting parts', badge: 'Medium', tone: 'warn' },
      { title: 'Owner report · Building B', subtitle: 'Ready to send', badge: 'Ready', tone: 'paid' },
    ],
  },
  {
    tabLabel: 'Real estate agency',
    heading: 'For real estate agencies',
    description:
      'Look professional to owners and tenants while your team handles more properties.',
    bullets: [
      'Owner and tenant records kept separate and tidy',
      'Contracts, renewals and vacancies tracked in one view',
      'Branded invoices and statements for your clients',
      'Reports you can share with owners in a few clicks',
    ],
    cardHeader: 'PORTFOLIO OVERVIEW',
    rows: [
      { title: '3 vacant units', subtitle: 'Ready to list', badge: 'Vacant', tone: 'info' },
      { title: '5 renewals due', subtitle: 'Next 60 days', badge: 'Follow up', tone: 'warn' },
      { title: 'Owner statements', subtitle: 'Generated for November', badge: 'Done', tone: 'paid' },
    ],
  },
];

export const CHALLENGE_PAIRS = [
  { before: 'Rent tracked in spreadsheets', after: 'Auto invoices and receipts' },
  { before: 'Chasing late payments by hand', after: 'Automatic reminders' },
  { before: 'Paper leases and lost paperwork', after: 'E-signature agreements' },
  { before: 'Maintenance requests by phone', after: 'Technician portal' },
  { before: 'No clear view across buildings', after: 'One live dashboard' },
];

export const CHALLENGE_STATS = [
  { value: '14 days', label: 'Free trial', note: 'No credit card required.' },
  { value: 'All', label: 'Features on every plan', note: 'Only your limits change.' },
  { value: '3', label: 'Portals', note: 'Owner, tenant and technician.' },
  { value: '2 months', label: 'Free on yearly plans', note: 'Pay for 10, use 12.' },
];

export const FEATURES_LIST = [
  {
    title: 'E-signature agreements',
    description: 'Send leases for signature and keep signed copies with the tenancy.',
  },
  {
    title: 'Auto invoices and reminders',
    description:
      'Monthly invoices are created for you, with email reminders before and after the due date.',
  },
  {
    title: 'Instant PDF receipts',
    description: 'A receipt is ready as soon as a payment is confirmed.',
  },
  {
    title: 'Tenant portal',
    description: 'Tenants view invoices, contracts and requests in their own login.',
  },
  {
    title: 'Technician field portal',
    description: 'Assign jobs and let technicians update them from the field.',
  },
  {
    title: 'Bulk CSV import',
    description: 'Bring your existing units and tenants in from a spreadsheet.',
  },
  {
    title: 'Proposal to signed lease',
    description: 'Move from proposal to signed agreement in one flow.',
  },
  {
    title: 'AI agents and engine',
    description: 'AI-assisted reports and insights across your portfolio.',
  },
  {
    title: 'Audit logs and custom roles',
    description: 'See who did what, and give each team member the access they need.',
  },
];

export interface ProductTourTab {
  label: string;
  heading: string;
  description: string;
  cardTitle: string;
  getRows: (currency: CurrencyCode) => Array<{
    label: string;
    value: string;
    tone: 'good' | 'warn' | 'danger' | 'neutral';
  }>;
}

export const PRODUCT_TOUR_TABS: ProductTourTab[] = [
  {
    label: 'Portfolio',
    heading: 'Your whole portfolio at a glance',
    description:
      'Occupancy, income and overdue amounts across every building, in the currency you choose.',
    cardTitle: 'Portfolio overview',
    getRows: (currency) => [
      { label: 'Buildings', value: '3', tone: 'neutral' },
      { label: 'Occupied units', value: '47 of 50', tone: 'neutral' },
      { label: 'Collected this month', value: formatMoney(18450, currency), tone: 'good' },
      { label: 'Overdue', value: formatMoney(1260, currency), tone: 'warn' },
    ],
  },
  {
    label: 'Invoices',
    heading: 'Invoices that send themselves',
    description:
      'Monthly rent invoices are generated automatically and reminders go out by email.',
    cardTitle: 'Invoices',
    getRows: () => [
      { label: 'INV-1042 · Building A', value: 'Paid', tone: 'good' },
      { label: 'INV-1043 · Building B', value: 'Paid', tone: 'good' },
      { label: 'INV-1044 · Building C', value: 'Due in 3 days', tone: 'warn' },
      { label: 'INV-1038 · Building D', value: 'Overdue', tone: 'danger' },
    ],
  },
  {
    label: 'Maintenance',
    heading: 'Maintenance without the phone calls',
    description:
      'Tenants raise requests, technicians get the job in their field portal.',
    cardTitle: 'Maintenance requests',
    getRows: () => [
      { label: 'Leaking tap · Unit 12', value: 'In progress', tone: 'warn' },
      { label: 'AC service · Suite 5', value: 'Scheduled', tone: 'neutral' },
      { label: 'Door lock · Unit 3', value: 'Done', tone: 'good' },
    ],
  },
  {
    label: 'Leases',
    heading: 'Leases, signed and organized',
    description:
      'Alerts before a lease ends, with every signed agreement stored with the tenancy.',
    cardTitle: 'Leases',
    getRows: () => [
      { label: 'Unit 12 · ends in 58 days', value: 'Renew', tone: 'warn' },
      { label: 'Suite 5 · ends in 140 days', value: 'Active', tone: 'good' },
      { label: 'Unit 3 · awaiting signature', value: 'Sent', tone: 'neutral' },
    ],
  },
];

export const DAY_TIMELINE = [
  {
    time: '8:00',
    tag: 'Reminders',
    title: 'Rent reminders go out',
    description: 'Tenants with invoices due this week get a reminder automatically.',
    tone: 'indigo' as const,
  },
  {
    time: '10:30',
    tag: 'Payment',
    title: 'A payment comes in',
    description: 'The invoice is marked paid and the collections total updates.',
    tone: 'paid' as const,
  },
  {
    time: '12:15',
    tag: 'Maintenance',
    title: 'A tenant reports a leak',
    description: 'The request becomes a ticket and goes to your technician.',
    tone: 'warn' as const,
  },
  {
    time: '15:00',
    tag: 'Lease',
    title: 'A lease nears its end',
    description: 'You see it in the expiring list and can start the renewal.',
    tone: 'purple' as const,
  },
  {
    time: '17:30',
    tag: 'Report',
    title: 'Owner report is ready',
    description: 'The month so far, summarised and ready to share.',
    tone: 'neutral' as const,
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Add your properties',
    description:
      'Create buildings and units yourself, or import them from a CSV in a few clicks.',
  },
  {
    step: '02',
    title: 'Invite your tenants',
    description: 'Send invitations so tenants can join with their own portal.',
  },
  {
    step: '03',
    title: 'Start managing everything',
    description: 'Invoices, contracts, maintenance and AI insights in one place.',
  },
];

export const PDPL_PRINCIPLES = [
  {
    number: '01',
    title: 'Lawfulness, Fairness and Transparency',
    detail:
      'Personal data is processed lawfully and transparently for tenancy agreements, invoicing, and maintenance workflows under Bahrain Law No. 30 of 2018 (PDPL).',
  },
  {
    number: '02',
    title: 'Purpose Limitation',
    detail:
      'Tenant, owner, and technician records are collected strictly for property operations, lease management, and rent reconciliation—never repurposed or sold.',
  },
  {
    number: '03',
    title: 'Data Minimisation',
    detail:
      'Only information necessary to manage units, electronic lease agreements, and billing is collected and visible to authorised roles.',
  },
  {
    number: '04',
    title: 'Accuracy',
    detail:
      'Each organization maintains accurate, up-to-date tenant contact records, lease terms, and payment ledgers with full audit history.',
  },
  {
    number: '05',
    title: 'Storage Limitation',
    detail:
      'Records are retained strictly in line with statutory tenancy and financial obligations, with clear organization-level data separation.',
  },
  {
    number: '06',
    title: 'Integrity and Confidentiality',
    detail:
      'Protected with TLS encryption in transit, encrypted storage at rest, role-based access control, audit logs, and encrypted invoice links.',
  },
];

export interface PricingTier {
  id: 'starter' | 'growth' | 'pro';
  name: string;
  fit: string;
  monthlyBhd: number;
  yearlyPerMonthBhd: number;
  yearlyTotalBhd: number;
  popular?: boolean;
  limits: {
    units: number;
    tenants: number;
    technicians: number;
    seats: number;
    orgsBuildings: string;
  };
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    fit: 'One building, getting started',
    monthlyBhd: 15,
    yearlyPerMonthBhd: 12.5,
    yearlyTotalBhd: 150,
    limits: {
      units: 15,
      tenants: 30,
      technicians: 2,
      seats: 1,
      orgsBuildings: '1 / 1',
    },
  },
  {
    id: 'growth',
    name: 'Growth',
    fit: 'Most landlords start here',
    monthlyBhd: 39,
    yearlyPerMonthBhd: 32.5,
    yearlyTotalBhd: 390,
    popular: true,
    limits: {
      units: 60,
      tenants: 120,
      technicians: 5,
      seats: 3,
      orgsBuildings: '3 / 3',
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    fit: 'For growing agencies',
    monthlyBhd: 89,
    yearlyPerMonthBhd: 74.2,
    yearlyTotalBhd: 890,
    limits: {
      units: 200,
      tenants: 400,
      technicians: 15,
      seats: 10,
      orgsBuildings: '10 / 10',
    },
  },
];

export const PLAN_INCLUSIONS = [
  'E-signature agreements',
  'Auto invoices and reminders',
  'Instant PDF receipts',
  'Tenant portal',
  'Technician field portal',
  'Bulk CSV import',
  'Proposal to signed lease',
  'AI agents and AI engine',
  'Audit logs',
  'Custom roles',
];

export const ENTERPRISE_CHECKS = [
  'Custom limits',
  'Approval workflows',
  'Custom SLA agreement',
  'Role-based access',
];

export const FAQ_ITEMS = [
  {
    q: 'Which currencies can I use?',
    a: 'Manzil is built for portfolios across the GCC and beyond. Plans are priced in BHD, and the prices shown in other currencies are indicative.',
  },
  {
    q: 'Do I need a credit card to start?',
    a: 'No. Start a 14-day free trial without a credit card.',
  },
  {
    q: 'Do you set up my properties for me?',
    a: 'No. Adding buildings, units and tenants is quick and you do it yourself, or import everything from a CSV.',
  },
  {
    q: 'What does the yearly plan include?',
    a: 'Every yearly plan includes 2 months free: you pay for 10 months and use 12.',
  },
  {
    q: 'Can I change plans later?',
    a: 'Yes. Upgrade or downgrade any time. Only your limits change, never your features.',
  },
];

export const INITIAL_DASHBOARD_INVOICES = [
  { id: 1, tenant: 'Oliver Grant', unit: 'Building A, Unit 12', amount: 100, status: 'overdue' as const, days: 6 },
  { id: 2, tenant: 'Emma Walker', unit: 'Building B, Unit 3', amount: 50, status: 'overdue' as const, days: 2 },
  { id: 3, tenant: 'Liam Brooks', unit: 'Building C, Suite 5', amount: 150, status: 'due' as const, days: 5 },
  { id: 4, tenant: 'Sophia Hayes', unit: 'Building D, Unit 8', amount: 100, status: 'due' as const, days: 12 },
];

export const INITIAL_DASHBOARD_TICKETS = [
  { id: 1, title: 'AC not cooling', unit: 'Building A, Unit 12', priority: 'High' as const },
  { id: 2, title: 'Water leak', unit: 'Building C, Suite 5', priority: 'Medium' as const },
  { id: 3, title: 'Gate remote not working', unit: 'Building D', priority: 'Low' as const },
];

export const CASHFLOW_MONTHS = [
  { month: 'Jun', invoiced: 3400, collected: 3200, expenses: 640 },
  { month: 'Jul', invoiced: 3600, collected: 3400, expenses: 700 },
  { month: 'Aug', invoiced: 3500, collected: 3100, expenses: 610 },
  { month: 'Sep', invoiced: 3800, collected: 3600, expenses: 760 },
  { month: 'Oct', invoiced: 3900, collected: 3500, expenses: 720 },
  { month: 'Nov', invoiced: 4600, collected: 4200, expenses: 780 },
];
