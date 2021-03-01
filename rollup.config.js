import babel from '@rollup/plugin-babel';

export default {
	input: [
		'dom',
		'fn',
		'format',
		'http',
		'plugin',
		'time'
	].map(x => `src/${x}`),
	output: {
		dir: 'dist',
		format: 'es',
		exports: 'default'
	},
	plugins: [
		babel({
			babelHelpers: 'bundled'
		})
	]
};
