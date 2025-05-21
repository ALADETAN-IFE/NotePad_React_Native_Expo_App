import { TextInput, View } from 'react-native';

interface searchProps {
  onChange: (text: string) => void;
  value: string;
}
const SearchBar = ({onChange, value}: searchProps) => {



  return (
    <View className='h-14 w-full justify-center items-center mb-2'>
      
      <TextInput 
        placeholder="Type to search ..." 
        className="w-[90%] h-10 bg-gray-200 rounded-lg p-2.5 mt-1 mb-1 overflow-hidden flex-1 gap-1 placeholder:color-black/65"
        // placeholderTextColor="#000A00"   
        onChangeText={onChange}
        value={value}
      />
    </View>
  )
}

export default SearchBar