export const INITIAL_COUNSELORS = [
  {
    id: 'c1',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@fastor.com',
    role: 'Senior Academic Counselor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    department: 'Full Stack & AI Programs',
    phone: '+1 (555) 234-5678',
    status: 'online',
    claimedCount: 2,
    convertedCount: 1,
  },
  {
    id: 'c2',
    name: 'Alex Rivera',
    email: 'alex.rivera@fastor.com',
    role: 'Technical Admissions Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'Cloud & DevOps Tracks',
    phone: '+1 (555) 345-6789',
    status: 'online',
    claimedCount: 1,
    convertedCount: 1,
  },
  {
    id: 'c3',
    name: 'Priya Sharma',
    email: 'priya.sharma@fastor.com',
    role: 'Career Strategy Specialist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    department: 'Product & UX Design',
    phone: '+1 (555) 456-7890',
    status: 'online',
    claimedCount: 0,
    convertedCount: 0,
  },
  {
    id: 'c4',
    name: 'David Kim',
    email: 'david.kim@fastor.com',
    role: 'Enterprise Cohort Advisor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    department: 'Data Science & Analytics',
    phone: '+1 (555) 567-8901',
    status: 'offline',
    claimedCount: 1,
    convertedCount: 0,
  }
];

export const COURSES = [
  { id: 'fs-ai', name: 'Full-Stack GenAI & Web Architecture', code: 'FS-AI-2026', color: 'indigo', duration: '24 Weeks' },
  { id: 'cloud-devops', name: 'Cloud Native & DevOps Engineering', code: 'DEV-OPS-401', color: 'sky', duration: '18 Weeks' },
  { id: 'data-ml', name: 'Applied AI & Data Science Mastery', code: 'DATA-ML-301', color: 'emerald', duration: '20 Weeks' },
  { id: 'prod-mgmt', name: 'Technical Product Management', code: 'TPM-500', color: 'amber', duration: '14 Weeks' },
  { id: 'ui-ux', name: 'Next-Gen UI/UX & Design Systems', code: 'DS-202', color: 'purple', duration: '12 Weeks' },
  { id: 'cyber', name: 'Enterprise Cybersecurity & Zero Trust', code: 'SEC-600', color: 'rose', duration: '16 Weeks' },
];

