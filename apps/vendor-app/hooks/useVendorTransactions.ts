'use client';

import { useEffect, useState } from 'react';
import { vendorAPI } from '@/lib/api/vendor';

export function useVendorTransactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    vendorAPI
      .getTransactions()
      .then((data) => setTransactions(data.transactions))
      .finally(() => setLoading(false));
  }, []);

  return { transactions, loading };
}