import api from './client';

export const vendorAPI = {
  getProfile: async () => {
    const res = await api.get('/vendor/profile');
    return res.data;
  },

  updateProfile: async (payload: {
    name?: string;
    address?: string;
    phone?: string;
  }) => {
    const res = await api.put('/vendor/profile', payload);
    return res.data;
  },

  getWallet: async () => {
    const res = await api.get('/vendor/wallet');
    return res.data;
  },

  getTransactions: async () => {
    const res = await api.get('/vendor/transactions');
    return res.data;
  },

  scanVoucher: async (voucherCode: string) => {
    const res = await api.post('/vendor/voucher/scan', { voucherCode });
    return res.data;
  },

  redeemVoucher: async (voucherId: string) => {
    const res = await api.post('/vendor/voucher/redeem', { voucherId });
    return res.data;
  },
};