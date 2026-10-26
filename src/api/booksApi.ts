import type { ApiResponse, Book } from '../types';

const books: Book[] = [
  { id: 'b1', title: 'Lập trình JavaScript', author: 'Nguyễn Văn An', category: 'CNTT', year: 2020, available: 3, total: 3 },
  { id: 'b2', title: 'Cấu trúc dữ liệu và giải thuật', author: 'Trần Thị Bình', category: 'CNTT', year: 2018, available: 0, total: 2 },
  { id: 'b3', title: 'Nhập môn React', author: 'Lê Văn Cường', category: 'CNTT', year: 2022, available: 2, total: 4 },
  { id: 'b4', title: 'Kinh tế vi mô', author: 'Phạm Thị Dung', category: 'Kinh tế', year: 2019, available: 1, total: 3 },
  { id: 'b5', title: 'Nguyên lý marketing', author: 'Hoàng Văn Em', category: 'Kinh tế', year: 2021, available: 4, total: 4 },
  { id: 'b6', title: 'Quản trị doanh nghiệp', author: 'Nguyễn Thị Giang', category: 'Kinh tế', year: 2017, available: 0, total: 1 },
  { id: 'b7', title: 'Tiếng Anh chuyên ngành CNTT', author: 'Đỗ Văn Hải', category: 'Ngoại ngữ', year: 2020, available: 5, total: 5 },
  { id: 'b8', title: 'Tiếng Nhật sơ cấp', author: 'Vũ Thị Lan', category: 'Ngoại ngữ', year: 2016, available: 2, total: 2 },
  { id: 'b9', title: 'Luyện thi TOEIC', author: 'Bùi Văn Minh', category: 'Ngoại ngữ', year: 2023, available: 1, total: 3 },
  { id: 'b10', title: 'Cơ sở dữ liệu', author: 'Trần Văn Nam', category: 'CNTT', year: 2015, available: 2, total: 2 },
];

export function fetchBooks(shouldFail = false): Promise<ApiResponse<Book[]>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({ ok: false, error: 'Không tải được danh sách sách' });
      } else {
        resolve({ ok: true, data: books.map((b) => ({ ...b })) });
      }
    }, 500);
  });
}
