# Next Platform Template

A flexible, feature-rich template for building cross-platform applications with Next.js.

## Quick Start

```bash
# Clone the template
git clone https://github.com/yourusername/next-platform-template.git
cd next-platform-template

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:3000` and use the interactive wizard to configure your project.

## Features

### 1. Database Options
- **Prisma + PostgreSQL**: Full-featured ORM with type safety
- **Drizzle**: Lightweight and high-performance
- **MongoDB + Mongoose**: Flexible schema design

### 2. Authentication Methods
- **Firebase Auth**: Complete auth solution with OAuth providers
- **Magic Links**: Passwordless email authentication
- **Web3/Wallet**: Crypto wallet authentication

### 3. Platform Support
- **Web**: Standard web application
- **Mobile**: iOS and Android apps with Expo
- **Desktop**: Windows, macOS, and Linux apps with Tauri

## CLI Usage

You can also use our CLI tool directly:

```bash
npx create-next-platform-app my-app --database prisma --auth firebase --platforms web,mobile
```

Available options:
- `--database`: prisma, drizzle, mongodb, none
- `--auth`: firebase, magic-links, web3, none
- `--platforms`: web, mobile, desktop (comma-separated)

## Documentation

For detailed documentation about each feature:

1. [Database Setup](./docs/database.md)
2. [Authentication](./docs/auth.md)
3. [Platform-Specific Features](./docs/platforms.md)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.