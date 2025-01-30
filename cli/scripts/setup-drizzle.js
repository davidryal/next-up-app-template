const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();

// Add Drizzle dependencies
const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
pkg.dependencies['drizzle-orm'] = '^0.29.3';
pkg.dependencies['postgres'] = '^3.4.3';
pkg.devDependencies['drizzle-kit'] = '^0.20.9';
fs.writeFileSync(path.join(projectRoot, 'package.json'), JSON.stringify(pkg, null, 2));

// Create Drizzle schema
const schemaContent = `import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});
`;

// Create Drizzle config
const configContent = `import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
`;

// Create db client
const clientContent = `import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client, { schema });
`;

// Create directories
fs.mkdirSync(path.join(projectRoot, 'src', 'db'), { recursive: true });

// Write files
fs.writeFileSync(path.join(projectRoot, 'src', 'db', 'schema.ts'), schemaContent);
fs.writeFileSync(path.join(projectRoot, 'drizzle.config.ts'), configContent);
fs.writeFileSync(path.join(projectRoot, 'src', 'db', 'index.ts'), clientContent);

// Add example .env
const envContent = `
DATABASE_URL="postgres://user:password@localhost:5432/mydb"
`;

fs.appendFileSync(path.join(projectRoot, '.env.example'), envContent);
fs.appendFileSync(path.join(projectRoot, '.env'), envContent);
