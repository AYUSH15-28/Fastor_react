import React from 'react';
import { useCrm } from '../context/CrmContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useCrm();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = Info;
        let borderClass = 'border-blue-500/30 dark:border-blue-500/40';
        let bgIconClass = 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          borderClass = 'border-emerald-500/30 dark:border-emerald-500/40';
          bgIconClass = 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400';
        } else if (toast.type === 'warning') {
          Icon = AlertCircle;
          borderClass = 'border-amber-500/30 dark:border-amber-500/40';
          bgIconClass = 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-all duration-300 transform translate-y-0 ${borderClass}`}
          >
            <div className={`p-2 rounded-lg shrink-0 ${bgIconClass}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{toast.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

