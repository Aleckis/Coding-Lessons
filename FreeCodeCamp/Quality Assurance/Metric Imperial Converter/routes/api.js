'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.get('/api/convert', (req, res) => {
    const input = req.query.input;
    const result = convertHandler.parse(input);
    res.json(result);
  });

};
