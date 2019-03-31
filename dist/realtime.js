"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RealtimeHelper {
    /**
     * Get realtime database from path
     *
     * @param {*} db
     * @param {string} path
     * @returns {Promise<Object>}
     * @memberof RealtimeHelper
     */
    getData(db, path) {
        const ref = db.ref(path);
        return new Promise((resolve, reject) => {
            ref.once("value", function (snapshot) {
                const data = snapshot.val();
                if (data) {
                    if (data[0] === undefined) { // remove first empty item
                        data.splice && data.splice(0, 1);
                    }
                    resolve(data);
                }
                else {
                    reject(`Data can't be found!`);
                }
            });
        });
    }
    /**
     *  Save data to realtime database
     *
     * @param {*} db
     * @param {string} path
     * @param {Object} data
     * @param {boolean} [remove=true]
     * @returns {Promise<Object>}
     * @memberof RealtimeHelper
     */
    saveData(db, path, data, remove = true) {
        const ref = db.ref(path);
        return new Promise((resolve, reject) => {
            if (remove) {
                ref.set(data, (error) => {
                    if (error) {
                        reject({ status: false, message: error });
                    }
                    else {
                        resolve({ status: true, message: 'Data saved succesfully!' });
                    }
                });
            }
            else { // replace entire data
                const errorList = [];
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        ref.child(key).set(data[key], error => {
                            errorList.push(error);
                        });
                    }
                }
                if (errorList.length > 0) {
                    reject({ status: false, message: errorList });
                }
                else {
                    resolve({ status: true, message: 'Data saved succesfully!' });
                }
            }
        });
    }
    /**
     * Update existing data
     *
     * @param {*} db
     * @param {string} path
     * @param {Object} data
     * @returns {Promise<Object>}
     * @memberof RealtimeHelper
     */
    updateData(db, path, data) {
        const ref = db.ref(path);
        return new Promise((resolve, reject) => {
            ref.update(data, error => {
                if (error) {
                    reject({ status: false, message: error });
                }
                else {
                    resolve({ status: true, message: 'Data updated succesfully!' });
                }
            });
        });
    }
    /**
     * Delete data
     *
     * @param {*} db
     * @param {string} path
     * @returns {Promise<Object>}
     * @memberof RealtimeHelper
     */
    deleteData(db, path) {
        const ref = db.ref(path);
        return new Promise((resolve, reject) => {
            ref.set(null, (error) => {
                if (error) {
                    reject({ status: false, message: error });
                }
                else {
                    resolve({ status: true, message: 'Data deleted succesfully!' });
                }
            });
        });
    }
}
exports.RealtimeHelper = RealtimeHelper;
//# sourceMappingURL=realtime.js.map