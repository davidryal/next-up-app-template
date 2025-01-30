# Database Setup

This template supports three database options, each with its own strengths and use cases.

## Prisma + PostgreSQL

### Overview
- Full-featured ORM with type safety
- Great for complex data relationships
- Robust migration system
- Excellent TypeScript integration

### Setup
1. Environment variables:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```

2. Generate Prisma client:
```bash
npx prisma generate
npx prisma db push
```

3. Usage example:
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    name: 'John Doe',
  },
});

// Query
const users = await prisma.user.findMany({
  where: {
    email: {
      contains: '@example.com',
    },
  },
});
```

## Drizzle

### Overview
- Lightweight and high-performance
- Type-safe SQL
- No code generation needed
- Edge-ready

### Setup
1. Environment variables:
```env
DATABASE_URL="postgres://user:password@localhost:5432/mydb"
```

2. Run migrations:
```bash
npm run db:generate
npm run db:push
```

3. Usage example:
```typescript
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Create
const user = await db.insert(users).values({
  email: 'user@example.com',
  name: 'John Doe',
});

// Query
const userList = await db.select().from(users).where(
  eq(users.email, 'user@example.com')
);
```

## MongoDB + Mongoose

### Overview
- Flexible schema design
- Great for rapid prototyping
- Rich query API
- Real-time capabilities

### Setup
1. Environment variables:
```env
MONGODB_URI="mongodb://localhost:27017/myapp"
```

2. Connect to database:
```typescript
import mongoose from 'mongoose';

await mongoose.connect(process.env.MONGODB_URI!);
```

3. Usage example:
```typescript
import { User } from '@/models/User';

// Create
const user = await User.create({
  email: 'user@example.com',
  name: 'John Doe',
});

// Query
const users = await User.find({
  email: /example.com$/,
});
```

## Best Practices

1. **Environment Variables**
   - Never commit real credentials
   - Use `.env.example` for documentation
   - Set up different databases for development/production

2. **Type Safety**
   - All database options provide TypeScript support
   - Use zod for runtime validation
   - Keep models and types in sync

3. **Performance**
   - Use connection pooling in production
   - Implement proper indexes
   - Monitor query performance

4. **Security**
   - Sanitize all inputs
   - Use prepared statements
   - Implement proper access control
