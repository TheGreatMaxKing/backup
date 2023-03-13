/**
 * 專案名稱： @wisrtoni40/confluent-schema
 * 部門代號： ML8100
 * 檔案說明： Confluent Avro解析策略
 * @CREATE Fri Nov 27 2020 上午7:58:03
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/// <reference types="node" />
import { SchemaRegistry } from '../schema-registry';
import { AvroResolveStrategy } from './avro-resolve.strategy';
/**
 * Confluent Avro解析策略
 */
export declare class ConfluentAvroStrategy implements AvroResolveStrategy {
    /**
     * 進行Avro編碼
     *
     * @method private
     * @param schema   Avro Schema
     * @param schemaId Schema ID
     * @param obj      要進行編碼的資料
     * @return 回傳編碼結果
     */
    private encoded;
    /**
     * 將JSON物件轉Avro
     *
     * @method public
     * @param schemaRegistry Schema Registry
     * @param topic          Topic
     * @param json           JSON物件
     * @return 回傳轉換後的Avro
     */
    toAvro(schemaRegistry: SchemaRegistry, topic: string, json: any | any[]): Promise<Buffer | Buffer[]>;
    /**
     * 從Avro轉JSON物件
     *
     * @method public
     * @param schema Avro Schema
     * @param buffer Avro
     * @return 回傳轉換後的JSON物件
     */
    toJson<T>(schemaRegistry: SchemaRegistry, buffer: Buffer): Promise<T>;
}
