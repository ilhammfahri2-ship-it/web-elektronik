import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Percent, Copy, Check, Sparkles, Clock } from 'lucide-react';
import { formatRupiah } from '../utils/formatters';

export const PromosPage: React.FC = () => {
  const { vouchers, addToast } = useApp();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    addToast(`Kode voucher ${code} berhasil disalin!`, 'success');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        <Breadcrumbs items={[{ label: 'Promo & Diskon' }]} />

        <div className="bg-gradient-to-r from-amber-500/20 via-navy-900 to-electro-900 border border-amber-500/30 p-8 rounded-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Voucher Hemat Resmi ElectroHub</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Promo & Diskon Eksklusif</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Gunakan kode voucher di bawah ini saat checkout untuk mendapatkan potongan harga langsung dan diskon belanja!
          </p>
        </div>

        {/* Vouchers List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vouchers.map((v) => (
            <div
              key={v.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl relative overflow-hidden"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-electro-600/20 text-electro-400 font-extrabold text-xs px-3 py-1 rounded-full">
                    {v.discountType === 'fixed'
                      ? `Potongan ${formatRupiah(v.discountValue)}`
                      : `Diskon ${v.discountValue}%`}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>s.d {v.validUntil}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{v.description}</h3>
                <p className="text-xs text-slate-400">
                  Minimal transaksi: <strong className="text-slate-200">{formatRupiah(v.minPurchase)}</strong>
                </p>
              </div>

              {/* Copy Code Bar */}
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                <span className="font-mono text-base font-extrabold text-amber-400">{v.code}</span>
                <button
                  onClick={() => handleCopy(v.code)}
                  className="bg-electro-600 hover:bg-electro-500 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center space-x-1.5 transition-colors"
                >
                  {copiedCode === v.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Kode</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
