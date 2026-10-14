import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Package, Truck, CheckCircle2, Clock, ChevronRight, ExternalLink } from 'lucide-react';
import { formatRupiah, formatDateID, getOrderStatusBadge, getCourierLabel } from '../utils/formatters';

export const OrdersPage: React.FC = () => {
  const { orders, user } = useApp();

  const userOrders = orders.filter((o) => !user || o.userId === user.id || o.userEmail === user.email);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        <Breadcrumbs items={[{ label: 'Riwayat Pesanan' }]} />

        <div className="bg-navy-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Riwayat Transaksi Pesanan</h1>
            <p className="text-xs text-slate-400">Daftar seluruh pesanan barang elektronik yang telah Anda beli</p>
          </div>
          <Package className="w-8 h-8 text-electro-400" />
        </div>

        {userOrders.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
            <Package className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">Belum Ada Riwayat Pesanan</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Anda belum melakukan transaksi produk di ElectroHub. Mulai belanja produk favorit Anda sekarang!
            </p>
            <Link to="/products" className="inline-block bg-electro-600 text-white text-xs font-bold px-6 py-3 rounded-xl">
              Lihat Katalog Produk
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userOrders.map((order) => {
              const statusBadge = getOrderStatusBadge(order.status);
              return (
                <div
                  key={order.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl text-xs"
                >
                  {/* Order Top Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono font-bold text-white text-sm">{order.orderNumber}</span>
                      <span className="text-slate-500">• {formatDateID(order.createdAt)}</span>
                    </div>

                    <span className={`px-3 py-1 rounded-full border text-[11px] font-bold ${statusBadge.bg}`}>
                      {statusBadge.label}
                    </span>
                  </div>

                  {/* Order Items Summary */}
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-14 h-14 object-cover rounded-xl bg-slate-950 border border-slate-800 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white truncate">{item.productName}</h4>
                          <p className="text-slate-400">
                            {item.quantity} x {formatRupiah(item.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery & Tracking info */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-300">
                    <div>
                      <p className="font-bold text-white">Kurir: {getCourierLabel(order.courier)}</p>
                      {order.trackingNumber && (
                        <p className="text-electro-400 font-mono font-semibold mt-0.5">
                          No. Resi: {order.trackingNumber}
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <p className="text-slate-400 text-[11px]">Total Transaksi</p>
                      <p className="text-base font-extrabold text-electro-400">{formatRupiah(order.total)}</p>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-end space-x-3 pt-2">
                    <Link
                      to={`/order-success/${order.id}`}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-2 rounded-xl flex items-center space-x-1"
                    >
                      <span>Lihat Faktur</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to={`/track-order?resi=${order.trackingNumber || order.orderNumber}`}
                      className="bg-electro-600 hover:bg-electro-500 text-white font-bold px-4 py-2 rounded-xl flex items-center space-x-1"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Lacak Pengiriman</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
