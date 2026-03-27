'use client';

import { useEffect, useState } from 'react';
import { vendorAPI } from '@/lib/api/vendor';

export function useVendorAuth() {
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    vendorAPI
      .getProfile()
      .then((data) => setVendor(data.vendor))
      .catch(() => setVendor(null))
      .finally(() => setLoading(false));
  }, []);

  return { vendor, loading };
}