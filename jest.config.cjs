module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\.css$': 'identity-obj-proxy',
  },
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
};
