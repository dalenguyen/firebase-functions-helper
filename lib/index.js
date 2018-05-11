'use strict';
const admin = require('firebase-admin');
const firestoreService = require('firestore-export-import');


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
    return true;    
}

/**
 * Backup data from firestore
 * 
 * @param {string} collectionName
 * @param {string} subCollection
 * @return {json}
 */
exports.backup = function(collectionName, subCollection = ''){    
    return firestoreService.backup(collectionName, subCollection);
}

/**
 * Restore data to firestore
 * 
 * @param {any} fileName 
 */
exports.restore = function(fileName){
    firestoreService.restore(fileName);
}