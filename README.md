# firebase-functions-helper
[![GitHub version](https://badge.fury.io/gh/dalenguyen%2Ffirebase-functions-helper.svg)](https://badge.fury.io/gh/dalenguyen%2Ffirebase-functions-helper) [![Build Status](https://travis-ci.org/dalenguyen/firebase-functions-helper.svg?branch=master)](https://travis-ci.org/dalenguyen/firebase-functions-helper)

A helper NPM package for Firebase Cloud Functions

## Tables of Contents

* [Installation](#installation)
* [Get Google Cloud Account Credentials from Firebase](#get-google-cloud-account-credentials-from-firebase)
* [Usage](#usage)
* [Contributions](#contributions)

## Installation 

Install using [__npm__](https://www.npmjs.com/).

```sh
npm install firebase-functions-helper
```

## Get Google Cloud Account Credentials from Firebase

You can __Generate New Private Key__ from Project Settings from [Firebase Console](https://console.firebase.google.com).

After that you need to copy the __databaseURL__ for initiating the App. 

## Usage 

### Examples

This is the first step that you need to do before doing any other actions. You still can use the other methods from firebase helpers if you initialize the app by using other methods from Firebase docs.

```sh
const firebaseHelper = require('firebase-functions-helper');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase App
firebaseHelper.firebase.initializeApp(serviceAccount, databaseURL);
```

If you want to use this package in *TypeScript*. Please follow this instruction:

```sh
import * as firebaseHelper from 'firebase-functions-helper';
import * as serviceAccount from './serviceAccountKey.json';

// Initialize Firebase App
firebaseHelper.firebase.initializeApp(serviceAccount, databaseURL);

```

In order to import JSON, you need to create a __typings.d.ts__ in your project

```sh
// typings.d.ts
declare module "*.json" {
    const value: any;
    export default value;
}
```

### [Working with Firebase](docs/firebase.md)
### [Working with Firestore](docs/firestore.md)
### Working with Realtime Database (Will be updated!)

## Contributions

This project is based on [firebase-functions-snippets](https://github.com/dalenguyen/firebase-functions-snippets), feel free to report bugs and make feature requests in the [Issue Tracker](https://github.com/dalenguyen/firebase-functions-helper/issues), fork and create pull requests!