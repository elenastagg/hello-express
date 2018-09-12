const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const helloWorld = require('./src/controllers/helloWorld');
const createShoppingList = require('./src/controllers/createShoppingList');
const getShoppingList = require('./src/controllers/getShoppingList');
const updateShoppingList = require('./src/controllers/updateShoppingList');
const deleteShoppingList = require('./src/controllers/deleteShoppingList');

app.use(bodyParser.json());

app.get('/', helloWorld);
app.post('/shopping-lists', createShoppingList);
app.get('/shopping-lists/:filename', getShoppingList);
app.put('/shopping-lists/:filename', updateShoppingList);
app.delete('/shopping-lists/:filename', deleteShoppingList);
app.listen(3000, () => console.log('Example app listening on port 3000!'));
