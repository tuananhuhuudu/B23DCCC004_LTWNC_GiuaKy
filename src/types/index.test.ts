import { isApiFailure, isApiSuccess } from './index';
import type { ApiResponse, Book } from './index';

const book: Book = {
  id: 'b1',
  title: 'Lập trình JavaScript',
  author: 'Nguyễn Văn An',
  category: 'CNTT',
  year: 2020,
  available: 2,
  total: 3,
};

describe('type guard', () => {
  test('isApiSuccess nhận ra phản hồi thành công', () => {
    const res: ApiResponse<Book[]> = { ok: true, data: [book] };
    expect(isApiSuccess(res)).toBe(true);
    expect(isApiFailure(res)).toBe(false);
    if (isApiSuccess(res)) {
      expect(res.data).toHaveLength(1);
    }
  });

  test('isApiFailure nhận ra phản hồi lỗi', () => {
    const res: ApiResponse<Book[]> = { ok: false, error: 'Không tải được danh sách sách' };
    expect(isApiFailure(res)).toBe(true);
    expect(isApiSuccess(res)).toBe(false);
    if (isApiFailure(res)) {
      expect(res.error).toBe('Không tải được danh sách sách');
    }
  });
});
