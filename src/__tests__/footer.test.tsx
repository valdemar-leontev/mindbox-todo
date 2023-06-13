import { render, screen } from '@testing-library/react';
import { Footer } from '../components/footer/footer'
import { Provider } from 'react-redux'
import store from '../store/store'

test('renders component correctly', () => {
    render(
        <Provider store={store}>
            <Footer />
        </Provider>
    );
    const element = screen.getByText('All');
    expect(element).toBeInTheDocument();
});