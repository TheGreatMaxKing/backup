/**
 * 專案名稱： @wisrtoni40/confluent-schema
 * 部門代號： ML8100
 * 檔案說明： Confluent Avro資料解析策略
 * @CREATE Wed Jan 13 2021 下午2:06:36
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/// <reference types="node" />
import { AvroResolveStrategy } from './../../avro';
import { SchemaRegistry } from './../../schema-registry';
import { ProducerResolveStrategy } from './producer-resolve.strategy';
/**
 * Kafka2.0 Producer資料解析策略
 */
export declare class ConfluentPubResolveStrategy extends ProducerResolveStrategy {
    private readonly schemaRegistry;
    private readonly avroResolver;
    destination: string;
    /**
     * @param schemaRegistry Schema Registry
     * @param avroResolver   Avro解析策略
     * @param destination    發送資料的目的地
     */
    constructor(schemaRegistry: SchemaRegistry, avroResolver: AvroResolveStrategy, destination: string);
    /**
     * 進行Avro編碼
     *
     * @method private
     * @param message 要編碼的數據
     * @return 回傳編碼結果
     */
    private encoded;
    /**
     * 解析資料
     *
     * @method public
     * @param input 解析前的資料
     * @return 回傳解析後的資料
     */
    resolve(input: any | any[]): Promise<Buffer | Buffer[] | Error>;
}
