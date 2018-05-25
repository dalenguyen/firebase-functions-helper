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
exports.firestore = firestoreHelper;
//# sourceMappingURL=index.js.map