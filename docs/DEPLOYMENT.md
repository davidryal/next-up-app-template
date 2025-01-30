# Deployment Guide

## Vercel Deployment (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy

### Environment Variables for Production
```env
DATABASE_URL=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
```

## Docker Deployment (Alternative)
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000

CMD ["node", "server.js"]
```

### Docker Commands
```bash
# Build
docker build -t my-nextjs-app .

# Run
docker run -p 3000:3000 my-nextjs-app
```

## CI/CD Pipeline
GitHub Actions workflow is configured for:
- Linting
- Testing
- Type checking
- Automated deployments to staging/production
