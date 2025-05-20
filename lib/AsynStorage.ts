import AsyncStorage from '@react-native-async-storage/async-storage';

export const createNote = async (note: Note) => {
  try {
    const savedNotes = await AsyncStorage.getItem('notes');
    const notes = savedNotes ? JSON.parse(savedNotes) : [];

    // Add the new note to the array
    notes.push(note);

    await AsyncStorage.setItem('notes', JSON.stringify(notes));
    return `${note.title} note saved successfully`;
  } catch (error) {
    console.error('Error saving note', error);
     return 'Error saving note';
  }
};

export const loadOneNote = async (id: string ) => {
  try {
    const savedNotes = await AsyncStorage.getItem('notes');
    if (savedNotes !== null) {
      const parsedNotes = JSON.parse(savedNotes);
      const note = parsedNotes.find((e: Note) => e.id === id);
      if (note) {
        return note;
      }
    }
    return {};
  } catch (error) {
    console.error('Error loading one note', error);
    return '';
  }
};

export const loadAllNote = async () => {
  try {
    const savedNotes = await AsyncStorage.getItem('notes');
    if (savedNotes !== null) {
      return JSON.parse(savedNotes);
    }
    return [];
  } catch (error) {
    console.error('Error loading note', error);
    return 'Error loading note';
  }
};

export const deleteOneNote = async (id: string | number) => {
  try {
      const savedNotes = await AsyncStorage.getItem('notes');
    if (savedNotes) {
      const notes = JSON.parse(savedNotes);
      const filteredNotes = notes.filter((e: Note) => e.id !== id);

      await AsyncStorage.setItem('notes', JSON.stringify(filteredNotes));
      return 'Note deleted successfully';
    }
    return 'Note not found';
  } catch (error) {
    console.error('Error deleting note', error);
  }
};

export const deleteAllNote = async () => {
  try {
    await AsyncStorage.removeItem('notes');
    const allNotes = await AsyncStorage.getAllKeys();
    if (allNotes.length === 0) {
      console.log('All notes deleted');
      return "All notes deleted";
    }
  } catch (error) {
    console.error('Error deleting all note', error);
  }
};

