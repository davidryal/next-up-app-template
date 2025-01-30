# Project Reversion Guide

## Target State to Restore
We need to restore the codebase to the state it was in before the "paths" to "prompts" renaming attempt. This was when:

1. The UI had a clean 3-column responsive layout with:
   - Column 1: Template selection with info buttons
   - Column 2: Stack configuration
   - Column 3: Platform selection (Web/Mobile/Desktop - NOT deployment platforms)

2. Key Features Working:
   - Proper markdown rendering for template descriptions
   - Info buttons using info-circle icon
   - Platform selector showing:
     - Web (Standard Next.js)
     - Mobile (React Native with Expo)
     - Desktop (Tauri Integration)
   - Command display section at bottom

3. Component Structure:
   - `page.tsx`: Server component for data fetching
   - `PathSelector.tsx`: For template selection
   - `ProjectWizard.tsx`: For stack configuration
   - `DynamicIcon.tsx`: For consistent icon usage
   - `layout.tsx`: With favicon footer

## What Broke
1. The platform selector was incorrectly changed to show deployment platforms (Vercel/Local/AWS) instead of target platforms (Web/Mobile/Desktop)
2. Client/Server component separation was lost causing event handler errors
3. Grid layout was disrupted
4. Markdown content rendering was simplified and lost formatting

## Files Needing Restoration
1. `src/app/page.tsx`
   - Needs proper server/client split
   - Original grid layout
   - Correct platform options

2. `src/components/PathSelector.tsx`
   - Original markdown rendering
   - Info button functionality
   - Proper icon usage

3. `src/app/layout.tsx`
   - Footer with favicon

4. `src/lib/paths.ts`
   - Original paths interface
   - File reading functionality

5. `src/components/DynamicIcon.tsx`
   - Correct icon mappings
   - Info-circle icon usage

## Project Reversion Status

## Progress Made
- ✅ Fixed hydration issues in components by properly handling ReactNode/ReactElement types
- ✅ Restored original 5-step stack configuration with progress bar
- ✅ Fixed beginner/expert mode sorting functionality
- ✅ Restored platform selection UI in the third column
- ✅ Fixed command box placement at bottom of page
- ✅ Restored template info popup functionality with markdown support

## Current Issues
1. Template Loading [⚒️]
   - Templates don't load dynamically from `/public/paths`
   - .md files in `/public/paths` not properly formatted and displayed
   - Need to implement proper markdown parsing and display

2. Command Box Issues [⚒️]
   - Sometimes appears twice (once in center column where it shouldn't be)
   - Should always be visible at bottom regardless of selection state
   - Command generation needs to be more consistent

## Next Steps for Future Agent
1. Fix Template Loading:
   - Implement proper file system reading for `/public/paths`
   - Parse markdown content from .md files
   - Display formatted content in template info popups

2. Fix Command Box:
   - Remove duplicate command box from center column
   - Ensure command box is always visible at bottom
   - Implement proper command generation based on all selections

3. Type Safety:
   - Ensure consistent return types across components
   - Properly type all props and state

4. UI Polish:
   - Ensure consistent spacing and layout
   - Fix any remaining hydration issues
   - Maintain dark mode compatibility

## Component Status
- HomePageClient: ⚒️ In Progress (needs command box fix)
- PathSelector: ⚒️ In Progress (needs template loading fix)
- ProjectWizard: ✅ Completed
- DynamicIcon: ✅ Completed
- ThemeProvider: ✅ Completed
- ThemeToggle: ✅ Completed

## Next Steps
1. Create proper client/server component separation
2. Restore correct platform selector options
3. Fix grid layout
4. Restore markdown rendering
5. Fix event handler errors

## Important Notes
- The platform selector should show Web/Mobile/Desktop options, NOT deployment platforms
- Need to maintain proper client/server component separation
- Must preserve the original 3-column responsive layout
- Should keep command display section at bottom spanning all columns
