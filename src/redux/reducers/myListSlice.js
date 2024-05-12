import { createSlice } from '@reduxjs/toolkit';

export const myListSlice = createSlice({
  name: 'myList',
  initialState: {
    movies: [],
  },
  reducers: {
    addToMyList: (state, action) => {
      state.movies.push(action.payload);
    },
    removeFromMyList: (state, action) => {
      state.movies = state.movies.filter(movieId => movieId !== action.payload);
    },
  },
});

export const { addToMyList, removeFromMyList } = myListSlice.actions;

export default myListSlice.reducer;
