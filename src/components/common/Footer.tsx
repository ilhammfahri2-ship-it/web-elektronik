import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Mail,
  MapPin,
  Phone,
  CreditCard,
  Send,
  Award
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-slate-800">
      {/* Store Trust Value Badges */}
      <div className="bg-navy-900 border-b border-slate-800/80 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-electro-500/10 text-electro-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Garansi Resmi</h4>
              <p className="text-xs text-slate-400">Jaminan produk baru & original distributor resmi.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Pengiriman Cepat & Aman</h4>
              <p className="text-xs text-slate-400">Proteksi asuransi & opsi instan GoSend same day.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">7 Hari Retur Mudah</h4>
              <p className="text-xs text-slate-400">Ganti unit baru bila cacat pabrik atau rusak saat transit.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Layanan CS 24/7</h4>
              <p className="text-xs text-slate-400">Tim teknis siap membantu konsultasi & klaim.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-electro-600 to-cyan-400 flex items-center justify-center shadow-md">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Electro<span className="text-electro-400">Hub</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            ElectroHub adalah destinasi e-commerce elektronik terpercaya di Indonesia. Kami menyediakan smartphone flagship, laptop high-performance, gadget audio, kamera profesional, dan aksesori terlengkap dengan garansi resmi.
          </p>

          <div className="space-y-2 text-xs text-slate-300 pt-2">
            <div className="flex items-center space-x-2.5">
              <MapPin className="w-4 h-4 text-electro-400 shrink-0" />
              <span>Gedung Electro Tower Lt. 12, Jl. Jend. Sudirman No. 45, Jakarta Selatan</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-electro-400 shrink-0" />
              <span>(021) 555-ELECTRO / 0800-123-3532</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-electro-400 shrink-0" />
              <span>support@electrohub.id</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Belanja</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/products" className="text-slate-400 hover:text-electro-400 transition-colors">
                Semua Produk Elektronik
              </Link>
            </li>
            <li>
              <Link to="/category/smartphone" className="text-slate-400 hover:text-electro-400 transition-colors">
                Smartphone & Tablet
              </Link>
            </li>
            <li>
              <Link to="/category/laptop" className="text-slate-400 hover:text-electro-400 transition-colors">
                Laptop & Notebook
              </Link>
            </li>
            <li>
              <Link to="/category/audio" className="text-slate-400 hover:text-electro-400 transition-colors">
                Audio & Headphone
              </Link>
            </li>
            <li>
              <Link to="/promos" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                Diskon & Flash Sale
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Bantuan & Kebijakan</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/track-order" className="text-slate-400 hover:text-electro-400 transition-colors">
                Lacak Status Pesanan
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-slate-400 hover:text-electro-400 transition-colors">
                Pusat Bantuan & FAQ
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-slate-400 hover:text-electro-400 transition-colors">
                Kebijakan Privasi
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-slate-400 hover:text-electro-400 transition-colors">
                Garansi & Pengembalian Produk
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-slate-400 hover:text-electro-400 transition-colors">
                Tentang ElectroHub
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & Payment info */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Berlangganan Newsletter</h4>
          <p className="text-xs text-slate-400">
            Dapatkan voucher potongan harga Rp 50.000 dan info promo elektronik eksklusif setiap minggu!
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="relative">
            <input
              type="email"
              placeholder="Masukkan email Anda..."
              className="w-full bg-slate-900 text-xs text-white placeholder-slate-500 rounded-xl pl-3 pr-10 py-2.5 border border-slate-700 focus:outline-none focus:border-electro-500"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-electro-600 hover:bg-electro-500 text-white p-1.5 rounded-lg transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-2 space-y-2">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Metode Pembayaran Aman</p>
            <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-300">
              <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">BCA VA</span>
              <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">Mandiri VA</span>
              <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">QRIS</span>
              <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">GoPay</span>
              <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">Visa / MC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-navy-950 border-t border-slate-800/80 py-4 px-4 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} ElectroHub Indonesia. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex space-x-4">
            <Link to="/privacy" className="hover:text-slate-400">Syarat & Ketentuan</Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-slate-400">Kebijakan Retur</Link>
            <span>•</span>
            <Link to="/admin" className="text-amber-400 hover:underline">Portal Admin Store</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
