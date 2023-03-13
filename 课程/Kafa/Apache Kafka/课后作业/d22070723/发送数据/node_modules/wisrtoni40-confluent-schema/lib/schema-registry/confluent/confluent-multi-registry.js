"use strict";
/**
 * 專案名稱： @wisrtoni40/confluent-schema
 * 部門代號： ML8100
 * 檔案說明： Confluent多重Schema Registry
 * @CREATE Wed Jan 13 2021 下午1:07:46
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfluentMultiRegistry = void 0;
const http_1 = require("./../http");
/**
 * Confluent多重Schema Registry
 */
class ConfluentMultiRegistry {
    /**
     * @param host Schema Registry位置
     */
    constructor(host) {
        this.host = host;
        /**
         * HTTP請求
         */
        this.http = new http_1.MultiHttpGet();
        /**
         * Schema版本享元
         */
        this.topicSchemaVersionFlyweight = new Map();
        /**
         * Schema享元
         */
        this.schemaFlyweight = new Map();
    }
    /**
     * 取得Subject的URL
     *
     * @method public
     * @return 回傳Subject的URL
     */
    getSubjectsUrl() {
        return this.host.split(',').map((host) => `${host}/subjects`);
    }
    /**
     * 取得Subject版本URL
     *
     * @method public
     * @param topic Topic名稱
     * @return 回傳Subject版本URL
     */
    getSubjectVersionsUrl(topic) {
        return this.getSubjectsUrl().map((subject) => `${subject}/${topic}-value/versions`);
    }
    /**
     * 取得Subjects清單
     *
     * @method public
     * @return 回傳Subjects清單
     */
    getSubjects() {
        return new Promise((resolve, reject) => {
            this.http.get(this.getSubjectsUrl(), (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (response.statusCode === 200) {
                        resolve(JSON.parse(body));
                    }
                    else {
                        reject(new Error(JSON.parse(body).message));
                    }
                }
            });
        });
    }
    /**
     * 取得特定Topic的Schema版本清單
     *
     * @method public
     * @param topic Topic名稱
     * @return 回傳特定Topic的Schema版本清單
     */
    getVersions(topic) {
        return new Promise((resolve, reject) => {
            if (this.topicSchemaVersionFlyweight.get(topic)) {
                resolve(this.topicSchemaVersionFlyweight.get(topic) || []);
            }
            else {
                this.http.get(this.getSubjectVersionsUrl(topic), (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (response.statusCode === 200) {
                            this.topicSchemaVersionFlyweight.set(topic, JSON.parse(body));
                            resolve(JSON.parse(body));
                        }
                        else {
                            reject(new Error(JSON.parse(body).message));
                        }
                    }
                });
            }
        });
    }
    /**
     * 取得Schema
     *
     * @method public
     * @param topic   Topic名稱
     * @param version 版本
     * @return 回傳Schema
     */
    getSchema(topic, version) {
        return new Promise((resolve, reject) => {
            const target = Array.from(this.schemaFlyweight)
                .map((schema) => schema[1])
                .filter((schema) => schema.subject === `${topic}-value` && schema.version === version);
            if (target.length > 0) {
                resolve(target[0]);
            }
            else {
                const subjectVersions = this.getSubjectVersionsUrl(topic).map((subject) => `${subject}/${version}`);
                this.http.get(subjectVersions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (response.statusCode === 200) {
                            const result = JSON.parse(body);
                            this.schemaFlyweight.set(result.id, result);
                            resolve(result);
                        }
                        else {
                            reject(new Error(JSON.parse(body).message));
                        }
                    }
                });
            }
        });
    }
    /**
     * 取得特定Topic最新的Schema ID
     *
     * @method public
     * @param topic Topic名稱
     * @return 回傳特定Topic最新的Schema ID
     */
    getLatestSchemaId(topic) {
        return new Promise((resolve, reject) => {
            this.getLatestSchema(topic)
                .then((result) => resolve(result.id))
                .catch(reject);
        });
    }
    /**
     * 取得特定Topic最新的Schema
     *
     * @method public
     * @param topic Topic名稱
     * @return 回傳特定Topic最新的Schema
     */
    getLatestSchema(topic) {
        return new Promise((resolve, reject) => {
            this.getVersions(topic)
                .then((versions) => {
                this.getSchema(topic, Math.max(...versions))
                    .then(resolve)
                    .catch(reject);
            })
                .catch(reject);
        });
    }
    /**
     * 取得特定ID的Schema
     *
     * @method public
     * @param id Schema ID
     * @return 回傳特定ID的Schema
     */
    getSchemaById(id) {
        return new Promise((resolve, reject) => {
            if (this.schemaFlyweight.get(id)) {
                resolve(this.schemaFlyweight.get(id));
            }
            else {
                this.http.get(this.host.split(',').map((host) => `${host}/schemas/ids/${id}`), (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (response.statusCode === 200) {
                            const result = JSON.parse(body);
                            this.schemaFlyweight.set(id, result);
                            resolve(result);
                        }
                        else {
                            reject(new Error(JSON.parse(body).message));
                        }
                    }
                });
            }
        });
    }
}
exports.ConfluentMultiRegistry = ConfluentMultiRegistry;
