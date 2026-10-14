import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Zap, User, Mail, Lock, Phone, UserPlus } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, 'customer');
    navigate('/');
  };

  return (
    <div className="bg-slate-50/70 text-slate-900 min-h-screen py-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-slate-200/90 rounded-3xl p-8 space-y-6 shadow-xs">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/20">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Electro<span className="text-blue-600">Hub</span>
            </span>
          </Link>
          <h2 className="text-xl font-black text-slate-900">Daftar Akun Baru</h2>
          <p className="text-xs text-slate-500">Nikmati kemudahan berbelanja produk elektronik bergaransi resmi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700">Nama Lengkap *</label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Budi Santoso"
                className="w-full bg-slate-50 text-slate-900 rounded-xl pl-10 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:border-blue-500"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700">Alamat Email *</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full bg-slate-50 text-slate-900 rounded-xl pl-10 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:border-blue-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700">Nomor Telepon / WhatsApp *</label>
            <div className="relative">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="w-full bg-slate-50 text-slate-900 rounded-xl pl-10 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:border-blue-500"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700">Kata Sandi *</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                className="w-full bg-slate-50 text-slate-900 rounded-xl pl-10 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:border-blue-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-blue-600/20 flex items-center justify-center space-x-2 transition-all text-xs"
          >
            <UserPlus className="w-4 h-4" />
            <span>Buat Akun ElectroHub</span>
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Sudah memiliki akun?{' '}
          <Link to="/login" className="font-bold text-blue-600 hover:underline">
            Masuk Di Sini
          </Link>
        </div>
      </div>
    </div>
  );
};
