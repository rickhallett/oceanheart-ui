# PRD: Self-Hosted Authentication Solutions for Oceanheart.ai

## Summary
Replace Supabase Auth with a self-hosted authentication solution for `www.oceanheart.ai` and conditional authentication across subdomains (research, clinic, admin, labs). The solution must provide secure, reliable email/password authentication without third-party API dependencies.

## Requirements
- **Primary Domain**: `www.oceanheart.ai` (Next.js, full authentication required)
- **Subdomains**: `research.oceanheart.ai`, `clinic.oceanheart.ai`, `passport.oceanheart.ai`, `labs.oceanheart.ai` (various stacks, conditional auth)
- **Admin Panel**: `passport.oceanheart.ai` provides user management
- **Authentication**: Email/password only (no SSO complexity, no password reset for MVP)
- **Session Sharing**: Across all subdomains via domain cookies
- **Security**: Production-ready, secure implementation

## Current State Analysis
- **Current Provider**: Supabase Auth with SSR cookies
- **Cookie Domain**: Already configured for `.oceanheart.ai`
- **Integration**: Deep integration with Next.js middleware and API routes
- **Common Auth Package**: Exists but relies on Supabase

## Top 5 Authentication Solutions (Ranked by Best Fit)

### 1. **Custom JWT-based Solution with PostgreSQL** ⭐⭐⭐⭐⭐
**Best overall fit - Minimal complexity, maximum control**

**Pros:**
- Full control over authentication logic and data
- Minimal dependencies (just JWT library + bcrypt + database)
- Easy integration with existing PostgreSQL setup
- Simple email/password implementation without excess features
- Domain cookie sharing already working pattern
- Can reuse existing database infrastructure
- Lightweight implementation (~200 lines of code)

**Cons:**
- Need to implement user management UI for admin panel
- Manual security implementation (though simple for email/pass)
- No built-in rate limiting (need to add)

**Implementation Estimate:** 2-3 days
**Complexity:** Low
**Maintenance:** Low

---

### 2. **Next-Auth v5 (Auth.js) with Credentials Provider** ⭐⭐⭐⭐
**Good balance of features and control**

**Pros:**
- Purpose-built for Next.js applications
- Built-in session management and security best practices
- Email/password via credentials provider
- JWT or database sessions
- Good documentation and community
- Can integrate with existing PostgreSQL

**Cons:**
- Overkill for simple email/password needs
- Some complexity around providers even for basic auth
- Less control over authentication flow
- Might need customization for multi-subdomain setup

**Implementation Estimate:** 3-4 days
**Complexity:** Medium
**Maintenance:** Low

---

### 3. **Lucia Auth** ⭐⭐⭐
**Modern, lightweight auth library**

**Pros:**
- TypeScript-first, modern design
- Framework agnostic but has Next.js adapter
- Simple session management
- Good security defaults
- Supports PostgreSQL
- Less opinionated than Next-Auth

**Cons:**
- Smaller community and ecosystem
- Still relatively new (less battle-tested)
- Need to build user management interface
- Documentation could be more comprehensive

**Implementation Estimate:** 3-4 days
**Complexity:** Medium
**Maintenance:** Medium

---

### 4. **Clerk with Self-Hosting Option** ⭐⭐
**Enterprise-grade but may be overkill**

**Pros:**
- Very robust and feature-complete
- Excellent user management UI
- Good multi-domain support
- Strong security posture
- Professional admin interfaces

**Cons:**
- Overkill for simple email/password requirement
- Complex setup and configuration
- Still relies on external service (even self-hosted)
- Higher learning curve
- May introduce unnecessary features and complexity

**Implementation Estimate:** 5-7 days
**Complexity:** High
**Maintenance:** Medium

---

### 5. **Auth0 Community Edition (Self-Hosted)** ⭐
**Enterprise solution - not recommended for this use case**

**Pros:**
- Industry-standard authentication platform
- Comprehensive feature set
- Battle-tested security
- Good admin interfaces

**Cons:**
- Massive overkill for simple email/password
- Complex deployment and configuration
- High resource requirements
- Steep learning curve
- Community edition has limitations
- Not aligned with "simple and lean" requirement

**Implementation Estimate:** 7-10 days
**Complexity:** Very High
**Maintenance:** High

