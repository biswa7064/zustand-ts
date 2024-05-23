const nextJest = require("next/jest")

const createJestConfig = nextJest({
  // Provide the path to your Next.js app
  dir: "./",
})

// Add any custom Jest configuration options here
module.exports = createJestConfig({
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
})
