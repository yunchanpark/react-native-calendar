/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testPathIgnorePatterns: ['/node_modules/'],
    testMatch: ['**/?(*.)+(test|spec).ts?(x)'],
    moduleDirectories: ['node_modules', 'src'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

module.exports = config;
