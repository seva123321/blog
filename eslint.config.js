import js from '@eslint/js'
import globals from 'globals'
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier'
import importPlugin from 'eslint-plugin-import'
import airbnb from 'eslint-config-airbnb'
import airbnbHooks from 'eslint-config-airbnb/hooks'

export default [
  { ignores: ['node_modules', 'dist', 'build'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react: reactRecommended,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      prettier: prettier,
      import: importPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src/'],
        },
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactRecommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...airbnb.rules,
      ...airbnbHooks.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'prettier/prettier': 'error',
      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
          VariableDeclarator: 1,
          ObjectExpression: 1,
          ArrayExpression: 1,
        },
      ],
      'no-underscore-dangle': [
        'error',
        { allowAfterThis: true, allowAfterSuper: true },
      ],
      'linebreak-style': [0, 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'no-plusplus': 'off',
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'ignore',
          exports: 'never',
          functions: 'ignore',
        },
      ],
      'object-curly-newline': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/prop-types': 0,
      'import/no-unresolved': [2, { caseSensitive: false }],
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'import/order': [
        2,
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
        },
      ],
    },
  },
]
