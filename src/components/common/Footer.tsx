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
  Send,
  CreditCard,
  Building2,
  Clock
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Store Trust Value Badges Strip */}
      <div className="bg-slate-950 border-b border-slate-800 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start space-x-3.5 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Garansi Resmi</h4>
              <p className="text-xs text-slate-400 mt-0.5">Produk original langsung dari iBox, SEIN, ASUS, Sony Indonesia.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Pengiriman Ekstra Aman</h4>
              <p className="text-xs text-slate-400 mt-0.5">Gratis bubble wrap tebal + packing kayu & proteksi asuransi.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">7 Hari Jaminan Ganti Baru</h4>
              <p className="text-xs text-slate-400 mt-0.5">Tukar unit baru tanpa ribet bila ditemukan cacat pabrik.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Cicilan 0% s/d 24 Bulan</h4>
              <p className="text-xs text-slate-400 mt-0.5">Bekerjasama dengan seluruh bank utama & paylater resmi OJK.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/30">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="flex items-center">
              <span className="text-xl font-black tracking-tight text-white">
                Electro<span className="text-blue-400">Hub</span>
              </span>
              <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-blue-500/20 text-blue-300">
                Official
              </span>
            </div>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            ElectroHub Indonesia adalah jaringan retail e-commerce gadget & elektronik terdepan yang terpercaya sejak 2018. Menyediakan jajaran smartphone, ultrabook, monitor profesional, audio, dan periferal dengan sertifikasi garansi resmi distributor.
          </p>

          <div className="space-y-2 text-xs text-slate-300 pt-2">
            <div className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>Experience Center: Central Park Mall Lt. 2 No. 201, Jl. Letjen S. Parman, Jakarta Barat 11470</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>(021) 555-ELECTRO / WhatsApp: 0812-9988-7766</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Clock className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Operasional CS: Setiap Hari (08.00 - 22.00 WIB)</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span>layanan@electrohub.id</span>
            </div>
          </div>
        </div>

        {/* Belanja */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Kategori Belanja</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/products" className="text-slate-400 hover:text-white transition-colors">
                Semua Produk
              </Link>
            </li>
            <li>
              <Link to="/category/smartphone" className="text-slate-400 hover:text-white transition-colors">
                Smartphone Flagship
              </Link>
            </li>
            <li>
              <Link to="/category/laptop" className="text-slate-400 hover:text-white transition-colors">
                Laptop & Ultrabook
              </Link>
            </li>
            <li>
              <Link to="/category/pc-komputer" className="text-slate-400 hover:text-white transition-colors">
                PC Gaming & Komponen
              </Link>
            </li>
            <li>
              <Link to="/category/audio" className="text-slate-400 hover:text-white transition-colors">
                Audio & Headphone ANC
              </Link>
            </li>
            <li>
              <Link to="/promos" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                Voucher Diskon & Flash Sale
              </Link>
            </li>
          </ul>
        </div>

        {/* Bantuan & Layanan */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Layanan Pelanggan</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/track-order" className="text-slate-400 hover:text-white transition-colors">
                Lacak Status Resi
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                Pusat Bantuan & Tanya Jawab
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">
                Prosedur Klaim Garansi Resmi
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">
                Syarat & Ketentuan Retur 7 Hari
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                Tentang ElectroHub Store
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">
                Kebijakan Privasi
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & Partners */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Promo Eksklusif</h4>
          <p className="text-xs text-slate-400">
            Daftarkan email Anda untuk info diskon flash sale & voucher potongan harga Rp 50.000!
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="relative">
            <input
              type="email"
              placeholder="Masukkan email Anda..."
              className="w-full bg-slate-800 text-xs text-white placeholder-slate-500 rounded-xl pl-3 pr-10 py-2.5 border border-slate-700 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 text-white p-1.5 rounded-lg transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-2 space-y-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mitra Pembayaran Resmi</p>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-bold text-slate-300">
              <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">BCA</span>
              <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">Mandiri</span>
              <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">BRI</span>
              <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">QRIS</span>
              <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">GoPay</span>
              <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">Kredivo</span>
              <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">Visa / Mastercard</span>
            </div>
          </div>

          <div className="pt-1 space-y-1.5">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Kurir Pengiriman</p>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-bold text-slate-400">
              <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">JNE Express</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">SiCepat</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">J&T</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700">GoSend Instant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-slate-950 border-t border-slate-800/80 py-4 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} PT ElectroHub Retail Nusantara. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center space-x-3 text-[11px]">
            <Link to="/privacy" className="hover:text-slate-300">Syarat & Ketentuan</Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-slate-300">Kebijakan Retur</Link>
            <span>•</span>
            <Link to="/admin" className="text-amber-400 hover:text-amber-300 font-semibold">Portal Admin Demo</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
