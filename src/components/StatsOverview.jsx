import React from 'react';
import { useCrm } from '../context/CrmContext';
import { Globe, Lock, TrendingUp, Users, Clock, Award } from 'lucide-react';

export default function StatsOverview() {
  const { publicEnquiries, myEnquiries, enquiries, currentCounselor } = useCrm();

  const totalCaptured = enquiries.length;
  const myConverted = myEnquiries.filter(e => e.status === 'enrolled').length;
  const conversionRate = myEnquiries.length > 0 ? Math.round((myConverted / myEnquiries.length) * 100) : 0;

  const stats = [
    {
      title: 'Public Lead Pool',
      subtitle: 'Unclaimed & open to all',
      value: publicEnquiries.length,
      icon: Globe,
      color: 'indigo',
      badge: 'Real-time feed',
      badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300'
    },
    {
      title: 'My Claimed Leads',
      subtitle: `Private to ${currentCounselor.name.split(' ')[0]}`,
      value: myEnquiries.length,
      icon: Lock,
      color: 'emerald',
      badge: 'Private CRM',
      badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
    },
    {
      title: 'My Converted Students',
      subtitle: `${conversionRate}% conversion rate`,
      value: myConverted,
      icon: Award,
      color: 'purple',
      badge: 'Enrolled',
      badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300'
    },
    {
      title: 'Total Leads Captured',
      subtitle: 'Across web & counselor calls',
      value: totalCaptured,
      icon: Users,
      color: 'amber',
      badge: 'System Total',
      badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${stat.badgeColor}`}>
                {stat.badge}
              </span>
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs font-semibold text-slate-400">leads</span>
            </div>

            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
              {stat.title}
            </h4>
            <p className="text-[11px] text-slate-400 truncate mt-0.5">
              {stat.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
}
