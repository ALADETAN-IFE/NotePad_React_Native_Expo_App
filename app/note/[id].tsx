import { loadOneNote, updateNote } from "@/lib/AsynStorage";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const NoteScreen = () => {
  const navigation = useNavigation();

  const { id } = useLocalSearchParams();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isDeleting, setIsDeleting] = useState<Boolean>(false);

  const fetchNote = async () => {
    try {
      setLoading(true);
      const note = await loadOneNote(id as string);
      // alert(`note found name: ${note.title}`)
      setNote(note);
      setEditingNote(note);
    } catch (error) {
      setError("Error loading note");
      console.error(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNote();
  }, [id]);

  const editNote = async (note: { title: string; content: string; color: string; }) => {
    try {
      const newNote = {
        title: note.title,
        content: note.content,
        color: note.color,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        id: id.toString(),
      };
      console.log("new note", newNote);
      const message = await updateNote(id.toString(), newNote);
      alert(message);
      setIsEditing(false)
      fetchNote();
    } catch (error) {
      console.error("Error adding note:", error);
      alert(error);
    }
  };


  // useEffect(() => {
  //   setIsEditing(false);
  // }, [navigation])
  

  return (
    <SafeAreaView className="flex-1 min-h-[100vh] bg-slate-500 relative">
      <View className="p-4 flex-1">
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text className="text-white bg-black p-3 w-24 rounded-lg">
            {" "}
            Go Back {" "}
          </Text>
        </TouchableWithoutFeedback>
        {
          isEditing && (
        <TouchableWithoutFeedback
          onPress={() => editNote(editingNote!)} > 
          <Text 
          className="text-white bg-black p-3 w-24 rounded-lg absolute right-5 bottom-20 z-10"
          // className="text-white text-center text-lg font-bold"
                     >
                        {" "}
                        Save{" "}
                      </Text>
        </TouchableWithoutFeedback>
          )
        }

        {loading && <Text className="text-white">Loading...</Text>}
        {error && <Text className="text-white">ERROR{error}</Text>}
        {!loading &&
          !error &&
          (note ? (
            <View className="flex-1 w-full gap-3 pt-14">
              {/* <Text className='text-white'>NoteScreen Details for item : {id}</Text> */}
              <TouchableWithoutFeedback onPress={() => setIsEditing(true)}>
                <View className="flex-1 justify-between ">
                <View className="flex-col gap-12 ">
                  {isEditing ? (
                    <>
                      <TextInput
                        multiline
                        textAlignVertical="top"
                        cursorColor={"#fff"}
                        className="text-white text-3xl font-bold p-0"
                        value={editingNote!.title}
                        onChangeText={(text) =>
                          setEditingNote({ ...editingNote!, title: text })
                        }
                      />
                      <TextInput
                        multiline
                        textAlignVertical="top"
                        cursorColor={"#fff"}
                        className="text-white text-xl pl-2 p-0"
                        value={editingNote!.content}
                        onChangeText={(text) =>
                          setEditingNote({ ...editingNote!, content: text })
                        }
                      />
                    </>
                  ) : (
                    <>
                      <Text className="text-white text-3xl font-bold">
                        {note.title}
                      </Text>
                      <Text className="text-white text-xl pl-2 ">
                        {note.content}
                      </Text>
                    </>
                  )}
                </View>
                <View className="flex-col gap-2 ">
                  <Text className="text-white/45">
                    Created At: {note.createdAt}
                  </Text>
                  <Text className="text-white/45">
                    Updated At: {note.updatedAt}
                  </Text>
                </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          ) : (
            <Text className="text-white">Note not found</Text>
          ))}
      </View>
    </SafeAreaView>
  );
};

export default NoteScreen;
