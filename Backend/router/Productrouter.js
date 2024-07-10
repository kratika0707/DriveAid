const express = require('express');
const router = express.Router();
const Product = require('../model/Products');
const { getproducts, addproducts, AddtoCart, getproductbyId, getbycategory } = require('../Controllers/ProductController');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Uploads/'); // Set your upload directory here
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Customize file naming if needed
    }
});
const upload = multer({ storage: storage });

// router.post('/', async (req, res) => {
//     try {
//         const product = new Product(req.body);
//         await product.save();
//         res.status(201).send(product);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

router.get('/', getproducts);
router.post('/post', upload.single('image'), addproducts);
router.post('/addtocart', AddtoCart);
router.get('/getproduct/:productId', getproductbyId);
router.get('getbycategory',getbycategory );
module.exports = router;