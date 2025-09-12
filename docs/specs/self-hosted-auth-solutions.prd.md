# PRD: Self-Hosted Authentication Solutions for Oceanheart.ai

## Summary
Replace Supabase Auth with a self-hosted authentication solution for `www.oceanheart.ai` and conditional authentication across subdomains (research, clinic, admin, labs). The solution must provide secure, reliable email/password authentication without third-party API dependencies.

## Requirements
- **Primary Domain**: `www.oceanheart.ai` (Next.js, full authentication required)
- **Subdomains**: `research.oceanheart.ai`, `clinic.oceanheart.ai`, `admin.oceanheart.ai`, `labs.oceanheart.ai` (various stacks, conditional auth)
- **Admin Panel**: `admin.oceanheart.ai` provides user management
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