import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('render left menu', async () => {
    render(<App />);
    const linkElement = await waitFor(() => screen.getByText(/People/i));
    expect(linkElement.closest('a')).toHaveAttribute('href', '/people');
});
