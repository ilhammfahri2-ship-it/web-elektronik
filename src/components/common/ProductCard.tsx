import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { Star, ShoppingCart, Heart, SlidersHorizontal, CheckCircle2, MapPin } from 'lucide-react';
import { formatRupiah } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, addToCompare, isInCompare } = useApp();

  const isLiked = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const discountPercent = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  // Approximate sold units for realistic e-commerce feel
  const soldCount = (product.reviewCount * 7) + 42;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-500/80 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Badges Container */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col items-start gap-1">
        <span className="inline-flex items-center gap-1 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
          <CheckCircle2 className="w-3 h-3 fill-white text-blue-600 shrink-0" />
          <span>Official Store</span>
        </span>
        {discountPercent > 0 && (
          <span className="bg-rose-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-md shadow-xs">
            Hemat {discountPercent}%
          </span>
        )}
        {product.isBestseller && (
          <span className="bg-amber-100 text-amber-800 border border-amber-300/80 text-[10px] font-bold px-1.5 py-0.2 rounded-md">
            Terlaris
          </span>
        )}
      </div>

      {/* Quick Action Overlay Buttons */}
      <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-200">
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`p-2 rounded-full border transition-all shadow-xs ${
            isLiked
              ? 'bg-rose-500 border-rose-500 text-white'
              : 'bg-white/95 border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200'
          }`}
          title={isLiked ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
        >
          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            addToCompare(product);
          }}
          className={`p-2 rounded-full border transition-all shadow-xs ${
            isCompared
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'bg-white/95 border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200'
          }`}
          title={isCompared ? 'Dalam Perbandingan' : 'Bandingkan Spesifikasi'}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Image Banner */}
      <Link to={`/product/${product.id}`} className="block relative pt-[78%] bg-slate-50/70 overflow-hidden border-b border-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              Stok Habis
            </span>
          </div>
        )}
      </Link>

      {/* Details Body */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-blue-600 text-[11px] tracking-wide uppercase">{product.brand}</span>
            <span className="text-[11px] text-slate-500 font-medium truncate max-w-[100px]">{product.categoryName}</span>
          </div>

          <Link to={`/product/${product.id}`} className="block">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Rating & Sold count */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <div className="flex items-center space-x-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-bold text-slate-800 text-xs">{product.rating}</span>
            <span className="text-slate-400">({product.reviewCount})</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 text-[11px] font-medium">Terjual {soldCount}+</span>
          </div>

          <div className="text-[11px]">
            {product.stock > 0 ? (
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">Ready</span>
            ) : (
              <span className="text-rose-600 font-semibold bg-rose-50 px-1.5 py-0.5 rounded">Habis</span>
            )}
          </div>
        </div>

        {/* Origin Tag */}
        <div className="flex items-center space-x-1 text-[11px] text-slate-500 font-medium">
          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
          <span>Jakarta Pusat</span>
          <span className="text-slate-300">•</span>
          <span className="text-blue-600 font-semibold">⚡ Instant</span>
        </div>

        {/* Price & CTA */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="min-w-0">
            {product.discountPrice ? (
              <>
                <p className="text-[11px] text-slate-400 line-through leading-none">
                  {formatRupiah(product.price)}
                </p>
                <p className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-tight mt-0.5">
                  {formatRupiah(product.discountPrice)}
                </p>
              </>
            ) : (
              <p className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-tight">
                {formatRupiah(product.price)}
              </p>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stock <= 0}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all shadow-xs shrink-0 ${
              product.stock > 0
                ? 'bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-blue-600/10'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
            title="Tambah ke Keranjang"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">+ Keranjang</span>
          </button>
        </div>
      </div>
    </div>
  );
};

