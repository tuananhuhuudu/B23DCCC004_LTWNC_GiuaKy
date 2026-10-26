import type { Middleware } from '@reduxjs/toolkit';
import { borrowBook, setWarning } from '../features/books/booksSlice';
import type { RootState } from './index';

export const MAX_BORROW = 3;

export const borrowLimitMiddleware: Middleware = (store) => (next) => (action) => {
  if (borrowBook.match(action)) {
    const state = store.getState() as RootState;
    if (state.books.borrowed.length >= MAX_BORROW) {
      return next(setWarning(`Bạn chỉ được mượn tối đa ${MAX_BORROW} cuốn cùng lúc`));
    }
  }
  return next(action);
};
