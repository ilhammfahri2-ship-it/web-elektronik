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
      <div className="bg-slate-50/70 text-slate-900 min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-xl font-bold">Pesanan Tidak Ditemukan</h2>
        <Link to="/" className="mt-4 bg-blue-600 text-white font-semibold text-xs px-6 py-2.5 rounded-xl">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/70 text-slate-900 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {/* Banner Header */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 text-center space-y-3.5 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Pembayaran & Pesanan Berhasil!</h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Terima kasih telah berbelanja di ElectroHub Indonesia. Pesanan Anda telah berhasil diverifikasi dan sedang disiapkan oleh tim gudang.
          </p>

          <div className="inline-block bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs font-mono font-bold text-blue-600">
            Nomor Pesanan: {order.orderNumber}
          </div>
        </div>

        {/* Invoice Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">Faktur Rincian Pesanan Resmi</h3>
              <p className="text-slate-400 text-[11px] mt-0.5">Waktu Transaksi: {formatDateID(order.createdAt)}</p>
            </div>
            <button
              onClick={() => window.print()}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Nota</span>
            </button>
          </div>

          {/* Delivery & Payment details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Tujuan Pengiriman</span>
              <p className="font-bold text-slate-900">{order.recipientName} ({order.recipientPhone})</p>
              <p className="text-slate-500 leading-relaxed">{order.shippingAddress}</p>
              <p className="text-blue-600 font-semibold pt-1">Kurir: {getCourierLabel(order.courier)}</p>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Metode Pembayaran</span>
              <p className="font-bold text-slate-900">{getPaymentMethodLabel(order.paymentMethod)}</p>
              <p className="text-emerald-700 font-bold">Status: LUNAS (Verified)</p>
              {order.notes && <p className="text-slate-500 italic">Catatan: {order.notes}</p>}
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-3">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Daftar Produk yang Dibeli</span>
            <div className="divide-y divide-slate-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <img src={item.productImage} alt={item.productName} className="w-11 h-11 object-cover rounded-lg bg-slate-50 border border-slate-200" />
                    <div>
                      <p className="font-bold text-slate-900 text-xs sm:text-sm">{item.productName}</p>
                      <p className="text-slate-400 text-[11px]">{item.quantity} x {formatRupiah(item.price)}</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">{formatRupiah(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="border-t border-slate-100 pt-4 space-y-2 text-right">
            <p className="text-slate-500">Subtotal: <span className="font-bold text-slate-900">{formatRupiah(order.subtotal)}</span></p>
            {order.discount > 0 && <p className="text-emerald-700 font-semibold">Diskon Voucher: -{formatRupiah(order.discount)}</p>}
            <p className="text-slate-500">Ongkos Kirim: <span className="font-bold text-slate-900">{formatRupiah(order.shippingCost)}</span></p>
            <p className="text-base font-black text-slate-900 pt-2 border-t border-slate-100">
              Total Pembayaran: <span className="text-blue-600 text-lg">{formatRupiah(order.total)}</span>
            </p>
          </div>

          {/* Action links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <Link
              to="/orders"
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-5 py-2.5 rounded-xl transition-colors text-center"
            >
              Lihat Riwayat Pesanan
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl transition-colors shadow-xs text-center"
            >
              Belanja Produk Lainnya
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
