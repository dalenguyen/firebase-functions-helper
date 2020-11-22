import { firebaseHelper } from '../dist/index';
import { serviceAccount } from './serviceAccount';

export const app = firebaseHelper.initializeApp(serviceAccount);
