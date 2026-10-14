import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tag, Plus, Check, X } from 'lucide-react';
import { formatRupiah } from '../../utils/formatters';

export const AdminVouchers: React.FC = () => {
  const { vouchers, addVoucher, toggleVoucherStatus } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState<'fixed' | 'percentage'>('fixed');
  const [discountValue, setDiscountValue] = useState<number>(50000);
  const [minPurchase, setMinPurchase] = useState<number>(500000);
  const [validUntil, setValidUntil] = useState('2026-12-31');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVoucher({
      code: code.trim().toUpperCase(),
      description,
      discountType,
      discountValue: Number(discountValue),
      minPurchase: Number(minPurchase),
      validUntil,
      isActive: true,
    });
    setIsModalOpen(false);
    setCode('');
    setDescription('');
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      <div className="max-w-6xl mx-auto px-4 space-y-6 pt-6">
        <div className="bg-navy-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Manajemen Voucher Promo</h1>
            <p className="text-xs text-slate-400">Buat kupon diskon baru dan aktifkan/nonaktifkan voucher toko</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-electro-600 hover:bg-electro-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Voucher Baru</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vouchers.map((v) => (
            <div key={v.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 text-xs shadow-xl">
              <div className="flex items-center justify-between">
                <span className="font-mono font-extrabold text-amber-400 text-base">{v.code}</span>
                <button
                  onClick={() => toggleVoucherStatus(v.id)}
                  className={`px-3 py-1 rounded-full font-bold border transition-colors ${
                    v.isActive ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}
                >
                  {v.isActive ? 'Status: Aktif' : 'Non-Aktif'}
                </button>
              </div>

              <p className="text-slate-200 font-semibold">{v.description}</p>
              <p className="text-slate-400">Minimal belanja: {formatRupiah(v.minPurchase)}</p>
              <p className="text-slate-500">Berlaku sampai: {v.validUntil}</p>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl text-xs">
            <h3 className="text-base font-bold text-white">Tambah Voucher Diskon Baru</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-slate-400 font-semibold">Kode Voucher *</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Contoh: HEMAT100"
                  className="w-full bg-slate-950 text-white uppercase rounded-xl p-2.5 border border-slate-800"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold">Deskripsi *</label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Diskon Rp 100rb minimal belanja..."
                  className="w-full bg-slate-950 text-white rounded-xl p-2.5 border border-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-semibold">Tipe Diskon</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full bg-slate-950 text-white rounded-xl p-2.5 border border-slate-800"
                  >
                    <option value="fixed">Nominal Tetap (Rp)</option>
                    <option value="percentage">Persentase (%)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 font-semibold">Nilai Diskon</label>
                  <input
                    type="number"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full bg-slate-950 text-white rounded-xl p-2.5 border border-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-slate-800 text-slate-300 font-semibold px-4 py-2 rounded-xl"
                >
                  Batal
                </button>
                <button type="submit" className="bg-electro-600 text-white font-bold px-5 py-2 rounded-xl">
                  Simpan Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
