import { debounce } from '@/utils/_debounce';

describe('debounce utility', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('should call the function after the specified delay', () => {
		const mockFn = jest.fn();
		const debouncedFn = debounce(mockFn, 1000);

		debouncedFn();
		expect(mockFn).not.toHaveBeenCalled();

		jest.advanceTimersByTime(1000);
		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('should only call the function once if called multiple times within delay', () => {
		const mockFn = jest.fn();
		const debouncedFn = debounce(mockFn, 1000);

		debouncedFn();
		debouncedFn();
		debouncedFn();

		expect(mockFn).not.toHaveBeenCalled();

		jest.advanceTimersByTime(1000);
		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('should call the function with the latest arguments', () => {
		const mockFn = jest.fn();
		const debouncedFn = debounce(mockFn, 1000);

		debouncedFn('first');
		debouncedFn('second');
		debouncedFn('third');

		jest.advanceTimersByTime(1000);
		expect(mockFn).toHaveBeenCalledWith('third');
	});

	it('should reset the timer when called again within delay', () => {
		const mockFn = jest.fn();
		const debouncedFn = debounce(mockFn, 1000);

		debouncedFn();
		jest.advanceTimersByTime(500);
		debouncedFn();
		jest.advanceTimersByTime(500);

		expect(mockFn).not.toHaveBeenCalled();

		jest.advanceTimersByTime(500);
		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('should preserve the arguments of the original function', () => {
		const context = { value: 'test' };
		const mockFn = jest.fn(function (this: typeof context, ...arg: string[]) {
			expect(arg).toStrictEqual(['arg', 'arg2']);
		});

		const debouncedFn = debounce(mockFn, 1000);
		debouncedFn.call(context, 'arg', 'arg2');

		jest.advanceTimersByTime(1000);
		expect(mockFn).toHaveBeenCalledTimes(1);
	});
});
