# FIILIN — Claude Code Setup Guide

This directory contains the migrated FIILIN codebase, cleaned of all Lovable platform dependencies.

## What was removed

- `@lovable.dev/cloud-auth-js` — caused Lovable branding during Google OAuth
- `@lovable.dev/mcp-js` — Lovable MCP server
- `@lovable.dev/vite-tanstack-config` — replaced with standard Vite + TanStack Start
- All MCP routes: `/mcp`, `/.mcp/*`, `/.well-known/oauth-protected-resource`, `/.lovable/oauth/consent`
- `src/lib/lovable-error-reporting.ts` — Lovable error tracking
- `src/integrations/lovable/` — Lovable cloud integration
- Lovable AI gateway (`ai.gateway.lovable.dev`) — replaced with Anthropic Claude API
- Lovable Stripe proxy (`connector-gateway.lovable.dev/stripe`) — replaced with direct Stripe API

## Required environment variables

Create a `.env` file (never commit it — it is gitignored):

```
# Supabase (user-owned project: nodkmntqxhyoklxkihiw)
SUPABASE_URL=https://nodkmntqxhyoklxkihiw.supabase.co
SUPABASE_PUBLISHABLE_KEY=<your publishable/anon key>
SUPABASE_SERVICE_ROLE_KEY=<your service role key>

# Vite client-side (exposed to browser)
VITE_SUPABASE_URL=https://nodkmntqxhyoklxkihiw.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your publishable/anon key>
VITE_PAYMENTS_CLIENT_TOKEN=<stripe publishable key for client>

# AI (Anthropic)
ANTHROPIC_API_KEY=<your Anthropic API key>

# Stripe
STRIPE_SANDBOX_API_KEY=<stripe test secret key>
STRIPE_LIVE_API_KEY=<stripe live secret key>
PAYMENTS_SANDBOX_WEBHOOK_SECRET=<stripe test webhook secret>
PAYMENTS_LIVE_WEBHOOK_SECRET=<stripe live webhook secret>

# Email
RESEND_API_KEY=<your Resend API key>
```

## Supabase setup

1. Run all 42 migrations on your Supabase project `nodkmntqxhyoklxkihiw`:
   ```
   supabase db push
   ```

2. In the Supabase dashboard, configure Google OAuth:
   - Authentication → Providers → Google
   - Set Client ID and Client Secret from Google Cloud Console
   - Add `https://fiilin.fi/auth/callback` to Redirect URLs
   - Also add your Vercel preview URL pattern: `https://*.vercel.app/auth/callback`

3. Admin role is assigned automatically via DB trigger for `hans@brai.fi`.
   No code changes needed.

## Development

```bash
bun install
bun run dev
```

## Deployment (Vercel)

1. Create a new Vercel project connected to `BraiGAIP/fiilin`
2. Framework preset: **Other** (TanStack Start handles its own build)
3. Build command: `bun run build`
4. Output directory: `.output/public` (or as configured by TanStack Start)
5. Add all environment variables from `.env` to Vercel project settings

## Files copied from Lovable (no Lovable dependencies)

These files were copied as-is — no modifications needed:
- All `src/routes/` files except `mcp.ts`, `[.mcp]/*`, `[.well-known]/*`, `[.]lovable.oauth.consent.tsx`
- All `src/components/` files except those using `@lovable.dev/cloud-auth-js`
- `src/lib/` files (admin.ts, subscription.ts, stripe.ts)
- `src/integrations/supabase/types.ts`
- `src/styles.css`, `src/i18n/`, `src/hooks/`
- `supabase/functions/`, `supabase/migrations/`
- `public/` assets (icons, etc.)

## Files NOT to migrate (delete)

- `.lovable/` directory
- `src/integrations/lovable/`
- `src/lib/lovable-error-reporting.ts`
- `src/lib/mcp/`
- `AGENTS.md`
