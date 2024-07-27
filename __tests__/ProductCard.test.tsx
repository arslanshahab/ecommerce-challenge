// components/__tests__/ProductCard.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/contexts/CartContext';

jest.mock('@/contexts/CartContext', () => ({
    useCart: jest.fn(),
  }));
  
  const mockAddItem = jest.fn();
  
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    imageURL: 'https://via.placeholder.com/150',
    price: 101,
    index: 0,
  };
  
  describe('ProductCard', () => {
    beforeEach(() => {
      (useCart as jest.Mock).mockReturnValue({
        addItem: mockAddItem,
      });
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('renders product card with product details', () => {
      render(<ProductCard {...mockProduct} />);
      
      expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
      
      // Find the price element within a specific container
      const priceElement = screen.getByText(/101 SAR/i);
      expect(priceElement).toBeInTheDocument();
      
      const imgElement = screen.getByRole('img');
      expect(imgElement).toHaveAttribute('src', "/_next/image?url=%2Fassets%2Fmain-slider%2F01.png&w=3840&q=75");
    });
  
    test('handles add to cart button click', () => {
      render(<ProductCard {...mockProduct} />);
      
      fireEvent.click(screen.getByText(/إضافة للسلة/i));
      expect(mockAddItem).toHaveBeenCalledWith(mockProduct.id, 1);
    });
  });