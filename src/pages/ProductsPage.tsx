import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SlidersHorizontal, Search, Filter, RefreshCw, Star, X, Check } from 'lucide-react';
import type { CategoryType } from '../types';

export const ProductsPage: React.FC = () => {
  const { products, categories } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query state
  const searchFromUrl = searchParams.get('search') || '';
  const categoryFromUrl = searchParams.get('category') as CategoryType | null;
  const brandFromUrl = searchParams.get('brand') || '';

  // Local filter states
  const [searchTerm, setSearchTerm] = useState(searchFromUrl);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl || 'all');
  const [selectedBrand, setSelectedBrand] = useState<string>(brandFromUrl || 'all');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  // Extract unique brands
  const brandsList = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand)));
  }, [products]);

  // Filter products algorithm
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      const query = searchTerm.toLowerCase();
      if (query && !p.name.toLowerCase().includes(query) && !p.brand.toLowerCase().includes(query) && !p.categoryName.toLowerCase().includes(query)) {
        return false;
      }
      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Brand
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
        return false;
      }
      // Price range
      const effectivePrice = p.discountPrice || p.price;
      if (minPrice && effectivePrice < Number(minPrice)) return false;
      if (maxPrice && effectivePrice > Number(maxPrice)) return false;
      // Rating
      if (minRating > 0 && p.rating < minRating) return false;
      // Stock
      if (inStockOnly && p.stock <= 0) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.isNew ? 1 : -1;
      return b.reviewCount - a.reviewCount; // Popularity default
    });
  }, [products, searchTerm, selectedCategory, selectedBrand, minPrice, maxPrice, minRating, inStockOnly, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setMinPrice('');
    setMaxPrice('');
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('popular');
    setSearchParams({});
  };

  const handlePricePreset = (min: string, max: string) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <div className="bg-slate-50/70 text-slate-900 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 space-y-6 pt-4">
        <Breadcrumbs items={[{ label: 'Katalog Produk Elektronik' }]} />

        {/* Page Title & Search Bar Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Katalog Produk Elektronik</h1>
            <p className="text-xs text-slate-500 mt-1">
              Menampilkan {filteredProducts.length} pilihan perangkat garansi resmi distributor Indonesia
            </p>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari berdasarkan nama, spesifikasi, brand..."
                className="w-full bg-slate-50 hover:bg-white text-xs text-slate-900 placeholder-slate-400 rounded-xl pl-9 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all shadow-xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden bg-slate-100 hover:bg-slate-200 text-slate-700 p-2.5 rounded-xl border border-slate-200 flex items-center space-x-2 text-xs font-semibold"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Main Content Layout: Sidebar Filter + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-5 shadow-xs sticky top-24">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                  <span>Filter Katalog</span>
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Category Filter */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Kategori</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-50 text-xs text-slate-800 font-medium rounded-xl p-2.5 border border-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="all">Semua Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name} ({cat.productCount})
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Merek / Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-slate-50 text-xs text-slate-800 font-medium rounded-xl p-2.5 border border-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="all">Semua Merek</option>
                  {brandsList.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Rentang Harga (Rp)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min"
                    className="bg-slate-50 text-xs text-slate-900 placeholder-slate-400 rounded-xl p-2 border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max"
                    className="bg-slate-50 text-xs text-slate-900 placeholder-slate-400 rounded-xl p-2 border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                {/* Quick Presets */}
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <button
                    onClick={() => handlePricePreset('0', '2000000')}
                    className="text-[10px] font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 py-1 px-2 rounded-lg transition-colors text-center"
                  >
                    &lt; Rp 2 Jt
                  </button>
                  <button
                    onClick={() => handlePricePreset('2000000', '7000000')}
                    className="text-[10px] font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 py-1 px-2 rounded-lg transition-colors text-center"
                  >
                    Rp 2 - 7 Jt
                  </button>
                  <button
                    onClick={() => handlePricePreset('7000000', '15000000')}
                    className="text-[10px] font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 py-1 px-2 rounded-lg transition-colors text-center"
                  >
                    Rp 7 - 15 Jt
                  </button>
                  <button
                    onClick={() => handlePricePreset('15000000', '')}
                    className="text-[10px] font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 py-1 px-2 rounded-lg transition-colors text-center"
                  >
                    &gt; Rp 15 Jt
                  </button>
                </div>
              </div>

              {/* Min Rating Filter */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Rating Konsumen</label>
                <div className="space-y-1.5 text-xs">
                  {[4, 3, 2].map((star) => (
                    <label key={star} className="flex items-center space-x-2 cursor-pointer hover:text-blue-600">
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === star}
                        onChange={() => setMinRating(minRating === star ? 0 : star)}
                        className="accent-blue-600"
                      />
                      <div className="flex items-center space-x-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-slate-700 font-semibold text-xs">{star} bintang ke atas</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* In Stock Only Checkbox */}
              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-blue-600 w-4 h-4 rounded"
                  />
                  <span>Hanya Stok Siap Kirim</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9 space-y-4">
            {/* Sorting Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 sm:px-4 rounded-2xl border border-slate-200/90 text-xs shadow-xs">
              <div className="text-slate-600">
                Menampilkan <span className="font-extrabold text-slate-900">{paginatedProducts.length}</span> dari <span className="font-extrabold text-slate-900">{filteredProducts.length}</span> produk
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-slate-500 shrink-0 font-medium">Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 text-slate-800 font-semibold rounded-xl px-3 py-1.5 border border-slate-200 focus:outline-none focus:border-blue-500 text-xs"
                >
                  <option value="popular">Paling Sesuai & Terlaris</option>
                  <option value="newest">Produk Rilis Terbaru</option>
                  <option value="price-asc">Harga: Terendah ke Tertinggi</option>
                  <option value="price-desc">Harga: Tertinggi ke Terendah</option>
                  <option value="rating">Ulasan Rating Tertinggi</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-xs">
                <Search className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">Produk Tidak Ditemukan</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Maaf, tidak ada produk elektronik yang memenuhi kriteria pencarian dan filter Anda. Silakan coba ubah kata kunci atau atur ulang filter.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  Reset Semua Filter
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 pt-6">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 shadow-xs"
                >
                  Sebelumnya
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-colors ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 shadow-xs"
                >
                  Selanjutnya
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-sm bg-white h-full p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-sm font-bold text-slate-900">Filter Katalog</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">Kategori</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-50 text-xs p-2.5 rounded-xl border border-slate-200"
                >
                  <option value="all">Semua Kategori</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-slate-50 text-xs p-2.5 rounded-xl border border-slate-200"
                >
                  <option value="all">Semua Merek</option>
                  {brandsList.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">Rentang Harga</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min"
                    className="bg-slate-50 text-xs p-2 rounded-xl border border-slate-200"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max"
                    className="bg-slate-50 text-xs p-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-blue-600 text-white font-bold text-xs py-3 rounded-xl shadow-xs"
              >
                Terapkan Filter
              </button>
              <button
                onClick={() => {
                  resetFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full border border-slate-200 text-slate-600 font-semibold text-xs py-2.5 rounded-xl"
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
