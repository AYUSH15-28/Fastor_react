import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  Users,
  Shield,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Share2,
  PlusCircle,
  BarChart3,
  Globe,
  Lock,
  ChevronDown,
  Sparkles,
  Zap
} from 'lucide-react';
import CounselorSwitcherModal from './CounselorSwitcherModal';

export default function Header({ onOpenPublicForm, onOpenShareModal }) {
  const {
    darkMode,
    toggleTheme,
    soundEnabled,
    toggleSound,
    currentCounselor,
    publicEnquiries,
    myEnquiries,
    activeTab,
    setActiveTab,
    simulateIncomingLead
  } = useCrm();

  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/85 backdrop-blur-xl transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo & Brand */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('public')}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
                  <Shield className="w-5 h-5 text-white stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                      Nexus<span className="text-indigo-600 dark:text-indigo-400">CRM</span>
                    </span>
                    <span className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded border border-indigo-200 dark:border-indigo-800">
                      Admissions
                    </span>
                  </div>
                  <p className="text-[10px] font-medium text-slate-400 hidden sm:block">
                    Lead Distribution & Private Claim Engine
                  </p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/60 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                <button
                  onClick={() => setActiveTab('public')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'public'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/50 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Public Pool</span>
                  <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                    activeTab === 'public'
                      ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {publicEnquiries.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('my-leads')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'my-leads'
                      ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-200/50 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>My Private Leads</span>
                  <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                    activeTab === 'my-leads'
                      ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {myEnquiries.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'analytics'
                      ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm border border-slate-200/50 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Analytics</span>
                </button>
              </nav>
            </div>

            {/* Right actions: Lead generation & Counselor Identity */}
            <div className="flex items-center gap-2.5">
              {/* Simulate Inbound Lead demo button */}
              <button
                onClick={simulateIncomingLead}
                title="Simulate a new prospective client enquiry arriving live"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 rounded-xl transition-all shadow-xs"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Simulate Inbound Lead</span>
              </button>

              {/* Open Enquiry Form modal / Share */}
              <button
                onClick={onOpenPublicForm}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Capture / Share Form</span>
                <span className="sm:hidden">Form</span>
              </button>

              {/* Sound toggle */}
              <button
                onClick={toggleSound}
                title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
                className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              </button>

              {/* Dark mode toggle */}
              <button
                onClick={toggleTheme}
                title="Toggle Theme"
                className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>

              {/* Vertical divider */}
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />

              {/* Counselor Account Switcher Chip */}
              <div
                onClick={() => setIsSwitcherOpen(true)}
                className="flex items-center gap-2.5 pl-1.5 pr-3 py-1 bg-slate-100/90 hover:bg-slate-200/90 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer transition-all group"
                title="Click to switch counselor account or log in with another employee email"
              >
                <div className="relative">
                  <img
                    src={currentCounselor.avatar}
                    alt={currentCounselor.name}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-white dark:ring-slate-700"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white dark:ring-slate-900" />
                </div>
                <div className="text-left hidden sm:block">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {currentCounselor.name}
                    </span>
                    <ChevronDown className="w-3 h-3 text-slate-400 group-hover:translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate max-w-[130px]">
                    {currentCounselor.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around border-t border-slate-200/60 dark:border-slate-800/60 px-2 py-1.5 bg-slate-50/70 dark:bg-slate-900/70 text-xs">
          <button
            onClick={() => setActiveTab('public')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg ${
              activeTab === 'public'
                ? 'font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Public ({publicEnquiries.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('my-leads')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg ${
              activeTab === 'my-leads'
                ? 'font-bold text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-800 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>My Leads ({myEnquiries.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg ${
              activeTab === 'analytics'
                ? 'font-bold text-purple-600 dark:text-purple-400 bg-white dark:bg-slate-800 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Analytics</span>
          </button>
        </div>
      </header>

      {/* Counselor Switcher Modal */}
      <CounselorSwitcherModal
        isOpen={isSwitcherOpen}
        onClose={() => setIsSwitcherOpen(false)}
      />
    </>
  );
}
