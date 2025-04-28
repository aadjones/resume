import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { vi } from 'vitest';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => ({
    get: () => 'tech',
  }),
}));

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
}); 