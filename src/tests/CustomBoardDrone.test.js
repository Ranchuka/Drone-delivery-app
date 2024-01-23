import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomBoardDrone from '../chessboard/CustomBoardDrone.js';

describe('Teste do componente CustomBoardDrone', () => {
  test('Deve renderizar o tabuleiro', () => {
    render(<CustomBoardDrone />);
    expect(screen.findByTestId('chessboard'));
  });
});

