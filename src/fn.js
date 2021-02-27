// Copyright 2021 Furqan Software Ltd. All rights reserved.

export default {

	defer(func) {
		setTimeout (() => { func(); }), 1;
	},

	wrap(func, other) {
		return (...args) => {
			return other(func, ...args);
		};
	},

	debounce (func, wait, immediate) {
		let lastArgs = [];
		let timeout = null;
		return (...args) => {
			lastArgs = args;
			let later = () => {
				timeout = null;
				if (!immediate) {
					func.apply(void 0, lastArgs);
				}
			};
			let callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) {
				func.apply(void 0, lastArgs);
			}
		};
	},

	throttle(func, wait) {
		let context = null;
		let lastArgs = null;
		let timeout = null;
		let previous = 0;

		let later = () => {
			previous = new Date().getTime();
			timeout = null;
			func.apply(context, lastArgs);
			if (!timeout) {
				context = null;
				lastArgs = null;
			}
		}

		return (...args) => {
			let now = new Date().getTime();
			let remaining = wait - (now - previous);
			context = this;
			lastArgs = args;
			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = now;
				func.apply(context, args);
				if (!timeout) {
					context = null;
					args = null;
				}
			} else if (!timeout) {
				timeout = setTimeout(later, remaining);
			}
		}
	}

};
