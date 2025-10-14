# Test Suite Documentation

This document describes the comprehensive test suite created for the header implementation branch.

## Overview

A complete testing framework has been set up using **Jest** and **React Testing Library** for the Next.js application. The test suite covers all components and utilities added in the header branch with extensive test cases including happy paths, edge cases, and failure conditions.

## Test Setup

### Configuration Files

1. **`package.json`** - Updated with testing dependencies and scripts
   - `@testing-library/jest-dom` - Custom Jest matchers for DOM assertions
   - `@testing-library/react` - React component testing utilities
   - `@testing-library/user-event` - User interaction simulation
   - `jest` - Testing framework
   - `jest-environment-jsdom` - DOM environment for testing

2. **`jest.config.js`** - Jest configuration using Next.js preset
   - Configured for Next.js integration
   - Module path mapping for `@/` imports
   - Coverage collection settings
   - Test environment setup

3. **`jest.setup.js`** - Global test setup
   - Imports `@testing-library/jest-dom` for custom matchers

## Test Commands

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Install dependencies (required before running tests)
npm install
```

## Test Files

### 1. `lib/__tests__/utils.test.ts`

Tests for the `cn` utility function that merges Tailwind CSS classes.

#### Coverage: 46 test cases

#### Test Categories:

- **Happy Path (5 tests)**
  - Multiple class name merging
  - Tailwind conflicting class resolution
  - Conditional class merging
  - Object notation handling
  - String and object notation combination

- **Edge Cases (6 tests)**
  - Empty input handling
  - Null and undefined value handling
  - Falsy value handling (false, 0)
  - Empty string handling
  - Array input processing
  - Nested array handling

- **Tailwind-specific Merging (7 tests)**
  - Padding class conflicts
  - Margin class conflicts
  - Background color conflicts
  - Text color conflicts
  - Non-conflicting class preservation
  - Responsive variant handling
  - Same responsive variant conflicts

- **Complex Scenarios (3 tests)**
  - Component className merging
  - Variant-based styling
  - Multi-source class merging

### 2. `constants.test.ts`

Tests for the `NAV_ITEMs` constant that defines navigation items.

#### Coverage: 17 test cases

#### Test Categories:

- **Structure Validation (4 tests)**
  - Array type verification
  - Item count verification
  - Required property validation
  - Type checking for properties

- **Content Validation (6 tests)**
  - Dashboard item presence and correctness
  - Search item presence and correctness
  - Watchlist item presence and correctness
  - Non-empty href values
  - Non-empty title values
  - Valid URL path format

- **Uniqueness Validation (2 tests)**
  - Unique href values
  - Unique title values

- **Order Validation (2 tests)**
  - Dashboard as first item
  - Correct item ordering

- **Immutability (1 test)**
  - Constant immutability verification

### 3. `components/__tests__/Header.test.tsx`

Tests for the `Header` component.

#### Coverage: 23 test cases

#### Test Categories:

- **Rendering (6 tests)**
  - Component rendering
  - Logo rendering with correct attributes
  - NavItems component integration
  - UserDropdown component integration

- **Structure and Layout (4 tests)**
  - Header element classes
  - Container styling
  - Flexbox layout verification
  - Responsive navigation hiding

- **Logo Link (4 tests)**
  - Link wrapper verification
  - Link styling
  - Logo cursor styling
  - Logo dimensions

- **Accessibility (3 tests)**
  - Semantic header element
  - Logo alt text
  - Tab order maintenance

- **Responsive Behavior (2 tests)**
  - Mobile navigation hiding
  - UserDropdown visibility

- **Component Integration (1 test)**
  - Child component rendering order

- **Edge Cases (2 tests)**
  - Missing logo handling
  - Empty logo src handling

- **CSS Classes (3 tests)**
  - Sticky positioning
  - Custom header class
  - Header wrapper class

### 4. `components/__tests__/NavItems.test.tsx`

Tests for the `NavItems` component with navigation logic.

#### Coverage: 33 test cases

#### Test Categories:

- **Rendering (4 tests)**
  - Component rendering
  - All navigation items display
  - Correct list item count
  - Link href attributes

- **Active State - Root Path (3 tests)**
  - Dashboard active on root
  - Search inactive on root
  - Watchlist inactive on root

- **Active State - Search Path (3 tests)**
  - Search active on /search
  - Search active on nested /search paths
  - Dashboard inactive on search

- **Active State - Watchlist Path (2 tests)**
  - Watchlist active on /watchlist
  - Watchlist active on nested /watchlist paths

- **isActive Function Logic (4 tests)**
  - Exact path matching for root
  - Path prefix matching for non-root
  - Undefined pathname handling
  - Null pathname handling

- **Styling (5 tests)**
  - Base navigation styles
  - Gap classes
  - Font and color classes
  - Hover styles on all links
  - Active class application

- **Accessibility (2 tests)**
  - Semantic list structure
  - Keyboard navigable links

- **Edge Cases (5 tests)**
  - Empty pathname
  - Trailing slash handling
  - Query parameter handling
  - Unknown path handling
  - Case-sensitive path handling

- **Dynamic Updates (1 test)**
  - Active state updates on pathname change

- **Integration with Constants (2 tests)**
  - Rendering from NAV_ITEMs
  - Respecting item order

### 5. `components/__tests__/UserDropdown.test.tsx`

Tests for the `UserDropdown` component with user menu functionality.

#### Coverage: 44 test cases

#### Test Categories:

- **Rendering (7 tests)**
  - Component rendering
  - Avatar with correct initials
  - User name display
  - User email display
  - Logout button
  - Logout icon
  - Mobile navigation

- **User Information Display (4 tests)**
  - Correct user name in both locations
  - Correct user email in both locations
  - Avatar initial extraction
  - Two avatar instances

- **Dropdown Trigger (4 tests)**
  - Ghost variant button
  - Aria-label attribute
  - Styling classes
  - User info in trigger

- **Dropdown Content (5 tests)**
  - Content rendering
  - Width class
  - Label rendering
  - Separator rendering
  - Logout menu item

- **Sign Out Functionality (4 tests)**
  - Router push on logout click
  - Single router push call
  - Navigation to sign-in page
  - Async sign out handling

- **Avatar Styling (4 tests)**
  - Size classes
  - Yellow background
  - Contrasting text color
  - Font styling

- **Responsive Design (4 tests)**
  - Hidden user details on mobile
  - Hidden logout icon on mobile
  - Mobile navigation visibility
  - Separator hiding on mobile

- **Dropdown Menu Styling (5 tests)**
  - Text color on logout item
  - Font styling on logout item
  - Hover and focus styles
  - Cursor pointer
  - Transition classes

- **Accessibility (4 tests)**
  - Accessible button element
  - Proper aria-label
  - Keyboard accessible logout
  - Keyboard navigation support

- **Edge Cases (3 tests)**
  - Single character name handling
  - Missing router error handling
  - Multiple rapid clicks handling

- **User Data Structure (3 tests)**
  - Hardcoded user object
  - User name in multiple locations
  - User email in multiple locations

- **Layout Structure (3 tests)**
  - Flex layout verification
  - Item alignment
  - Gap between elements

- **Component Integration (4 tests)**
  - NavItems in mobile view
  - Dropdown menu component integration
  - Avatar component integration
  - Button component integration

## Test Coverage Summary

| File | Test Cases | Categories |
|------|-----------|-----------|
| lib/utils.ts | 46 | 4 |
| constants.ts | 17 | 5 |
| Header.tsx | 23 | 8 |
| NavItems.tsx | 33 | 10 |
| UserDropdown.tsx | 44 | 13 |
| **Total** | **163** | **40** |

## Testing Best Practices Implemented

1. **Comprehensive Coverage**
   - Happy paths, edge cases, and failure conditions
   - Input validation and boundary testing
   - State management and updates

2. **Descriptive Test Names**
   - Clear "should" statements
   - Organized into logical describe blocks
   - Easy to understand test intentions

3. **Proper Mocking**
   - Next.js components (Link, Image, useRouter, usePathname)
   - UI components (Avatar, Button, Dropdown)
   - Icon libraries (lucide-react)
   - Child components for isolation

4. **Accessibility Testing**
   - ARIA attributes verification
   - Semantic HTML usage
   - Keyboard navigation support
   - Screen reader compatibility

5. **Responsive Design Testing**
   - Mobile-specific class verification
   - Responsive variant testing
   - Breakpoint behavior validation

6. **Component Integration**
   - Child component rendering
   - Prop passing verification
   - Event handling validation

## Running Specific Tests

```bash
# Run tests for a specific file
npm test -- utils.test.ts

