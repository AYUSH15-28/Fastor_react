import React from 'react';
import { useCrm } from '../context/CrmContext';
import {
  BarChart3,
  Trophy,
  Users,
  Award,
  TrendingUp,
  Target,
  Sparkles,
  BookOpen,
  PieChart,
  CheckCircle2,
  Lock,
  Globe
} from 'lucide-react';

export default function AnalyticsView() {
  const { counselors, enquiries, courses, currentCounselor } = useCrm();

  const totalEnquiries = enquiries.length || 1;
  const claimedCount = enquiries.filter(e => e.isClaimed).length;
  const unclaimedCount = enquiries.filter(e => !e.isClaimed).length;
  const enrolledCount = enquiries.filter(e => e.status === 'enrolled').length;

  // Course distribution
  const courseStats = courses.map(c => {
    const count = enquiries.filter(e => e.courseInterest === c.name).length;
    const percentage = Math.round((count / totalEnquiries) * 100);
    return { ...c, count, percentage };
  }).sort((a, b) => b.count - a.count);

  // Counselor Leaderboard calculations
  const counselorRankings = counselors.map(c => {
    const counselorLeads = enquiries.filter(
      e => e.isClaimed && e.claimedBy?.toLowerCase() === c.email.toLowerCase()
    );
    const converted = counselorLeads.filter(e => e.status === 'enrolled').length;
    const rate = counselorLeads.length > 0 ? Math.round((converted / counselorLeads.length) * 100) : 0;
    return {
      ...c,
      actualClaimed: counselorLeads.length,
      actualConverted: converted,
      conversionRate: rate
    };
  }).sort((a, b) => b.actualClaimed - a.actualClaimed);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-pink-500/10 border border-purple-200/60 dark:border-purple-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <BarChart3 className="w-4 h-4" />
            </span>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              CRM Intelligence & Performance Analytics
            </h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            Tracking prospective student interest, counselor claim velocity, and enrollment conversion metrics in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
            Total Leads: <strong className="text-indigo-600 dark:text-indigo-400">{totalEnquiries}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
            Total Claimed: <strong className="text-emerald-600 dark:text-emerald-400">{claimedCount}</strong>
          </span>
        </div>
      </div>

      {/* Grid: Funnel & Course Demand */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Demand Breakdown */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Course Interest Distribution
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">By Enquiries</span>
          </div>

          <div className="space-y-3.5">
            {courseStats.map((cs) => (
              <div key={cs.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[260px]">
                    {cs.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-400 text-[11px]">{cs.count} leads</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 text-[11px] w-8 text-right">
                      {cs.percentage}%
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(cs.percentage, 4)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Conversion Funnel */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                CRM Conversion Funnel
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Flow Rate</span>
          </div>

          <div className="space-y-3">
            {[
              {
                stage: '1. Captured Leads (Total Enquiries)',
                count: totalEnquiries,
                pct: 100,
                color: 'from-blue-500 to-indigo-600'
              },
              {
                stage: '2. Claimed by Counselors (Private)',
                count: claimedCount,
                pct: Math.round((claimedCount / totalEnquiries) * 100),
                color: 'from-indigo-600 to-purple-600'
              },
              {
                stage: '3. Actively in Counseling / Demo',
                count: enquiries.filter(e => e.status === 'counseling' || e.status === 'contacted').length,
                pct: Math.round((enquiries.filter(e => e.status === 'counseling' || e.status === 'contacted').length / totalEnquiries) * 100),
                color: 'from-purple-600 to-pink-600'
              },
              {
                stage: '4. Enrolled Students (Won / Converted)',
                count: enrolledCount,
                pct: Math.round((enrolledCount / totalEnquiries) * 100),
                color: 'from-emerald-500 to-teal-500'
              }
            ].map((step, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {step.stage}
                  </span>
                  <div className="flex items-center gap-2">
                    <strong className="font-bold text-slate-900 dark:text-white">{step.count}</strong>
                    <span className="text-[11px] text-slate-400 font-mono">({step.pct}%)</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${step.color} rounded-full transition-all duration-500`}
                    style={{ width: `${Math.max(step.pct, 5)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Counselor Leaderboard Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Counselor Performance & Claim Leaderboard
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Ranked by Leads Claimed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Counselor</th>
                <th className="px-4 py-3">Email ID</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3 text-center">Claimed Leads</th>
                <th className="px-4 py-3 text-center">Converted</th>
                <th className="px-4 py-3 text-right">Win Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {counselorRankings.map((c, idx) => {
                const isCurrent = c.email.toLowerCase() === currentCounselor.email.toLowerCase();
                return (
                  <tr
                    key={c.email}
                    className={`transition-colors ${
                      isCurrent
                        ? 'bg-indigo-50/70 dark:bg-indigo-950/40 font-semibold'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="px-4 py-3.5">
                      <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold ${
                        idx === 0
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : idx === 1
                          ? 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                          : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                      }`}>
                        #{idx + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-white dark:ring-slate-700"
                        />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            {c.name}
                            {isCurrent && (
                              <span className="px-1.5 py-0.2 text-[9px] bg-indigo-600 text-white rounded font-bold uppercase">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400">{c.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[11px] text-slate-500">
                      {c.email}
                    </td>
                    <td className="px-4 py-3.5 text-slate-500">
                      {c.department}
                    </td>
                    <td className="px-4 py-3.5 text-center font-bold text-slate-900 dark:text-white">
                      {c.actualClaimed}
                    </td>
                    <td className="px-4 py-3.5 text-center font-bold text-emerald-600 dark:text-emerald-400">
                      {c.actualConverted}
                    </td>
                    <td className="px-4 py-3.5 text-right font-bold text-indigo-600 dark:text-indigo-400">
                      {c.conversionRate}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

