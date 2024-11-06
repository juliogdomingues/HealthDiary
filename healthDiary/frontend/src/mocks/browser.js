// src/mocks/browser.js

import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Configura o worker com os handlers definidos
export const worker = setupWorker(...handlers);
