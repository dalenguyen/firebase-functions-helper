import * as firebaseHelper from '../dist/index';
import * as serviceAccount from './serviceAccountKey.json';

export const app = firebaseHelper.firebase.initializeApp(serviceAccount, serviceAccount.databaseURL);
