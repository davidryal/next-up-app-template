# Stack Configuration Guide

## Technology Stack Overview
- **Frontend**: Next.js 15 with React 18
- **Styling**: Tailwind CSS
- **State Management**: React Hooks, Context API
- **Testing**: Jest, React Testing Library
- **Theming**: next-themes

## Customization Options

### 💡 Package Addition
You can add custom packages to your project using the following guidelines:

1. **Frontend Packages**:
   ```bash
   npm install <package-name>
   ```

2. **Development Packages**:
   ```bash
   npm install -D <package-name>
   ```

### 💡 Workflow Extensions
- **Static Site Generation (SSG)**: Configured out of the box with Next.js
- **WordPress Integration**: 
  - Use `getStaticProps` for WordPress data fetching
  - Install `@wordpress/api` for advanced integration

### 💡 Prompt Generation
Use the following command to generate a starter prompt:
```bash
npx generate-project-prompt
```

### 💡 Clean Command
To remove unused dependencies and optimize project:
```bash
npm run clean
```

## Configuration Files
- `next.config.js`: Core Next.js configuration
- `.babelrc`: Babel transpilation settings
- `jest.config.js`: Testing configuration
- `tailwind.config.js`: Styling and design system

## Best Practices
- Keep dependencies minimal
- Use TypeScript for type safety
- Leverage code splitting and lazy loading
- Implement comprehensive testing

## Troubleshooting
- Check `@DEVELOPMENT.md` for detailed workflow information
- Use `npm run lint` to catch potential issues
