const express = require('express')
const uuidv4 = require('uuid/v4');

const auth = require('../middlewares/auth');
const validateProduct = require('./products.validate');
let products = require('../../db').products;
const logger = require('../lib/logger');

const productsRoutes = express.Router()

productsRoutes.get('/', auth, (req, res) => {
  logger.info('Se obtuvo todos los productos');
  res.json(products);
});

productsRoutes.post('/', auth, validateProduct, (req, res) => {
  const newProduct = { ...req.body, id: uuidv4() };
  try {
    products.push(newProduct);
    res.json(newProduct);
  } catch (error) {
    logger.error('No se pudo optener la DB');
  }
})

///products/098as908asd098asd089
productsRoutes.put('/:id', auth, (req, res) => {
  const filterProduct = products.filter(product => product.id === req.params.id)[0];

  if (filterProduct.owner === req.body.owner) {
    const updatedProduct = { ...filterProduct, ...req.body };
    logger.info('Se actualizo con exito el producto');
    res.json(updatedProduct);
  } else {
    return res.status(403).send('No tienes permiso.');
  }
})

// DESTROY
productsRoutes.delete('/:id', auth, (req, res) => {
  const filterProduct = products.filter(product => product.id === req.params.id)[0];

  if (filterProduct.owner === req.body.owner) {
    const productsWithoutSelected = products.filter(product => product.id !== req.params.id)[0];
    products = productsWithoutSelected;
    res.json({filterProduct,message: `Se elimino el producto: ${filterProduct.name}`});
  } else {
    return res.status(403).send('No tienes permiso.');
  }
});

module.exports = productsRoutes;