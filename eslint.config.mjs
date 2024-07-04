import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import _import from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: ['node_modules/*', 'lib/*', 'coverage/*', 'eslint.config.mjs'],
    },
    ...compat.extends('@react-native'),
    {
        plugins: {
            import: fixupPluginRules(_import),
            prettier,
        },

        rules: {
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',

                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],

            'prettier/prettier': 'error',
            'react/react-in-jsx-scope': 'off',
        },
    },
];
