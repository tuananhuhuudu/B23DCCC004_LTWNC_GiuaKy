import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('chỉ cập nhật giá trị sau khi hết thời gian chờ', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'a' },
    });

    expect(result.current).toBe('a');

    rerender({ value: 'ab' });
    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(299);
    });
    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe('ab');
  });
});
