# CareRail Authentication Setup

## Overview
Complete JWT-based authentication system with password hashing using bcrypt.

## Test Credentials

### Beneficiary
- **Phone:** `+1234567891`
- **Password:** `beneficiary123`
- **Login URL:** http://localhost:3003/signin

### Donor
- **Email:** `donor@example.com`
- **Password:** `donor123`
- **Login URL:** http://localhost:3004/signin

### Vendor
- **Merchant Code:** `VEND001`
- **Password:** `vendor123`

### Admin
- **Email:** `admin@carerail.com`
- **Password:** `admin123`

## API Endpoints

### Authentication Endpoints (Port 4000)

#### Login
```bash
POST /api/auth/login

Request:
{
  "email": "user@example.com",  // or phone for beneficiary, merchantCode for vendor
  "password": "password123",
  "role": "donor" | "beneficiary" | "vendor" | "admin"
}

Response:
{
  "message": "Login successful",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

#### Signup (Beneficiary)
```bash
POST /api/auth/signup

Request:
{
  "fullName": "John Doe",
  "phone": "+1234567890",
  "password": "password123",
  "role": "beneficiary"
}

Response:
{
  "message": "Signup successful",
  "user": {
    "id": "beneficiary-id",
    "fullName": "John Doe",
    "phone": "+1234567890"
  }
}
```

#### Logout
```bash
POST /api/auth/logout

Response:
{
  "message": "Logged out"
}
```

## Architecture

### Authentication Packages
- **@carerail/auth:** JWT utilities, password hashing, session management
  - `jwt.ts` - JWT signing/verification
  - `session.ts` - Cookie-based session management
  - `middleware.ts` - Route protection middleware
  - `password.ts` - Password hashing with bcrypt

### Database Models
Adds `password` field to:
- `Donor`
- `Beneficiary`
- `Vendor`

## Implementation Notes

1. **Password Storage:** Uses bcrypt with 10 salt rounds for secure password hashing
2. **Session Storage:** HTTP-only cookies with 24-hour expiration
3. **JWT Secret:** Uses `JWT_SECRET` from environment variables (default: `supersecretjwtkey`)
4. **Cookie Security:**
   - `httpOnly: true` - Prevents XSS attacks
   - `secure: true` - HTTPS only in production
   - `sameSite: 'lax'` - CSRF protection
   - `maxAge: 86400` - 24 hours

## Next Steps

1. Implement auth guards on dashboard routes
2. Add logout buttons to apps
3. Add password reset functionality
4. Implement 2FA for sensitive operations
5. Add email verification for donors
