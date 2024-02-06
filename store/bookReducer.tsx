import { IbookData } from "@/components/shared/Types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
export const selectBooks = (state: { books: BookState }) => state.books.bookData;
export const selectLoading = (state: { books: BookState }) => state.books.loading;

export default bookSlice.reducer;