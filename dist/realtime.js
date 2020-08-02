"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.RealtimeHelper=void 0;class RealtimeHelper{getData(db,path){const ref=db.ref(path);return new Promise((resolve,reject)=>{ref.once('value',function(snapshot){const data=snapshot.val();if(data){if(data[0]===undefined){data.splice&&data.splice(0,1);}
resolve(data);}
else{reject('Data can\'t be found!');}});});}
saveData(db,path,data,remove=true){const ref=db.ref(path);return new Promise((resolve,reject)=>{if(remove){ref.set(data,(error)=>{if(error){reject({status:false,message:error});}
else{resolve({status:true,message:'Data saved succesfully!'});}});}
else{const errorList=[];for(const key in data){if(data.hasOwnProperty(key)){ref.child(key).set(data[key],error=>{errorList.push(error);});}}
if(errorList.length>0){reject({status:false,message:errorList});}
else{resolve({status:true,message:'Data saved succesfully!'});}}});}
updateData(db,path,data){const ref=db.ref(path);return new Promise((resolve,reject)=>{ref.update(data,error=>{if(error){reject({status:false,message:error});}
else{resolve({status:true,message:'Data updated succesfully!'});}});});}
deleteData(db,path){const ref=db.ref(path);return new Promise((resolve,reject)=>{ref.set(null,(error)=>{if(error){reject({status:false,message:error});}
else{resolve({status:true,message:'Data deleted succesfully!'});}});});}}
exports.RealtimeHelper=RealtimeHelper;