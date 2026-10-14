export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDateID = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
};

export const getOrderStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return { label: 'Menunggu Pembayaran', bg: 'bg-amber-100 text-amber-800 border-amber-200' };
    case 'processing':
      return { label: 'Sedang Diproses', bg: 'bg-blue-100 text-blue-800 border-blue-200' };
    case 'shipped':
      return { label: 'Dalam Pengiriman', bg: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
    case 'delivered':
      return { label: 'Selesai', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
    case 'cancelled':
      return { label: 'Dibatalkan', bg: 'bg-rose-100 text-rose-800 border-rose-200' };
    default:
      return { label: status, bg: 'bg-gray-100 text-gray-800 border-gray-200' };
  }
};

export const getPaymentMethodLabel = (method: string): string => {
  switch (method) {
    case 'VA_BCA':
      return 'BCA Virtual Account';
    case 'VA_MANDIRI':
      return 'Mandiri Virtual Account';
    case 'QRIS':
      return 'QRIS (GoPay, OVO, ShopeePay)';
    case 'GOPAY':
      return 'GoPay Instant';
    case 'CC':
      return 'Kartu Kredit / Debit';
    default:
      return method;
  }
};

export const getCourierLabel = (courier: string): string => {
  switch (courier) {
    case 'JNE':
      return 'JNE Express (YES / Reguler)';
    case 'J&T':
      return 'J&T Express Super';
    case 'SiCepat':
      return 'SiCepat BEST';
    case 'GoSend':
      return 'GoSend Instant (Same Day)';
    default:
      return courier;
  }
};
