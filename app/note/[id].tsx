import { loadOneNote } from '@/lib/AsynStorage';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NoteScreen = () => {
  const navigation = useNavigation();
//   const noteAll =[
//      {
//     title: "Note 1",
//     // content: "ore magna aliqua.",
//     content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     id: "1",
//     createdAt: new Date().toString(),
//     updatedAt: new Date().toString(),
//     color: "bg-red-500",
//   },
//     {
//     title: "Note 2",
//     // content: "ore magna aliqua.",
//     content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     id: "2",
//     createdAt: new Date().toString(),
//     updatedAt: new Date().toString(),
//     color: "bg-red-500",
//   },
//     {
//     title: "Note 3",
//     // content: "ore magna aliqua.",
//     content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     id: "3",
//     createdAt: new Date().toString(),
//     updatedAt: new Date().toString(),
//     color: "bg-red-500",
//   },
//     {
//     title: "Note 4",
//     // content: "ore magna aliqua.",
//     content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     id: "4",
//     createdAt: new Date().toString(),
//     updatedAt: new Date().toString(),
//     color: "bg-red-500",
//   },
//     {
//     title: "Note 5",
//     // content: "ore magna aliqua.",
//     content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     id: "5",
//     createdAt: new Date().toString(),
//     updatedAt: new Date().toString(),
//     color: "bg-red-500",
//   },
//     {
//     title: "Note 6",
//     // content: "ore magna aliqua.",
//     content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     id: "6",
//     createdAt: new Date().toString(),
//     updatedAt: new Date().toString(),
//     color: "bg-red-500",
//   },
//     {
//     title: "Note 7",
//     // content: "ore magna aliqua.",
//     content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     id: "7",
//     createdAt: new Date().toString(),
//     updatedAt: new Date().toString(),
//     color: "bg-red-500",
//   },
//     {
//     title: "Note 8",
//     // content: "ore magna aliqua.",
//     content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     id: "8",
//     createdAt: new Date().toString(),
//     updatedAt: new Date().toString(),
//     color: "bg-red-500",
//   },
//     {
//     title: "Note 9",
//     // content: "ore magna aliqua.",
//     content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     id: "9",
//     createdAt: new Date().toString(),
//     updatedAt: new Date().toString(),
//     color: "bg-red-500",
//   },
//     {
//     title: "Note 10",
//     // content: "ore magna aliqua.",
//     content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     id: "10",
//     createdAt: new Date().toString(),
//     updatedAt: new Date().toString(),
//     color: "bg-red-500",
//   },
//     {
//     title: "Note 11",
//     // content: "ore magna aliqua.",
//     content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     id: "11",
//     createdAt: new Date().toString(),
//     updatedAt: new Date().toString(),
//     color: "bg-red-500",
//   },
//     {
//     title: "Note 12",
//     // content: "ore magna aliqua.",
//     content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     id: "12",
//     createdAt: new Date().toString(),
//     updatedAt: new Date().toString(),
//     color: "bg-red-500",
//   },
//     {
//     title: "Note 13",
//     // content: "ore magna aliqua.",
//     content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     id: "13",
//     createdAt: new Date().toString(),
//     updatedAt: new Date().toString(),
//     color: "bg-red-500",
//   },
//   {
//   title: "Note 14",
//   // content: "ore magna aliqua.",
//   content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   id: "14",
//   createdAt: new Date().toString(),
//   updatedAt: new Date().toString(),
//   color: "bg-red-500",
//   },
//   {
//   title: "Note 15",
//   // content: "ore magna aliqua.",
//   content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   id: "15",
//   createdAt: new Date().toString(),
//   updatedAt: new Date().toString(),
//   color: "bg-red-500",
//   },
// ]
    const { id } = useLocalSearchParams()
    const [note, setNote] = useState<Note | null>(null);
    const [loading, setLoading] = useState<Boolean>(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchNote = async () => {
          try {
            setLoading(true);
            const note = await loadOneNote(id as string);
            // alert(`note found name: ${note.title}`)
            setNote(note);
          } catch (error) {
            setError("Error loading note");
            console.error(error); 
            alert(error);
          } finally {
            setLoading(false);
          }
            
        }
        fetchNote();
      // const note = noteAll.find((e) => e.id === id);
      // setLoading(true)
      // if (note) {
      //   alert(`note found name: ${note.title}`)
      //   setLoading(false)
      //   setNote(note);
      // }
      // setLoading(false);

      }, [id])
  
  return (
    <SafeAreaView className="flex-1 min-h-[100vh] bg-slate-500">
    <View className='p-4 flex-1'>
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.goBack();
      }}>
        <Text className='text-white bg-black p-3 w-24 rounded-lg'> Go Back </Text>
    </TouchableWithoutFeedback>
    {loading && <Text className='text-white'>Loading...</Text>}
    {error && <Text className='text-white'>ERROR{error}</Text>} 
    {
      !loading && !error && (
        note ? (
          <View className="flex-1 w-full gap-3 pt-14 justify-between">
            {/* <Text className='text-white'>NoteScreen Details for item : {id}</Text> */}
            <View className='flex-col gap-12 '>
              <Text className='text-white text-3xl font-bold'>Title: {note.title}</Text>
              <Text className='text-white text-xl'>Content: {note.content}</Text>
            </View>
            <View className='flex-col gap-2 '>
              <Text className='text-white/45'>Created At: {note.createdAt}</Text>
              <Text className='text-white/45'>Updated At: {note.updatedAt}</Text>
            </View>
          </View>
        ) : (
          <Text className='text-white'>Note not found</Text>
        ))}
    </View>
    </SafeAreaView>
  )
}

export default NoteScreen