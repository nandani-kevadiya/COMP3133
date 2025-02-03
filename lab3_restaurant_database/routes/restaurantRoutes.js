const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// 1. Get all restaurants
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Get restaurants by cuisine
router.get('/cuisine/:type', async (req, res) => {
    try {
        const cuisineType = req.params.type;
        const restaurants = await Restaurant.find({ cuisine: cuisineType });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. Get selected fields and sort by restaurant_id
router.get('/sort', async (req, res) => {
    try {
        const sortDirection = req.query.sortBy === 'DESC' ? -1 : 1;
        const restaurants = await Restaurant.find({}, { restaurant_id: 1, name: 1, city: 1, cuisine: 1 })
            .sort({ restaurant_id: sortDirection });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. Get restaurants where cuisine is "Delicatessen" and city is not "Brooklyn"
router.get('/Delicatessen', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({ 
            cuisine: "Delicatessen", 
            city: { $ne: "Brooklyn" } 
        }, { _id: 0, name: 1, city: 1, cuisine: 1 })
        .sort({ name: 1 });
        
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
