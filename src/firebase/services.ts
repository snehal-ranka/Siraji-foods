import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  limit,
  where
} from 'firebase/firestore';
import { db } from './config';
import type { Product } from '../contexts/CartContext';

// Products Collection
const PRODUCTS_COLLECTION = 'products';
const ORDERS_COLLECTION = 'orders';
const USERS_COLLECTION = 'users';

// Product Services
export const productService = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const productsRef = collection(db, PRODUCTS_COLLECTION);
      const q = query(productsRef, orderBy('name', 'asc'));
      const querySnapshot = await getDocs(q);
      
      const products: Product[] = [];
      querySnapshot.forEach((doc) => {
        products.push({ 
          id: parseInt(doc.id), 
          ...doc.data() 
        } as Product);
      });
      
      return products;
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  },

  // Get single product
  getProduct: async (id: string): Promise<Product | null> => {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { 
          id: parseInt(docSnap.id), 
          ...docSnap.data() 
        } as Product;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting product:', error);
      throw error;
    }
  },

  // Add new product (Admin function)
  addProduct: async (product: Omit<Product, 'id'>): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), product);
      return docRef.id;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  // Update product (Admin function)
  updateProduct: async (id: string, updates: Partial<Product>): Promise<void> => {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, id);
      await updateDoc(docRef, updates);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product (Admin function)
  deleteProduct: async (id: string): Promise<void> => {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Get featured products
  getFeaturedProducts: async (count: number = 8): Promise<Product[]> => {
    try {
      const productsRef = collection(db, PRODUCTS_COLLECTION);
      const q = query(productsRef, limit(count));
      const querySnapshot = await getDocs(q);
      
      const products: Product[] = [];
      querySnapshot.forEach((doc) => {
        products.push({ 
          id: parseInt(doc.id), 
          ...doc.data() 
        } as Product);
      });
      
      return products;
    } catch (error) {
      console.error('Error getting featured products:', error);
      throw error;
    }
  }
};

// Order Services
interface Order {
  id?: string;
  userId: string;
  items: Array<{
    productId: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export const orderService = {
  // Create new order
  createOrder: async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    try {
      const orderData = {
        ...order,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const docRef = await addDoc(collection(db, ORDERS_COLLECTION), orderData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get orders by user
  getUserOrders: async (userId: string): Promise<Order[]> => {
    try {
      const ordersRef = collection(db, ORDERS_COLLECTION);
      const q = query(
        ordersRef, 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const orders: Order[] = [];
      querySnapshot.forEach((doc) => {
        orders.push({ 
          id: doc.id, 
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
          updatedAt: doc.data().updatedAt.toDate()
        } as Order);
      });
      
      return orders;
    } catch (error) {
      console.error('Error getting user orders:', error);
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId: string, status: Order['status']): Promise<void> => {
    try {
      const docRef = doc(db, ORDERS_COLLECTION, orderId);
      await updateDoc(docRef, {
        status,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
};

// User Services
interface UserProfile {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: Array<{
    type: 'shipping' | 'billing';
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export const userService = {
  // Create user profile
  createUserProfile: async (uid: string, profile: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
    try {
      const userData = {
        ...profile,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await updateDoc(doc(db, USERS_COLLECTION, uid), userData);
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  },

  // Get user profile
  getUserProfile: async (uid: string): Promise<UserProfile | null> => {
    try {
      const docRef = doc(db, USERS_COLLECTION, uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { 
          id: docSnap.id, 
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt.toDate(),
          updatedAt: docSnap.data().updatedAt.toDate()
        } as UserProfile;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  },

  // Update user profile
  updateUserProfile: async (uid: string, updates: Partial<UserProfile>): Promise<void> => {
    try {
      const docRef = doc(db, USERS_COLLECTION, uid);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }
};

// Initialize default products (run once)
export const initializeDefaultProducts = async (): Promise<void> => {
  try {
    const defaultProducts = [
      {
        name: 'Premium Pears Mix',
        price: 24.99,
        image: '/api/placeholder/300/300',
        description: 'Fresh premium pears, perfect for healthy snacking. Hand-picked and carefully selected for the best quality.'
      },
      {
        name: 'Mixed Seeds Collection',
        price: 18.50,
        image: '/api/placeholder/300/300',
        description: 'Collection of natural seeds and grains packed with nutrition and authentic flavors.'
      },
      {
        name: 'Traditional Spice Mix',
        price: 32.99,
        image: '/api/placeholder/300/300',
        description: 'Authentic spice blend for traditional cooking. Made with the finest ingredients.'
      },
      {
        name: 'Natural Ingredients Set',
        price: 29.75,
        image: '/api/placeholder/300/300',
        description: 'All natural ingredients for your kitchen. Perfect for traditional recipes.'
      },
      {
        name: 'Premium Pujani Mix',
        price: 45.99,
        image: '/api/placeholder/300/300',
        description: 'Hand-crafted mix with perfect combination of spices and natural ingredients.'
      },
      {
        name: 'Classic Garam Jaram Mix',
        price: 38.99,
        image: '/api/placeholder/300/300',
        description: 'Traditional blend with authentic flavors that brings warmth to every dish.'
      }
    ];

    // Check if products already exist
    const existingProducts = await productService.getAllProducts();
    
    if (existingProducts.length === 0) {
      console.log('Initializing default products...');
      for (const product of defaultProducts) {
        await productService.addProduct(product);
      }
      console.log('Default products initialized successfully!');
    }
  } catch (error) {
    console.error('Error initializing default products:', error);
  }
};