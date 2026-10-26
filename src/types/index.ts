export type Category = 'CNTT' | 'Kinh tế' | 'Ngoại ngữ';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: Category;
  year: number;
  available: number;
  total: number;
}

export type BorrowedBook = Pick<Book, 'id' | 'title' | 'author'>;

export type BookPreview = Omit<Book, 'total'>;

export type CategoryFilter = Category | 'Tất cả';

export type ApiSuccess<T> = { ok: true; data: T };

export type ApiFailure = { ok: false; error: string };

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export function isApiSuccess<T>(res: ApiResponse<T>): res is ApiSuccess<T> {
  return res.ok === true;
}

export function isApiFailure<T>(res: ApiResponse<T>): res is ApiFailure {
  return res.ok === false;
}
