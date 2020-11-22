import { backup, restore } from 'firestore-export-import';
import { IImportOptions } from 'firestore-export-import/dist/helper';

export class FirestoreHelper {
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
  createDocumentWithID(
    db: any,
    collectionName: string,
    docId: string,
    data: Object
  ): Promise<boolean> {
    return db
      .collection(collectionName)
      .doc(docId)
      .set(data)
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
  createNewDocument(
    db: any,
    collectionName: string,
    data: Object
  ): Promise<any> {
    return db
      .collection(collectionName)
      .add(data)
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
  updateDocument(
    db: any,
    collectionName: string,
    docId: string,
    data: Object
  ): Promise<any> {
    return db
      .collection(collectionName)
      .doc(docId)
      .update(data)
      .then(() => true)
      .catch((err) => err);
  }

  /**
   * Delete a document
   *
   * @param {*} db
   * @param {string} collectionName
   * @param {string} docId
   * @returns {Promise<Object>}
   * @memberof FirestoreHelper
   */
  deleteDocument(
    db: any,
    collectionName: string,
    docId: string
  ): Promise<Object> {
    return db
      .collection(collectionName)
      .doc(docId)
      .delete()
      .then(() => {
        return { status: true, message: docId + ' successfully deleted!' };
      })
      .catch((error) => {
        return { status: false, message: error };
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
  deleteDocumentFromSubcollection(
    db: any,
    collectionName: string,
    docId: string,
    collectionNameTwo: string,
    docIdTwo: string
  ) {
    db.collection(collectionName)
      .doc(docId)
      .collection(collectionNameTwo)
      .doc(docIdTwo)
      .delete()
      .then(() => {
        console.log(docIdTwo + ' successfully deleted!');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
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

  checkDocumentExists(
    db: any,
    collectionName: string,
    docId: string
  ): Promise<any> {
    const dbRef = db.collection(collectionName).doc(docId);
    return dbRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return {
            exists: false,
          };
        } else {
          return {
            exists: true,
            data: doc.data(),
          };
        }
      })
      .catch((err) => {
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
  getDocument(
    db: any,
    collectionName: string,
    documentId: string
  ): Promise<any> {
    const docRef = db.collection(collectionName).doc(documentId);
    return docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
          return false;
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
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
  queryData(
    db: any,
    collectionName: string,
    queryArray: Array<any>,
    orderBy: Array<any> = null
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const dataRef = db.collection(collectionName);

      let queryRef = dataRef;
      queryArray.forEach((query) => {
        queryRef = queryRef.where(query[0], query[1], query[2]);
      });

      if (orderBy !== null) {
        if (typeof orderBy[1] === undefined) {
          orderBy[1] = 'asc';
        }
        queryRef = queryRef.orderBy(orderBy[0], orderBy[1]);
      }

      const results = {};

      queryRef
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            results[doc.id] = doc.data();
          });
          if (Object.keys(results).length > 0) {
            resolve(results);
          } else {
            resolve('No such document!');
          }
        })
        .catch((err) => {
          reject(false);
          console.log('Error getting documents', err);
        });
    });
  }

  /**
   * Query data from Firestore with Pagination.
   *
   * @param {*} db
   * @param {string} collectionName
   * @param {Array<any>} queryArray
   * @param {Array<any>} orderBy
   * @param {number} page
   * @param {number} size
   * @returns {Promise<any>}
   * @memberof FirestoreHelper
   */
  queryDataWithPagiation(
    dbp: any,
    collectionName: string,
    queryArray: Array<any>,
    orderBy: Array<any>,
    page: number,
    size: number
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const dataRef = dbp.collection(collectionName);
      const limit = size || 10;
      const offset = (page - 1) * limit;
      console.log('Limit is ' + limit + ' offset is: ' + offset);
      let queryRef = dataRef;
      queryArray.forEach((query) => {
        queryRef = queryRef.where(query[0], query[1], query[2]);
      });

      if (orderBy !== null) {
        if (typeof orderBy[1] === undefined) {
          orderBy[1] = 'asc';
        }
        queryRef = queryRef.orderBy(orderBy[0], orderBy[1]);
      }

      const results: { [k: string]: any } = {};

      queryRef
        .limit(limit)
        .offset(offset)
        .get()
        .then((snapshot: any) => {
          snapshot.forEach((doc: any) => {
            results[doc.id] = doc.data();
          });
          if (Object.keys(results).length > 0) {
            resolve(results);
          } else {
            resolve('No such document!');
          }
        })
        .catch((err: any) => {
          reject(false);
          console.log('Error getting documents', err);
        });
    });
  }

  /**
   * Backup data from Firestore
   *
   * @param {string} collectionName
   * @return {json}
   */
  backup(collectionName: string): Promise<any> {
    return backup(collectionName);
  }

  /**
   * Add sub collection to data Object if possible
   *
   * @param {any} db
   * @param {any} key
   * @param {any} subData
   * @param {any} collectionName
   * @param {any} subCollection
   * @returns
   */
  addSubCollection(
    db: any,
    key: string,
    subData: Object,
    collectionName: string,
    subCollection: string
  ) {
    return new Promise((resolve, reject) => {
      db.collection(collectionName)
        .doc(key)
        .collection(subCollection)
        .get()
        .then((snapshot) => {
          snapshot.forEach((subDoc) => {
            subData[subDoc.id] = subDoc.data();
            resolve('Added data');
          });
        })
        .catch((error) => {
          reject(false);
          console.log(error);
        });
    });
  }

  /**
   *Restore data to Firestore
   *
   * @param {*} fileName
   * @returns {Promise<any>}
   * @memberof FirestoreHelper
   */
  restore(fileName, options?: IImportOptions): Promise<any> {
    return restore(fileName, options);
  }
}
