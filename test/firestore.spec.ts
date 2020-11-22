import { expect } from 'chai';
import { firestoreHelper } from '../dist/index';
import { app } from './appInitialize';

// const { firestoreHelper } = require('../dist/index');

const db = app.firestore;
db.settings({ timestampsInSnapshots: true });

describe('Test firestore functions:', () => {
  const collectionName = 'test';
  it('Restore', async () => {
    try {
      const result = await firestoreHelper.restore(
        'test/import-to-firestore.json'
      );
      expect(result.status).to.equal(true);
    } catch (error) {
      console.log(error);
    }
  });
  it('Backup Success', async () => {
    let result;
    try {
      result = await firestoreHelper.backup(collectionName);
    } catch (error) {
      console.log(error);
    }
    expect(result).to.have.property(collectionName);

    // result.then(data => console.log(JSON.stringify(data)))
  });
  it('Create document with ID', async () => {
    let result;
    try {
      result = await firestoreHelper.createDocumentWithID(
        db,
        collectionName,
        '1',
        { test: true }
      );
    } catch (error) {
      console.log(error);
    }
    expect(result).to.equal(true);
  });
  it('Create new document without an ID', async () => {
    let result;
    try {
      result = await firestoreHelper.createNewDocument(db, collectionName, {
        test: true,
      });
    } catch (error) {
      console.log(error);
    }
    expect(typeof result.id).to.equal('string');
    expect(result.id.length).to.equal(20);
  });
  it('Update a document', async () => {
    let result;
    try {
      result = await firestoreHelper.updateDocument(db, collectionName, '1', {
        test: false,
      });
    } catch (error) {
      console.log(error);
    }
    expect(result).to.equal(true);
  });
  it('Delete a document', async () => {
    let result;
    try {
      result = await firestoreHelper.updateDocument(db, collectionName, '1', {
        test: false,
      });
    } catch (error) {
      console.log(error);
    }
    expect(result).to.equal(true);
  });
  it('Check if document exists: True', async () => {
    let result;
    try {
      result = await firestoreHelper.checkDocumentExists(
        db,
        collectionName,
        'first-key'
      );
    } catch (error) {
      console.log(error);
    }
    expect(result.exists).to.equal(true);
  });
  it('Check if document exists: False', async () => {
    let result;
    try {
      result = await firestoreHelper.checkDocumentExists(
        db,
        collectionName,
        'no-key'
      );
    } catch (error) {
      console.log(error);
    }
    expect(result.exists).to.equal(false);
  });
  it('Get a valid document', async () => {
    let result;
    try {
      result = await firestoreHelper.getDocument(
        db,
        collectionName,
        'first-key'
      );
    } catch (error) {
      console.log(error);
    }
    expect(result.website).to.equal('dalenguyen.me');
  });
  it('Get a invalid document', async () => {
    let result;
    try {
      result = await firestoreHelper.getDocument(db, collectionName, 'no-key');
    } catch (error) {
      console.log(error);
    }
    expect(result).to.equal(false);
  });
  it('Query Data without order', async () => {
    const query = [['website', '==', 'dalenguyen.me']];
    let result;
    try {
      result = await firestoreHelper.queryData(db, collectionName, query);
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
      result = await firestoreHelper.queryData(
        db,
        collectionName,
        query,
        orderBy
      );
    } catch (error) {
      console.log(error);
    }
    expect(typeof result['first-key']).to.equal('object');
  });
  it('Query Data with multi queries', async () => {
    const query = [
      ['website', '==', 'dalenguyen.me'],
      ['email', '==', 'dungnq@itbox4vn.com'],
    ];
    let result;
    try {
      result = await firestoreHelper.queryData(db, collectionName, query);
    } catch (error) {
      console.log(error);
    }
    expect(typeof result['first-key']).to.equal('object');
  });
  it('Query Data with multi pagination', async () => {
    const queryArray = [
      ['website', '==', 'dalenguyen.me'],
      //   ['email', '==', 'dungnq@itbox4vn.com'],
    ];
    const orderBy = ['email', 'desc'];
    const size = 10;
    const page = 1;
    let result;
    try {
      result = await firestoreHelper.queryDataWithPagiation(
        db,
        collectionName,
        queryArray,
        orderBy,
        page,
        size
      );
    } catch (error) {
      console.log(error);
    }
    expect(typeof result['first-key']).to.equal('object');
  });
  it('Delete a document with document id', async () => {
    let result;
    try {
      result = await firestoreHelper.deleteDocument(db, collectionName, '1');
    } catch (error) {
      console.log(error);
    }
    expect(result.status).to.equal(true);
    expect(result.message).to.include('1 successfully deleted!');
  });
});
