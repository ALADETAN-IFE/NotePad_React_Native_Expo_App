import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import "./global.css";

export default function RootLayout() {
  return (
    <>
       {/* Light content (white text/icons) for dark backgrounds */}
      <StatusBar style="light" backgroundColor="#64748b" /> {/* bg-slate-500 in Tailwind */}
      <Stack >
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="note/[id]"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
}
