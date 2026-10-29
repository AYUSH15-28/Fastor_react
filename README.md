# NexusCRM — High-Performance Admissions & Lead Distribution CRM

> **Assessment Task:** Customer Relationship Management (CRM) System with Counselor Accounts, Public Enquiries Pool, and Private Claim Isolation.  
> **Tech Stack:** React 19, Vite, Tailwind CSS v4, Lucide Icons, Canvas Confetti, Web Audio API Synthesizer, Node.js & Express REST API.

---

## 🌟 Executive Summary & Business Logic Implementation

| Requirement | Implementation in System |
| :--- | :--- |
| **1. Counselor Account tied to Email ID** | Every counselor profile is strictly keyed to their corporate email ID (e.g. `sarah.jenkins@fastor.com`, `alex.rivera@fastor.com`). Counselors can be switched with 1 click or authenticated with any custom employee email. |
| **2. Prospective Client Enquiry Form** | Dual-mode capture: **(A)** Public web portal landing page for prospective students with course selection, schedule, and live submission; **(B)** Counselor direct phone entry modal with shareable link and instant QR code generator. |
| **3. Public Enquiries Pool** | Unclaimed enquiries submitted by students are pooled in real time, visible to **all counselors** across the company. Features search, course filters, urgency tagging, and card/table layouts. |
| **4. Claim System & Private Isolation** | When a counselor clicks **"Claim Enquiry"**, the lead is assigned exclusively to their email ID, tagged with a timestamp, and **instantly removed from the public pool for all other employees**. It now appears exclusively in that counselor's **Private CRM Pipeline**! |

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+ or v22+)
- npm or pnpm

### 1. Run the Frontend (React + Vite)
```bash
npm run dev
# or
npx vite
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 2. (Optional) Run the Node.js REST API Server
```bash
npm run server
# or
node server.js
```
API runs at **[http://localhost:5000](http://localhost:5000)**.

---

## 🧪 Step-by-Step Verification Walkthrough

To verify the claim isolation requirement in 60 seconds:

1. **Observe as Sarah Jenkins (`sarah.jenkins@fastor.com`)**:
   - You start logged in as **Sarah**.
   - Look at the **Public Pool** tab: notice the unclaimed leads (e.g., *Rohan Mehra*, *Emily Watson*).
2. **Claim an Enquiry**:
   - Click the **"Claim Enquiry"** button on *Rohan Mehra*'s card.
   - Confetti fires, a chime sounds, and *Rohan* disappears from the Public Pool.
   - Switch to **"My Private Leads"**: *Rohan Mehra* is now in Sarah's private pipeline!
3. **Switch to Alex Rivera (`alex.rivera@fastor.com`)**:
   - Click the **"Switch to Alex"** button in the top banner (or click the counselor chip in the top right).
   - In Alex's **Public Pool**: *Rohan Mehra* is **NOT** visible (it was claimed by Sarah!).
   - In Alex's **My Private Leads**: only Alex's private leads appear (*Devon Miller*), never Sarah's!
4. **Test Real-time Inbound Leads**:
   - Click **"Simulate Inbound Lead"** in the top bar to watch new leads drop into the Public Pool live.
   - Or click **"Capture / Share Form"** to submit a custom prospective client lead.
5. **Preview Student Portal**:
   - Click **"Preview Student Portal"** in the bottom bar to experience the public-facing admissions page from a student's perspective.

---

## 📡 REST API Reference (`server.js`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/counselors/login` | Authenticate / register counselor by email ID |
| `GET` | `/api/counselors` | List all registered counselor accounts & metrics |
| `POST` | `/api/enquiries` | Prospective client enquiry submission |
| `GET` | `/api/enquiries/public` | Get all unclaimed public enquiries |
| `POST` | `/api/enquiries/:id/claim` | Claim lead by counselor email (moves to private) |
| `GET` | `/api/enquiries/my-enquiries` | Get counselor's private assigned enquiries |
| `PUT` | `/api/enquiries/:id/status` | Update pipeline stage (contacted, counseling, enrolled) |
| `POST` | `/api/enquiries/:id/release` | Release lead back to the public pool |

---

## 🎨 UI/UX Highlights
- **Sensory Micro-interactions**: Web Audio API synthesized tones (chimes on claim, fanfare on submission).
- **Dark & Light Mode**: Fluid transition with glassmorphism and Tailwind v4 CSS variables.
- **Kanban Board**: Drag-and-drop / single-click stage transitions for lead counseling.
- **Audit Trail**: Every lead retains full history (Submission -> Claimed by Counselor -> Status change -> Call notes).
