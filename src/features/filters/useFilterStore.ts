import { create } from 'zustand';
import type { CategoryFilter } from '../../types';

interface FilterState {
  keyword: string;
  category: CategoryFilter;
  setKeyword: (keyword: string) => void;
  setCategory: (category: CategoryFilter) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  keyword: '',
  category: 'Tất cả',
  setKeyword: (keyword) => set({ keyword }),
  setCategory: (category) => set({ category }),
}));
