'use client';

import { useEffect, useState } from 'react';
import { vendorAPI } from '@/lib/api/vendor';

export function useVendorWallet() {
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    vendorAPI
      .getWallet()
      .then((data) => setWallet(data.wallet))
      .finally(() => setLoading(false));
  }, []);

  return { wallet, loading };
}