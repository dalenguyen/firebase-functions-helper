"use strict";var __importStar=(this&&this.__importStar)||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(mod!=null)for(var k in mod)if(Object.hasOwnProperty.call(mod,k))result[k]=mod[k];result["default"]=mod;return result;};Object.defineProperty(exports,"__esModule",{value:true});const admin=__importStar(require("firebase-admin"));class FirebaseHelper{initializeApp(serviceAccount,databaseURL){admin.initializeApp({credential:admin.credential.cert(serviceAccount),databaseURL:databaseURL});return{'firestore':admin.firestore(),'realtime':admin.database()};}
getUserById(userId){return admin.auth().getUser(userId).then(user=>user).catch(error=>console.log(error));}
getUserByEmail(email){return admin.auth().getUserByEmail(email).then(user=>user).catch(error=>console.log(error));}
getUserByPhone(phone){return admin.auth().getUserByPhoneNumber(phone).then(user=>user).catch(error=>console.log(error));}
deleteUser(userId){return new Promise(resolve=>{admin.auth().deleteUser(userId).then(()=>{resolve(true);}).catch(error=>{console.log(error);resolve(false);});});}
deleteUsers(userIds){userIds.map(userId=>{this.deleteUser(userId).then(()=>{console.log("Successfully deleted user: ",userId);}).catch(error=>console.log(error));});}
createUser(userInfo){return new Promise((resolve)=>{admin.auth().createUser(userInfo).then((userRecord)=>{resolve({status:true,data:userRecord});}).catch((error)=>{resolve({status:false,data:error.message});});});}
updateUser(userId,userInfo){return new Promise(resolve=>{admin.auth().updateUser(userId,userInfo).then(userRecord=>{resolve({status:true,data:userRecord});}).catch((error)=>{resolve({status:false,data:error.message});});});}
getAllUsers(maxResults=1000){return admin.auth().listUsers(maxResults).then((listUsersResult)=>listUsersResult.users).catch((error)=>{console.log("Error listing users:",error);});}
auth(){return admin.auth();}}
exports.FirebaseHelper=FirebaseHelper;