import * as Updates from "expo-updates";
import { useEffect, useState } from "react";

export function useCheckForUpdates() {
  const [updateMessage, setUpdateMessage] = useState<string>(
    "Checking for updates..."
  );
  const [isUpdateAvailable, setIsUpdateAvailable] = useState<boolean>(false);

  useEffect(() => {
    const check = async () => {
      try {
        if(__DEV__) { setUpdateMessage("Development mode - skipping update check."); return; } // Skip update check in development mode
        console.log('Runtime version:', Updates.runtimeVersion);
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          setUpdateMessage("Update available. Reload to update.");
          setIsUpdateAvailable(true);
        } else {
          setUpdateMessage("You're using the latest version.");
          setIsUpdateAvailable(false);
        }
      } catch (error) {
        console.error("Error checking for updates", error);
        setUpdateMessage("Error checking for updates.");
        setIsUpdateAvailable(false);
      }
    };
    check();
  }, []);

  return { updateMessage, isUpdateAvailable };
}
