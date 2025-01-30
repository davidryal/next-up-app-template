# Development Guidelines

## Project Structure
```
project/
├─ src/
│  ├─ app/                   # Next.js App Router
│  │  ├─ layout.tsx         # Root layout with theme
│  │  └─ page.tsx          # Home page with wizard
│  ├─ components/
│  │  ├─ HomePageClient.tsx # Main wizard container
│  │  ├─ ProjectWizard.tsx  # Stack configuration
│  │  ├─ PathSelector.tsx   # Template selection
│  │  └─ ui/               # Shared UI components
│  └─ lib/                 # Shared utilities
├─ public/
│  └─ paths/              # Template markdown files
└─ docs/                  # Documentation
   └─ @SCOPE.md          # Project progress tracking
```

## Core Components

### HomePageClient
- Main wizard container
- Manages template selection
- Coordinates stack configuration

### ProjectWizard
- Stack option configuration
- Complexity-based filtering
- Command generation

### PathSelector
- Template browsing and selection
- Markdown parsing for templates
- Feature display

## Development Workflow

1. **Template Updates**
   - Add markdown files in `/public/paths`
   - First line is title
   - Include features and target audience

2. **Stack Options**
   - Update arrays in `ProjectWizard.tsx`
   - Include complexity levels
   - Maintain consistent structure

3. **Testing**
   ```bash
   # Install dependencies
   npm install

   # Run development server
   npm run dev

   # Build for production
   npm run build
   ```

## Best Practices

1. **Code Organization**
   - Keep components focused and small
   - Use TypeScript for type safety
   - Follow existing patterns

2. **UI/UX**
   - Maintain dark mode support
   - Keep wizard flow intuitive
   - Use consistent styling

3. **Documentation**
   - Update @SCOPE.md for changes
   - Keep README.md current
   - Document new features
