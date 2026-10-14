import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Heart, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist } = useApp();

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <Breadcrumbs items={[{ label: 'Produk Favorit (Wishlist)' }]} />

        <div className="bg-navy-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Wishlist Saya</h1>
            <p className="text-xs text-slate-400">
              {wishlist.length} produk elektronik yang disukai dan disimpan
            </p>
          </div>
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center space-y-4 max-w-xl mx-auto">
            <Heart className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">Wishlist Anda Masih Kosong</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Simpan produk elektronik yang ingin Anda beli nanti dengan menekan tombol hati pada kartu produk.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-electro-600 hover:bg-electro-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg"
            >
              <span>Jelajahi Produk Katalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <ProductCard key={item.productId} product={item.product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
