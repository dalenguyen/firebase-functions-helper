'use strict';
var expect = require('chai').expect;
var firebaseHelper = require('../dist/index.js');

var serviceAccount = require('./serviceAccountKey.json');

// describe('initializeApp test', () => {
//     it('should return true', () => {
//         var result = firebaseHelper.initializeApp(serviceAccount, 'https://ionic-firestore-dn.firebaseio.com');
//         expect(result).to.equal(true);
//     })
// })

let app = firebaseHelper.firebase.initializeApp(serviceAccount, 'https://ionic-firestore-dn.firebaseio.com');
// Data backup test
const db = app.firestore;
// console.log(db);

// Get user by id
// let userQuery = firebaseHelper.firebase.getUserbyId('pZPRalP4Twf8it509VprkS4bPdk22');
// userQuery.then(user => console.log(user))

// Get user by email
// firebaseHelper.firebase
//     .getUserbyEmail('test@reshiftmedia.com')
//     .then(user => console.log(user))

// Delete users 

// let userList = ['pZPRalP4Twf8it509VprkS4bPdk2'];
// firebaseHelper.firebase.deleteUsers(userList);

// Create user 

// let userInfo = {
//     email: "user@dalenguyen.me",
//     emailVerified: false,
//     phoneNumber: "+11234567890",
//     password: "secretPassword",
//     displayName: "Dale Nguyen",
//     photoURL: "http://www.example.com/12345678/photo.png",
//     disabled: false
// };

// firebaseHelper.firebase.createUser(userInfo);

// Update user 

let userInfo = {
    email: "test@dalenguyen.me",
    emailVerified: false,
    phoneNumber: "+11234567899",
    password: "secretPassword",
    displayName: "Dale Nguyen",
    photoURL: "http://www.example.com/12345678/photo.png",
    disabled: false
};

firebaseHelper.firebase.updateUser('ZqZSKCZgYdc771C97iswkUn5HPA2', userInfo);