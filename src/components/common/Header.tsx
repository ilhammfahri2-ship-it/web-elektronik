import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Zap,
  Search,
  ShoppingCart,
  Heart,
  User as UserIcon,
  ChevronDown,
  Menu,
  X,
  SlidersHorizontal,
  LayoutDashboard,
  LogOut,
  PackageCheck,
  ShieldCheck,
  Truck,
  Layers,
  MapPin,
  Tag,
  Headphones
} from 'lucide-react';
import { formatRupiah } from '../../utils/formatters';

interface HeaderProps {
  onOpenCompare?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCompare }) => {
  const { products, categories, cart, wishlist, compareList, user, logout } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + (item.product.discountPrice || item.product.price) * item.quantity, 0);

  // Search filter results
  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchDropdown(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const trendingKeywords = ['iPhone 15 Pro', 'MacBook M3', 'RTX 4070', 'Galaxy S24', 'Sony XM5', 'iPad Pro'];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* Top Value Strip */}
      <div className="bg-slate-900 text-slate-300 text-[11px] sm:text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5 text-blue-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>100% Produk Original & Garansi Resmi Distributor Indonesia</span>
            </span>
            <span className="hidden lg:inline text-slate-600">|</span>
            <span className="hidden lg:flex items-center space-x-1.5 text-slate-300">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Gratis Ongkir + Asuransi se-Indonesia</span>
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-medium">
            <div className="hidden sm:flex items-center space-x-1 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Kirim ke: <strong className="text-white">DKI Jakarta</strong></span>
            </div>
            <span className="hidden sm:inline text-slate-700">|</span>
            <Link to="/promos" className="hover:text-blue-400 transition-colors flex items-center space-x-1">
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              <span>Voucher & Promo</span>
            </Link>
            <span className="text-slate-700">|</span>
            <Link to="/track-order" className="hover:text-blue-400 transition-colors flex items-center space-x-1">
              <PackageCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Lacak Resi</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5 border-b border-slate-100">
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform duration-200">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  Electro<span className="text-blue-600">Hub</span>
                </span>
                <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-blue-100 text-blue-700 tracking-wider">
                  Official
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-500 tracking-wider -mt-0.5">
                Authorized Electronics Store
              </p>
            </div>
          </Link>

          {/* Search Bar with Autocomplete */}
          <div ref={searchRef} className="hidden md:block flex-1 max-w-2xl mx-2 relative">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder="Cari iPhone, MacBook, RTX 4080, Sony XM5, Monitor 4K..."
                className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder-slate-400 text-sm rounded-xl pl-11 pr-24 py-2.5 border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all shadow-xs"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-all shadow-xs"
              >
                Cari
              </button>
            </form>

            {/* Trending Keywords Strip */}
            <div className="flex items-center space-x-2 mt-1.5 text-[11px] text-slate-400 overflow-hidden">
              <span className="font-semibold text-slate-500 shrink-0">Populer:</span>
              <div className="flex items-center space-x-2 truncate">
                {trendingKeywords.map((kw, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSearchQuery(kw);
                      navigate(`/products?search=${encodeURIComponent(kw)}`);
                    }}
                    className="hover:text-blue-600 transition-colors shrink-0"
                  >
                    {kw}{i < trendingKeywords.length - 1 ? ' •' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Search Autocomplete Overlay */}
            {showSearchDropdown && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-100">
                <div className="p-2.5 text-xs font-semibold text-slate-500 bg-slate-50 flex items-center justify-between">
                  <span>Hasil pencarian untuk "{searchQuery}"</span>
                  <span className="text-blue-600">{searchResults.length} produk ditemukan</span>
                </div>
                {searchResults.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                    {searchResults.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          setShowSearchDropdown(false);
                          setSearchQuery('');
                          navigate(`/product/${prod.id}`);
                        }}
                        className="flex items-center space-x-3 p-3 hover:bg-blue-50/50 transition-colors cursor-pointer"
                      >
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-12 h-12 object-cover rounded-lg bg-slate-100 shrink-0 border border-slate-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-slate-800 truncate">{prod.name}</h4>
                          <p className="text-[11px] text-slate-500">{prod.brand} • {prod.categoryName}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-extrabold text-blue-600">
                            {formatRupiah(prod.discountPrice || prod.price)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-sm text-slate-500">
                    Tidak ada produk elektronik yang cocok dengan kata kunci tersebut.
                  </div>
                )}
                <div
                  onClick={() => {
                    setShowSearchDropdown(false);
                    navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
                  }}
                  className="p-3 text-center text-xs font-bold text-blue-600 bg-slate-50 hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  Lihat Semua Hasil Pencarian "{searchQuery}" →
                </div>
              </div>
            )}
          </div>

          {/* Action Menu (Compare, Wishlist, Cart, User) */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            {/* Compare Button */}
            {onOpenCompare && (
              <button
                onClick={onOpenCompare}
                className="relative p-2 sm:px-3 sm:py-2 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors flex items-center space-x-1.5 text-xs font-semibold"
                title="Bandingkan Spesifikasi"
              >
                <SlidersHorizontal className="w-5 h-5 text-slate-600" />
                <span className="hidden xl:inline">Bandingkan</span>
                {compareList.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                    {compareList.length}
                  </span>
                )}
              </button>
            )}

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 sm:px-3 sm:py-2 rounded-xl text-slate-700 hover:text-rose-600 hover:bg-rose-50/50 transition-colors flex items-center space-x-1.5 text-xs font-semibold"
              title="Favorit Saya"
            >
              <Heart className="w-5 h-5 text-slate-600 hover:text-rose-600" />
              <span className="hidden xl:inline">Favorit</span>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Pill */}
            <Link
              to="/cart"
              className="relative flex items-center space-x-2.5 bg-blue-50 hover:bg-blue-100/80 text-blue-900 px-3.5 py-2 rounded-xl transition-all border border-blue-200/80"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <div className="hidden lg:block text-left text-xs">
                <p className="text-blue-600 text-[10px] font-semibold leading-none">Keranjang</p>
                <p className="font-extrabold text-slate-900 text-xs leading-tight mt-0.5">
                  {formatRupiah(cartSubtotal)}
                </p>
              </div>
            </Link>

            {/* User Profile Dropdown */}
            <div ref={userMenuRef} className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
              >
                {user ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/30"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
                    <UserIcon className="w-4 h-4" />
                  </div>
                )}
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 divide-y divide-slate-100 text-sm">
                  {user ? (
                    <>
                      <div className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          />
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 truncate">{user.name}</p>
                            <p className="text-xs text-slate-500 truncate">{user.email}</p>
                            <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                              user.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {user.role === 'admin' ? 'Administrator Store' : 'Akun Pelanggan'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="py-1">
                        {user.role === 'admin' && (
                          <Link
                            to="/admin"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center space-x-2.5 px-4 py-2.5 text-amber-700 hover:bg-amber-50 font-bold transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4 text-amber-600" />
                            <span>Dashboard Admin</span>
                          </Link>
                        )}
                        <Link
                          to="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center space-x-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors font-medium text-xs"
                        >
                          <UserIcon className="w-4 h-4 text-slate-400" />
                          <span>Profil Akun Saya</span>
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center space-x-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors font-medium text-xs"
                        >
                          <PackageCheck className="w-4 h-4 text-slate-400" />
                          <span>Riwayat Pesanan</span>
                        </Link>
                        <Link
                          to="/wishlist"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center space-x-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors font-medium text-xs"
                        >
                          <Heart className="w-4 h-4 text-slate-400" />
                          <span>Produk Favorit</span>
                        </Link>
                      </div>

                      <div className="pt-1">
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center space-x-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 transition-colors font-semibold text-xs text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Keluar (Logout)</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-3.5 space-y-2">
                      <p className="text-xs text-slate-500 mb-2">Masuk ke akun ElectroHub untuk menikmati promo eksklusif.</p>
                      <Link
                        to="/login"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-bold py-2 rounded-xl text-xs transition-colors shadow-xs"
                      >
                        Masuk (Login)
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block w-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-center font-semibold py-2 rounded-xl text-xs transition-colors"
                      >
                        Daftar Akun Baru
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk elektronik..."
              className="w-full bg-slate-100 text-slate-900 placeholder-slate-400 text-xs rounded-xl pl-9 pr-16 py-2.5 border border-slate-200 focus:outline-none focus:border-blue-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-lg"
            >
              Cari
            </button>
          </form>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Category Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-xs font-bold transition-colors"
              >
                <Layers className="w-4 h-4" />
                <span>Kategori Pilihan</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1" />
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute left-0 top-full mt-0 w-64 bg-white border border-slate-200 shadow-2xl rounded-b-xl py-2 z-50 divide-y divide-slate-100">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      onClick={() => setIsCategoryMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium">({cat.productCount})</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Primary Nav Links */}
            <div className="flex items-center space-x-6 text-xs font-semibold text-slate-700">
              <Link to="/" className="hover:text-blue-600 transition-colors py-2.5">
                Beranda
              </Link>
              <Link to="/products" className="hover:text-blue-600 transition-colors py-2.5">
                Katalog Produk
              </Link>
              <Link to="/promos" className="text-amber-600 hover:text-amber-700 font-bold flex items-center space-x-1 py-2.5">
                <Tag className="w-3.5 h-3.5" />
                <span>Promo & Diskon</span>
              </Link>
              <Link to="/about" className="hover:text-blue-600 transition-colors py-2.5">
                Tentang Toko
              </Link>
              <Link to="/contact" className="hover:text-blue-600 transition-colors py-2.5">
                Pusat Bantuan
              </Link>
            </div>
          </div>

          {/* Customer Hotline Callout */}
          <div className="flex items-center space-x-2 text-xs text-slate-600">
            <Headphones className="w-4 h-4 text-blue-600" />
            <span>Hotline 24 Jam: </span>
            <a href="tel:08001234567" className="font-extrabold text-slate-900 hover:text-blue-600">
              0800-123-ELECTRO
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-4 shadow-lg">
          <div className="space-y-1 border-b border-slate-100 pb-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Kategori Produk</p>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-1.5 text-xs text-slate-700 hover:text-blue-600 font-medium"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="space-y-2 text-xs font-semibold pt-2 text-slate-700">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-1.5 hover:text-blue-600"
            >
              Beranda
            </Link>
            <Link
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-1.5 hover:text-blue-600"
            >
              Semua Produk
            </Link>
            <Link
              to="/promos"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-1.5 text-amber-600"
            >
              Promo & Diskon
            </Link>
            <Link
              to="/track-order"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-1.5 hover:text-blue-600"
            >
              Lacak Pesanan
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-1.5 hover:text-blue-600"
            >
              Tentang Toko
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-1.5 hover:text-blue-600"
            >
              Pusat Bantuan
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
