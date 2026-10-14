import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, Category, Voucher, User, Order, CartItem, WishlistItem, Review } from '../types';
import { mockProducts, mockCategories, mockVouchers, mockUsers, mockOrders, mockReviews } from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  products: Product[];
  categories: Category[];
  vouchers: Voucher[];
  orders: Order[];
  reviews: Review[];
  user: User | null;
  cart: CartItem[];
  wishlist: WishlistItem[];
  compareList: Product[];
  appliedVoucher: Voucher | null;
  toasts: Toast[];

  // Toast actions
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Cart actions
  addToCart: (product: Product, quantity?: number, selectedVariant?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  toggleCartSelection: (productId: string) => void;
  selectAllCart: (select: boolean) => void;
  clearCart: () => void;

  // Voucher actions
  applyVoucher: (code: string) => { success: boolean; message: string };
  removeVoucher: () => void;

  // Wishlist actions
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Compare actions
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;

  // Auth actions
  login: (email: string, role?: 'customer' | 'admin') => void;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
  addAddress: (address: User['addresses'][0]) => void;

  // Order actions
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status'], trackingNumber?: string) => void;

  // Product Admin CRUD
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (id: string, productData: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Voucher Admin CRUD
  addVoucher: (voucher: Omit<Voucher, 'id'>) => void;
  toggleVoucherStatus: (id: string) => void;

  // Review actions
  addReview: (reviewData: Omit<Review, 'id' | 'date'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage or mock fallbacks
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('electrohub_products');
    return saved ? JSON.parse(saved) : mockProducts;
  });

  const [categories] = useState<Category[]>(mockCategories);

  const [vouchers, setVouchers] = useState<Voucher[]>(() => {
    const saved = localStorage.getItem('electrohub_vouchers');
    return saved ? JSON.parse(saved) : mockVouchers;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('electrohub_orders');
    return saved ? JSON.parse(saved) : mockOrders;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('electrohub_reviews');
    return saved ? JSON.parse(saved) : mockReviews;
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('electrohub_user');
    return saved ? JSON.parse(saved) : mockUsers[1]; // Default logged-in customer for rich demo
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('electrohub_cart');
    if (saved) return JSON.parse(saved);
    // Seed initial cart item for showcase
    return [
      {
        productId: mockProducts[0].id,
        product: mockProducts[0],
        quantity: 1,
        selected: true,
      }
    ];
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('electrohub_wishlist');
    return saved ? JSON.parse(saved) : [
      { productId: mockProducts[1].id, product: mockProducts[1], addedAt: new Date().toISOString() }
    ];
  });

  const [compareList, setCompareList] = useState<Product[]>([]);
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('electrohub_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('electrohub_vouchers', JSON.stringify(vouchers));
  }, [vouchers]);

  useEffect(() => {
    localStorage.setItem('electrohub_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('electrohub_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('electrohub_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('electrohub_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('electrohub_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('electrohub_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast Helper
  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Handlers
  const addToCart = (product: Product, quantity = 1, selectedVariant?: string) => {
    if (product.stock <= 0) {
      addToast(`Stok ${product.name} sedang habis!`, 'error');
      return;
    }

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.selectedVariant === selectedVariant
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        if (newQty > product.stock) {
          addToast(`Stok tidak mencukupi (Maksimal ${product.stock})`, 'error');
          return prev;
        }
        updated[existingIndex].quantity = newQty;
        return updated;
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            product,
            quantity: Math.min(quantity, product.stock),
            selectedVariant,
            selected: true,
          }
        ];
      }
    });

    addToast(`Berhasil menambahkan ${product.name} ke keranjang!`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
    addToast('Produk dihapus dari keranjang', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.productId === productId) {
          if (quantity > item.product.stock) {
            addToast(`Stok hanya tersedia ${item.product.stock}`, 'error');
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const toggleCartSelection = (productId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const selectAllCart = (select: boolean) => {
    setCart((prev) => prev.map((item) => ({ ...item, selected: select })));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Voucher Handlers
  const applyVoucher = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const found = vouchers.find((v) => v.code === cleanCode && v.isActive);

    if (!found) {
      return { success: false, message: 'Kode voucher tidak valid atau sudah tidak aktif.' };
    }

    // Calculate current selected subtotal
    const selectedSubtotal = cart
      .filter((item) => item.selected)
      .reduce((sum, item) => {
        const price = item.product.discountPrice || item.product.price;
        return sum + price * item.quantity;
      }, 0);

    if (selectedSubtotal < found.minPurchase) {
      return {
        success: false,
        message: `Minimal transaksi untuk voucher ini adalah Rp ${found.minPurchase.toLocaleString('id-ID')}`,
      };
    }

    setAppliedVoucher(found);
    addToast(`Voucher ${found.code} berhasil digunakan!`, 'success');
    return { success: true, message: `Voucher ${found.code} berhasil dipasang!` };
  };

  const removeVoucher = () => {
    setAppliedVoucher(null);
    addToast('Voucher dilepas', 'info');
  };

  // Wishlist Handlers
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.productId === product.id);
      if (exists) {
        addToast(`${product.name} dihapus dari wishlist`, 'info');
        return prev.filter((item) => item.productId !== product.id);
      } else {
        addToast(`${product.name} ditambahkan ke wishlist!`, 'success');
        return [...prev, { productId: product.id, product, addedAt: new Date().toISOString() }];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.productId === productId);
  };

  // Compare Handlers
  const addToCompare = (product: Product) => {
    if (compareList.some((p) => p.id === product.id)) {
      addToast('Produk sudah ada di daftar perbandingan', 'info');
      return;
    }
    if (compareList.length >= 4) {
      addToast('Maksimal 4 produk untuk dibandingkan sekaligus', 'error');
      return;
    }
    setCompareList((prev) => [...prev, product]);
    addToast(`Ditambahkan ke Perbandingan (${compareList.length + 1}/4)`, 'success');
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (productId: string) => {
    return compareList.some((p) => p.id === productId);
  };

  // Auth Handlers
  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const foundUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() || u.role === role);
    if (foundUser) {
      setUser(foundUser);
      addToast(`Selamat datang kembali, ${foundUser.name}!`, 'success');
    } else {
      const newUser: User = {
        id: 'u-' + Date.now(),
        name: email.split('@')[0],
        email,
        role,
        phone: '0812' + Math.floor(10000000 + Math.random() * 90000000),
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        addresses: [],
      };
      setUser(newUser);
      addToast(`Akun berhasil dibuat & masuk!`, 'success');
    }
  };

  const logout = () => {
    setUser(null);
    addToast('Anda telah keluar dari akun.', 'info');
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...updatedData });
    addToast('Profil berhasil diperbarui', 'success');
  };

  const addAddress = (newAddress: User['addresses'][0]) => {
    if (!user) return;
    const updatedAddresses = user.addresses.map((a) =>
      newAddress.isDefault ? { ...a, isDefault: false } : a
    );
    setUser({ ...user, addresses: [...updatedAddresses, newAddress] });
    addToast('Alamat baru berhasil ditambahkan', 'success');
  };

  // Order Handlers
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `EH-${dateStr}-${randomDigits}`;
    const newId = `ord-${Date.now()}`;

    const newOrder: Order = {
      ...orderData,
      id: newId,
      orderNumber,
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Decrease product stock
    setProducts((prev) =>
      prev.map((prod) => {
        const itemInOrder = orderData.items.find((i) => i.productId === prod.id);
        if (itemInOrder) {
          const updatedStock = Math.max(0, prod.stock - itemInOrder.quantity);
          return {
            ...prod,
            stock: updatedStock,
            status: updatedStock === 0 ? 'out_of_stock' : prod.status,
          };
        }
        return prod;
      })
    );

    // Remove bought items from cart
    const boughtIds = orderData.items.map((i) => i.productId);
    setCart((prev) => prev.filter((c) => !boughtIds.includes(c.productId)));
    setAppliedVoucher(null);

    addToast(`Pesanan #${orderNumber} berhasil dibuat!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status'], trackingNumber?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status,
            trackingNumber: trackingNumber || ord.trackingNumber,
            paymentStatus: status === 'delivered' ? 'paid' : ord.paymentStatus,
          };
        }
        return ord;
      })
    );
    addToast(`Status pesanan diperbarui menjadi: ${status}`, 'success');
  };

  // Admin Product CRUD
  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => {
    const newProduct: Product = {
      ...productData,
      id: 'prod-' + Date.now(),
      rating: 5.0,
      reviewCount: 0,
    };
    setProducts((prev) => [newProduct, ...prev]);
    addToast(`Produk ${newProduct.name} berhasil ditambahkan!`, 'success');
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, ...productData } : prod))
    );
    addToast('Data produk berhasil diperbarui', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
    addToast('Produk berhasil dihapus', 'info');
  };

  // Admin Voucher CRUD
  const addVoucher = (voucherData: Omit<Voucher, 'id'>) => {
    const newVoucher: Voucher = {
      ...voucherData,
      id: 'v-' + Date.now(),
    };
    setVouchers((prev) => [newVoucher, ...prev]);
    addToast(`Voucher ${newVoucher.code} berhasil ditambah!`, 'success');
  };

  const toggleVoucherStatus = (id: string) => {
    setVouchers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isActive: !v.isActive } : v))
    );
    addToast('Status voucher diperbarui', 'info');
  };

  // Review Handler
  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: 'rev-' + Date.now(),
      date: new Date().toISOString().slice(0, 10),
    };
    setReviews((prev) => [newReview, ...prev]);

    // Recalculate rating on product
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === reviewData.productId) {
          const productRevs = [...reviews, newReview].filter((r) => r.productId === p.id);
          const avg = productRevs.reduce((acc, r) => acc + r.rating, 0) / productRevs.length;
          return {
            ...p,
            rating: Number(avg.toFixed(1)),
            reviewCount: productRevs.length,
          };
        }
        return p;
      })
    );

    addToast('Ulasan Anda berhasil ditambahkan!', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        categories,
        vouchers,
        orders,
        reviews,
        user,
        cart,
        wishlist,
        compareList,
        appliedVoucher,
        toasts,
        addToast,
        removeToast,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleCartSelection,
        selectAllCart,
        clearCart,
        applyVoucher,
        removeVoucher,
        toggleWishlist,
        isInWishlist,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        login,
        logout,
        updateProfile,
        addAddress,
        createOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        addVoucher,
        toggleVoucherStatus,
        addReview,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
