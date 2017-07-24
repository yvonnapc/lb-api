'use strict';

const {app, expect} = require('../common');

const Product = app.models.Product;

describe('Custom methods', function(){

  it('should allow buying a product', function(){
    const product = new Product({name: 'buy-product', price: 300})
    return product.buy(10, function(err, res){
      expect(res.status).to.contain('You bought ${quantity} product(s)')
    })
  })

  it('should not allow buying a negative product quantity', function(){
    const product = new Product({name:'buy-product', price: 300})
    return product.buy(-10, function(err, res){
      expect(err).to.contain('Invalid quantity ${quantity}')
    })
  })
})

describe ('Validation', function(){

  it('should reject a name < 3 chars', function() {
    return Product.create({name: 'a', price: 300})
      .then(res => Promise.reject('The Product should not be created'))
      .catch(err => {
        expect(err.message).to.contain('Name should be at least 3 characters')
        expect(err.statusCode).to.be.equal(422)
      })
  })

  it ('should reject duplicate name', function() {
      Product.create({name: 'duplicate', price: 100})
        .then(() => { Product.create({name: 'duplicate', price: 100})})
        .then(() => Promise.reject('Product should not be created'))
        .catch((err) => {
          expect(err.message).to.contain('is not unique');
          expect(err.statusCode).to.be.equal(422);
        })
    })

  it('should reject a price < 0', function(){
    return Product.create({name: 'lowPrice', price: -1})
    .then(res => Promise.reject('Product should not be created'))
    .catch(err => {
      expect(err.message).to.contain('Price should be a positive integer')
      expect(err.statusCode).to.be.equal(422)
    })
  })

  it('should store a correct product', function(){
    return Product.create({name: 'all good', price: 300})
      .then(res => {
        expect(res.name).to.equal('all good')
        expect(res.price).to.equal(300)
      })
  })
})
