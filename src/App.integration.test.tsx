import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import booksReducer, { loadBooks } from './features/books/booksSlice';
import { borrowLimitMiddleware } from './store/borrowLimitMiddleware';
import { ThemeProvider } from './context/ThemeContext';
import { useFilterStore } from './features/filters/useFilterStore';
import App from './App';

function renderApp() {
  const store = configureStore({
    reducer: { books: booksReducer },
    middleware: (gdm) => gdm().concat(borrowLimitMiddleware),
  });
  return render(
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  );
}

beforeEach(() => {
  window.history.pushState({}, '', '/');
  useFilterStore.setState({ keyword: '', category: 'Tất cả' });
});

test('tải danh sách, lọc, mượn tối đa 3 cuốn và trả sách', async () => {
  const user = userEvent.setup();
  renderApp();

  expect(screen.getByText('Đang tải...')).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText('Lập trình JavaScript')).toBeInTheDocument());

  const sachHet = screen.getByText('Cấu trúc dữ liệu và giải thuật').closest('li')!;
  expect(sachHet.querySelector('button')).toBeDisabled();

  await user.click(screen.getByRole('button', { name: /^Ngoại ngữ/ }));
  await waitFor(() => expect(screen.queryByText('Lập trình JavaScript')).not.toBeInTheDocument());
  expect(screen.getByText('Luyện thi TOEIC')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /^Tất cả/ }));
  await waitFor(() => expect(screen.getByText('Lập trình JavaScript')).toBeInTheDocument());

  const muon = (title: string) =>
    user.click(screen.getByText(title).closest('li')!.querySelector('button')!);

  await muon('Lập trình JavaScript');
  await muon('Nhập môn React');
  await muon('Kinh tế vi mô');
  expect(screen.getByText('Sách đang mượn (3/3)')).toBeInTheDocument();

  await muon('Nguyên lý marketing');
  expect(screen.getByText('Bạn chỉ được mượn tối đa 3 cuốn cùng lúc')).toBeInTheDocument();
  expect(screen.getByText('Sách đang mượn (3/3)')).toBeInTheDocument();

  await user.click(screen.getAllByRole('button', { name: 'Trả' })[0]);
  expect(screen.getByText('Sách đang mượn (2/3)')).toBeInTheDocument();
});

test('tìm kiếm có debounce 300ms và không phân biệt hoa thường', async () => {
  const user = userEvent.setup();
  renderApp();
  await waitFor(() => expect(screen.getByText('Lập trình JavaScript')).toBeInTheDocument());

  await user.type(screen.getByPlaceholderText('Tìm theo tên sách hoặc tác giả'), 'toeic');
  await waitFor(() => expect(screen.queryByText('Lập trình JavaScript')).not.toBeInTheDocument());
  expect(screen.getByText('Luyện thi TOEIC')).toBeInTheDocument();
});

test('tìm kiếm được khi gõ không dấu', async () => {
  const user = userEvent.setup();
  renderApp();
  await waitFor(() => expect(screen.getByText('Lập trình JavaScript')).toBeInTheDocument());

  await user.type(screen.getByPlaceholderText('Tìm theo tên sách hoặc tác giả'), 'lap trinh');
  await waitFor(() => expect(screen.queryByText('Nhập môn React')).not.toBeInTheDocument());
  expect(screen.getByText('Lập trình JavaScript')).toBeInTheDocument();
});

test('trang thống kê hiển thị biểu đồ số đầu sách theo thể loại', async () => {
  const user = userEvent.setup();
  renderApp();
  await waitFor(() => expect(screen.getByText('Lập trình JavaScript')).toBeInTheDocument());

  await user.click(screen.getByRole('link', { name: 'Thống kê' }));
  await waitFor(() => expect(screen.getByRole('heading', { name: 'Thống kê' })).toBeInTheDocument());

  expect(screen.getByTitle('CNTT: 4 đầu sách')).toBeInTheDocument();
  expect(screen.getByTitle('Kinh tế: 3 đầu sách')).toBeInTheDocument();
  expect(screen.getByTitle('Ngoại ngữ: 3 đầu sách')).toBeInTheDocument();
});

test('mượn nhiều bản của cùng một cuốn thì gộp thành một dòng', async () => {
  const user = userEvent.setup();
  renderApp();
  await waitFor(() => expect(screen.getByText('Lập trình JavaScript')).toBeInTheDocument());

  const nutMuon = () =>
    screen.getByText('Tiếng Anh chuyên ngành CNTT').closest('li')!.querySelector('button')!;

  await user.click(nutMuon());
  await user.click(nutMuon());

  expect(screen.getByText('Sách đang mượn (2/3)')).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: 'Trả' })).toHaveLength(1);
  expect(screen.getByText('2 bản')).toBeInTheDocument();
  const theB7 = screen.getByText('Tiếng Anh chuyên ngành CNTT').closest('li')!;
  expect(theB7).toHaveTextContent('Còn 3');
});

test('hiển thị thông báo lỗi khi API thất bại', async () => {
  const store = configureStore({ reducer: { books: booksReducer } });
  render(
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  );
  await store.dispatch(loadBooks(true));
  await waitFor(() =>
    expect(screen.getByText('Không tải được danh sách sách')).toBeInTheDocument()
  );
});
