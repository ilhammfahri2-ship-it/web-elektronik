import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Search, Package, Truck, CheckCircle2, MapPin, Clock } from 'lucide-react';
import { getOrderStatusBadge, getCourierLabel } from '../utils/formatters';

export const TrackOrderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const resiFromUrl = searchParams.get('resi') || '';
  const [queryResi, setQueryResi] = useState(resiFromUrl);

  const { orders } = useApp();

  const matchedOrder = orders.find(
    (o) =>
      o.orderNumber.toLowerCase() === queryResi.trim().toLowerCase() ||
      (o.trackingNumber && o.trackingNumber.toLowerCase() === queryResi.trim().toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <Breadcrumbs items={[{ label: 'Lacak Pesanan' }]} />

        <div className="bg-navy-900 border border-slate-800 rounded-3xl p-8 space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-electro-600/20 text-electro-400 flex items-center justify-center mx-auto">
            <Truck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Lacak Pengiriman Paket</h1>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Masukkan Nomor Pesanan (misal: EH-20261001-8921) atau Nomor Resi Kurir Anda.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-lg mx-auto">
            <input
              type="text"
              value={queryResi}
              onChange={(e) => setQueryResi(e.target.value)}
              placeholder="Contoh: JNE8829103912ID atau EH-20261001-8921"
              className="w-full bg-slate-950 text-xs text-white placeholder-slate-500 rounded-2xl pl-11 pr-28 py-3.5 border border-slate-800 focus:outline-none focus:border-electro-500 font-mono"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-electro-600 hover:bg-electro-500 text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              Lacak Resi
            </button>
          </form>
        </div>

        {/* Tracking Details */}
        {matchedOrder ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
              <div>
                <span className="text-slate-400">Nomor Pesanan</span>
                <h3 className="text-base font-bold text-white font-mono">{matchedOrder.orderNumber}</h3>
                <p className="text-electro-400 font-medium">Kurir: {getCourierLabel(matchedOrder.courier)}</p>
              </div>

              <span className={`px-3 py-1 rounded-full border font-bold ${getOrderStatusBadge(matchedOrder.status).bg}`}>
                {getOrderStatusBadge(matchedOrder.status).label}
              </span>
            </div>

            {/* Tracking Timeline Stepper */}
            <div className="space-y-6 pt-2">
              <h4 className="font-bold text-white text-sm">Status Timeline Pengiriman</h4>
              <div className="relative pl-6 space-y-6 border-l-2 border-slate-800">
                <div className="relative">
                  <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-slate-900"></div>
                  <h5 className="font-bold text-white">Pesanan Berhasil Dibuat</h5>
                  <p className="text-slate-400">Pembayaran dikonfirmasi oleh sistem ElectroHub.</p>
                </div>

                <div className="relative">
                  <div className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full ${
                    ['processing', 'shipped', 'delivered'].includes(matchedOrder.status) ? 'bg-emerald-500' : 'bg-slate-700'
                  } ring-4 ring-slate-900`}></div>
                  <h5 className="font-bold text-white">Di Kemas Di Gudang Pusat</h5>
                  <p className="text-slate-400">Produk elektronik diperiksa fungsi & dibungkus kayu tebal.</p>
                </div>

                <div className="relative">
                  <div className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full ${
                    ['shipped', 'delivered'].includes(matchedOrder.status) ? 'bg-emerald-500' : 'bg-slate-700'
                  } ring-4 ring-slate-900`}></div>
                  <h5 className="font-bold text-white">Paket Diterima Kurir ({matchedOrder.courier})</h5>
                  <p className="text-slate-400">Dalam perjalanan menuju kota tujuan. No. Resi: {matchedOrder.trackingNumber || 'Dalam Penerbitan'}</p>
                </div>

                <div className="relative">
                  <div className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full ${
                    matchedOrder.status === 'delivered' ? 'bg-emerald-500' : 'bg-slate-700'
                  } ring-4 ring-slate-900`}></div>
                  <h5 className="font-bold text-white">Pesanan Diterima Oleh Pembeli</h5>
                  <p className="text-slate-400">Tiba di lokasi: {matchedOrder.recipientName}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          queryResi && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center text-xs text-slate-400">
              Tidak menemukan pesanan dengan resi/nomor "{queryResi}". Silakan periksa kembali riwayat pesanan Anda.
            </div>
          )
        )}
      </div>
    </div>
  );
};
