import { FirebaseHelper } from './firebase';
import { FirestoreHelper } from './firestore';
import { RealtimeHelper } from './realtime';

const firebaseHelper: FirebaseHelper = new FirebaseHelper();
const firestoreHelper: FirestoreHelper = new FirestoreHelper();
const realtimeHelper: RealtimeHelper = new RealtimeHelper();

exports.firebase = firebaseHelper;
exports.firestore = firestoreHelper;
exports.realtime = realtimeHelper;