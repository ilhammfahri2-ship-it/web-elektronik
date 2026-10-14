import React, { useState } from 'react';
import { MessageCircle, X, Send, PhoneCall } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const phone = '6281234567890'; // Demo WhatsApp CS ElectroHub number

  const handleSendWA = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedText = encodeURIComponent(
      message.trim() || 'Halo Customer Service ElectroHub, saya ingin bertanya tentang produk elektronik & garansi.'
    );
    window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Floating Chat Bubble Window */}
      {isOpen && (
        <div className="mb-4 bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl w-80 p-5 space-y-4 text-xs animate-fade-in text-slate-100">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold ring-2 ring-emerald-500/40">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white">CS ElectroHub Online</h4>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Siap Membantu 24/7</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80 text-slate-300 space-y-1">
            <p className="font-semibold text-white">Halo Kak! 👋</p>
            <p className="text-[11px] leading-relaxed">
              Ada yang bisa kami bantu mengenai klaim garansi resmi, konsultasi spesifikasi laptop/HP, atau status pengiriman?
            </p>
          </div>

          <form onSubmit={handleSendWA} className="space-y-2">
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis pesan Anda untuk CS WhatsApp..."
              className="w-full bg-slate-950 text-white rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-emerald-950/40"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Chat Ke WhatsApp</span>
            </button>
          </form>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-4 py-3 rounded-full shadow-2xl shadow-emerald-600/40 transition-all transform hover:scale-105"
        title="Live Chat WhatsApp Support"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="text-xs font-extrabold hidden sm:inline">Chat CS WA</span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full ring-4 ring-slate-950"></span>
      </button>
    </div>
  );
};
