import reducer, { borrowBook, returnBook, loadBooks } from './booksSlice';
import type { BooksState } from './booksSlice';
import type { Book } from '../../types';

const book: Book = {
  id: 'b1',
  title: 'Lập trình JavaScript',
  author: 'Nguyễn Văn An',
  category: 'CNTT',
  year: 2020,
  available: 1,
  total: 2,
};

function makeState(overrides: Partial<BooksState> = {}): BooksState {
  return {
    items: [{ ...book }],
    borrowed: [],
    loading: false,
    error: null,
    warning: null,
    ...overrides,
  };
}

describe('booksSlice', () => {
  test('borrowBook giảm số bản còn lại và thêm vào danh sách đang mượn', () => {
    const state = reducer(makeState(), borrowBook('b1'));
    expect(state.items[0].available).toBe(0);
    expect(state.borrowed).toHaveLength(1);
    expect(state.borrowed[0].id).toBe('b1');
  });

  test('borrowBook không làm gì khi sách đã hết bản', () => {
    const state = reducer(makeState({ items: [{ ...book, available: 0 }] }), borrowBook('b1'));
    expect(state.items[0].available).toBe(0);
    expect(state.borrowed).toHaveLength(0);
  });

  test('returnBook tăng số bản còn lại và bỏ khỏi danh sách đang mượn', () => {
    const borrowedState = makeState({
      items: [{ ...book, available: 0 }],
      borrowed: [{ id: 'b1', title: book.title, author: book.author }],
    });
    const state = reducer(borrowedState, returnBook('b1'));
    expect(state.items[0].available).toBe(1);
    expect(state.borrowed).toHaveLength(0);
  });

  test('loadBooks.pending bật loading và xoá lỗi cũ', () => {
    const state = reducer(makeState({ error: 'lỗi cũ' }), loadBooks.pending('', false));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('loadBooks.fulfilled lưu danh sách sách', () => {
    const state = reducer(
      makeState({ items: [], loading: true }),
      loadBooks.fulfilled([book], '', false)
    );
    expect(state.loading).toBe(false);
    expect(state.items).toHaveLength(1);
  });

  test('loadBooks.rejected lưu thông báo lỗi', () => {
    const action = loadBooks.rejected(null, '', false, 'Không tải được danh sách sách');
    const state = reducer(makeState({ loading: true }), action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Không tải được danh sách sách');
  });
});
