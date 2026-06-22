# Islamic Levels PWA — Security & Quality Audit Report

**Project:** islamic-levels  
**Repo:** https://github.com/soufianegliouineai-cpu/islamic-levels  
**Production:** https://islamic-levels.vercel.app  
**Audit Date:** 2026-06-21  
**Status:** Prior P0/P1 issues partially addressed; this audit corrects several gaps left by the previous round and adds new hardening.

---

## Executive Summary

| Category | Previous Claim | Actual State | Severity |
|---|---|---|---|
| Local password hashing | "SHA-256 + salt" | Trivial 32-bit hash (DJB2-like) | **P0** |
| Supabase password hashing | "Removed hardcoded key" (good) | Still uses trivial hash | **P0** |
| CSP | Headers present | Blocks Aladhan prayer API; allows `unsafe-inline`/`unsafe-eval` | **P0/P1** |
| XSS in family screen | "escapeHtml added" | Family names/requests rendered raw | **P0** |
| Undefined function | — | `showNotification()` called but not defined | **P1** |
| Service Worker push | Handles push | `e.data.json()` can crash | **P1** |
| BroadcastChannel fallback | Works cross-tab | Creates unbounded localStorage keys | **P2** |
| Prayer API | Functional | No URL encoding / no response validation | **P2** |

---

## 1. Cryptography — Password Hashing Is Broken (P0)

### Finding
Both `app.js::hashLocalPassword()` and `supabase.js::SupabaseService.hashPassword()` use a custom 32-bit integer hash:

```js
let hash = 0;
for (let i = 0; i < password.length; i++) {
  const char = password.charCodeAt(i);
  hash = ((hash << 5) - hash) + char;
  hash = hash & hash;
}
return 'h_' + Math.abs(hash).toString(36);
```

This is **not** a password hash. It is trivially reversible via lookup tables/rainbow tables and suffers from collisions.

### Expected
SHA-256 (or stronger) with a unique salt per user, implemented via the Web Crypto API (`crypto.subtle.digest`).

### Fix Applied
- Replaced both functions with `crypto.subtle.digest('SHA-256', ...)` + Base64 encoding.
- Each registration generates a random 16-byte salt stored with the user record.
- `users` table in `supabase-schema.sql` now includes `password_salt TEXT`.
- Backward compatibility: on login, if the stored hash still uses the old `'h_...'` format, the password is validated with the old hash so existing users are not locked out, and the record is migrated to SHA-256 + salt on success.

---

## 2. Content Security Policy (P0 / P1)

### Finding
`vercel.json` CSP `connect-src` only permits:

```
connect-src 'self' https://*.supabase.co wss://*.supabase.co;
```

`prayer-times.js` fetches from `https://api.aladhan.com/v1/timings/...`. This request is blocked by CSP and prayer times will never load on the live site. Console will report a CSP violation.

Also, `script-src 'self' 'unsafe-inline' 'unsafe-eval'` and `style-src 'self' 'unsafe-inline'` are present. These are required by the current inline-event-handler architecture, but they significantly weaken XSS protection.

### Fix Applied
- Added `https://api.aladhan.com` to `connect-src`.
- Added a non-essential note in the report that a future build step (Vite/Webpack) should move inline scripts/styles to external files and replace `onclick="..."` with event listeners, so `unsafe-inline` can be removed.

---

## 3. XSS in Family & Messaging (P0 / P1)

### Finding
While dashboard/messaging escapes some strings with `escapeHtml()`, the family screen (`renderFamily`) renders user-controlled data raw:

- Family/member names (`m.name`)
- Request child name (`req.childName`)
- Request message (`req.message`)
- Notification titles contain raw names in `family.js`

This means a family member with a name like `<img src=x onerror=alert(1)>` will execute JavaScript when the family screen renders.

### Fix Applied
- Escaped all user-controlled strings displayed in `renderFamily`.
- Added escaping in `family.js` notification titles/messages before display.
- Added `escapeHtml()` calls for `duaCategories`, `adhkarItems`, and other dynamic blocks where data originates from the user via prompts or localStorage.

---

## 4. JavaScript-in-Attribute Escaping Confusion (P1)

### Finding
Several `onclick` handlers embed IDs using `escapeHtml()`:

```js
onclick="openChat(\'' + escapeHtml(member.id) + '\')"
```

