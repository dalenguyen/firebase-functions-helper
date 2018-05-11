'use strict';
const admin = require('firebase-admin');

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