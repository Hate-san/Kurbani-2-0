import React, { useState, useEffect } from 'react';
import { Order } from '../types';
import { api } from '../services/api';
import { DeliveryTracker } from '../components/DeliveryTracker';
import { ShoppingBag, Calendar, MapPin, Printer, ShieldCheck, Clock, CheckCircle2, QrCode } from 'lucide-react';

export const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.getOrders();
        setOrders(res.orders);
        if (res.orders.length > 0) {
          setSelectedOrder(res.orders[0]);
        }
      } catch (err) {
        console.error('Failed to load orders', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handlePrintReceipt = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-slate-500">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        Loading your Kurbani orders...
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-2">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Customer Portal</span>
        <h1 className="text-3xl font-black">My Kurbani Orders & Live Tracking</h1>
        <p className="text-xs text-slate-300">
          Track the status of your sacrificial cattle, slaughter execution, and meat packaging delivery.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Orders Found Yet</h3>
          <p className="text-xs text-slate-500">You haven’t placed any Kurbani bookings yet this season.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Orders List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">
              All Orders ({orders.length})
            </h3>
            {orders.map((order) => {
              const isSelected = selectedOrder?.id === order.id;
              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-xs">
                        #{order.order_number}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm mt-1">{order.animal_title}</h4>
                    </div>
                    <span className="text-xs font-black text-emerald-800">
                      ৳{order.total_price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-500 mt-3 pt-2 border-t border-slate-100">
                    <span>
                      Booking: <strong>{order.shares} Share(s)</strong>
                    </span>
                    <span className="capitalize font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {order.delivery_status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Selected Order Details & Live Tracker */}
          {selectedOrder && (
            <div className="lg:col-span-7 space-y-6">
              {/* Delivery Step Tracker */}
              <DeliveryTracker status={selectedOrder.delivery_status} orderNumber={selectedOrder.order_number} />

              {/* Receipt / Invoice Printable Box */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6 print:p-0 print:border-none">
                <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      OFFICIAL AGRO KURBANI RECEIPT
                    </span>
                    <h3 className="text-xl font-black text-slate-900">Order #{selectedOrder.order_number}</h3>
                    <p className="text-xs text-slate-500">
                      Date: {new Date(selectedOrder.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <button
                    onClick={handlePrintReceipt}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors print:hidden"
                  >
                    <Printer className="w-4 h-4" /> Print Receipt
                  </button>
                </div>

                {/* Items & Financial Table */}
                <div className="space-y-3 text-xs">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex justify-between font-bold text-slate-800 text-sm">
                      <span>{selectedOrder.animal_title}</span>
                      <span>৳{selectedOrder.total_price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Purchased Type / Shares:</span>
                      <strong className="text-slate-800">
                        {selectedOrder.purchase_type === 'whole'
                          ? 'Whole Animal'
                          : `${selectedOrder.shares} Share(s) @ ৳${selectedOrder.price_per_share.toLocaleString()}`}
                      </strong>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Payment Method:</span>
                      <strong className="text-slate-800">{selectedOrder.payment_method}</strong>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Transaction Reference:</span>
                      <strong className="text-emerald-700 font-mono">{selectedOrder.transaction_id}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Delivery Address</span>
                      <p className="font-medium text-slate-800">{selectedOrder.delivery_address}</p>
                      <p className="text-slate-500">{selectedOrder.delivery_city}</p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Processing Choice</span>
                      <p className="font-bold text-emerald-800 capitalize">
                        {selectedOrder.delivery_option?.replace('_', ' ') || 'Packaged Meat'}
                      </p>
                      {selectedOrder.special_instructions && (
                        <p className="text-[11px] text-slate-500 italic">"{selectedOrder.special_instructions}"</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Verification & Simulated QR Code */}
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span>Verified Shariah Sacrificial Booking</span>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-[10px] font-mono text-slate-700">
                    <QrCode className="w-4 h-4 text-slate-600" />
                    <span>AK-LEDGER-{selectedOrder.id}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
