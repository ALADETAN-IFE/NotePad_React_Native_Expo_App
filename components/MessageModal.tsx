import { View, Text, Modal, TouchableOpacity, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";

interface MessageModalProps {
  message: string;
  visible: boolean;
  type?: string;
  handleDelete?: () => void;
  onClose: () => void;
}

const MessageModal = ({ message, visible, type, handleDelete, onClose }: MessageModalProps) => {
   // Local state to control modal's visibility while animating
  const [modalVisibleAnimated, setModalVisibleAnimated] = useState(visible);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setModalVisibleAnimated(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setModalVisibleAnimated(false);
      });
    }
  }, [visible, opacity]);

   return (
    <Modal animationType="none" transparent={true} visible={modalVisibleAnimated}>
      <Animated.View style={{ flex: 1, opacity }}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg shadow-lg">
            <Text className="text-white">{message}</Text>
            {type === "deleteMode" ? (
              <View className="mt-4">
                <Text>Are you sure you want to delete this note?</Text>
                <View className="flex-row justify-between mt-4">
                  <TouchableOpacity
                    className="bg-red-500 rounded-full px-6 py-2 mt-4"
                    onPress={handleDelete}
                  >
                    <Text className="text-white">Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-yellow-500 rounded-full px-6 py-2 mt-4"
                    onPress={onClose}
                  >
                    <Text className="text-yellow-500">Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
//     return (
//     <Modal animationType="fade" transparent={true} visible={visible}>
//       <View className="flex-1 justify-center items-center bg-black/50">
//         <View className="bg-white p-6 rounded-lg shadow-lg">
//           <Text className="text-white">{message}</Text>
//           {type === "deleteMode" ? (
//             <View className="mt-4">
//               <Text>Are you sure you want to delete this note?</Text>
//               <View className="flex-row justify-between mt-4">
//               <TouchableOpacity
//                 className="bg-red-500 rounded-full px-6 py-2 mt-4"
//                 onPress={handleDelete}
//               >
//                 <Text className="text-white">Delete</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 className="bg-yellow-500 rounded-full px-6 py-2 mt-4"
//                 onPress={onClose}
//               >
//                 <Text className="text-yellow-500">Cancel</Text>
//               </TouchableOpacity>
//               </View>
//             </View>
//           ) : null}
//         </View>
//       </View>
//     </Modal>
//   );
};

export default MessageModal;
