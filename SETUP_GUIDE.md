# CareRail Setup & Testing Guide

## Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm 10.21.0+
- Git

### Installation

```bash
# Install dependencies
pnpm install

# Setup database
pnpm db:push

# Seed test data (optional)
npx tsx packages/db/prisma/seed.ts
```

### Running Development Servers

**Option 1: Run all apps at once**
```bash
pnpm dev
```

**Option 2: Run individually**
```bash
# Landing page (port 3001)
pnpm dev --filter=landing

# Admin dashboard (port 3000)
pnpm dev --filter=admin

# API server (port 4000) - START FIRST
pnpm dev --filter=api

# Beneficiary app (port 3003)
pnpm dev --filter=beneficiary-app

# Donor app (port 3004)
pnpm dev --filter=donor-app

# Vendor app (port 3002)
pnpm dev --filter=vendor-app
```

---

## Test Credentials

### Vendors
```
Username: VEND001
Password: vendor123
```

### Beneficiaries
```
Phone: +1234567891
Password: beneficiary123

Phone: +1234567892
Password: beneficiary123
```

### Donors
```
Email: donor@example.com
Password: donor123

Email: donor2@example.com
Password: donor123
```

### Admin
```
Email: admin@example.com
Password: admin123
```

---

## Complete User Journey (End-to-End Test)

### Step 1: Donor Creates a Voucher
1. Go to http://localhost:3004 (Donor App)
2. Click "Sign in" at top right
3. Enter: `donor@example.com` / `donor123`
4. Click "Sign in"
5. You should see the donor dashboard with:
   - "Total Donations" stat
   - "Total Redeemed" stat
   - "+ New Voucher" button
6. Click "+ New Voucher"
7. Fill in:
   - Beneficiary Phone: `+1234567891`
   - Amount: `500` (₦5.00)
   - Purpose: `School Supplies`
8. Click "Create Voucher"
9. A QR code should appear below
10. Download or save the QR code image

### Step 2: Beneficiary Receives & Views Voucher
1. Open http://localhost:3003 (Beneficiary App)
2. Click "Sign in"
3. Enter: `+1234567891` / `beneficiary123`
4. You should see:
   - Green wallet card showing balance
   - A new voucher in "Available Vouchers" section
   - Voucher shows: Purpose, Amount, Expiry
5. QR code is visible on the voucher card

### Step 3: Vendor Redeems the Voucher
1. Open http://localhost:3002 (Vendor App)
2. Click "Sign in"
3. Enter: `VEND001` / `vendor123`
4. You should see the vendor dashboard with stats
5. Click "Open Scanner"
6. A camera modal appears
7. **Using your saved QR code image:**
   - On another device/window, display the QR code
   - Point vendor app camera at it
   - Scan button appears when detected
8. OR **For testing without camera:**
   - Open browser console
   - Manually insert a QR code value
9. Upon successful scan:
   - "Voucher redeemed" message appears
   - Transaction recorded
   - Transaction appears in "Recent Transactions" list
10. Go back to beneficiary app
11. Voucher now shows as "Redeemed" with gray background

### Step 4: Verify Impact
1. Go back to donor app dashboard
2. Refresh page (F5) or wait a moment
3. "Total Redeemed" stat should increase
4. Recent activity should show your redemption

---

## Testing Without Camera (QR Testing)

### Generate Test QR Codes
```bash
cd apps/donor-app
```

Edit test manually in browser console:
```javascript
// Simulate QR scan in vendor-app
const qrData = "CRVCHR-2024-001-ABC123"; // Example QR value
const event = new CustomEvent('qr-scanned', { detail: qrData });
window.dispatchEvent(event);
```

---

## API Testing with cURL

### 1. Test Signin (Beneficiary)
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+1234567891",
    "password": "beneficiary123",
    "role": "beneficiary"
  }' \
  -c cookies.txt
```

### 2. Get Session
```bash
curl -X GET http://localhost:4000/api/auth/session \
  -b cookies.txt
```

### 3. Check Wallet Balance
```bash
curl -X GET http://localhost:4000/api/wallet/balance \
  -b cookies.txt
