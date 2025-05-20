import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const NoteScreen = () => {
    const { id } = useLocalSearchParams()
  
  return (
    <View className="flex-1 bg-slate-600 items-center justify-center">
      <Text className='text-white'>NoteScreen Details for item : {id}</Text>
    </View>
  )
}

export default NoteScreen