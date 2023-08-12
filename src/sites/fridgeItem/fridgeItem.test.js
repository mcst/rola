import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { FridgeContext } from '../../App';
import { FridgeItemComponent } from './fridgeItem';
describe('FridgeItemComponent Routing', () => {
      
    test('renders FridgeItemComponent on valid route', async () => {
      render(
        <MemoryRouter initialEntries={['/fridges/fridge1/items/item1']}>
          <FridgeContext.Provider value={{fridges:[{id:1,inventory:[{id:1,name:1}]}]}}>
              <Routes>
                <Route path="/fridges/:id/items/:itemId" element={<FridgeItemComponent />} />
              </Routes>
          </FridgeContext.Provider>
        </MemoryRouter>
      );
  
      const updateButton = await screen.findByText('Update');
      expect(updateButton).toBeInTheDocument();
    });
  });