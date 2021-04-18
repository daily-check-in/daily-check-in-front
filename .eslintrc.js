module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
		es6: true
	},
	extends: [
		'plugin:vue/essential',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'@vue/prettier',
		'@vue/prettier/@typescript-eslint'
	],
	parserOptions: {
		ecmaVersion: 2020
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'@typescript-eslint/camelcase': 'off',
		'prettier/prettier': [
			// https://prettier.io/docs/en/options.html
			'error',
			{
				singleQuote: true,
				semi: true,
				useTabs: true,
				tabWidth: 2,
				printWidth: 80,
				bracketSpacing: true,
				arrowParens: 'avoid',
				endOfLine: 'auto'
			}
		],
		'import/extensions': 0,
		'import/no-unresolved': 'off', // Allow unresolved imports
		'generator-star-spacing': 'off', // Allow async-await
		'no-plusplus': 'off',
		'no-undef': 'off',
		'no-unused-vars': ['error'],
		'no-param-reassign': 0,
		'import/namespace': 'off',
		'import/no-extraneous-dependencies': 0,
		'no-useless-escape': 0,
		'consistent-return': 'off',
		'require-await': 'error', // No async function without await
		'no-var': 'error',
		'vue/html-indent': [
			'error',
			'tab',
			{
				attribute: 1,
				baseIndent: 1,
				closeBracket: 0,
				alignAttributesVertically: true,
				ignores: []
			}
		],
		'vue/order-in-components': [
			'error',
			{
				order: [
					'el',
					'name',
					'parent',
					'functional',
					['delimiters', 'comments'],
					'extends',
					'mixins',
					'inheritAttrs',
					'model',
					['props', 'propsData'],
					'fetch',
					'asyncData',
					'data',
					'computed',
					'watch',
					'LIFECYCLE_HOOKS',
					'methods',
					'head',
					['template', 'render'],
					'renderError',
					['components', 'directives', 'filters']
				]
			}
		],
		'vue/html-self-closing': ['off'],
		'vue/attributes-order': [
			'error',
			{
				order: [
					'DEFINITION',
					'LIST_RENDERING',
					'CONDITIONALS',
					'RENDER_MODIFIERS',
					'GLOBAL',
					'UNIQUE',
					'TWO_WAY_BINDING',
					'OTHER_DIRECTIVES',
					'OTHER_ATTR',
					'EVENTS',
					'CONTENT'
				]
			}
		]
	}
};
