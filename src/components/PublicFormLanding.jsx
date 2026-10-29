import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Send,
  BookOpen,
  Calendar,
  Users,
  Shield,
  ArrowLeft,
  ChevronRight,
  Clock,
  Award,
  Zap,
  Phone,
  Mail,
  User
} from 'lucide-react';

export default function PublicFormLanding({ onBackToCrm }) {
  const { courses, submitPublicEnquiry } = useCrm();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseInterest: courses[0]?.name || 'Full-Stack GenAI & Web Architecture',
    urgency: 'high',
    experience: 'Final Year CS Student',
    preferredBatch: 'Weekend Cohort',
    message: '',
    source: 'Prospective Client Public Web Portal'
  });

  const [submittedId, setSubmittedId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const id = submitPublicEnquiry(formData);
    setSubmittedId(id);
  };

  const handleReset = () => {
    setSubmittedId(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      courseInterest: courses[0]?.name || 'Full-Stack GenAI & Web Architecture',
      urgency: 'high',
      experience: 'Final Year CS Student',
      preferredBatch: 'Weekend Cohort',
      message: '',
      source: 'Prospective Client Public Web Portal'
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-indigo-500 selection:text-white flex flex-col justify-between">
      {/* Top navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/60 backdrop-blur-md px-6 py-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/25">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight">Fastor Institute of Technology</span>
              <span className="block text-[10px] text-slate-400 font-medium">Admissions & Career Fellowship 2026</span>
            </div>
          </div>

          <button
            onClick={onBackToCrm}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Counselor CRM</span>
          </button>
        </div>
      </nav>

      {/* Hero section & Form */}
      <div className="max-w-6xl mx-auto px-4 py-12 flex-1 w-full flex flex-col lg:flex-row items-center gap-12">
        {/* Left column: value prop */}
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Applications Open for 2026 Fellowships</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Accelerate Your Tech Career With <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">Industry Counselors</span>.
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
            Fill out the prospective student enquiry form below. An assigned dedicated admissions counselor will connect with you within 30 minutes to review your profile, curriculum roadmap, and scholarship eligibility.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800">
              <div className="text-xl font-bold text-indigo-400">1-on-1</div>
              <div className="text-xs text-slate-400 mt-0.5">Dedicated Counselor</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800">
              <div className="text-xl font-bold text-purple-400">94.2%</div>
              <div className="text-xs text-slate-400 mt-0.5">Placement Velocity</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 col-span-2 sm:col-span-1">
              <div className="text-xl font-bold text-emerald-400">&lt; 30m</div>
              <div className="text-xs text-slate-400 mt-0.5">Response Time</div>
            </div>
          </div>
        </div>

        {/* Right column: Form Card */}
        <div className="w-full lg:w-[480px]">
          <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
            {submittedId ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Enquiry Received!</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                  Your reference ID is <strong className="font-mono text-indigo-400">{submittedId}</strong>. Our counselors have received your enquiry in the live admissions CRM.
                </p>

                <div className="pt-6 space-y-3">
                  <button
                    onClick={onBackToCrm}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                  >
                    <span>View Lead in Counselor CRM</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition-colors"
                  >
                    Submit Another Student Response
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Prospective Student Enquiry</h3>
                  <p className="text-xs text-slate-400">Share your interest to receive syllabus & callback</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="alex@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full pl-10 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full pl-10 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Course Program of Interest *
                  </label>
                  <select
                    value={formData.courseInterest}
                    onChange={(e) => setFormData(prev => ({ ...prev, courseInterest: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Batch Preference
                    </label>
                    <select
                      value={formData.preferredBatch}
                      onChange={(e) => setFormData(prev => ({ ...prev, preferredBatch: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Weekend Cohort">Weekend Cohort</option>
                      <option value="Weekday Evening">Weekday Evening</option>
                      <option value="Fast-Track Full Time">Fast-Track Full Time</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      When to start?
                    </label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="high">Immediately</option>
                      <option value="medium">Next Month</option>
                      <option value="low">Just Browsing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Questions or Specific Interests
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about your learning goals or scholarship queries..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Prospective Student Enquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <footer className="border-t border-slate-800/80 py-4 px-6 text-center text-xs text-slate-500">
        Fastor Tech Academy Admissions Portal • Built with React 19 & Tailwind CSS
      </footer>
    </div>
  );
}

