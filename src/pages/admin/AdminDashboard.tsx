import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  Tag,
  Star,
  Plus,
  Truck,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Flame,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from 'recharts';
import { formatRupiah, getOrderStatusBadge } from '../../utils/formatters';

export const AdminDashboard: React.FC = () => {
  const { products, orders, user, vouchers, reviews, updateOrderStatus } = useApp();

  // Core Metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.total, 0);

  // Status breakdown
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
  const processingOrdersCount = orders.filter((o) => o.status === 'processing').length;
  const shippedOrdersCount = orders.filter((o) => o.status === 'shipped').length;
  const deliveredOrdersCount = orders.filter((o) => o.status === 'delivered').length;

  // Inventory warnings (stock <= 5)
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  // Top bestseller products
  const topProducts = [...products]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 4);

  // Recent reviews
  const recentReviews = [...reviews].slice(0, 3);

  // Chart data
  const salesChartData = [
    { day: 'Senin', sales: 14500000 },
    { day: 'Selasa', sales: 19200000 },
    { day: 'Rabu', sales: 16800000 },
    { day: 'Kamis', sales: 26400000 },
    { day: 'Jumat', sales: 34000000 },
    { day: 'Sabtu', sales: 48500000 },
    { day: 'Minggu', sales: 41200000 },
  ];

  const categoryShareData = [
    { name: 'Smartphone', count: products.filter((p) => p.category === 'smartphone').length },
    { name: 'Laptop', count: products.filter((p) => p.category === 'laptop').length },
    { name: 'Audio', count: products.filter((p) => p.category === 'audio').length },
    { name: 'Monitor', count: products.filter((p) => p.category === 'monitor').length },
    { name: 'Aksesori', count: products.filter((p) => p.category === 'aksesoris').length },
  ];

  if (user?.role !== 'admin') {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mb-2" />
        <h2 className="text-xl font-bold">Akses Dibatasi Khusus Admin Store</h2>
        <p className="text-xs text-slate-400 mt-1 mb-4">
          Anda sedang masuk sebagai akun pelanggan. Silakan gunakan tombol toggle login untuk berpindah ke mode Admin.
        </p>
        <Link to="/login" className="bg-electro-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl">
          Ke Halaman Login Admin
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Admin Dashboard Header Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-electro-950 to-navy-900 border border-slate-800 p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portal Manajemen Toko Resmi</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Overview Ringkasan Store</h1>
          <p className="text-xs text-slate-300 max-w-xl">
            Selamat datang kembali, <strong className="text-white">{user.name}</strong>! Berikut adalah analisis pendapatan, pesanan masuk, dan peringatan inventaris produk hari ini.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/products"
            className="bg-electro-600 hover:bg-electro-500 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center space-x-2 transition-all shadow-lg shadow-electro-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Produk</span>
          </Link>
          <Link
            to="/admin/vouchers"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-5 py-3 rounded-xl border border-slate-700 flex items-center space-x-2"
          >
            <Tag className="w-4 h-4 text-amber-400" />
            <span>Buat Voucher</span>
          </Link>
        </div>
      </div>

      {/* Top 4 Key Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1: Revenue */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Pendapatan</span>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-white">{formatRupiah(totalRevenue)}</p>
            <p className="text-[11px] text-emerald-400 font-semibold flex items-center space-x-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+24.8% dibanding bulan lalu</span>
            </p>
          </div>
        </div>

        {/* Metric 2: Orders */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Pesanan</span>
            <div className="w-12 h-12 rounded-2xl bg-electro-500/10 text-electro-400 flex items-center justify-center shrink-0">
              <ShoppingCart className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-white">{totalOrders} Transaksi</p>
            <p className="text-[11px] text-electro-300 font-semibold mt-1">
              {processingOrdersCount} pesanan siap diproses
            </p>
          </div>
        </div>

        {/* Metric 3: Products */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Katalog Produk</span>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-white">{totalProducts} SKU</p>
            <p className="text-[11px] text-rose-400 font-semibold mt-1">
              {lowStockProducts.length} produk stok kritis (≤5)
            </p>
          </div>
        </div>

        {/* Metric 4: Active Vouchers */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Voucher Aktif</span>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Tag className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-white">
              {vouchers.filter((v) => v.isActive).length} Voucher
            </p>
            <p className="text-[11px] text-amber-300 font-semibold mt-1">Aktif & dapat diklaim pembeli</p>
          </div>
        </div>
      </div>

      {/* Order Status Breakdown Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
          <Clock className="w-4 h-4 text-electro-400" />
          <span>Status Antrean Pesanan Aktif</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-amber-400 font-semibold text-[11px]">Menunggu Pembayaran</span>
            <p className="text-xl font-extrabold text-white">{pendingOrdersCount} Pesanan</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-blue-400 font-semibold text-[11px]">Sedang Diproses</span>
            <p className="text-xl font-extrabold text-white">{processingOrdersCount} Pesanan</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-indigo-400 font-semibold text-[11px]">Dalam Pengiriman</span>
            <p className="text-xl font-extrabold text-white">{shippedOrdersCount} Pesanan</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-semibold text-[11px]">Selesai (Delivered)</span>
            <p className="text-xl font-extrabold text-white">{deliveredOrdersCount} Pesanan</p>
          </div>
        </div>
      </div>

      {/* Charts Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue Trend Area Chart */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-electro-400" />
                <span>Grafik Penjualan Mingguan (IDR)</span>
              </h3>
              <p className="text-xs text-slate-400">Trend akumulasi omset harian ElectroHub</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Live Data
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesChartData}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(val) => `Rp ${(val / 1000000).toFixed(0)}Jt`} />
                <Tooltip
                  formatter={(val: any) => [formatRupiah(Number(val)), 'Omset Penjualan']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '14px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#38b0f8" fillOpacity={1} fill="url(#salesGrad)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Bar Chart */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <span>Jumlah Stok Per Kategori</span>
            </h3>
            <p className="text-xs text-slate-400">Sebaran varian produk di gudang</p>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryShareData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="count" fill="#38b0f8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Middle Grid: Top Bestsellers Leaderboard & Low Stock Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Top Bestsellers Leaderboard */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span>Produk Terlaris Minggu Ini (Leaderboard)</span>
            </h3>
            <Link to="/admin/products" className="text-electro-400 font-semibold hover:underline">
              Lihat Semua →
            </Link>
          </div>

          <div className="space-y-3">
            {topProducts.map((p, index) => (
              <div
                key={p.id}
                className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <span className={`w-7 h-7 rounded-xl font-bold flex items-center justify-center text-xs ${
                    index === 0 ? 'bg-amber-400 text-slate-950' : index === 1 ? 'bg-slate-300 text-slate-950' : 'bg-amber-700/40 text-amber-300'
                  }`}>
                    #{index + 1}
                  </span>
                  <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg bg-slate-900 shrink-0" />
                  <div className="min-w-0">
                    <h4 className="font-bold text-white truncate max-w-xs">{p.name}</h4>
                    <p className="text-slate-400">{p.brand} • {p.reviewCount} Ulasan</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="font-extrabold text-electro-400">{formatRupiah(p.discountPrice || p.price)}</p>
                  <p className="text-[10px] text-emerald-400 font-semibold">Stok: {p.stock} Unit</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Warning Alert */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              <span>Peringatan Stok Kritis (≤5 Unit)</span>
            </h3>
            <span className="bg-rose-500/20 text-rose-400 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
              {lowStockProducts.length} Produk
            </span>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map((p) => (
                <div key={p.id} className="bg-slate-950 p-3 rounded-2xl border border-rose-500/30 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <img src={p.image} alt={p.name} className="w-9 h-9 object-cover rounded-lg bg-slate-900 shrink-0" />
                    <div className="min-w-0">
                      <h4 className="font-bold text-white truncate max-w-[150px]">{p.name}</h4>
                      <span className="text-[10px] text-rose-400 font-bold">Stok Tinggal: {p.stock}</span>
                    </div>
                  </div>

                  <Link
                    to="/admin/products"
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-3 py-1.5 rounded-xl text-[11px] shrink-0"
                  >
                    + Restok
                  </Link>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-slate-400 italic">
                Seluruh produk dalam stok aman!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Transactions Table & Recent Customer Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Transactions Table */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white">Transaksi Pesanan Terbaru</h3>
            <Link to="/admin/orders" className="text-electro-400 font-semibold hover:underline">
              Lihat Semua Pesanan ({orders.length}) →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">No. Pesanan</th>
                  <th className="py-3 px-3">Pelanggan</th>
                  <th className="py-3 px-3">Item</th>
                  <th className="py-3 px-3">Total Pembayaran</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-mono font-bold text-white">{ord.orderNumber}</td>
                    <td className="py-3 px-3 text-slate-300">{ord.userName}</td>
                    <td className="py-3 px-3 text-slate-400">{ord.items.length} Barang</td>
                    <td className="py-3 px-3 font-extrabold text-electro-400">{formatRupiah(ord.total)}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getOrderStatusBadge(ord.status).bg}`}>
                        {getOrderStatusBadge(ord.status).label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Customer Reviews Feed */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl text-xs">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span>Ulasan Pelanggan Terbaru</span>
            </h3>
            <p className="text-xs text-slate-400">Feedback masuk dari pembeli</p>
          </div>

          <div className="space-y-3">
            {recentReviews.map((rev) => (
              <div key={rev.id} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src={rev.userAvatar} alt={rev.userName} className="w-7 h-7 rounded-full object-cover" />
                    <span className="font-bold text-white">{rev.userName}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold">{rev.rating}.0</span>
                  </div>
                </div>
                <p className="text-slate-300 italic text-[11px] leading-relaxed">"{rev.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
