import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  CreditCard,
  Truck,
  ShieldCheck,
  MapPin,
  Lock,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { formatRupiah, getCourierLabel, getPaymentMethodLabel } from '../utils/formatters';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, user, appliedVoucher, createOrder, addToast } = useApp();

  const selectedItems = cart.filter((item) => item.selected);

  // Form states
  const [recipientName, setRecipientName] = useState(user?.name || '');
  const [recipientPhone, setRecipientPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState(user?.addresses[0]?.street || '');
  const [district, setDistrict] = useState(user?.addresses[0]?.district || 'Kebayoran Baru');
  const [city, setCity] = useState(user?.addresses[0]?.city || 'Jakarta Selatan');
  const [province, setProvince] = useState(user?.addresses[0]?.province || 'DKI Jakarta');
  const [postalCode, setPostalCode] = useState(user?.addresses[0]?.postalCode || '12190');
  const [notes, setNotes] = useState('');

  const [courier, setCourier] = useState<'JNE' | 'J&T' | 'SiCepat' | 'GoSend'>('JNE');
  const [paymentMethod, setPaymentMethod] = useState<'VA_BCA' | 'VA_MANDIRI' | 'QRIS' | 'GOPAY' | 'CC'>('VA_BCA');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (selectedItems.length === 0) {
    return (
      <div className="bg-slate-50/70 text-slate-900 min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-xl font-bold text-slate-900">Tidak ada barang yang dipilih untuk checkout</h2>
        <p className="text-xs text-slate-500 mt-2 mb-4">Silakan kembali ke keranjang dan centang barang yang ingin Anda beli.</p>
        <button
          onClick={() => navigate('/cart')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs"
        >
          Kembali ke Keranjang
        </button>
      </div>
    );
  }

  // Calculations
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

  const shippingCost = courier === 'GoSend' ? 45000 : courier === 'SiCepat' ? 30000 : 35000;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipientName.trim() || !recipientPhone.trim() || !street.trim()) {
      addToast('Mohon lengkapi seluruh data pengiriman!', 'error');
      return;
    }

    setIsSubmitting(true);

    const fullShippingAddress = `${street}, ${district}, ${city}, ${province} ${postalCode}`;

    const orderItems = selectedItems.map((item) => ({
      productId: item.productId,
      productName: item.product.name,
      productImage: item.product.image,
      price: item.product.discountPrice || item.product.price,
      quantity: item.quantity,
      variant: item.selectedVariant,
    }));

    setTimeout(() => {
      const createdOrder = createOrder({
        userId: user ? user.id : 'u-guest',
        userName: recipientName,
        userEmail: user ? user.email : 'customer@gmail.com',
        items: orderItems,
        recipientName,
        recipientPhone,
        shippingAddress: fullShippingAddress,
        courier,
        shippingCost,
        paymentMethod,
        paymentStatus: 'paid',
        subtotal,
        discount: discountAmount,
        total,
        status: 'processing',
        estimatedDelivery: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10),
        notes,
      });

      setIsSubmitting(false);
      navigate(`/order-success/${createdOrder.id}`);
    }, 1000);
  };

  return (
    <div className="bg-slate-50/70 text-slate-900 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 space-y-6 pt-4">
        <Breadcrumbs items={[{ label: 'Keranjang', path: '/cart' }, { label: 'Checkout Pembayaran' }]} />

        <div className="bg-white border border-slate-200/90 p-5 sm:p-6 rounded-2xl flex items-center justify-between shadow-xs">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Checkout Pembayaran</h1>
            <p className="text-xs text-slate-500 mt-0.5">Konfirmasi alamat penerima dan pilih metode pembayaran</p>
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/80">
            <Lock className="w-3.5 h-3.5" />
            <span>256-bit SSL Terenkripsi</span>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Delivery Form & Payment Choice */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Shipping Address */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>1. Alamat Pengiriman Penerima</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Nama Penerima *</label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Nama lengkap penerima"
                    className="w-full bg-slate-50 text-slate-900 rounded-xl p-2.5 border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Nomor HP / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="w-full bg-slate-50 text-slate-900 rounded-xl p-2.5 border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-semibold text-slate-700">Alamat Lengkap & Nomor Rumah *</label>
                  <textarea
                    required
                    rows={2}
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Contoh: Jl. Sudirman No. 12, RT 01/RW 04 (Dekat Ruko Niaga)"
                    className="w-full bg-slate-50 text-slate-900 rounded-xl p-2.5 border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Kecamatan</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 rounded-xl p-2.5 border border-slate-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Kota / Kabupaten</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 rounded-xl p-2.5 border border-slate-200"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Courier Selection */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>2. Opsi Kurir Pengiriman Resmi</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { id: 'JNE', name: 'JNE Express YES', est: '1-2 Hari Kerja (Termasuk Asuransi)', price: 35000 },
                  { id: 'J&T', name: 'J&T Express Super', est: '1-2 Hari Kerja', price: 35000 },
                  { id: 'SiCepat', name: 'SiCepat BEST', est: '2 Hari Kerja', price: 30000 },
                  { id: 'GoSend', name: 'GoSend Instant', est: 'Hari Ini Sampai (Maks 3 Jam)', price: 45000 },
                ].map((c) => (
                  <label
                    key={c.id}
                    className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                      courier === c.id
                        ? 'bg-blue-50/70 border-blue-600 text-slate-900 ring-1 ring-blue-600'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="courier"
                        checked={courier === c.id}
                        onChange={() => setCourier(c.id as any)}
                        className="accent-blue-600"
                      />
                      <div>
                        <p className="font-bold text-slate-900 text-xs">{c.name}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{c.est}</p>
                      </div>
                    </div>
                    <span className="font-extrabold text-slate-900">{formatRupiah(c.price)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3: Payment Method Selection */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span>3. Metode Pembayaran Aman</span>
              </h3>

              <div className="space-y-2.5 text-xs">
                {[
                  { id: 'VA_BCA', label: 'BCA Virtual Account', desc: 'Verifikasi instan otomatis dari m-BCA / KlikBCA / ATM BCA' },
                  { id: 'VA_MANDIRI', label: 'Mandiri Virtual Account (Livin)', desc: 'Pembayaran instan langsung dari aplikasi Livin by Mandiri' },
                  { id: 'QRIS', label: 'QRIS Instant (GoPay, OVO, ShopeePay, Dana)', desc: 'Scan kode QRIS dari semua aplikasi e-wallet nasional' },
                  { id: 'GOPAY', label: 'GoPay Direct Seamless Pay', desc: 'Langsung terhubung dengan akun GoPay Anda' },
                  { id: 'CC', label: 'Kartu Kredit / Debit (Visa, Mastercard, JCB)', desc: 'Cicilan 0% 3/6/12 bulan dengan proteksi 3D-Secure' },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === m.id
                        ? 'bg-blue-50/70 border-blue-600 text-slate-900 ring-1 ring-blue-600'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === m.id}
                        onChange={() => setPaymentMethod(m.id as any)}
                        className="accent-blue-600"
                      />
                      <div>
                        <p className="font-bold text-slate-900 text-xs">{m.label}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{m.desc}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs sticky top-24">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
                Ringkasan Transaksi
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {selectedItems.map((item) => (
                  <div key={item.productId} className="flex items-center space-x-3 text-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-11 h-11 object-cover rounded-lg bg-slate-50 border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-800 truncate">{item.product.name}</h4>
                      <p className="text-slate-400 text-[11px]">{item.quantity}x • {formatRupiah(item.product.discountPrice || item.product.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="space-y-2 text-xs border-t border-b border-slate-100 py-3.5">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal Produk</span>
                  <span className="font-bold text-slate-900">{formatRupiah(subtotal)}</span>
                </div>
                {appliedVoucher && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Diskon Voucher</span>
                    <span>-{formatRupiah(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Ongkir ({courier})</span>
                  <span className="font-bold text-slate-900">{formatRupiah(shippingCost)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="space-y-1">
                <div className="flex justify-between text-base font-black text-slate-900">
                  <span>Total Bayar</span>
                  <span className="text-lg text-blue-600">{formatRupiah(total)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-md shadow-blue-600/20 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Memverifikasi Transaksi...</span>
                ) : (
                  <>
                    <span>Bayar Pesanan ({formatRupiah(total)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-slate-400 text-center space-y-1 pt-1">
                <p>Transaksi Anda dilindungi garansi resmi & enkripsi keamanan terstandarisasi Bank Indonesia.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
