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

exports.firestore = firestoreHelper;