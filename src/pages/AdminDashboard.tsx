import React, { useState, useEffect } from 'react';
import { User, Order, SystemStats } from '../types';
import { api } from '../services/api';
import { Users, ShoppingBag, DollarSign, PieChart, Trash2, ShieldCheck, FileText, Activity } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'orders' | 'reports'>('analytics');
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [rRes, uRes, oRes] = await Promise.all([
        api.getAdminReports(),
        api.getAdminUsers(),
        api.getAdminOrders(),
      ]);
      setStats(rRes.stats);
      setUsers(uRes.users);
      setOrders(oRes.orders);
    } catch (err) {
      console.error('Failed to load admin panel data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('Delete this user from the system database?')) {
      try {
        await api.deleteAdminUser(id);
        fetchAdminData();
      } catch (err) {
        console.error('Failed to delete user', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-slate-500">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        Loading System Administration Panel...
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Title Header */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-2 shadow-xl border border-slate-800">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-500/20 px-2.5 py-1 rounded-md border border-amber-400/30">
          Super Admin Console
        </span>
        <h1 className="text-3xl font-black">Agro Kurbani System Control</h1>
        <p className="text-xs text-slate-300">
          Monitor multi-farm cattle inventory, user registration database, orders pipeline, and financial reports.
        </p>

        {/* Tab Switchers */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'analytics'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            System Analytics
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'users'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Manage Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'orders'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All System Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'reports'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Financial Reports
          </button>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs text-slate-500 font-medium">Total Platform Revenue</span>
            <div className="text-2xl font-black text-emerald-700">৳{stats.totalRevenue.toLocaleString()}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs text-slate-500 font-medium">Total Shares Purchased</span>
            <div className="text-2xl font-black text-slate-900">{stats.totalSharesSold} Shares</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs text-slate-500 font-medium">Registered Users</span>
            <div className="text-2xl font-black text-slate-900">
              {stats.totalUsers} ({stats.totalCustomers} Buyers, {stats.totalFarmers} Farms)
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs text-slate-500 font-medium">Total Listed Cattle</span>
            <div className="text-2xl font-black text-slate-900">
              {stats.totalAnimals} ({stats.totalSoldAnimals} Sold)
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: System Analytics */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" /> Platform Health Metrics
            </h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span>Database Connection Status:</span>
                <strong className="text-emerald-700 font-mono">Connected (MySQL Ledger Engine)</strong>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span>Total Orders Executed:</span>
                <strong className="text-slate-900">{stats?.totalOrders} Orders</strong>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl">
                <span>Shariah Health Inspection Ratio:</span>
                <strong className="text-emerald-700">100% Passed Doctor Pass</strong>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <PieChart className="w-5 h-5 text-emerald-600" /> Partial Kurbani Distribution
            </h3>
            <p className="text-xs text-slate-500">
              92% of cattle purchases are made using the 7-share partial system, making Qurbani affordable for urban families.
            </p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs font-bold text-emerald-900">
              Average shares booked per customer: 1.8 Shares
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: User Management */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base">System Registered Users Database</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">User ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email & Phone</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Farm/Location</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-500">#{u.id}</td>
                    <td className="p-3 font-bold text-slate-900">{u.name}</td>
                    <td className="p-3">
                      <div>{u.email}</div>
                      <div className="text-[10px] text-slate-400">{u.phone}</div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`font-bold px-2.5 py-0.5 rounded-full uppercase text-[10px] ${
                          u.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : u.role === 'farmer'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">{u.farm_name || u.location || 'N/A'}</td>
                    <td className="p-3">
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: System Orders */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base">All Platform Orders ({orders.length})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Order #</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Cattle & Shares</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-emerald-800">#{o.order_number}</td>
                    <td className="p-3">{o.customer_name}</td>
                    <td className="p-3 font-medium text-slate-800">
                      {o.animal_title} ({o.shares} Shares)
                    </td>
                    <td className="p-3 font-bold text-emerald-700">৳{o.total_price.toLocaleString()}</td>
                    <td className="p-3 font-mono text-[10px] text-slate-600">
                      {o.payment_method} • {o.transaction_id}
                    </td>
                    <td className="p-3">
                      <span className="capitalize font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {o.delivery_status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Financial Reports */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Kurbani Season 2026 Financial Audit</h3>
            <button
              onClick={() => window.print()}
              className="bg-slate-100 text-slate-800 font-bold text-xs px-3 py-1.5 rounded-lg"
            >
              Print Audit PDF
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border space-y-1">
              <span className="text-slate-500">Gross Booking Value</span>
              <div className="text-xl font-black text-slate-900">৳{stats?.totalRevenue.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
              <span className="text-emerald-800">Farmer Disbursal (95%)</span>
              <div className="text-xl font-black text-emerald-900">
                ৳{Math.round((stats?.totalRevenue || 0) * 0.95).toLocaleString()}
              </div>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
              <span className="text-amber-800">Platform Service Revenue (5%)</span>
              <div className="text-xl font-black text-amber-900">
                ৳{Math.round((stats?.totalRevenue || 0) * 0.05).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
