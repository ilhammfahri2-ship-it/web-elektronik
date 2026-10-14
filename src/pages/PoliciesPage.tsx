import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ShieldCheck, RotateCcw, Lock } from 'lucide-react';

export const PoliciesPage: React.FC = () => {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <Breadcrumbs items={[{ label: 'Kebijakan Toko & Privasi' }]} />

        <div className="bg-navy-900 border border-slate-800 p-8 rounded-3xl space-y-2 text-center">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Kebijakan Retur & Kebijakan Privasi</h1>
          <p className="text-xs text-slate-400">Jaminan transparansi dan keamanan belanja elektronik di ElectroHub</p>
        </div>

        {/* Return Policy Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl text-xs leading-relaxed text-slate-300">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <RotateCcw className="w-5 h-5 text-amber-400" />
            <span>Syarat & Ketentuan Pengembalian Produk (Retur 7 Hari)</span>
          </h2>

          <ul className="list-disc pl-5 space-y-2">
            <li>Pengajuan pengembalian produk cacat pabrik dapat dilakukan dalam jangka waktu maksimal 7 hari setelah pesanan diterima.</li>
            <li>Pembeli wajib melampirkan video unboxing utuh tanpa terputus sejak paket pertama kali dibuka dari segel kurir.</li>
            <li>Produk retur harus menyertakan kelengkapan dus asli, kabel charger, kartu garansi resmi, dan buku panduan lengkap dalam kondisi fisik utuh tanpa goresan benturan.</li>
            <li>Pengembalian barang tidak berlaku untuk kerusakan yang disebabkan oleh kesalahan penggunaan (jatuh, kena air, korsleting listrik rumah).</li>
          </ul>
        </div>

        {/* Privacy Policy Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl text-xs leading-relaxed text-slate-300">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Lock className="w-5 h-5 text-electro-400" />
            <span>Kebijakan Privasi Data Pengguna</span>
          </h2>

          <p>
            ElectroHub berkomitmen untuk melindungi data pribadi dan privasi seluruh pengguna. Informasi nama, alamat pengiriman, nomor telepon, dan email yang diisi pada saat transaksi hanya digunakan untuk kepentingan pengiriman pesanan dan verifikasi pembayaran.
          </p>

          <p>
            Kami menggunakan teknologi enkripsi SSL 256-bit dan tidak akan pernah menjual atau membagikan informasi pribadi Anda kepada pihak ketiga mana pun tanpa persetujuan tertulis dari pengguna.
          </p>
        </div>
      </div>
    </div>
  );
};
