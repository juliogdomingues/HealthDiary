// jest.config.js
module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(axios)/)', // Transforma axios dentro de node_modules
  ],
  moduleFileExtensions: ['js', 'jsx'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Certifique-se de ter este arquivo
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Mock para arquivos de estilo
    '\\.(gif|ttf|eot|svg|png|jpg)$': '<rootDir>/mocks/fileMock.js', // Mock para arquivos de imagem
  },
};