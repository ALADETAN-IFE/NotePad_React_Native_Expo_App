import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

interface onpress {
  onpress: () => void;
}

const AddNoteBtn = ({onPress}: onpress) => {
  return (
    <TouchableWithoutFeedback
      onPress={onPress}>
        <View
        className="absolute bottom-0 right-3 bg-blue-600 w-16 h-16 rounded-full p-4 flex justify-center items-center"
        >
          <Text className='text-white text-2xl'>+</Text>
        </View>
    </TouchableWithoutFeedback>
  )
}

export default AddNoteBtn
