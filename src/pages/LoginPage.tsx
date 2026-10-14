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
    <div className="bg-slate-950 text-slate-100 min-h-screen py-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-electro-600 to-cyan-400 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white">
              Electro<span className="text-electro-400">Hub</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-white">Masuk ke Akun Anda</h2>
          <p className="text-xs text-slate-400">Kelola pesanan, wishlist, dan profil belanja Anda</p>
        </div>

        {/* Demo Quick Role Selector Toggle */}
        <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 flex items-center text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setRole('customer');
              setEmail('rian@gmail.com');
            }}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              role === 'customer'
                ? 'bg-electro-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
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
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Mode Admin Store</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-400">Alamat Email *</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full bg-slate-950 text-white rounded-xl pl-10 pr-4 py-3 border border-slate-800 focus:outline-none focus:border-electro-500"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-400">Kata Sandi (Password) *</label>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] text-electro-400 hover:underline">
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
                className="w-full bg-slate-950 text-white rounded-xl pl-10 pr-4 py-3 border border-slate-800 focus:outline-none focus:border-electro-500"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-electro-600 to-electro-500 hover:from-electro-500 hover:to-electro-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-electro-600/30 flex items-center justify-center space-x-2 transition-all"
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk Sekarang</span>
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          Belum punya akun?{' '}
          <Link to="/register" className="font-bold text-electro-400 hover:underline">
            Daftar Akun Baru
          </Link>
        </div>
      </div>
    </div>
  );
};
