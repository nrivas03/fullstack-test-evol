import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';
import '@testing-library/jest-dom';

describe('Input', () => {
  it('renderiza el label si se proporciona', () => {
    render(<Input label="Nombre" />);
    expect(screen.getByText('Nombre')).toBeInTheDocument();
  });

  it('renderiza el error si se proporciona', () => {
    render(<Input error="Campo requerido" />);
    expect(screen.getByText('Campo requerido')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
  });

  it('renderiza el helperText si no hay error', () => {
    render(<Input helperText="Este es un campo opcional" />);
    expect(screen.getByText('Este es un campo opcional')).toBeInTheDocument();
  });

  it('no renderiza helperText si hay error', () => {
    render(<Input helperText="Texto de ayuda" error="Hay un error" />);
    expect(screen.queryByText('Texto de ayuda')).not.toBeInTheDocument();
    expect(screen.getByText('Hay un error')).toBeInTheDocument();
  });

  it('renderiza un startIcon si se proporciona', () => {
    render(<Input startIcon={<span data-testid="start-icon">icono</span>} />);
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });

  it('renderiza un endIcon si se proporciona', () => {
    render(<Input endIcon={<span data-testid="end-icon">icono</span>} />);
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('llama a onChange cuando el usuario escribe', async () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Hola');
    expect(handleChange).toHaveBeenCalled();
  });

  it('acepta y muestra el valor inicial', () => {
    render(<Input value="Inicial" readOnly />);
    expect(screen.getByDisplayValue('Inicial')).toBeInTheDocument();
  });

  it('agrega clases condicionales según props', () => {
    render(<Input startIcon={<span />} endIcon={<span />} />);
    const input = screen.getByRole('textbox');
    expect(input.className).toMatch(/pl-10/);
    expect(input.className).toMatch(/pr-10/);
  });
});
