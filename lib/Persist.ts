// import { createStore } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { combineReducers } from 'redux';
// import notesReducer from './AsynStorage'; // Adjust path as needed

// // Redux Persist Config
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

// const rootReducer = combineReducers({
//   notes: notesReducer, // Add your other reducers here
//   // other reducers
// });

// // Persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Create store with persisted reducer
// const store = createStore(persistedReducer);
// const persistor = persistStore(store);

// export { store, persistor };
