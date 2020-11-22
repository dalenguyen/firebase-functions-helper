import { expect } from 'chai';
import { realtimeHelper } from '../dist/index.js';
import { app } from './appInitialize';

const db = app.realtime;

describe('Test realtime functions:', () => {
  it('Get valid data', async () => {
    let data;
    try {
      data = await realtimeHelper.getData(db, 'users/1');
    } catch (error) {
      console.log(error);
    }
    expect(typeof data).to.equal('object');
    expect(Object.keys(data).length).to.greaterThan(0, `Data is empty!`);
  });

  it('Get invalid data', async () => {
    let errorMessage;
    try {
      const data = await realtimeHelper.getData(db, 'invalid-path');
    } catch (error) {
      errorMessage = error;
    }
    expect(errorMessage).to.equal(
      `Data can't be found!`,
      `Please use an invalid path!`
    );
  });

  it('Save new data and replace everything', async () => {
    const data = {
      td: {
        name: 'Toronto-Dominion Bank',
      },
      rbc: {
        name: 'RBC Royal Bank',
      },
    };

    let result;
    try {
      result = await realtimeHelper.saveData(db, 'banks', data, true);
    } catch (error) {
      console.log(error);
    }

    expect(result.status, `${result.message}`).to.be.true;
  });

  it('Save or replace only new data', async () => {
    const data = {
      td: {
        name: 'Toronto-Dominion Bank',
      },
      nb: {
        name: 'National Bank',
      },
    };

    let result;
    try {
      result = await realtimeHelper.saveData(db, 'banks', data, false);
    } catch (error) {
      console.log(error);
    }

    expect(result.status, `${result.message}`).to.be.true;
  });

  it('Update saved data', async () => {
    const data = {
      'td/location': 'Toronto',
      'rbc/location': 'Toronto',
    };

    let result1;
    try {
      result1 = await realtimeHelper.updateData(db, 'banks', data);
    } catch (error) {
      console.log(error);
    }

    expect(result1.status, `${result1.message}`).to.be.true;

    let result2;
    try {
      result2 = await realtimeHelper.getData(db, 'banks/td/location');
    } catch (error) {
      console.log(error);
    }

    expect(result2).to.equal('Toronto', `Data cannot be updated`);
  });

  it('Delete data', async () => {
    let result;
    try {
      result = await realtimeHelper.deleteData(db, 'banks');
    } catch (error) {
      console.log(error);
    }

    expect(result.status, `${result.message}`).to.be.true;
  });
});
