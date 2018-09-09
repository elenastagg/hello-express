const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const helloWorld = require('./controllers/helloWorld');
const createShoppingList = require('./controllers/createShoppingList');

app.use(bodyParser.json());

app.get('/', helloWorld);

app.post('/shoppingLists', createShoppingList);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
