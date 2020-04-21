// Import
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Model
const Product = require('./models/Product');

// App
const app = express();

mongoose.connect(`mongodb+srv://admin:glBcwrEqItx2bsAO@cluster0-o5plw.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

    // Middlewares
    app.use(bodyParser.json());

    // Cross Origin
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
      });

    // Create a Product
    app.post('/api/products', (req, res, next) => {
      delete req.body._id;
      const product = new Product({
        ...req.body
      })
      product.save()
        .then(product => res.status(201).json({ product }))
        .catch( error => res.status(400).json({ error }));
    });

    // edit a Product
    app.put('/api/products/:id', (req, res, next) => {
      Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(product => res.status(201).json({ product }))
        .catch( error => res.status(400).json({ error }));
    });

    // Find ALL Objects
    app.get('/api/products', (req, res, next) => {
      Product.find()
        .then( products => res.status(200).json({ products }))
        .catch( error => res.status(400).json({ error }))
    });

    // Find ONE Object
    app.get('/api/products/:id', (req, res, next) => {
      Product.findOne({ _id : req.params.id})
        .then( product => res.status(200).json({ product}))
        .catch( error => res.status(400).json({ error }))
    });

    // Delete one Product
    app.delete('/api/products/:id', (req, res, next) => {
      Product.deleteOne({ _id : req.params.id})
        .then( () => res.status(200).json({ message: 'Deleted!' }))
        .catch( error => res.status(400).json({ error }))
    });
    

// Export
module.exports = app;