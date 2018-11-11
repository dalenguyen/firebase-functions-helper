import * as fs from 'fs';

export class FirestoreHelper {

    /**
     * Create a document with id in firestore
     * 
     * @param {any} db Database
     * @param {any} collectionName Collection name
     * @param {any} docId Document ID
     * @param {any} data 
     * @returns 
     */
    createDocumentWithID (db: any, collectionName: string, docId: string, data: Object): void {
        db.collection(collectionName).doc(docId).set(data)
            .then(res => console.log(`${JSON.stringify(data)} is added to ${collectionName} collection`))
            .catch(err => console.log('Error: ', err))
    }
    /**
     * Create a document without an ID
     * 
     * @param {any} db 
     * @param {any} collectionName 
     * @param {any} data 
     */
    createNewDocument (db: any, collectionName: string, data: Object) {
        db.collection(collectionName).add(data)
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }
  
     /**
     * Create a document with id in firestore
     * 
     * @param {any} db 
     * @param {any} collectionName 
     * @param {any} docID
     * @param {any} collectionNameTwo
     * @param {any} docIDTwo
     * @param {any} data 
     * @returns 
     */
    createSubcollectionWithDocument (db: any, collectionName: string, docId: string, collectionNameTwo: string, docIdTwo: string, data: Object): void {
        db.collection(collectionName).doc(docId).collection(collectionNameTwo).doc(docIdTwo)).set(data)
            .then(res => console.log(`${JSON.stringify(data)} is added to ${collectionNameTwo} collection`))
            .catch(err => console.log('Error: ', err))
    }

    /**
     * Update a document
     * 
     * @param {any} db 
     * @param {any} collectionName 
     * @param {any} docId 
     * @param {any} data 
     */
    updateDocument (db: any, collectionName: string, docId: string, data: Object) {
        db.collection(collectionName).doc(docId).update(data)
            .then(() => console.log(`${docId} successfully updated!`))
            .catch(err => console.log('Error: ', err))
    }

    /**
     * Delete a document
     * 
     * @param {any} db 
     * @param {any} collectionName 
     * @param {any} docId 
     */
    deleteDocument (db: any, collectionName: string, docId: string) {
        db.collection(collectionName).doc(docId).delete()
            .then(() => {
                console.log(`${docId} successfully deleted!`);
            }).catch(error => {
                console.error("Error removing document: ", error);
            });
    }
  
     /**
     * Delete a document from Sub Collection
     * 
     * @param {any} db 
     * @param {any} collectionName 
     * @param {any} docId 
     * @param {any} collectionNameTwo
     * @param {any} docIdTwo
     */
    deleteDocumentFromSubcollection (db: any, collectionName: string, docId: string, collectionNameTwo: string, docIdTwo: string) {
        db.collection(collectionName).doc(docId).collection(collectionNameTwo).doc(docIdTwo).delete()
            .then(() => {
                console.log(`${docIdTwo} successfully deleted!`);
            }).catch(error => {
                console.error("Error removing document: ", error);
            });
    }

    /**
    * Check where a document exists or not
    * 
    * @param {any} db 
    * @param {string} collectionName 
    * @param {string} docId 
    * @returns {Promise<any>} 
    * @memberof FirestoreHelper
    */

    checkDocumentExists(db: any, collectionName: string, docId: string): Promise<any>{
        const dbRef = db.collection(collectionName).doc(docId);
        return dbRef.get()
            .then(doc => {
                if (!doc.exists) {
                    return {
                        exists: false
                    };
                } else {
                    return {
                        exists: true,
                        data: doc.data()
                    };
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }

    /**
     * Get a document from document Id
     * 
     * @param {any} db 
     * @param {string} collectionName 
     * @param {string} documentId 
     * @returns {Promise<any>} 
     * @memberof FirestoreHelper
     */
    getDocument(db: any, collectionName: string, documentId: string): Promise<any> {
        const docRef = db.collection(collectionName).doc(documentId);
        return docRef.get().then(function(doc) {
            if (doc.exists) {
                return doc.data();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return false;
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }

    /**
     * Query data from Firestore
     * 
     * @param {*} db 
     * @param {string} collectionName 
     * @param {[any]} queryArray 
     * @returns {Promise<any>} 
     * @memberof FirestoreHelper
     */
    queryData(db: any, collectionName: string, queryArray: [any]): Promise<any>{
        return new Promise((resolve, reject) => {
            const dataRef = db.collection(collectionName);
            const queryRef = dataRef.where(queryArray[0], queryArray[1], queryArray[2]);
            const results = {};

            queryRef.get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        results[doc.id] = doc.data();
                    });
                    if(Object.keys(results).length > 0){
                        resolve(results);
                    } else {
                        resolve('No such document!');
                    }
                })
                .catch(err => {
                    reject(false);
                    console.log('Error getting documents', err);
                });
        })
    }

    /**
     * Backup data from Firestore
     *
     * @param {*} db
     * @param {string} collectionName
     * @param {string} subCollection
     * @return {json}
     */
    backup (db: any, collectionName: string, subCollection: string = '') {
        console.log('Getting data from: ', collectionName);
        return new Promise((resolve, reject) => {
            const data = {};

            data[collectionName] = {};

            const results = db.collection(collectionName)
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        data[collectionName][doc.id] = doc.data();
                    });
                    return data;
                })
                .catch(error => {
                    console.log(error);
                });

            results.then(dt => {
                if (subCollection === '') {
                    resolve(dt)
                } else {
                    this.getSubCollection(db, data, dt, collectionName, subCollection).then(() => {
                        resolve(data)
                    }).catch(error => {
                        console.log(error);
                        reject(error);
                    })
                }
            }).catch(error => {
                console.log(error);
                reject(error);
            })
        })

    }

    /**
     * Get sub collection from a document if possible
     * 
     * @param {any} db 
     * @param {any} data 
     * @param {any} dt 
     * @param {any} collectionName 
     * @param {any} subCollection 
     */
    async getSubCollection(db: any, data: Object, dt: Object, collectionName: string, subCollection: string) {
        for (const [key, value] of Object.entries([dt[collectionName]][0])) {
            data[collectionName][key]['subCollection'] = {};
            await this.addSubCollection(db, key, data[collectionName][key]['subCollection'], collectionName, subCollection);
        }
    }

    /**
     * Add sub collection to data object if possible
     * 
     * @param {any} db 
     * @param {any} key 
     * @param {any} subData 
     * @param {any} collectionName 
     * @param {any} subCollection 
     * @returns 
     */
    addSubCollection(db: any, key: string, subData: Object, collectionName: string, subCollection: string) {
        return new Promise((resolve, reject) => {
            db.collection(collectionName).doc(key).collection(subCollection).get()
                .then(snapshot => {
                    snapshot.forEach(subDoc => {
                        subData[subDoc.id] = subDoc.data();
                        resolve('Added data');
                    })
                }).catch(error => {
                    reject(false);
                    console.log(error);
                })
        })
    }

    /**
     * Restore data to Firestore
     * 
     * @param {any} db 
     * @param {any} fileName 
     */
    restore (db, fileName) {
        const that = this;

        fs.readFile(fileName, 'utf8', function (err, data) {
            if (err) {
                console.log(err);
                return;
            }

            // Turn string from file to an Array
            const dataArray = JSON.parse(data);

            that.updateCollection(db, dataArray).then(() => {
                console.log('Successfully import collection!');
            }).catch(error => {
                console.log(error);
            });
        })

    }

    /**
     * Update data to Firestore
     * 
     * @param {any} db
     * @param {any} dataArray 
     */
    async updateCollection(db: any, dataArray: Object) {
        for (const index in dataArray) {
            for (const doc in dataArray[index]) {
                if (dataArray[index].hasOwnProperty(doc)) {
                    await this.startUpdating(db, index, doc, dataArray[index][doc])
                }
            }
        }
    }

    /**
     * Write data to document
     * 
     * @param {any} db 
     * @param {any} collectionName 
     * @param {any} doc 
     * @param {any} data 
     * @returns 
     */
    startUpdating(db: any, collectionName: string, doc: string, data: Object) {
        return new Promise(resolve => {
            return db.collection(collectionName).doc(doc)
                .set(data)
                .then(() => {
                    console.log(`${doc} is succeeded adding to Firestore!`);
                    resolve('Data wrote!');
                })
                .catch(error => console.log(error));
        })
    }
}