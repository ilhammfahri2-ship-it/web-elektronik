import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  Star,
  ShoppingCart,
  Heart,
  SlidersHorizontal,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  MessageSquare,
  CheckCircle2,
  CreditCard,
  Building2,
  Clock,
  MapPin
} from 'lucide-react';
import { formatRupiah, formatDateID } from '../utils/formatters';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    products,
    reviews,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    isInCompare,
    addReview,
    user
  } = useApp();

  const product = products.find((p) => p.id === id);

  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc' | 'reviews'>('specs');

  // Review Form State
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');

  if (!product) {
    return (
      <div className="bg-slate-50/70 text-slate-900 min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-black text-slate-900">Produk Tidak Ditemukan</h2>
        <p className="text-xs text-slate-500 mt-2 mb-6">Produk elektronik yang Anda cari mungkin telah dihapus atau stok sedang kosong.</p>
        <Link to="/products" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs">
          Kembali ke Katalog Produk
        </Link>
      </div>
    );
  }

  const currentImage = activeImage || product.image;
  const isLiked = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const productReviews = reviews.filter((r) => r.productId === product.id);

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant);
    navigate('/cart');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addReview({
      productId: product.id,
      userName: user ? user.name : 'Pengunjung Toko',
      userAvatar: user ? user.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      rating: newRating,
      comment: newComment.trim(),
      verifiedPurchase: true,
    });

    setNewComment('');
  };

  // 12-month installment approximation
  const monthlyInstallment = Math.round((product.discountPrice || product.price) / 12);

  return (
    <div className="bg-slate-50/70 text-slate-900 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 space-y-6 pt-4">
        <Breadcrumbs
          items={[
            { label: product.categoryName, path: `/category/${product.category}` },
            { label: product.name },
          ]}
        />

        {/* Product Core Section: Gallery + Summary Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-slate-200/90 rounded-3xl p-6 lg:p-8 shadow-xs">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden pt-[80%] bg-slate-50 border border-slate-200">
              <img
                src={currentImage}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
              />
              {product.discountPrice && (
                <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-black px-3 py-1 rounded-lg shadow-sm">
                  Hemat {formatRupiah(product.price - product.discountPrice)}
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-1">
                {product.gallery.map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden bg-slate-50 border-2 transition-all shrink-0 ${
                      currentImage === imgUrl ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img src={imgUrl} alt={`${product.name} ${index}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Guarantees Box */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <ShieldCheck className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <p className="text-[11px] font-bold text-slate-800">100% Original</p>
                <p className="text-[10px] text-slate-400">Garansi Distributor</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <Truck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <p className="text-[11px] font-bold text-slate-800">Packing Kayu</p>
                <p className="text-[10px] text-slate-400">Gratis & Ekstra Aman</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <RotateCcw className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <p className="text-[11px] font-bold text-slate-800">7 Hari Retur</p>
                <p className="text-[10px] text-slate-400">Bila Cacat Pabrik</p>
              </div>
            </div>
          </div>

          {/* Right: Product Info & Buy Box */}
          <div className="lg:col-span-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 font-extrabold text-[11px] px-2.5 py-1 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 fill-blue-600 text-white" />
                  Official Store • {product.brand}
                </span>
                <span className="font-mono text-slate-400 text-xs">SKU: {product.sku}</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {product.name}
              </h1>

              {/* Rating & Sold */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center space-x-1 text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span className="font-bold text-slate-900">{product.rating}</span>
                  <span className="text-slate-500">({product.reviewCount} ulasan)</span>
                </div>

                <div className="text-slate-500 font-medium">
                  • Terjual <strong className="text-slate-900">{product.reviewCount * 7 + 42}+ unit</strong>
                </div>

                <div className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60">
                  Stok: {product.stock} unit (Siap Kirim)
                </div>
              </div>

              {/* Price Display & Installment info */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
                <p className="text-xs text-slate-500 font-medium">Harga Resmi Toko</p>
                <div className="flex items-baseline space-x-3">
                  {product.discountPrice ? (
                    <>
                      <span className="text-2xl sm:text-3xl font-black text-slate-900">
                        {formatRupiah(product.discountPrice)}
                      </span>
                      <span className="text-sm text-slate-400 line-through">
                        {formatRupiah(product.price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">
                      {formatRupiah(product.price)}
                    </span>
                  )}
                </div>
                <div className="pt-2 flex items-center space-x-2 text-xs text-slate-600 border-t border-slate-200/60">
                  <CreditCard className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Cicilan 0% mulai <strong>{formatRupiah(monthlyInstallment)} / bulan</strong> (12 bln)</span>
                </div>
              </div>

              {/* Warranty Box */}
              <div className="p-3 bg-blue-50/60 border border-blue-200/80 rounded-xl flex items-start space-x-2.5 text-xs">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-blue-900">Jaminan Garansi Resmi</p>
                  <p className="text-blue-700 text-[11px] mt-0.5">{product.warranty}</p>
                </div>
              </div>

              {/* Variants Picker if available */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Pilih Varian & Kapasitas:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v.name)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                          selectedVariant === v.name
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Jumlah Beli:</label>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center bg-white border border-slate-200 rounded-xl shadow-xs">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2.5 text-slate-600 hover:text-slate-900"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold text-sm text-slate-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="p-2.5 text-slate-600 hover:text-slate-900"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-slate-500">
                    Subtotal: <strong className="text-slate-900">{formatRupiah((product.discountPrice || product.price) * quantity)}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors border border-slate-200"
                >
                  <ShoppingCart className="w-4 h-4 text-blue-600" />
                  <span>+ Tambah Keranjang</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={product.stock <= 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-md shadow-blue-600/20"
                >
                  Beli Sekarang
                </button>
              </div>

              {/* Wishlist & Compare Toggles */}
              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`flex items-center space-x-1.5 font-semibold transition-colors ${
                    isLiked ? 'text-rose-600' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-rose-600' : ''}`} />
                  <span>{isLiked ? 'Tersimpan di Favorit' : 'Simpan ke Favorit'}</span>
                </button>

                <button
                  onClick={() => addToCompare(product)}
                  className={`flex items-center space-x-1.5 font-semibold transition-colors ${
                    isCompared ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>{isCompared ? 'Dalam Komparasi' : 'Bandingkan Spesifikasi'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info Section (Specs, Description, Reviews) */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center space-x-6 border-b border-slate-100 text-sm font-bold">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 transition-colors border-b-2 ${
                activeTab === 'specs'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Spesifikasi Lengkap
            </button>
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 transition-colors border-b-2 ${
                activeTab === 'desc'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Deskripsi Produk
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 transition-colors border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Ulasan Pembeli ({productReviews.length})
            </button>
          </div>

          {/* Specs Tab Content */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Tabel Rincian Spesifikasi Resmi</h3>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-xs text-left border-collapse">
                  <tbody className="divide-y divide-slate-100">
                    {Object.entries(product.specs || {}).map(([key, value], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                        <td className="py-3 px-4 font-semibold text-slate-600 w-1/3 bg-slate-50">{key}</td>
                        <td className="py-3 px-4 font-medium text-slate-900">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Description Tab Content */}
          {activeTab === 'desc' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
              <h3 className="text-sm font-bold text-slate-900">Deskripsi & Keunggulan Produk</h3>
              <p className="whitespace-pre-line leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Reviews Tab Content */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Write Review Form */}
              <form onSubmit={handleReviewSubmit} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <span>Tulis Ulasan Pembeli</span>
                </h4>

                <div className="flex items-center space-x-3 text-xs">
                  <span className="text-slate-600 font-semibold">Beri Nilai Bintang:</span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        onClick={() => setNewRating(star)}
                        className={`w-5 h-5 cursor-pointer ${
                          star <= newRating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ceritakan pengalaman Anda setelah menggunakan produk elektronik ini..."
                  rows={3}
                  className="w-full bg-white text-xs text-slate-900 placeholder-slate-400 rounded-xl p-3 border border-slate-200 focus:outline-none focus:border-blue-500"
                />

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  Kirim Ulasan Saya
                </button>
              </form>

              {/* Reviews List */}
              <div className="space-y-3">
                {productReviews.length > 0 ? (
                  productReviews.map((rev) => (
                    <div key={rev.id} className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <img src={rev.userAvatar} alt={rev.userName} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                          <div>
                            <span className="text-xs font-bold text-slate-900">{rev.userName}</span>
                            <p className="text-[10px] text-slate-400">{formatDateID(rev.date)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 text-amber-500 text-xs">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-bold text-slate-900">{rev.rating}.0</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">"{rev.comment}"</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 italic text-center py-6">
                    Belum ada ulasan untuk produk ini. Jadilah yang pertama memberikan ulasan!
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Rekomendasi Produk Terkait</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
