import React from 'react';
import { Animal } from '../types';
import { ShareProgress } from './ShareProgress';
import { MapPin, Scale, ShieldCheck, ArrowRight } from 'lucide-react';

interface AnimalCardProps {
  animal: Animal;
  onSelect: (animal: Animal) => void;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ animal, onSelect }) => {
  const pricePerShare = Math.round(animal.price / animal.total_shares);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group">
      {/* Image Banner */}
      <div className="relative h-56 bg-slate-100 overflow-hidden">
        <img
          src={animal.image}
          alt={animal.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Category & Status Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {animal.category}
          </span>
          {animal.health_certified && (
            <span className="bg-emerald-600/90 backdrop-blur-md text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Health Pass
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
              animal.status === 'available'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'bg-rose-600 text-white shadow-xs'
            }`}
          >
            {animal.status === 'available' ? `${animal.available_shares} Shares Left` : 'SOLD OUT'}
          </span>
        </div>

        {/* Weight & Breed overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-xs text-white bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
          <span className="flex items-center gap-1 font-medium">
            <Scale className="w-3.5 h-3.5 text-emerald-400" />
            Live Wt: <strong className="text-white">{animal.weight} kg</strong>
          </span>
          <span className="font-semibold text-slate-200">{animal.breed}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center text-xs text-slate-500 gap-1 mb-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span className="truncate">{animal.farm_name || animal.location || 'Savar, Dhaka'}</span>
          </div>
          <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-emerald-700 transition-colors">
            {animal.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{animal.description}</p>
        </div>

        {/* Share Progress Bar */}
        <ShareProgress totalShares={animal.total_shares} availableShares={animal.available_shares} compact={true} />

        {/* Pricing & CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-end justify-between">
          <div>
            <div className="text-[11px] text-slate-500 font-medium">
              Share Price ({animal.total_shares} Shares):
            </div>
            <div className="text-lg font-extrabold text-emerald-700">
              ৳{pricePerShare.toLocaleString()} <span className="text-xs font-medium text-slate-500">/ share</span>
            </div>
            <div className="text-[10px] text-slate-400 font-normal">
              Full Animal: ৳{animal.price.toLocaleString()}
            </div>
          </div>

          <button
            onClick={() => onSelect(animal)}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-xs transition-all active:scale-98"
          >
            <span>Book Shares</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
