# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the Claspo Components library - a collection of web components built on the `@claspo/renderer` framework. Components are used for creating interactive widgets, forms, and gamified experiences on the Claspo platform.

## Essential Commands

```bash
# Development with watch mode
npm run dev

# Run tests
npm run test

# Run linting
npm run lint

# Build for production
npm run build

# Full build pipeline (install, lint, test, build)
npm run bundle

# Build and publish to GitHub npm registry
npm run package
```

**Requirements:** Node.js >= 18.16.0

## Architecture Overview

### Component Structure
Each component follows this pattern:
```
src/Sys[ComponentName]Component/
├── Sys[ComponentName].manifest.js    # Component configuration
├── Sys[ComponentName]Component.js    # Main component class
├── assets/                          # Images and resources
└── [supporting files]               # Styles, templates, utilities
```

### Base Classes
- **WcElement**: Base class for standard components
- **BaseGamifiedComponent**: Base class for gamified components (extends WcElement)

### Key Component Patterns

1. **Component Definition**: Components self-register using a static `define` property
2. **Props Access**: Use `this.getProps()` to access component properties
3. **Service Access**: Platform services available via `this.services`:
   - `trackingService` - Analytics
   - `eventEmitter` - Event bus
   - `form` - Form handling
   - `context` - Data context
   - `prizePoolFactory` - Gamification

### Component Lifecycle
- `connectedCallback()` - Initialize component
- `disconnectedCallback()` - Cleanup
- `observeProps()` - React to prop changes

### Creating New Components

1. Create component directory: `src/Sys[ComponentName]Component/`
2. Create manifest file defining component configuration
3. Extend `WcElement` or `BaseGamifiedComponent`
4. Implement required lifecycle methods
5. Components are automatically built as separate modules

### Build System
- Webpack 5 builds each component as a separate module
- Components exposed globally as `window.clComponentClass_[ComponentName]`
- Assets automatically copied during build
- Shadow DOM used for style encapsulation

### Testing
- Jest with jsdom for DOM testing
- Run individual tests: `npm test -- path/to/test.spec.js`
- Tests use ES6+ with Babel transformation

### Common Development Tasks

When modifying components:
1. Always check the component's manifest file for configuration
2. Ensure proper prop observation for reactive updates
3. Use platform services instead of direct DOM manipulation where possible
4. Follow existing patterns for event handling and state management
5. Test both desktop and mobile adaptive styles
