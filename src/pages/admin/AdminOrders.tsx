import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Order } from '../../types';
import { ShoppingCart } from 'lucide-react';
import { formatRupiah, getOrderStatusBadge, getCourierLabel } from '../../utils/formatters';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter((o) => {
    if (filterStatus !== 'all' && o.status !== filterStatus) return false;
    if (
      search &&
      !o.orderNumber.toLowerCase().includes(search.toLowerCase()) &&
      !o.recipientName.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 space-y-6 pt-6">
        <div className="bg-navy-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Manajemen Pesanan Pelanggan</h1>
            <p className="text-xs text-slate-400">Update status pesanan dari Diproses → Dikirim → Selesai & input nomor resi</p>
          </div>
          <ShoppingCart className="w-8 h-8 text-electro-400" />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs">
          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto">
            {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                  filterStatus === st ? 'bg-electro-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {st === 'all' ? 'Semua Pesanan' : getOrderStatusBadge(st).label}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari no. pesanan / nama..."
            className="w-full sm:w-64 bg-slate-950 text-white rounded-xl p-2.5 border border-slate-800"
          />
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((ord) => (
            <div key={ord.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <div>
                  <span className="font-mono font-bold text-white text-sm">{ord.orderNumber}</span>
                  <p className="text-slate-400">Pelanggan: {ord.userName} ({ord.recipientPhone})</p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full border font-bold ${getOrderStatusBadge(ord.status).bg}`}>
                    {getOrderStatusBadge(ord.status).label}
                  </span>
                  <select
                    value={ord.status}
                    onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                    className="bg-slate-800 text-white rounded-xl px-3 py-1 border border-slate-700 font-semibold focus:outline-none"
                  >
                    <option value="pending">Menunggu Pembayaran</option>
                    <option value="processing">Sedang Diproses</option>
                    <option value="shipped">Dalam Pengiriman</option>
                    <option value="delivered">Selesai (Delivered)</option>
                    <option value="cancelled">Dibatalkan</option>
                  </select>
                </div>
              </div>

              {/* Address & Items */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8 space-y-2">
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Item Dibeli:</span>
                  <div className="space-y-1">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-slate-950 p-2 rounded-xl border border-slate-800">
                        <span className="font-medium text-white truncate max-w-sm">{item.productName}</span>
                        <span className="text-slate-400">{item.quantity} x {formatRupiah(item.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Pengiriman & Total:</span>
                  <p className="text-slate-300">Kurir: {getCourierLabel(ord.courier)}</p>
                  <p className="text-slate-300">Alamat: {ord.shippingAddress}</p>
                  <p className="text-base font-extrabold text-electro-400 pt-1">Total: {formatRupiah(ord.total)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
