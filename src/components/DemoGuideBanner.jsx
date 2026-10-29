import React from 'react';
import { useCrm } from '../context/CrmContext';
import { Sparkles, ArrowRightLeft, ShieldCheck, Info } from 'lucide-react';

export default function DemoGuideBanner() {
  const { currentCounselor, counselors, switchCounselor } = useCrm();

  // Find another counselor for quick 1-click swap
  const alternateCounselors = counselors.filter(
    c => c.email.toLowerCase() !== currentCounselor.email.toLowerCase()
  );

  return (
    <div className="bg-gradient-to-r from-indigo-900/90 via-slate-900/95 to-purple-950/90 border-b border-indigo-500/20 text-white px-4 py-2.5 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-400/30 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
          </span>
          <p className="leading-snug text-slate-200">
            <strong className="text-white font-semibold">Live Claim Isolation Demo:</strong> You are acting as{' '}
            <span className="text-indigo-300 font-bold">{currentCounselor.name}</span> (<span className="font-mono text-[11px] text-slate-300">{currentCounselor.email}</span>).
            Claiming any public enquiry instantly assigns it as your private lead and makes it <span className="underline decoration-indigo-400 underline-offset-2 font-medium">invisible</span> to all other colleagues.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-slate-400 text-[11px] hidden lg:inline">Quick Test:</span>
          {alternateCounselors.slice(0, 2).map((alt) => (
            <button
              key={alt.email}
              onClick={() => switchCounselor(alt)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 transition-colors text-[11px] font-medium"
            >
              <ArrowRightLeft className="w-3 h-3 text-indigo-300" />
              <span>Switch to {alt.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

