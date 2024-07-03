/** @type {import('jest').Config} */
const config = {
    testPathIgnorePatterns: ['/node_modules/'],
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testMatch: ['**/?(*.)+(test|spec).ts?(x)'],
    moduleDirectories: ['node_modules', 'src'],
};

module.exports = config;
