const fs = require('fs');
const path = require('path');
const httpMocks = require('node-mocks-http');
const createShoppingList = require('../controllers/createShoppingList');

it('creates a new shopping list', (done) => {
  expect.assertions(1);
  const body = {
    items: ['broccoli', 'bread', 'bananas'];
  };
  const request = httpMocks.createRequest({
    method: 'POST',
    url: '/shoppingLists',
    body: body,
  });

})