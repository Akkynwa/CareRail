import api from './client';

export interface VendorProfile {
  id: string;
  name: string;
  address: string;
  phone: string;
  isVerified: boolean;
}

export interface Transaction {
  id: string;
  voucherCode: string;
  amount: number; // Stored in kobo
  createdAt: string;
}

export const vendorAPI = {
  getProfile: async (): Promise<VendorProfile> => {
    const res = await api.get('/vendor/profile');
    return res.data;
  },

  getWallet: async () => {
    const res = await api.get('/vendor/wallet');
    return res.data; // Expected { balance: number, totalRedeemed: number }
  },

  getTransactions: async (): Promise<Transaction[]> => {
    const res = await api.get('/vendor/transactions');
    return res.data;
  },

  // Optimized for the QR Scanner we built
  scanVoucher: async (voucherCode: string) => {
    const res = await api.post('/vendor/voucher/scan', { voucherCode });
    return res.data; 
  },

  redeemVoucher: async (voucherId: string) => {
    const res = await api.post('/vendor/voucher/redeem', { voucherId });
    return res.data;
  },
};