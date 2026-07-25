import React, { useState, useEffect } from 'react';
import { Animal } from '../types';
import { api } from '../services/api';
import { AnimalCard } from '../components/AnimalCard';
import { ShariahBadge } from '../components/ShariahBadge';
import { ShieldCheck, ArrowRight, PieChart, Scale, Truck, Award, Users, CheckCircle, Sparkles } from 'lucide-react';

interface HomeProps {
  onSelectAnimal: (animal: Animal) => void;
  onNavigate: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectAnimal, onNavigate }) => {
  const [featuredAnimals, setFeaturedAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await api.getAnimals();
        setFeaturedAnimals(res.animals.slice(0, 4));
      } catch (err) {
        console.error('Failed to load featured animals', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimals();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 shadow-2xl border border-emerald-800/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <ShariahBadge />

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              Shariah Compliant <span className="text-emerald-400">7-Share Partial</span> Kurbani System
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Buy 1 or multiple sacrificial shares or purchase whole cattle directly from verified Bangladesh agro farms. Guaranteed live weigh-in, veterinary health certificates, and chilled hygiene meat packaging.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('animals')}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm px-7 py-3.5 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-emerald-500/20 transition-all transform active:scale-98"
              >
                <span>Browse Kurbani Animals</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('how-it-works')}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3.5 rounded-xl border border-white/20 transition-all"
              >
                How 7 Shares Work
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-2xl font-black text-emerald-400">100%</div>
                <div className="text-[11px] text-slate-400">Shariah Verified</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-400">7 Shares</div>
                <div className="text-[11px] text-slate-400">Per Bull / Cow</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-400">Cold Chain</div>
                <div className="text-[11px] text-slate-400">Hygienic Delivery</div>
              </div>
            </div>
          </div>

          {/* Right Highlight Box */}
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <PieChart className="w-4 h-4" /> How Partial Kurbani Works
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                1 Bull = 7 Shares
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shrink-0">1</div>
                <div>
                  <strong className="text-white block">Select Cattle & Shares</strong>
                  Choose an animal and specify how many shares (1 to 7) you need.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shrink-0">2</div>
                <div>
                  <strong className="text-white block">Shared Allocation Track</strong>
                  Watch remaining open slots fill up in real time on our transparent ledger.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shrink-0">3</div>
                <div>
                  <strong className="text-white block">Sacrifice & Meat Delivery</strong>
                  Executed on Eid day following Islamic guidelines with chilled meat home delivery.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Quick Selector */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Explore Sacrificial Categories</h2>
            <p className="text-xs text-slate-500 mt-0.5">Filter livestock by category, weight class, and share options</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigate('animals')}
            className="cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-center space-y-2 group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto text-xl font-black group-hover:scale-110 transition-transform">
              🐂
            </div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700">Bull / Red Cattle</h3>
            <span className="text-[11px] text-slate-500 block">7 Partial Shares Available</span>
          </div>

          <div
            onClick={() => onNavigate('animals')}
            className="cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-center space-y-2 group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto text-xl font-black group-hover:scale-110 transition-transform">
              🐄
            </div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700">Deshi Cow</h3>
            <span className="text-[11px] text-slate-500 block">7 Partial Shares Available</span>
          </div>

          <div
            onClick={() => onNavigate('animals')}
            className="cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-center space-y-2 group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto text-xl font-black group-hover:scale-110 transition-transform">
              🐐
            </div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700">Goat (Khasi)</h3>
            <span className="text-[11px] text-slate-500 block">Single Full Sacrifice</span>
          </div>

          <div
            onClick={() => onNavigate('animals')}
            className="cursor-pointer bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-center space-y-2 group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto text-xl font-black group-hover:scale-110 transition-transform">
              🐑
            </div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700">Garole Sheep</h3>
            <span className="text-[11px] text-slate-500 block">Single Full Sacrifice</span>
          </div>
        </div>
      </section>

      {/* Featured Animals List */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Live Market
              </span>
              <h2 className="text-2xl font-black text-slate-900">Featured Cattle & Open Shares</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">Verified organic livestock with open partial shares</p>
          </div>

          <button
            onClick={() => onNavigate('animals')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All Market Animals</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-80 border border-slate-200 animate-pulse p-4 space-y-4">
                <div className="bg-slate-200 h-40 rounded-xl" />
                <div className="bg-slate-200 h-4 rounded-md w-3/4" />
                <div className="bg-slate-200 h-4 rounded-md w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} onSelect={onSelectAnimal} />
            ))}
          </div>
        )}
      </section>

      {/* Trust & Features Section */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <ShariahBadge />
          <h2 className="text-2xl sm:text-3xl font-black">Why Agro Kurbani is Bangladesh’s Most Trusted Platform</h2>
          <p className="text-xs text-slate-400">Eliminating hassle, middle-men markups, and unhygienic slaughter setups.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Live Scale Weigh-in</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every cattle is weighed live on digital industrial scales in front of video camera before list creation. No estimates or visual guessing.
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Shariah & Vet Health Pass</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Certified free of harmful steroid hormones, fully vaccinated, disease inspected, and verified for correct age teeth count.
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white">Chilled Meat Cold Chain</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Meat processed in hygienic facility, portioned into vacuum packs, and delivered via cold-chain refrigerated vans directly to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Farmer Call to Action */}
      <section className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">For Agro Livestock Farms</span>
          <h3 className="text-2xl font-black text-slate-900">Are you a Dairy or Cattle Farm Owner?</h3>
          <p className="text-xs text-slate-600 max-w-xl">
            List your bulls, cows, and goats on Agro Kurbani to reach thousands of urban buyers directly without middleman commissions.
          </p>
        </div>

        <button
          onClick={() => onNavigate('farmer')}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-6 py-3.5 rounded-xl shrink-0 shadow-md transition-all"
        >
          Open Farmer Dashboard & List Cattle
        </button>
      </section>
    </div>
  );
};
