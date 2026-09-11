# YouTube & TikTok Boost Service

## Overview
A YouTube and TikTok growth service website built with Vite, React, TypeScript, and Tailwind CSS. Uses Supabase for authentication and database.

## Project Structure
```
src/
  ├── components/
  │   ├── ui/          # Shadcn UI components
  │   ├── layout/      # Layout components (Header)
  │   └── features/    # Feature components (ServiceCard, OrderDialog, etc.)
  ├── pages/           # Page components
  ├── contexts/        # React contexts (AuthContext)
  ├── hooks/           # Custom hooks
  ├── lib/             # Utilities, Supabase client, auth service
  └── App.tsx          # Main app component
```

## Running the App
- Development: `npm run dev` (runs on port 5000)
- Build: `npm run build`

## Deployment
- **Replit**: Configured for static deployment
- **Vercel**: https://workspace-rosy-iota.vercel.app

## Environment Variables
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

## Admin Access
Admin status is controlled via `user_profiles` table in Supabase. Set `is_admin = true` for admin users.
