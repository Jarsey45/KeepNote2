import { renderHook } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce';
import { act } from 'react';

describe('useDebounce Hook', () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	it('should return the initial value immediately', () => {
		const { result } = renderHook(() => useDebounce('initial', 500));
		expect(result.current).toBe('initial');
	});

	it('should debounce value updates', () => {
		const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
			initialProps: { value: 'initial', delay: 500 },
		});

		expect(result.current).toBe('initial');

		// update value fast
		rerender({ value: 'updated', delay: 500 });

		// value should still be initial
		expect(result.current).toBe('initial');

		// wait for debounce value update
		act(() => {
			jest.advanceTimersByTime(500);
		});

		// now value should be updated
		expect(result.current).toBe('updated');
	});

	it('should handle multiple rapid updates', () => {
		const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
			initialProps: { value: 'initial', delay: 500 },
		});

		// update many times, fast
		rerender({ value: 'update1', delay: 500 });
		rerender({ value: 'update2', delay: 500 });
		rerender({ value: 'update3', delay: 500 });

		// value shouldn't change yet
		expect(result.current).toBe('initial');

		// wait for debounce value update
		act(() => {
			jest.advanceTimersByTime(500);
		});

		// now value should be updated to newst value
		expect(result.current).toBe('update3');
	});

	it('should handle different delay times', () => {
		const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
			initialProps: { value: 'initial', delay: 1000 },
		});

		// update value smaller delay
		rerender({ value: 'updated', delay: 200 });

		// value shouldn't change yet
		expect(result.current).toBe('initial');

		// Fast forward 200ms
		act(() => {
			jest.advanceTimersByTime(200);
		});

		// Now the value should be updated
		expect(result.current).toBe('updated');
	});

	it('should cleanup timeout on unmount', () => {
		const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
		const { unmount } = renderHook(() => useDebounce('test', 500));

		unmount();

		expect(clearTimeoutSpy).toHaveBeenCalled();
	});
});
