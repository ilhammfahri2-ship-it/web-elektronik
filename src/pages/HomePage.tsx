import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Flame,
  Star,
  ChevronRight,
  Laptop,
  Smartphone,
  Headphones,
  Camera,
  Watch,
  Monitor,
  Cpu,
  Tablet,
  Keyboard,
  Clock
} from 'lucide-react';
import { formatRupiah } from '../utils/formatters';

export const HomePage: React.FC = () => {
  const { products, categories, reviews } = useApp();

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const newestProducts = products.filter((p) => p.isNew).slice(0, 4);
  const bestsellerProducts = products.filter((p) => p.isBestseller).slice(0, 4);
  const promoProducts = products.filter((p) => p.discountPrice).slice(0, 4);

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'smartphone':
        return <Smartphone className="w-6 h-6" />;
      case 'laptop':
        return <Laptop className="w-6 h-6" />;
      case 'pc-komputer':
        return <Cpu className="w-6 h-6" />;
      case 'monitor':
        return <Monitor className="w-6 h-6" />;
      case 'tablet':
        return <Tablet className="w-6 h-6" />;
      case 'audio':
        return <Headphones className="w-6 h-6" />;
      case 'kamera':
        return <Camera className="w-6 h-6" />;
      case 'smartwatch':
        return <Watch className="w-6 h-6" />;
      case 'aksesoris':
        return <Keyboard className="w-6 h-6" />;
      default:
        return <Zap className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-12 pb-16 bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-900 via-navy-950 to-slate-950 pt-8 pb-16 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center space-x-2 bg-electro-500/10 border border-electro-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-electro-400">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Promo Spesial Elektronik 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Pusat Elektronik <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-electro-400 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
                Terlengkap & Garansi Resmi
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed mx-auto lg:mx-0">
              Temukan smartphone flagship, laptop ultra-kencang, gadget audio premium, dan komponen rakitan PC impian Anda dengan harga terbaik dan layanan purna jual terbaik.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/products"
                className="bg-gradient-to-r from-electro-600 to-electro-500 hover:from-electro-500 hover:to-electro-400 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-electro-600/30 flex items-center space-x-2 transition-all hover:scale-105"
              >
                <span>Belanja Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/promos"
                className="bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/80 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all"
              >
                Lihat Promo
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-white">50.000+</p>
                <p className="text-xs text-slate-400">Produk Terjual</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-white">100%</p>
                <p className="text-xs text-slate-400">Garansi Resmi</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-white">4.9 / 5.0</p>
                <p className="text-xs text-slate-400">Rating Kepuasan</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1 bg-gradient-to-r from-electro-600 to-cyan-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl space-y-4">
                <div className="relative rounded-2xl overflow-hidden pt-[65%] bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80"
                    alt="iPhone 15 Pro Max"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-rose-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-md">
                    Hemat Rp 2,5 Juta
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-electro-400 uppercase tracking-wider">Flash Sale Highlight</span>
                    <h3 className="text-base font-bold text-white">iPhone 15 Pro Max 256GB</h3>
                    <p className="text-xs text-slate-400">Natural Titanium • Garansi iBox</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 line-through">Rp 23.999.000</p>
                    <p className="text-lg font-extrabold text-electro-400">Rp 21.499.000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Kategori Populer</h2>
            <p className="text-xs text-slate-400">Pilih kategori produk elektronik favorit Anda</p>
          </div>
          <Link to="/products" className="text-xs font-bold text-electro-400 hover:text-electro-300 flex items-center space-x-1">
            <span>Lihat Semua Kategori</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group bg-slate-900 border border-slate-800/90 hover:border-electro-500/60 rounded-2xl p-3 text-center transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center space-y-2 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800 group-hover:bg-electro-600/20 text-electro-400 group-hover:text-electro-300 flex items-center justify-center transition-colors">
                {getCategoryIcon(cat.slug)}
              </div>
              <span className="text-xs font-semibold text-slate-200 group-hover:text-white line-clamp-1">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Limited Time Promo Banner Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-navy-900 to-electro-950 border border-slate-800/90 p-6 sm:p-10 overflow-hidden shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center space-x-2 text-rose-500 font-extrabold text-xs uppercase tracking-wider">
                <Flame className="w-5 h-5 fill-current animate-bounce" />
                <span>Promo Terbatas Hari Ini</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                Diskon Hingga 30% Untuk Audio & Headset Premium Sony & JBL
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Gunakan kode voucher <span className="font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">ELECTRO100</span> saat checkout untuk potongan harga langsung Rp 100.000!
              </p>

              <div className="flex items-center space-x-4 pt-2">
                <div className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Berakhir dalam: <strong>23 Jam 59 Menit</strong></span>
                </div>
                <Link
                  to="/promos"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-md"
                >
                  Klaim Voucher
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
                alt="Sony WH-1000XM5"
                className="w-56 h-56 object-cover rounded-2xl border-2 border-slate-800 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products (Produk Unggulan) */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-electro-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Pilihan Terbaik</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Produk Unggulan</h2>
          </div>
          <Link to="/products?featured=true" className="text-xs font-bold text-electro-400 hover:text-electro-300 flex items-center space-x-1">
            <span>Lihat Semua</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Bestselling Products (Produk Terlaris) */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>Paling Banyak Dibeli</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Produk Terlaris</h2>
          </div>
          <Link to="/products?bestseller=true" className="text-xs font-bold text-electro-400 hover:text-electro-300 flex items-center space-x-1">
            <span>Lihat Semua</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Store Guarantee Banners */}
      <section className="bg-navy-900 border-y border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-electro-500/20 text-electro-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Garansi Resmi 100%</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Seluruh produk elektronik disuplai langsung oleh distributor resmi iBox, SEIN, ASUS, Sony Indonesia dengan klaim garansi mudah.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Pengiriman Ekstra Aman</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bungkus bubble wrap tebal + dus khusus kayu gratis untuk menjamin barang elektronik sampai dengan mulus tanpa cacat.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Jaminan Retur 7 Hari</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Jika ada kegagalan pabrik dalam 7 hari pertama, kami tukar dengan unit baru tanpa prosedur yang rumit.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Ulasan Pelanggan</h2>
          <p className="text-xs text-slate-400">
            Pengalaman nyata pembeli yang belanja barang elektronik di ElectroHub
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < rev.rating ? 'fill-amber-400' : 'text-slate-700'}`} />
                ))}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">"{rev.comment}"</p>

              <div className="flex items-center space-x-3 pt-2 border-t border-slate-800">
                <img src={rev.userAvatar} alt={rev.userName} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-white">{rev.userName}</h4>
                  <span className="text-[10px] text-emerald-400 font-medium">✓ Pembeli Terverifikasi</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
