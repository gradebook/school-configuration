// @ts-check

/**
 * @template T
 */
export default class Queue {
	/**
	 * @param {function(T): void} func
	 */
	constructor(func, concurrency = 4) {
		this._fn = func;
		this._concurrency = concurrency;
		this.events = new EventTarget();
		/**
		 * @type Array<T>
		 * @description list of jobs that need to be processed
		 */
		this._jobs = [];
		/**
		 * @type number
		 * @description number of currently active workers
		 */
		this._activeWorkers = 0;
		/**
		 * @type Array<Error>
		 * @description errors caught by workers
		 */
		this._errors = [];
	}

	/**
	 * @property numErrors
	 * @type {number}
	 * @description number of errors that have been caught in the process queue
	 */
	get numErrors() {
		return this._errors.length;
	}

	/**
	 * @method add
	 * @param {T} item
	 * @description adds {item} to the job queue
	 * @returns {void}
	 */
	add(item) {
		this._jobs.push(item);

		if (this._activeWorkers === this._concurrency) {
			return;
		}

		this._work();
	}

	/**
	 * @method addAll
	 * @param {Array<T>} items
	 * @description adds {items} to the job queue
	 * @returns void
	 */
	addAll(items) {
		for (const item of items) {
			this.add(item);
		}
	}

	/**
	 * @method dumpErrors
	 * @description Log all errors that were caught by workers
	 */
	dumpErrors() {
		const {length} = this._errors;
		for (const [index, error] of this._errors.entries()) {
			console.error(`---Error ${index}/${length}---`);
			console.error(error);
		}
	}

	/**
	 * @private
	 * @method _work
	 * @description process the next item in the process queue
	 */
	_work() {
		this._activeWorkers++;
		const promise = Promise.resolve();

		promise.then(() => this._fn(this._jobs.shift())).catch(error => {
			this._errors.push(error);
		}).finally(() => {
			this._activeWorkers--;
			this._workerFinished();
		});
	}

	/**
	 * @private
	 * @method _workerFinished
	 * @description handles a worker finishing a job
	 */
	_workerFinished() {
		if (this._jobs.length === 0) {
			if (this._activeWorkers === 0) {
				this.events.dispatchEvent(new CustomEvent('idle'));
			}

			return;
		}

		this._work();
	}
}
