import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OurWork from './OurWork';

// Mock GSAP to prevent ScrollTrigger errors during tests
vi.mock('gsap', () => {
  const gsapMock = {
    registerPlugin: vi.fn(),
    set: vi.fn(),
    to: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
      fromTo: vi.fn().mockReturnThis(),
    })),
  };
  return {
    __esModule: true,
    default: gsapMock,
  };
});
vi.mock('gsap/ScrollTrigger', () => {
  return {
    ScrollTrigger: {
      create: vi.fn(),
      getAll: vi.fn(() => []),
    }
  };
});

describe('OurWork Component', () => {
  it('renders the branding text', () => {
    render(<OurWork />);
    expect(screen.getByText('SCENE SET')).toBeInTheDocument();
  });

  it('renders the main label title', () => {
    render(<OurWork />);
    expect(screen.getByRole('heading', { name: /Our Work/i })).toBeInTheDocument();
  });
});
