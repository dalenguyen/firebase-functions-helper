# Realtime Database | Firebase Functions Helper

Before starting with Realtime Database, we have to initialize Firebase App and get Realtime Database.

```sh
const { firebaseHelper, realtimeHelper } = require('firebase-functions-helper');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase App
const app = firebaseHelper.firebase.initializeApp(serviceAccount, databaseURL);

// Get Realtime Database
const db = app.realtime;
```

## 1. Get Data

The result will be a Promise of an array or an object of data.

```sh
realtimeHelper
    .getData(db, 'data-path')
    .then(data => console.log(data);)
```

## 2. Save Data

You will have two options that help to replace entire data path or keep and replace the data. This function will return a Promise<object>: **{status: boolean, message: string}**

```sh
const data = {
    td: {
        name: 'Toronto-Dominion Bank'
    },
    rbc: {
        name: 'RBC Royal Bank'
    }
}

// Remove everything and add new data
realtimeHelper
    .saveData(db, 'data-path', data, true);

// Replace or add new data without remove the old data
realtimeHelper
    .saveData(db, 'data-path', data, false);
```

## 3. Updated Saved Data

This function will have you to add extra information to an existing data. If the path in data is incorrect, it will create a new data. This function will return a Promise<object>: **{status: boolean, message: string}**

```sh
const updatedData = {
    'td/location': 'Toronto',
    'rbc/location': 'Toronto'
}

// Add location info to td and rbc
realtimeHelper
    .updateData(db, 'banks', updatedData);
```

## 4. Delete Data

This function will delete all data under a path. It will return a Promise<object>: **{status: boolean, message: string}**

```sh
realtimeHelper
    .deleteData(db, 'data-path');
```
