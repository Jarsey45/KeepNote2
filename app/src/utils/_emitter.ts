type EventCallback = () => void;

class EventEmitter {
	private events: Map<string, EventCallback[]> = new Map();

	on(event: string, callback: EventCallback) {
		const currentCBs = this.events.get(event) ?? [];
		currentCBs.push(callback);

		this.events.set(event, currentCBs);
	}

	emit(event: string) {
		const events = this.events.get(event);
		if (events) {
			events.forEach((cb) => cb());
		}
	}

	off(event: string, callback: EventCallback) {
		const events = this.events.get(event);
		if (events) {
			const filtered = events.filter((cb) => cb !== callback);
			if (filtered.length === 0) {
				this.events.delete(event);
			} else {
				this.events.set(event, filtered);
			}
		}
	}
}

export const eventEmitter = new EventEmitter();
