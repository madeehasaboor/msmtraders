const express = require('express');
const router = express.Router();

// Sample products data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
        price: "89.99",
        category: "audio",
        image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center"
    },
    {
        id: 2,
        name: "Smartphone Charging Cable",
        description: "Fast charging USB-C cable compatible with all modern smartphones. 6ft length.",
        price: "15.99",
        category: "cables",
        image_url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop&crop=center"
    },
    {
        id: 3,
        name: "Portable Power Bank",
        description: "20000mAh portable charger with fast charging technology. Compatible with all devices.",
        price: "45.50",
        category: "accessories",
        image_url: "https://images.unsplash.com/photo-1609592807909-3c0a58b9e4e2?w=400&h=300&fit=crop&crop=center"
    }
];

// GET all products
router.get('/', (req, res) => {
    res.json(products);
});

// GET product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});

module.exports = router;
