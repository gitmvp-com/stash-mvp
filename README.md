# Stash MVP - Media Organizer

A simplified MVP version of [Stash](https://github.com/stashapp/stash) - A self-hosted media organizer with tagging support.

## Features

- 📁 **Media Library**: Browse and organize your media collection
- 🏷️ **Tagging System**: Tag your media items for easy organization
- 📊 **Statistics**: View stats about your collection
- 💾 **Local Storage**: All data stored locally in your browser using IndexedDB
- 🎨 **Dark Theme**: Easy on the eyes with a sleek dark interface

## Tech Stack

This MVP is built with the same core technologies as the original Stash frontend:

- **React 17** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Bootstrap 4** - UI components and styling
- **React Router 5** - Client-side routing
- **Formik** - Form management
- **LocalForage** - Offline storage (IndexedDB wrapper)
- **FontAwesome** - Icons

## Getting Started

### Prerequisites

- Node.js 14+ and npm/yarn

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start the development server (runs on port 9999)
npm run dev
# or
yarn dev
```

Open [http://localhost:9999](http://localhost:9999) in your browser.

### Build for Production

```bash
# Build the application
npm run build
# or
yarn build

# Preview the production build
npm run preview
# or
yarn preview
```

## Usage

1. **Add Media**: Click "Add Media" button on the library page
2. **Fill Details**: Enter title, description, thumbnail URL, and tags
3. **Browse**: View your media collection in a grid layout
4. **Tag & Organize**: Use tags to categorize your media
5. **View Stats**: Check your collection statistics

## Differences from Original Stash

This MVP focuses on the core media organization feature:

- ✅ Media library browsing
- ✅ Tagging system
- ✅ Basic CRUD operations
- ✅ Statistics dashboard
- ❌ No backend (uses browser storage instead)
- ❌ No authentication
- ❌ No video playback
- ❌ No metadata scraping
- ❌ No file system scanning
- ❌ No performer/studio management
- ❌ No GraphQL API

## Data Storage

All data is stored locally in your browser using IndexedDB via LocalForage. This means:

- No server required
- Data persists across browser sessions
- Data is private to your browser
- Clearing browser data will delete your collection

## License

This MVP is created for educational purposes, inspired by the original [Stash](https://github.com/stashapp/stash) project.

## Original Project

Check out the full-featured original project: [stashapp/stash](https://github.com/stashapp/stash)
