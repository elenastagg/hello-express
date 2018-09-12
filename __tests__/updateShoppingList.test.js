const fs = require('fs');
const path = require('path');
const httpMocks = require('node-mocks-http');
const updateShoppingList = require('../src/controllers/updateShoppingList');
const events = require('events');

it('updates an existing shopping list', (done) => {
  expect.assertions(1);
  const filename = Date.now().toString();
  const filePath = path.join(__dirname, '../data/shoppingLists', filename);
  const body = {
    items: ['carrots', 'crunchies', 'cheese'],
  };
  fs.writeFile(filePath, JSON.stringify(body), (err) => {
    if (err) throw err;
    const request = httpMocks.createRequest({
      method: 'PUT',
      url: '/shopping-lists/:filename',
      params: {
        filename: filename,
      },
      body: body,
    });
    const response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter,
    });

    updateShoppingList(request, response);
    response.on('end', () => {
      fs.readFile(filePath, 'utf8', (error, data) => {
        expect(data).toBe(JSON.stringify(request.body));
        done();
      });
    });
  });
});
