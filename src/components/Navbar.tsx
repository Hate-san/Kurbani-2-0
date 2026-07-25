import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { UserRole } from '../types';
import { ShariahBadge } from './ShariahBadge';
import { ShoppingBag, User, LogOut, ShieldAlert, LayoutDashboard, Sparkles, Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openCart }) => {
  const { user, logout, quickLoginAs } = useAuth();
  const { cart } = useCart();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [roleDropdown, setRoleDropdown] = useState(false);

  const handleRoleSwitch = async (role: UserRole) => {
    await quickLoginAs(role);
    setRoleDropdown(false);
    if (role === 'farmer') setActiveTab('farmer');
    else if (role === 'admin') setActiveTab('admin');
    else setActiveTab('home');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 flex justify-between items-center overflow-x-auto">
        <div className="flex items-center gap-3 mx-auto sm:mx-0">
          <span className="font-semibold text-emerald-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Eid-ul-Adha Kurbani 2026 Season
          </span>
          <span className="hidden md:inline text-emerald-300/80">• Verified Farms & 7-Share Partial Kurbani Booking Open</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-emerald-200">
          <span>Need Assistance? <strong>+880 1700-KURBANI</strong></span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-hidden"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-900 text-white flex items-center justify-center font-black text-xl shadow-xs group-hover:scale-105 transition-transform">
            AK
          </div>
          <div>
            <span className="font-black text-lg text-slate-900 tracking-tight block leading-tight group-hover:text-emerald-700 transition-colors">
              AGRO <span className="text-emerald-700">KURBANI</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase block -mt-0.5">
              Partial Kurbani System
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3.5 py-2 rounded-lg transition-colors ${
              activeTab === 'home' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('animals')}
            className={`px-3.5 py-2 rounded-lg transition-colors ${
              activeTab === 'animals' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Kurbani Market
          </button>
          <button
            onClick={() => setActiveTab('how-it-works')}
            className={`px-3.5 py-2 rounded-lg transition-colors ${
              activeTab === 'how-it-works' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            7-Share System
          </button>
          {user && (
            <button
              onClick={() => setActiveTab(user.role === 'farmer' ? 'farmer' : user.role === 'admin' ? 'admin' : 'my-orders')}
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                ['my-orders', 'farmer', 'admin'].includes(activeTab) ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-600" />
              {user.role === 'farmer' ? 'Farmer Dashboard' : user.role === 'admin' ? 'Admin Panel' : 'My Orders'}
            </button>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdown(!roleDropdown)}
              className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs transition-all"
              title="Quickly switch roles to test Customer, Farmer, or Admin modes"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>Role: <strong className="uppercase">{user ? user.role : 'Guest'}</strong></span>
              <ChevronDown className="w-3 h-3 text-amber-700" />
            </button>

            {roleDropdown && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Switch Persona (Demo)
                </div>
                <button
                  onClick={() => handleRoleSwitch('customer')}
                  className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-emerald-50 flex items-center justify-between ${
                    user?.role === 'customer' ? 'text-emerald-700 bg-emerald-50/50' : 'text-slate-700'
                  }`}
                >
                  <span>Customer (Rahim)</span>
                  {user?.role === 'customer' && <span className="text-[10px] bg-emerald-600 text-white px-1.5 rounded-xs">Active</span>}
                </button>
                <button
                  onClick={() => handleRoleSwitch('farmer')}
                  className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-emerald-50 flex items-center justify-between ${
                    user?.role === 'farmer' ? 'text-emerald-700 bg-emerald-50/50' : 'text-slate-700'
                  }`}
                >
                  <span>Farmer (Haji Agro)</span>
                  {user?.role === 'farmer' && <span className="text-[10px] bg-emerald-600 text-white px-1.5 rounded-xs">Active</span>}
                </button>
                <button
                  onClick={() => handleRoleSwitch('admin')}
                  className={`w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-emerald-50 flex items-center justify-between ${
                    user?.role === 'admin' ? 'text-emerald-700 bg-emerald-50/50' : 'text-slate-700'
                  }`}
                >
                  <span>System Admin</span>
                  {user?.role === 'admin' && <span className="text-[10px] bg-emerald-600 text-white px-1.5 rounded-xs">Active</span>}
                </button>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <button
            onClick={openCart}
            className="relative p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            title="View Selected Shares Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cart.length}
              </span>
            )}
          </button>

          {/* Auth Button */}
          {user ? (
            <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
              <div className="text-right hidden sm:block">
                <span className="text-xs font-bold text-slate-800 block truncate max-w-[120px]">
                  {user.name}
                </span>
                <span className="text-[10px] text-slate-500 capitalize">{user.role}</span>
              </div>
              <button
                onClick={logout}
                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveTab('login')}
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-all"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenu && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-4 space-y-2">
          <button
            onClick={() => { setActiveTab('home'); setMobileMenu(false); }}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Home
          </button>
          <button
            onClick={() => { setActiveTab('animals'); setMobileMenu(false); }}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            Kurbani Market
          </button>
          <button
            onClick={() => { setActiveTab('how-it-works'); setMobileMenu(false); }}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
          >
            7-Share System Info
          </button>
          {user && (
            <button
              onClick={() => {
                setActiveTab(user.role === 'farmer' ? 'farmer' : user.role === 'admin' ? 'admin' : 'my-orders');
                setMobileMenu(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-emerald-800 bg-emerald-50 rounded-lg"
            >
              Dashboard ({user.role})
            </button>
          )}
        </div>
      )}
    </header>
  );
};
