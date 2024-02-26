const Product = require('../models/Product');

// Получить все товары
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// Получить один товар по ID
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Создать новый товар
exports.createProduct = async (req, res, next) => {
  try {
    const { name, category, price } = req.body;
    const product = new Product({ name, category, price });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// Обновить товар по ID
exports.updateProduct = async (req, res, next) => {
  try {
    const update = req.body;
    const productId = req.params.id;
    const product = await Product.findByIdAndUpdate(productId, update, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Удалить товар по ID
exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};
