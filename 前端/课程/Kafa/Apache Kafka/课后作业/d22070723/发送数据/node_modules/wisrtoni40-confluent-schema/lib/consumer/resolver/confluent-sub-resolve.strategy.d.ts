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
/// <reference types="node" />
import { AvroResolveStrategy } from '../../avro/avro-resolve.strategy';
import { SchemaRegistry } from '../../schema-registry';
import { ConsumerResolveStrategy } from './consumer-resolve.strategy';
/**
 * Confluent Avro資料解析策略
 */
export declare class ConfluentSubResolveStrategy implements ConsumerResolveStrategy {
    private readonly schemaRegistry;
    private readonly avroResolver;
    /**
     * @param schemaRegistry Schema Registry
     * @param avroResolver   Avro解析策略
     */
    constructor(schemaRegistry: SchemaRegistry, avroResolver: AvroResolveStrategy);
    /**
     * 解析Avro編碼
     *
     * @method private
     * @param message 要解析的數據
     * @return 回傳解析結果
     */
    private decoded;
    /**
     * 解析資料
     *
     * @method public
     * @param input 解析前的資料
     * @return 回傳解析後的資料
     */
    resolve<T>(input: string | Buffer): Promise<T | undefined>;
}
