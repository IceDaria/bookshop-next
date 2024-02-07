import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IbookData } from "@/components/shared/Types";

interface BookState {
  bookData: IbookData[];
  loading: boolean;
}

const initialState: BookState = {
  bookData: [],
  loading: false,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<IbookData[]>) => {
      state.bookData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setBooks, setLoading } = bookSlice.actions;

// Selector
export const selectBooks = (state: RootState) => state.books.bookData;
export const selectLoading = (state: RootState) => state.books.loading;

export default bookSlice.reducer;