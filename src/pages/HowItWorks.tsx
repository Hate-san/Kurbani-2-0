import React from 'react';
import { ShariahBadge } from '../components/ShariahBadge';
import { PieChart, ShieldCheck, Scale, CheckCircle, Users, Truck, HeartHandshake } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <ShariahBadge />
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
          How Partial Kurbani (7-Share) Works
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          In Islamic jurisprudence (Fiqh), up to 7 distinct individuals or families may share in the sacrifice of 1 camel, bull, or cow for Eid-ul-Adha.
        </p>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
            01
          </div>
          <h3 className="text-base font-bold text-slate-900">1 Bull = 7 Equal Sacrificial Shares</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The total cost of the bull or cow is divided into 7 equal shares. Buyers can purchase 1, 2, or any number of shares up to 7 depending on their household needs and budget.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
            02
          </div>
          <h3 className="text-base font-bold text-slate-900">Live Scale Weigh-in Verification</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every animal listed on Agro Kurbani is weighed on calibrated industrial livestock scales. The live weight (in kg) and price per kg are disclosed transparently.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
            03
          </div>
          <h3 className="text-base font-bold text-slate-900">Shariah Slaughter Execution</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Sacrifices are performed on Eid day by trained Islamic slaughterers following strict Halal rules, reciting Takbeer, and ensuring animal dignity and welfare.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
            04
          </div>
          <h3 className="text-base font-bold text-slate-900">Meat Division & Cold Delivery</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The clean meat is weighed precisely into 7 equal packages. You can choose to receive your portion, or request partial/full donation to local orphanages and charities.
          </p>
        </div>
      </div>

      {/* Shariah FAQ Card */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          Frequently Asked Questions on Partial Kurbani
        </h2>

        <div className="space-y-4 text-xs text-slate-300">
          <div>
            <strong className="text-white block text-sm mb-1">
              Q: Is partial share Kurbani valid in Islam?
            </strong>
            <p>
              Yes, authentic Hadith (Sahih Muslim) records that during Hajj and Qurbani, 7 individuals shared 1 camel or 1 cow. Each share carries full spiritual reward for the shareholder.
            </p>
          </div>

          <div>
            <strong className="text-white block text-sm mb-1">
              Q: Can I buy 1 share for Goat or Sheep?
            </strong>
            <p>
              Goat and sheep are suitable for 1 individual/family only (1 share total). They cannot be divided into partial shares.
            </p>
          </div>

          <div>
            <strong className="text-white block text-sm mb-1">
              Q: What happens if an animal has unsold shares on Eid day?
            </strong>
            <p>
              Agro Kurbani guarantees the sacrifice: our partner farms buy up any unallocated shares so that every booked cattle is guaranteed to proceed on Eid morning!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
