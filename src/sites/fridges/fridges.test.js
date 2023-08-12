import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { FridgesComponent } from './fridges';


const mockFridgeContext = {
  createFridge: jest.fn(),
  fridges: [{ id: 1, name: 'Fridge 1' }, { id: 2, name: 'Fridge 2' }],
};

jest.mock('../../App', () => ({
  useFridgeContext: () => mockFridgeContext,
}));

jest.mock('../../components/size/size', () => ({
  useSize: () => ({
    width: 1000
  }),
}));

test('renders fridge list and create button', () => {
  render(
    <MemoryRouter>
      <FridgesComponent />
    </MemoryRouter>
  );

  const createButton = screen.getByText('create fridge');
  expect(createButton).toBeInTheDocument();

  const fridgeList = screen.getByRole('list');
  expect(fridgeList).toBeInTheDocument();
});

test('calls createFridge function when create button is clicked', () => {
  render(
    <MemoryRouter>
      <FridgesComponent />
    </MemoryRouter>
  );

  const createButton = screen.getByText('create fridge');
  fireEvent.click(createButton);

  expect(mockFridgeContext.createFridge).toHaveBeenCalledTimes(1);
});