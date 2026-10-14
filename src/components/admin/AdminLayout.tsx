import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tag,
  Store,
  LogOut,
  Zap,
  Menu,
  X,
  User as UserIcon,
  ShieldCheck,
  Bell
} from 'lucide-react';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useApp();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { label: 'Overview Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Kelola Produk', path: '/admin/products', icon: Package },
    { label: 'Kelola Pesanan', path: '/admin/orders', icon: ShoppingCart },
    { label: 'Kelola Voucher Promo', path: '/admin/vouchers', icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased selection:bg-electro-500 selection:text-white">
      {/* Standalone Admin Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy-950 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 space-y-6">
          {/* Admin Portal Header Logo */}
          <div className="flex items-center justify-between">
            <Link to="/admin" className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-electro-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Zap className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <span className="text-lg font-extrabold tracking-tight text-white">
                  Admin<span className="text-amber-400">Portal</span>
                </span>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  ElectroHub Store
                </p>
              </div>
            </Link>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-semibold pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all ${
                    isActive
                      ? 'bg-electro-600 text-white font-bold shadow-lg shadow-electro-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2 text-xs">
          <Link
            to="/"
            className="flex items-center space-x-2.5 px-4 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition-colors font-medium"
          >
            <Store className="w-4 h-4 text-electro-400" />
            <span>Ke Store Customer</span>
          </Link>

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center space-x-2.5 px-4 py-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors font-medium text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Container */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Dedicated Admin Top Navbar */}
        <header className="sticky top-0 z-40 bg-navy-900/90 backdrop-blur-md border-b border-slate-800/90 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-800"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
              Portal Admin Elektro
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-white">{user?.name || 'Administrator'}</span>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded">
                Admin
              </span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
