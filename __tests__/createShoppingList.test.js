const fs = require('fs');
const path = require('path');
const httpMocks = require('node-mocks-http');
const createShoppingList = require('../src/controllers/createShoppingList');
const events = require('events');

it('creates a new shopping list', (done) => {
  expect.assertions(1);
  const body = {
    items: ['broccoli', 'bread', 'bananas'],
  };
  const request = httpMocks.createRequest({
    method: 'POST',
    url: '/shoppingLists',
    body: body,
  });

  const response = httpMocks.createResponse({
    eventEmitter: events.EventEmitter,
  });

  createShoppingList(request, response);

  response.on('end', () => {
    const filename = response._getData().filename;
    const filePath = path.join(__dirname, '../data/shoppingLists', filename);
    fs.readFile(filePath, 'utf8', (error, data) => {
      expect(data).toBe(JSON.stringify(body));
      done();
    });
  });
});
