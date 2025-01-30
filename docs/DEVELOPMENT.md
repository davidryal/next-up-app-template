# Development Guidelines

## Project Structure
```
project/
├─ src/
│  ├─ app/                   # Next.js App Router
│  │  ├─ (auth)/            # Auth-required routes
│  │  ├─ api/               # API routes
│  │  └─ layout.tsx         # Root layout
│  ├─ components/
│  │  ├─ ui/               # Reusable UI components
│  │  └─ features/         # Feature-specific components
│  ├─ lib/                 # Shared utilities
│  │  ├─ auth/            # Authentication utilities
│  │  ├─ db/              # Database utilities
│  │  └─ utils/           # General utilities
│  ├─ hooks/              # Custom React hooks
│  └─ types/              # TypeScript types
├─ prisma/
│  └─ schema.prisma       # Database schema
└─ public/                # Static assets
```

## Tech Stack
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- ESLint and Prettier for code quality

## Best Practices
1. **Code Organization**
   - Use feature-based folder structure
   - Keep components small and focused
   - Implement proper TypeScript types

2. **State Management**
   - Use React Query for server state
   - React Context for global UI state
   - Local state for component-specific data

3. **Testing**
   - Write unit tests for utilities
   - Component tests with React Testing Library
   - Integration tests for critical paths

4. **Performance**
   - Implement proper code splitting
   - Use Next.js Image optimization
   - Minimize client-side JavaScript
