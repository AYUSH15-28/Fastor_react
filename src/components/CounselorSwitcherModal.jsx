import React, { useState } from 'react';
import { useCrm } from '../context/CrmContext';
import { X, Check, UserPlus, Mail, Shield, Sparkles, Building2 } from 'lucide-react';

export default function CounselorSwitcherModal({ isOpen, onClose }) {
  const { counselors, currentCounselor, switchCounselor, loginCustomCounselor } = useCrm();
  const [activeTab, setActiveTab] = useState('existing'); // 'existing' | 'new'
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [customDept, setCustomDept] = useState('Admissions');

  if (!isOpen) return null;

  const handleCreateOrLogin = (e) => {
    e.preventDefault();
    if (!customEmail) return;
    loginCustomCounselor(customEmail, customName, customDept);
    setCustomEmail('');
    setCustomName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden transition-all">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Counselor CRM Accounts</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Each account is tied to an employee's verified email ID</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 px-6 pt-3 gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('existing')}
            className={`pb-3 relative transition-colors ${
              activeTab === 'existing'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Switch Counselor Profile ({counselors.length})
            {activeTab === 'existing' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`pb-3 relative transition-colors flex items-center gap-1.5 ${
              activeTab === 'new'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            Sign in with Email ID
            {activeTab === 'new' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[420px] overflow-y-auto">
          {activeTab === 'existing' ? (
            <div className="space-y-2.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Select counselor to test private claim isolation
              </div>
              {counselors.map((counselor) => {
                const isSelected = counselor.email.toLowerCase() === currentCounselor.email.toLowerCase();
                return (
                  <div
                    key={counselor.id || counselor.email}
                    onClick={() => {
                      switchCounselor(counselor);
                      onClose();
                    }}
                    className={`group flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="relative">
                        <img
                          src={counselor.avatar}
                          alt={counselor.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-800 shadow-sm"
                        />
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                            counselor.status === 'online' ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                            {counselor.name}
                          </h4>
                          {isSelected && (
                            <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-600 text-white rounded-full">
                              Active Now
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="font-mono">{counselor.email}</span>
                          <span>•</span>
                          <span>{counselor.department}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          {counselor.claimedCount || 0} Claimed
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {counselor.convertedCount || 0} Enrolled
                        </div>
                      </div>
                      {isSelected ? (
                        <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full border border-slate-300 dark:border-slate-700 group-hover:border-indigo-400 flex items-center justify-center text-transparent group-hover:text-indigo-500 transition-colors">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <form onSubmit={handleCreateOrLogin} className="space-y-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-xl flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                  Enter any employee email address. If an account with this email already exists, you will be logged in; otherwise, a fresh counselor profile will be created.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Counselor Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. employee.name@fastor.com"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rachel Zane"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Department / Track
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Global Tech Admissions"
                    value={customDept}
                    onChange={(e) => setCustomDept(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Authenticate & Switch Account
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <span>Active: <strong className="text-slate-700 dark:text-slate-300">{currentCounselor.email}</strong></span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
