import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Zap, Mail, Lock, LogIn, ShieldCheck, UserCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useApp();

  const [email, setEmail] = useState('rian@gmail.com');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState<'customer' | 'admin'>('customer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
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
          <h2 className="text-xl font-black text-slate-900">Masuk ke Akun Anda</h2>
          <p className="text-xs text-slate-500">Kelola pesanan, wishlist, dan profil belanja Anda</p>
        </div>

        {/* Demo Quick Role Selector Toggle */}
        <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex items-center text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setRole('customer');
              setEmail('rian@gmail.com');
            }}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              role === 'customer'
                ? 'bg-blue-600 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Mode Pelanggan</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setRole('admin');
              setEmail('admin@electrohub.id');
            }}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              role === 'admin'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Mode Admin Store</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-700">Kata Sandi (Password) *</label>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] text-blue-600 hover:underline">
                Lupa Kata Sandi?
              </a>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 text-slate-900 rounded-xl pl-10 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:border-blue-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-blue-600/20 flex items-center justify-center space-x-2 transition-all text-xs"
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk Sekarang</span>
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Belum punya akun?{' '}
          <Link to="/register" className="font-bold text-blue-600 hover:underline">
            Daftar Akun Baru
          </Link>
        </div>
      </div>
    </div>
  );
};
