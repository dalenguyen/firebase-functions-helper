'use strict';
var expect = require('chai').expect;
var firebaseHelper = require('../dist/index.js');

var serviceAccount = require('./serviceAccountKey.json');

// describe('initializeApp test', () => {
//     it('should return true', () => {
//         var result = firebaseHelper.initializeApp(serviceAccount, 'https://ionic-firestore-dn.firebaseio.com');
//         expect(result).to.equal(true);
//     })
// })

let app = firebaseHelper.initializeApp(serviceAccount, 'https://ionic-firestore-dn.firebaseio.com');
const db = app.firestore;

// // Data backup test
// var result = firebaseHelper.firestore.backup(db, 'test', 'sub');
// result.then(data => console.log(JSON.stringify(data)))

// // Data restore test
// var result = firebaseHelper.firestore.restore(db, 'test/import-to-firestore.json');


// // Write data to firestore
// firebaseHelper.firestore.createDocumentWithID(db, 'test2', '1', {test: true});

// // Create new document without id
// firebaseHelper.firestore.creatNewDocument(db, 'test2', {test: true});

// // Update a document
// firebaseHelper.firestore.updateDocument(db, 'test2', '1', {test: true});

// Delete a document
// firebaseHelper.firestore.deleteDocument(db, 'test2', '1');

// Check where document exists
let doc = firebaseHelper.firestore.checkDocumentExists(db, 'test2', 'first-key');
doc.then(result => console.log(result.exists)); // result.data

// // Search for database 
// var query = ['website', '==', 'dalenguyen.me'];
// var queryResults = firebaseHelper.firestore.queryData(db, 'test2', query);
// queryResults.then(docs => console.log(docs));

// Get all documents from a collection
// var result = firebaseHelper.firestore.backup(db, 'test2');
// result.then(data => {    
//     let docs = data['test2'];
//     for (const key in docs) {
//         if (docs.hasOwnProperty(key)) {            
//             console.log('Doc id: ', key);
//             console.log('Document data: ', docs[key])                    
//         }
//     }
// })

// // Get a document 
// let result = firebaseHelper.firestore.getDocument(db, 'test2', 'first-key');
// result.then(doc => console.log(doc));
