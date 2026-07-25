import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { ShariahBadge } from '../components/ShariahBadge';
import { Mail, Lock, User, Phone, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface AuthPageProps {
  onSuccess: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess }) => {
  const { login, register, quickLoginAs } = useAuth();
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [farmName, setFarmName] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isRegister) {
        await register({
          name,
          email,
          phone,
          password,
          role,
          farm_name: role === 'farmer' ? farmName : undefined,
        });
      } else {
        await login(email, password);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (demoRole: UserRole) => {
    setLoading(true);
    try {
      await quickLoginAs(demoRole);
      onSuccess();
    } catch (err) {
      setError('Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white border border-slate-200 rounded-3xl shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <ShariahBadge />
        <h2 className="text-2xl font-black text-slate-900">
          {isRegister ? 'Create Agro Kurbani Account' : 'Sign In to Your Account'}
        </h2>
        <p className="text-xs text-slate-500">
          {isRegister
            ? 'Join as a Buyer or Partner Farmer to list livestock'
            : 'Access your sacrificial bookings & farm dashboard'}
        </p>
      </div>

      {/* Demo Quick Login Buttons */}
      <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-xs space-y-2">
        <div className="font-bold text-amber-900 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-600" /> Demo Quick Login (One Click):
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => handleQuickDemo('customer')}
            className="bg-white hover:bg-amber-100 text-amber-950 font-bold p-2 rounded-xl border border-amber-300 text-[11px]"
          >
            Buyer Demo
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('farmer')}
            className="bg-white hover:bg-amber-100 text-amber-950 font-bold p-2 rounded-xl border border-amber-300 text-[11px]"
          >
            Farmer Demo
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('admin')}
            className="bg-white hover:bg-amber-100 text-amber-950 font-bold p-2 rounded-xl border border-amber-300 text-[11px]"
          >
            Admin Demo
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-xl font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {isRegister && (
          <>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g., Rahim Ahmed"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="+880 1711 000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Account Role</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                    role === 'customer'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  Kurbani Buyer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('farmer')}
                  className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                    role === 'farmer'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  Agro Farmer
                </button>
              </div>
            </div>

            {role === 'farmer' && (
              <div>
                <label className="block font-bold text-slate-700 mb-1">Agro Farm Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shariful Organic Cattle Farm"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
            )}
          </>
        )}

        <div>
          <label className="block font-bold text-slate-700 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="email"
              required
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
        >
          <span>{loading ? 'Processing...' : isRegister ? 'Register Account' : 'Sign In'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="text-center pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          className="text-xs font-bold text-emerald-700 hover:underline"
        >
          {isRegister ? 'Already have an account? Sign In' : 'Need an account? Register as Buyer or Farmer'}
        </button>
      </div>
    </div>
  );
};