```

### 4. Get Transaction History
```bash
curl -X GET "http://localhost:4000/api/wallet/history?limit=5&skip=0" \
  -b cookies.txt
```

### 5. Create Voucher (Donor)
```bash
curl -X POST http://localhost:4000/api/vouchers/create \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50000,
    "purpose": "Medical Treatment",
    "beneficiaryPhone": "+1234567891"
  }' \
  -b cookies.txt
```

### 6. Redeem Voucher (Vendor)
```bash
curl -X POST http://localhost:4000/api/vouchers/redeem \
  -H "Content-Type: application/json" \
  -d '{
    "qrCode": "CRVCHR-2024-001-ABC123"
  }' \
  -b cookies.txt
```

---

## Testing Payment Flow

### Note: Currently using mock/sandbox mode

1. **Initiate Payment:**
```bash
curl -X POST http://localhost:4000/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 500000,
    "description": "Wallet top-up",
    "email": "beneficiary@example.com"
  }' \
  -b cookies.txt \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

2. **Expected Response:**
```json
{
  "success": true,
  "paymentUrl": "https://sandbox.interswitchng.com/...",
  "reference": "CRV-20240327-ABC123",
  "amount": 500000
}
```

3. **Webhook Verification:**
```bash
# This would be called by Interswitch
curl -X POST http://localhost:4000/api/payment/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "reference": "CRV-20240327-ABC123",
    "amount": 500000,
    "status": "success"
  }' \
  -H "X-Interswitch-Signature: YOUR_SIGNATURE"
```

---

## Interswitch Payment Setup (Nigerian Market)