`escapeHtml()` is meant for HTML text, not JavaScript string literals. If an ID contained `&`, it would become `&amp;` inside the JS string and break the handler.

### Fix Applied
- Introduced `escapeJsString()` helper for attribute contexts.
- Applied it to all dynamic IDs embedded in `onclick` attributes.
- This is a defense-in-depth fix because current IDs are generated with safe characters (`child-${Date.now()}`, `parent-${Date.now()}`).

---

## 5. Undefined Function `showNotification()` (P1)

### Finding
`app.js::checkSupabaseSetup()` calls:

```js
showNotification('⏳ جاري التحقق...', 'يرجى الانتظار');
```

No `showNotification` function is defined in the project. This throws a `ReferenceError` when the user triggers the Supabase check flow.

### Fix Applied
Added a global `showNotification(title, body)` helper that delegates to `notificationService.showNotification()` when available, falling back to a polished inline toast otherwise.

---

## 6. Service Worker Push Crash (P1)

### Finding
`sw.js` handles push with:

```js
const data = e.data.json();
```

If a push payload is malformed, the service worker errors and may be terminated.

### Fix Applied
Wrapped push parsing in `try/catch`, with safe fallback notification text.

---

## 7. Unbounded localStorage Pollution (P2)

### Finding
`family.js::broadcastSync()` writes:

```js
localStorage.setItem('family-sync-' + Date.now(), JSON.stringify(data));
```

These keys are never cleaned up, causing localStorage to grow indefinitely.

### Fix Applied
Replaced the per-message timestamp key with a single rotating key (`family-sync-latest`) that is overwritten on every broadcast.

---

## 8. Prayer Times Robustness (P2)

### Finding
`prayer-times.js` builds the Aladhan URL via raw string concatenation and does not validate the JSON shape before accessing `data.data.timings`.

### Fix Applied
- Used `URLSearchParams` for query parameters.
- Added `response.ok` check and explicit `data?.data?.timings?.Fajr` validation.

---

## 9. Form Validation (P2)

### Finding
- Registration does not validate email format or name length.
- Family creation/join prompts accept arbitrary input.
- Login has no rate limiting against brute force.

### Fix Applied
- Re-used `InputValidator` from `premium-enhancements.js` during registration.
- Trimmed and length-limited family/member names.
- Added a lightweight per-email attempt counter with exponential backoff in `login()`.

---

## 10. Other Observations

| Issue | Severity | Notes |
|---|---|---|
| No `robots.txt` or `404.html` | P3 | Added basic files. |
| `theme-color` meta is static | P3 | Updated dynamically in `updateTheme()`. |
| `manifest.json` scope missing | P3 | Added `scope: "/"`. |
| No unit tests | P3 | Documented in report. |
| `data-theme="light"` hardcoded | P3 | Could detect `prefers-color-scheme`; out of scope for this patch. |

---

## Files Modified

1. `app.js` — secure hashing, XSS escaping, form validation, rate limiting, `showNotification`, dynamic theme-color.
2. `supabase.js` — secure hashing with salt.
3. `supabase-schema.sql` — added `password_salt` column.
4. `family.js` — input trimming, escaping, localStorage cleanup.
5. `prayer-times.js` — URL encoding, response validation.
6. `sw.js` — push payload try/catch.
7. `vercel.json` — added Aladhan API to CSP.
8. `manifest.json` — added `scope`.
9. `index.html` — updated `theme-color` handling (dynamic via JS).
10. `robots.txt` — new file.
11. `404.html` — new SPA fallback.
12. `AUDIT-REPORT-2026-06-21.md` — this report.

---

## Remaining Work

1. **Remove CSP `unsafe-inline`/`unsafe-eval`**: Refactor inline event handlers (`onclick="..."`) to event listeners registered in JS after DOM render, then tighten CSP.
2. **Lighthouse run**: Run DevTools Lighthouse on the live URL to measure LCP/CLS/accessibility.
3. **Real-device testing**: iOS Safari / Android Chrome install flow, vibration, audio, push permission.
4. **Supabase schema execution**: Run the updated `supabase-schema.sql` in the Supabase dashboard and configure `window.SUPABASE_URL` / `window.SUPABASE_KEY` injection.
5. **Unit tests**: Add tests for `hashLocalPassword`, `escapeHtml`, date utilities, and prayer-time parsing.
6. **Build tooling**: Introduce a bundler (Vite) to enable hashed assets, code-splitting, and automatic integrity hashes.
