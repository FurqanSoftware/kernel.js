import babel from '@rollup/plugin-babel';

export default [
	'dom',
	'fn',
	'http',
	'time'
].map(
	(module) => ({
		input: `src/${module}.js`,
		output: {
			file: `dist/${module}.js`,
			format: 'cjs',
			exports: 'auto'
		},
		plugins: [
			babel({
				babelHelpers: 'bundled'
			})
		]
	})
);
