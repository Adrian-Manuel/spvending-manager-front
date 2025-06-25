// src/tests/setup.ts
import '@testing-library/jest-dom';

// You can add other global setup configurations here, for example:
// - Mocking global objects (localStorage, fetch, etc.)
// - Setting up a mock service worker (MSW) for API mocking
// - Configuring testing-library specific settings

// Example: Mocking localStorage
// const localStorageMock = (function() {
//   let store: { [key: string]: string } = {};
//   return {
//     getItem: function(key: string) {
//       return store[key] || null;
//     },
//     setItem: function(key: string, value: string) {
//       store[key] = value.toString();
//     },
//     removeItem: function(key: string) {
//       delete store[key];
//     },
//     clear: function() {
//       store = {};
//     }
//   };
// })();
// Object.defineProperty(window, 'localStorage', { value: localStorageMock });


// Example: Basic fetch mock (consider MSW for more complex scenarios)
// global.fetch = vi.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({ data: 'mocked data' }),
//     ok: true,
//     status: 200,
//   })
// );

// Clean up after each test
// import { cleanup } from '@testing-library/react';
// afterEach(() => {
//   cleanup();
// });

// If you're using Vitest's `vi` utility for mocking:
// import { vi } from 'vitest';
// global.vi = vi;
