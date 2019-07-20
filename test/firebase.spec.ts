import { expect } from 'chai';
import * as firebaseHelper from '../dist/index.js';
// import { app } from './appInitialize';

describe('Test firebase functions:', async () => {
    const now = new Date().getTime();
    const email = `user+${now}@dalenguyen.me`;
    const phone = `+1${now.toString().substr(3)}`;
    const userInfo = {
        email: email,
        emailVerified: false,
        phoneNumber: phone,
        password: "secretPassword",
        displayName: "Dale Nguyen",
        photoURL: "http://www.example.com/12345678/photo.png",
        disabled: false
    };
    const newDisplayName = "Yen Nguyen";
    let userId;
    // const db = app.firestore;

    it('Create a new user', async () => {
        // Create a new user
        const createAUserResult = await firebaseHelper.firebase.createUser(userInfo);
        userId = createAUserResult.data.uid;
        expect(createAUserResult.status).to.equal(true);

        // User is already existed
        firebaseHelper.firebase.createUser(userInfo).then(res => {
            expect(res.status).to.equal(false);
        });
    });

    it('Update a user',  async () => {
        userInfo.displayName = newDisplayName;
        const updateAUserResult = await firebaseHelper.firebase.updateUser(userId, userInfo);
        expect(updateAUserResult.status).to.equal(true);
        expect(updateAUserResult.data.displayName).to.equal(newDisplayName);
    });

    it('Get all users', async () => {
        const getAllUsersResult = await firebaseHelper.firebase.getAllUsers(10);
        expect(typeof getAllUsersResult).to.equal('object');
        expect(getAllUsersResult.length).to.be.above(0);
    });

    it('Get user by id', async () => {
        const getUserByIdResult = await firebaseHelper.firebase.getUserById(userId);
        expect(getUserByIdResult.uid).to.equal(userId);
        expect(getUserByIdResult.displayName).to.equal(newDisplayName);
    });

    it('Get user by email', async () => {
        const getUserByEmailResult = await firebaseHelper.firebase.getUserByEmail(email);
        expect(getUserByEmailResult.uid).to.equal(userId);
        expect(getUserByEmailResult.displayName).to.equal(newDisplayName);
    });

    it('Get user by phone', async () => {
        const getUserByPhoneResult = await firebaseHelper.firebase.getUserByPhone(phone);
        expect(getUserByPhoneResult.uid).to.equal(userId);
        expect(getUserByPhoneResult.displayName).to.equal(newDisplayName);
    });

    it('Delete a user', async () => {
        const deconsteAUserResult = await firebaseHelper.firebase.deleteUser(userId);
        expect(deconsteAUserResult).to.equal(true);
    });

    it('Auth function', () => {
        firebaseHelper.firebase.auth().verifyIdToken('123')
        .catch(function(error) {
          // Handle error
          expect(error.message).to.contain('Decoding Firebase ID token failed');
        });
    })

})
