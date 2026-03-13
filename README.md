# NotePad Mobile App

`NotePad` is a React Native + Expo app I built while learning mobile app development.

It is a personal learning project focused on building practical CRUD flows, local persistence, file-based routing, and shipping a real app build.

## Live / Hosted Build

The hosted app is available at:

- https://notepadbyifecodes.apk.com

## Why I Built This

This project was my hands-on path to learning app development end-to-end:

- Designing clean mobile UI with reusable components
- Managing app state in React Native
- Persisting data locally with AsyncStorage
- Implementing create, read, update, and delete operations
- Navigating between screens with Expo Router
- Configuring app updates with Expo Updates / EAS

## Features

- Create notes with title, content, and color selection
- View all notes in a two-column card grid layout
- Search notes by title or content
- Open a note details screen
- Edit and save note content
- Delete notes with confirmation
- View note timestamps (`createdAt`, `updatedAt`)
- Automatic update check prompt on app launch (production builds)

## Tech Stack

- **Framework:** Expo (React Native)
- **Language:** TypeScript
- **Routing:** Expo Router (file-based routing)
- **Storage:** `@react-native-async-storage/async-storage`
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **OTA Updates:** `expo-updates`
- **Build/Release:** EAS Build

## Project Structure

```text
app/
   _layout.tsx          # Root layout, stack navigation, update popup
   index.tsx            # Home screen: list/search/add notes
   note/[id].tsx        # Note details: view/edit/delete a note

components/
   AddNoteBtn.tsx
   AddNoteForm.tsx
   MessageModal.tsx
   NoteCard.tsx
   SearchBar.tsx
   UpdatePopup.tsx

hooks/
   useCheckForUpdates.ts

lib/
   AsynStorage.ts       # Note CRUD helpers using AsyncStorage
   Persist.ts
```

## Getting Started (Local Development)

### Prerequisites

- Node.js (LTS recommended)
- npm
- Expo CLI tooling via `npx`
- Android Studio emulator and/or iOS simulator (Mac for iOS simulator)

### Install Dependencies

```bash
npm install
```

### Run the App

```bash
npm run start
```

Then choose one of:

- `a` for Android emulator
- `i` for iOS simulator
- `w` for web
- or scan the QR code with Expo Go / dev client

## Available Scripts

- `npm run start` – Start Expo server
- `npm run dev` – Start with Expo dev client
- `npm run android` – Launch Android flow
- `npm run ios` – Launch iOS flow
- `npm run web` – Launch web build
- `npm run lint` – Run lint checks
- `npm run build` – Build Android + iOS with EAS
- `npm run buildAndroid` – Build Android with EAS
- `npm run buildiOS` – Build iOS with EAS

## Data Model

Each note is stored with this shape:

```ts
type Note = {
  id: string;
  title: string;
  content: string;
  color: string;
  createdAt: string;
  updatedAt: string;
};
```

Notes are saved in local device storage under the `notes` key.

## Learning Outcomes from This Project

- Building a complete app from idea to deployable build
- Structuring code into screens, components, hooks, and utility layers
- Handling loading, empty, and error UI states
- Implementing lightweight search with debounced input behavior
- Managing update strategy in development vs production modes

## App Configuration

- App Name: `Notepad`
- Package / Bundle ID: `com.ifecodes.notepad`
- Expo project owner: `ifecodes`
- Runtime policy: `appVersion`

## Roadmap / Possible Improvements

- Rich text notes
- Tagging and categories
- Cloud sync + authentication
- Dark/light theme toggle
- Better validation and form UX
- Unit/integration tests

## Author

Built by **IfeCodes** as a learning project for mobile app development.

## License

This project is currently for learning and portfolio purposes.
