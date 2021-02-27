// Copyright 2021 Furqan Software Ltd. All rights reserved.

function send(method, url, body, options, done) {
	let r = new XMLHttpRequest();
	r.open(method, url, true);
	if (options.headers) {
		for (const k of Object.keys(options.headers)) r.setRequestHeader(k, options.headers[k]);
	}
	r.onload = () => {
		if (r.status >= 200 && r.status < 400) {
			done(null, r.responseText);
		} else {
			let err = new Error("unexpected status #{r.status}");
			err.statusCode = r.status;
			done(err, r.responseText);
		}
	};
	r.onerror = (err) => { done(err) };
	r.send(body);
	return r;
}

export default {

	send,

	get(url, options, done) {
		return send('GET', url, null, options, done);
	},
	
	post(url, body, options, done) {
		return send('POST', url, body, options, done);
	}

};
