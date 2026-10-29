import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  X,
  Phone,
  Mail,
  BookOpen,
  Calendar,
  Clock,
  User,
  Shield,
  RotateCcw,
  CheckCircle2,
  MessageSquare,
  Send,
  UserCheck,
  Flame,
  Award,
  Globe,
  Lock,
  History,
  FileText
} from 'lucide-react';

export default function LeadDetailsModal({ enquiry, onClose }) {
  const {
    currentCounselor,
    claimEnquiry,
    releaseEnquiry,
    updateEnquiryStatus,
    addEnquiryNote
  } = useCrm();

  const [newNote, setNewNote] = useState('');

  if (!enquiry) return null;

  const isClaimedByMe =
    enquiry.isClaimed &&
    enquiry.claimedBy?.toLowerCase() === currentCounselor.email.toLowerCase();

  const isClaimedByOther =
    enquiry.isClaimed &&
    enquiry.claimedBy?.toLowerCase() !== currentCounselor.email.toLowerCase();

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addEnquiryNote(enquiry.id, newNote);
    setNewNote('');
  };

  const formatDateTime = (isoStr) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden transition-all max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-extrabold text-lg flex items-center justify-center ring-2 ring-indigo-200 dark:ring-indigo-900">
              {enquiry.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {enquiry.name}
                </h3>
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                  {enquiry.id}
                </span>
                {enquiry.urgency === 'high' && (
                  <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                    <Flame className="w-3 h-3 fill-rose-500" />
                    High Urgency
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                {enquiry.email} • {enquiry.phone}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ownership Status Banner */}
        <div className="px-6 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          {!enquiry.isClaimed ? (
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-medium">
              <Globe className="w-4 h-4 text-indigo-500" />
              <span>Status: <strong>Public Pool Enquiry</strong> (Available to all counselors)</span>
            </div>
          ) : isClaimedByMe ? (
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
              <Lock className="w-4 h-4 text-emerald-500" />
              <span>Status: <strong>Private Lead</strong> assigned to you (<span className="font-mono">{currentCounselor.email}</span>)</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-medium">
              <Lock className="w-4 h-4 text-purple-500" />
              <span>Status: <strong>Private Lead</strong> assigned to colleague {enquiry.claimedByName}</span>
            </div>
          )}

          {/* Action button in ownership banner */}
          {!enquiry.isClaimed ? (
            <button
              onClick={() => {
                claimEnquiry(enquiry.id);
              }}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Claim This Lead</span>
            </button>
          ) : isClaimedByMe ? (
            <button
              onClick={() => {
                releaseEnquiry(enquiry.id);
              }}
              className="px-3 py-1 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-xs transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Release to Public Pool</span>
            </button>
          ) : null}
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Quick Contact & Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Course Interest</div>
              <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                {enquiry.courseInterest}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Experience & Batch</div>
              <div className="font-semibold text-slate-900 dark:text-white">
                {enquiry.experience}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Batch: {enquiry.preferredBatch}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Direct Reachout</div>
              <div className="flex items-center gap-2 mt-1">
                <a
                  href={`mailto:${enquiry.email}`}
                  className="px-2.5 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:bg-slate-50"
                >
                  <Mail className="w-3 h-3" />
                  Email
                </a>
                <a
                  href={`tel:${enquiry.phone}`}
                  className="px-2.5 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:bg-slate-50"
                >
                  <Phone className="w-3 h-3" />
                  Call
                </a>
              </div>
            </div>
          </div>

          {/* Student Query */}
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              Prospective Student Inquiry / Message:
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed italic">
              "{enquiry.message}"
            </div>
          </div>

          {/* Status Progression if claimed */}
          {isClaimedByMe && (
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mb-2">
                Pipeline Stage Progression:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'new', label: '1. New' },
                  { id: 'contacted', label: '2. Contacted' },
                  { id: 'counseling', label: '3. Counseling' },
                  { id: 'enrolled', label: '4. Enrolled 🏆' },
                  { id: 'lost', label: '5. Dropped' }
                ].map((s) => {
                  const isCurrent = (enquiry.status || 'contacted') === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => updateEnquiryStatus(enquiry.id, s.id)}
                      className={`p-2 rounded-xl text-center font-bold text-[11px] border transition-all ${
                        isCurrent
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Follow-up Notes Section */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                Counselor Follow-up Notes ({enquiry.notes?.length || 0})
              </span>
            </div>

            {/* Note input */}
            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                placeholder="Log a call note, candidate preference, or next steps..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Add Note</span>
              </button>
            </form>

            {/* Notes history list */}
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {enquiry.notes?.slice().reverse().map((note) => (
                <div
                  key={note.id}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-[11px]"
                >
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {note.author}
                    </span>
                    <span>{formatDateTime(note.date)}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {note.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Timeline */}
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-slate-400" />
              Lead Audit Trail & Activity Log
            </div>
            <div className="space-y-2 border-l-2 border-indigo-200 dark:border-indigo-900 ml-2 pl-3">
              {enquiry.timeline?.map((item, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-indigo-500" />
                  <div className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                    {item.action}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    By {item.by} • {formatDateTime(item.date)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
