import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from '@/components/CartItem';

const mockProps = {
  id: 1,
  name: 'Test Product',
  imageURL: 'test.jpg',
  price: 10,
  quantity: 2,
  description: 'Test Description',
  increment: jest.fn(),
  decrement: jest.fn(),
  remove: jest.fn(),
};

test('CartItem interactions', () => {
  render(<CartItem {...mockProps} />);
  
  const incrementButton = screen.getByText('+');
  const decrementButton = screen.getByText('-');
  const removeButton = screen.getByRole('button', { name: '' });
  
  fireEvent.click(incrementButton);
  expect(mockProps.increment).toHaveBeenCalledTimes(1);
  
  fireEvent.click(decrementButton);
  expect(mockProps.decrement).toHaveBeenCalledTimes(1);
  
  fireEvent.click(removeButton);
  expect(mockProps.remove).toHaveBeenCalledTimes(1);
});