import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Search } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const { products } = useApp();

  const searchResults = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : products;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <Breadcrumbs items={[{ label: 'Pencarian' }]} />

        <div className="bg-navy-900 border border-slate-800 rounded-3xl p-8 space-y-6 text-center max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Cari Produk Elektronik</h1>
          <p className="text-xs text-slate-400">Temukan gadget, hp, laptop, dan aksesori resmi di ElectroHub</p>

          <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ketik kata kunci pencarian..."
              className="w-full bg-slate-800 text-white placeholder-slate-400 text-sm rounded-2xl pl-11 pr-28 py-3.5 border border-slate-700 focus:outline-none focus:border-electro-500"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-electro-600 hover:bg-electro-500 text-white text-xs font-bold px-5 py-2 rounded-xl transition-colors"
            >
              Cari
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white mb-4">
            {query.trim()
              ? `Hasil pencarian untuk "${query}" (${searchResults.length} produk)`
              : `Semua Produk Elektronik (${searchResults.length})`}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
