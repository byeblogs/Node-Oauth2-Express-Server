'use strict';

// Importing required modules.
require('./models/db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var authRoutes = require('./routes/auth_user.routes');
var categoryRoutes = require('./routes/category.routes');
var productRoutes = require('./routes/product.routes');
var userCartRoutes = require('./routes/user_cart.routes');
var scopeRoutes = require('./routes/scope.routes');
const oAuth2Server = require('node-oauth2-server');
const authModel = require('./authorization/model');
var swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

// Initializes express server.
var app = express();

// Initializes Outh2Server using express.
app.oauth = oAuth2Server({
    model: authModel,
    grants: ['password'],
    debug: true
});

// MiddleWares & Routes. 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/user_cart', userCartRoutes);
app.use('/scope', scopeRoutes);
app.use('/', (req, res) => {
    res.status(404).json({ status: 404, message: 'Sorry, API does not exist!' });
});
app.use(app.oauth.errorHandler());

// Listening to the server on PORT 5000.
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err, done) => {
    if (!err) console.log('started your server');
    if (err) console.log('something went wrong :' + err);
});
 
// Exporting the app.js file.
module.exports = app;