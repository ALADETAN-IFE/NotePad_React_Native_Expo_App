import AddNoteBtn from "@/components/AddNoteBtn";
import AddNoteForm from "@/components/AddNoteForm";
import NoteCard from "@/components/NoteCard";
import SearchBar from "@/components/SearchBar";
import { createNote, loadAllNote } from "@/lib/AsynStorage";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState<Boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchNotes, setSearchNotes] = useState<Note[]>([]);
  const [emptySearch, setEmptySearch] = useState<boolean>(false);
  const [isAddingNote, setIsAddingNote] = useState<boolean>(false);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const notes = await loadAllNote();
      setNotes(notes);
      setEmptySearch(false);
    } catch (error) {
      setError("Error loading notes");
      console.error(error);
      alert(error);
    } finally{
      setLoading(false);
    }
  };
  // setTimeout(() => {
  //   fetchNotes();
  // }, 500)

  useEffect(() => {
    fetchNotes();
    const unsubscribe = navigation.addListener("focus", () => {
      fetchNotes();
    });
    
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchInput);
    }, 500);
  
    return () => {
      clearTimeout(timeoutId)
    }
  }, [searchInput])
  

    const handleSearch = (text: string) => {
      // Implement search logic here
      if(text.trim() === "" || text.length < 1){
        console.log("empty");
        setSearchNotes([]);
        setEmptySearch(false)
        return
      }
      const note = notes.filter(e=> e.title.includes(text) || e.content.includes(text));
      if(note.length > 0){
        setEmptySearch(false)
        setSearchNotes(note);
      } else{
        setEmptySearch(true)
      }
      console.log(text);
      console.log(searchNotes);
      console.log(emptySearch);
    }

    const addNote = async (note: { title: string; content: string; color: string }) => {
      try {
        const newNote = {
          title: note.title,
          content: note.content,
          color: note.color,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
          id: new Date().toString() + Math.random().toString(),
        };
        const message = await createNote(newNote);
        alert(message);
        setIsAddingNote(false);
        setSearchInput("");
        setSearchNotes([]);
        setEmptySearch(false);
        fetchNotes();
      } catch (error) {
        console.error("Error adding note:", error);
        alert(error)
      }
    };




  return (
    <SafeAreaView className="flex-1 bg-slate-500 min-h-[100vh] relative pb-4">
      {
        isAddingNote && (
          <AddNoteForm 
            onCancel={() => setIsAddingNote(false)}
            onSubmit={(note) => addNote(note)}
          />
      )}
      <View className="p-4 relative flex-1">
        <Text className="text-white text-3xl text-center mb-1">NotePad</Text>
          <SearchBar onChange={(text: string) => setSearchInput(text)} value={searchInput} />
     

         {loading && (
            <View className="h-[90vh] w-full  bg-slate-500 flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#fff" />
              <Text className="text-white">Loading...</Text>
            </View>
          )}
        {error && (
          <View className="w-full h-full bg-slate-500 flex-1 justify-center items-center">
            <Text className="text-white">{error}</Text>
          </View>
        )}

        {!loading && !error && (
          notes.length > 0 ? (
            emptySearch ? (
              <View className="w-full h-full bg-slate-500 flex-1 justify-center items-center">
                <Text className="text-white">Searched note does not exist found</Text>
              </View>
            ) : (
              <View className="flex-1 ">
                <FlatList
                  data={searchNotes.length > 0 ? searchNotes : notes}
                  renderItem={({ item }: { item: Note }) => (
                    // <View>
                      <NoteCard note={item} />
                    // </View>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ padding: 1, paddingBottom: 70 }}
                  numColumns={2}
                  columnWrapperStyle={{ justifyContent: "space-between", gap: 7 }}
                />
              </View>
            )
          ) : (
            <View className="w-full h-full bg-slate-500 flex-1 justify-center items-center">
              <Text className="text-white">No notes found</Text>
            </View>
          )
        )}
        <View>
        <AddNoteBtn onPress={() => setIsAddingNote(true)} />
      </View>
      </View>
    </SafeAreaView>
  );
}
