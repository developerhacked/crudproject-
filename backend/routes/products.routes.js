const express = require('express');
const router = express.Router();
const Product = require('../models/products');

// Create a new product
router.post('/products', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    });
    try {
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a product by ID
router.get('/products/:id', getProduct, (req, res) => {
    res.json(res.product);
});

// Update a product
router.patch('/products/:id', getProduct, async (req, res) => {
    if (req.body.name != null) {
        res.product.name = req.body.name;
    }
    if (req.body.price != null) {
        res.product.price = req.body.price;
    }
    if (req.body.description != null) {
        res.product.description = req.body.description;
    }
    try {
        const updatedProduct = await res.product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a product
router.delete('/products/:id', getProduct, async (req, res) => {
    try {
        await Product.deleteOne({ _id: res.product._id });
        res.json({ message: 'Deleted Product' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get product by ID
async function getProduct(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find product' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.product = product;
    next();
}

module.exports = router;
