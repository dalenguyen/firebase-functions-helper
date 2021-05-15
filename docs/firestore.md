# Firestore | Firebase Functions Helper

Before starting with Firestore, we have to initialize Firebase App and get Firestore DB.

```sh
const {firebaseHelper, firestoreHelper} = require('firebase-functions-helper');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase App
const app = firebaseHelper.initializeApp(serviceAccount, databaseURL);

// Get Firestore DB
const db = app.firestore;
db.settings({ timestampsInSnapshots: true });
```

## 1. Get a Document

The result will be a Promise that returns _content of a document_ or _false_ if document doesn't exist.

```sh
firestoreHelper
  .getDocument(db, 'collection-name', 'document-id')
  .then(doc => console.log(doc));
```

## 2. Get Firestore Collection with Sub Collection

Backup feature use the package (firestore-export-import)[https://www.npmjs.com/package/firestore-export-import]

```sh
// Start exporting your collection
firestoreHelper
  .backup('collection-name')
  .then(data => console.log(JSON.stringify(data)))
```

With this feature you can get and loop through all of your documents from a collection

```sh
firestoreHelper
  .backup('collection-name');
  .then(data => {
    let docs = data['collection-name'];
    for (const key in docs) {
        if (docs.hasOwnProperty(key)) {
            console.log('Doc id: ', key);
            console.log('Document data: ', docs[key])
        }
    }
  })
```

## 3. Import data to firestore

This code will help you to import data from a JSON file to firestore.

Restore feature use the package (firestore-export-import)[https://www.npmjs.com/package/firestore-export-import]

```sh
// Start exporting your data
firestoreHelper.restore('your-file-path.json');
```

This will return a Promise<{status: boolean, message: string}>.

The JSON is formated as below. The collection name is **test**. **first-key** and **second-key** are document ids.

```sh
{
  "test" : {
    "first-key" : {
      "email"   : "dungnq@itbox4vn.com",
      "website" : "dalenguyen.me",
      "custom"  : {
        "firstName" : "Dale",
        "lastName"  : "Nguyen"
      }
    },
    "second-key" : {
      "email"   : "test@dalenguyen.me",
      "website" : "google.com",
      "custom"  : {
        "firstName" : "Harry",
        "lastName"  : "Potter"
      }
    }
  }
}
```

## 4. Create a document with id in firestore

```sh
firestoreHelper
  .createDocumentWithID(db, 'collection-name', 'document-id', data);
```

This will return a Promise<boolean>.

## 5. Create a new document without an ID

```sh
firestoreHelper
  .createNewDocument(db, 'collection-name', data)
  .then(docRef => console.log(docRef.id));
```

This will return a Promise<DocumentReference>. You can get the document id from that.

## 6. Update a document

This action will only update the current key inside the document, if the data doesn't exist, it will create a new one. However, it will not create a new document if the document doesn't exist in the first place.

```sh
let data = {key: value};
firestoreHelper
  .updateDocument(db, 'collection-name', 'document-id', data);
```

This will return a Promise. True if success and will throw an error if fail.

## 7. Delete a document

```sh
firestoreHelper
  .deleteDocument(db, 'collection-name', 'document-id');
```

This will return a Promise<{status: bolean, message: string}>

## 8. Check whether a document exists

This will return a Promise<boolean> and the document data if possible

```sh
firestoreHelper
  .checkDocumentExists(db, 'collection-name', 'document-id')
  .then(result => {
    // Boolean value of the result
    console.log( result.exists ); // will return true or false
    // If the document exist, you can get the document content
    console.log( JSON.stringify(result.data) ); // return an object of or document
  });
```

## 9. Query data from firestore

This will return a Promise<array> of documents.

The orderBy parameter is OPTIONAL.

```sh
// Search for data ( <, <=, ==, >, or >= )
const queryArray = [['website', '==', 'dalenguyen.me'], ['email', '==', 'dungnq@itbox4vn.com']];
const orderBy = ['email', 'desc'];

firestoreHelper
  .queryData(db, 'collection-name', queryArray, orderby)
  .then(docs => console.log(docs));
```

## 10. Query data from firestore with pagination.

This will return a Promise<array> of documents.

The orderBy parameter is OPTIONAL.

```sh
// Search for data ( <, <=, ==, >, or >= )
const queryArray = [['website', '==', 'dalenguyen.me'], ['email', '==', 'dungnq@itbox4vn.com']];
const orderBy = ['email', 'desc'];
const size = 10;
const page = 1;

firestoreHelper
  .queryDataWithPagiation(db, 'collection-name', queryArray, orderby, page, size)
  .then(docs => console.log(docs));
```

## 11. Next Steps

If you want to add more features, please make a request in the [Issue Tracker](https://github.com/dalenguyen/firebase-functions-helper/issues)
