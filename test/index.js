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

let app = firebaseFunctionsHelper.initializeApp(serviceAccount, 'https://ionic-firestore-dn.firebaseio.com');
// // Data backup test
// var result = firebaseFunctionsHelper.backup('test', 'sub');
// result.then(data => console.log(data))

// // Data restore test
// var result = firebaseFunctionsHelper.restore('import-to-firestore.json');


// Write data to firestore
const db = app.firestore;
// firebaseFunctionsHelper.createDocumentWithId(db, 'test2', '1', {test: true});

// Create new document without id
// firebaseFunctionsHelper.createNewDocument(db, 'test2', {test: true});

firebaseFunctionsHelper.updateDocument(db, 'test2', '3', {test: true});