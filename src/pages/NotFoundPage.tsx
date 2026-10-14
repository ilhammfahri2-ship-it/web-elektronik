import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Home, Search, AlertTriangle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-3xl bg-electro-600/20 text-electro-400 flex items-center justify-center mx-auto ring-8 ring-electro-500/10">
            <Zap className="w-12 h-12" />
          </div>
          <span className="absolute -top-2 -right-2 bg-rose-600 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-lg">
            404
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-white">Sinyal Halaman Tidak Ditemukan</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Maaf, alamat URL halaman elektronik yang Anda tuju mungkin sudah dipindahkan atau tidak tersedia di server ElectroHub.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto bg-electro-600 hover:bg-electro-500 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-lg"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda Utama</span>
          </Link>
          <Link
            to="/products"
            className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-6 py-3 rounded-xl border border-slate-700 flex items-center justify-center space-x-2 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Cari Produk Lain</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
