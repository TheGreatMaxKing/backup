"use strict";
/**
 * 專案名稱： wisrtoni40-confluent-schema
 * 部門代號： ML8100
 * 檔案說明： JSON資料解析策略
 * @CREATE Saturday, 20th August 2022 10:31:36 pm
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonSubResolveStrategy = void 0;
/**
 * JSON資料解析策略
 */
class JsonSubResolveStrategy {
    /**
     * 解析資料
     *
     * @method public
     * @param input 解析前的資料
     * @return 回傳解析後的資料
     */
    async resolve(input) {
        return JSON.parse(input);
    }
}
exports.JsonSubResolveStrategy = JsonSubResolveStrategy;
