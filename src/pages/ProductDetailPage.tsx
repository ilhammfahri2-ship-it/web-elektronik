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
  CheckCircle,
  Plus,
  Minus,
  MessageSquare,
  Share2
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
      <div className="bg-slate-950 text-slate-100 min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold">Produk Tidak Ditemukan</h2>
        <p className="text-xs text-slate-400 mt-2 mb-6">Produk elektronik yang Anda cari mungkin telah dihapus atau tidak tersedia.</p>
        <Link to="/products" className="bg-electro-600 hover:bg-electro-500 text-white font-semibold text-xs px-6 py-3 rounded-xl">
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

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <Breadcrumbs
          items={[
            { label: product.categoryName, path: `/category/${product.category}` },
            { label: product.name },
          ]}
        />

        {/* Product Core Section: Gallery + Summary Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-900 border border-slate-800/90 rounded-3xl p-6 lg:p-8 shadow-xl">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden pt-[75%] bg-slate-950 border border-slate-800">
              <img
                src={currentImage}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
              />
              {product.discountPrice && (
                <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
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
                    className={`relative w-20 h-20 rounded-xl overflow-hidden bg-slate-950 border-2 transition-all shrink-0 ${
                      currentImage === imgUrl ? 'border-electro-500 ring-2 ring-electro-500/30' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <img src={imgUrl} alt={`${product.name} ${index}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info & Buy Box */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="bg-electro-600/20 text-electro-400 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.brand}
                </span>
                <span className="font-mono text-slate-500">SKU: {product.sku}</span>
              </div>

              <h1 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
                {product.name}
              </h1>

              {/* Rating & Stock */}
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center space-x-1 text-amber-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold text-white">{product.rating}</span>
                  <span className="text-slate-400">({product.reviewCount} ulasan)</span>
                </div>

                <div className="bg-emerald-500/10 text-emerald-400 font-semibold px-3 py-1 rounded-lg border border-emerald-500/20">
                  ✓ Garansi Resmi Indonesia ({product.warranty})
                </div>

                <div className="text-slate-300 font-medium">
                  Stok: <strong className="text-white">{product.stock} unit</strong>
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
                <p className="text-xs text-slate-400">Harga Resmi Store</p>
                <div className="flex items-baseline space-x-3">
                  {product.discountPrice ? (
                    <>
                      <span className="text-2xl sm:text-3xl font-extrabold text-electro-400">
                        {formatRupiah(product.discountPrice)}
                      </span>
                      <span className="text-sm text-slate-500 line-through">
                        {formatRupiah(product.price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">
                      {formatRupiah(product.price)}
                    </span>
                  )}
                </div>
              </div>

              {/* Variants Picker if available */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Pilih Variasi Produk:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v.name)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                          selectedVariant === v.name
                            ? 'bg-electro-600 text-white border-electro-500'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
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
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Jumlah Pembelian:</label>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2.5 text-slate-400 hover:text-white"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold text-sm text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="p-2.5 text-slate-400 hover:text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-slate-500">Subtotal: {formatRupiah((product.discountPrice || product.price) * quantity)}</span>
                </div>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors border border-slate-700"
                >
                  <ShoppingCart className="w-4 h-4 text-electro-400" />
                  <span>Tambah Keranjang</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={product.stock <= 0}
                  className="w-full bg-gradient-to-r from-electro-600 to-electro-500 hover:from-electro-500 hover:to-electro-400 text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-electro-600/30"
                >
                  Beli Langsung Sekarang
                </button>
              </div>

              {/* Wishlist & Compare Toggles */}
              <div className="flex items-center justify-between text-xs pt-2">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`flex items-center space-x-1.5 font-medium transition-colors ${
                    isLiked ? 'text-rose-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{isLiked ? 'Dalam Wishlist' : 'Tambah ke Wishlist'}</span>
                </button>

                <button
                  onClick={() => addToCompare(product)}
                  className={`flex items-center space-x-1.5 font-medium transition-colors ${
                    isCompared ? 'text-electro-400' : 'text-slate-400 hover:text-white'
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
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center space-x-6 border-b border-slate-800 text-sm font-bold">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 transition-colors border-b-2 ${
                activeTab === 'specs'
                  ? 'border-electro-500 text-electro-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Spesifikasi Teknis
            </button>
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 transition-colors border-b-2 ${
                activeTab === 'desc'
                  ? 'border-electro-500 text-electro-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Deskripsi Produk
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 transition-colors border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-electro-500 text-electro-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Ulasan ({productReviews.length})
            </button>
          </div>

          {/* Specs Tab Content */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Tabel Spesifikasi Lengkap</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <tbody className="divide-y divide-slate-800">
                    {Object.entries(product.specs || {}).map(([key, value]) => (
                      <tr key={key} className="hover:bg-slate-950/40">
                        <td className="py-3 px-4 font-semibold text-slate-400 w-1/3 bg-slate-950/60">{key}</td>
                        <td className="py-3 px-4 font-medium text-slate-200">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Description Tab Content */}
          {activeTab === 'desc' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <h3 className="text-base font-bold text-white">Detail & Keunggulan Produk</h3>
              <p className="whitespace-pre-line">{product.description}</p>
            </div>
          )}

          {/* Reviews Tab Content */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Write Review Form */}
              <form onSubmit={handleReviewSubmit} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-electro-400" />
                  <span>Tulis Ulasan Pembeli</span>
                </h4>

                <div className="flex items-center space-x-3 text-xs">
                  <span className="text-slate-400 font-medium">Beri Rating:</span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        onClick={() => setNewRating(star)}
                        className={`w-5 h-5 cursor-pointer ${
                          star <= newRating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Bagikan pengalaman Anda menggunakan produk elektronik ini..."
                  rows={3}
                  className="w-full bg-slate-900 text-xs text-white placeholder-slate-500 rounded-xl p-3 border border-slate-700 focus:outline-none focus:border-electro-500"
                />

                <button
                  type="submit"
                  className="bg-electro-600 hover:bg-electro-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors"
                >
                  Kirim Ulasan Saya
                </button>
              </form>

              {/* Reviews List */}
              <div className="space-y-4">
                {productReviews.length > 0 ? (
                  productReviews.map((rev) => (
                    <div key={rev.id} className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img src={rev.userAvatar} alt={rev.userName} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <span className="text-xs font-bold text-white">{rev.userName}</span>
                            <p className="text-[10px] text-slate-500">{formatDateID(rev.date)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 text-amber-400 text-xs">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-bold">{rev.rating}.0</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic text-center py-6">
                    Belum ada ulasan untuk produk ini. Jadilah yang pertama memberikan ulasan!
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-4">
            <h2 className="text-xl font-extrabold text-white">Rekomendasi Produk Terkait</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
