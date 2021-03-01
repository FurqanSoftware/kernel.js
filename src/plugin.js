// Copyright 2021 Furqan Software Ltd. All rights reserved.

const plugins = {};
const initialized = {};
const deferred = {};

let queue = [];

let listeners = {};

function initNow(name, plugin) {
	if (initialized[name]) return;
	let args = [];
	if (plugin.needs) {
		let needs = resolve(plugin.needs);
		if (!needs) return;
		else args = args.concat(needs);
	}
	if (plugin.init) plugin.init(...args);
	initialized[name] = true;
	execQueue();
	initDeps(name, plugin);
}

function initLater(name, plugin) {
	if (deferred[name]) return;
	if (!window.requestIdleCallback) setTimeout(() => { initNow(name, plugin); }, 1);
	else window.requestIdleCallback(() => { initNow(name, plugin); }, { timeout: 5000 });
	deferred[name] = true;
}

function initDeps(name, plugin) {
	for (const othername of Object.keys(plugins)) {
		let otherplugin = plugins[othername];
		if (othername === name || initialized[othername] || !otherplugin.needs) continue;
		if (resolve(otherplugin.needs)) {
			if (plugin.defer) initLater(othername, otherplugin);
			else initNow(othername, otherplugin);
		}
	}
}

function execQueue() {
	queue = queue.filter(({name, func, args}) => {
		if (!initialized[name]) return true;
		let plugin = plugins[name];
		if (typeof func === 'function') func(...args);
		else if (typeof func === 'string') plugin.methods[func](...args);
		else throw new Error('bad func type');
		return false;
	});
}

function resolve(needs) {
	for (const need of needs) if (!initialized[need]) return false;
	return needs.map((k) => plugins[k].scope());
}

export default {

	add(name, plugin) {
		plugins[name] = plugin;
		if (plugin.defer) initLater(name, plugin);
		else initNow(name, plugin);
	},

	call(name, func, ...args) {
		let plugin = plugins[name];
		if (plugin && initialized[name]) plugin.methods[func](...args);
		else queue.push({name, func, args});
	},

	emit(topic, ...args) {
		if (!listeners[topic]) return;
		for (const l of listeners[topic]) l.handler(...args);
	},

	on(topic, handler) {
		if (!listeners[topic]) listeners[topic] = [];
		listeners[topic].push({
			topic,
			handler
		})
	},

	scope(name, callback = () => {}) {
		let plugin = plugins[name];
		if (!plugin) return null;
		if (initialized[name]) {
			let scope = plugin.scope();
			callback(scope);
			return scope;
		} else {
			queue.push({
				name,
				func: () => {
					callback(scope);
				},
				args: []
			})
			return null;
		}
	}

};

window[`plugin${Math.round(Math.random()*100000)}`] = () => ({
	plugins,
	initialized,
	queue
});
