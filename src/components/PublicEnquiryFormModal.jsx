import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  X,
  Send,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  QrCode,
  Share2,
  BookOpen,
  Phone,
  Mail,
  User,
  GraduationCap,
  Calendar,
  MessageSquare,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export default function PublicEnquiryFormModal({ isOpen, onClose }) {
  const { courses, submitPublicEnquiry, currentCounselor } = useCrm();

  const [activeTab, setActiveTab] = useState('fill'); // 'fill' | 'share'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseInterest: courses[0]?.name || 'Full-Stack GenAI & Web Architecture',
    urgency: 'high',
    experience: 'Working Professional',
    preferredBatch: 'Weekend Cohort',
    message: '',
    source: 'Website Public Enquiry Form'
  });

  const [submittedId, setSubmittedId] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newId = submitPublicEnquiry(formData);
    setSubmittedId(newId);
  };

  const handleResetForm = () => {
    setSubmittedId(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      courseInterest: courses[0]?.name || 'Full-Stack GenAI & Web Architecture',
      urgency: 'high',
      experience: 'Working Professional',
      preferredBatch: 'Weekend Cohort',
      message: '',
      source: 'Website Public Enquiry Form'
    });
  };

  const shareableUrl = `${window.location.origin}${window.location.pathname}?portal=student`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden transition-all max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Prospective Client Enquiry Form
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Requirement #2: Circulated online or filled by counselor on call
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              handleResetForm();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch: Fill vs Share */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 px-6 pt-3 gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('fill')}
            className={`pb-3 relative transition-colors ${
              activeTab === 'fill'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Fill Enquiry Form (Direct Entry)
            {activeTab === 'fill' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('share')}
            className={`pb-3 relative transition-colors flex items-center gap-1.5 ${
              activeTab === 'share'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Share2 className="w-4 h-4" />
            Circulate & Share Link / QR
            {activeTab === 'share' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
            )}
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'share' ? (
            /* Share Link & QR code mode */
            <div className="space-y-6 text-center py-4">
              <div className="max-w-md mx-auto space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Circulate Public Lead Capture Form
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Share this link with prospective students over WhatsApp, Email, or after a phone counseling session. Any submission immediately drops into the CRM Public Pool!
                </p>
              </div>

              {/* QR Code Graphic Card */}
              <div className="w-48 h-48 mx-auto p-3 bg-white dark:bg-slate-800 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800/60 shadow-lg flex flex-col items-center justify-center">
                <div className="w-full h-full bg-slate-950 p-2 rounded-xl flex items-center justify-center">
                  <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="10" y="10" width="25" height="25" fill="#fff" />
                    <rect x="15" y="15" width="15" height="15" fill="#000" />
                    <rect x="65" y="10" width="25" height="25" fill="#fff" />
                    <rect x="70" y="15" width="15" height="15" fill="#000" />
                    <rect x="10" y="65" width="25" height="25" fill="#fff" />
                    <rect x="15" y="70" width="15" height="15" fill="#000" />
                    <rect x="45" y="15" width="10" height="10" fill="#fff" />
                    <rect x="45" y="45" width="10" height="10" fill="#fff" />
                    <rect x="25" y="45" width="10" height="10" fill="#fff" />
                    <rect x="65" y="45" width="10" height="10" fill="#fff" />
                    <rect x="45" y="65" width="10" height="10" fill="#fff" />
                    <rect x="65" y="65" width="25" height="10" fill="#fff" />
                    <rect x="75" y="80" width="15" height="10" fill="#fff" />
                  </svg>
                </div>
              </div>
              <p className="text-[11px] font-mono text-slate-400">Scan to open mobile form directly</p>

              {/* Copy URL Box */}
              <div className="flex items-center gap-2 max-w-lg mx-auto bg-slate-100 dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
                <input
                  type="text"
                  readOnly
                  value={shareableUrl}
                  className="flex-1 bg-transparent px-2 text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none truncate"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>
          ) : submittedId ? (
            /* Success confirmation */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Enquiry Successfully Broadcasted!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                  Reference <strong className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{submittedId}</strong> is now live in the Public Enquiries Pool for all counselors to view and claim.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={handleResetForm}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition-colors"
                >
                  Submit Another Enquiry
                </button>
                <button
                  onClick={() => {
                    handleResetForm();
                    onClose();
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-xs transition-colors"
                >
                  Return to CRM
                </button>
              </div>
            </div>
          ) : (
            /* Direct Form Entry */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Origin indicator */}
              <div className="flex items-center justify-between p-3 bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/40 rounded-xl text-xs">
                <span className="text-indigo-900 dark:text-indigo-300 font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  Capturing lead as Counselor: <strong>{currentCounselor.name}</strong>
                </span>
                <select
                  value={formData.source}
                  onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300"
                >
                  <option value="Website Public Enquiry Form">Source: Website Form</option>
                  <option value="Shared Link from Counselor Call">Source: Counselor Phone Call</option>
                  <option value="Campus Seminar Lead">Source: Campus Seminar</option>
                </select>
              </div>

              {/* Student Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Student Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Lin"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. maya.lin@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Urgency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="e.g. +1 (555) 432-1098"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Lead Priority / Urgency
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  >
                    <option value="high">🔥 High (Immediate enrollment callback)</option>
                    <option value="medium">⚡ Medium (Exploring within 1 month)</option>
                    <option value="low">🌱 Low (General information)</option>
                  </select>
                </div>
              </div>

              {/* Course Interest */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Course of Interest *
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.courseInterest}
                    onChange={(e) => setFormData(prev => ({ ...prev, courseInterest: e.target.value }))}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name} ({c.duration})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Background & Batch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Candidate Background
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Final Year CS / Working Pro (2y)"
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Batch
                  </label>
                  <select
                    value={formData.preferredBatch}
                    onChange={(e) => setFormData(prev => ({ ...prev, preferredBatch: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  >
                    <option value="Weekend Cohort">Weekend Cohort (Sat/Sun)</option>
                    <option value="Weekday Evening">Weekday Evening (Mon-Thu)</option>
                    <option value="Fast-Track Bootcamp">Fast-Track Full Time</option>
                  </select>
                </div>
              </div>

              {/* Remarks / Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Student Query / Remarks
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Student inquiring about installment payment plans and weekend schedule..."
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit to Public Enquiries Pool</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