### Getting Credentials:
1. **Sign up** at [Interswitch Developer Portal](https://developer.interswitchng.com)
2. **Create a merchant account** for your organization
3. **Request WebPay integration** and get:
   - **Merchant Code**: Your unique merchant identifier
   - **Pay Item ID**: Product/service identifier for payments
   - **MAC Key**: Secret key for HMAC-SHA512 signatures

### Environment Variables:
```bash
# Required for Nigerian market
INTERSWITCH_MERCHANT_CODE=your_actual_merchant_code
INTERSWITCH_PAY_ITEM_ID=your_actual_pay_item_id
INTERSWITCH_MAC_KEY=your_actual_mac_key
INTERSWITCH_API_BASE=https://webpay.interswitchng.com

# Optional (for legacy API)
INTERSWITCH_CLIENT_ID=your_client_id
INTERSWITCH_CLIENT_SECRET=your_client_secret
```

### Testing Payment Flow:
1. **Login as donor** (donor@example.com / donor123)
2. **Click "Add Funds"** in wallet section
3. **Enter amount** (minimum ₦100)
4. **Click "Pay with Card"**
5. **You'll be redirected** to Interswitch payment page
6. **Use test card details** (provided by Interswitch)
7. **Complete payment**
8. **You'll return** to donor dashboard with success message

### Test Card Details (Interswitch Sandbox):
```
Card Number: 5060990580000217499 (Verve)
Expiry: 12/25
CVV: 780
PIN: 1111
OTP: 123456
```

---

## Troubleshooting

### Issue: Port Already in Use
```bash
# Kill process on port (Windows PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 4000).OwningProcess | Stop-Process -Force

# Or find the PID and kill
lsof -ti:4000 | xargs kill -9
```

### Issue: Database Connection Error
```bash
# Ensure SQLite database exists
pnpm db:push

# Check database location
ls packages/db/prisma/dev.db

# Reset database (WARNING: clears all data)
pnpm db:reset
```

### Issue: QR Scanner Not Working
1. Allow camera permissions when prompted
2. Ensure browser has https or localhost access to camera
3. Try in different browser (Chrome/Chromium recommended)
4. Check console for errors: `F12 → Console`

### Issue: Signin Returns 401
```
Possible causes:
- Credentials are incorrect (check test credentials above)
- Database doesn't have seed data
- API server not running (port 4000)

Solution:
1. Verify API is running: curl http://localhost:4000/api/auth/session
2. Run seed: npx tsx packages/db/prisma/seed.ts
3. Check database: pnpm db:studio (opens Prisma Studio)
```

### Issue: CORS or Cookie Issues
Check `apps/api/next.config.mjs`:
```javascript
// Should have allowed origins
headers: async () => [{
  source: "/:path*",
  headers: [
    { key: "Access-Control-Allow-Origin", value: "http://localhost:*" },
    { key: "Access-Control-Allow-Credentials", value: "true" },
  ]
}]
```

---

## Database Management

### Prisma Studio (Visual Database Editor)
```bash
pnpm db:studio
```
Opens http://localhost:5555 with all tables visible

### Seed Database
```bash
# Using direct tsx
npx tsx packages/db/prisma/seed.ts

# Or using pnpm (if configured)
pnpm db:seed
```

### Reset Database (⚠️ Clears all data)
```bash
pnpm db:reset
```

### View Database File Directly
```bash
# SQLite location
packages/db/prisma/dev.db

# View with sqlite CLI (if installed)
sqlite3 packages/db/prisma/dev.db ".tables"
sqlite3 packages/db/prisma/dev.db "SELECT * FROM Beneficiary;"
```

---

## Monitoring & Debugging

### API Logs
Check terminal where `pnpm dev --filter=api` is running:
```
GET /api/auth/session 200
POST /api/vouchers/create 201
POST /api/vouchers/redeem 200
```

### Client Logs
Open browser console (F12) to see:
- API responses
- QR scanner debug info
- Session state changes

### Network Inspector
In browser DevTools (F12 → Network tab):
1. Filter by XHR/Fetch
2. Watch API calls
3. Check request/response bodies

### Real-time Events (SSE)
```bash
# Connect to event stream
curl -X GET http://localhost:4000/api/events/stream \
  -b cookies.txt \
  --no-buffer
```

---

## Performance Testing

### Load Testing QR Scanning
```bash
# Simulate 10 concurrent voucher redemptions
for i in {1..10}; do
  curl -X POST http://localhost:4000/api/vouchers/redeem \
    -H "Content-Type: application/json" \
    -d "{\"qrCode\": \"TEST-QR-$i\"}" \
    -b cookies.txt &
done
wait
```

### Monitor Memory & CPU
```bash
# Watch all dev processes
pnpm dev | grep -E "port|error|warn"
```

---

## Environment Variables Reference

Create `.env.local` in each app folder if needed:

**apps/api/.env.local:**
```
DATABASE_URL=file:./prisma/dev.db
JWT_SECRET=your-secret-key-here
NEXTAUTH_SECRET=your-nextauth-secret
INTERSWITCH_CLIENT_ID=sandbox_client_id
INTERSWITCH_CLIENT_SECRET=sandbox_client_secret
INTERSWITCH_API_BASE=https://sandbox.interswitchng.com
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

**apps/beneficiary-app/.env.local:**
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

**apps/donor-app/.env.local:**
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

**apps/vendor-app/.env.local:**
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

---

## Next Sessions

When resuming development:

1. **Start API first:** `pnpm dev --filter=api`
2. **Then run other apps:** `pnpm dev`
3. **Test your changes:** Use checklist above
4. **Check database:** `pnpm db:studio`

All apps should be accessible:
- Landing: http://localhost:3001
- Admin: http://localhost:3000
- Beneficiary: http://localhost:3003
- Donor: http://localhost:3004
- Vendor: http://localhost:3002
- API: http://localhost:4000

---

## Quick Reference

| Task | Command |
|------|---------|
| Install deps | `pnpm install` |
| Setup DB | `pnpm db:push` |
| Seed data | `npx tsx packages/db/prisma/seed.ts` |
| All dev servers | `pnpm dev` |
| API only | `pnpm dev --filter=api` |
| Database UI | `pnpm db:studio` |
| Reset DB | `pnpm db:reset` |
| Build for prod | `pnpm build` |
| Type check | `pnpm type-check` |
| Lint code | `pnpm lint` |

---

## Success Indicators

✅ All apps load without errors
✅ Can signin with test credentials
✅ Dashboards display styled correctly
✅ Can create/redeem vouchers
✅ QR code generation works
✅ QR scanner launches (with camera permission)
✅ Transaction history updates in real-time
✅ Wallet balance reflects changes

If all above pass, the platform is ready for feature testing!
