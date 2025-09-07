# MSM Traders E-commerce Website

A modern, responsive e-commerce website with full functionality including search, cart, user authentication, and product management.

## Features

### ✅ Fully Functional Buttons
- **Search Bar**: Real-time search with backend integration and fallback to offline mode
- **Recently Searched**: Modal showing search history with ability to clear/remove items
- **Suggestions for You**: Personalized product recommendations
- **Account Management**: User profile, orders, wishlist, settings
- **Shopping Cart**: Add/remove items, view cart contents
- **Product Navigation**: Clickable product cards and category links

### 🎨 Design Features
- **Black & Golden Theme**: Premium, modern design
- **Responsive Design**: Works on all devices (desktop, tablet, mobile)
- **Interactive Elements**: Hover effects, animations, smooth transitions
- **Modal System**: Beautiful popup modals for search results and features
- **Notification System**: User feedback for all actions

### 🔧 Technical Features
- **Backend Integration**: Ready for API integration
- **Offline Support**: Works without backend (mock data)
- **Local Storage**: Saves search history and user preferences
- **Error Handling**: Graceful fallbacks and user notifications
- **Performance**: Optimized loading and smooth animations

## Setup Instructions

### Frontend Setup
1. Open `index.html` in your web browser
2. The website works immediately with offline functionality
3. All buttons and features are fully functional

### Backend Setup (Optional)
To enable full backend integration:

1. **Install Node.js** (version 14 or higher)

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Backend Server**:
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Update API URL** in `index.html`:
   ```javascript
   const API_BASE_URL = 'http://localhost:3000/api';
   ```

## API Endpoints

The backend provides the following endpoints:

- `GET /api/search?q=query` - Search products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `GET /api/suggestions` - Get personalized suggestions
- `GET /api/deals` - Get deals of the day
- `POST /api/cart/add` - Add item to cart
- `GET /api/cart` - Get cart items
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## File Structure

```
FRONTEND/
├── index.html                 # Main website file
├── backend-api-example.js     # Backend API server
├── package.json              # Node.js dependencies
├── README.md                 # This file
├── car_care.html            # Car care products page
├── house_care.html          # House care products page
├── perfumes.html            # Perfumes page
├── laptops.html             # Laptops page
├── electronics.html         # Electronics page
├── crockery.html            # Crockery page
├── cosmetics.html           # Cosmetics page
├── contact.html             # Contact page
├── sale.html                # Sale page
├── style.css                # Custom styles
├── script.js                # Additional JavaScript
└── [product images]/        # Product images and assets
```

## How to Use

### Search Functionality
1. **Type in search bar** and press Enter or click search button
2. **View results** in a beautiful modal with product cards
3. **Click products** to view details
4. **Access search history** via "Recently Viewed" section

### Recently Searched
1. **Click "View All"** in Recently Viewed section
2. **See search history** with timestamps
3. **Click any search** to repeat it
4. **Remove items** with the × button
5. **Clear all history** with Clear History button

### Suggestions
1. **Click "View All"** in Suggestions section
2. **Browse recommendations** based on categories
3. **Click suggestions** to view category pages
4. **Refresh suggestions** for new recommendations

### Account & Cart
1. **Click Account** for user options (login, orders, settings)
2. **Click Cart** to view cart contents and manage items
3. **All interactions** provide user feedback via notifications

## Customization

### Adding New Products
Edit the `products` array in `backend-api-example.js`:

```javascript
const products = [
    {
        id: 9,
        name: 'New Product Name',
        price: '₨1,000',
        category: 'category_name',
        image: 'path/to/image.jpg',
        description: 'Product description'
    }
    // ... more products
];
```

### Changing API URL
Update the API base URL in `index.html`:

```javascript
const API_BASE_URL = 'https://your-api-domain.com/api';
```

### Styling Customization
All styles are in the `<style>` section of `index.html`. Key classes:
- `.btn-primary` - Main buttons
- `.search-results-modal` - Modal styling
- `.notification` - Notification styling

## Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Troubleshooting

### Search Not Working
- Check if backend server is running
- Verify API URL in `index.html`
- Check browser console for errors

### Images Not Loading
- Ensure image paths are correct
- Check if image files exist in the specified directories

### Backend Connection Issues
- Verify server is running on correct port (3000)
- Check CORS settings if accessing from different domain
- Ensure all dependencies are installed

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify all files are in the correct locations
3. Ensure Node.js and dependencies are properly installed
4. Check that the backend server is running

## License

MIT License - Feel free to use and modify for your projects.
