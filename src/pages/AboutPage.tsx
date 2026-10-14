import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Zap, ShieldCheck, Award, Users, MapPin, Truck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        <Breadcrumbs items={[{ label: 'Tentang Toko ElectroHub' }]} />

        {/* Hero Section */}
        <div className="bg-navy-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-electro-600 to-cyan-400 flex items-center justify-center mx-auto">
            <Zap className="w-8 h-8 text-white fill-white" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">Tentang ElectroHub Store</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            ElectroHub adalah pusat e-commerce jual beli produk elektronik resmi dan profesional pertama di Indonesia yang mengutamakan kualitas original 100%, garansi resmi distributor, dan garansi keamanan pengiriman.
          </p>
        </div>

        {/* Vision Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-md">
            <ShieldCheck className="w-8 h-8 text-electro-400" />
            <h3 className="text-base font-bold text-white">100% Produk Asli & Original</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Seluruh smartphone, laptop, kamera, dan audio yang dijual diimpor dan didistribusikan melalui jalur resmi distributor Indonesia (iBox, SEIN, ASUS ID, Sony ID).
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-md">
            <Truck className="w-8 h-8 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Logistik Ekstra Proteksi</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Setiap pengiriman dibungkus dengan kardus tebal khusus elektronik, bubble wrap 5 lapis, dan asuransi pengiriman penuh.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-md">
            <Award className="w-8 h-8 text-amber-400" />
            <h3 className="text-base font-bold text-white">Layanan Purna Jual Terbaik</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tim spesialis teknisi ElectroHub siap membantu konsultasi spesifikasi, kendala penggunaan, hingga proses klaim garansi resmi.
            </p>
          </div>
        </div>

        {/* Physical Store Location */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-electro-400" />
              <span>Kunjungi Experience Store Kami</span>
            </h3>
            <p className="text-xs text-slate-400 max-w-md">
              Gedung Electro Tower Lt. 12, Jl. Jend. Sudirman No. 45, Kebayoran Baru, Jakarta Selatan. Buka setiap hari 09.00 - 21.00 WIB.
            </p>
          </div>

          <div className="bg-slate-950 px-6 py-4 rounded-2xl border border-slate-800 text-center shrink-0">
            <p className="text-xs text-slate-400">Hubungi Hotline</p>
            <p className="text-lg font-extrabold text-electro-400">0800-123-ELECTRO</p>
          </div>
        </div>
      </div>
    </div>
  );
};
