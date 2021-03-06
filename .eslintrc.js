module.exports = {
    'env': {
        'node': true,
        'es6': true,
        'jest': true
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
            'modules': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'ignorePatterns': ['node_modules/*'],
    'rules': {
        'no-unused-vars': 'error',
        'array-bracket-spacing': [
            2,
            'never'
        ],
        'block-scoped-var': 2,
        'brace-style': [
            2,
            '1tbs'
        ],
        'camelcase': 0,
        'computed-property-spacing': [
            2,
            'never'
        ],
        'curly': 2,
        'eol-last': 2,
        'eqeqeq': [
            2,
            'smart'
        ],
        'max-depth': [
            1,
            6
        ],
        'max-len': [
            1,
            500
        ],
        'max-statements': [
            1,
            200
        ],
        'no-undef': 'error',
        'no-extend-native': 2,
        'no-mixed-spaces-and-tabs': 2,
        'no-trailing-spaces': 'error',
        'no-use-before-define': [
            2,
            'nofunc'
        ],
        'object-curly-spacing': [
            2,
            'always'
        ],
        'quotes': [
            2,
            'single',
            'avoid-escape'
        ],
        'semi': [
            2,
            'always'
        ],
        'keyword-spacing': [
            2,
            {
                'before': true,
                'after': true
            }
        ],
        'space-unary-ops': 2,
        'comma-spacing': [
            'error',
            {
                'before': false,
                'after': true
            }
        ],
        'space-infix-ops': 'error',
        'space-before-blocks': [
            'error',
            'always'
        ],
        'indent': [
            'error',
            4,
            {
                'SwitchCase': 1
            }
        ],
        'no-empty': [
            'error'
        ],
        'no-multiple-empty-lines': [
            'error',
            {
                'max': 1,
                'maxEOF': 1
            }
        ],
        'padding-line-between-statements': [
            'error',
            {
                'blankLine': 'always',
                'prev': 'block-like',
                'next': '*'
            },
            {
                'blankLine': 'always',
                'prev': '*',
                'next': 'block-like'
            }
        ]
    },
    'overrides': [
        {
            'files': ['*.ts', '*.tsx'],
            'parser': '@typescript-eslint/parser',
            'plugins': [
                '@typescript-eslint'
            ],
            'extends': [
                'eslint:recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended'
            ],
            'rules': {
                '@typescript-eslint/no-explicit-any': ['error', { 'ignoreRestArgs': true }],
                '@typescript-eslint/no-empty-interface': [
                    'error',
                    {
                        'allowSingleExtends': true
                    }
                ],
                'array-bracket-spacing': [
                    2,
                    'never'
                ],
                'block-scoped-var': 2,
                'brace-style': [
                    2,
                    '1tbs'
                ],
                'camelcase': 0,
                'computed-property-spacing': [
                    2,
                    'never'
                ],
                'curly': 2,
                'eol-last': 2,
                'eqeqeq': [
                    2,
                    'smart'
                ],
                'max-depth': [
                    1,
                    6
                ],
                'max-len': [
                    1,
                    500
                ],
                'max-statements': [
                    1,
                    200
                ],
                'no-undef': 'error',
                'no-extend-native': 2,
                'no-mixed-spaces-and-tabs': 2,
                'no-trailing-spaces': 'error',
                'no-use-before-define': [
                    2,
                    'nofunc'
                ],
                'object-curly-spacing': [
                    2,
                    'always'
                ],
                'quotes': [
                    2,
                    'single',
                    'avoid-escape'
                ],
                'semi': [
                    2,
                    'always'
                ],
                'keyword-spacing': [
                    2,
                    {
                        'before': true,
                        'after': true
                    }
                ],
                'space-unary-ops': 2,
                'comma-spacing': [
                    'error',
                    {
                        'before': false,
                        'after': true
                    }
                ],
                'space-infix-ops': 'error',
                'space-before-blocks': [
                    'error',
                    'always'
                ],
                'indent': [
                    'error',
                    4,
                    {
                        'SwitchCase': 1
                    }
                ],
                'no-empty': [
                    'error'
                ],
                'no-multiple-empty-lines': [
                    'error',
                    {
                        'max': 1,
                        'maxEOF': 1
                    }
                ],
                'padding-line-between-statements': [
                    'error',
                    {
                        'blankLine': 'always',
                        'prev': 'block-like',
                        'next': '*'
                    },
                    {
                        'blankLine': 'always',
                        'prev': '*',
                        'next': 'block-like'
                    }
                ],
            }
        }
    ]
};
