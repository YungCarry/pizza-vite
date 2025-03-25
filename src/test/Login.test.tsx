import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';
import '@testing-library/jest-dom';

test('renders a div on the login page', () => {
    render(<Login />);
    const divElement = screen.getByTestId('login-div');
    expect(divElement).toBeInTheDocument();
});