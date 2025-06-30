import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loading } from './Loading';
import '@testing-library/jest-dom';

describe('Loading', () => {

  it('muestra el texto si se proporciona', () => {
    render(<Loading text="Cargando datos..." />);
    expect(screen.getByText('Cargando datos...')).toBeInTheDocument();
  });

});
