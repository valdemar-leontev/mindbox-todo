import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import React from 'react';
import { Provider } from 'react-redux';
import { App } from '../App';
import store from '../store/store';
import { Footer } from '../components/footer/footer';

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