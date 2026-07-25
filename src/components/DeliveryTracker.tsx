import React from 'react';
import { DeliveryStatus } from '../types';
import { Clock, Home, CheckCircle2, Truck, PackageCheck, Utensils } from 'lucide-react';

interface DeliveryTrackerProps {
  status: DeliveryStatus;
  orderNumber: string;
}

const steps: { key: DeliveryStatus; label: string; description: string; icon: any }[] = [
  {
    key: 'processing',
    label: 'Order Confirmed',
    description: 'Booking & share allocation verified',
    icon: Clock,
  },
  {
    key: 'farm_preparing',
    label: 'Farm Preparation',
    description: 'Pre-Kurbani health check & weigh-in',
    icon: Home,
  },
  {
    key: 'slaughtered',
    label: 'Qurbani Executed',
    description: 'Sacrifice completed under Shariah guidelines',
    icon: Utensils,
  },
  {
    key: 'packaged',
    label: 'Processing & Portioning',
    description: 'Cleaned, hygiene vacuum packed & portioned',
    icon: PackageCheck,
  },
  {
    key: 'shipping',
    label: 'Cold Chain Transit',
    description: 'Chilled delivery van en route to address',
    icon: Truck,
  },
  {
    key: 'delivered',
    label: 'Delivered',
    description: 'Handed over to customer',
    icon: CheckCircle2,
  },
];

export const DeliveryTracker: React.FC<DeliveryTrackerProps> = ({ status, orderNumber }) => {
  const currentStepIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
            Live Kurbani Tracking
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-1">Order #{orderNumber}</h3>
        </div>
        <div className="text-xs text-slate-500">
          Current Status:{' '}
          <strong className="text-emerald-700 capitalize font-semibold">
            {steps[currentStepIndex]?.label || status}
          </strong>
        </div>
      </div>

      {/* Steps Pipeline */}
      <div className="relative">
        <div className="hidden md:block absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200" />

        <div className="space-y-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div key={step.key} className="flex items-start gap-4 relative">
                <div
                  className={`z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all shrink-0 ${
                    isCurrent
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-md ring-4 ring-emerald-100'
                      : isCompleted
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-700'
                      : 'bg-slate-50 border-slate-300 text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="pt-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-sm font-bold ${
                        isCurrent ? 'text-emerald-800' : isCompleted ? 'text-slate-900' : 'text-slate-400'
                      }`}
                    >
                      {step.label}
                    </h4>
                    {isCurrent && (
                      <span className="text-[10px] bg-emerald-600 text-white font-semibold px-2 py-0.5 rounded-full animate-pulse">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className={`text-xs mt-0.5 ${isCompleted ? 'text-slate-600' : 'text-slate-400'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
