import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// In-memory storage for products
let products = [];
let productIdCounter = 1;

// Serve static files
app.use('/uploads', express.static('uploads'));

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
  try {
    res.json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  try {
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Create product
app.post('/api/products', upload.single('image'), (req, res) => {
  try {
    const { name, quantity, price, discount, expiryDate, rating, inStock } =
      req.body;

    // Validation
    if (!name || !quantity || !price || !expiryDate) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    const newProduct = {
      id: productIdCounter++,
      name,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      discount: parseFloat(discount) || 0,
      expiryDate,
      rating: parseFloat(rating) || 5,
      inStock: inStock || 'in-stock',
      image: req.file ? `/uploads/${req.file.filename}` : null,
      createdAt: new Date().toISOString(),
    };

    products.push(newProduct);

    console.log('Product created successfully:', newProduct);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Update product
app.put('/api/products/:id', upload.single('image'), (req, res) => {
  try {
    const productIndex = products.findIndex(
      (p) => p.id === parseInt(req.params.id)
    );

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    const { name, quantity, price, discount, expiryDate, rating, inStock } =
      req.body;

    products[productIndex] = {
      ...products[productIndex],
      name: name || products[productIndex].name,
      quantity: quantity ? parseInt(quantity) : products[productIndex].quantity,
      price: price ? parseFloat(price) : products[productIndex].price,
      discount: discount ? parseFloat(discount) : products[productIndex].discount,
      expiryDate: expiryDate || products[productIndex].expiryDate,
      rating: rating ? parseFloat(rating) : products[productIndex].rating,
      inStock: inStock || products[productIndex].inStock,
      image: req.file
        ? `/uploads/${req.file.filename}`
        : products[productIndex].image,
      updatedAt: new Date().toISOString(),
    };

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: products[productIndex],
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
  try {
    const productIndex = products.findIndex(
      (p) => p.id === parseInt(req.params.id)
    );

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    const deletedProduct = products.splice(productIndex, 1);

    res.json({
      success: true,
      message: 'Product deleted successfully',
      data: deletedProduct[0],
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API Health: http://localhost:${PORT}/api/health`);
});
