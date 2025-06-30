import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button', () => {
  it('renderiza el contenido correctamente', () => {
    render(<Button>Haz clic</Button>);
    expect(screen.getByRole('button', { name: /haz clic/i })).toBeInTheDocument();
  });

  it('llama al evento onClick cuando se hace clic', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clic</Button>);
    await userEvent.click(screen.getByRole('button', { name: /clic/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('aplica correctamente la variante "primary"', () => {
    render(<Button variant="primary">Primary</Button>);
    const btn = screen.getByRole('button', { name: /primary/i });
    expect(btn.className).toMatch(/bg-primary-600/);
  });

  it('aplica correctamente la variante "danger"', () => {
    render(<Button variant="danger">Eliminar</Button>);
    const btn = screen.getByRole('button', { name: /eliminar/i });
    expect(btn.className).toMatch(/bg-red-600/);
  });

  it('aplica correctamente el tamaño "lg"', () => {
    render(<Button size="lg">Grande</Button>);
    const btn = screen.getByRole('button', { name: /grande/i });
    expect(btn.className).toMatch(/px-6/);
  });

  it('muestra el spinner cuando loading es true', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
  });

  it('está deshabilitado cuando disabled es true', () => {
    render(<Button disabled>Deshabilitado</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('está deshabilitado cuando loading es true, aunque disabled sea false', () => {
    render(<Button loading disabled={false}>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
