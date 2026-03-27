# CareRail API Documentation

## Base URL
- **Development:** `http://localhost:4000/api`
- **Production:** `https://api.carerail.com/api`

## Authentication

All endpoints (except login/signup) require a valid JWT token in cookies.

The token is automatically set as an HTTP-only cookie after successful login.

### Session Cookie
- **Name:** `care_session`
- **Domain:** localhost
- **HttpOnly:** true
- **Secure:** true (in production)
- **SameSite:** lax
- **MaxAge:** 24 hours

---

## Authentication Endpoints

### Sign Up (Beneficiary Only)
```
POST /auth/signup

Request:
{
  "fullName": "John Doe",
  "phone": "+234XXXXXXXXXX",
  "password": "securepassword123",
  "role": "beneficiary"
}

Response (201):
{
  "message": "Signup successful",
  "user": {
    "id": "beneficiary-1",
    "fullName": "John Doe",
    "phone": "+234XXXXXXXXXX"
  }
}

Errors:
- 400: Missing required fields
- 409: Beneficiary already exists
- 500: Internal server error
```

### Sign In
```
POST /auth/login

Request:
{
  "email": "user@example.com",  // phone for beneficiary, merchantCode for vendor
  "password": "password123",
  "role": "donor|beneficiary|vendor|admin"
}

Response (200):
{
  "message": "Login successful",
  "user": {
    "id": "user-1",
    "email": "user@example.com",
    "name": "User Name"
  }
}

Errors:
- 400: Missing required fields or invalid role
- 401: Invalid credentials
- 500: Internal server error
```

### Get Session
```
GET /auth/session

Response (200):
{
  "session": {
    "userId": "user-1",
    "email": "user@example.com",
    "role": "donor|beneficiary|vendor|admin"
  }
}

If no session:
{
  "session": null
}
```

### Sign Out
```
POST /auth/logout

Response (200):
{
  "message": "Logged out"
}
```

---

## Wallet Endpoints

### Get Wallet Balance
```
GET /wallet/balance

Authorization: Required (beneficiary)

Response (200):
{
  "beneficiaryId": "beneficiary-1",
  "balance": 15000,  // in cents (₦150.00)
  "createdAt": "2024-03-27T10:30:00Z"
}

Errors:
- 401: Unauthorized
- 403: Only beneficiaries can access
- 404: Wallet not found
```

### Get Wallet History
```
GET /wallet/history?limit=10&skip=0

Authorization: Required (beneficiary)

Query Parameters:
- limit: Number of records (default: 10)
- skip: Number of records to skip for pagination (default: 0)

Response (200):
{
  "transactions": [
    {
      "id": "txn-1",
      "amount": 5000,
      "type": "VOUCHER_REDEEMED",
      "createdAt": "2024-03-27T10:30:00Z"
    }
  ],
  "total": 25,
  "limit": 10,
  "skip": 0
}

Errors:
- 401: Unauthorized
- 403: Only beneficiaries can access
```

---

## Voucher Endpoints

### Create Voucher (Donor)
```
POST /vouchers/create

Authorization: Required (donor)

Request:
{
  "amount": 5000,        // in cents (₦50.00)
  "purpose": "Food Assistance",
  "beneficiaryPhone": "+234XXXXXXXXXX"
}

Response (201):
{
  "message": "Voucher created successfully",
  "voucher": {
    "id": "voucher-1",
    "qrCode": "CRVCHR-ABC123XYZ",
    "amount": 5000,
    "purpose": "Food Assistance",
    "expiresAt": "2024-03-27T10:40:00Z",
    "beneficiary": {
      "id": "beneficiary-1",
      "name": "John Doe",
      "phone": "+234XXXXXXXXXX"
    }
  }
}

Errors:
- 400: Missing required fields
- 401: Unauthorized
- 403: Only donors can create vouchers
- 404: Beneficiary not found
```

### Redeem Voucher (Beneficiary/Vendor)
```
POST /vouchers/redeem

Authorization: Required (beneficiary or vendor)

Request:
{
  "qrCode": "CRVCHR-ABC123XYZ",
  "vendorId": "vendor-1"  // optional, for vendor redemption
}

Response (200):
{
  "message": "Voucher redeemed successfully",
  "voucher": {
    "id": "voucher-1",
    "amount": 5000,
    "beneficiary": {
      "id": "beneficiary-1",
      "name": "John Doe"
    }
  }
}

Errors:
- 400: Voucher already redeemed or expired
- 401: Unauthorized
- 403: Insufficient permissions
- 404: Voucher not found
```

---

## Events/SSE Endpoint

### Live Event Stream
```
GET /events/stream

Authorization: Required

Content-Type: text/event-stream

Streams real-time events for the authenticated user:
- Donors: see redemption events
- Beneficiaries: see transaction events
- Vendors: see redemption events

Example Stream:
data: {"type":"connected"}

data: {"type":"transaction","data":{"id":"txn-1","amount":5000,"type":"VOUCHER_REDEEMED"}}

Errors:
- 401: Unauthorized
```

---

## Error Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource successfully created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid authentication |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error - Server error |

---

## Test Credentials

### Beneficiary
- **Phone:** `+1234567891`
- **Password:** `beneficiary123`

### Donor
- **Email:** `donor@example.com`
- **Password:** `donor123`

### Vendor
- **Merchant Code:** `VEND001`
- **Password:** `vendor123`

### Admin
- **Email:** `admin@carerail.com`
- **Password:** `admin123`

---

## Usage Examples

### Login as Beneficiary
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "+1234567891",
    "password": "beneficiary123",
    "role": "beneficiary"
  }' \
  -c cookies.txt
```

### Get Balance
```bash
curl http://localhost:4000/api/wallet/balance \
  -b cookies.txt
```

### Create Voucher (as Donor)
```bash
curl -X POST http://localhost:4000/api/vouchers/create \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5000,
    "purpose": "Food Assistance",
    "beneficiaryPhone": "+1234567891"
  }' \
  -b cookies.txt
```

### Redeem Voucher
```bash
curl -X POST http://localhost:4000/api/vouchers/redeem \
  -H "Content-Type: application/json" \
  -d '{
    "qrCode": "CRVCHR-ABC123XYZ"
  }' \
  -b cookies.txt
```

### Listen to Events
```bash
curl http://localhost:4000/api/events/stream \
  -N -b cookies.txt
```
