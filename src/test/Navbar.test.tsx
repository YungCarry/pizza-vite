import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';
import '@testing-library/jest-dom';

test('renders a div on the root page', () => {
    render(<Navbar />);
    const divElement = screen.getByTestId('navbar-div');
    expect(divElement).toBeInTheDocument();
});
