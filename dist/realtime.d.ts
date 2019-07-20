export declare class RealtimeHelper {
    /**
     * Get realtime database from path
     *
     * @param {*} db
     * @param {string} path
     * @returns {Promise<Object>}
     * @memberof RealtimeHelper
     */
    getData(db: any, path: string): Promise<Object>;
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
    saveData(db: any, path: string, data: Object, remove?: boolean): Promise<Object>;
    /**
     * Update existing data
     *
     * @param {*} db
     * @param {string} path
     * @param {Object} data
     * @returns {Promise<Object>}
     * @memberof RealtimeHelper
     */
    updateData(db: any, path: string, data: Object): Promise<Object>;
    /**
     * Delete data
     *
     * @param {*} db
     * @param {string} path
     * @returns {Promise<Object>}
     * @memberof RealtimeHelper
     */
    deleteData(db: any, path: string): Promise<Object>;
}
