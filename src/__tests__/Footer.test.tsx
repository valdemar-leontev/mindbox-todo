import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Footer } from '../components/footer/footer';
import store from '../store/store';

describe('Footer', () => {
    it('check filters', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Footer />
            </Provider>,
        );
        expect(getByText("All")).toBeInTheDocument();
        expect(getByText("Active")).toBeInTheDocument();
        expect(getByText("Completed")).toBeInTheDocument();
    });

    it('check clear completed tasks title', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Footer />
            </Provider>,
        );
        expect(getByText("Clear completed")).toBeInTheDocument();
    });
});