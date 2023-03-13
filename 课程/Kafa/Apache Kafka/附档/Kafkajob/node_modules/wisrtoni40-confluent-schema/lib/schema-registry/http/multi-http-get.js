"use strict";
/**
 * 專案名稱： @wisrtoni40/confluent-schema
 * 部門代號： ML8100
 * 檔案說明： 多筆HTTP GET請求
 * @CREATE Fri Jan 08 2021 上午10:55:19
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiHttpGet = void 0;
const requestPromise = require("request-promise");
/**
 * 多筆HTTP GET請求
 */
class MultiHttpGet {
    constructor() {
        /**
         * HTTP請求
         */
        this.http = requestPromise;
    }
    /**
     * 取得請求列表
     *
     * @method public
     * @param uri 呼叫位置
     * @return 回傳請求列表
     */
    getRequestList(uri) {
        return uri.map((location) => new Promise((resolve) => this.http.get(location, (error, response, body) => {
            resolve([error, response, body]);
        })));
    }
    /**
     * 呼叫HTTP GET
     *
     * @method public
     * @param uri      呼叫位置
     * @param callback 回呼函數
     */
    get(uri, callback) {
        const requestList = this.getRequestList(uri);
        const response = new Promise((resolve, reject) => {
            let count = 0;
            requestList.forEach((item) => {
                item.then((res) => resolve(res)).catch((res) => {
                    count++;
                    if (count === requestList.length) {
                        reject(res);
                    }
                });
            });
        });
        response.then((value) => callback(...value));
    }
}
exports.MultiHttpGet = MultiHttpGet;
