module.exports = {
	'extends': ['happiness'],//, 'plugin:react/recommended'],
	'parser': 'babel-eslint',
	'env': {
		'mocha': true
	},
	'plugins': [
		'react'
	],
	'rules': {
		'brace-style': ['error', 'stroustrup', { 'allowSingleLine': true }]
	}
};
