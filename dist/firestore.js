"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class FirestoreHelper {
    /**
     * Create a document with id in firestore
     *
     * @param {any} db
     * @param {any} collectionName
     * @param {any} docID
     * @param {any} data
     * @returns
     */
    createDocumentWithID(db, collectionName, docId, data) {
        db.collection(collectionName).doc(docId).set(data)
            .then(res => console.log(`${JSON.stringify(data)} is added to ${collectionName} collection`))
            .catch(err => console.log('Error: ', err));
    }
    /**
     * Create a document without an ID
     *
     * @param {any} db
     * @param {any} collectionName
     * @param {any} data
     */
    creatNewDocument(db, collectionName, data) {
        db.collection(collectionName).add(data)
            .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
            .catch(function (error) {
            console.error("Error adding document: ", error);
        });
    }
    /**
     * Update a document
     *
     * @param {any} db
     * @param {any} collectionName
     * @param {any} docId
     * @param {any} data
     */
    updateDocument(db, collectionName, docId, data) {
        db.collection(collectionName).doc(docId).update(data)
            .then(() => console.log(`${docId} successfully updated!`))
            .catch(err => console.log('Error: ', err));
    }
    /**
     * Delete a document
     *
     * @param {any} db
     * @param {any} collectionName
     * @param {any} docId
     */
    deleteDocument(db, collectionName, docId) {
        db.collection(collectionName).doc(docId).delete()
            .then(() => {
            console.log(`${docId} successfully deleted!`);
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
     * Query data from firestore
     *
     * @param {*} db
     * @param {string} collectionName
     * @param {[any]} queryArray
     * @returns {Promise<any>}
     * @memberof FirestoreHelper
     */
    queryData(db, collectionName, queryArray) {
        return new Promise((resolve, reject) => {
            let dataRef = db.collection(collectionName);
            let queryRef = dataRef.where(queryArray[0], queryArray[1], queryArray[2]);
            let results = {};
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
     * Backup data from firestore
     *
     * @param {string} collectionName
     * @param {string} subCollection
     * @return {json}
     */
    backup(db, collectionName, subCollection = '') {
        console.log('Geting data from: ', collectionName);
        return new Promise((resolve, reject) => {
            let data = {};
            data[collectionName] = {};
            let results = db.collection(collectionName)
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
            for (let [key, value] of Object.entries([dt[collectionName]][0])) {
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
     * Restore data to firestore
     *
     * @param {any} db
     * @param {any} fileName
     */
    restore(db, fileName) {
        const that = this;
        ;
        fs.readFile(fileName, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            // Turn string from file to an Array
            let dataArray = JSON.parse(data);
            that.updateCollection(db, dataArray).then(() => {
                console.log('Successfully import collection!');
            }).catch(error => {
                console.log(error);
            });
        });
    }
    /**
     * Update data to firestore
     *
     * @param {any} db
     * @param {any} dataArray
     */
    updateCollection(db, dataArray) {
        return __awaiter(this, void 0, void 0, function* () {
            for (var index in dataArray) {
                var collectionName = index;
                for (var doc in dataArray[index]) {
                    if (dataArray[index].hasOwnProperty(doc)) {
                        yield this.startUpdating(db, collectionName, doc, dataArray[index][doc]);
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
            db.collection(collectionName).doc(doc)
                .set(data)
                .then(() => {
                console.log(`${doc} is successed adding to firestore!`);
                resolve('Data wrote!');
            })
                .catch(error => {
                console.log(error);
            });
        });
    }
}
exports.FirestoreHelper = FirestoreHelper;
//# sourceMappingURL=firestore.js.map