import { render, screen } from '@testing-library/react';
import Pizzak from '../pages/Pizzak';
import '@testing-library/jest-dom';

test('renders a div on the Pizzak page', () => {
    render(<Pizzak />);
    const divElement = screen.getByTestId('pizzak-div');
    expect(divElement).toBeInTheDocument();
});
