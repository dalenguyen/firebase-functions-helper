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