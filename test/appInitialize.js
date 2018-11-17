const firebaseHelper = require('../dist/index.js');
const serviceAccount = require('./serviceAccountKey.json');

module.exports = firebaseHelper.firebase.initializeApp(serviceAccount, serviceAccount.databaseURL);