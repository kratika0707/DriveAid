const Product =require('../model/Products');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Cart = require('../model/Cart');
// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST route for adding a new product
exports.addproducts = async (req, res) => {
    try {
        const {image, title, detail, category, rating,price } = req.body;
        //const image = req.file.buffer; // Assuming 'image' field is in 'multipart/form-data'

        const newProduct = new Product({
            image: image,
            price: price,
            title: title,
            detail :detail,
            category: category,
            rating:rating,
        });

        await newProduct.save();
        res.status(201).send('Product added successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add product' });
    }
};



exports.getproducts= async(req,res)=>{
    try {
        const products = await Product.find(); // Replace with your actual query
        res.json(products);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
      }
}


exports.AddtoCart =async(req,res)=>{
    try {
        const { mechanicId, productId, price } = req.body;

        // Check if the product is already in the cart
        let existingItem = await Cart.findOne({ mechanicId, productId });

        if (existingItem) {
            existingItem.price+=price;
            existingItem.quantity += 1;
            await existingItem.save();
            return res.status(200).json({ message: 'Quantity increased in cart' });
        }

        // Create a new cart item with quantity 1 if it doesn't exist
        const newCartItem = new Cart({ mechanicId, productId, quantity: 1, price });
        await newCartItem.save();

        res.status(201).json({ message: 'Product added to cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add product to cart' });
    }
}


exports.getproductbyId = async(req,res)=>{
    try{
        const {productId}= req.params;
        const product= await Product.findById(productId);
        res.status(200).json(product);
      }catch(error){
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'An error occurred while fetching product' });
      }
    
    

}


exports.getbycategory= async(req,res)=>{
    const category = req.query.category;
    try {
        const products = await Product.find({ category: category });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}