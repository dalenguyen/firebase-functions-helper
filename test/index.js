'use strict';
var expect = require('chai').expect;
var firebaseFunctionsHelper = require('../lib/index.js');

var serviceAccount = require('./serviceAccountKey.json');

// describe('initializeApp test', () => {
//     it('should return true', () => {
//         var result = firebaseFunctionsHelper.initializeApp(serviceAccount, 'https://ionic-firestore-dn.firebaseio.com');
//         expect(result).to.equal(true);
//     })
// })

// firebaseFunctionsHelper.initializeApp(serviceAccount, 'https://ionic-firestore-dn.firebaseio.com');
// var result = firebaseFunctionsHelper.backup('test', 'sub');
// result.then(data => console.log(data))