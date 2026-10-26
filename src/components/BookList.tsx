import { useCallback, useMemo } from 'react';
import BookItem from './BookItem';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { borrowBook } from '../features/books/booksSlice';
import { useFilterStore } from '../features/filters/useFilterStore';
import { useDebounce } from '../hooks/useDebounce';

function boDau(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

export default function BookList() {
  const books = useAppSelector((s) => s.books.items);
  const dispatch = useAppDispatch();
  const keyword = useFilterStore((s) => s.keyword);
  const category = useFilterStore((s) => s.category);
  const debouncedKeyword = useDebounce(keyword, 300);

  const filtered = useMemo(() => {
    const kw = boDau(debouncedKeyword.trim());
    return books.filter((b) => {
      const matchKeyword =
        kw === '' || boDau(b.title).includes(kw) || boDau(b.author).includes(kw);
      const matchCategory = category === 'Tất cả' || b.category === category;
      return matchKeyword && matchCategory;
    });
  }, [books, debouncedKeyword, category]);

  const handleBorrow = useCallback(
    (id: string) => {
      dispatch(borrowBook(id));
    },
    [dispatch]
  );

  if (filtered.length === 0) {
    return <p className="empty">Không tìm thấy sách nào</p>;
  }

  return (
    <ul className="book-list">
      {filtered.map((book) => (
        <BookItem key={book.id} book={book} onBorrow={handleBorrow} />
      ))}
    </ul>
  );
}
