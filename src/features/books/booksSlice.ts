import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchBooks } from '../../api/booksApi';
import type { Book, BorrowedBook } from '../../types';
import { isApiSuccess } from '../../types';

export interface BooksState {
  items: Book[];
  borrowed: BorrowedBook[];
  loading: boolean;
  error: string | null;
  warning: string | null;
}

const initialState: BooksState = {
  items: [],
  borrowed: [],
  loading: false,
  error: null,
  warning: null,
};

export const loadBooks = createAsyncThunk<Book[], boolean | undefined, { rejectValue: string }>(
  'books/loadBooks',
  async (shouldFail, { rejectWithValue }) => {
    const res = await fetchBooks(shouldFail);
    if (isApiSuccess(res)) {
      return res.data;
    }
    return rejectWithValue(res.error);
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    borrowBook(state, action: PayloadAction<string>) {
      const book = state.items.find((b) => b.id === action.payload);
      if (!book || book.available <= 0) {
        return;
      }
      book.available -= 1;
      state.borrowed.push({ id: book.id, title: book.title, author: book.author });
      state.warning = null;
    },
    returnBook(state, action: PayloadAction<string>) {
      const index = state.borrowed.findIndex((b) => b.id === action.payload);
      if (index === -1) {
        return;
      }
      state.borrowed.splice(index, 1);
      const book = state.items.find((b) => b.id === action.payload);
      if (book) {
        book.available += 1;
      }
      state.warning = null;
    },
    setWarning(state, action: PayloadAction<string | null>) {
      state.warning = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Co loi xay ra';
      });
  },
});

export const { borrowBook, returnBook, setWarning } = booksSlice.actions;
export default booksSlice.reducer;
