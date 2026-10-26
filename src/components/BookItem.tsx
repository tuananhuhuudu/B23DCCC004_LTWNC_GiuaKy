import { memo } from 'react';
import type { BookPreview } from '../types';

interface BookItemProps {
  book: BookPreview;
  onBorrow: (id: string) => void;
}

function BookItem({ book, onBorrow }: BookItemProps) {
  const hetSach = book.available === 0;

  return (
    <li className="book-item">
      <div className="book-top">
        <span className="badge">{book.category}</span>
        <span className={hetSach ? 'stock stock-out' : 'stock'}>
          {hetSach ? 'Hết sách' : `Còn ${book.available}`}
        </span>
      </div>

      <div className="book-body">
        <div className="book-cover">{book.title.charAt(0)}</div>
        <div>
          <h3>{book.title}</h3>
          <p className="book-author">{book.author}</p>
          <p className="book-meta">Năm xuất bản: {book.year}</p>
        </div>
      </div>

      <button className="borrow-button" onClick={() => onBorrow(book.id)} disabled={hetSach}>
        Mượn
      </button>
    </li>
  );
}

export default memo(BookItem);
