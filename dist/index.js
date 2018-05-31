"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("./firebase");
const firestore_1 = require("./firestore");
const firebaseHelper = new firebase_1.FirebaseHelper();
const firestoreHelper = new firestore_1.FirestoreHelper();
exports.firebase = firebaseHelper;
exports.firestore = firestoreHelper;
//# sourceMappingURL=index.js.map