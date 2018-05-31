import { FirebaseHelper } from './firebase';
import { FirestoreHelper } from './firestore';

const firebaseHelper = new FirebaseHelper();
const firestoreHelper = new FirestoreHelper();

exports.firebase = firebaseHelper;
exports.firestore = firestoreHelper;