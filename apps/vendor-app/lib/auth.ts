import api from './client';

export const voucherAPI = {
  getVendorVouchers: async () => {
    const res = await api.get('/vendor/vouchers');
    return res.data;
  },

  getVoucherDetails: async (voucherId: string) => {
    const res = await api.get(`/vendor/vouchers/${voucherId}`);
    return res.data;
  },
};