const categoryController = require ('./../controllers/category');
const express = require ('express');

var api = express.Router();

api.post('/newCategory', categoryController.newCategory);
api.get('/getCategory', categoryController.getCategory);
api.get('/oneCategories/:id', categoryController.oneCategories);
api.get('/ProductCategory',   categoryController.ProductCategory);
module.exports = api;