import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';
import '@testing-library/jest-dom';

describe('Modal', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('no renderiza nada si isOpen es false', () => {
    render(<Modal isOpen={false} onClose={vi.fn()}>Contenido</Modal>);
    expect(screen.queryByText('Contenido')).not.toBeInTheDocument();
  });

  it('muestra el contenido cuando isOpen es true', () => {
    render(<Modal isOpen={true} onClose={vi.fn()}>Contenido del modal</Modal>);
    expect(screen.getByText('Contenido del modal')).toBeInTheDocument();
  });

  it('muestra el título si se proporciona', () => {
    render(<Modal isOpen={true} onClose={vi.fn()} title="Título Modal">Contenido</Modal>);
    expect(screen.getByText('Título Modal')).toBeInTheDocument();
  });

  it('llama a onClose al hacer clic en el botón de cerrar', () => {
    const handleClose = vi.fn();
    render(<Modal isOpen={true} onClose={handleClose} title="Modal">Texto</Modal>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('cierra el modal al hacer clic en el overlay si closeOnOverlayClick está activado', () => {
    const handleClose = vi.fn();
    render(<Modal isOpen={true} onClose={handleClose}>Contenido</Modal>);
    const overlay = document.querySelector('.bg-opacity-75')!;
    fireEvent.click(overlay);
    expect(handleClose).toHaveBeenCalled();
  });

  it('no cierra el modal al hacer clic en el overlay si closeOnOverlayClick es false', () => {
    const handleClose = vi.fn();
    render(<Modal isOpen={true} onClose={handleClose} closeOnOverlayClick={false}>Contenido</Modal>);
    const overlay = document.querySelector('.bg-opacity-75')!;
    fireEvent.click(overlay);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('llama a onClose al presionar Escape', () => {
    const handleClose = vi.fn();
    render(<Modal isOpen={true} onClose={handleClose}>Contenido</Modal>);
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(handleClose).toHaveBeenCalled();
  });

  it('aplica el tamaño correcto del modal según el prop size', () => {
    render(<Modal isOpen={true} onClose={vi.fn()} size="lg">Contenido</Modal>);
    const modal = document.querySelector('.max-w-2xl');
    expect(modal).toBeInTheDocument();
  });
});
