import React, { useState, useMemo } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  Lock,
  Search,
  CheckCircle2,
  Phone,
  Mail,
  BookOpen,
  ArrowRight,
  MoreVertical,
  RotateCcw,
  Sparkles,
  Calendar,
  MessageSquare,
  Trophy,
  Filter,
  LayoutGrid,
  List,
  Flame,
  Award,
  ChevronRight,
  Clock
} from 'lucide-react';

const STAGES = [
  { id: 'new', label: 'New Claimed', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
  { id: 'contacted', label: 'In Discussion', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
  { id: 'counseling', label: 'Demo / Counseling', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' },
  { id: 'enrolled', label: 'Enrolled / Converted', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
  { id: 'lost', label: 'Cold / Dropped', color: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20' }
];

export default function ClaimedEnquiriesView({ onInspectEnquiry, onGoToPublic }) {
  const {
    myEnquiries,
    currentCounselor,
    updateEnquiryStatus,
    releaseEnquiry
  } = useCrm();

  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'list'

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

  const filteredLeads = useMemo(() => {
    return myEnquiries.filter((enq) => {
      const matchesSearch =
        searchQuery === '' ||
        enq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enq.courseInterest.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStage = stageFilter === 'all' || enq.status === stageFilter;

      return matchesSearch && matchesStage;
    });
  }, [myEnquiries, searchQuery, stageFilter]);

  // Group by stage for Kanban
  const kanbanColumns = useMemo(() => {
    const cols = {};
    STAGES.forEach(s => {
      cols[s.id] = filteredLeads.filter(l => (l.status || 'contacted') === s.id);
    });
    return cols;
  }, [filteredLeads]);

  const convertedCount = myEnquiries.filter(e => e.status === 'enrolled').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-200/60 dark:border-emerald-800/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <Lock className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Private CRM Pipeline
              </h2>
              <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full">
                {myEnquiries.length} Assigned Leads
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Private to <strong className="text-slate-900 dark:text-white">{currentCounselor.name}</strong> (<span className="font-mono text-[11px]">{currentCounselor.email}</span>).
              These enquiries are strictly isolated and not visible to any other employee.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-500" />
              <span className="text-slate-500">Enrolled:</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{convertedCount}</strong>
            </div>

            <button
              onClick={onGoToPublic}
              className="px-3 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>+ Claim More Leads</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and View toggles */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search my private leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Stages ({myEnquiries.length})</option>
            {STAGES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>

          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Kanban Pipeline"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Kanban or List */}
      {myEnquiries.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No Private Leads Claimed Yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 mb-5">
            You are logged in as <strong className="text-slate-700 dark:text-slate-300">{currentCounselor.name}</strong>.
            Go to the Public Pool tab to view incoming prospective student enquiries and click "Claim" to assign them here.
          </p>
          <button
            onClick={onGoToPublic}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors inline-flex items-center gap-2"
          >
            <span>Browse Public Enquiries Pool</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ) : viewMode === 'kanban' ? (
        /* Kanban Board View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-start">
          {STAGES.map((stage) => {
            const stageLeads = kanbanColumns[stage.id] || [];
            return (
              <div
                key={stage.id}
                className="bg-slate-100/70 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3 min-h-[500px] flex flex-col"
              >
                {/* Column header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {stage.label}
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full border border-slate-200 dark:border-slate-700">
                    {stageLeads.length}
                  </span>
                </div>

                {/* Cards inside column */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {stageLeads.length === 0 ? (
                    <div className="py-8 text-center text-[11px] text-slate-400 italic">
                      No leads in this stage
                    </div>
                  ) : (
                    stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="bg-white dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all group"
                      >
                        {/* Top ID & Claimed time */}
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className="font-mono text-[10px] font-bold text-slate-400">
                            {lead.id}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Claimed {formatTimeAgo(lead.claimedAt)}
                          </span>
                        </div>

                        {/* Student Name */}
                        <h4
                          onClick={() => onInspectEnquiry(lead)}
                          className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 cursor-pointer transition-colors"
                        >
                          {lead.name}
                        </h4>

                        {/* Course badge */}
                        <div className="my-2">
                          <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/40 truncate max-w-full">
                            {lead.courseInterest}
                          </span>
                        </div>

                        {/* Contacts quick action */}
                        <div className="flex items-center gap-2 py-2 text-slate-500 text-[11px] border-t border-slate-100 dark:border-slate-800">
                          <a
                            href={`mailto:${lead.email}`}
                            title={`Email ${lead.email}`}
                            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-indigo-600 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`tel:${lead.phone}`}
                            title={`Call ${lead.phone}`}
                            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-emerald-600 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <span className="text-[11px] text-slate-400 truncate font-mono ml-auto">
                            {lead.phone}
                          </span>
                        </div>

                        {/* Stage transition & Release actions */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1">
                          {/* Stage change dropdown */}
                          <select
                            value={lead.status || 'contacted'}
                            onChange={(e) => updateEnquiryStatus(lead.id, e.target.value)}
                            className="text-[10px] font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-slate-700 dark:text-slate-300 focus:outline-none"
                          >
                            {STAGES.map((s) => (
                              <option key={s.id} value={s.id}>
                                Move: {s.label}
                              </option>
                            ))}
                          </select>

                          {/* Release back to Public Pool button */}
                          <button
                            onClick={() => releaseEnquiry(lead.id)}
                            title="Release enquiry back to public pool for other counselors"
                            className="p-1 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-[10px]"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Reference</th>
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Claimed</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredLeads.map((lead) => {
                  const stageObj = STAGES.find(s => s.id === (lead.status || 'contacted'));
                  return (
                    <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 font-mono text-slate-500 font-semibold">
                        {lead.id}
                      </td>
                      <td className="px-4 py-3">
                        <div
                          onClick={() => onInspectEnquiry(lead)}
                          className="font-bold text-slate-900 dark:text-white cursor-pointer hover:text-emerald-600 transition-colors"
                        >
                          {lead.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {lead.email} • {lead.phone}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {lead.courseInterest}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={lead.status || 'contacted'}
                          onChange={(e) => updateEnquiryStatus(lead.id, e.target.value)}
                          className="text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-700 dark:text-slate-300 focus:outline-none"
                        >
                          {STAGES.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-slate-500">
                        {formatTimeAgo(lead.claimedAt)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onInspectEnquiry(lead)}
                            className="px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-xs"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => releaseEnquiry(lead.id)}
                            title="Release to public pool"
                            className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

