"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.FirestoreHelper=void 0;const firestore_export_import_1=require("firestore-export-import");class FirestoreHelper{createDocumentWithID(db,collectionName,docId,data){return db.collection(collectionName).doc(docId).set(data).then(()=>true).catch(function(error){return false;});}
createNewDocument(db,collectionName,data){return db.collection(collectionName).add(data).then(function(docRef){return docRef;}).catch(function(error){return error;});}
updateDocument(db,collectionName,docId,data){return db.collection(collectionName).doc(docId).update(data).then(()=>true).catch((err)=>err);}
deleteDocument(db,collectionName,docId){return db.collection(collectionName).doc(docId).delete().then(()=>{return{status:true,message:docId+' successfully deleted!'};}).catch((error)=>{return{status:false,message:error};});}
deleteDocumentFromSubcollection(db,collectionName,docId,collectionNameTwo,docIdTwo){db.collection(collectionName).doc(docId).collection(collectionNameTwo).doc(docIdTwo).delete().then(()=>{console.log(docIdTwo+' successfully deleted!');}).catch((error)=>{console.error('Error removing document: ',error);});}
checkDocumentExists(db,collectionName,docId){const dbRef=db.collection(collectionName).doc(docId);return dbRef.get().then((doc)=>{if(!doc.exists){return{exists:false,};}
else{return{exists:true,data:doc.data(),};}}).catch((err)=>{console.log('Error getting document',err);});}
getDocument(db,collectionName,documentId){const docRef=db.collection(collectionName).doc(documentId);return docRef.get().then(function(doc){if(doc.exists){return doc.data();}
else{console.log('No such document!');return false;}}).catch(function(error){console.log('Error getting document:',error);});}
queryData(db,collectionName,queryArray,orderBy=null){return new Promise((resolve,reject)=>{const dataRef=db.collection(collectionName);let queryRef=dataRef;queryArray.forEach((query)=>{queryRef=queryRef.where(query[0],query[1],query[2]);});if(orderBy!==null){if(typeof orderBy[1]===undefined){orderBy[1]='asc';}
queryRef=queryRef.orderBy(orderBy[0],orderBy[1]);}
const results={};queryRef.get().then((snapshot)=>{snapshot.forEach((doc)=>{results[doc.id]=doc.data();});if(Object.keys(results).length>0){resolve(results);}
else{resolve('No such document!');}}).catch((err)=>{reject(false);console.log('Error getting documents',err);});});}
queryDataWithPagiation(dbp,collectionName,queryArray,orderBy,page,size){return new Promise((resolve,reject)=>{const dataRef=dbp.collection(collectionName);const limit=size||10;const offset=(page-1)*limit;console.log('Limit is '+limit+' offset is: '+offset);let queryRef=dataRef;queryArray.forEach((query)=>{queryRef=queryRef.where(query[0],query[1],query[2]);});if(orderBy!==null){if(typeof orderBy[1]===undefined){orderBy[1]='asc';}
queryRef=queryRef.orderBy(orderBy[0],orderBy[1]);}
const results={};queryRef.limit(limit).offset(offset).get().then((snapshot)=>{snapshot.forEach((doc)=>{results[doc.id]=doc.data();});if(Object.keys(results).length>0){resolve(results);}
else{resolve('No such document!');}}).catch((err)=>{reject(false);console.log('Error getting documents',err);});});}
backup(collectionName){return firestore_export_import_1.backup(collectionName);}
addSubCollection(db,key,subData,collectionName,subCollection){return new Promise((resolve,reject)=>{db.collection(collectionName).doc(key).collection(subCollection).get().then((snapshot)=>{snapshot.forEach((subDoc)=>{subData[subDoc.id]=subDoc.data();resolve('Added data');});}).catch((error)=>{reject(false);console.log(error);});});}
restore(fileName,options){return firestore_export_import_1.restore(fileName,options);}}
exports.FirestoreHelper=FirestoreHelper;