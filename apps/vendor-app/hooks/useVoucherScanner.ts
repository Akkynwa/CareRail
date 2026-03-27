'use client';

import { useState } from 'react';
import { vendorAPI } from '@/lib/vendor';

export function useVoucherScanner() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function scan(code: string) {
    setLoading(true);
    try {
      const res = await vendorAPI.scanVoucher(code);
      setResult(res);
    } finally {
      setLoading(false);
    }
  }

  return { scan, loading, result };
}