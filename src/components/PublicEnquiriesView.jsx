import React, { useState, useMemo } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  Globe,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  Mail,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Flame,
  LayoutGrid,
  List,
  UserCheck,
  ChevronRight,
  ExternalLink,
  Zap,
  Tag
} from 'lucide-react';

export default function PublicEnquiriesView({ onInspectEnquiry, onOpenPublicForm }) {
  const {
    publicEnquiries,
    claimEnquiry,
    currentCounselor,
    courses,
    simulateIncomingLead
  } = useCrm();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedUrgency, setSelectedUrgency] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Time formatter
  const formatTimeAgo = (dateStr) => {
    try {
      const diffSec = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
      if (diffSec < 60) return 'Just now';
      const diffMin = Math.floor(diffSec / 60);
      if (diffMin < 60) return `${diffMin}m ago`;
      const diffHour = Math.floor(diffMin / 60);
      if (diffHour < 24) return `${diffHour}h ago`;
      const diffDay = Math.floor(diffHour / 24);
      return `${diffDay}d ago`;
    } catch {
      return 'Recently';
    }
  };

  // Filtered and searched public enquiries
  const filteredEnquiries = useMemo(() => {
    return publicEnquiries.filter((enq) => {
      const matchesSearch =
        searchQuery === '' ||
        enq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enq.courseInterest.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enq.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCourse = selectedCourse === 'all' || enq.courseInterest === selectedCourse;
      const matchesUrgency = selectedUrgency === 'all' || enq.urgency === selectedUrgency;

      return matchesSearch && matchesCourse && matchesUrgency;
    });
  }, [publicEnquiries, searchQuery, selectedCourse, selectedUrgency]);

  return (
    <div className="space-y-6">
      {/* Top Banner / Explanation of Public Pool */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 border border-indigo-200/60 dark:border-indigo-800/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Public Enquiries Pool
                <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 rounded-full">
                  {publicEnquiries.length} Available to All Counselors
                </span>
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              These are prospective client leads captured via the online enquiry form or shared links. Any counselor can view them.
              Clicking <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">"Claim"</strong> assigns the lead exclusively to you (<span className="font-mono text-[11px]">{currentCounselor.email}</span>) and removes it from the public feed for all other counselors.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={simulateIncomingLead}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl transition-all shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>+ Generate Lead</span>
            </button>
            <button
              onClick={onOpenPublicForm}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Open Public Form</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, email, course, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
          />
        </div>

        {/* Course Filter */}
        <div className="flex items-center gap-2 shrink-0">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Courses ({courses.length})</option>
            {courses.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Urgency Filter */}
          <select
            value={selectedUrgency}
            onChange={(e) => setSelectedUrgency(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Urgency</option>
            <option value="high">🔥 High Urgency</option>
            <option value="medium">⚡ Medium Urgency</option>
            <option value="low">🌱 Normal</option>
          </select>

          {/* View Toggle */}
          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Public Enquiries List */}
      {filteredEnquiries.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
            <Globe className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No Public Enquiries Found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 mb-5">
            {searchQuery || selectedCourse !== 'all' || selectedUrgency !== 'all'
              ? 'No enquiries match your search or filter criteria. Try clearing filters.'
              : 'All public leads have been claimed by counselors! Create a new test enquiry or simulate an inbound lead.'}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={simulateIncomingLead}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center gap-2"
            >
              <Zap className="w-3.5 h-3.5" />
              Simulate Inbound Lead
            </button>
            <button
              onClick={onOpenPublicForm}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2"
            >
              <Globe className="w-3.5 h-3.5" />
              Submit Client Enquiry
            </button>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredEnquiries.map((enquiry) => {
            const isHigh = enquiry.urgency === 'high';
            return (
              <div
                key={enquiry.id}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs hover:shadow-xl hover:border-indigo-400/50 dark:hover:border-indigo-500/50 transition-all duration-200 flex flex-col justify-between"
              >
                {/* Header of card: ID, Time, Urgency badge */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        {enquiry.id}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimeAgo(enquiry.createdAt)}
                      </span>
                    </div>

                    {isHigh ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                        <Flame className="w-3 h-3 fill-rose-500 text-rose-500" />
                        High Priority
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        Normal Priority
                      </span>
                    )}
                  </div>

                  {/* Student Name & Avatar */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3
                        onClick={() => onInspectEnquiry(enquiry)}
                        className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer"
                      >
                        {enquiry.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span className="font-mono">{enquiry.email}</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm shrink-0 ring-1 ring-indigo-200 dark:ring-indigo-900">
                      {enquiry.name.charAt(0)}
                    </div>
                  </div>

                  {/* Course of Interest */}
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/40">
                      <BookOpen className="w-3 h-3" />
                      {enquiry.courseInterest}
                    </span>
                  </div>

                  {/* Student query message */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 mb-4">
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 italic leading-relaxed">
                      "{enquiry.message}"
                    </p>
                  </div>

                  {/* Metadata chips */}
                  <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 dark:text-slate-400 mb-4">
                    <span className="bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded">
                      Exp: {enquiry.experience}
                    </span>
                    <span className="bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded">
                      Batch: {enquiry.preferredBatch}
                    </span>
                    <span className="bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded">
                      Src: {enquiry.source.includes('Call') ? 'Counselor Call' : 'Web Form'}
                    </span>
                  </div>
                </div>

                {/* Card Actions: THE CRITICAL CLAIM BUTTON */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onInspectEnquiry(enquiry)}
                    className="text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 px-2.5 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => claimEnquiry(enquiry.id)}
                    className="flex-1 max-w-[190px] py-2 px-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                    title={`Claim ${enquiry.name} for ${currentCounselor.name} (${currentCounselor.email})`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Claim Enquiry</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Reference</th>
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Course of Interest</th>
                  <th className="px-4 py-3">Urgency</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Lead Source</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3.5 font-mono font-semibold text-slate-500">
                      {enquiry.id}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {enquiry.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {enquiry.email}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-medium">
                        {enquiry.courseInterest}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {enquiry.urgency === 'high' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400">
                          <Flame className="w-3 h-3 fill-rose-500" /> High
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500">Normal</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-slate-500">
                      {formatTimeAgo(enquiry.createdAt)}
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 text-[11px]">
                      {enquiry.source.includes('Call') ? 'Counselor Call' : 'Web Lead Form'}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onInspectEnquiry(enquiry)}
                          className="px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-xs transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => claimEnquiry(enquiry.id)}
                          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs shadow-xs flex items-center gap-1"
                        >
                          <UserCheck className="w-3 h-3" />
                          <span>Claim</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

