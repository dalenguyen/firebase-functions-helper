import { FirebaseHelper } from "./firebase";
import { FirestoreHelper } from "./firestore";
import { RealtimeHelper } from "./realtime";

declare namespace firebaseHelper{
    var firebase: FirebaseHelper;
    var firestore: FirestoreHelper;
    var realtime: RealtimeHelper;
}

export = firebaseHelper;
