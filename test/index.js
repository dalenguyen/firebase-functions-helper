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
// Data backup test
const db = app.firestore;
// console.log(db);

// var result = firebaseHelper.firestoreBackup(db, 'test', 'sub');
// result.then(data => console.log(JSON.stringify(data)))

// Data restore test
// var result = firebaseHelper.firestoreRestore(db, 'test/import-to-firestore.json');


// Write data to firestore
// const db = app.firestore;
// firebaseHelper.firestoreCreateDocumentWithId(db, 'test2', '1', {test: true});

// Create new document without id
// firebaseHelper.createNewDocument(db, 'test2', {test: true});

// Update a document
// firebaseHelper.updateDocument(db, 'test2', '3', {test: true});

// Delete a document
// firebaseHelper.deleteDocument(db, 'test2', 'tts');

// Check where document exists
// let doc = firebaseHelper.firestoreCheckDocumentExists(db, 'test2', '1');
// doc.then(exists => console.log(exists));

// Search for database 
var query = ['website', '==', 'dalenguyen.me'];
var queryResults = firebaseHelper.fireStoreQuery(db, 'test2', query);
queryResults.then(docs => console.log(docs));
