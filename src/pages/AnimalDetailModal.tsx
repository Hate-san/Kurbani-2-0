import React, { useState, useEffect } from 'react';
import { Animal, PurchaseType } from '../types';
import { useCart } from '../context/CartContext';
import { ShareProgress } from '../components/ShareProgress';
import { api } from '../services/api';
import { X, Scale, MapPin, ShieldCheck, CheckCircle2, ShoppingBag, PieChart, Info, User, Sparkles } from 'lucide-react';

interface AnimalDetailModalProps {
  animal: Animal | null;
  onClose: () => void;
  onOpenCart: () => void;
}

export const AnimalDetailModal: React.FC<AnimalDetailModalProps> = ({ animal, onClose, onOpenCart }) => {
  const { addToCart } = useCart();
  const [sharesData, setSharesData] = useState<any[]>([]);
  const [purchaseType, setPurchaseType] = useState<PurchaseType>('share');
  const [selectedShares, setSelectedShares] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    if (animal) {
      setPurchaseType('share');
      setSelectedShares(1);
      setAddedNotice(false);

      // Fetch booked shares info
      api.getAnimalById(animal.id).then((res) => {
        setSharesData(res.shares || []);
      }).catch(err => console.error('Error loading shares', err));
    }
  }, [animal]);

  if (!animal) return null;

  const pricePerShare = Math.round(animal.price / animal.total_shares);
  const effectiveShareCount = purchaseType === 'whole' ? animal.available_shares : selectedShares;
  const totalPriceCalculated = pricePerShare * effectiveShareCount;

  const handleAddToCart = () => {
    addToCart(animal, purchaseType, effectiveShareCount);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
      onOpenCart();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row my-8 max-h-[90vh]">
        {/* Left Side Image & Gallery */}
        <div className="md:w-1/2 bg-slate-900 relative flex flex-col justify-between overflow-hidden min-h-[280px]">
          <img
            src={animal.image}
            alt={animal.title}
            className="w-full h-full object-cover absolute inset-0 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

          {/* Top badges */}
          <div className="relative z-10 p-4 flex justify-between items-center">
            <span className="bg-emerald-600 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              {animal.category}
            </span>
            <button
              onClick={onClose}
              className="md:hidden bg-slate-900/80 text-white p-2 rounded-full hover:bg-slate-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Specs Overlay */}
          <div className="relative z-10 p-6 space-y-3 text-white">
            <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{animal.farm_name || animal.location || 'Savar, Dhaka'}</span>
            </div>
            <h2 className="text-2xl font-black">{animal.title}</h2>
            
            <div className="grid grid-cols-3 gap-2 bg-slate-950/70 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Live Weight</span>
                <strong className="text-emerald-400 text-sm">{animal.weight} kg</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Age</span>
                <strong className="text-slate-200 text-sm">{animal.age}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Teeth</span>
                <strong className="text-slate-200 text-sm">{animal.teeth_count || 2} Teeth</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Options & Partial Share Selector */}
        <div className="md:w-1/2 p-6 overflow-y-auto flex-1 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Header Title for Desktop */}
            <div className="hidden md:flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-md">
                  Breed: {animal.breed}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">{animal.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 leading-relaxed">{animal.description}</p>

            {/* Health Verification Pass */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-3 text-xs text-emerald-900">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong className="block font-bold">100% Organic Grass Fed & Disease Free</strong>
                Verified by Veterinary Doctor pass. Guaranteed live weigh-in before delivery.
              </div>
            </div>

            {/* Live Share Allocation Visualizer */}
            <ShareProgress
              totalShares={animal.total_shares}
              availableShares={animal.available_shares}
              sharesData={sharesData}
            />

            {/* Interactive Purchase Type Toggle */}
            {animal.status === 'available' && animal.available_shares > 0 ? (
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Select Purchase Type
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {animal.total_shares > 1 && (
                    <button
                      type="button"
                      onClick={() => setPurchaseType('share')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        purchaseType === 'share'
                          ? 'border-emerald-600 bg-emerald-50/80 text-emerald-900 ring-2 ring-emerald-500 font-bold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-bold">Partial Share(s)</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Choose 1 to {animal.available_shares} shares
                      </div>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setPurchaseType('whole')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      purchaseType === 'whole'
                        ? 'border-emerald-600 bg-emerald-50/80 text-emerald-900 ring-2 ring-emerald-500 font-bold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold">Whole Animal</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Buy all remaining {animal.available_shares} shares
                    </div>
                  </button>
                </div>

                {/* Share Count Stepper */}
                {purchaseType === 'share' && animal.total_shares > 1 && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800">How Many Shares Do You Need?</span>
                      <span className="text-emerald-700 font-extrabold">
                        ৳{pricePerShare.toLocaleString()} / share
                      </span>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <button
                        type="button"
                        disabled={selectedShares <= 1}
                        onClick={() => setSelectedShares((s) => Math.max(1, s - 1))}
                        className="w-10 h-10 rounded-lg bg-white border border-slate-300 font-black text-slate-700 hover:bg-slate-100 disabled:opacity-40"
                      >
                        -
                      </button>
                      <span className="text-lg font-black text-slate-900 w-12 text-center">
                        {selectedShares}
                      </span>
                      <button
                        type="button"
                        disabled={selectedShares >= animal.available_shares}
                        onClick={() => setSelectedShares((s) => Math.min(animal.available_shares, s + 1))}
                        className="w-10 h-10 rounded-lg bg-white border border-slate-300 font-black text-slate-700 hover:bg-slate-100 disabled:opacity-40"
                      >
                        +
                      </button>
                      <span className="text-xs text-slate-500 ml-auto font-medium">
                        (Max {animal.available_shares} open)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-center text-rose-800 font-bold text-xs">
                This animal is fully sold out for this season.
              </div>
            )}
          </div>

          {/* Pricing Summary & Action */}
          {animal.status === 'available' && animal.available_shares > 0 && (
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs text-slate-500 block font-medium">Total Price:</span>
                  <span className="text-2xl font-black text-emerald-700">
                    ৳{totalPriceCalculated.toLocaleString()}
                  </span>
                </div>
                <div className="text-right text-xs text-slate-500">
                  {purchaseType === 'whole' ? '100% Animal Purchase' : `${effectiveShareCount} Share(s)`}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={addedNotice}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                {addedNotice ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                    <span>Added to Cart! Redirecting...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>
                      Add {effectiveShareCount} Share(s) to Cart (৳{totalPriceCalculated.toLocaleString()})
                    </span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
