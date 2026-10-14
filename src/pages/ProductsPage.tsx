import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SlidersHorizontal, Search, Filter, RefreshCw, Star } from 'lucide-react';
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
  const itemsPerPage = 8;

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

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <Breadcrumbs items={[{ label: 'Katalog Produk' }]} />

        {/* Page Title & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-navy-900 p-6 rounded-3xl border border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Semua Produk Elektronik</h1>
            <p className="text-xs text-slate-400 mt-1">
              Menampilkan {filteredProducts.length} produk pilihan garansi resmi Indonesia
            </p>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari berdasarkan nama, merk..."
                className="w-full bg-slate-800 text-xs text-white placeholder-slate-400 rounded-xl pl-9 pr-4 py-2.5 border border-slate-700 focus:outline-none focus:border-electro-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden bg-slate-800 hover:bg-slate-700 text-slate-200 p-2.5 rounded-xl border border-slate-700 flex items-center space-x-2 text-xs font-semibold"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Main Content Layout: Sidebar Filter + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-slate-900 border border-slate-800/90 rounded-2xl p-5 space-y-6 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-electro-400" />
                  <span>Filter Produk</span>
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-xs text-slate-400 hover:text-rose-400 flex items-center space-x-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Kategori</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-800 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-700 focus:outline-none focus:border-electro-500"
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
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Merek / Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-slate-800 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-700 focus:outline-none focus:border-electro-500"
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
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Rentang Harga (Rp)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Minimum"
                    className="bg-slate-800 text-xs text-white placeholder-slate-500 rounded-xl p-2 border border-slate-700"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Maksimum"
                    className="bg-slate-800 text-xs text-white placeholder-slate-500 rounded-xl p-2 border border-slate-700"
                  />
                </div>
              </div>

              {/* Min Rating Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Rating Minimal</label>
                <div className="space-y-1 text-xs">
                  {[4, 3, 2, 1].map((star) => (
                    <label key={star} className="flex items-center space-x-2 cursor-pointer hover:text-white">
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === star}
                        onChange={() => setMinRating(minRating === star ? 0 : star)}
                        className="accent-electro-500"
                      />
                      <div className="flex items-center space-x-1 text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-slate-300 font-medium">{star} bintang & ke atas</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* In Stock Only Checkbox */}
              <div className="pt-2 border-t border-slate-800">
                <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-medium text-slate-300">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-electro-500 w-4 h-4 rounded"
                  />
                  <span>Hanya Tampilkan Stok Tersedia</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9 space-y-6">
            {/* Sorting Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs">
              <div className="text-slate-400">
                Menampilkan <span className="font-bold text-white">{paginatedProducts.length}</span> dari <span className="font-bold text-white">{filteredProducts.length}</span> produk
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-slate-400 shrink-0">Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-800 text-white rounded-xl px-3 py-1.5 border border-slate-700 focus:outline-none focus:border-electro-500"
                >
                  <option value="popular">Paling Populer</option>
                  <option value="newest">Produk Terbaru</option>
                  <option value="price-asc">Harga: Terendah ke Tertinggi</option>
                  <option value="price-desc">Harga: Tertinggi ke Terendah</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
                <Search className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">Produk Tidak Ditemukan</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Maaf, tidak ada produk elektronik yang memenuhi kriteria pencarian dan filter Anda. Coba ubah atau atur ulang filter.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-electro-600 hover:bg-electro-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors"
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
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700"
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
                          ? 'bg-electro-600 text-white shadow-md'
                          : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700"
                >
                  Selanjutnya
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
