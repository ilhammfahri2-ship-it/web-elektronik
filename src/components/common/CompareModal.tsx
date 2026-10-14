import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, SlidersHorizontal, ShoppingCart, Trash2, CheckCircle } from 'lucide-react';
import { formatRupiah } from '../../utils/formatters';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ isOpen, onClose }) => {
  const { compareList, removeFromCompare, clearCompare, addToCart } = useApp();

  if (!isOpen) return null;

  // Collect all unique spec keys across all products in comparison
  const allSpecKeys = Array.from(
    new Set(
      compareList.flatMap((prod) => Object.keys(prod.specs || {}))
    )
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden text-slate-200">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-electro-600/20 text-electro-400 flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Komparasi Spesifikasi Produk</h3>
              <p className="text-xs text-slate-400">
                Membandingkan {compareList.length} dari maksimal 4 produk pilihan Anda.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {compareList.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Kosongkan</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {compareList.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <SlidersHorizontal className="w-12 h-12 text-slate-600 mx-auto" />
              <h4 className="text-base font-semibold text-slate-300">Belum ada produk yang dibandingkan</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Klik ikon perbandingan (<SlidersHorizontal className="w-3 h-3 inline" />) pada kartu produk untuk melihat matriks perbandingan spesifikasi secara detail.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="p-3 bg-slate-950/60 w-48 font-bold text-slate-400 uppercase tracking-wider">
                      Fitur / Produk
                    </th>
                    {compareList.map((product) => (
                      <th key={product.id} className="p-3 bg-slate-900 border-l border-slate-800 min-w-[200px] vertical-top">
                        <div className="relative space-y-2">
                          <button
                            onClick={() => removeFromCompare(product.id)}
                            className="absolute -top-1 -right-1 text-slate-500 hover:text-rose-400 p-1"
                            title="Hapus"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-24 h-24 object-cover rounded-xl bg-slate-950 mx-auto"
                          />
                          <h4 className="font-bold text-white text-xs text-center line-clamp-2">{product.name}</h4>
                          <p className="text-center text-electro-400 font-extrabold text-sm">
                            {formatRupiah(product.discountPrice || product.price)}
                          </p>
                          <button
                            onClick={() => addToCart(product, 1)}
                            className="w-full bg-electro-600 hover:bg-electro-500 text-white font-semibold py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Beli Sekarang</span>
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  <tr>
                    <td className="p-3 bg-slate-950/40 font-semibold text-slate-400">Merek</td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-3 border-l border-slate-800 text-slate-200 font-medium">
                        {p.brand}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 bg-slate-950/40 font-semibold text-slate-400">Kategori</td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-3 border-l border-slate-800 text-slate-200">
                        {p.categoryName}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 bg-slate-950/40 font-semibold text-slate-400">Rating Customer</td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-3 border-l border-slate-800 text-amber-400 font-bold">
                        ★ {p.rating} / 5 ({p.reviewCount} ulasan)
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 bg-slate-950/40 font-semibold text-slate-400">Garansi</td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-3 border-l border-slate-800 text-emerald-400 text-[11px]">
                        <CheckCircle className="w-3.5 h-3.5 inline mr-1 text-emerald-400" />
                        {p.warranty}
                      </td>
                    ))}
                  </tr>

                  {/* Render matrix for specs keys */}
                  {allSpecKeys.map((key) => (
                    <tr key={key} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 bg-slate-950/40 font-semibold text-slate-400">{key}</td>
                      {compareList.map((p) => (
                        <td key={p.id} className="p-3 border-l border-slate-800 text-slate-300">
                          {p.specs?.[key] || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
