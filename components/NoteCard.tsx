import { navigate } from "expo-router/build/global-state/routing";
import { Text, TouchableOpacity } from "react-native";

const NoteCard = ({ note }: { note: Note }) => {
  return (
    <TouchableOpacity
      className={`w-[47%] h-[120px] text-white ${note.color} rounded-lg p-2.5 mt-1 mb-5 gap-4`} 
      onPress={()=> { navigate({ pathname: "/note/[id]", params: { id: note.id } }) }} >
        <Text className="text-white text-2xl" numberOfLines={1} ellipsizeMode="tail">
          {note.title}
        </Text>
        <Text className="text-white text-base" numberOfLines={2} ellipsizeMode="tail">
          {note.content}
        </Text>
    </TouchableOpacity>
  );
};

export default NoteCard;
