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
  Percent,
  ShieldCheck,
  Truck,
  Layers,
  Sparkles
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

  return (
    <header className="sticky top-0 z-40 bg-navy-900 text-slate-100 shadow-xl border-b border-slate-800/80">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-navy-950 via-electro-900 to-navy-950 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-slate-300 gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5 text-electro-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-electro-400" />
              <span>100% Produk Original & Garansi Resmi Indonesia</span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:flex items-center space-x-1.5 text-slate-300">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Gratis Ongkir s.d Rp 50rb se-Indonesia</span>
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-medium">
            <Link to="/promos" className="hover:text-electro-400 transition-colors flex items-center space-x-1">
              <Percent className="w-3.5 h-3.5 text-amber-400" />
              <span>Promo Terbaru</span>
            </Link>
            <span className="text-slate-600">|</span>
            <Link to="/track-order" className="hover:text-electro-400 transition-colors flex items-center space-x-1">
              <PackageCheck className="w-3.5 h-3.5 text-electro-400" />
              <span>Lacak Pesanan</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-electro-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-electro-600/30 group-hover:scale-105 transition-transform duration-200">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-electro-300 bg-clip-text text-transparent">
                Electro<span className="text-electro-400">Hub</span>
              </span>
              <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider -mt-1">
                Store Elektronik Resmi
              </p>
            </div>
          </Link>

          {/* Search Bar with Autocomplete */}
          <div ref={searchRef} className="hidden md:block flex-1 max-w-2xl mx-4 relative">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder="Cari smartphone, laptop, headset, kamera, monitor..."
                className="w-full bg-slate-800/90 text-white placeholder-slate-400 text-sm rounded-xl pl-11 pr-24 py-2.5 border border-slate-700 focus:outline-none focus:border-electro-500 focus:ring-2 focus:ring-electro-500/20 transition-all shadow-inner"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-electro-600 hover:bg-electro-500 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors shadow-md"
              >
                Cari
              </button>
            </form>

            {/* Live Search Autocomplete Overlay */}
            {showSearchDropdown && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-800">
                <div className="p-2 text-xs font-medium text-slate-400 bg-slate-950/60 flex items-center justify-between">
                  <span>Hasil pencarian untuk "{searchQuery}"</span>
                  <span>{searchResults.length} produk ditemukan</span>
                </div>
                {searchResults.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto">
                    {searchResults.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          setShowSearchDropdown(false);
                          setSearchQuery('');
                          navigate(`/product/${prod.id}`);
                        }}
                        className="flex items-center space-x-3 p-3 hover:bg-slate-800/80 transition-colors cursor-pointer"
                      >
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-12 h-12 object-cover rounded-lg bg-slate-800 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-white truncate">{prod.name}</h4>
                          <p className="text-xs text-slate-400">{prod.brand} • {prod.categoryName}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-electro-400">
                            {formatRupiah(prod.discountPrice || prod.price)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-slate-400">
                    Tidak ada produk elektronik yang cocok.
                  </div>
                )}
                <div
                  onClick={() => {
                    setShowSearchDropdown(false);
                    navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
                  }}
                  className="p-3 text-center text-xs font-semibold text-electro-400 bg-slate-950/80 hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  Lihat Semua Hasil Pencarian →
                </div>
              </div>
            )}
          </div>

          {/* Action Menu (Compare, Wishlist, Cart, User) */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Compare Button */}
            {onOpenCompare && (
              <button
                onClick={onOpenCompare}
                className="relative p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center space-x-1.5 text-xs font-medium"
                title="Bandingkan Spesifikasi"
              >
                <SlidersHorizontal className="w-5 h-5 text-electro-400" />
                <span className="hidden lg:inline">Bandingkan</span>
                {compareList.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-electro-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-navy-900">
                    {compareList.length}
                  </span>
                )}
              </button>
            )}

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Favorit Saya"
            >
              <Heart className="w-5 h-5 text-rose-400" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-navy-900">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart */}
            <Link
              to="/cart"
              className="relative flex items-center space-x-2 bg-slate-800/90 hover:bg-slate-700/80 text-white px-3 py-2 rounded-xl transition-all border border-slate-700/60"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-electro-400" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-electro-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <div className="hidden xl:block text-left text-xs">
                <p className="text-slate-400 text-[10px] font-medium leading-none">Keranjang</p>
                <p className="font-bold text-white text-xs leading-tight mt-0.5">
                  {formatRupiah(cartSubtotal)}
                </p>
              </div>
            </Link>

            {/* User Profile Dropdown */}
            <div ref={userMenuRef} className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
              >
                {user ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-electro-500/50"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
                    <UserIcon className="w-4 h-4" />
                  </div>
                )}
                <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl py-2 z-50 divide-y divide-slate-800 text-sm">
                  {user ? (
                    <>
                      <div className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-white truncate">{user.name}</p>
                            <p className="text-xs text-slate-400 truncate">{user.email}</p>
                            <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                              user.role === 'admin' ? 'bg-amber-500/20 text-amber-300' : 'bg-electro-500/20 text-electro-300'
                            }`}>
                              {user.role === 'admin' ? 'Administrator' : 'Pelanggan'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="py-1">
                        {user.role === 'admin' && (
                          <Link
                            to="/admin"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center space-x-2.5 px-4 py-2.5 text-amber-400 hover:bg-slate-800 font-semibold transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Dashboard Admin</span>
                          </Link>
                        )}
                        <Link
                          to="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center space-x-2.5 px-4 py-2 text-slate-300 hover:bg-slate-800 transition-colors"
                        >
                          <UserIcon className="w-4 h-4 text-slate-400" />
                          <span>Profil Saya</span>
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center space-x-2.5 px-4 py-2 text-slate-300 hover:bg-slate-800 transition-colors"
                        >
                          <PackageCheck className="w-4 h-4 text-slate-400" />
                          <span>Riwayat Pesanan</span>
                        </Link>
                        <Link
                          to="/wishlist"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center space-x-2.5 px-4 py-2 text-slate-300 hover:bg-slate-800 transition-colors"
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
                          className="w-full flex items-center space-x-2.5 px-4 py-2 text-rose-400 hover:bg-slate-800 transition-colors font-medium text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Keluar (Logout)</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-3 space-y-2">
                      <p className="text-xs text-slate-400 mb-2">Masuk untuk melihat pesanan & profil Anda</p>
                      <Link
                        to="/login"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block w-full bg-electro-600 hover:bg-electro-500 text-white text-center font-semibold py-2 rounded-xl text-xs transition-colors"
                      >
                        Masuk (Login)
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block w-full border border-slate-700 hover:bg-slate-800 text-slate-200 text-center font-medium py-2 rounded-xl text-xs transition-colors"
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
              className="md:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-800"
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
              className="w-full bg-slate-800 text-white placeholder-slate-400 text-xs rounded-xl pl-9 pr-16 py-2 border border-slate-700 focus:outline-none focus:border-electro-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-electro-600 text-white text-[11px] font-semibold px-3 py-1 rounded-lg"
            >
              Cari
            </button>
          </form>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-navy-950 border-t border-slate-800/80 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className="flex items-center space-x-2 bg-electro-600 hover:bg-electro-500 text-white px-4 py-2.5 text-xs font-bold transition-colors"
            >
              <Layers className="w-4 h-4" />
              <span>Semua Kategori</span>
              <ChevronDown className="w-3.5 h-3.5 ml-1" />
            </button>

            {isCategoryMenuOpen && (
              <div className="absolute left-0 top-full mt-0 w-64 bg-slate-900 border border-slate-700/80 shadow-2xl rounded-b-xl py-2 z-50 divide-y divide-slate-800">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    onClick={() => setIsCategoryMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 text-xs text-slate-200 hover:bg-slate-800 hover:text-electro-400 transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-slate-500">({cat.productCount})</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Primary Nav Links */}
          <div className="flex items-center space-x-6 text-xs font-medium">
            <Link to="/" className="text-slate-200 hover:text-electro-400 transition-colors py-3">
              Beranda
            </Link>
            <Link to="/products" className="text-slate-200 hover:text-electro-400 transition-colors py-3">
              Katalog Produk
            </Link>
            <Link to="/promos" className="text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1 py-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Promo & Diskon</span>
            </Link>
            <Link to="/about" className="text-slate-200 hover:text-electro-400 transition-colors py-3">
              Tentang Toko
            </Link>
            <Link to="/contact" className="text-slate-200 hover:text-electro-400 transition-colors py-3">
              Kontak & Bantuan
            </Link>
          </div>

          {/* Customer Hotline Callout */}
          <div className="text-xs text-slate-400">
            <span>Bantuan CS: </span>
            <a href="tel:08001234567" className="font-bold text-white hover:text-electro-400">
              0800-123-ELECTRO
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 space-y-4">
          <div className="space-y-1 border-b border-slate-800 pb-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Kategori Produk</p>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-1.5 text-xs text-slate-300 hover:text-electro-400"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="space-y-2 text-xs font-medium pt-2">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-1.5 text-slate-200 hover:text-electro-400"
            >
              Beranda
            </Link>
            <Link
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-1.5 text-slate-200 hover:text-electro-400"
            >
              Semua Produk
            </Link>
            <Link
              to="/promos"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-1.5 text-amber-400"
            >
              Promo & Diskon
            </Link>
            <Link
              to="/track-order"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-1.5 text-slate-200"
            >
              Lacak Pesanan
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-1.5 text-slate-200"
            >
              Tentang Toko
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-1.5 text-slate-200"
            >
              Kontak & Bantuan
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
