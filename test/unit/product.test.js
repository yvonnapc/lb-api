'use strict';

const {app, expect} = require('../common');

const Product = app.models.Product;


describe('It should resolve', function(){
  it('a Product.find', function(){
    return Product
    .find()
    .then(res => console.log(res));
  })
})
