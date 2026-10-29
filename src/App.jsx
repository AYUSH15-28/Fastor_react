import React, { useState } from 'react';
import { CrmProvider, useCrm } from './context/CrmContext';
import Header from './components/Header';
import DemoGuideBanner from './components/DemoGuideBanner';
import StatsOverview from './components/StatsOverview';
import PublicEnquiriesView from './components/PublicEnquiriesView';
import ClaimedEnquiriesView from './components/ClaimedEnquiriesView';
import AnalyticsView from './components/AnalyticsView';
import PublicEnquiryFormModal from './components/PublicEnquiryFormModal';
import PublicFormLanding from './components/PublicFormLanding';
import LeadDetailsModal from './components/LeadDetailsModal';
import Toast from './components/Toast';
import { RotateCcw, ExternalLink, Zap, Shield, Sparkles, GraduationCap } from 'lucide-react';

function CrmDashboard() {
  const {
    activeTab,
    setActiveTab,
    selectedEnquiry,
    setSelectedEnquiry,
    resetToDefaultData,
    simulateIncomingLead
  } = useCrm();

  const [isPublicFormOpen, setIsPublicFormOpen] = useState(false);
  const [isStudentPortalMode, setIsStudentPortalMode] = useState(false);

  // If user toggled to prospective student landing page mode
  if (isStudentPortalMode) {
    return <PublicFormLanding onBackToCrm={() => setIsStudentPortalMode(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      <div>
        {/* Top interactive demo banner */}
        <DemoGuideBanner />

        {/* Global Navigation Header */}
        <Header
          onOpenPublicForm={() => setIsPublicFormOpen(true)}
          onOpenShareModal={() => setIsPublicFormOpen(true)}
        />

        {/* Main Workspace Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Executive Stat Cards */}
          <StatsOverview />

          {/* Active View Container */}
          <div className="mt-4">
            {activeTab === 'public' && (
              <PublicEnquiriesView
                onInspectEnquiry={(enquiry) => setSelectedEnquiry(enquiry)}
                onOpenPublicForm={() => setIsPublicFormOpen(true)}
              />
            )}

            {activeTab === 'my-leads' && (
              <ClaimedEnquiriesView
                onInspectEnquiry={(enquiry) => setSelectedEnquiry(enquiry)}
                onGoToPublic={() => setActiveTab('public')}
              />
            )}

            {activeTab === 'analytics' && <AnalyticsView />}
          </div>
        </main>
      </div>

      {/* Prospective Client Lead Capture Form Modal */}
      <PublicEnquiryFormModal
        isOpen={isPublicFormOpen}
        onClose={() => setIsPublicFormOpen(false)}
      />

      {/* Lead Detail & Notes Drawer Modal */}
      <LeadDetailsModal
        enquiry={selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
      />

      {/* Global Interactive Notification Toasts */}
      <Toast />

      {/* Bottom Sticky Utility Bar */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md py-3 px-4 sm:px-8 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
              <Shield className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              NexusCRM Enterprise
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="hidden sm:inline text-[11px]">
              Full React 19 Frontend Implementation for CRM Business Spec
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View as Prospective Student button */}
            <button
              onClick={() => setIsStudentPortalMode(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-semibold transition-colors"
              title="Experience the prospective student public admissions landing page"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Preview Student Portal</span>
            </button>

            {/* Quick Simulate Lead */}
            <button
              onClick={simulateIncomingLead}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
              title="Simulate inbound student enquiry"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Simulate Lead</span>
            </button>

            {/* Reset mock data */}
            <button
              onClick={resetToDefaultData}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Reset all demo data back to clean state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <CrmProvider>
      <CrmDashboard />
    </CrmProvider>
  );
}
