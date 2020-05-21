module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', '@typescript-eslint/tslint'],
  rules: {
    'no-unused-expressions': 'off',
    'require-await': 'off',
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      { assertionStyle: 'as' },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'no-public' },
    ],
    '@typescript-eslint/interface-name-prefix': [
      'error',
      { prefixWithI: 'always' },
    ],
    '@typescript-eslint/member-ordering': ['error'],
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-extra-non-null-assertion': ['error'],
    '@typescript-eslint/no-extraneous-class': [
      'error',
      {
        allowEmpty: true,
      },
    ],
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': ['error'],
    '@typescript-eslint/no-unused-expressions': ['error'],
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-regexp-exec': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/restrict-plus-operands': 'error',
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowNumber: true,
        allowBoolean: true,
        allowNullable: true,
      },
    ],
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/typedef': [
      'error',
      {
        variableDeclaration: true,
      },
    ],
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/indent': [
      'error',
      4,
      {
        FunctionDeclaration: {
          parameters: 'first',
        },
        FunctionExpression: {
          parameters: 'first',
        },
      },
    ],

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],

    // myCustomRules
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/type-annotation-spacing': 'error',
    'arrow-body-style': 'error',
    complexity: ['error', { max: 15 }],
    curly: 'error',
    eqeqeq: ['error'],
    'id-blacklist': [
      'error',
      'any',
      'Number',
      'number',
      'String',
      'string',
      'Boolean',
      'boolean',
      'Undefined',
    ],
    'id-match': 'error',
    'import/no-default-export': 'off',
    'max-classes-per-file': ['off', 1],
    'max-len': [
      'error',
      {
        code: 130,
      },
    ],
    'max-lines': ['error', 450],
    'no-caller': 'error',
    'no-eval': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
      },
    ],
    'no-trailing-spaces': 'error',
    'no-shadow': [
      'error',
      {
        hoist: 'all',
      },
    ],
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'one-var': ['error', 'never'],
    'spaced-comment': 'error',
    'use-isnan': 'error',
    '@typescript-eslint/tslint/config': [
      'error',
      {
        rules: {
          'one-line': [
            true,
            'check-open-brace',
            'check-whitespace',
            'check-catch',
            'check-else',
            'check-finally',
          ],
          typedef: [
            true,
            'call-signature',
            'parameter',
            'arrow-parameter',
            'property-declaration',
            'variable-declaration',
            'member-variable-declaration',
          ],
          whitespace: [
            true,
            'check-branch',
            'check-decl',
            'check-operator',
            'check-separator',
            'check-type',
            'check-module',
          ],
        },
      },
    ],
    // "@typescript-eslint/no-explicit-any": "error",
    // "@typescript-eslint/unbound-method": [
    //     "error",
    //     {
    //         ignoreStatic: true
    //     }
    // ],
    // "no-underscore-dangle": "error",
    // "no-invalid-this": "error",
    // "import/order": ["error",{
    //     "alphabetize": true,
    //     "groups" : [ "index" ,  "sibling" ,  "parent" ,  "internal" ,  "external" ,  "builtin" ],
    //     "ignoreCase": false,
    //     "ignoreDeclarationSort": false,
    //     "ignoreMemberSort": false,
    //     "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
    // }],
    // "camelcase": "off",
    // "camelcase": "error",
    // "prettier/prettier": ["error", { singleQuote: true }],
    // "@typescript-eslint/camelcase": ["error", { "properties": "never" }],
    // "@typescript-eslint/class-name-casing": ["error", {
    //     allow: ["ˆIChatSDK_"],
    // }],
    // "@typescript-eslint/no-untyped-public-signature": "error",
  },
  ignorePatterns: ['test.ts', 'polyfills.ts', '*.prod.ts'],
  globals: {
    Stripe: true,
  },
};
