import React, { useState, useEffect } from 'react';
import { Animal, Order } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ShareProgress } from '../components/ShareProgress';
import { PlusCircle, Scale, DollarSign, Package, LayoutDashboard, Trash2, Edit3, CheckCircle2, ShieldCheck, X } from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Add Animal Modal Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Bull' | 'Cow' | 'Goat' | 'Sheep' | 'Camel'>('Bull');
  const [breed, setBreed] = useState('Shahiwal');
  const [age, setAge] = useState('2.5 Years');
  const [weight, setWeight] = useState<number>(500);
  const [price, setPrice] = useState<number>(250000);
  const [totalShares, setTotalShares] = useState<number>(7);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=1000&q=80');
  const [teethCount, setTeethCount] = useState<number>(4);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchFarmerData = async () => {
    setLoading(true);
    try {
      const [sRes, aRes, oRes] = await Promise.all([
        api.getFarmerStats(),
        api.getFarmerAnimals(),
        api.getFarmerOrders(),
      ]);
      setStats(sRes);
      setAnimals(aRes.animals);
      setOrders(oRes.orders);
    } catch (err) {
      console.error('Failed to load farmer dashboard', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmerData();
  }, []);

  const handleAddAnimal = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    try {
      await api.createAnimal({
        title,
        category,
        breed,
        age,
        weight,
        price,
        total_shares: category === 'Goat' || category === 'Sheep' ? 1 : totalShares,
        description,
        image,
        teeth_count: teethCount,
        health_certified: true,
        organic_fed: true,
      });

      setShowAddModal(false);
      // Reset form
      setTitle('');
      fetchFarmerData();
    } catch (err: any) {
      setFormError(err.message || 'Failed to add animal listing');
    }
  };

  const handleDeleteAnimal = async (id: number) => {
    if (window.confirm('Are you sure you want to remove this animal listing?')) {
      try {
        await api.deleteAnimal(id);
        fetchFarmerData();
      } catch (err) {
        console.error('Failed to delete animal', err);
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId: number, status: any) => {
    try {
      await api.updateOrderStatus(orderId, status);
      fetchFarmerData();
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-slate-500">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        Loading Farmer Portal...
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl border border-slate-800">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/20 px-2.5 py-1 rounded-md border border-emerald-400/30">
            Partner Farmer Portal
          </span>
          <h1 className="text-3xl font-black mt-2">{user?.farm_name || user?.name || 'My Agro Farm'}</h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Manage your sacrificial livestock, monitor open 7-share partial bookings, and view earnings.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-5 py-3 rounded-xl flex items-center gap-2 shadow-md transition-all active:scale-98 shrink-0"
        >
          <PlusCircle className="w-4 h-4" /> Add New Livestock
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Total Animals</span>
          <div className="text-2xl font-black text-slate-900">{stats?.totalAnimals || 0} Listed</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Sold Out Animals</span>
          <div className="text-2xl font-black text-emerald-700">{stats?.soldAnimals || 0} Sold</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Total Share Orders</span>
          <div className="text-2xl font-black text-slate-900">{stats?.totalOrders || 0} Bookings</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Earned Income</span>
          <div className="text-2xl font-black text-emerald-700">৳{(stats?.totalEarned || 0).toLocaleString()}</div>
        </div>
      </div>

      {/* Listed Animals Table/Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <h3 className="font-bold text-slate-900 text-base">My Farm Livestock Listings ({animals.length})</h3>
        </div>

        {animals.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">
            No livestock added yet. Click "Add New Livestock" above to list your cattle.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {animals.map((animal) => {
              const pricePerShare = Math.round(animal.price / animal.total_shares);
              return (
                <div key={animal.id} className="border border-slate-200 rounded-2xl p-4 flex gap-4 bg-slate-50/50">
                  <img src={animal.image} alt={animal.title} className="w-24 h-24 rounded-xl object-cover" />
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-100 px-2 py-0.5 rounded-xs">
                          {animal.category} • {animal.breed}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-0.5">{animal.title}</h4>
                      </div>
                      <button
                        onClick={() => handleDeleteAnimal(animal.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs text-slate-600 flex justify-between">
                      <span>Weight: <strong>{animal.weight} kg</strong></span>
                      <span>Total Price: <strong className="text-emerald-700">৳{animal.price.toLocaleString()}</strong></span>
                    </div>

                    <ShareProgress totalShares={animal.total_shares} availableShares={animal.available_shares} compact={true} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Farm Orders Inspection & Status Updater */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-4">
          Incoming Orders & Delivery Workflow ({orders.length})
        </h3>

        {orders.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">No orders received for your farm yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3 rounded-l-lg">Order #</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Animal & Shares</th>
                  <th className="p-3">Total Amount</th>
                  <th className="p-3">Current Status</th>
                  <th className="p-3 rounded-r-lg">Update Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-emerald-800">#{o.order_number}</td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{o.customer_name}</div>
                      <div className="text-[10px] text-slate-500">{o.customer_phone}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-slate-800">{o.animal_title}</div>
                      <div className="text-[10px] text-slate-500">{o.shares} Share(s) booked</div>
                    </td>
                    <td className="p-3 font-bold text-emerald-700">৳{o.total_price.toLocaleString()}</td>
                    <td className="p-3">
                      <span className="capitalize font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        {o.delivery_status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={o.delivery_status}
                        onChange={(e: any) => handleUpdateOrderStatus(o.id, e.target.value)}
                        className="bg-white border border-slate-300 text-slate-800 text-xs rounded-lg px-2 py-1 font-medium focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="processing">Processing</option>
                        <option value="farm_preparing">Farm Preparing</option>
                        <option value="slaughtered">Slaughtered (Executed)</option>
                        <option value="packaged">Packaged</option>
                        <option value="shipping">In Shipping Transit</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Animal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh] space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">List New Livestock for Kurbani</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="bg-rose-50 text-rose-800 border border-rose-200 text-xs p-3 rounded-xl font-medium">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddAnimal} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Title / Name of Cattle</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shahiwal Royal Red Bull (Bahadur)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e: any) => {
                      const cat = e.target.value;
                      setCategory(cat);
                      if (cat === 'Goat' || cat === 'Sheep') setTotalShares(1);
                      else setTotalShares(7);
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option value="Bull">Bull / Cattle</option>
                    <option value="Cow">Deshi Cow</option>
                    <option value="Goat">Goat (Khasi)</option>
                    <option value="Sheep">Sheep (Garole)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Breed</label>
                  <input
                    type="text"
                    required
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Live Weight (kg)</label>
                  <input
                    type="number"
                    required
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Price (৳)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Shares</label>
                  <input
                    type="number"
                    required
                    readOnly={category === 'Goat' || category === 'Sheep'}
                    value={totalShares}
                    onChange={(e) => setTotalShares(Number(e.target.value))}
                    className="w-full bg-slate-100 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description & Organic Feed</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe feeding habits, temperament, vaccination..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-700 text-white rounded-xl font-bold hover:bg-emerald-800"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
