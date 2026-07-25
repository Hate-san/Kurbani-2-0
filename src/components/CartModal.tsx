import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { X, Trash2, ShoppingBag, ShieldCheck, CheckCircle2, ArrowRight, CreditCard, Smartphone, Banknote } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: any) => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, onOrderSuccess }) => {
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState<'cart' | 'checkout' | 'processing'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Credit Card' | 'Cash on Delivery'>('bKash');
  const [deliveryAddress, setDeliveryAddress] = useState('House 42, Road 11, Banani');
  const [deliveryCity, setDeliveryCity] = useState('Dhaka');
  const [deliveryOption, setDeliveryOption] = useState<'meat_packaged' | 'live_animal' | 'charity_donated'>('meat_packaged');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!user) {
      setError('Please sign in or use the Role Switcher at top right to place an order.');
      return;
    }

    setStep('processing');
    setError(null);

    try {
      // Process first cart item (or loop for multiple)
      const item = cart[0];
      const res = await api.createOrder({
        animal_id: item.animal.id,
        purchase_type: item.purchase_type,
        shares: item.shares,
        payment_method: paymentMethod,
        delivery_address: deliveryAddress,
        delivery_city: deliveryCity,
        delivery_option: deliveryOption,
        special_instructions: specialInstructions,
      });

      clearCart();
      setStep('cart');
      onClose();
      onOrderSuccess(res.order);
    } catch (err: any) {
      setError(err.message || 'Checkout failed');
      setStep('checkout');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base">
              {step === 'cart' ? 'Your Kurbani Shares Cart' : 'Checkout & Delivery Details'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {error && (
            <div className="bg-rose-50 text-rose-800 border border-rose-200 text-xs p-3 rounded-xl font-medium">
              {error}
            </div>
          )}

          {step === 'cart' ? (
            cart.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-800">Your Cart is Empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our verified cattle & goat market to select and book 7-share partial Kurbani slots.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => {
                  const pricePerShare = Math.round(item.animal.price / item.animal.total_shares);
                  return (
                    <div
                      key={item.animal.id}
                      className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl"
                    >
                      <img
                        src={item.animal.image}
                        alt={item.animal.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-100 px-2 py-0.5 rounded-xs">
                          {item.animal.category}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-0.5">{item.animal.title}</h4>
                        <div className="text-xs text-slate-500 mt-1">
                          Booking:{' '}
                          <strong className="text-slate-800">
                            {item.purchase_type === 'whole'
                              ? 'Whole Animal'
                              : `${item.shares} Share(s) (out of ${item.animal.total_shares})`}
                          </strong>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-base font-black text-emerald-700">
                          ৳{item.total_price.toLocaleString()}
                        </div>
                        <span className="text-[10px] text-slate-400 block">
                          ৳{pricePerShare.toLocaleString()} / share
                        </span>
                        <button
                          onClick={() => removeFromCart(item.animal.id)}
                          className="mt-1 text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 justify-end ml-auto"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex justify-between items-center text-xs text-emerald-900 font-medium">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span>Includes veterinary inspection, weight verification & cold-chain distribution.</span>
                  </div>
                </div>
              </div>
            )
          ) : step === 'checkout' ? (
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-5">
              {/* Delivery Option */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Delivery & Processing Option
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryOption('meat_packaged')}
                    className={`p-3 text-left rounded-xl border transition-all text-xs ${
                      deliveryOption === 'meat_packaged'
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 font-bold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-slate-900">Portioned Meat</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Vacuum sealed meat packaging</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryOption('live_animal')}
                    className={`p-3 text-left rounded-xl border transition-all text-xs ${
                      deliveryOption === 'live_animal'
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 font-bold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-slate-900">Live Animal</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Delivered live to home ahead</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryOption('charity_donated')}
                    className={`p-3 text-left rounded-xl border transition-all text-xs ${
                      deliveryOption === 'charity_donated'
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 font-bold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-slate-900">Full Charity</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Distribute to underprivileged</div>
                  </button>
                </div>
              </div>

              {/* Address */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Street Address / House / Sector
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City / Region</label>
                  <input
                    type="text"
                    required
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Special Instructions / Portion Division (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Divide meat into 3 equal portions (Family, Relatives, Poor)"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  2. Select Payment Method
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bKash')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
                      paymentMethod === 'bKash'
                        ? 'border-pink-600 bg-pink-50 text-pink-900 ring-2 ring-pink-500'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-pink-600" />
                    <span>bKash Payment</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Nagad')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
                      paymentMethod === 'Nagad'
                        ? 'border-orange-600 bg-orange-50 text-orange-900 ring-2 ring-orange-500'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-orange-600" />
                    <span>Nagad Express</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Credit Card')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
                      paymentMethod === 'Credit Card'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-emerald-600" />
                    <span>Credit / Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Cash on Delivery')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold ${
                      paymentMethod === 'Cash on Delivery'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-blue-600" />
                    <span>Pay at Farm</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <h4 className="text-base font-bold text-slate-800">Processing Your Kurbani Order...</h4>
              <p className="text-xs text-slate-500">Communicating with Agro Kurbani Gateway & Farm Ledger.</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {cart.length > 0 && step !== 'processing' && (
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center">
            <div>
              <span className="text-xs text-slate-500 block">Total Payable:</span>
              <span className="text-xl font-black text-emerald-700">৳{cartTotal.toLocaleString()}</span>
            </div>

            {step === 'cart' ? (
              <button
                onClick={() => setStep('checkout')}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center gap-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs px-4 py-3 rounded-xl"
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center gap-2 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm & Pay ৳{cartTotal.toLocaleString()}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
