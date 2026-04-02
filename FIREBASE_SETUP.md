# Firebase Integration Guide

This guide explains how to set up Firebase for your food e-commerce website.

## 🔥 Firebase Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter your project name (e.g., "food-ecommerce")
4. Enable Google Analytics (optional)
5. Create project

### 2. Enable Firestore Database

1. In your Firebase project, go to **Firestore Database**
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location closest to your users
5. Click "Done"

### 3. Enable Authentication (Optional)

1. Go to **Authentication** in Firebase Console
2. Click "Get started"
3. Go to **Sign-in method** tab
4. Enable desired providers (Email/Password, Google, etc.)

### 4. Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (`</>`) to create a web app
4. Register your app with a name
5. Copy the Firebase configuration object

### 5. Setup Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Replace the placeholder values in `.env` with your Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=your-actual-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-actual-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

## 📊 Firestore Collections

The application uses the following Firestore collections:

### Products Collection
```
products/
├── {productId}/
    ├── name: string
    ├── price: number
    ├── image: string
    ├── description: string
```

### Orders Collection
```
orders/
├── {orderId}/
    ├── userId: string
    ├── items: array
    ├── total: number
    ├── shippingAddress: object
    ├── status: string
    ├── createdAt: timestamp
    ├── updatedAt: timestamp
```

### Users Collection
```
users/
├── {userId}/
    ├── email: string
    ├── firstName: string
    ├── lastName: string
    ├── phone: string
    ├── addresses: array
    ├── createdAt: timestamp
    ├── updatedAt: timestamp
```

## 🚀 Features Implemented

### ✅ Product Management
- Fetch products from Firestore
- Display products with loading states
- Error handling for failed requests
- Fallback to mock data if Firebase is unavailable

### ✅ Shopping Cart
- Add/remove products from cart
- Persistent cart storage with localStorage
- Real-time cart updates

### ✅ Order Management
- Create orders in Firestore
- Track order status
- User order history

### 🔄 Offline Support
- Cart data persists in localStorage
- Graceful fallback to mock data
- Error states with user feedback

## 🛠️ Development

### Running with Firebase

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables (see step 5 above)

3. Start development server:
   ```bash
   npm run dev
   ```

### Testing without Firebase

The application includes fallback mock data, so it works even without Firebase setup:

- Products will load from mock data
- Cart functionality works with localStorage
- All UI features are functional

## 📱 Production Deployment

### Firestore Security Rules

Update your Firestore security rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products are public readable
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users
    }
    
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can only access their own orders
    match /orders/{orderId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

### Environment Variables for Production

Set the same environment variables in your hosting platform (Vercel, Netlify, etc.).

## 🎯 Next Steps

### Recommended Enhancements

1. **Authentication**
   - Add user login/registration
   - User profiles and order history
   - Admin dashboard for product management

2. **Advanced Features**
   - Real-time inventory tracking
   - Product reviews and ratings
   - Search and filtering
   - Payment integration (Stripe, PayPal)

3. **Performance**
   - Image optimization
   - Product pagination
   - Caching strategies

4. **Analytics**
   - Firebase Analytics
   - User behavior tracking
   - Sales reporting

## 🆘 Troubleshooting

### Common Issues

1. **Firebase Config Error**
   - Ensure all environment variables are set correctly
   - Check that project ID matches your Firebase project

2. **Firestore Permission Denied**
   - Verify security rules allow reading products
   - Check authentication status for protected operations

3. **Products Not Loading**
   - Check browser console for errors
   - Verify Firestore is enabled and configured
   - Mock data should work as fallback

### Need Help?

- Check the browser console for detailed error messages
- Ensure `.env` file is properly configured
- Verify Firebase project settings match your configuration