// Copyright 2021 Furqan Software Ltd. All rights reserved.

export default {

	$(selector, root = document) {
		return root.querySelector(selector);
	},

	$$(selector, root = document) {
		return root.querySelectorAll(selector);
	},

	previous(el) {
		while (el) {
			el = el.previousSibling;
			if (el && el.nodeType === 1) return el;
		}
		return null;
	},

	closest(el, selector) {
		if (el.matches(selector)) return el;
		else return el.closest(selector);
	},

	between(el, ancestor, selector) {
		let target = el;
		while (target && target !== ancestor) {
			if (target.matches(selector)) return target;
			target = target.parentNode;
		}
		return null;
	},

	matches(el, selector) {
		return el.matches(selector);
	},
		
	detach(el) {
		el.parentNode && el.parentNode.removeChild(el);
	},

	on(el, event, callback) {
		return el.addEventListener(event, callback)
	},

	off(el, event, callback) {
		el.removeEventListener(event, callback)
	},

	once(el, event, callback) {
		let handler = () => {
			callback.apply(this, arguments);
			el.removeEventListener(event, handler);
		}
		el.addEventListener(event, handler);
	},

	hasClass(el, className) {
		return el.classList.contains(className)
	},

	addClass(el, ...className) {
		el.classList.add.apply(el.classList, className)
	},

	removeClass(el, ...className) {
		el.classList.remove.apply(el.classList, className)
	},

	toggleClass(el, ...className) {
		for (const c of className) el.classList.toggle(c);
	},

	setStyles(el, styles) {
		for (const k of Object.keys(styles)) el.style[k] = styles[k];
	},
	
	getWidth(el) {
		let style = getComputedStyle(el, null);
		if (style.width === 'auto') return el.offsetWidth;
		return parseFloat(style.width.replace(/px$/, ''));
	},
	
	getHeight(el) {
		let style = getComputedStyle(el, null);
		if (style.height === 'auto') return el.offsetHeight;
		return parseFloat(style.height.replace(/px$/, ''));
	},
	
	getOffset(el) {
		let rect = el.getBoundingClientRect();
		return {
			top: rect.top + document.body.scrollTop,
			left: rect.left + document.body.scrollLeft
		}
	},

	parse(s) {
		d = document.implementation.createHTMLDocument();
		d.body.innerHTML = s;
		return d.body;
	},

	escape(s) {
		s.replace(/[\u00A0-\u9999<>&](?!#)/gim, (c) => `&#${c.charCodeAt(0)};`);
	},

	getText(el) {
		return el.textContent;
	},

	setText(el, text) {
		el.textContent = text;
	}
};
