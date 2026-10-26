import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookItem from './BookItem';
import type { Book } from '../types';

const book: Book = {
  id: 'b1',
  title: 'Lập trình JavaScript',
  author: 'Nguyễn Văn An',
  category: 'CNTT',
  year: 2020,
  available: 2,
  total: 3,
};

describe('BookItem', () => {
  test('hiển thị đúng thông tin sách', () => {
    render(<BookItem book={book} onBorrow={jest.fn()} />);
    expect(screen.getByText('Lập trình JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Nguyễn Văn An')).toBeInTheDocument();
    expect(screen.getByText('CNTT')).toBeInTheDocument();
    expect(screen.getByText('Năm xuất bản: 2020')).toBeInTheDocument();
    expect(screen.getByText('Còn 2')).toBeInTheDocument();
  });

  test('click Mượn gọi onBorrow với đúng id', async () => {
    const onBorrow = jest.fn();
    const user = userEvent.setup();
    render(<BookItem book={book} onBorrow={onBorrow} />);
    await user.click(screen.getByRole('button', { name: 'Mượn' }));
    expect(onBorrow).toHaveBeenCalledTimes(1);
    expect(onBorrow).toHaveBeenCalledWith('b1');
  });

  test('nút Mượn bị vô hiệu hoá khi hết bản', () => {
    render(<BookItem book={{ ...book, available: 0 }} onBorrow={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Mượn' })).toBeDisabled();
    expect(screen.getByText('Hết sách')).toBeInTheDocument();
  });
});
