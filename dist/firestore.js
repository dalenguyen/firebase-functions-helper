"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
class FirestoreHelper {
    /**
     *Create a document with id in firestore
     *
     * @param {*} db
     * @param {string} collectionName
     * @param {string} docId
     * @param {Object} data
     * @returns {Promise<boolean>}
     * @memberof FirestoreHelper
     */
    createDocumentWithID(db, collectionName, docId, data) {
        return db.collection(collectionName).doc(docId).set(data)
            .then(() => true)
            .catch(function (error) {
            return false;
        });
    }
    /**
     * Create a document without an ID
     *
     * @param {*} db
     * @param {string} collectionName
     * @param {Object} data
     * @returns
     * @memberof FirestoreHelper
     */
    createNewDocument(db, collectionName, data) {
        return db.collection(collectionName).add(data)
            .then(function (docRef) {
            return docRef;
        })
            .catch(function (error) {
            return error;
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
    // createSubcollectionWithDocument (db: any, collectionName: string, docId: string, collectionNameTwo: string, docIdTwo: string, data: Object): void {
    //     db.collection(collectionName).doc(docId).collection(collectionNameTwo).doc(docIdTwo)).set(data)
    //         .then(res => console.log(`${JSON.stringify(data)} is added to ${collectionNameTwo} collection`))
    //         .catch(err => console.log('Error: ', err))
    // }
    /**
     * Update a document
     *
     * @param {*} db
     * @param {string} collectionName
     * @param {string} docId
     * @param {Object} data
     * @returns {Promise<any>}
     * @memberof FirestoreHelper
     */
    updateDocument(db, collectionName, docId, data) {
        return db.collection(collectionName).doc(docId).update(data)
            .then(() => true)
            .catch(err => err);
    }
    /**
     * Delete a document
     *
     * @param {*} db
     * @param {string} collectionName
     * @param {string} docId
     * @returns {Promise<object>}
     * @memberof FirestoreHelper
     */
    deleteDocument(db, collectionName, docId) {
        return db.collection(collectionName).doc(docId).delete()
            .then(() => {
            return { status: true, message: `${docId} successfully deleted!` };
        }).catch(error => {
            return { status: true, message: error };
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
    deleteDocumentFromSubcollection(db, collectionName, docId, collectionNameTwo, docIdTwo) {
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
    checkDocumentExists(db, collectionName, docId) {
        const dbRef = db.collection(collectionName).doc(docId);
        return dbRef.get()
            .then(doc => {
            if (!doc.exists) {
                return {
                    exists: false
                };
            }
            else {
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
    getDocument(db, collectionName, documentId) {
        const docRef = db.collection(collectionName).doc(documentId);
        return docRef.get().then(function (doc) {
            if (doc.exists) {
                return doc.data();
            }
            else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return false;
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
    /**
     * Query data from Firestore
     *
     * @param {*} db
     * @param {string} collectionName
     * @param {Array<any>} queryArray
     * @param {Array<any>} orderBy
     * @returns {Promise<any>}
     * @memberof FirestoreHelper
     */
    queryData(db, collectionName, queryArray, orderBy = null) {
        return new Promise((resolve, reject) => {
            const dataRef = db.collection(collectionName);
            let queryRef = dataRef;
            queryArray.map(query => {
                queryRef = queryRef.where(query[0], query[1], query[2]);
            });
            if (orderBy !== null) {
                if (typeof orderBy[1] === undefined) {
                    orderBy[1] = 'asc';
                }
                queryRef = queryRef.orderBy(orderBy[0], orderBy[1]);
            }
            const results = {};
            queryRef.get()
                .then(snapshot => {
                snapshot.forEach(doc => {
                    results[doc.id] = doc.data();
                });
                if (Object.keys(results).length > 0) {
                    resolve(results);
                }
                else {
                    resolve('No such document!');
                }
            })
                .catch(err => {
                reject(false);
                console.log('Error getting documents', err);
            });
        });
    }
    /**
     * Backup data from Firestore
     *
     * @param {*} db
     * @param {string} collectionName
     * @param {string} subCollection
     * @return {json}
     */
    backup(db, collectionName, subCollection = '') {
        // console.log('Getting data from: ', collectionName);
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
                    resolve(dt);
                }
                else {
                    this.getSubCollection(db, data, dt, collectionName, subCollection).then(() => {
                        resolve(data);
                    }).catch(error => {
                        console.log(error);
                        reject(error);
                    });
                }
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
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
    getSubCollection(db, data, dt, collectionName, subCollection) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const [key, value] of Object.entries([dt[collectionName]][0])) {
                data[collectionName][key]['subCollection'] = {};
                yield this.addSubCollection(db, key, data[collectionName][key]['subCollection'], collectionName, subCollection);
            }
        });
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
    addSubCollection(db, key, subData, collectionName, subCollection) {
        return new Promise((resolve, reject) => {
            db.collection(collectionName).doc(key).collection(subCollection).get()
                .then(snapshot => {
                snapshot.forEach(subDoc => {
                    subData[subDoc.id] = subDoc.data();
                    resolve('Added data');
                });
            }).catch(error => {
                reject(false);
                console.log(error);
            });
        });
    }
    /**
     *Restore data to Firestore
     *
     * @param {*} db
     * @param {*} fileName
     * @returns {Promise<any>}
     * @memberof FirestoreHelper
     */
    restore(db, fileName) {
        const that = this;
        return new Promise((resolve, reject) => {
            fs.readFile(fileName, 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                    return;
                }
                // Turn string from file to an Array
                const dataArray = JSON.parse(data);
                that.updateCollection(db, dataArray).then(() => {
                    resolve({ status: true, message: 'Successfully import collection!' });
                }).catch(error => {
                    reject({ status: false, message: error.message });
                });
            });
        });
    }
    /**
     * Update data to Firestore
     *
     * @param {any} db
     * @param {any} dataArray
     */
    updateCollection(db, dataArray) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const index in dataArray) {
                for (const doc in dataArray[index]) {
                    if (dataArray[index].hasOwnProperty(doc)) {
                        yield this.startUpdating(db, index, doc, dataArray[index][doc]);
                    }
                }
            }
        });
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
    startUpdating(db, collectionName, doc, data) {
        return new Promise(resolve => {
            return db.collection(collectionName).doc(doc)
                .set(data)
                .then(() => {
                console.log(`${doc} is succeeded adding to Firestore!`);
                resolve('Data wrote!');
            })
                .catch(error => console.log(error));
        });
    }
}
exports.FirestoreHelper = FirestoreHelper;
//# sourceMappingURL=firestore.js.map