# Firebase | Firebase Functions Helper

In this part, you will have the ability to initialize your Firebase App and work on other firebase stuff.

## 1. Initialize Firebase App

This should be the first step before you do anything else on your project

```sh
const { firebaseHelper } = require('firebase-functions-helper');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase App
firebaseHelper.initializeApp(serviceAccount, databaseURL);
```

## 2. Get user though userId

You will find this user Id from **Authentication** tab in Firebase Console. This will return an object of Firebase user.

```sh
firebaseHelper
    .getUserbyId('user-id')
    .then(user => console.log(user));
```

## 3. Get user through email

This will return an object of Firebase user.

```sh
firebaseHelper
    .getUserbyEmail('email')
    .then(user => console.log(user));
```

## 4. Get user through phone number

This will also return an object of Firebase user.

```sh
firebaseHelper
    .getUserbyPhone('phone-number')
    .then(user => console.log(user));
```

## 5. Delete a user by user id

```sh
firebaseHelper
    .deleteUser(userId)
    .then(res => console.log(res));
```

This will return a Promise<boolean>.

## 6. Delete users through an Array of User Ids

```sh
let userList = ['userid-1', 'userid-2']
firebaseHelper
    .deleteUsers(userList);
```

## 7. Create a new Firebase user

```sh
let userInfo = {
    email: "user@dalenguyen.me",
    emailVerified: false,
    phoneNumber: "+11234567890",
    password: "secretPassword",
    displayName: "Dale Nguyen",
    photoURL: "http://www.example.com/12345678/photo.png",
    disabled: false
};

firebaseHelper
    .createUser(userInfo)
    .then(res => console.log(res));
```

This will return a Promise:

```sh
{
    status: true/false
    data: userInfo/Error message
}
```

## 8. Update a user though user Id

```sh
let userInfo = {
    email: "test@dalenguyen.me",
    emailVerified: false,
    phoneNumber: "+11234567899",
    password: "secretPassword",
    displayName: "Dale Nguyen",
    photoURL: "http://www.example.com/12345678/photo.png",
    disabled: false
};

firebaseHelper
    .updateUser('user-id', userInfo);
```

## 9. Get a list of users

This will return an array of users. If you don't pass the max-number-of-user, the default is 1000.

```sh
firebaseHelper
    .getAllUsers('max-number-of-users - optional')
    .then(users => console.log(users));
```

From this, you can delete users in bulk by combining two methods.

```sh
// Get all users
firebaseHelper
    .getAllUsers('max-number-of-users - optional')
    .then(users => {
        users.map(user => {
            firebaseHelper
                .deleteUsers([user.uid]);
        })
    })
```
