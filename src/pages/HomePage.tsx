import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Flame,
  Star,
  ChevronRight,
  ChevronLeft,
  Laptop,
  Smartphone,
  Headphones,
  Camera,
  Watch,
  Monitor,
  Cpu,
  Tablet,
  Keyboard,
  Clock,
  BadgeCheck,
  Building2,
  TrendingUp,
  Tag
} from 'lucide-react';
import { formatRupiah } from '../utils/formatters';

export const HomePage: React.FC = () => {
  const { products, categories, reviews } = useApp();
  const navigate = useNavigate();

  // Active Hero Slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // Countdown timer for Flash Sale
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Hero carousel slides
  const heroSlides = [
    {
      id: 1,
      badge: 'Official Mega Launch 2026',
      badgeColor: 'bg-blue-600 text-white',
      title: 'iPhone 15 Pro Max',
      subtitle: 'Ketangguhan Titanium. Performa Melesat Chip A17 Pro.',
      description: 'Dapatkan cashback bank hingga Rp 2.500.000 + cicilan 0% s/d 24 bulan dan garansi resmi iBox Indonesia 1 tahun.',
      price: 'Rp 21.499.000',
      originalPrice: 'Rp 23.999.000',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
      link: '/product/prod-1',
      tag: 'Ready Stock iBox',
    },
    {
      id: 2,
      badge: 'Galaxy AI Experience',
      badgeColor: 'bg-indigo-600 text-white',
      title: 'Samsung Galaxy S24 Ultra',
      subtitle: 'Era Baru AI Smartphone dengan Bodi Titanium & Kamera 200MP.',
      description: 'Bonus langsung Galaxy Buds FE senilai Rp 1.399.000 + Ekstra voucher tukar tambah Rp 1.500.000 garansi resmi SEIN.',
      price: 'Rp 19.999.000',
      originalPrice: 'Rp 21.999.000',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80',
      link: '/product/prod-3',
      tag: 'Garansi Resmi SEIN',
    },
    {
      id: 3,
      badge: 'Esports Gaming Flagship',
      badgeColor: 'bg-rose-600 text-white',
      title: 'ASUS ROG Strix G16 2026',
      subtitle: 'Intel Core i9-14900HX & RTX 4080 12GB TGP 175W.',
      description: 'Layar ROG Nebula 240Hz dengan pendingin Tri-Fan Liquid Metal. Hadiah eksklusif ROG Backpack + Gaming Mouse.',
      price: 'Rp 36.499.000',
      originalPrice: 'Rp 38.999.000',
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80',
      link: '/product/prod-4',
      tag: 'Garansi 2 Tahun Global',
    },
    {
      id: 4,
      badge: 'Industry Leading Noise Canceling',
      badgeColor: 'bg-slate-900 text-white',
      title: 'Sony WH-1000XM5 ANC',
      subtitle: 'Kualitas Audio Nirkabel Resolusi Tinggi dengan Senyap Maksimal.',
      description: 'Prosesor V1 & QN1 ganda dengan 8 mikrofon peredam suara bising. Baterai tahan hingga 30 jam pemakaian nonstop.',
      price: 'Rp 4.999.000',
      originalPrice: 'Rp 5.999.000',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      link: '/product/prod-5',
      tag: 'Garansi Resmi Sony ID',
    }
  ];

  // Auto rotate carousel
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, [heroSlides.length]);

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
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

  const officialBrands = [
    { name: 'Apple', tag: 'Authorized Reseller', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { name: 'Samsung', tag: 'Official Store', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
    { name: 'ASUS ROG', tag: 'Official Partner', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg' },
    { name: 'Sony', tag: 'Authorized Dealer', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg' },
    { name: 'Logitech G', tag: 'Official Gaming Store', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Logitech_logo.svg' },
    { name: 'LG', tag: 'Official Store', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg' },
    { name: 'JBL', tag: 'Authorized Store', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/JBL_logo.svg' },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 pb-16">
      {/* Hero Section: Carousel + Side Highlights (Classic Authentic E-Commerce Grid) */}
      <section className="max-w-7xl mx-auto px-4 pt-4 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Hero Carousel (8 cols) */}
          <div className="lg:col-span-8 relative bg-slate-900 rounded-3xl overflow-hidden shadow-lg min-h-[380px] sm:min-h-[440px] flex items-center">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Background Image with Clean Dark Gradient Overlay for Crisp Text Readability */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent sm:to-slate-950/20" />

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col justify-center p-6 sm:p-10 max-w-xl text-white space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs ${slide.badgeColor}`}>
                      {slide.badge}
                    </span>
                    <span className="text-[11px] font-bold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md text-white">
                      {slide.tag}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                    {slide.title}
                  </h1>

                  <p className="text-xs sm:text-sm font-semibold text-blue-300">
                    {slide.subtitle}
                  </p>

                  <p className="text-xs text-slate-300 line-clamp-2 max-w-md hidden sm:block">
                    {slide.description}
                  </p>

                  <div className="flex items-baseline space-x-3 pt-1">
                    <span className="text-xl sm:text-2xl font-black text-white">
                      {slide.price}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {slide.originalPrice}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 pt-2">
                    <Link
                      to={slide.link}
                      className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-blue-600/30 flex items-center space-x-2"
                    >
                      <span>Lihat Spesifikasi & Beli</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/products"
                      className="bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl backdrop-blur-md transition-colors"
                    >
                      Semua Produk
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Carousel Dot Indicators */}
            <div className="absolute bottom-4 left-6 sm:left-10 z-20 flex space-x-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'w-8 bg-blue-500' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Side Promo Cards (4 cols) */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {/* Promo Card 1: Tukar Tambah */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-blue-400 transition-all">
              <div className="space-y-2 z-10">
                <span className="inline-block text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                  Trade-In Program
                </span>
                <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                  Tukar Tambah Gadget Lama Jadi Baru
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Penilaian instan dengan kurir khusus, dapatkan tambahan diskon s/d Rp 1.500.000!
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between z-10">
                <Link
                  to="/products?category=smartphone"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                >
                  <span>Mulai Tukar Tambah</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] font-bold text-slate-400">Garansi iBox & SEIN</span>
              </div>
            </div>

            {/* Promo Card 2: Voucher Diskon Toko */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-3xl p-5 text-white shadow-sm flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-2 z-10">
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-amber-400" />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                    Kode Kupon Eksklusif
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-white leading-snug">
                  Potongan Langsung Rp 100.000
                </h3>
                <p className="text-xs text-slate-300">
                  Gunakan kode voucher saat checkout:
                </p>
                <div className="inline-block bg-white/15 border border-white/20 font-mono font-bold text-amber-300 text-xs px-2.5 py-1 rounded-lg">
                  ELECTRO100
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between z-10">
                <Link
                  to="/promos"
                  className="text-xs font-bold text-blue-300 hover:text-white flex items-center space-x-1"
                >
                  <span>Klaim Semua Voucher</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[10px] text-slate-400">Min. Blj Rp 1 Juta</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Guarantees Strip */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs py-4 px-6 grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="flex items-center space-x-3 py-2 md:py-0">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900">Garansi Resmi 100%</h4>
              <p className="text-[11px] text-slate-500">iBox, SEIN, ASUS & Sony ID</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 py-2 md:py-0 md:pl-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900">Bebas Ongkir & Asuransi</h4>
              <p className="text-[11px] text-slate-500">Packing kayu aman gratis</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 py-2 md:py-0 md:pl-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900">Cicilan 0% s/d 24 Bulan</h4>
              <p className="text-[11px] text-slate-500">Semua bank & paylater resmi</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 py-2 md:py-0 md:pl-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900">7 Hari Jaminan Retur</h4>
              <p className="text-[11px] text-slate-500">Ganti unit baru bila cacat</p>
            </div>
          </div>
        </div>
      </section>

      {/* Official Brand Stores Showcase */}
      <section className="max-w-7xl mx-auto px-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Official Brand Stores</h2>
            <p className="text-xs text-slate-500">Bermitra langsung dengan pemegang merek resmi di Indonesia</p>
          </div>
          <Link to="/products" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1">
            <span>Semua Brand</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {officialBrands.map((b, i) => (
            <button
              key={i}
              onClick={() => navigate(`/products?brand=${encodeURIComponent(b.name)}`)}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 flex flex-col items-center justify-center hover:border-blue-400 hover:shadow-card-hover transition-all duration-200 text-center group"
            >
              <div className="h-9 flex items-center justify-center mb-2">
                <img
                  src={b.logo}
                  alt={b.name}
                  className="max-h-7 max-w-[90px] object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600">{b.name}</span>
              <span className="text-[10px] text-slate-400 mt-0.5">{b.tag}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Flash Sale Section with Authentic Countdown Timer */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-rose-500 to-red-600 rounded-3xl p-5 sm:p-7 shadow-md text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-rose-400/40">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white text-rose-600 flex items-center justify-center font-black shadow-sm">
                <Flame className="w-6 h-6 fill-current" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">FLASH SALE HARI INI</h2>
                  <span className="bg-amber-400 text-slate-950 font-black text-[10px] uppercase px-2 py-0.5 rounded-md">
                    Diskon s/d 30%
                  </span>
                </div>
                <p className="text-xs text-rose-100">Stok terbatas dengan harga terendah resmi distributor</p>
              </div>
            </div>

            {/* Countdown Box */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-rose-100 mr-1">Berakhir dalam:</span>
              <div className="flex items-center space-x-1.5 font-mono font-black text-sm">
                <span className="bg-slate-950/80 text-white px-2.5 py-1.5 rounded-lg shadow-inner">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span>:</span>
                <span className="bg-slate-950/80 text-white px-2.5 py-1.5 rounded-lg shadow-inner">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span>:</span>
                <span className="bg-slate-950/80 text-white px-2.5 py-1.5 rounded-lg shadow-inner">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Flash Sale Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {promoProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Kategori Produk Pilihan</h2>
            <p className="text-xs text-slate-500">Pilih lini perangkat elektronik sesuai kebutuhan Anda</p>
          </div>
          <Link to="/products" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1">
            <span>Lihat Semua Kategori</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="bg-white border border-slate-200/90 hover:border-blue-500 rounded-2xl p-3.5 text-center transition-all duration-200 hover:-translate-y-0.5 flex flex-col items-center justify-center space-y-2 shadow-xs group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-blue-50 text-slate-700 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                {getCategoryIcon(cat.slug)}
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 line-clamp-1">
                {cat.name}
              </span>
              <span className="text-[10px] text-slate-400">
                {cat.productCount} Produk
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Produk Unggulan (Featured Products) */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-1.5 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <BadgeCheck className="w-4 h-4" />
              <span>Rekomendasi Terbaik</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Produk Unggulan</h2>
          </div>
          <Link to="/products?featured=true" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1">
            <span>Lihat Semua Unggulan</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Mid-Page Promo Banner Strip */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl text-center md:text-left z-10">
            <span className="bg-blue-600 text-white font-extrabold text-[10px] uppercase px-2.5 py-1 rounded">
              Layanan Tukar Tambah
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Upgrade Gadget Lama Anda ke Model Terbaru
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Bawa smartphone atau laptop lama Anda ke gerai ElectroHub atau gunakan layanan jemput kurir di rumah. Dapatkan potongan harga instan hingga 100%!
            </p>
            <div className="pt-1 flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                to="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md"
              >
                Konsultasi Trade-In Sekarang
              </Link>
              <Link
                to="/about"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-4 py-2.5 rounded-xl border border-slate-700 transition-colors"
              >
                Lokasi Gerai Offline
              </Link>
            </div>
          </div>

          <div className="shrink-0 z-10">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center max-w-xs">
              <p className="text-xs text-blue-300 font-bold uppercase">Simulasi Estimasi</p>
              <p className="text-2xl font-black text-white mt-1">Hingga Rp 15 Juta</p>
              <p className="text-[11px] text-slate-400 mt-1">Nilai tukar gadget bekas grade A/B bergaransi resmi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Produk Terlaris (Bestselling Products) */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-1.5 text-amber-600 font-bold text-xs uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Paling Banyak Diminati</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Produk Terlaris Bulan Ini</h2>
          </div>
          <Link to="/products?bestseller=true" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1">
            <span>Lihat Semua Terlaris</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bestsellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Authentic Customer Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Ulasan Pembeli Terverifikasi</h2>
          <p className="text-xs text-slate-500">
            Pengalaman nyata konsumen Indonesia yang berbelanja gadget bergaransi di ElectroHub
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3.5 shadow-xs">
              <div className="flex items-center space-x-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-500' : 'text-slate-300'}`} />
                ))}
                <span className="text-xs font-bold text-slate-800 ml-1.5">5.0 / 5.0</span>
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed">"{rev.comment}"</p>

              <div className="flex items-center space-x-3 pt-3 border-t border-slate-100">
                <img src={rev.userAvatar} alt={rev.userName} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{rev.userName}</h4>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <BadgeCheck className="w-3 h-3" />
                    Pembeli Terverifikasi • {rev.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
