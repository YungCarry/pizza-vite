import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Login from '../pages/Login';
import '@testing-library/jest-dom';

test('renders a div on the login page', () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>,
    );
    const divElement = screen.getByTestId('login-div');
    expect(divElement).toBeInTheDocument();
});
