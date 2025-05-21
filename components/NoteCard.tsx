import { navigate } from "expo-router/build/global-state/routing";
import { Text, TouchableOpacity } from "react-native";

const NoteCard = ({ note, openOptions }: { note: Note, openOptions: (note: Note) => void }) => {
  return (
    <TouchableOpacity
      className={`w-[47%] h-[120px] text-white ${note.color} rounded-lg p-2.5 mt-1 mb-1 gap-4 relative`} 
      onPress={()=> { navigate({ pathname: "/note/[id]", params: { id: note.id } }) }} >
        <Text className="text-white text-2xl" numberOfLines={1} ellipsizeMode="tail">
          {note.title}
        </Text>
        <Text className="text-white text-base" numberOfLines={2} ellipsizeMode="tail">
          {note.content}
        </Text>
        <Text className="text-white text-2xl absolute top-1 right-2" onPress={() => openOptions(note)}>...</Text>
    </TouchableOpacity>
  );
};

export default NoteCard;
