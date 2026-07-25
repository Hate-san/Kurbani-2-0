import React from 'react';
import { ShieldCheck, CheckCircle2, Award } from 'lucide-react';

export const ShariahBadge: React.FC = () => {
  return (
    <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs">
      <ShieldCheck className="w-4 h-4 text-emerald-600" />
      <span>100% Shariah Compliant Kurbani & Health Verified</span>
    </div>
  );
};
