// Copyright 2021 Furqan Software Ltd. All rights reserved.

export default {

	seconds(v) {
		return `${Math.round((v/1e9) * 10) / 10}`;
	},
	
	bytes(v) {
		const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB'];
		let n = 0;
		while (v >= 1000) {
			n++;
			v /= 1000;
		}
		return `${Math.round(v)} ${units[n]}`;
	},
	
	metric(v) {
		const units = ['', 'k', 'm', 'b'];
		let n = 0;
		while(v >= 1000) {
			n++;
			v /= 1000;
		}
		return `${Math.round(v)}${units[n]}`;
	},
	
	truncate(s, n) {
		if (s.length <= n) {
			return s;
		}
		return s.slice(0, n) + '...';
	}

};