---

## Recommended Solution: Custom JWT-based Implementation

### Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ www.oceanheart. │    │ PostgreSQL       │    │ admin.oceanheart│
│ ai (Next.js)    │◄──►│ users table      │◄──►│ .ai (User Mgmt) │
└─────────────────┘    │ sessions table   │    └─────────────────┘
                       └──────────────────┘
                                ▲
                                │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ research.       │◄───┤ JWT + Domain    │───►│ clinic.         │
│ oceanheart.ai   │    │ Cookies         │    │ oceanheart.ai   │
└─────────────────┘    │ (.oceanheart.ai)│    └─────────────────┘
                       └─────────────────┘
                                ▲
                                │
                       ┌─────────────────┐
                       │ labs.           │
                       │ oceanheart.ai   │
                       └─────────────────┘
```

### Implementation Plan
1. **Database Schema** (1 day)
   - `users` table: id, email, password_hash, created_at, updated_at
   - `sessions` table: id, user_id, expires_at, created_at
   - Simple indexes and constraints

2. **Auth API Routes** (1 day)
   - `/api/auth/signin` - email/password validation + JWT creation
   - `/api/auth/signout` - session cleanup
   - `/api/auth/verify` - JWT validation for subdomains
   - `/api/auth/user` - get current user info

3. **Middleware Integration** (0.5 days)
   - Replace Supabase client with JWT validation
   - Maintain existing cookie domain settings
   - Keep current middleware structure

4. **Admin User Management** (0.5 days)
   - Simple CRUD interface for user management
   - List users, create user, delete user
   - Basic role assignment if needed

### Security Considerations
- **Password Hashing**: bcrypt with proper salt rounds
- **JWT Security**: Short-lived tokens (15 min) with refresh mechanism
- **Rate Limiting**: Simple in-memory rate limiting for auth endpoints
- **HTTPS Only**: Secure cookies in production
- **Domain Scoping**: Existing `.oceanheart.ai` cookie domain

### Migration Strategy
1. Create new auth tables alongside existing Supabase setup
2. Implement new auth system with feature flag
3. Migrate users (export from Supabase, hash passwords, import)
4. Switch traffic to new system
5. Remove Supabase dependencies

### Success Criteria
- [ ] User can sign in on `www.oceanheart.ai`
- [ ] Session works across all subdomains without re-authentication
- [ ] Admin panel on `admin.oceanheart.ai` can manage users
- [ ] No third-party API dependencies for authentication
- [ ] Performance equivalent or better than current Supabase setup
- [ ] Security audit passes for production deployment

## Implementation Timeline
- **Day 1**: Database schema + basic auth API
- **Day 2**: Middleware integration + testing
- **Day 3**: Admin interface + user migration script

**Total Estimate: 3 days for full implementation**

---

## Appendix A: Cross-Domain Authentication Architecture

### Overview
This appendix addresses the specific challenge of maintaining authentication sessions across subdomains hosted on different platforms (e.g., `labs.oceanheart.ai` on Django/FastAPI vs `www.oceanheart.ai` on Next.js/Vercel).

### Architecture Components

#### 1. Authentication Flow
```
User → labs.oceanheart.ai (protected resource)
     ↓ (no valid session)
     → www.oceanheart.ai/signin?returnTo=labs.oceanheart.ai/path
     ↓ (user login)
     → JWT created + .oceanheart.ai cookie set
     ↓ (redirect back)
     → labs.oceanheart.ai/path (with session cookie)
     ↓ (verify JWT locally)
     → Access granted
