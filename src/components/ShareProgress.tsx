import React from 'react';
import { UserCheck, PieChart, Info } from 'lucide-react';

interface ShareProgressProps {
  totalShares: number;
  availableShares: number;
  sharesData?: { share_number: number; customer_name?: string }[];
  compact?: boolean;
}

export const ShareProgress: React.FC<ShareProgressProps> = ({
  totalShares,
  availableShares,
  sharesData = [],
  compact = false,
}) => {
  const bookedShares = totalShares - availableShares;
  const percentageBooked = Math.round((bookedShares / totalShares) * 100);

  // Generate slots array 1 to totalShares
  const slots = Array.from({ length: totalShares }, (_, i) => {
    const shareNum = i + 1;
    const bookedInfo = sharesData.find((s) => s.share_number === shareNum);
    return {
      shareNum,
      isBooked: shareNum <= bookedShares || !!bookedInfo,
      customerName: bookedInfo?.customer_name || (shareNum <= bookedShares ? 'Booked Customer' : null),
    };
  });

  if (compact) {
    return (
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs">
          <span className="font-medium text-slate-700 flex items-center gap-1">
            <PieChart className="w-3.5 h-3.5 text-emerald-600" />
            Shares: <strong className="text-slate-900">{bookedShares}/{totalShares} Booked</strong>
          </span>
          <span className={`font-semibold ${availableShares > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {availableShares > 0 ? `${availableShares} Available` : 'Fully Sold'}
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden flex p-0.5 gap-0.5 border border-slate-200">
          {slots.map((slot) => (
            <div
              key={slot.shareNum}
              title={slot.isBooked ? `Share ${slot.shareNum}: Booked` : `Share ${slot.shareNum}: Open`}
              className={`h-full flex-1 rounded-xs transition-all duration-300 ${
                slot.isBooked ? 'bg-emerald-600' : 'bg-slate-200 hover:bg-emerald-200'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <PieChart className="w-4 h-4 text-emerald-600" />
            Partial Kurbani Share Allocation ({totalShares} Equal Shares)
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            1 Bull/Cow can be divided into up to 7 Shariah-compliant sacrificial shares.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 block">Progress</span>
          <span className="text-sm font-extrabold text-emerald-700">{percentageBooked}% Booked</span>
        </div>
      </div>

      {/* Slots grid */}
      <div className="grid grid-cols-7 gap-2">
        {slots.map((slot) => (
          <div
            key={slot.shareNum}
            className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all ${
              slot.isBooked
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-white border-slate-300 text-slate-600 hover:border-emerald-500 hover:shadow-xs'
            }`}
          >
            <span className="text-[10px] uppercase font-bold text-slate-400">Share #{slot.shareNum}</span>
            {slot.isBooked ? (
              <div className="mt-1 flex flex-col items-center">
                <UserCheck className="w-4 h-4 text-emerald-600 mb-0.5" />
                <span className="text-[10px] font-semibold text-emerald-800 truncate max-w-[50px]" title={slot.customerName || 'Booked'}>
                  {slot.customerName ? slot.customerName.split(' ')[0] : 'Booked'}
                </span>
              </div>
            ) : (
              <div className="mt-1 flex flex-col items-center">
                <span className="text-xs font-bold text-emerald-600">OPEN</span>
                <span className="text-[9px] text-slate-400">Available</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1 border-t border-slate-200">
        <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
        <span>Buy 1 or multiple shares for your family, or purchase the whole animal. All animals are weighed live.</span>
      </div>
    </div>
  );
};
