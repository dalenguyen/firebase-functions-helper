import * as admin from 'firebase-admin';

export class FirebaseHelper {

    /**
     * Initialize Firebase App
     *
     * @param {any} serviceAccount
     * @param {any} databaseURL
     */
    initializeApp(serviceAccount: string, databaseURL: string) {
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
    getUserById(userId: string): Promise<any> {
        return admin.auth().getUser(userId)
            .then(user => user)
            .catch(error => console.log(error))
    }

    /**
     * Get User Info though email
     *
     * @param {string} email
     * @returns {Promise<any>}
     * @memberof FirebaseHelper
     */
    getUserByEmail(email: string): Promise<any> {
        return admin.auth().getUserByEmail(email)
            .then(user => user)
            .catch(error => console.log(error))
    }

    /**
     * Get User Info though phone number
     *
     * @param {string} phone
     * @returns {Promise<any>}
     * @memberof FirebaseHelper
     */
    getUserByPhone(phone: string): Promise<any> {
        return admin.auth().getUserByPhoneNumber(phone)
            .then(user => user)
            .catch(error => console.log(error))
    }


    /**
     * Delete a user
     *
     * @param {string} userId
     * @memberof FirebaseHelper
     */
    deleteUser(userId: string): Promise<boolean> {
        return new Promise(resolve => {
            admin.auth().deleteUser(userId)
                .then(() => {
                    resolve(true);
                })
                .catch(error => {
                    console.log(error);
                    resolve(false);
                })
        })
    }

    /**
     * Delete user from an Array of User Ids
     *
     * @param {Array<string>} userIds
     * @memberof FirebaseHelper
     */
    deleteUsers(userIds: Array<string>): void {
        userIds.map(userId => {
            this.deleteUser(userId)
                .then(() => {
                    console.log("Successfully deleted user: ", userId);
                })
                .catch(error => console.log(error))
        });
    }

    /**
     * Create a new user
     *
     * @param {Object} userInfo
     * @returns {Promise<any>}
     * @memberof FirebaseHelper
     */
    createUser(userInfo: Object): Promise<object> {
        return new Promise((resolve) => {
            admin.auth().createUser(userInfo)
                .then((userRecord) => {
                    resolve({
                        status: true,
                        data: userRecord
                    })
                })
                .catch((error) => {
                    resolve({
                        status: false,
                        data: error.message
                    })
                });
        })
    }

    /**
     * Update user Info though userId
     *
     * @param {string} userId
     * @param {Object} userInfo
     * @memberof FirebaseHelper
     */
    updateUser(userId: string, userInfo: Object): Promise<object> {
        return new Promise(resolve => {
            admin.auth().updateUser(userId, userInfo)
                .then(userRecord => {
                    resolve({
                        status: true,
                        data: userRecord
                    })
                })
                .catch((error) => {
                    resolve({
                        status: false,
                        data: error.message
                    })
                });
        })
    }

    /**
     * Get a list of users
     *
     * @param {number} [maxResults=1000]
     * @returns {Promise<any>}
     * @memberof FirebaseHelper
     */
    getAllUsers(maxResults: number = 1000): Promise<any> {
        return admin.auth().listUsers(maxResults)
            .then((listUsersResult) => listUsersResult.users)
            .catch((error) => {
                console.log("Error listing users:", error);
            });
    }
}
