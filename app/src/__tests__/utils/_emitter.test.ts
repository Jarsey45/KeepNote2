import { eventEmitter } from '@/utils/_emitter';

describe("EventEmitter", () => {
	beforeEach(() => {
		// clearing all event listeners

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(eventEmitter as any).events = new Map();
	});

	it("should register and trigger event callback", () => {
		const callback = jest.fn();

		eventEmitter.on("TestEvent", callback);
		eventEmitter.emit("TestEvent");

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it("should handle multiple callbacks for same event", () => {
		const callback1 = jest.fn();
		const callback2 = jest.fn();

		eventEmitter.on("TestEvent", callback1);
		eventEmitter.on("TestEvent", callback2);

		eventEmitter.emit("TestEvent");

		expect(callback1).toHaveBeenCalledTimes(1);
		expect(callback2).toHaveBeenCalledTimes(1);
	});

	it("should not trigger callbacks for different events", () => {
		const callback = jest.fn();

		eventEmitter.on("TestEvent", callback);
		eventEmitter.emit("TestEvent2");

		expect(callback).not.toHaveBeenCalled();
	});

	it("should remove specific callback when unsubscribing", () => {
		const callback1 = jest.fn();
		const callback2 = jest.fn();

		eventEmitter.on("TestEvent", callback1);
		eventEmitter.on("TestEvent", callback2);

		eventEmitter.off("TestEvent", callback1);

		eventEmitter.emit("TestEvent");

		expect(callback1).not.toHaveBeenCalled();
		expect(callback2).toHaveBeenCalledTimes(1);
	});

	it("should handle non-existent event emission", () => {
		expect(() => eventEmitter.emit('nonExistentEvent')).not.toThrow();
	});

	it("should handle non-existent event unsubscriptions", () => {
		const callback = jest.fn();
		expect(() => eventEmitter.off('nonExistentEvent', callback)).not.toThrow();
	});

	it("should remove event when last callback is removed", () => {
		const callback = jest.fn();

		eventEmitter.on("TestEvent", callback);
		eventEmitter.off("TestEvent", callback);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((eventEmitter as any).events.has("TestEvent")).toBeFalsy();
	});

});
