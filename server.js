/**
 * =========================================================================
 * Fastor CRM Backend REST API (Node.js & Express)
 * =========================================================================
 * 
 * Business Logic Handled:
 * 1. Employee / Counselor Account associated with Email ID
 * 2. Prospective Client Enquiry Form (Public Lead Capture)
 * 3. Public Enquiries Pool (Unclaimed leads visible to all counselors)
 * 4. Claim System (Assigns lead exclusively to the claiming counselor,
 *    making it completely private & hidden from all other counselors)
 * =========================================================================
 */

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Database (Initial Seed Data)
let counselors = [
  { id: 'c1', name: 'Sarah Jenkins', email: 'sarah.jenkins@fastor.com', department: 'Full Stack & AI Programs', claimedCount: 2, convertedCount: 1 },
  { id: 'c2', name: 'Alex Rivera', email: 'alex.rivera@fastor.com', department: 'Cloud & DevOps Tracks', claimedCount: 1, convertedCount: 1 },
  { id: 'c3', name: 'Priya Sharma', email: 'priya.sharma@fastor.com', department: 'Product & UX Design', claimedCount: 0, convertedCount: 0 }
];

let enquiries = [
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
    message: 'Looking to transition into Full Stack with GenAI focus.',
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    isClaimed: false,
    claimedBy: null, // Counselor Email
    claimedByName: null,
    claimedAt: null,
    status: 'new'
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
    message: 'Company is sponsoring my upskilling in Kubernetes & Terraform.',
    createdAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    isClaimed: false,
    claimedBy: null,
    claimedByName: null,
    claimedAt: null,
    status: 'new'
  },
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
    message: 'Excited about building end-to-end LLM agent apps.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    isClaimed: true,
    claimedBy: 'sarah.jenkins@fastor.com',
    claimedByName: 'Sarah Jenkins',
    claimedAt: new Date(Date.now() - 1000 * 60 * 60 * 11).toISOString(),
    status: 'counseling'
  }
];

// Helper: Normalize email
const norm = (email) => (email || '').trim().toLowerCase();

/**
 * -------------------------------------------------------------------------
 * 1. COUNSELOR AUTHENTICATION / REGISTRATION (Requirement #1)
 * CRM account associated with employee/counselor by email ID
 * -------------------------------------------------------------------------
 */
app.post('/api/counselors/login', (req, res) => {
  const { email, name, department } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email ID is required.' });
  }

  const cleanEmail = norm(email);
  let counselor = counselors.find(c => norm(c.email) === cleanEmail);

  if (!counselor) {
    counselor = {
      id: 'c_' + Date.now(),
      name: name || cleanEmail.split('@')[0],
      email: cleanEmail,
      department: department || 'General Admissions',
      claimedCount: 0,
      convertedCount: 0
    };
    counselors.push(counselor);
  }

  res.json({ success: true, counselor });
});

app.get('/api/counselors', (req, res) => {
  res.json({ success: true, counselors });
});

/**
 * -------------------------------------------------------------------------
 * 2. PROSPECTIVE CLIENT ENQUIRY FORM SUBMISSION (Requirement #2)
 * Online lead capture or direct entry by counselor after a call
 * -------------------------------------------------------------------------
 */
app.post('/api/enquiries', (req, res) => {
  const { name, email, phone, courseInterest, source, urgency, experience, preferredBatch, message } = req.body;

  if (!name || !email || !courseInterest) {
    return res.status(400).json({ success: false, message: 'Name, email, and course interest are required.' });
  }

  const newEnquiry = {
    id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
    name: name.trim(),
    email: norm(email),
    phone: phone || '',
    courseInterest,
    source: source || 'Website Public Enquiry Form',
    urgency: urgency || 'medium',
    experience: experience || 'Not specified',
    preferredBatch: preferredBatch || 'Flexible',
    message: message || '',
    createdAt: new Date().toISOString(),
    isClaimed: false,
    claimedBy: null,
    claimedByName: null,
    claimedAt: null,
    status: 'new'
  };

  enquiries.unshift(newEnquiry);
  res.status(201).json({ success: true, enquiry: newEnquiry });
});

/**
 * -------------------------------------------------------------------------
 * 3. PUBLIC ENQUIRIES POOL (Requirement #3)
 * Visible to ALL counselors inside the CRM (Only unclaimed enquiries)
 * -------------------------------------------------------------------------
 */
app.get('/api/enquiries/public', (req, res) => {
  const publicLeads = enquiries.filter(e => !e.isClaimed);
  res.json({
    success: true,
    count: publicLeads.length,
    enquiries: publicLeads
  });
});

/**
 * -------------------------------------------------------------------------
 * 4. CLAIM ENQUIRY (Requirement #4)
 * Assigns to only this counselor; enquiry becomes private & no longer
 * publically visible to any other employee.
 * -------------------------------------------------------------------------
 */
