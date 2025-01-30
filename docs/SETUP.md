# Project Setup Guide

## Prerequisites
- Node.js 18+
- npm 9+
- Git

## Quick Start

### Windows Setup
```powershell
# Clone and setup
git clone <your-repo-url>
cd <project-name>
npm run setup

# Configure environment
cp .env.example .env.local
# Edit .env.local with your credentials
```

### Environment Variables
```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
```

## Development
```powershell
# Start development server
npm run dev

# Database operations
npm run db:generate  # Generate Prisma client
npm run db:push     # Push schema changes
npm run db:studio   # Open Prisma Studio

# Testing
npm run test        # Run tests
npm run test:watch  # Watch mode
```
