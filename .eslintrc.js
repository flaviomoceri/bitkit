module.exports = {
	root: true,
	extends: '@react-native-community',
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	globals: {
		localStorage: false,
	},
	rules: {
		'@typescript-eslint/no-unused-vars': 'warn',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'no-console': 0,
		'no-empty': ['error', { allowEmptyCatch: true }],
		'no-buffer-constructor': 0,
		'no-case-declarations': 0,
		'no-useless-escape': 0,
		'react/jsx-no-duplicate-props': [2, { ignoreCase: true }],
		'react-native/no-unused-styles': 1,
		'react-native/no-raw-text': 2,
		'react/jsx-equals-spacing': [2, 'never'],
		'react/no-unsafe': [2, { checkAliases: true }],
		'react/jsx-curly-spacing': [
			2,
			{
				when: 'never',
				attributes: { allowMultiline: true },
				children: true,
			},
		],
		indent: [
			2,
			'tab',
			{ SwitchCase: 1, ignoredNodes: ['ConditionalExpression'] },
		],
		'object-curly-spacing': [
			'error',
			'always',
			{
				objectsInObjects: true,
			},
		],
		'react/jsx-uses-vars': 2,
		'react/jsx-wrap-multilines': 2,
		'react/jsx-tag-spacing': [
			2,
			{
				closingSlash: 'never',
				beforeSelfClosing: 'always',
				afterOpening: 'never',
				beforeClosing: 'never',
			},
		],
		'react/jsx-indent': [2, 'tab', { indentLogicalExpressions: false }],
		//TODO try get this working again
		// 'react/jsx-closing-bracket-location': [
		// 	'error',
		// 	{ selfClosing: 'props-aligned', nonEmpty: 'after-props' },
		// ],
		'react/jsx-child-element-spacing': 2,
		'react/no-unused-prop-types': 2,
		'react/prop-types': 0,
		'no-undef': 0,
		'react/display-name': 0,
		'require-atomic-updates': 0,
		'no-async-promise-executor': 0,
		'brace-style': [2, '1tbs', { allowSingleLine: true }],
	},
};
