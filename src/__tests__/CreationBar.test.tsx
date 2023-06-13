import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/store';
import { CreationBar } from '../components/creation-bar/creation-bar';

describe('CreationBar', () => {
    it('Check input with placeholder', () => {
        const { getByPlaceholderText } = render(
            <Provider store={store}>
                <CreationBar />
            </Provider>,
        );
        expect(getByPlaceholderText("What needs to be done?")).toBeInTheDocument();
    });

    it('Check ArrowIcon', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <CreationBar />
            </Provider>,
        );
        const arrowDownIcon = getByTestId('arrow-down-icon');

        expect(arrowDownIcon).toBeInTheDocument();
    });
});