"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const firestore_1 = require("./firestore");
const firestoreHelper = new firestore_1.FirestoreHelper();
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
    });
    return { 'firestore': admin.firestore() };
};
/**
 * Backup data from firestore
 *
 * @param {any} db
 * @param {string} collectionName
 * @param {string} subCollection
 */
exports.firestoreBackup = function (db, collectionName, subCollection = '') {
    return firestoreHelper.backup(db, collectionName, subCollection);
};
/**
 * Restore data to firestore
 *
 * @param {any} db
 * @param {any} fileName
 */
exports.firestoreRestore = function (db, fileName) {
    return firestoreHelper.restore(db, fileName);
};
/**
 * Create a document with id in firestore
 *
 * @param {any} db
 * @param {any} collectionName
 * @param {any} docID
 * @param {any} data
 * @returns
 */
exports.firestoreCreateDocumentWithId = function (db, collectionName, docID, data) {
    return firestoreHelper.createDocumentWithID(db, collectionName, docID, data);
};
/**
 * Create new document without an ID
 *
 * @param {any} db
 * @param {any} collectionName
 * @param {any} data
 * @returns
 */
exports.firestoreCreateNewDocument = function (db, collectionName, data) {
    return firestoreHelper.creatNewDocument(db, collectionName, data);
};
/**
 * Update a document
 *
 * @param {any} db
 * @param {any} collectionName
 * @param {any} docId
 * @param {any} data
 */
exports.firestoreUpdateDocument = function (db, collectionName, docId, data) {
    return firestoreHelper.updateDocument(db, collectionName, docId, data);
};
/**
 * Delete a document
 *
 * @param {any} db
 * @param {any} collectionName
 * @param {any} docId
 */
exports.firestoreDeleteDocument = function (db, collectionName, docId) {
    return firestoreHelper.deleteDocument(db, collectionName, docId);
};
/**
 *
 *
 * @param {*} db
 * @param {string} collectionName
 * @param {string} docId
 * @returns
 */
exports.firestoreCheckDocumentExists = function (db, collectionName, docId) {
    return firestoreHelper.checkDocumentExists(db, collectionName, docId);
};
/**
 * Query data from firestore
 *
 * @param {*} db
 * @param {string} collectionName
 * @param {[any]} queryArray
 * @returns {Promise<any>}
 * @memberof FirestoreHelper
 */
exports.fireStoreQuery = function (db, collectionName, queryArray) {
    return firestoreHelper.queryData(db, collectionName, queryArray);
};
//# sourceMappingURL=index.js.map