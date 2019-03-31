import { FirebaseHelper } from './firebase';
import { FirestoreHelper } from './firestore';
import { RealtimeHelper } from './realtime';

const firebaseHelper = new FirebaseHelper();
const firestoreHelper = new FirestoreHelper();
const realtimeHelper = new RealtimeHelper();

exports.firebase = firebaseHelper;
exports.firestore = firestoreHelper;
exports.realtime = realtimeHelper;