```

#### 2. Session Sharing Mechanism

**Domain Cookies (.oceanheart.ai)**
```javascript
// In www.oceanheart.ai auth system
const setCrossDomainAuth = (jwt) => {
  cookies().set('oh_session', jwt, {
    domain: '.oceanheart.ai',
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })
}
```

#### 3. External App Integration

**For any subdomain (Django/FastAPI/Rails/etc.):**
```javascript
// Generic middleware/auth guard
const requireAuth = async (req, res, next) => {
  const token = req.cookies.oh_session
  
  if (!token) {
    const returnTo = encodeURIComponent(req.originalUrl)
    return res.redirect(`https://www.oceanheart.ai/signin?returnTo=https://labs.oceanheart.ai${returnTo}`)
  }
  
  try {
    // Verify JWT locally (no API call needed)
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload
    next()
  } catch (error) {
    return res.redirect(`https://www.oceanheart.ai/signin?returnTo=https://labs.oceanheart.ai${req.originalUrl}`)
  }
}
```

#### 4. Central Auth API Endpoints

**On www.oceanheart.ai:**

```javascript
// /api/auth/verify - for external apps needing server-side validation
export async function POST(req) {
  const { token } = await req.json()
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await getUserById(payload.userId)
    
    return NextResponse.json({ 
      valid: true, 
      user: { id: user.id, email: user.email } 
    })
  } catch {
    return NextResponse.json({ valid: false }, { status: 401 })
  }
}

// /api/auth/refresh - for token renewal
export async function POST(req) {
  const { token } = await req.json()
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true })
    
    if (payload.exp > Date.now() / 1000 + 3600) {
      return NextResponse.json({ token }) // Still valid
    }
    
    const newToken = jwt.sign(
      { userId: payload.userId, email: payload.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )
    
    return NextResponse.json({ token: newToken })
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}
```

#### 5. Platform-Specific Implementations

**Django Example:**
```python
import jwt
from django.shortcuts import redirect
from django.conf import settings

def auth_required(view_func):
    def wrapper(request, *args, **kwargs):
        token = request.COOKIES.get('oh_session')
        
        if not token:
            return_to = request.build_absolute_uri()
            auth_url = f"{settings.AUTH_URL}/signin?returnTo={return_to}"
            return redirect(auth_url)
        
        try:
            payload = jwt.decode(token, settings.JWT_SECRET, algorithms=['HS256'])
            request.user_id = payload['userId']
            return view_func(request, *args, **kwargs)
        except jwt.InvalidTokenError:
            return_to = request.build_absolute_uri()
            auth_url = f"{settings.AUTH_URL}/signin?returnTo={return_to}"
            return redirect(auth_url)
    
    return wrapper
```

**FastAPI Example:**
```python
from fastapi import Cookie, HTTPException, Depends
import jwt

async def get_current_user(oh_session: str = Cookie(None)):
    if not oh_session:
        raise HTTPException(
            status_code=307,
            headers={"Location": f"{AUTH_URL}/signin?returnTo={request.url}"}
        )
    
    try:
        payload = jwt.decode(oh_session, JWT_SECRET, algorithms=['HS256'])
        return payload
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401)
```

#### 6. Environment Configuration

**www.oceanheart.ai (.env):**
```bash
JWT_SECRET=your-shared-secret-key-min-32-chars
COOKIE_DOMAIN=.oceanheart.ai
```

**External subdomains (.env):**
```bash
AUTH_URL=https://www.oceanheart.ai
JWT_SECRET=your-shared-secret-key-min-32-chars  # Same as main app
```

### Security Considerations

1. **Shared JWT Secret** - All apps need the same secret to verify tokens
2. **Cookie Security** - HTTPS only, secure flags, proper SameSite
3. **Token Expiration** - Short-lived tokens (7 days max) with refresh mechanism
4. **Secret Rotation** - Plan for periodic JWT secret updates across all apps
5. **CORS Configuration** - Properly configure for cross-origin requests if needed

### Benefits

1. **No Third-Party Dependencies** - Pure JWT + cookies
2. **Fast Local Verification** - No API calls needed for session validation  
3. **Stateless** - Each app can verify tokens independently
4. **Scalable** - Works across any number of subdomains/platforms
5. **Simple** - Minimal complexity compared to OAuth/SAML solutions
6. **Cost Effective** - No external auth service fees

### Implementation Checklist

- [ ] Implement JWT creation/verification in main auth system
- [ ] Set up `.oceanheart.ai` domain cookies
- [ ] Create `/api/auth/verify` and `/api/auth/refresh` endpoints
- [ ] Add JWT verification middleware to each external subdomain
- [ ] Configure shared JWT_SECRET across all applications
- [ ] Test authentication flow across all subdomains
- [ ] Implement token refresh logic
- [ ] Set up monitoring for failed auth attempts

This architecture provides a robust, self-hosted authentication solution that scales across your multi-platform subdomain ecosystem while maintaining the simplicity and control you require.