/**
 * Create a document with id in firestore
 * 
 * @param {any} db 
 * @param {any} collectionName 
 * @param {any} docID 
 * @param {any} data 
 * @returns 
 */
exports.createDocumentWithID = function(db, collectionName, docId, data){   
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
exports.creatNewDocument = function(db, collectionName, data){
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
exports.updateDocument = function(db, collectionName, docId, data) {
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
exports.deleteDocument = function(db, collectionName, docId) {
    db.collection(collectionName).doc(docId).delete()
    .then(() => {
        console.log(`${docId} successfully deleted!`);
    }).catch(error => {
        console.error("Error removing document: ", error);
    });
}