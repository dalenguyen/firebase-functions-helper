import { expect } from 'chai';
import * as firebaseHelper from '../dist/index.js';
import { app } from './appInitialize';

describe('Test firebase functions:', async () => {
    let now = new Date().getTime();
    let email = `user+${now}@dalenguyen.me`;
    let phone = `+1${now.toString().substr(3)}`;
    let userInfo = {
        email: email,
        emailVerified: false,
        phoneNumber: phone,
        password: "secretPassword",
        displayName: "Dale Nguyen",
        photoURL: "http://www.example.com/12345678/photo.png",
        disabled: false
    };
    let newDisplayName = "Yen Nguyen";
    let userId;

    it('Create a new user', async () => {
        // Create a new user
        let createAUserResult = await firebaseHelper.firebase.createUser(userInfo);
        userId = createAUserResult.data.uid;
        expect(createAUserResult.status).to.equal(true);

        // User is already existed
        firebaseHelper.firebase.createUser(userInfo).then(res => {
            expect(res.status).to.equal(false);
        });
    });

    it('Update a user',  async () => {
        userInfo.displayName = newDisplayName;
        let updateAUserResult = await firebaseHelper.firebase.updateUser(userId, userInfo);
        expect(updateAUserResult.status).to.equal(true);
        expect(updateAUserResult.data.displayName).to.equal(newDisplayName);
    });

    it('Get all users', async () => {
        let getAllUsersResult = await firebaseHelper.firebase.getAllUsers(10);
        expect(typeof getAllUsersResult).to.equal('object');
        expect(getAllUsersResult.length).to.be.above(0);
    });

    it('Get user by id', async () => {
        let getUserByIdResult = await firebaseHelper.firebase.getUserById(userId);
        expect(getUserByIdResult.uid).to.equal(userId);
        expect(getUserByIdResult.displayName).to.equal(newDisplayName);
    });

    it('Get user by email', async () => {
        let getUserByEmailResult = await firebaseHelper.firebase.getUserByEmail(email);
        expect(getUserByEmailResult.uid).to.equal(userId);
        expect(getUserByEmailResult.displayName).to.equal(newDisplayName);
    });

    it('Get user by phone', async () => {
        let getUserByPhoneResult = await firebaseHelper.firebase.getUserByPhone(phone);
        expect(getUserByPhoneResult.uid).to.equal(userId);
        expect(getUserByPhoneResult.displayName).to.equal(newDisplayName);
    });

    it('Delete a user', async () => {
        let deleteAUserResult = await firebaseHelper.firebase.deleteUser(userId);
        expect(deleteAUserResult).to.equal(true);
    });

})
