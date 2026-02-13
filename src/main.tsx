import { StrictMode } from "react";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const hasValidKey = PUBLISHABLE_KEY && PUBLISHABLE_KEY !== "YOUR_PUBLISHABLE_KEY";
const isDevelopment = import.meta.env.DEV;

if (!hasValidKey && isDevelopment) {
  console.warn(
    "⚠️ Clerk Publishable Key not set. Please:\n" +
    "1. Get your key from: https://dashboard.clerk.com/last-active?path=api-keys\n" +
    "2. Update VITE_CLERK_PUBLISHABLE_KEY in .env.local\n" +
    "3. Restart your dev server\n" +
    "The app will run but authentication features won't work until the key is set."
  );
}

const root = createRoot(document.getElementById("root")!);

if (hasValidKey) {
  // Render with ClerkProvider when valid key is provided
  root.render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY!} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    </StrictMode>
  );
} else {
  // Render without ClerkProvider when no valid key (auth buttons won't show)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
