import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
    subject: string;
}

const initialState: FiltersState = {
  subject: 'Architecture', // Начальная категория по умолчанию
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSubject(state, action: PayloadAction<string>) {
      state.subject = action.payload;
    },
  },
});

export const { setSubject } = filterSlice.actions;

export default filterSlice.reducer;