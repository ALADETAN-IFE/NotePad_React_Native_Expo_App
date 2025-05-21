import AddNoteBtn from "@/components/AddNoteBtn";
import AddNoteForm from "@/components/AddNoteForm";
import NoteCard from "@/components/NoteCard";
import OptionsCard from "@/components/OptionsCard";
import SearchBar from "@/components/SearchBar";
import { createNote, loadAllNote, updateNote } from "@/lib/AsynStorage";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  // [
  //   {
  //     title: "Note 1",
  //     // content: "ore magna aliqua.",
  //     content:
  //       "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     id: "1",
  //     createdAt: new Date().toString(),
  //     updatedAt: new Date().toString(),
  //     color: "bg-red-500",
  //   },
  //   {
  //     title: "Note 2",
  //     // content: "ore magna aliqua.",
  //     content:
  //       "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     id: "2",
  //     createdAt: new Date().toString(),
  //     updatedAt: new Date().toString(),
  //     color: "bg-red-500",
  //   },
  //   {
  //     title: "Note 3",
  //     // content: "ore magna aliqua.",
  //     content:
  //       "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     id: "3",
  //     createdAt: new Date().toString(),
  //     updatedAt: new Date().toString(),
  //     color: "bg-red-500",
  //   },
  //   {
  //     title: "Note 4",
  //     // content: "ore magna aliqua.",
  //     content:
  //       "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     id: "4",
  //     createdAt: new Date().toString(),
  //     updatedAt: new Date().toString(),
  //     color: "bg-red-500",
  //   },
  //   {
  //     title: "Note 5",
  //     // content: "ore magna aliqua.",
  //     content:
  //       "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     id: "5",
  //     createdAt: new Date().toString(),
  //     updatedAt: new Date().toString(),
  //     color: "bg-red-500",
  //   },
  //   {
  //     title: "Note 6",
  //     // content: "ore magna aliqua.",
  //     content:
  //       "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     id: "6",
  //     createdAt: new Date().toString(),
  //     updatedAt: new Date().toString(),
  //     color: "bg-red-500",
  //   },
  //   {
  //     title: "Note 7",
  //     // content: "ore magna aliqua.",
  //     content:
  //       "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     id: "7",
  //     createdAt: new Date().toString(),
  //     updatedAt: new Date().toString(),
  //     color: "bg-red-500",
  //   },
  //   {
  //     title: "Note 8",
  //     // content: "ore magna aliqua.",
  //     content:
  //       "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     id: "8",
  //     createdAt: new Date().toString(),
  //     updatedAt: new Date().toString(),
  //     color: "bg-red-500",
  //   },
  //   {
  //     title: "Note 9",
  //     // content: "ore magna aliqua.",
  //     content:
  //       "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     id: "9",
  //     createdAt: new Date().toString(),
  //     updatedAt: new Date().toString(),
  //     color: "bg-red-500",
  //   },
  //   {
  //     title: "Note 10",
  //     // content: "ore magna aliqua.",
  //     content:
  //       "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     id: "10",
  //     createdAt: new Date().toString(),
  //     updatedAt: new Date().toString(),
  //     color: "bg-red-500",
  //   },
  //   {
  //     title: "Note 11",
  //     // content: "ore magna aliqua.",
  //     content:
  //       "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     id: "11",
  //     createdAt: new Date().toString(),
  //     updatedAt: new Date().toString(),
  //     color: "bg-red-500",
  //   },
  //   {
  //     title: "Note 12",
  //     // content: "ore magna aliqua.",
  //     content:
  //       "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     id: "12",
  //     createdAt: new Date().toString(),
  //     updatedAt: new Date().toString(),
  //     color: "bg-red-500",
  //   },
  //   {
  //     title: "Note 13",
  //     // content: "ore magna aliqua.",
  //     content:
  //       "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     id: "13",
  //     createdAt: new Date().toString(),
  //     updatedAt: new Date().toString(),
  //     color: "bg-red-500",
  //   },
  //   {
  //     title: "Note 14",
  //     // content: "ore magna aliqua.",
  //     content:
  //       "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     id: "14",
  //     createdAt: new Date().toString(),
  //     updatedAt: new Date().toString(),
  //     color: "bg-red-500",
  //   },
  //   {
  //     title: "Note 15",
  //     // content: "ore magna aliqua.",
  //     content:
  //       "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     id: "15",
  //     createdAt: new Date().toString(),
  //     updatedAt: new Date().toString(),
  //     color: "bg-red-500",
  //   },
  // ]
  const [loading, setLoading] = useState<Boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchNotes, setSearchNotes] = useState<Note[]>([]);
  const [emptySearch, setEmptySearch] = useState<boolean>(false);
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [isAddingNote, setIsAddingNote] = useState<boolean>(false);
  const [isEditingNote, setIsEditingNote] = useState<boolean>(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);
  const [isDeletingNote, setIsDeletingNote] = useState<boolean>(false);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);

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

  useEffect(() => {
    fetchNotes();
  }, []);

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

    const editNote = async (note: { title: string; content: string; color: string }) => {
      try {
        const newNote = {
          title: note.title,
          content: note.content,
          color: note.color,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
          id: noteToEdit!.id,
        };
        const message = await updateNote(noteToEdit!.id, newNote);
        alert(message);
        setIsEditingNote(false);
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
    <SafeAreaView className="flex-1 bg-slate-500 min-h-[100vh] relative">
      {
        isAddingNote && (
          <AddNoteForm 
            onCancel={() => setIsAddingNote(false)}
            onSubmit={(note) => addNote(note)}
          />
      )}
      {
        isEditingNote && noteToEdit && (
          <AddNoteForm 
            onCancel={() => setIsEditingNote(false)}
            onSubmit={(note) => editNote(note)}
            main={noteToEdit?.title} 
            about={noteToEdit?.content} 
            style={noteToEdit?.color}
          />
      )}
      <View className="p-4 relative flex-1">
        <Text className="text-white text-3xl text-center mb-1">NotePad</Text>
          <SearchBar onChange={(text: string) => setSearchInput(text)} value={searchInput} />
        {loading && (
          <View className="w-full h-full bg-slate-500 flex-1 justify-center items-center">
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
                {
                  openOptions && (
                    <OptionsCard />
                  )
                }
                <FlatList
                  data={searchNotes.length > 0 ? searchNotes : notes}
                  renderItem={({ item }: { item: Note }) => (
                    // <View>
                      <NoteCard note={item} openOptions={() => setOpenOptions(true)} />
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
        <AddNoteBtn />
      </View>
      </View>
    </SafeAreaView>
  );
}
