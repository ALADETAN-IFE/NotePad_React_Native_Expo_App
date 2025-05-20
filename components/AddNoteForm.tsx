import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const COLORS = [
  'bg-yellow-400',
  'bg-blue-400',
  'bg-green-400',
  'bg-pink-400',
  'bg-purple-400',
  'bg-orange-400',
]

interface FormProps {
  onSubmit?: (note: { title: string; content: string; color: string }) => void
  onCancel?: () => void
}

const AddNoteForm = ({ onSubmit, onCancel }: FormProps) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [color, setColor] = useState(COLORS[0])

  const handleSubmit = () => {
    if (title.trim() && content.trim()) {
      onSubmit?.({ title, content, color })
      setTitle('')
      setContent('')
      setColor(COLORS[0])
    }
  }

  return (
    <View className='absolute h-[101vh] w-full justify-center items-center z-10 bg-slate-300/25 bottom-0'>
      <View className="bg-white w-11/12 rounded-xl p-6 shadow-lg">
        <Text className="text-xl font-bold mb-4 text-gray-700">Add Note</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 mb-3 text-base"
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          maxLength={50}
        />
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 mb-3 text-base h-20"
          placeholder="Content"
          value={content}
          onChangeText={setContent}
          multiline
          maxLength={200}
        />
        <View className="flex-row mb-4">
          {COLORS.map((c) => (
            <TouchableOpacity
              key={c}
              className={`w-7 h-7 rounded-full mr-2 border-2 ${c} ${color === c ? 'border-black' : 'border-transparent'}`}
              onPress={() => setColor(c)}
            />
          ))}
        </View>
        <View className="flex-row justify-end">
          <TouchableOpacity
            className="bg-gray-300 px-4 py-2 rounded-lg mr-2"
            onPress={onCancel}
          >
            <Text className="text-gray-700">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-blue-500 px-4 py-2 rounded-lg"
            onPress={handleSubmit}
          >
            <Text className="text-white">Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default AddNoteForm