app.post('/api/enquiries/:id/claim', (req, res) => {
  const { id } = req.params;
  const { counselorEmail, counselorName } = req.body;

  if (!counselorEmail) {
    return res.status(400).json({ success: false, message: 'counselorEmail is required to claim an enquiry.' });
  }

  const cleanEmail = norm(counselorEmail);
  const enquiry = enquiries.find(e => e.id === id);

  if (!enquiry) {
    return res.status(404).json({ success: false, message: 'Enquiry not found.' });
  }

  if (enquiry.isClaimed) {
    return res.status(409).json({
      success: false,
      message: `Enquiry already claimed by ${enquiry.claimedByName || enquiry.claimedBy}`
    });
  }

  // Claim logic: locks to this counselor
  enquiry.isClaimed = true;
  enquiry.claimedBy = cleanEmail;
  enquiry.claimedByName = counselorName || cleanEmail.split('@')[0];
  enquiry.claimedAt = new Date().toISOString();
  enquiry.status = 'contacted';

  // Increment counselor metric
  const counselor = counselors.find(c => norm(c.email) === cleanEmail);
  if (counselor) counselor.claimedCount = (counselor.claimedCount || 0) + 1;

  res.json({
    success: true,
    message: `Enquiry ${id} successfully claimed and made private to ${cleanEmail}`,
    enquiry
  });
});

/**
 * -------------------------------------------------------------------------
 * 5. COUNSELOR'S PRIVATE ENQUIRIES
 * Returns only enquiries claimed by this counselor
 * -------------------------------------------------------------------------
 */
app.get('/api/enquiries/my-enquiries', (req, res) => {
  const { counselorEmail } = req.query;
  if (!counselorEmail) {
    return res.status(400).json({ success: false, message: 'counselorEmail query param is required.' });
  }

  const cleanEmail = norm(counselorEmail);
  const myLeads = enquiries.filter(e => e.isClaimed && norm(e.claimedBy) === cleanEmail);

  res.json({
    success: true,
    counselorEmail: cleanEmail,
    count: myLeads.length,
    enquiries: myLeads
  });
});

/**
 * -------------------------------------------------------------------------
 * 6. UPDATE LEAD STATUS
 * -------------------------------------------------------------------------
 */
app.put('/api/enquiries/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, counselorEmail } = req.body;

  const enquiry = enquiries.find(e => e.id === id);
  if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found.' });

  // Verify ownership
  if (counselorEmail && norm(enquiry.claimedBy) !== norm(counselorEmail)) {
    return res.status(403).json({ success: false, message: 'Unauthorized: Lead belongs to another counselor.' });
  }

  enquiry.status = status;
  res.json({ success: true, enquiry });
});

/**
 * -------------------------------------------------------------------------
 * 7. RELEASE LEAD BACK TO PUBLIC POOL
 * -------------------------------------------------------------------------
 */
app.post('/api/enquiries/:id/release', (req, res) => {
  const { id } = req.params;
  const { counselorEmail } = req.body;

  const enquiry = enquiries.find(e => e.id === id);
  if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found.' });

  if (counselorEmail && norm(enquiry.claimedBy) !== norm(counselorEmail)) {
    return res.status(403).json({ success: false, message: 'Unauthorized: Only the assigned counselor can release this lead.' });
  }

  enquiry.isClaimed = false;
  enquiry.claimedBy = null;
  enquiry.claimedByName = null;
  enquiry.claimedAt = null;
  enquiry.status = 'new';

  res.json({ success: true, message: `Enquiry ${id} released back to public pool.`, enquiry });
});

// Root endpoint with API Documentation
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>NexusCRM REST API</title></head>
      <body style="font-family: system-ui; padding: 2rem; line-height: 1.6; max-width: 800px; margin: auto;">
        <h1>Fastor CRM Backend REST API (Node.js & Express)</h1>
        <p>REST API endpoints fulfilling CRM Business Logic:</p>
        <ul>
          <li><strong>POST /api/counselors/login</strong> - Authenticate/associate counselor by email ID</li>
          <li><strong>GET /api/counselors</strong> - List all counselor accounts</li>
          <li><strong>POST /api/enquiries</strong> - Submit prospective client enquiry (Capture form)</li>
          <li><strong>GET /api/enquiries/public</strong> - Get all unclaimed public enquiries</li>
          <li><strong>POST /api/enquiries/:id/claim</strong> - Claim an enquiry (converts to private lead)</li>
          <li><strong>GET /api/enquiries/my-enquiries?counselorEmail=...</strong> - Get counselor's private leads</li>
          <li><strong>PUT /api/enquiries/:id/status</strong> - Update lead pipeline status</li>
          <li><strong>POST /api/enquiries/:id/release</strong> - Release lead back to public pool</li>
        </ul>
      </body>
    </html>
  `);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Fastor CRM REST API running at http://localhost:${PORT}`);
  });
}

export default app;
