import { expect } from 'chai';
import * as firebaseHelper from '../dist/index.js';
import { app } from './appInitialize';

const db = app.firestore;
db.settings({ timestampsInSnapshots: true });

describe('Test firestore functions:', () => {
    const collectionName = 'test';
    it('Restore', async () => {
        try {
            const result = await firebaseHelper.firestore.restore(db, 'test/import-to-firestore.json');
            expect(result.status).to.equal(true);
        } catch (error) {
            console.log(error);
        }
    });
    it('Backup Success', async () => {
        let result;
        try {
            result = await firebaseHelper.firestore.backup(db, collectionName);
        } catch (error) {
            console.log(error);
        }
        expect(result).to.have.property(collectionName);

        // result.then(data => console.log(JSON.stringify(data)))
    });
    it('Create document with ID', async () => {
        let result;
        try {
            result = await firebaseHelper.firestore.createDocumentWithID(db, collectionName, '1', {test: true});
        } catch (error) {
            console.log(error);
        }
        expect(result).to.equal(true);
    });
    it('Create new document without an ID', async () => {
        let result;
        try {
            result = await firebaseHelper.firestore.createNewDocument(db, collectionName, {test: true});
        } catch (error) {
            console.log(error);
        }
        expect(typeof result.id).to.equal('string');
        expect(result.id.length).to.equal(20);
    });
    it('Update a document', async () => {
        let result;
        try {
            result = await firebaseHelper.firestore.updateDocument(db, collectionName, '1', {test: false});
        } catch (error) {
            console.log(error);
        }
        expect(result).to.equal(true);
    });
    it('Delete a document', async () => {
        let result;
        try {
            result = await firebaseHelper.firestore.updateDocument(db, collectionName, '1', {test: false});
        } catch (error) {
            console.log(error);
        }
        expect(result).to.equal(true);
    });
    it('Check if document exists: True', async () => {
        let result;
        try {
            result = await firebaseHelper.firestore.checkDocumentExists(db, collectionName, 'first-key');
        } catch (error) {
            console.log(error);
        }
        expect(result.exists).to.equal(true);
    });
    it('Check if document exists: False', async () => {
        let result;
        try {
            result = await firebaseHelper.firestore.checkDocumentExists(db, collectionName, 'no-key');
        } catch (error) {
            console.log(error);
        }
        expect(result.exists).to.equal(false);
    });
    it('Get a valid document', async () => {
        let result;
        try {
            result = await firebaseHelper.firestore.getDocument(db, collectionName, 'first-key');
        } catch (error) {
            console.log(error);
        }
        expect(result.website).to.equal('dalenguyen.me');
    });
    it('Get a invalid document', async () => {
        let result;
        try {
            result = await firebaseHelper.firestore.getDocument(db, collectionName, 'no-key');
        } catch (error) {
            console.log(error);
        }
        expect(result).to.equal(false);
    });
    it('Query Data without order', async () => {
        const query = [['website', '==', 'dalenguyen.me']];        
        let result;
        try {
            result = await firebaseHelper.firestore.queryData(db, collectionName, query);            
        } catch (error) {
            console.log(error);
        }
        expect(typeof result['first-key']).to.equal('object');
    });
    it('Query Data with order', async () => {
        const query = [['website', '==', 'dalenguyen.me']];
        const orderBy = ['email', 'desc'];
        let result;
        try {
            result = await firebaseHelper.firestore.queryData(db, collectionName, query, orderBy);            
        } catch (error) {
            console.log(error);
        }
        expect(typeof result['first-key']).to.equal('object');
    });
    it('Query Data with multi queries', async () => {
        const query = [['website', '==', 'dalenguyen.me'], ['email', '==', 'dungnq@itbox4vn.com']];        
        let result;
        try {
            result = await firebaseHelper.firestore.queryData(db, collectionName, query);                   
        } catch (error) {
            console.log(error);
        }
        expect(typeof result['first-key']).to.equal('object');
    });
    it('Delete a document with document id', async () => {
        let result;
        try {
            result = await firebaseHelper.firestore.deleteDocument(db, collectionName, '1');
        } catch (error) {
            console.log(error);
        }
        expect(result.status).to.equal(true);
        expect(result.message).to.equal('1 successfully deleted!');
    });
});