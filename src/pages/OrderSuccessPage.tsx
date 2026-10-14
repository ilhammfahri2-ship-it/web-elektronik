import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Package, ArrowRight, Printer, ShieldCheck } from 'lucide-react';
import { formatRupiah, formatDateID, getPaymentMethodLabel, getCourierLabel } from '../utils/formatters';

export const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders } = useApp();

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-xl font-bold">Pesanan Tidak Ditemukan</h2>
        <Link to="/" className="mt-4 bg-electro-600 text-white font-semibold text-xs px-6 py-2.5 rounded-xl">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        {/* Banner Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Pembayaran & Pesanan Berhasil!</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Terima kasih telah berbelanja di ElectroHub. Pesanan Anda telah berhasil diverifikasi dan sedang disiapkan oleh tim gudang.
          </p>

          <div className="inline-block bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono font-bold text-electro-400">
            Nomor Pesanan: {order.orderNumber}
          </div>
        </div>

        {/* Invoice Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">Faktur Rincian Pesanan</h3>
              <p className="text-slate-400">Tanggal: {formatDateID(order.createdAt)}</p>
            </div>
            <button
              onClick={() => window.print()}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl font-semibold flex items-center space-x-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Faktur</span>
            </button>
          </div>

          {/* Delivery & Payment details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
            <div className="space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Tujuan Pengiriman</span>
              <p className="font-bold text-white">{order.recipientName} ({order.recipientPhone})</p>
              <p className="text-slate-400 leading-relaxed">{order.shippingAddress}</p>
              <p className="text-electro-400 font-semibold pt-1">Kurir: {getCourierLabel(order.courier)}</p>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Metode Pembayaran</span>
              <p className="font-bold text-white">{getPaymentMethodLabel(order.paymentMethod)}</p>
              <p className="text-emerald-400 font-bold">Status: LUNAS (Paid)</p>
              {order.notes && <p className="text-slate-400 italic">Catatan: {order.notes}</p>}
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-3">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Daftar Barang Pembelian</span>
            <div className="divide-y divide-slate-800">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <img src={item.productImage} alt={item.productName} className="w-10 h-10 object-cover rounded-lg bg-slate-950" />
                    <div>
                      <p className="font-bold text-white">{item.productName}</p>
                      <p className="text-slate-400">{item.quantity} x {formatRupiah(item.price)}</p>
                    </div>
                  </div>
                  <span className="font-bold text-white">{formatRupiah(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="border-t border-slate-800 pt-4 space-y-2 text-right">
            <p className="text-slate-400">Subtotal: <span className="font-semibold text-white">{formatRupiah(order.subtotal)}</span></p>
            {order.discount > 0 && <p className="text-emerald-400">Diskon: <span className="font-bold">-{formatRupiah(order.discount)}</span></p>}
            <p className="text-slate-400">Ongkos Kirim: <span className="font-semibold text-white">{formatRupiah(order.shippingCost)}</span></p>
            <p className="text-lg font-extrabold text-white pt-2 border-t border-slate-800">
              Total Pembayaran: <span className="text-electro-400">{formatRupiah(order.total)}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/orders"
            className="w-full sm:w-auto bg-electro-600 hover:bg-electro-500 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg flex items-center justify-center space-x-2"
          >
            <Package className="w-4 h-4" />
            <span>Lihat Riwayat Pesanan Saya</span>
          </Link>
          <Link
            to="/products"
            className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-6 py-3.5 rounded-xl border border-slate-700 flex items-center justify-center space-x-2"
          >
            <span>Lanjut Belanja Lagi</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
