import * as Updates from "expo-updates";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface UpdatePopupProps {
  visible: boolean;
  message: string;
  updateAvailable: boolean;
  onClose: () => void;
}

const UpdatePopup: React.FC<UpdatePopupProps> = ({
  visible,
  message,
  updateAvailable,
  onClose,
}) => {
  const handleUpdate = async () => {
    try {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (error) {
      console.error("Error updating app:", error);
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-lg shadow-lg">
          <Text className="text-lg mb-4">{message}</Text>
          {updateAvailable ? (
            <TouchableOpacity
              onPress={handleUpdate}
              className="bg-blue-500 rounded-full px-6 py-2"
            >
              <Text className="text-white text-center">Update Now</Text>
            </TouchableOpacity>
          ) : message !== "Checking for updates..." ? (
            <TouchableOpacity
              onPress={onClose}
              className="bg-blue-500 rounded-full px-6 py-2"
            >
              <Text className="text-white text-center">Close</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default UpdatePopup;
