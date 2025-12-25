# Quick Start Guide - Domaniac Wrangler Pages

## 🚀 Get Started in 5 Minutes

### Step 1: Install Wrangler (if not already installed)
```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare
```bash
wrangler login
```

### Step 3: Create Database
```bash
npm run db:create
```

**Important**: Copy the `database_id` from the output and paste it into `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "domain_manager"
database_id = "PASTE_YOUR_DATABASE_ID_HERE"  # ← Update this!
```

### Step 4: Run Database Migrations
```bash
npm run db:migrate:local
```

### Step 5: Start Development Server
```bash
npm run pages:dev
```

Visit: **http://localhost:8788**

---

## 🧪 Testing the App

1. **Register**: Create a new account with email and password
2. **Add Domain**: Click "Add Domain" and fill in the details
3. **Edit Domain**: Click "Edit" on any domain card
4. **Delete Domain**: Click the trash icon
5. **Search**: Use the search bar to filter domains
6. **Logout**: Click logout and try logging back in

---

## 🌍 Deploy to Production

### Step 1: Set Production Secret
```bash
wrangler pages secret put JWT_SECRET
```
Enter a strong random secret (minimum 32 characters)

### Step 2: Run Remote Migrations
```bash
npm run db:migrate:remote
```

### Step 3: Deploy
```bash
npm run pages:deploy
```

Your app will be live at: `https://domaniac-domain-manager.pages.dev`

---

## 🔑 Important Notes

- **JWT_SECRET**: Must be set for both local (`.dev.vars`) and production (Pages secret)
- **Database ID**: Must be updated in `wrangler.toml` after creating D1 database
- **First User**: No data migration from old localStorage - users must re-add domains
- **Security**: Passwords are hashed, tokens expire after 24 hours

---

## 🆘 Troubleshooting

**"Database not found"**
→ Make sure you updated `database_id` in `wrangler.toml`

**"Authentication failed"**
→ Check that `JWT_SECRET` is set in `.dev.vars` (local) or Pages secrets (production)

**"CORS error"**
→ Middleware should handle this automatically - check browser console for details

**"Cannot find module"**
→ Run `npm install` to install dependencies

---

## 📖 Full Documentation

See [README.md](file:///Users/yf/Downloads/domaniac---domain-manager/README.md) for complete documentation.
