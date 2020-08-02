export declare class FirestoreHelper {
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
    createDocumentWithID(db: any, collectionName: string, docId: string, data: Object): Promise<boolean>;
    /**
     * Create a document without an ID
     *
     * @param {*} db
     * @param {string} collectionName
     * @param {Object} data
     * @returns
     * @memberof FirestoreHelper
     */
    createNewDocument(db: any, collectionName: string, data: Object): Promise<any>;
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
    updateDocument(db: any, collectionName: string, docId: string, data: Object): Promise<any>;
    /**
     * Delete a document
     *
     * @param {*} db
     * @param {string} collectionName
     * @param {string} docId
     * @returns {Promise<Object>}
     * @memberof FirestoreHelper
     */
    deleteDocument(db: any, collectionName: string, docId: string): Promise<Object>;
    /**
     * Delete a document from Sub Collection
     *
     * @param {any} db
     * @param {any} collectionName
     * @param {any} docId
     * @param {any} collectionNameTwo
     * @param {any} docIdTwo
     */
    deleteDocumentFromSubcollection(db: any, collectionName: string, docId: string, collectionNameTwo: string, docIdTwo: string): void;
    /**
     * Check where a document exists or not
     *
     * @param {any} db
     * @param {string} collectionName
     * @param {string} docId
     * @returns {Promise<any>}
     * @memberof FirestoreHelper
     */
    checkDocumentExists(db: any, collectionName: string, docId: string): Promise<any>;
    /**
     * Get a document from document Id
     *
     * @param {any} db
     * @param {string} collectionName
     * @param {string} documentId
     * @returns {Promise<any>}
     * @memberof FirestoreHelper
     */
    getDocument(db: any, collectionName: string, documentId: string): Promise<any>;
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
    queryData(db: any, collectionName: string, queryArray: Array<any>, orderBy?: Array<any>): Promise<any>;
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
    queryDataWithPagiation(dbp: any, collectionName: string, queryArray: Array<any>, orderBy: Array<any>, page: number, size: number): Promise<any>;
    /**
     * Backup data from Firestore
     *
     * @param {*} db
     * @param {string} collectionName
     * @param {string} subCollection
     * @return {json}
     */
    backup(db: any, collectionName: string, subCollection?: string): Promise<unknown>;
    /**
     * Get sub collection from a document if possible
     *
     * @param {any} db
     * @param {any} data
     * @param {any} dt
     * @param {any} collectionName
     * @param {any} subCollection
     */
    getSubCollection(db: any, data: Object, dt: Object, collectionName: string, subCollection: string): Promise<void>;
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
    addSubCollection(db: any, key: string, subData: Object, collectionName: string, subCollection: string): Promise<unknown>;
    /**
     *Restore data to Firestore
     *
     * @param {*} db
     * @param {*} fileName
     * @returns {Promise<any>}
     * @memberof FirestoreHelper
     */
    restore(db: any, fileName: any): Promise<any>;
    /**
     * Update data to Firestore
     *
     * @param {any} db
     * @param {any} dataArray
     */
    updateCollection(db: any, dataArray: Object): Promise<void>;
    /**
     * Write data to document
     *
     * @param {any} db
     * @param {any} collectionName
     * @param {any} doc
     * @param {any} data
     * @returns
     */
    startUpdating(db: any, collectionName: string, doc: string, data: Object): Promise<unknown>;
}
