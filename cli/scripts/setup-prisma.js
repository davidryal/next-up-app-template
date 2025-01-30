const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = process.cwd();

// Add Prisma dependencies
const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
pkg.dependencies['@prisma/client'] = '^5.8.0';
pkg.devDependencies['prisma'] = '^5.8.0';
fs.writeFileSync(path.join(projectRoot, 'package.json'), JSON.stringify(pkg, null, 2));

// Create Prisma schema
const prismaSchema = `
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// Add your models here
`;

fs.writeFileSync(path.join(projectRoot, 'prisma/schema.prisma'), prismaSchema);

// Add example .env
const envContent = `
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
`;

fs.appendFileSync(path.join(projectRoot, '.env.example'), envContent);
fs.appendFileSync(path.join(projectRoot, '.env'), envContent);
