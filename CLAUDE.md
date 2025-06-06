# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Build and Development

```bash
# Install dependencies
yarn install

# Build the project
yarn build

# Run the example
yarn example

# Start development mode
yarn start
```

### Testing and Quality Assurance

```bash
# Run tests (includes linting and example)
yarn test

# Run only tests with verbose output
yarn ava --verbose

# Update test snapshots
yarn update-snapshots

# Run linting
yarn lint

# Check for outdated dependencies
yarn outdated
```

### Publishing

```bash
# Prepare for publishing (runs build)
yarn prepublish

# Publish using np tool
yarn np
```

## Architecture

The `logging` package is a lightweight console logging library designed for Node.js with basic browser support.

### Core Components

1. **Main Logger Implementation (`src/logging.js`):**
   - Creates a logger with different log levels: debug, info, warn, error, fatal, trace
   - Uses chalk for colorized output
   - Uses nicely-format for formatting complex objects
   - Integrates with the debug module for debug-level logs

2. **Browser Implementation (`src/browser.js`):**
   - Simplified version for browser environments
   - Basic implementation to avoid breaking universal builds
   - Does not include colored output or log level formatting

3. **TypeScript Definitions (`index.d.ts`):**
   - Provides type definitions for TypeScript users
   - Defines the Logger interface and its functions

### Usage Pattern

The package follows a factory pattern where `createLogger` is called with a module name to generate a logger instance with various log level methods:

```javascript
import createLogger from 'logging';
const logger = createLogger('ModuleName');
logger.info('message', data);
```

### Environment Configuration

- Debug logs are only visible when the DEBUG environment variable is set (e.g., DEBUG=ModuleName or DEBUG=*)
- Node.js version 4+ is supported
- Uses Babel for transpilation
- Testing is done with AVA