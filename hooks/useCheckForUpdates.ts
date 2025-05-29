import { useEffect } from 'react';
import * as Updates from 'expo-updates';

export function useCheckForUpdates() {
  useEffect(() => {
    const check = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
          console.log("error updating app ", error)
        }
    };
    check();
  }, []);
}
