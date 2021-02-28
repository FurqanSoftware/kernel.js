// Copyright 2021 Furqan Software Ltd. All rights reserved.

function formatTime(v) {
	let suf = 'AM';
	let h = v.getHours();
	if (h >= 12) suf = 'PM';
	if (h > 12) h -= 12;
	return `${h}:${pad2(v.getMinutes())} ${suf}`;
}

const sub = (a, b) => a - b;

const toUnix = (v) => v.getTime() / 1000;
	
const pad2 = (n) => n < 10 ? `0${n}` : `${n}`;

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

const monthsShort = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
];

const intervals = [
	['ms', 1],
	['s', 1000],
	['m', 60],
	['h', 60],
	['d', 24],
	['w', 7],
	['M', 4],
	['y', 12]
];

export default {

	months,
	monthsShort,
	formatTime,
	sub,
	toUnix,

	millisecond: 1,
	second: 1000,
	minute: 60 * 1000,

	formatSince(a, b) {
		let d = sub(a, b);
		if (d < 1000) return 'just now';
		if (d > 12*30*24*60*60*1000) return `${monthsShort[b.getMonth()]} '${b.getFullYear()%100}`;
		let suf = intervals[0][0];
		for (const int of intervals) {
			if (d < int[1]) break;
			d /= int[1];
			suf = int[0];
		}
		return `${Math.floor(d)}${suf} ago`;
	},

	formatUntil(a, b) {
		let d = sub(a, b);
		if (d < 1000) return 'now';
		if (d > 12*30*24*60*60*1000) return `${monthsShort[a.getMonth()]} '${a.getFullYear()%100}`;
		let suf = intervals[0][0];
		for (const int of intervals) {
			if (d < int[1]) break;
			d /= int[1];
			suf = int[0];
		}
		return `in ${Math.floor(d)}${suf}`;
	},
	
	formatDuration(d) {
		let suf = intervals[0][0];
		for (const int of intervals) {
			if (d < int[1]) break;
			d /= int[1];
			suf = int[0];
		}
		return `${Math.floor(d)}${suf}`
	},

	formatClock(v) {
		v = Math.floor(v);
		let s = v % 60;
		let x = Math.floor(v / 60);
		let m = x % 60;
		let h = Math.floor(x / 60);
		if (v > 24*60*60) {
			d = Math.floor(h / 24);
			if (d > 99) {
				return `${d}d`;
			} else {
				h = h % 24;
				return `${d}d ${h}h`;
			}
		} else {
			return `${h}:${pad2(m)}:${pad2(s)}`;
		}
	},

	isBefore(a, b) {
		return a < b;
	},

	isAfter(a, b) {
		return a > b;
	},

	formatLLL(v) {
		return `${months[v.getMonth()]} ${v.getDate()} ${v.getFullYear()} ${formatTime(v)}`
	},
	
	formatZone(v) {
		let d = -v.getTimezoneOffset();
		let h = d / 60;
		let m = Math.abs(d % 60);
		let s = "+";
		if (d < 0) s = "-";
		return `${s}${pad2(h)}${pad2(m)}`;
	},
	
	formatDateFull(v) {
		return `${months[v.getMonth()]} ${v.getDate()}, ${v.getFullYear()}`;
	},
	
	formatDate(v) {
		return `${pad2(v.getDate())} ${monthsShort[v.getMonth()]}`;
	},
	
	formatMonth(v) {
		return `${monthsShort[v.getMonth()]} '${v.getFullYear() % 100}`;
	},
	
	sameDay(a, b) {
		return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
	},
		
	add(a, x) {
		return new Date(a.getTime() + x);
	},
	
	nowUnix() {
		return toUnix(new Date());
	},

	fromUnix(v) {
		return new Date(v*1000);
	},
	
	clock(v) {
		v = Math.floor(v)
		let s = v % 60;
		let x = Math.floor(v / 60);
		let m = x % 60;
		let h = Math.floor(x / 60);
		if (v > 24*60*60) {
			let d = Math.floor(h / 24);
			if (d > 99) {
				return `${d}d`;
			} else {
				h = h % 24;
				return `${d}d ${h}h`;
			}
		} else {
			return `${h}:${_pad2(m)}:${_pad2(s)}`;
		}
	}

};
