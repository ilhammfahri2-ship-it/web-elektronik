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
          <h2 className="text-xl font-bold text-white">Daftar Akun Baru</h2>
          <p className="text-xs text-slate-400">Nikmati kemudahan berbelanja produk elektronik resmi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-400">Nama Lengkap *</label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Budi Santoso"
                className="w-full bg-slate-950 text-white rounded-xl pl-10 pr-4 py-3 border border-slate-800 focus:outline-none focus:border-electro-500"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

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
            <label className="font-semibold text-slate-400">Nomor Telepon / WA *</label>
            <div className="relative">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="w-full bg-slate-950 text-white rounded-xl pl-10 pr-4 py-3 border border-slate-800 focus:outline-none focus:border-electro-500"
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-400">Kata Sandi *</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                className="w-full bg-slate-950 text-white rounded-xl pl-10 pr-4 py-3 border border-slate-800 focus:outline-none focus:border-electro-500"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-electro-600 to-electro-500 hover:from-electro-500 hover:to-electro-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-electro-600/30 flex items-center justify-center space-x-2 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Buat Akun ElectroHub</span>
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          Sudah memiliki akun?{' '}
          <Link to="/login" className="font-bold text-electro-400 hover:underline">
            Masuk Di Sini
          </Link>
        </div>
      </div>
    </div>
  );
};
