import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Product, CategoryType } from '../../types';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import { formatRupiah } from '../../utils/formatters';

export const AdminProducts: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useApp();

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Apple');
  const [category, setCategory] = useState<CategoryType>('smartphone');
  const [price, setPrice] = useState<number>(1000000);
  const [discountPrice, setDiscountPrice] = useState<number | undefined>(undefined);
  const [stock, setStock] = useState<number>(10);
  const [image, setImage] = useState('https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80');
  const [description, setDescription] = useState('');
  const [warranty, setWarranty] = useState('1 Tahun Garansi Resmi Indonesia');
  const [sku, setSku] = useState('EH-SKU-001');

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setBrand('Apple');
    setCategory('smartphone');
    setPrice(5000000);
    setDiscountPrice(undefined);
    setStock(10);
    setImage('https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80');
    setDescription('Deskripsi produk elektronik baru...');
    setWarranty('1 Tahun Garansi Resmi Indonesia');
    setSku('EH-SKU-' + Math.floor(1000 + Math.random() * 9000));
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setBrand(p.brand);
    setCategory(p.category);
    setPrice(p.price);
    setDiscountPrice(p.discountPrice);
    setStock(p.stock);
    setImage(p.image);
    setDescription(p.description);
    setWarranty(p.warranty);
    setSku(p.sku);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const categoryObj = categories.find((c) => c.slug === category);
    const categoryName = categoryObj ? categoryObj.name : category;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name,
        brand,
        category,
        categoryName,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        stock: Number(stock),
        image,
        description,
        warranty,
        sku,
        status: Number(stock) > 0 ? 'available' : 'out_of_stock',
      });
    } else {
      addProduct({
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        brand,
        category,
        categoryName,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        stock: Number(stock),
        image,
        gallery: [image],
        description,
        specs: { 'Garansi': warranty, 'Kondisi': '100% Baru & Segel' },
        warranty,
        status: Number(stock) > 0 ? 'available' : 'out_of_stock',
        sku,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 space-y-6 pt-6">
        <div className="bg-navy-900 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Manajemen Produk Elektronik</h1>
            <p className="text-xs text-slate-400">Tambah produk baru, perbarui stok, ubah harga, atau hapus item</p>
          </div>

          <button
            onClick={openAddModal}
            className="bg-electro-600 hover:bg-electro-500 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center space-x-2 transition-colors shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Produk Baru</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berdasarkan nama atau merk..."
            className="w-full bg-slate-900 text-xs text-white placeholder-slate-500 rounded-xl pl-9 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-electro-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Products Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Produk</th>
                  <th className="py-3 px-3">Kategori</th>
                  <th className="py-3 px-3">Merek</th>
                  <th className="py-3 px-3">Harga</th>
                  <th className="py-3 px-3">Stok</th>
                  <th className="py-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg bg-slate-950" />
                        <div>
                          <p className="font-bold text-white max-w-xs truncate">{p.name}</p>
                          <span className="text-[10px] text-slate-500 font-mono">SKU: {p.sku}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-300">{p.categoryName}</td>
                    <td className="py-3 px-3 text-electro-400 font-semibold">{p.brand}</td>
                    <td className="py-3 px-3 font-bold text-white">
                      {formatRupiah(p.discountPrice || p.price)}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.stock > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {p.stock > 0 ? `${p.stock} Unit` : 'Habis'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                        title="Edit Produk"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800"
                        title="Hapus Produk"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full space-y-4 shadow-2xl text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingProduct ? 'Edit Data Produk' : 'Tambah Produk Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-slate-400 font-semibold">Nama Produk *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 text-white rounded-xl p-2.5 border border-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-semibold">Merek (Brand)</label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-slate-950 text-white rounded-xl p-2.5 border border-slate-800"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 text-white rounded-xl p-2.5 border border-slate-800"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 font-semibold">Harga Normal (Rp)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 text-white rounded-xl p-2.5 border border-slate-800"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold">Harga Diskon (Rp)</label>
                  <input
                    type="number"
                    value={discountPrice || ''}
                    onChange={(e) => setDiscountPrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Opsional"
                    className="w-full bg-slate-950 text-white rounded-xl p-2.5 border border-slate-800"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold">Jumlah Stok</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full bg-slate-950 text-white rounded-xl p-2.5 border border-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold">URL Foto Gambar Produk</label>
                <input
                  type="text"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-slate-950 text-white rounded-xl p-2.5 border border-slate-800"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold">Deskripsi Ringkas</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 text-white rounded-xl p-2.5 border border-slate-800"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-slate-800 text-slate-300 font-semibold px-4 py-2 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-electro-600 text-white font-bold px-5 py-2 rounded-xl"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
