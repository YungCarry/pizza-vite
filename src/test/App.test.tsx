import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

test('renders a div on the root page', () => {
    render(<App />);
    const divElement = screen.getByTestId('root-div');
    expect(divElement).toBeInTheDocument();
});
