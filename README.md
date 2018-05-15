# firebase-functions-helper
A helper NPM package for Firebase Cloud Functions

## Installation 

Install using [__npm__](https://www.npmjs.com/).

```sh
npm install firebase-functions-helper
```

## Get Google Cloud Account Credentials from Firebase

You can __Generate New Private Key__ from Project Settings from [Firebase Console](https://console.firebase.google.com).

After that you need to copy the __databaseURL__ for initiating the App. 

## Usage 

### Initialize Firebase App

This is the first step that you need to do before doing any other actions. You still can use the other methods from firebase helpers if you initialize the app by using other methods from Firebase docs.

```
const firebaseHelper = require('firebase-functions-helper');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase App
firebaseHelper.initializeApp(serviceAccount, databaseURL);
```

### Get Firestore Collection with Sub Collection

```
// Initialize Firebase App
const app = firebaseHelper.initializeApp(serviceAccount, databaseURL);
const db = app.firestore;

// Start exporting your collection
var result = firebaseHelper.firestoreBackup(db, 'collection-name', 'sub-collection-optional');
result.then(data => console.log(JSON.stringify(data)))
```

### Import data to firestore 

This code will help you to import data from a JSON file to firestore

```
// Initialize Firebase App
const app = firebaseHelper.initializeApp(serviceAccount, databaseURL);
const db = app.firestore;

// Start exporting your data
firebaseHelper.firestoreRestore(db, 'your-file-path.json');
```

The JSON is formated as below. The collection name is __test__. __first-key__ and __second-key__ are document ids. 

```
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

### Create a document with id in firestore

```
// Initialize Firebase App
const app = firebaseHelper.initializeApp(serviceAccount, databaseURL);

const db = app.firestore;
firebaseHelper.firestoreCreateDocumentWithId(db, 'collection-name', 'document-id', data);
```

### Create a new document without an ID

```
// Initialize Firebase App
const app = firebaseHelper.initializeApp(serviceAccount, databaseURL);

const db = app.firestore;
firebaseHelper.firestoreCreateNewDocument(db, 'collection-name', data);
```

### Update a document

This action will only update the current key inside the document, if the data doesn't exist, it will create a new one. However, it will not create a new document if the document doesn't exist in the first place.

```
// Initialize Firebase App
const app = firebaseHelper.initializeApp(serviceAccount, databaseURL);

const db = app.firestore;
firebaseHelper.firestoreUpdateDocument(db, 'collection-name', 'document-id', data);
```

### Delete a document

```
// Initialize Firebase App
const app = firebaseHelper.initializeApp(serviceAccount, databaseURL);

const db = app.firestore;
firebaseHelper.firestoreDeleteDocument(db, 'collection-name', 'document-id');
```

### Check whether a document exists

This will return a Promise<boolean>

```
// Initialize Firebase App
const app = firebaseHelper.initializeApp(serviceAccount, databaseURL);

const db = app.firestore;
const doc = firebaseHelper.firestoreCheckDocumentExists(db, 'collection-name', 'document-id');
doc.then(exists => console.log(exists));
```

## Contributions

This project is based on [firebase-functions-snippets](https://github.com/dalenguyen/firebase-functions-snippets), feel free to report bugs and make feature requests in the [Issue Tracker](https://github.com/dalenguyen/firebase-functions-helper/issues), fork and create pull requests!