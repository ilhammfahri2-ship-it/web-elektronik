import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Pesan Anda berhasil dikirim! Customer Service kami akan menghubungi Anda.', 'success');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const faqs = [
    {
      q: 'Apakah semua produk elektronik di ElectroHub bergaransi resmi?',
      a: 'Ya, 100% produk di ElectroHub dipasok oleh distributor resmi Indonesia seperti iBox, Digimap, SEIN, ASUS Indonesia, dan Sony Indonesia dengan kartu garansi lengkap.',
    },
    {
      q: 'Bagaimana prosedur jika barang elektronik yang diterima cacat pabrik?',
      a: 'Kami menyediakan jaminan Retur 7 Hari. Hubungi tim CS kami dengan menyertakan foto & video unboxing, dan kami akan menukar unit baru secara gratis.',
    },
    {
      q: 'Metode pembayaran apa saja yang didukung?',
      a: 'Kami menerima pembayaran Virtual Account (BCA, Mandiri), QRIS (GoPay, OVO, ShopeePay), GoPay Instant, serta Kartu Kredit/Debit Visa & Mastercard.',
    },
    {
      q: 'Berapa lama estimasi pengiriman paket?',
      a: 'Pengiriman YES/Super 1-2 hari kerja. Untuk wilayah Jabodetabek juga tersedia opsi pengiriman sameday/instant GoSend sampai hari yang sama.',
    },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <Breadcrumbs items={[{ label: 'Kontak & Bantuan' }]} />

        <div className="bg-navy-900 border border-slate-800 p-8 rounded-3xl text-center space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Hubungi Tim Bantuan ElectroHub</h1>
          <p className="text-xs sm:text-sm text-slate-400">Kami siap membantu pertanyaan seputar produk, pemesanan, dan klaim garansi.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl text-xs">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <MessageSquare className="w-5 h-5 text-electro-400" />
              <span>Kirim Pesan Ke Customer Support</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-400">Nama Anda *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama lengkap"
                    className="w-full bg-slate-950 text-white rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-electro-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-400">Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full bg-slate-950 text-white rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-electro-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-400">Subjek Pertanyaan</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Kendala pesanan / Pertanyaan garansi..."
                  className="w-full bg-slate-950 text-white rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-electro-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-400">Pesan Detail *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan detail pertanyaan Anda di sini..."
                  className="w-full bg-slate-950 text-white rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-electro-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-electro-600 hover:bg-electro-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-electro-600/30 flex items-center justify-center space-x-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pesan</span>
              </button>
            </form>
          </div>

          {/* Right: Direct Contacts & FAQ Accordion */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl text-xs">
              <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Kontak Langsung</h3>
              <div className="space-y-3 text-slate-300">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-electro-400 shrink-0" />
                  <div>
                    <p className="font-bold text-white">Hotline Bebas Pulsa</p>
                    <p className="text-slate-400">0800-123-ELECTRO (0800-123-3532)</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-electro-400 shrink-0" />
                  <div>
                    <p className="font-bold text-white">Email Dukungan Pelanggan</p>
                    <p className="text-slate-400">support@electrohub.id</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-electro-400 shrink-0" />
                  <div>
                    <p className="font-bold text-white">Alamat Kantor Pusat</p>
                    <p className="text-slate-400">Gedung Electro Tower Lt. 12, Jl. Jend. Sudirman No. 45, Jakarta Selatan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl text-xs">
              <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <span>Pertanyaan Sering Diajukan (FAQ)</span>
              </h3>

              <div className="space-y-2">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-3.5 text-left font-bold text-slate-200 flex items-center justify-between hover:text-white"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === idx && (
                      <div className="px-3.5 pb-3.5 text-slate-400 leading-relaxed border-t border-slate-800/60 pt-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
