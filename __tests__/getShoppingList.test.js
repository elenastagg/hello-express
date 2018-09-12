const fs = require('fs');
const path = require('path');
const httpMocks = require('node-mocks-http');
const getShoppingList = require('../src/controllers/getShoppingList');
const events = require('events');

it('gets an existing shopping list', (done) => {
  expect.assertions(1);
  const filename = Date.now().toString();
  const filePath = path.join(__dirname, '../data/shoppingLists', filename);
  const body = JSON.stringify({
    items: ['carrots', 'crunchies', 'cornflakes'],
  });
  fs.writeFile(filePath, body, (err) => {
    if (err) throw err;

    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/shopping-lists/:filename',
      params: {
        filename: filename,
      },
    });

    const response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter,
    });

    getShoppingList(request, response);

    response.on('end', () => {
      expect(response._getData()).toEqual(body);
      done();
    });
  });
});
