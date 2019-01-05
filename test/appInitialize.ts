import * as firebaseHelper from '../dist/index';
import { serviceAccount } from './serviceAccountKey';

export const app = firebaseHelper.firebase.initializeApp(serviceAccount, serviceAccount.databaseURL);
