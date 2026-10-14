import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { User as UserIcon, Mail, Phone, MapPin, Plus, Save, Building } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, addAddress } = useApp();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');

  // Add Address Modal state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [label, setLabel] = useState('Rumah');
  const [recipient, setRecipient] = useState(user?.name || '');
  const [addressPhone, setAddressPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');

  if (!user) {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-[70vh] flex items-center justify-center p-4">
        <p className="text-sm text-slate-400">Silakan login untuk mengakses profil Anda.</p>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone });
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({
      id: 'addr-' + Date.now(),
      label,
      recipient,
      phone: addressPhone,
      street,
      district,
      city,
      province,
      postalCode,
      isDefault: user.addresses.length === 0,
    });
    setShowAddressModal(false);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        <Breadcrumbs items={[{ label: 'Profil Saya' }]} />

        {/* Profile Card Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 shadow-xl">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-electro-500/40"
          />
          <div className="text-center sm:text-left space-y-1">
            <h1 className="text-2xl font-extrabold text-white">{user.name}</h1>
            <p className="text-xs text-slate-400">{user.email}</p>
            <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-bold ${
              user.role === 'admin' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-electro-500/20 text-electro-300 border border-electro-500/30'
            }`}>
              {user.role === 'admin' ? 'Pengelola Store (Admin)' : 'Pelanggan Terverifikasi'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Edit Personal Data */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl text-xs">
              <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
                <UserIcon className="w-5 h-5 text-electro-400" />
                <span>Informasi Akun</span>
              </h3>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-400">Nama Lengkap</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 text-white rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-electro-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-400">Alamat Email (Tetap)</label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full bg-slate-950 text-slate-500 rounded-xl p-3 border border-slate-800 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-400">Nomor Telepon</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 text-white rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-electro-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-electro-600 hover:bg-electro-500 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right: Address List */}
          <div className="md:col-span-7 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-electro-400" />
                  <span>Daftar Alamat Pengiriman</span>
                </h3>

                <button
                  onClick={() => setShowAddressModal(true)}
                  className="bg-electro-600 hover:bg-electro-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded-xl flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Alamat</span>
                </button>
              </div>

              {/* Addresses Grid */}
              <div className="space-y-3">
                {user.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-4 rounded-2xl border ${
                      addr.isDefault
                        ? 'bg-electro-600/10 border-electro-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white">{addr.label}</span>
                      {addr.isDefault && (
                        <span className="bg-electro-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          Utama
                        </span>
                      )}
                    </div>
                    <p className="font-medium text-slate-200">{addr.recipient} ({addr.phone})</p>
                    <p className="text-slate-400 mt-1 leading-relaxed">
                      {addr.street}, {addr.district}, {addr.city}, {addr.province} {addr.postalCode}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl text-xs">
            <h3 className="text-base font-bold text-white">Tambah Alamat Pengiriman Baru</h3>

            <form onSubmit={handleSaveAddress} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-semibold">Label (e.g. Rumah / Kantor)</label>
                  <input
                    type="text"
                    required
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="w-full bg-slate-950 text-white rounded-xl p-2.5 border border-slate-800"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold">Nama Penerima</label>
                  <input
                    type="text"
                    required
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full bg-slate-950 text-white rounded-xl p-2.5 border border-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold">Alamat Lengkap</label>
                <textarea
                  required
                  rows={2}
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Jalan, No. Rumah, RT/RW"
                  className="w-full bg-slate-950 text-white rounded-xl p-2.5 border border-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-semibold">Kecamatan</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-950 text-white rounded-xl p-2.5 border border-slate-800"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold">Kota / Kabupaten</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-950 text-white rounded-xl p-2.5 border border-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="bg-slate-800 text-slate-300 font-semibold px-4 py-2 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-electro-600 text-white font-bold px-5 py-2 rounded-xl"
                >
                  Simpan Alamat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
