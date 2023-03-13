"use strict";
/**
 * 專案名稱： @wisrtoni40/confluent-schema
 * 部門代號： ML8100
 * 檔案說明： Confluent Avro資料解析策略
 * @CREATE Wed Jan 13 2021 下午1:28:41
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfluentSubResolveStrategy = void 0;
/**
 * Confluent Avro資料解析策略
 */
class ConfluentSubResolveStrategy {
    /**
     * @param schemaRegistry Schema Registry
     * @param avroResolver   Avro解析策略
     */
    constructor(schemaRegistry, avroResolver) {
        this.schemaRegistry = schemaRegistry;
        this.avroResolver = avroResolver;
    }
    /**
     * 解析Avro編碼
     *
     * @method private
     * @param message 要解析的數據
     * @return 回傳解析結果
     */
    async decoded(message) {
        const schemaRegistry = this.schemaRegistry;
        const result = await this.avroResolver.toJson(schemaRegistry, message);
        return result;
    }
    /**
     * 解析資料
     *
     * @method public
     * @param input 解析前的資料
     * @return 回傳解析後的資料
     */
    async resolve(input) {
        if (typeof input !== 'string') {
            try {
                return await this.decoded(input);
            }
            catch (error) {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    }
}
exports.ConfluentSubResolveStrategy = ConfluentSubResolveStrategy;
