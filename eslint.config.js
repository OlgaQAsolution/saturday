import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';

export default [
    // Global ignores
    {
        ignores: ['node_modules/', 'playwright-report/', 'test-results/', '.auth/'],
    },

    // Base configuration for all JavaScript files
    {
        files: ['**/*.js'],
        plugins: {
            prettier,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                global: 'readonly',
            },
        },
        rules: {
            ...js.configs.recommended.rules,

            // Prettier configuration - Format enforcement
            'prettier/prettier': [
                'error',
                {
                    singleQuote: true,
                    printWidth: 120,
                    tabWidth: 4,
                    useTabs: false,
                    trailingComma: 'all',
                    endOfLine: 'auto',
                    bracketSpacing: true,
                    arrowParens: 'always',
                },
            ],

            // Core code quality rules
            eqeqeq: ['error', 'always'], // Enforce === and !== instead of == and !=
            'no-var': 'error', // Disallow var, require let or const
            'prefer-const': 'error', // Require const for variables that are never reassigned
            'no-console': 'warn', // Warn on console.log in production code

            // Variables and scoping
            'no-unused-vars': [
                'warn',
                {
                    vars: 'all', // Check all variables
                    args: 'after-used', // Check function arguments only if any after it are used
                    ignoreRestSiblings: true, // Don't check rest parameters
                    caughtErrors: 'none', // Don't check catch error parameters
                    argsIgnorePattern: '^_', // Ignore parameters starting with underscore
                },
            ], // Warn on unused variables (but allow underscore prefix)
            'no-shadow': 'warn', // Warn when variable shadows outer scope
            'no-shadow-restricted-names': 'error', // Prevent shadowing of restricted names (NaN, undefined, etc)
            'no-use-before-define': 'warn', // Warn on using variable before declaration

            'no-duplicate-case': 'error', // Disallow duplicate case labels in switch
            'no-dupe-keys': 'error', // Disallow duplicate keys in object literals
            'no-empty': 'warn', // Warn on empty blocks (except empty catch)
            'no-new-wrappers': 'error', // Disallow new with String, Number, Boolean constructors
            'no-return-assign': 'error', // Disallow assignment in return statement
            'no-unmodified-loop-condition': 'error', // Warn if loop condition never changes

            'prefer-template': 'warn', // Prefer template literals over string concatenation
            'object-shorthand': 'warn', // Prefer object shorthand syntax
            'prefer-arrow-callback': 'warn', // Prefer arrow functions for callbacks

            'no-inline-comments': 'off', // Allow inline comments
            'no-warning-comments': ['warn', { terms: ['todo', 'fixme'] }], // Warn on TODO and FIXME comments
        },
    },

    // Test files configuration
    {
        files: ['**/tests/**/*.js', '**/*.spec.js', '**/auth.setup.js', '**/*.test.js'],
        languageOptions: {
            globals: {
                test: 'readonly',
                expect: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                before: 'readonly',
                after: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
            },
        },
        rules: {
            'no-console': 'off', // Allow console output in tests for debugging
            'prefer-arrow-callback': 'off', // Allow regular functions for test/describe callbacks
            'no-unused-vars': [
                'warn',
                {
                    vars: 'local', // Only check local variables (not globals)
                    args: 'after-used', // Check function arguments only if any after it are used
                },
            ], // Relaxed unused vars checking for test fixtures
        },
    },

    // Configuration files
    {
        files: ['*.config.js', '.*.js'],
        rules: {
            'no-console': 'off', // Allow console output in config files
        },
    },
];
