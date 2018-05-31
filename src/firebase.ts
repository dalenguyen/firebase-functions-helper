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
        })
        return { 'firestore': admin.firestore() };
    }

    /**
     * Get User Info though UserId
     * 
     * @param {string} userId 
     * @returns {Promise<any>} 
     */
    getUserbyId(userId: string): Promise<any> {
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
    getUserbyEmail(email: string): Promise<any> {
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
    getUserbyPhone(phone: string): Promise<any> {
        return admin.auth().getUserByPhoneNumber(phone)
            .then(user => user)
            .catch(error => console.log(error))
    }

    /**
     * Delete user from an Array of User Ids
     * 
     * @param {Array<string>} userIds 
     * @memberof FirebaseHelper
     */
    deleteUsers(userIds: Array<string>): void {
        userIds.map(userId => {
            admin.auth().deleteUser(userId)
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
     * @memberof FirebaseHelper
     */
    createUser(userInfo: Object): void {
        admin.auth().createUser(userInfo)
            .then( (userRecord) => {
                console.log("Successfully created new user:", userRecord.uid);
            })
            .catch( (error) => {
                console.log("Error creating new user:", error);
            });
    }

    /**
     * Update user Info though userId
     * 
     * @param {string} userId 
     * @param {Object} userInfo 
     * @memberof FirebaseHelper
     */
    updateUser(userId: string, userInfo: Object): void {
        admin.auth().updateUser(userId, userInfo)
            .then( (userRecord) => {                
                console.log("Successfully updated user", userRecord.toJSON());
            })
            .catch( (error) => {
                console.log("Error updating user:", error);
            });
    }

    /**
     * Get a list of users
     * 
     * @param {number} [maxResults=1000] 
     * @returns {Promise<any>} 
     * @memberof FirebaseHelper
     */
    getAllUsers(maxResults: number = 1000): Promise<any>{        
        return admin.auth().listUsers(maxResults)
        .then((listUsersResult) => listUsersResult.users)
        .catch((error) => {
            console.log("Error listing users:", error);
        });
    }
}