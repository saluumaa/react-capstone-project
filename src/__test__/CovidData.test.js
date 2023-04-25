import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import store from '../redux/store';
import CovidData from '../components/CovidData';

describe('CovidData component', () => {
  it('renders the covid component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CovidData />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
