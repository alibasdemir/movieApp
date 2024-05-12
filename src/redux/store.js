import { configureStore } from '@reduxjs/toolkit';
import myListReducer from './reducers/myListSlice';

const store = configureStore({
  reducer: {
    myList: myListReducer,
  },
});

export default store;
