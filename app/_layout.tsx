import UpdatePopup from "@/components/UpdatePopup";
import { useCheckForUpdates } from "@/hooks/useCheckForUpdates";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  const { updateMessage, isUpdateAvailable } = useCheckForUpdates();
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#64748b" }}>
        <UpdatePopup
          visible={modalVisible}
          message={updateMessage}
          updateAvailable={isUpdateAvailable}
          onClose={() => setModalVisible(false)}
        />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="note/[id]" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </>
  );
}
