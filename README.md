# Domaniac - Domain Manager (Cloudflare Pages Edition)

A secure, modern domain management application built with React and deployed on Cloudflare Pages with D1 database.

## Features

- 🔐 **Secure Authentication** - JWT-based authentication with password hashing
- 📊 **Domain Tracking** - Track domain expiry dates, registrars, and costs
- 🔔 **Expiry Alerts** - Visual indicators for domains expiring soon
- 🏷️ **Tags & Search** - Organize and search domains easily
- 💾 **Cloud Storage** - All data stored securely in Cloudflare D1 database
- 👥 **Multi-User** - Each user has their own isolated domain list
- 🎨 **Beautiful UI** - Modern, responsive design with dark mode

## Tech Stack

- **Frontend**: React 18, TypeScript, TailwindCSS
- **Backend**: Cloudflare Pages Functions (Serverless)
- **Database**: Cloudflare D1 (SQLite)
- **Authentication**: JWT tokens with Web Crypto API
- **Deployment**: Cloudflare Pages

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Cloudflare account
- Wrangler CLI installed globally: `npm install -g wrangler`

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Create D1 Database**
   ```bash
   npm run db:create
   ```
   
   Copy the `database_id` from the output and update it in `wrangler.toml`:
   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "domain_manager"
   database_id = "your-database-id-here"
   ```

4. **Run database migrations (local)**
   ```bash
   npm run db:migrate:local
   ```

5. **Update environment variables**
   
   Edit `.dev.vars` and set a strong JWT secret:
   ```
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
   ```

6. **Start development server**
   ```bash
   npm run pages:dev
   ```
   
   The app will be available at `http://localhost:8788`

### Production Deployment

1. **Run database migrations (remote)**
   ```bash
   npm run db:migrate:remote
   ```

2. **Set production environment variables**
   ```bash
   wrangler pages secret put JWT_SECRET
   ```
   Enter a strong, random secret when prompted (minimum 32 characters).

3. **Deploy to Cloudflare Pages**
   ```bash
   npm run pages:deploy
   ```

4. **Configure your Pages project**
   - Go to Cloudflare Dashboard → Pages → Your Project
   - Go to Settings → Environment Variables
   - Ensure `JWT_SECRET` is set for production

## Usage

### First Time Setup

1. Navigate to your deployed URL
2. Click "Create one" to register a new account
3. Enter your email and password (minimum 8 characters)
4. You'll be automatically logged in

### Managing Domains

- **Add Domain**: Click "Add Domain" button in the navbar
- **Edit Domain**: Click "Edit" button on any domain card
- **Delete Domain**: Click the trash icon on any domain card
- **Search**: Use the search bar to filter domains by name, registrar, or tags

### Security Features

- Passwords are hashed using SHA-256
- JWT tokens expire after 24 hours
- All API endpoints require authentication
- User data is completely isolated (users can only see their own domains)
- CORS protection enabled
- Security headers configured

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Domains

- `GET /api/domains/list` - Get all domains for authenticated user
- `POST /api/domains/create` - Create new domain
- `PUT /api/domains/update` - Update existing domain
- `DELETE /api/domains/delete?id={id}` - Delete domain

All domain endpoints require `Authorization: Bearer {token}` header.

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
```

### Domains Table
```sql
CREATE TABLE domains (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  registrar TEXT NOT NULL,
  expiry_date TEXT NOT NULL,
  price REAL NOT NULL,
  currency TEXT NOT NULL,
  auto_renew INTEGER NOT NULL,
  notes TEXT,
  tags TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Project Structure

```
domaniac---domain-manager/
├── functions/              # Cloudflare Pages Functions (API)
│   ├── api/
│   │   ├── auth/          # Authentication endpoints
│   │   └── domains/       # Domain management endpoints
│   ├── utils/             # Utility functions
│   └── _middleware.ts     # Global middleware
├── migrations/            # Database migrations
├── src/                   # React application
│   ├── components/        # React components
│   ├── contexts/          # React contexts
│   └── utils/            # Frontend utilities
├── wrangler.toml         # Cloudflare configuration
└── .dev.vars            # Local environment variables
```

## Troubleshooting

### Database not found
Make sure you've created the D1 database and updated the `database_id` in `wrangler.toml`.

### Authentication errors
Ensure `JWT_SECRET` is set in `.dev.vars` for local development and as a Pages secret for production.

### CORS errors
The middleware handles CORS automatically. If you're still seeing errors, check that the middleware is properly configured.

## License

MIT

## Support

For issues or questions, please open an issue on the repository.
