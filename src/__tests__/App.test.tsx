import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { App } from '../App';
import store from '../store/store';

describe('App', () => {
  it('should render todos text when rendered on screen with redux and provider setup', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(getByText("todos")).toBeInTheDocument();
  });
});
