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
  CheckCircle2,
  X,
  CreditCard
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
    <div className="bg-slate-50/70 text-slate-900 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 space-y-6 pt-4">
        <Breadcrumbs items={[{ label: 'Keranjang Belanja' }]} />

        <div className="flex items-center space-x-3.5 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Keranjang Belanja</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {cart.length} produk dalam keranjang belanja Anda
            </p>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white border border-slate-200/90 rounded-3xl p-16 text-center space-y-4 max-w-xl mx-auto shadow-xs">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <ShoppingCart className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-black text-slate-900">Keranjang Belanja Masih Kosong</h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Belum ada produk gadget atau elektronik yang ditambahkan. Temukan smartphone, laptop, dan audio impian Anda!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-xs"
            >
              <span>Mulai Belanja Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Cart Items Table */}
            <div className="lg:col-span-8 space-y-4">
              {/* Select All Bar */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center justify-between text-xs font-semibold shadow-xs">
                <label className="flex items-center space-x-2.5 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => selectAllCart(e.target.checked)}
                    className="accent-blue-600 w-4 h-4 rounded"
                  />
                  <span>Pilih Semua Barang ({cart.length})</span>
                </label>

                <span className="text-slate-500">
                  Terpilih: <strong className="text-blue-600">{selectedItems.length} produk</strong>
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {cart.map((item) => {
                  const unitPrice = item.product.discountPrice || item.product.price;
                  return (
                    <div
                      key={item.productId}
                      className={`bg-white border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all shadow-xs ${
                        item.selected ? 'border-slate-200/90' : 'border-slate-200/50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5 flex-1 min-w-0">
                        <input
                          type="checkbox"
                          checked={item.selected}
                          onChange={() => toggleCartSelection(item.productId)}
                          className="accent-blue-600 w-4 h-4 rounded shrink-0"
                        />

                        <Link to={`/product/${item.product.id}`} className="shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-xl bg-slate-50 border border-slate-200"
                          />
                        </Link>

                        <div className="min-w-0 space-y-1">
                          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                            {item.product.brand}
                          </span>
                          <Link to={`/product/${item.product.id}`} className="block">
                            <h4 className="text-xs sm:text-sm font-semibold text-slate-900 truncate hover:text-blue-600">
                              {item.product.name}
                            </h4>
                          </Link>
                          {item.selectedVariant && (
                            <span className="inline-block text-[11px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded">
                              Varian: {item.selectedVariant}
                            </span>
                          )}
                          <p className="text-xs font-bold text-slate-900 sm:hidden">
                            {formatRupiah(unitPrice)}
                          </p>
                        </div>
                      </div>

                      {/* Quantity Changer & Subtotal */}
                      <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                        <div className="hidden sm:block text-right">
                          <p className="text-[11px] text-slate-400">Harga Satuan</p>
                          <p className="text-xs sm:text-sm font-bold text-slate-900">{formatRupiah(unitPrice)}</p>
                        </div>

                        <div className="flex items-center bg-white border border-slate-200 rounded-xl shadow-xs">
                          <button
                            onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                            className="p-2 text-slate-500 hover:text-slate-800"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                            className="p-2 text-slate-500 hover:text-slate-800"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
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
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs sticky top-24">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
                  Ringkasan Belanja
                </h3>

                {/* Voucher Application Form */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-500" />
                    <span>Kupon / Voucher Promo</span>
                  </label>

                  {appliedVoucher ? (
                    <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="font-mono text-xs font-bold text-emerald-800">
                          {appliedVoucher.code}
                        </span>
                        <p className="text-[11px] text-emerald-700">{appliedVoucher.description}</p>
                      </div>
                      <button
                        onClick={removeVoucher}
                        className="text-slate-400 hover:text-rose-600 p-1"
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
                        placeholder="Kode: ELECTRO100"
                        className="flex-1 bg-slate-50 text-xs text-slate-900 uppercase placeholder-slate-400 rounded-xl px-3 py-2 border border-slate-200 focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shrink-0 shadow-xs"
                      >
                        Pakai
                      </button>
                    </form>
                  )}
                </div>

                {/* Calculation Details */}
                <div className="space-y-2.5 text-xs border-t border-b border-slate-100 py-3.5">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Subtotal ({selectedItems.length} barang)</span>
                    <span className="font-bold text-slate-900">{formatRupiah(subtotal)}</span>
                  </div>

                  {appliedVoucher && (
                    <div className="flex items-center justify-between text-emerald-700 font-semibold">
                      <span>Potongan Kupon ({appliedVoucher.code})</span>
                      <span>-{formatRupiah(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-slate-600">
                    <span>Ongkos Kirim JNE</span>
                    {shippingCost === 0 ? (
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">GRATIS</span>
                    ) : (
                      <span className="font-semibold text-slate-900">{formatRupiah(shippingCost)}</span>
                    )}
                  </div>
                </div>

                {/* Total */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-base font-black text-slate-900">
                    <span>Total Tagihan</span>
                    <span className="text-lg text-blue-600">{formatRupiah(grandTotal)}</span>
                  </div>
                  <p className="text-[10px] text-slate-400">Termasuk PPN 11% & proteksi pengiriman resmi</p>
                </div>

                {/* Checkout CTA Button */}
                <button
                  onClick={() => navigate('/checkout')}
                  disabled={selectedItems.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-md shadow-blue-600/20 flex items-center justify-center space-x-2 transition-all"
                >
                  <span>Lanjut Ke Pembayaran</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Garansi Resmi 100% Produk Tersegel</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
