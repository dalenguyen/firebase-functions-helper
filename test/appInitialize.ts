import * as firebaseHelper from '../dist/index';
import { serviceAccount } from './serviceAccount';

export const app = firebaseHelper.firebase.initializeApp(serviceAccount, serviceAccount.databaseURL);
