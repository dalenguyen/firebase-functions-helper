'use strict';
const admin = require('firebase-admin');
const firestore = require('./firestore');

/**
 * Initialize Firebase App
 * 
 * @param {any} serviceAccount 
 * @param {any} databaseURL
 */
exports.initializeApp = function (serviceAccount, databaseURL) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: databaseURL
    })
    return {'firestore': admin.firestore()};    
}

/**
 * Backup data from firestore
 * 
 * @param {any} db 
 * @param {string} collectionName
 * @param {string} subCollection
 * @return {json}
 */
exports.backup = function(db, collectionName, subCollection = ''){    
    return firestore.backup(db, collectionName, subCollection);
}

/**
 * Restore data to firestore
 * 
 * @param {any} db 
 * @param {any} fileName 
 */
exports.restore = function(db, fileName){
    return firestore.restore(db, fileName);
}

/**
 * Create a document with id in firestore
 * 
 * @param {any} db 
 * @param {any} collectionName 
 * @param {any} docID 
 * @param {any} data 
 * @returns 
 */
exports.createDocumentWithId = function(db, collectionName, docID, data){
    return firestore.createDocumentWithID(db, collectionName, docID, data);
}

/**
 * Create new document without an ID
 * 
 * @param {any} db 
 * @param {any} collectionName 
 * @param {any} data 
 * @returns 
 */
exports.createNewDocument = function(db, collectionName, data){
    return firestore.creatNewDocument(db, collectionName, data);
}

/**
 * Update a document
 * 
 * @param {any} db 
 * @param {any} collectionName 
 * @param {any} docId 
 * @param {any} data 
 */
exports.updateDocument = function(db, collectionName, docId, data){
    return firestore.updateDocument(db, collectionName, docId, data);
}

/**
 * Delete a document
 * 
 * @param {any} db 
 * @param {any} collectionName 
 * @param {any} docId 
 */
exports.deleteDocument = function(db, collectionName, docId){
    return firestore.deleteDocument(db, collectionName, docId);
}