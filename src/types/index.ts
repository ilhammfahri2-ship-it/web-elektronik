export type CategoryType = 
  | 'smartphone'
  | 'laptop'
  | 'pc-komputer'
  | 'monitor'
  | 'tablet'
  | 'audio'
  | 'kamera'
  | 'smartwatch'
  | 'aksesoris';

export interface ProductVariant {
  id: string;
  name: string; // e.g. "256GB / Space Gray"
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: CategoryType;
  categoryName: string;
  price: number;
  discountPrice?: number;
  stock: number;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  image: string;
  gallery: string[];
  description: string;
  specs: Record<string, string>;
  warranty: string;
  status: 'available' | 'out_of_stock' | 'preorder';
  variants?: ProductVariant[];
  sku: string;
}

export interface Category {
  id: string;
  name: string;
  slug: CategoryType;
  iconName: string;
  image: string;
  description: string;
  productCount: number;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedVariant?: string;
  selected: boolean;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Address {
  id: string;
  label: string; // e.g. "Rumah", "Kantor"
  recipient: string;
  phone: string;
  street: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone: string;
  avatar: string;
  addresses: Address[];
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  variant?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  items: OrderItem[];
  recipientName: string;
  recipientPhone: string;
  shippingAddress: string;
  courier: 'JNE' | 'J&T' | 'SiCepat' | 'GoSend';
  shippingCost: number;
  paymentMethod: 'VA_BCA' | 'VA_MANDIRI' | 'QRIS' | 'GOPAY' | 'CC';
  paymentStatus: 'unpaid' | 'paid' | 'refunded';
  subtotal: number;
  discount: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  createdAt: string;
  estimatedDelivery: string;
  notes?: string;
}

export interface Voucher {
  id: string;
  code: string;
  description: string;
  discountType: 'fixed' | 'percentage';
  discountValue: number; // e.g. 100000 or 10
  minPurchase: number;
  maxDiscount?: number;
  validUntil: string;
  isActive: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}
