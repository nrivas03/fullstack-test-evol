import { render, screen } from '@testing-library/react';
import Header from './Header';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

describe('Header', () => {
  it('renderiza el título correctamente', () => {
    render(<Header />);
    expect(screen.getByText('Todo List')).toBeInTheDocument();
  });

  it('renderiza el autor', () => {
    render(<Header />);
    expect(screen.getByText(/by Nicolás Rivas/i)).toBeInTheDocument();
  });
});
