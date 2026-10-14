import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Layers } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const { products, categories } = useApp();

  const currentCategory = categories.find((c) => c.slug === categorySlug);
  const categoryProducts = categorySlug
    ? products.filter((p) => p.category === categorySlug)
    : products;

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Kategori', path: '/categories' },
            ...(currentCategory ? [{ label: currentCategory.name }] : []),
          ]}
        />

        {/* Category Hero Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-navy-900 via-electro-950 to-navy-950 border border-slate-800 p-8">
          <div className="max-w-2xl space-y-3 relative z-10">
            <div className="inline-flex items-center space-x-2 bg-electro-500/20 text-electro-300 px-3 py-1 rounded-full text-xs font-bold">
              <Layers className="w-4 h-4" />
              <span>Kategori Elektronik</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">
              {currentCategory ? currentCategory.name : 'Semua Kategori Produk'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentCategory
                ? currentCategory.description
                : 'Jelajahi seluruh kategori perangkat & peralatan elektronik terbaik di ElectroHub.'}
            </p>
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <Link
            to="/products"
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              !categorySlug
                ? 'bg-electro-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            Semua Produk
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                categorySlug === cat.slug
                  ? 'bg-electro-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              {cat.name} ({cat.productCount})
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
