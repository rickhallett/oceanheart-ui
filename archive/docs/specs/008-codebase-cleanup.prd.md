# Oceanheart UI Codebase Cleanup PRD
**Post User-Management Removal Cleanup**

**Version:** 1.0  
**Date:** 2025-09-12  
**Status:** Ready for Review

## Overview
After successfully removing all user management and authentication from Oceanheart UI, this PRD identifies all remaining obsolete files, components, and code sections that can be safely removed to clean up the codebase completely.

---

## 🗂️ Complete Files and Directories to Remove

### Authentication & User Management Files
- [x] `types/next-auth.d.ts` - NextAuth type definitions (no longer used)
- [x] `app/signout/route.ts` - Signout route redirecting to accounts service
- [x] `cypress/e2e/sso.cy.ts` - SSO end-to-end test file (marked as skipped)

### Database & Migration Files
- [x] `migrations/` - **Entire directory** with 11 SQL migration files
- [x] `supabase/` - **Entire directory** including all Supabase configuration
- [x] `supabase/migrations/20240601000000_ab_testing.sql` - A/B testing migration

### Payment Processing Files
- [x] `libs/stripe.ts` - Complete Stripe integration (126 lines of unused payment code)

### Service Utilities No Longer Needed
- [x] `libs/instagram-service.ts` - Instagram page monitoring service (243 lines, depends on Supabase)
- [x] `hooks/useForm.ts` - Form management hook (171 lines, only used in documentation examples)
- [x] `hooks/useForm.test.ts` - Form hook tests (116 lines)
- [x] `components/team/RoleCard.test.tsx` - Component test (60 lines)

### SSL Certificates (Development)
- [x] `accounts.lvh.me+1-key.pem` - Development SSL certificate
- [x] `accounts.lvh.me+1.pem` - Development SSL certificate

### Development/Documentation Directories
- [x] `apps/` - **Entire directory** containing accounts and flowstate apps
- [x] `dev/` - **Entire directory** containing HTTPS dev setup for SSO
- [x] `docs/authentication-flow.md` - Authentication flow documentation
- [x] `docs/LOCAL-DEV-SSO.md` - Local SSO development guide
- [x] `docs/PRD-Subdomain-SSO.md` - SSO subdomain PRD
- [x] `docs/PUBLISHING-COMMON-AUTH.md` - Common auth publishing guide
- [x] `docs/AGENT-INSTALL-COMMON-AUTH.md` - Agent auth installation guide
- [x] `docs/ENV.sample-sso` - SSO environment sample

### Build Artifacts & Temporary Files
- [x] `repomix-output.xml` - Code analysis artifact (1.3MB)
- [x] `package-lock.json` - NPM lock file (project uses Bun)

### Documentation Specs Directory Cleanup
- [] `docs/specs/supabase-auth-removal.prd.md` - Original auth removal PRD (completed)
- [] `docs/specs/complete-user-management-removal.prd.md` - User management removal PRD (completed)

---

## 📦 Package.json Dependencies to Remove

### Authentication Dependencies
- [x] `"next-auth": "^4.24.11"` - No longer using authentication

### Database Dependencies
- [x] `"@types/better-sqlite3": "^7.6.12"` - Database types not needed
- [x] Remove `"better-sqlite3"` from `pnpm.onlyBuiltDependencies`
- [x] Remove `"better-sqlite3"` from `trustedDependencies` (if exists)

### Testing Dependencies
- [x] `"cypress": "^14.3.1"` - Only one test file that's skipped
- [x] `"cypress-vite": "^1.6.0"` - Cypress support

### Potentially Unused UI Dependencies (Verify First)
- [x] `"react-data-table-component": "^7.6.2"` - Table component (verify not used in consultation model)
- [x] `"recharts": "^2.15.1"` - Charts (verify not needed without user dashboards)
- [x] `"swr": "^2.3.2"` - Data fetching for user sessions (verify usage patterns)

### Build-Only Dependencies
- [x] `"@types/jest": "^29.5.14"` - Jest types (if no Jest tests remain)

---

## 🧹 Code Sections to Remove from Existing Files

### Environment Configuration Cleanup
- [x] `.env.local.example` - Remove all Supabase-related variables
- [x] `.env.local.example` - Remove all Stripe API keys
- [x] `.env.local.example` - Remove NextAuth configuration variables
- [x] `.env.local.example` - Remove database connection strings

### Package.json Script Cleanup
- [x] `package.json` - Remove `"test"` script if no tests remain
- [x] `package.json` - Remove `"test:watch"` script if no tests remain

---

## Additional (double check before removal)
- app/conversations
- app/donate
- app/team
- apps/
- apps/components/team
- cypress/
- dev/

---

## Rename
- Give all prds in docs/specs a consecutive file number in the same filename format


## 📊 Components Successfully Transformed (Keep These)

These components have been successfully converted to contact-based functionality:
- ✅ `components/AuthButton.tsx` - Converted to contact button
- ✅ `components/ButtonAccount.tsx` - Converted to contact button  
- ✅ `components/ButtonSignin.tsx` - Converted to contact button
- ✅ `components/ButtonCheckout.tsx` - Converted to contact form
- ✅ `components/ButtonLead.tsx` - Converted to contact button
- ✅ `components/Pricing.tsx` - Updated to use consultation services

---

## 🎯 Files to Keep (Core Functionality)

### Essential Configuration
- ✅ `config.ts` - Updated for consultation model
- ✅ `libs/api.ts` - Transformed for consultation model
- ✅ `libs/resend.ts` - Email service for contact forms

### Active API Routes
- ✅ `app/api/hdi/names/route.ts` - HDI name management
- ✅ `app/api/hdi/download/route.ts` - PDF download functionality

### Core Components
- ✅ All transformed authentication components (now contact buttons)
- ✅ All layout and presentation components

---


## 🔍 Verification Steps

After removals, verify:
1. [x] `bun run build` - Ensure clean build with no errors
2. [x] `bun run lint` - Verify no linting issues
3. [x] Test core website functionality (contact forms, navigation)
4. [x] Verify all consultation-focused components work correctly
5. [x] Check that removed dependencies don't break any imports