export const INITIAL_ENQUIRIES = [
  // PUBLIC UNCLAIMED ENQUIRIES (Visible to ALL counselors in the public pool)
  {
    id: 'ENQ-8901',
    name: 'Rohan Mehra',
    email: 'rohan.mehra@gmail.com',
    phone: '+91 98765 43210',
    courseInterest: 'Full-Stack GenAI & Web Architecture',
    source: 'Website Public Enquiry Form',
    urgency: 'high',
    experience: 'Junior Developer (1 yr exp)',
    preferredBatch: 'Weekend Cohort',
    message: 'Looking to transition into Full Stack with GenAI focus. Want to know scholarship availability and mentor-to-student ratio.',
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(), // 18 mins ago
    isClaimed: false,
    claimedBy: null, // counselor email
    claimedByName: null,
    claimedAt: null,
    status: 'new',
    notes: [
      { id: 'n1', text: 'Lead captured via prospective student landing page.', author: 'System', date: new Date(Date.now() - 1000 * 60 * 18).toISOString() }
    ],
    timeline: [
      { action: 'Enquiry Submitted', by: 'Rohan Mehra', date: new Date(Date.now() - 1000 * 60 * 18).toISOString(), type: 'submit' }
    ]
  },
  {
    id: 'ENQ-8902',
    name: 'Emily Watson',
    email: 'emily.watson@techcorp.io',
    phone: '+1 (415) 890-1234',
    courseInterest: 'Cloud Native & DevOps Engineering',
    source: 'Direct Phone Referral (Counselor Shared)',
    urgency: 'medium',
    experience: 'SysAdmin (3 yrs exp)',
    preferredBatch: 'Weekday Evening',
    message: 'Company is sponsoring my upskilling in Kubernetes & Terraform. Need syllabus brochure sent over PDF.',
    createdAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(), // 42 mins ago
    isClaimed: false,
    claimedBy: null,
    claimedByName: null,
    claimedAt: null,
    status: 'new',
    notes: [
      { id: 'n2', text: 'Corporate sponsorship inquiry. High lead potential.', author: 'System', date: new Date(Date.now() - 1000 * 60 * 42).toISOString() }
    ],
    timeline: [
      { action: 'Enquiry Submitted', by: 'Emily Watson', date: new Date(Date.now() - 1000 * 60 * 42).toISOString(), type: 'submit' }
    ]
  },
  {
    id: 'ENQ-8903',
    name: 'Ananya Deshmukh',
    email: 'ananya.desh@outlook.com',
    phone: '+91 97654 32109',
    courseInterest: 'Next-Gen UI/UX & Design Systems',
    source: 'Website Public Enquiry Form',
    urgency: 'high',
    experience: 'Graphic Designer switching to UI/UX',
    preferredBatch: 'Weekend Cohort',
    message: 'I want to build a portfolio for international remote roles. Does this include live design sprint projects?',
    createdAt: new Date(Date.now() - 1000 * 60 * 95).toISOString(), // 1.5 hrs ago
    isClaimed: false,
    claimedBy: null,
    claimedByName: null,
    claimedAt: null,
    status: 'new',
    notes: [
      { id: 'n3', text: 'Portfolio review requested by candidate.', author: 'System', date: new Date(Date.now() - 1000 * 60 * 95).toISOString() }
    ],
    timeline: [
      { action: 'Enquiry Submitted', by: 'Ananya Deshmukh', date: new Date(Date.now() - 1000 * 60 * 95).toISOString(), type: 'submit' }
    ]
  },
  {
    id: 'ENQ-8904',
    name: 'Lucas Silva',
    email: 'lucas.silva@coder.br',
    phone: '+55 11 91234-5678',
    courseInterest: 'Applied AI & Data Science Mastery',
    source: 'Shared Link from Counselor Call',
    urgency: 'low',
    experience: 'Final Year Computer Science Undergrad',
    preferredBatch: 'Fast-Track Bootcamp',
    message: 'Interested in machine learning research tracks and capstone paper publication assistance.',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hrs ago
    isClaimed: false,
    claimedBy: null,
    claimedByName: null,
    claimedAt: null,
    status: 'new',
    notes: [
      { id: 'n4', text: 'Student from University of Sao Paulo, seeking research track.', author: 'System', date: new Date(Date.now() - 1000 * 60 * 180).toISOString() }
    ],
    timeline: [
      { action: 'Enquiry Submitted', by: 'Lucas Silva', date: new Date(Date.now() - 1000 * 60 * 180).toISOString(), type: 'submit' }
    ]
  },
  {
    id: 'ENQ-8905',
    name: 'Marcus Vance',
    email: 'marcus.vance@fintech.net',
    phone: '+1 (617) 555-0199',
    courseInterest: 'Enterprise Cybersecurity & Zero Trust',
    source: 'Website Public Enquiry Form',
    urgency: 'high',
    experience: 'IT Support Specialist',
    preferredBatch: 'Weekday Evening',
    message: 'Urgent: Looking to clear SOC2 & CompTIA Security+ certifications before Q2. Can counselor call today at 4 PM EST?',
    createdAt: new Date(Date.now() - 1000 * 60 * 220).toISOString(), // ~3.5 hrs ago
    isClaimed: false,
    claimedBy: null,
    claimedByName: null,
    claimedAt: null,
    status: 'new',
    notes: [
      { id: 'n5', text: 'Urgent callback requested for 4 PM EST.', author: 'System', date: new Date(Date.now() - 1000 * 60 * 220).toISOString() }
    ],
    timeline: [
      { action: 'Enquiry Submitted', by: 'Marcus Vance', date: new Date(Date.now() - 1000 * 60 * 220).toISOString(), type: 'submit' }
    ]
  },

  // CLAIMED (PRIVATE) ENQUIRIES — CLAIMED BY SARAH JENKINS
  {
    id: 'ENQ-8890',
    name: 'Aarav Patel',
    email: 'aarav.patel@startup.io',
    phone: '+91 99887 76655',
    courseInterest: 'Full-Stack GenAI & Web Architecture',
    source: 'Website Public Enquiry Form',
    urgency: 'high',
    experience: 'Frontend React Dev (2 yrs)',
    preferredBatch: 'Weekend Cohort',
    message: 'Excited about building end-to-end LLM agent apps. Spoke with colleague who recommended Sarah Jenkins.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    isClaimed: true,
    claimedBy: 'sarah.jenkins@fastor.com',
    claimedByName: 'Sarah Jenkins',
    claimedAt: new Date(Date.now() - 1000 * 60 * 60 * 11).toISOString(),
    status: 'counseling',
    notes: [
      { id: 'n8890_1', text: 'Lead claimed from Public Pool.', author: 'Sarah Jenkins', date: new Date(Date.now() - 1000 * 60 * 60 * 11).toISOString() },
      { id: 'n8890_2', text: 'Completed initial screening call. Student is highly motivated. Sent curriculum roadmap. Scheduled 1-on-1 counseling demo for tomorrow 3 PM.', author: 'Sarah Jenkins', date: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString() }
    ],
    timeline: [
      { action: 'Enquiry Submitted', by: 'Aarav Patel', date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), type: 'submit' },
      { action: 'Claimed Lead (Made Private)', by: 'Sarah Jenkins', date: new Date(Date.now() - 1000 * 60 * 60 * 11).toISOString(), type: 'claim' },
      { action: 'Status changed to Counseling Scheduled', by: 'Sarah Jenkins', date: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), type: 'status' }
    ]
  },
  {
    id: 'ENQ-8884',
    name: 'Kavita Iyer',
    email: 'kavita.iyer@globaltech.com',
    phone: '+91 91234 56789',
    courseInterest: 'Technical Product Management',
    source: 'Shared Link from Counselor Call',
    urgency: 'medium',
    experience: 'Associate PM (1.5 yrs)',
    preferredBatch: 'Weekday Evening',
    message: 'Need help preparing for FAANG APM interviews with case studies.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    isClaimed: true,
    claimedBy: 'sarah.jenkins@fastor.com',
    claimedByName: 'Sarah Jenkins',
    claimedAt: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
    status: 'enrolled',
    notes: [
      { id: 'n8884_1', text: 'Candidate successfully enrolled in June cohort! Fee received.', author: 'Sarah Jenkins', date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() }
    ],
    timeline: [
      { action: 'Enquiry Submitted', by: 'Kavita Iyer', date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), type: 'submit' },
      { action: 'Claimed Lead (Made Private)', by: 'Sarah Jenkins', date: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), type: 'claim' },
      { action: 'Converted & Enrolled', by: 'Sarah Jenkins', date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), type: 'convert' }
    ]
  },

  // CLAIMED (PRIVATE) ENQUIRY — CLAIMED BY ALEX RIVERA
  {
    id: 'ENQ-8879',
    name: 'Devon Miller',
    email: 'devon.miller@cloudops.org',
    phone: '+1 (206) 555-4321',
    courseInterest: 'Cloud Native & DevOps Engineering',
    source: 'Website Public Enquiry Form',
    urgency: 'high',
    experience: 'DevOps Intern',
    preferredBatch: 'Fast-Track Bootcamp',
    message: 'Looking for hands-on AWS EKS & ArgoCD GitOps training.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    isClaimed: true,
    claimedBy: 'alex.rivera@fastor.com',
    claimedByName: 'Alex Rivera',
    claimedAt: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString(),
    status: 'contacted',
    notes: [
      { id: 'n8879_1', text: 'Alex claimed enquiry. Dropped WhatsApp intro message.', author: 'Alex Rivera', date: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString() }
    ],
    timeline: [
      { action: 'Enquiry Submitted', by: 'Devon Miller', date: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), type: 'submit' },
      { action: 'Claimed Lead (Made Private)', by: 'Alex Rivera', date: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString(), type: 'claim' },
      { action: 'Contacted via WhatsApp', by: 'Alex Rivera', date: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString(), type: 'status' }
    ]
  }
];
