import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  ShieldCheck,
  CheckCircle,
  X
} from 'lucide-react';
import { formatRupiah } from '../utils/formatters';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    toggleCartSelection,
    selectAllCart,
    appliedVoucher,
    applyVoucher,
    removeVoucher
  } = useApp();

  const [voucherCode, setVoucherCode] = useState('');

  const selectedItems = cart.filter((item) => item.selected);
  const allSelected = cart.length > 0 && selectedItems.length === cart.length;

  // Pricing calculations
  const subtotal = selectedItems.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'fixed') {
      discountAmount = appliedVoucher.discountValue;
    } else {
      discountAmount = (subtotal * appliedVoucher.discountValue) / 100;
      if (appliedVoucher.maxDiscount) {
        discountAmount = Math.min(discountAmount, appliedVoucher.maxDiscount);
      }
    }
  }

  const shippingCost = selectedItems.length > 0 ? (subtotal > 20000000 ? 0 : 35000) : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyVoucherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (voucherCode) {
      applyVoucher(voucherCode);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <Breadcrumbs items={[{ label: 'Keranjang Belanja' }]} />

        <div className="flex items-center space-x-3 bg-navy-900 p-6 rounded-3xl border border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-electro-600/20 text-electro-400 flex items-center justify-center">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Keranjang Belanja Anda</h1>
            <p className="text-xs text-slate-400">
              {cart.length} jenis barang elektronik ada di keranjang Anda
            </p>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center space-y-4 max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
              <ShoppingCart className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-white">Keranjang Belanja Anda Kosong</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Belum ada produk elektronik yang Anda tambahkan. Jelajahi katalog smartphone, laptop, dan aksesori kami!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-electro-600 hover:bg-electro-500 text-white font-bold text-xs px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-electro-600/30"
            >
              <span>Mulai Belanja Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Cart Items Table */}
            <div className="lg:col-span-8 space-y-4">
              {/* Select All Bar */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between text-xs font-semibold">
                <label className="flex items-center space-x-2.5 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => selectAllCart(e.target.checked)}
                    className="accent-electro-500 w-4 h-4 rounded"
                  />
                  <span>Pilih Semua Barang ({cart.length})</span>
                </label>

                <span className="text-slate-400">
                  Terpilih: <strong className="text-electro-400">{selectedItems.length} barang</strong>
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {cart.map((item) => {
                  const unitPrice = item.product.discountPrice || item.product.price;
                  return (
                    <div
                      key={item.productId}
                      className={`bg-slate-900 border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                        item.selected ? 'border-slate-800' : 'border-slate-800/50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5 flex-1 min-w-0">
                        <input
                          type="checkbox"
                          checked={item.selected}
                          onChange={() => toggleCartSelection(item.productId)}
                          className="accent-electro-500 w-4 h-4 rounded shrink-0"
                        />

                        <Link to={`/product/${item.product.id}`} className="shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-xl bg-slate-950 border border-slate-800"
                          />
                        </Link>

                        <div className="min-w-0 space-y-1">
                          <span className="text-[10px] font-bold text-electro-400 uppercase tracking-wider">
                            {item.product.brand}
                          </span>
                          <Link to={`/product/${item.product.id}`} className="block">
                            <h4 className="text-xs sm:text-sm font-semibold text-white truncate hover:text-electro-300">
                              {item.product.name}
                            </h4>
                          </Link>
                          {item.selectedVariant && (
                            <span className="inline-block text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                              Varian: {item.selectedVariant}
                            </span>
                          )}
                          <p className="text-xs font-bold text-white sm:hidden">
                            {formatRupiah(unitPrice)}
                          </p>
                        </div>
                      </div>

                      {/* Quantity Changer & Subtotal */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-800">
                        <div className="hidden sm:block text-right">
                          <p className="text-xs text-slate-400">Harga Satuan</p>
                          <p className="text-sm font-bold text-white">{formatRupiah(unitPrice)}</p>
                        </div>

                        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl">
                          <button
                            onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                            className="p-2 text-slate-400 hover:text-white"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                            className="p-2 text-slate-400 hover:text-white"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                          title="Hapus Barang"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Order Summary Box */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl sticky top-24">
                <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                  Ringkasan Belanja
                </h3>

                {/* Voucher Application Form */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-400" />
                    <span>Kode Voucher Promo</span>
                  </label>

                  {appliedVoucher ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="font-mono text-xs font-bold text-emerald-400">
                          {appliedVoucher.code}
                        </span>
                        <p className="text-[11px] text-slate-300">{appliedVoucher.description}</p>
                      </div>
                      <button
                        onClick={removeVoucher}
                        className="text-slate-400 hover:text-rose-400 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyVoucherSubmit} className="flex space-x-2">
                      <input
                        type="text"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        placeholder="Contoh: ELECTRO100"
                        className="flex-1 bg-slate-950 text-xs text-white uppercase placeholder-slate-500 rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-electro-500"
                      />
                      <button
                        type="submit"
                        className="bg-electro-600 hover:bg-electro-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-colors shrink-0"
                      >
                        Gunakan
                      </button>
                    </form>
                  )}
                </div>

                {/* Calculation Details */}
                <div className="space-y-3 text-xs border-t border-b border-slate-800 py-4">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Subtotal Barang ({selectedItems.length})</span>
                    <span className="font-semibold text-white">{formatRupiah(subtotal)}</span>
                  </div>

                  {appliedVoucher && (
                    <div className="flex items-center justify-between text-emerald-400">
                      <span>Diskon Voucher ({appliedVoucher.code})</span>
                      <span className="font-bold">-{formatRupiah(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-slate-300">
                    <span>Estimasi Ongkos Kirim</span>
                    {shippingCost === 0 ? (
                      <span className="text-emerald-400 font-bold">GRATIS</span>
                    ) : (
                      <span className="font-semibold text-white">{formatRupiah(shippingCost)}</span>
                    )}
                  </div>
                </div>

                {/* Total */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-base font-extrabold text-white">
                    <span>Total Pembayaran</span>
                    <span className="text-xl text-electro-400">{formatRupiah(grandTotal)}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Harga sudah termasuk PPN 11%</p>
                </div>

                {/* Checkout CTA Button */}
                <button
                  onClick={() => navigate('/checkout')}
                  disabled={selectedItems.length === 0}
                  className="w-full bg-gradient-to-r from-electro-600 to-electro-500 hover:from-electro-500 hover:to-electro-400 disabled:opacity-50 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-electro-600/30 flex items-center justify-center space-x-2 transition-all"
                >
                  <span>Lanjut Ke Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400 pt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Transaksi Terproteksi Garansi Resmi 100%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