# Run tests matching a pattern
npm test -- Header

# Run tests in a specific directory
npm test -- components/__tests__

# Run with verbose output
npm test -- --verbose

# Update snapshots (if any)
npm test -- -u
```

## Coverage Reports

After running `npm run test:coverage`, view the coverage report:

```bash
# Open coverage report in browser
open coverage/lcov-report/index.html

# Or check coverage summary in terminal
```

Coverage is collected for:
- `components/**/*.{ts,tsx}`
- `lib/**/*.{ts,tsx}`
- `app/**/*.{ts,tsx}`

Excluded from coverage:
- Type definition files (`*.d.ts`)
- Node modules
- Next.js build output (`.next`)

## Continuous Integration

These tests are ready to be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run tests
  run: npm test

- name: Generate coverage
  run: npm run test:coverage

- name: Upload coverage
  uses: codecov/codecov-action@v3
```

## Future Enhancements

Potential areas for test expansion:

1. **Integration Tests**
   - Full user flow testing
   - Multi-component interaction
   - Navigation flow validation

2. **Visual Regression Tests**
   - Component snapshot testing
   - Visual diff validation

3. **Performance Tests**
   - Render performance
   - Re-render optimization

4. **E2E Tests**
   - Playwright or Cypress integration
   - Full application flow testing

## Troubleshooting

### Common Issues

1. **Module not found errors**
   ```bash
   npm install
   ```

2. **Test timeout**
   ```bash
   npm test -- --testTimeout=10000
   ```

3. **Mock not working**
   - Check mock is before import
   - Verify mock path matches actual import

4. **Coverage not updating**
   ```bash
   rm -rf coverage
   npm run test:coverage
   ```

## Contributing

When adding new components or features:

1. Create test file in `__tests__` directory
2. Follow existing test structure and naming
3. Cover happy paths, edge cases, and failures
4. Ensure all tests pass before committing
5. Aim for >80% code coverage

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Next.js Testing](https://nextjs.org/docs/testing)