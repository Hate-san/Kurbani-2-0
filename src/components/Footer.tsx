import React from 'react';
import { ShariahBadge } from './ShariahBadge';
import { Phone, Mail, MapPin, Heart, ShieldCheck, Truck, Scale } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg">
                AK
              </div>
              <span className="font-black text-xl text-white tracking-tight">
                AGRO <span className="text-emerald-400">KURBANI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bangladesh’s premier Shariah-compliant online Agro marketplace connecting verified livestock farmers directly with buyers for 7-share partial & whole Qurbani.
            </p>
            <ShariahBadge />
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#market" className="hover:text-emerald-400 transition-colors">Browse Cattle & Bulls</a></li>
              <li><a href="#how" className="hover:text-emerald-400 transition-colors">How Partial Shares Work</a></li>
              <li><a href="#farms" className="hover:text-emerald-400 transition-colors">Partner Agro Farms</a></li>
              <li><a href="#shariah" className="hover:text-emerald-400 transition-colors">Shariah & Vet Health Policy</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Services & Guarantees
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
                Live Weigh-in Guarantee
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Veterinary Health Pass
              </li>
              <li className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                Cold Chain Chilled Meat Transit
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Customer Hotline
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+880 1700-KURBANI (58722)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>support@agrokurbani.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Level 6, Agro Tower, Tejgaon I/A, Dhaka</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 Agro Kurbani System. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for Shariah-compliant sacrificial distribution
          </p>
        </div>
      </div>
    </footer>
  );
};
