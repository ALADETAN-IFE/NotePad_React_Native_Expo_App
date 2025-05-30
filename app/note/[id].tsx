import { deleteOneNote, loadOneNote, updateNote } from "@/lib/AsynStorage";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NoteScreen = () => {
  const navigation = useNavigation();

  const { id } = useLocalSearchParams();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isDeleting, setIsDeleting] = useState<Boolean>(false);
  const[isSaving, setIsSaving] = useState<Boolean>(false);

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

  const editNote = async (note: {
    title: string;
    content: string;
    color: string;
  }) => {
    try {
      setIsSaving(true);
      const newNote = {
        title: note.title,
        content: note.content,
        color: note.color,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        id: id.toString(),
      };
      // console.log("new note", newNote);
      const message = await updateNote(id.toString(), newNote);
      alert(message);
      setIsEditing(false);
      fetchNote();
    } catch (error) {
      console.error("Error adding note:", error);
      alert(error);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteNote = async () => {
    setIsDeleting(true);
    setTimeout( async () => {    
      try {
          const message = await deleteOneNote(id.toString());
          alert(message);
          navigation.goBack();
        } catch (error) {
          console.error("Error deleting note:", error);
          alert(error);
        } finally {
          setIsDeleting(false);
        }
    }, 1500);
  }

  return (
    <View className="flex-1 bg-slate-500">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <View className="p-4 flex-1">
        <View className="flex-row justify-between">

          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Text className="text-white cursor-pointer bg-black p-3 px-3.5 rounded-lg">
              {" "}
              Go Back{" "}
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => deleteNote()}>
            <Text className="text-white cursor-pointer bg-red-400 p-3 px-3.5 rounded-lg">
              {
                isDeleting ? " Deleting... " : " Delete "
              }
            </Text>
          </TouchableWithoutFeedback>
        </View>

          <ScrollView
            className="flex-1 mt-4"
            showsVerticalScrollIndicator={false}
          >
            {loading || isDeleting ? (
              <View className="flex-1 h-[90vh] justify-center items-center">
                <ActivityIndicator size="large" color="#fff" />
                <Text className="text-white">Loading...</Text>
              </View>
            ): null}
            {/* {isDeleting && (
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#fff" />
              </View>
            )} */}
            {error && <Text className="text-white">ERROR: {error}</Text>}

            {!loading && !error && !isDeleting && note && (
              <TouchableWithoutFeedback onPress={() => setIsEditing(true)}>
                <View className="flex-col gap-6 mt-4">
                  {isEditing ? (
                    <>
                      <TextInput
                        multiline
                        textAlignVertical="top"
                        cursorColor="#fff"
                        style={{ textAlignVertical: 'top', paddingTop:0 }}
                        className="text-white text-3xl font-bold p-0 min-h-[30px] max-h-none border-none outline-none"
                        value={editingNote!.title}
                        onChangeText={(text) =>
                          setEditingNote({ ...editingNote!, title: text })
                        }
                      />
                      <TextInput
                        multiline
                        textAlignVertical="top"
                        cursorColor="#fff"
                        className="text-white text-xl pl-2 p-0 border-none min-h-[30px] outline-none"
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
                      <Text className="text-white text-xl pl-2">
                        {note.content}
                      </Text>
                    </>
                  )}
                </View>
              </TouchableWithoutFeedback>
            )}
          </ScrollView>
          {!loading && !error && note && (
            <View className="mt-6 p-2 rounded-lg">
              <Text className="text-white/45">
                Created At: {note.createdAt}
              </Text>
              <Text className="text-white/45">
                Updated At: {note.updatedAt}
              </Text>
            </View>
          )}
          {isEditing && (
            <TouchableWithoutFeedback onPress={() => editNote(editingNote!)}>
              <Text className="text-white cursor-pointer bg-green-500 p-3 px-3.5 text-center rounded-lg absolute right-5 bottom-20 z-10">
                {
                  isSaving ? " Saving... " : " Save "
                }
              </Text>
            </TouchableWithoutFeedback>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default NoteScreen;
