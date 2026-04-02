import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import { productService, initializeDefaultProducts } from '../firebase/services';
import type { Product } from './CartContext';
import chakli from '../assets/chakalimix.jpeg';
import chiwada from '../assets/chiwdamasala.jpeg';
import jamun from '../assets/gilabjamunaata.jpeg';
import methi from '../assets/kasturimethi.jpeg';
import achar from '../assets/lonchemasala.jpeg';
import papad from '../assets/papad-aata.jpeg';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

type ProductAction =
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_PRODUCTS'; products: Product[] }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'SET_INITIALIZED'; initialized: boolean }
  | { type: 'ADD_PRODUCT'; product: Product }
  | { type: 'UPDATE_PRODUCT'; id: number; updates: Partial<Product> }
  | { type: 'DELETE_PRODUCT'; id: number };

interface ProductContextType {
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: number, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  getProduct: (id: number) => Product | undefined;
  getFeaturedProducts: (count?: number) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
      
    case 'SET_PRODUCTS':
      return { ...state, products: action.products, loading: false, error: null };
      
    case 'SET_ERROR':
      return { ...state, error: action.error, loading: false };
      
    case 'SET_INITIALIZED':
      return { ...state, initialized: action.initialized };
      
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.product] };
      
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.id ? { ...product, ...action.updates } : product
        )
      };
      
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.id)
      };
      
    default:
      return state;
  }
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, {
    products: [],
    loading: false,
    error: null,
    initialized: false
  });

  // Initialize products on mount
  useEffect(() => {
    const initializeProducts = async () => {
      try {
        dispatch({ type: 'SET_LOADING', loading: true });
        
        // Initialize default products if needed
        await initializeDefaultProducts();
        
        // Fetch all products
        await fetchProducts();
        
        dispatch({ type: 'SET_INITIALIZED', initialized: true });
      } catch (error) {
        console.error('Error initializing products:', error);
        dispatch({ type: 'SET_ERROR', error: 'Failed to initialize products' });
        
        // Fallback to mock data if Firebase fails
        const mockProducts: Product[] = [
          {
            id: 1,
            name: 'Premium Papad Mix',
            price: 99,
            image: papad,
            description: 'Fresh premium pears, perfect for healthy snacking. Hand-picked and carefully selected for the best quality.'
          },
          {
            id: 2,
            name: 'Premium Chiwda Masala',
            price: 59,
            image: chiwada,
            description: 'Collection of natural seeds and grains packed with nutrition and authentic flavors.'
          },
          {
            id: 3,
            name: 'Traditional Chakali Bhajani Peeth',
            price: 199,
            image: chakli,
            description: 'Authentic spice blend for traditional cooking. Made with the finest ingredients.'
          },
          {
            id: 4,
            name: 'Gulab Jamum Mix',
            price: 179,
            image: jamun,
            description: 'All natural ingredients for your kitchen. Perfect for traditional recipes.'
          },
          {
            id: 5,
            name: 'Premium Lonache Mix',
            price: 119,
            image: achar,
            description: 'Hand-crafted mix with perfect combination of spices and natural ingredients.'
          },
          {
            id: 6,
            name: 'Classic Palak Paneer Mix',
            price: 49,
            image: '/api/placeholder/300/300',
            description: 'Traditional blend with authentic flavors that brings warmth to every dish.'
          }
        ];
        
        dispatch({ type: 'SET_PRODUCTS', products: mockProducts });
        dispatch({ type: 'SET_INITIALIZED', initialized: true });
      }
    };

    if (!state.initialized) {
      initializeProducts();
    }
  }, [state.initialized]);

  const fetchProducts = async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const products = await productService.getAllProducts();
      dispatch({ type: 'SET_PRODUCTS', products });
    } catch (error) {
      console.error('Error fetching products:', error);
      dispatch({ type: 'SET_ERROR', error: 'Failed to fetch products' });
    }
  };

  const addProduct = async (product: Omit<Product, 'id'>): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const id = await productService.addProduct(product);
      const newProduct: Product = { ...product, id: parseInt(id) };
      dispatch({ type: 'ADD_PRODUCT', product: newProduct });
      dispatch({ type: 'SET_LOADING', loading: false });
    } catch (error) {
      console.error('Error adding product:', error);
      dispatch({ type: 'SET_ERROR', error: 'Failed to add product' });
    }
  };

  const updateProduct = async (id: number, updates: Partial<Product>): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      await productService.updateProduct(id.toString(), updates);
      dispatch({ type: 'UPDATE_PRODUCT', id, updates });
      dispatch({ type: 'SET_LOADING', loading: false });
    } catch (error) {
      console.error('Error updating product:', error);
      dispatch({ type: 'SET_ERROR', error: 'Failed to update product' });
    }
  };

  const deleteProduct = async (id: number): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      await productService.deleteProduct(id.toString());
      dispatch({ type: 'DELETE_PRODUCT', id });
      dispatch({ type: 'SET_LOADING', loading: false });
    } catch (error) {
      console.error('Error deleting product:', error);
      dispatch({ type: 'SET_ERROR', error: 'Failed to delete product' });
    }
  };

  const getProduct = (id: number): Product | undefined => {
    return state.products.find(product => product.id === id);
  };

  const getFeaturedProducts = (count: number = 8): Product[] => {
    return state.products.slice(0, count);
  };

  return (
    <ProductContext.Provider
      value={{
        state,
        dispatch,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
        getFeaturedProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};