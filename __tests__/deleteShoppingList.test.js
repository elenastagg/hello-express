const fs = require('fs');
const path = require('path');
const httpMocks = require('node-mocks-http');
const deleteShoppingList = require('../src/controllers/deleteShoppingList');
const events = require('events');

it('deletes an existing shopping list', (done) => {
  expect.assertions(1);
  const filename = Date.now().toString();
  const filePath = path.join(__dirname, '../data/shoppingLists', filename);
  fs.writeFile(filePath, 'hello', (err) => {
    if (err) throw err;
    const request = httpMocks.createRequest({
      method: 'DELETE',
      url: '/shopping-lists/:filename',
      params: {
        filename: filename,
      },
    });
    const response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter,
    });

    deleteShoppingList(request, response);
    response.on('end', () => {
      fs.stat(filePath, (error, stats) => {
        expect(error.code).toBe('ENOENT');
        done();
      });
    });
  });
});
