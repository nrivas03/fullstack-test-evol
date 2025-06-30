import { render, screen } from '@testing-library/react';
import Layout from './Layout';
import '@testing-library/jest-dom';
import { vi, describe, it, expect } from 'vitest';

vi.mock('./Sidebar', () => ({
  default: () => <div data-testid="mock-sidebar">Sidebar</div>,
}));

vi.mock('./Header', () => ({
  default: () => <div data-testid="mock-header">Header</div>,
}));

describe('Layout', () => {
  it('renderiza Sidebar, Header y children', () => {
    render(
      <Layout>
        <p>Contenido principal</p>
      </Layout>
    );

    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByText('Contenido principal')).toBeInTheDocument();
  });
});
