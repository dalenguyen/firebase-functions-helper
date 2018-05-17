import * as admin from 'firebase-admin';
import { FirestoreHelper } from './firestore';

const firestoreHelper = new FirestoreHelper();

/**
 * Initialize Firebase App
 * 
 * @param {any} serviceAccount 
 * @param {any} databaseURL
 */
exports.initializeApp = function (serviceAccount: string, databaseURL: string) {
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
 */
exports.firestoreBackup = function(db: any, collectionName: string, subCollection: string = ''){    
    return firestoreHelper.backup(db, collectionName, subCollection);
}

/**
 * Restore data to firestore
 * 
 * @param {any} db 
 * @param {any} fileName 
 */
exports.firestoreRestore = function(db: any, fileName: string){
    return firestoreHelper.restore(db, fileName);
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
exports.firestoreCreateDocumentWithId = function(db: any, collectionName: string, docID: string, data: Object){
    return firestoreHelper.createDocumentWithID(db, collectionName, docID, data);
}

/**
 * Create new document without an ID
 * 
 * @param {any} db 
 * @param {any} collectionName 
 * @param {any} data 
 * @returns 
 */
exports.firestoreCreateNewDocument = function(db: any, collectionName: string, data: Object){
    return firestoreHelper.creatNewDocument(db, collectionName, data);
}

/**
 * Update a document
 * 
 * @param {any} db 
 * @param {any} collectionName 
 * @param {any} docId 
 * @param {any} data 
 */
exports.firestoreUpdateDocument = function(db: any, collectionName: string, docId: string, data: Object){
    return firestoreHelper.updateDocument(db, collectionName, docId, data);
}

/**
 * Delete a document
 * 
 * @param {any} db 
 * @param {any} collectionName 
 * @param {any} docId 
 */
exports.firestoreDeleteDocument = function(db: any, collectionName: string, docId: string){
    return firestoreHelper.deleteDocument(db, collectionName, docId);
}

/**
 * 
 * 
 * @param {*} db 
 * @param {string} collectionName 
 * @param {string} docId 
 * @returns 
 */
exports.firestoreCheckDocumentExists = function(db: any, collectionName: string, docId: string){
    return firestoreHelper.checkDocumentExists(db, collectionName, docId);
}

/**
 * Query data from firestore
 * 
 * @param {*} db 
 * @param {string} collectionName 
 * @param {[any]} queryArray 
 * @returns {Promise<any>} 
 * @memberof FirestoreHelper
 */
exports.fireStoreQuery = function (db: any, collectionName: string, queryArray: [any]){
    return firestoreHelper.queryData(db, collectionName, queryArray);
}