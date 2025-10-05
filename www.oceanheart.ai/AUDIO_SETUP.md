# Audio Library Setup Guide

## Quick Start

The audio library feature has been fully implemented! Follow these steps to get it running.

## ✅ What's Already Done

- Database schema created
- API routes implemented
- UI components built with Aceternity
- Member portal navigation updated
- Environment variable configuration updated

## 🚀 Setup Steps

### 1. Environment Variables (Already Set ✅)

Your `.env.local` already has the Turso database credentials. The code now supports both naming conventions:
- `DATABASE_URL` / `DATABASE_AUTH_TOKEN` ✅ (you have these)
- `TURSO_DATABASE_URL` / `TURSO_AUTH_TOKEN` ✅ (you have these too)

**Still needed:**
```env
# Add to .env.local
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

### 2. Get Vercel Blob Token

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to **Storage** → **Blob**
4. Click **Create Database** (if not already created)
5. Copy the `BLOB_READ_WRITE_TOKEN`
6. Add it to your `.env.local`

### 3. Run Database Migration

```bash
npx tsx scripts/migrate-audio.ts
```

This creates two tables:
- `audio_recordings` - Stores audio metadata
- `audio_progress` - Tracks user listening progress

### 4. Clear Cache & Restart

```bash
rm -rf .next
npm run dev
```

### 5. Access the Audio Library

**Member Access:**
- Library: http://localhost:3003/app/audio
- Individual recording: http://localhost:3003/app/audio/[id]

**Admin Access (email must end with @oceanheart.ai):**
- Upload page: http://localhost:3003/app/audio/upload

## 📁 File Structure

```
pheonix.oceanheart.ai/
├── scripts/
│   ├── migrate-audio.ts (migration runner)
│   └── migrations/
│       └── create-audio-recordings.sql
├── src/
│   ├── app/
│   │   ├── api/audio/
│   │   │   ├── route.ts (list, upload)
│   │   │   ├── [id]/route.ts (CRUD)
│   │   │   └── progress/route.ts (tracking)
│   │   └── app/audio/
│   │       ├── page.tsx (library)
│   │       ├── [id]/page.tsx (player)
│   │       └── upload/page.tsx (admin)
│   ├── components/audio/
│   │   ├── AudioPlayer.tsx
│   │   ├── AudioCard.tsx
│   │   ├── CategoryFilter.tsx
│   │   └── UploadForm.tsx
│   └── lib/
│       ├── turso.ts (updated with better error handling)
│       └── audio.ts (utilities)
```

## 🎨 Features

### For Members
- ✅ Browse audio library
- ✅ Filter by category (Meditation, Talks, Teachings, Practices)
- ✅ Search by title/description/tags
- ✅ Custom audio player with waveform
- ✅ Auto-save progress (every 5 seconds)
- ✅ Resume playback where you left off
- ✅ Playback speed control (0.5x - 2x)
- ✅ Volume control
- ✅ 15s skip backward/forward
- ✅ Keyboard shortcuts (Space, arrows, etc.)
- ✅ Mark as complete
- ✅ Related recordings

### For Admins
- ✅ Drag & drop upload
- ✅ Auto-extract audio duration
- ✅ Set title, description, category, tags
- ✅ Publish or save as draft
- ✅ File validation (MP3, M4A, WAV up to 100MB)
- ✅ Upload progress indicator

## 🔧 Technical Details

### Database Tables

**audio_recordings:**
- `id` - Unique identifier
- `title` - Recording title
- `description` - Full description
- `category` - meditation|talk|teaching|practice
- `duration` - Duration in seconds
- `file_url` - Vercel Blob URL
- `file_size` - Size in bytes
- `uploaded_by` - User email
- `is_published` - Boolean
- `listen_count` - Number of listens
- `tags` - JSON array

**audio_progress:**
- `id` - Unique identifier
- `user_id` - NextAuth user ID
- `recording_id` - Foreign key
- `progress_seconds` - Current position
- `completed` - Boolean
- `last_listened_at` - Timestamp

### Admin Access Logic

Admin users are identified by email ending with `@oceanheart.ai`.

To customize, edit these files:
- `src/app/api/audio/route.ts` (line 68)
- `src/app/api/audio/[id]/route.ts` (line 94, 162)
- `src/app/app/audio/upload/page.tsx` (line 26)

### Turso Client Updates

The Turso client (`src/lib/turso.ts`) now:
- ✅ Supports both `DATABASE_URL` and `TURSO_DATABASE_URL`
- ✅ Handles missing credentials gracefully (no errors)
- ✅ Provides helper functions for type-safe operations
- ✅ Logs warnings instead of throwing errors

## 🐛 Troubleshooting

### Error: "URL_INVALID"
**Solution:** The `.next` cache had old code. This is fixed by:
```bash
rm -rf .next
npm run dev
```

### Upload fails
**Check:**
1. Vercel Blob token is set in `.env.local`
2. File is under 100MB
3. File format is MP3, M4A, or WAV
4. You're logged in as admin (@oceanheart.ai email)

### Database errors
**Check:**
1. Turso credentials are in `.env.local`
2. Migration has been run: `npx tsx scripts/migrate-audio.ts`
3. Database is accessible (check Turso dashboard)

### Audio won't play
**Check:**
1. File URL is valid (check browser network tab)
2. Browser supports the audio format
3. No CORS issues (Vercel Blob handles this automatically)

## 🎯 Next Steps

1. **Set up Vercel Blob** and add token to `.env.local`
2. **Run database migration**
3. **Upload your first audio** at `/app/audio/upload`
4. **Test playback** and progress saving
5. **(Optional) Customize admin access** logic
6. **(Optional) Add more categories** in `CategoryFilter.tsx`

## 📝 Notes

- Member portal sidebar already updated with "Audio Library" link
- All components follow Kaishin Method design system
- Fully responsive (mobile, tablet, desktop)
- Keyboard accessible with ARIA labels
- Progress persists across sessions
- Files stored on Vercel Blob CDN for fast delivery

Enjoy your new audio library! 🎧✨
