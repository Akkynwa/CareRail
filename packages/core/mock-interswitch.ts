/**
 * Mock Interswitch API Service
 * Use this during development to test your redemption flow
 */
export const mockInterswitchResponse = async (type: 'TRANSFER' | 'KYC') => {
  // Simulate network latency (500ms)
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (type === 'TRANSFER') {
    return {
      status: '00', // Interswitch standard success code
      message: 'Transfer Successful',
      transactionReference: `REF-${Math.random().toString(36).substring(7)}`,
    };
  }
  
  return { status: 'SUCCESS', verified: true };
};