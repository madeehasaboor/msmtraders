// Backend API Example for MSM Traders E-commerce
// This is an example of how to set up your backend API endpoints

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample product database
const products = [
    { id: 1, name: 'AIM Air Diffuser Arabic Oud', price: '₨1,500', category: 'perfumes', image: 'perfumes/aim air diffuser arabic oud.jpeg', description: 'Premium Arabic oud air diffuser' },
    { id: 2, name: 'AIM Foamy Cleaner', price: '₨750', category: 'house_care', image: 'house_care/aim foamy cleaner.jpeg', description: 'Multi-purpose foamy cleaner' },
    { id: 3, name: 'ASUS ROG Gaming Laptop', price: '$1,299', category: 'laptops', image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description: 'High-performance gaming laptop' },
    { id: 4, name: 'Non-Stick Cookware Set', price: '₨28,950', category: 'crockery', image: 'crockery/Non-Stick Cooking Set with Glass Lid.png', description: 'Complete non-stick cookware set' },
    { id: 5, name: 'Kitchen Cutlery Set', price: '₨9,950', category: 'crockery', image: 'crockery/cutlery/Kitchen Cutlery Knife Set 12pcs.jpeg', description: 'Professional kitchen cutlery set' },
    { id: 6, name: 'Golden Cake Stand', price: '₨7,450', category: 'crockery', image: 'crockery/cake dishes/2 Tier Serving Platter Cake dish Golden Royal design.jpg', description: 'Elegant golden cake stand' },
    { id: 7, name: 'AIM Furniture Polish', price: '₨650', category: 'house_care', image: 'house_care/aim furniture polish.jpeg', description: 'Premium furniture polish' },
    { id: 8, name: 'Stainless Steel Chafing Dish', price: '₨4,500', category: 'crockery', image: 'crockery/Elegant Stainless Steel Serving Dish with Tempered Glass Lid.png', description: 'Professional chafing dish' }
];

// Search API endpoint
app.get('/api/search', (req, res) => {
    const { q } = req.query;
    
    if (!q) {
        return res.status(400).json({ error: 'Search query is required' });
    }
    
    const searchTerm = q.toLowerCase();
    const results = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    
    res.json(results);
});

// Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
});

// Get products by category
app.get('/api/products/category/:category', (req, res) => {
    const category = req.params.category;
    const categoryProducts = products.filter(p => p.category === category);
    
    res.json(categoryProducts);
});

// Get suggestions based on user preferences
app.get('/api/suggestions', (req, res) => {
    // This would typically use user data, purchase history, etc.
    // For now, return featured products
    const suggestions = [
        { id: 1, name: 'Trending: Electronics Sale', description: 'Up to 50% off on latest gadgets', image: 'slide show/8a3223b3-ae77-42cc-b3db-abc5a1cf8c1e.__CR0,0,2983,1845_PT0_SX970_V1___.jpg', category: 'electronics' },
        { id: 2, name: 'Popular: Premium Crockery', description: 'Elegant dining sets & kitchenware', image: 'slide show/crockery.jpg', category: 'crockery' },
        { id: 3, name: 'Featured: Beauty & Cosmetics', description: 'Enhance your natural beauty', image: 'slide show/makeup.jfif', category: 'cosmetics' },
        { id: 4, name: 'Recommended: Car Care Products', description: 'Keep your vehicle shining', image: 'car_care/auto shine wax.jpg', category: 'car_care' },
        { id: 5, name: 'New: House Care Essentials', description: 'Clean and maintain your home', image: 'house_care/aim foamy cleaner.jpeg', category: 'house_care' }
    ];
    
    res.json(suggestions);
});

// Get deals of the day
app.get('/api/deals', (req, res) => {
    const deals = products.filter(product => 
        product.category === 'perfumes' || 
        product.category === 'house_care' || 
        product.category === 'crockery'
    ).slice(0, 6);
    
    res.json(deals);
});

// Add to cart (mock implementation)
app.post('/api/cart/add', (req, res) => {
    const { productId, quantity = 1 } = req.body;
    
    // In a real app, this would save to database
    res.json({ 
        success: true, 
        message: 'Product added to cart',
        productId,
        quantity 
    });
});

// Get cart items (mock implementation)
app.get('/api/cart', (req, res) => {
    // Mock cart data
    const cartItems = [
        { id: 1, name: 'AIM Air Diffuser', price: '₨1,200', quantity: 1 },
        { id: 2, name: 'AIM Foamy Cleaner', price: '₨600', quantity: 2 },
        { id: 3, name: 'Gaming Laptop', price: '$1,104', quantity: 1 }
    ];
    
    res.json(cartItems);
});

// User authentication endpoints (mock)
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    // Mock authentication
    if (email && password) {
        res.json({ 
            success: true, 
            token: 'mock-jwt-token',
            user: { id: 1, email, name: 'John Doe' }
        });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    
    // Mock registration
    res.json({ 
        success: true, 
        message: 'User registered successfully',
        user: { id: Date.now(), name, email }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`MSM Traders API server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET  /api/search?q=query');
    console.log('  GET  /api/products');
    console.log('  GET  /api/products/:id');
    console.log('  GET  /api/products/category/:category');
    console.log('  GET  /api/suggestions');
    console.log('  GET  /api/deals');
    console.log('  POST /api/cart/add');
    console.log('  GET  /api/cart');
    console.log('  POST /api/auth/login');
    console.log('  POST /api/auth/register');
});

module.exports = app;
