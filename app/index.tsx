import SearchBar from "@/components/SearchBar";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1">
      <View className="w-[90%] h-6 bg-slate-500">
        <SearchBar/>
      </View>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
