import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import { useFilterStore } from '../features/filters/useFilterStore';
import type { CategoryFilter } from '../types';

const categories: CategoryFilter[] = ['Tất cả', 'CNTT', 'Kinh tế', 'Ngoại ngữ'];

export default function SearchFilterBar() {
  const books = useAppSelector((s) => s.books.items);
  const keyword = useFilterStore((s) => s.keyword);
  const category = useFilterStore((s) => s.category);
  const setKeyword = useFilterStore((s) => s.setKeyword);
  const setCategory = useFilterStore((s) => s.setCategory);

  const counts = useMemo(() => {
    return categories.map((c) => ({
      name: c,
      count: c === 'Tất cả' ? books.length : books.filter((b) => b.category === c).length,
    }));
  }, [books]);

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Tìm theo tên sách hoặc tác giả"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div className="chip-row">
        {counts.map((c) => (
          <button
            key={c.name}
            className={category === c.name ? 'chip active' : 'chip'}
            onClick={() => setCategory(c.name)}
          >
            {c.name}
            <span className="chip-count">{c.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
