"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
class FirebaseHelper {
    /**
     * Initialize Firebase App
     *
     * @param {any} serviceAccount
     * @param {any} databaseURL
     */
    initializeApp(serviceAccount, databaseURL) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: databaseURL
        });
        return { 'firestore': admin.firestore() };
    }
    /**
     * Get User Info though UserId
     *
     * @param {string} userId
     * @returns {Promise<any>}
     */
    getUserById(userId) {
        return admin.auth().getUser(userId)
            .then(user => user)
            .catch(error => console.log(error));
    }
    /**
     * Get User Info though email
     *
     * @param {string} email
     * @returns {Promise<any>}
     * @memberof FirebaseHelper
     */
    getUserByEmail(email) {
        return admin.auth().getUserByEmail(email)
            .then(user => user)
            .catch(error => console.log(error));
    }
    /**
     * Get User Info though phone number
     *
     * @param {string} phone
     * @returns {Promise<any>}
     * @memberof FirebaseHelper
     */
    getUserByPhone(phone) {
        return admin.auth().getUserByPhoneNumber(phone)
            .then(user => user)
            .catch(error => console.log(error));
    }
    /**
     * Delete a user
     *
     * @param {string} userId
     * @memberof FirebaseHelper
     */
    deleteUser(userId) {
        return new Promise(resolve => {
            admin.auth().deleteUser(userId)
                .then(() => {
                resolve(true);
            })
                .catch(error => {
                console.log(error);
                resolve(false);
            });
        });
    }
    /**
     * Delete user from an Array of User Ids
     *
     * @param {Array<string>} userIds
     * @memberof FirebaseHelper
     */
    deleteUsers(userIds) {
        userIds.map(userId => {
            this.deleteUser(userId)
                .then(() => {
                console.log("Successfully deleted user: ", userId);
            })
                .catch(error => console.log(error));
        });
    }
    /**
     * Create a new user
     *
     * @param {Object} userInfo
     * @returns {Promise<any>}
     * @memberof FirebaseHelper
     */
    createUser(userInfo) {
        return new Promise((resolve) => {
            admin.auth().createUser(userInfo)
                .then((userRecord) => {
                resolve({
                    status: true,
                    data: userRecord
                });
            })
                .catch((error) => {
                resolve({
                    status: false,
                    data: error.message
                });
            });
        });
    }
    /**
     * Update user Info though userId
     *
     * @param {string} userId
     * @param {Object} userInfo
     * @memberof FirebaseHelper
     */
    updateUser(userId, userInfo) {
        return new Promise(resolve => {
            admin.auth().updateUser(userId, userInfo)
                .then(userRecord => {
                resolve({
                    status: true,
                    data: userRecord
                });
            })
                .catch((error) => {
                resolve({
                    status: false,
                    data: error.message
                });
            });
        });
    }
    /**
     * Get a list of users
     *
     * @param {number} [maxResults=1000]
     * @returns {Promise<any>}
     * @memberof FirebaseHelper
     */
    getAllUsers(maxResults = 1000) {
        return admin.auth().listUsers(maxResults)
            .then((listUsersResult) => listUsersResult.users)
            .catch((error) => {
            console.log("Error listing users:", error);
        });
    }
}
exports.FirebaseHelper = FirebaseHelper;
//# sourceMappingURL=firebase.js.map