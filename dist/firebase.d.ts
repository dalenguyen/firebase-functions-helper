import * as admin from 'firebase-admin';
interface UserRecord {
    status: boolean;
    data: admin.auth.UserRecord;
}
export declare class FirebaseHelper {
    /**
     * Initialize Firebase App
     *
     * @param {any} serviceAccount
     * @param {any} databaseURL
     */
    initializeApp(serviceAccount: string, databaseURL: string): {
        'firestore': FirebaseFirestore.Firestore;
        'realtime': admin.database.Database;
    };
    /**
     * Get User Info though UserId
     *
     * @param {string} userId
     * @returns {Promise<any>}
     */
    getUserById(userId: string): Promise<any>;
    /**
     * Get User Info though email
     *
     * @param {string} email
     * @returns {Promise<any>}
     * @memberof FirebaseHelper
     */
    getUserByEmail(email: string): Promise<any>;
    /**
     * Get User Info though phone number
     *
     * @param {string} phone
     * @returns {Promise<any>}
     * @memberof FirebaseHelper
     */
    getUserByPhone(phone: string): Promise<any>;
    /**
     * Delete a user
     *
     * @param {string} userId
     * @memberof FirebaseHelper
     */
    deleteUser(userId: string): Promise<boolean>;
    /**
     * Delete user from an Array of User Ids
     *
     * @param {Array<string>} userIds
     * @memberof FirebaseHelper
     */
    deleteUsers(userIds: Array<string>): void;
    /**
     * Create a new user
     *
     * @param {Object} userInfo
     * @returns {Promise<any>}
     * @memberof FirebaseHelper
     */
    createUser(userInfo: Object): Promise<UserRecord>;
    /**
     * Update user Info though userId
     *
     * @param {string} userId
     * @param {Object} userInfo
     * @memberof FirebaseHelper
     */
    updateUser(userId: string, userInfo: Object): Promise<UserRecord>;
    /**
     * Get a list of users
     *
     * @param {number} [maxResults=1000]
     * @returns {Promise<any>}
     * @memberof FirebaseHelper
     */
    getAllUsers(maxResults?: number): Promise<any>;
    /**
     * Auth function from Firebase Admin SDK
     */
    auth(): admin.auth.Auth;
}
export {};
