# Firestore | Firebase Functions Helper

Before starting with Firestore, we have to initialize Firebase App and get Firestore DB.

```sh
const firebaseHelper = require('firebase-functions-helper');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase App
const app = firebaseHelper.initializeApp(serviceAccount, databaseURL);

// Get Firestore DB
const db = app.firestore;
```

## 1. Get a Document

The result will be a Promise that returns _content of a document_ or _false_ if document doesn't exist.

```sh
let result = firebaseHelper.firestore.getDocument(db, 'collection-name', 'document-id');
result.then(doc => console.log(doc));
```

## 2. Get Firestore Collection with Sub Collection

```sh
// Start exporting your collection
let result = firebaseHelper.firestore.backup(db, 'collection-name', 'sub-collection-optional');
result.then(data => console.log(JSON.stringify(data)))
```

With this feature you can get and loop through all of your documents from a collection

```sh
let result = firebaseHelper.firestore.backup(db, 'collection-name');
result.then(data => {    
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

This code will help you to import data from a JSON file to firestore

```sh
// Start exporting your data
firebaseHelper.firestore.restore(db, 'your-file-path.json');
```

The JSON is formated as below. The collection name is __test__. __first-key__ and __second-key__ are document ids. 

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
firebaseHelper.firestore.createDocumentWithID(db, 'collection-name', 'document-id', data);
```

## 5. Create a new document without an ID

```sh
firebaseHelper.firestore.creatNewDocument(db, 'collection-name', data);
```

## 6. Update a document

This action will only update the current key inside the document, if the data doesn't exist, it will create a new one. However, it will not create a new document if the document doesn't exist in the first place.

```sh
let data = {key: value};
firebaseHelper.firestore.updateDocument(db, 'collection-name', 'document-id', data);
```

## 7. Delete a document

```sh
firebaseHelper.firestore.deleteDocument(db, 'collection-name', 'document-id');
```

## 8. Check whether a document exists

This will return a Promise<boolean>

```sh
const doc = firebaseHelper.firestore.checkDocumentExists(db, 'collection-name', 'document-id');
doc.then(exists => console.log(exists));
```

## 9. Query data from firestore

This will return a Promise<array> of documents

```sh
// Search for data ( <, <=, ==, >, or >= )
const queryArray = ['website', '==', 'dalenguyen.me'];
let queryResults = firebaseHelper.firestore.queryData(db, 'collection-name', queryArray);
queryResults.then(docs => console.log(docs));
```

## 10. Next Steps

If you want to add more features, please make a request in the [Issue Tracker](https://github.com/dalenguyen/firebase-functions-helper/issues)