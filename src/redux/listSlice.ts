// redux/listSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '../types/movie';

interface ListState {
  list: Movie[];
}

const initialState: ListState = {
  list: [],
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addToList: (state, action: PayloadAction<Movie>) => {
      const exists = state.list.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.list.push(action.payload);
      }
    },
    removeFromList: (state, action: PayloadAction<Movie>) => {
      state.list = state.list.filter((item) => item.id !== action.payload.id);
    },
    setList: (state, action: PayloadAction<Movie[]>) => {
      state.list = action.payload;
    },
  },
});

export const { addToList, removeFromList, setList } = listSlice.actions;
export default listSlice.reducer;
