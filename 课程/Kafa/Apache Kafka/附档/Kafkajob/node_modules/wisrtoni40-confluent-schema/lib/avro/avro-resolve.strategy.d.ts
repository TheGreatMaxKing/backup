/**
 * 專案名稱： @wisrtoni40/confluent-schema
 * 部門代號： ML8100
 * 檔案說明： 抽象Avro解析策略
 * @CREATE Fri Nov 27 2020 上午7:55:03
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
/// <reference types="node" />
import { SchemaRegistry } from '../schema-registry';
/**
 * 抽象Avro解析策略
 */
export interface AvroResolveStrategy {
    /**
     * 將JSON物件轉Avro
     *
     * @method public
     * @param schemaRegistry Schema Registry
     * @param topic          Topic
     * @param json           JSON物件
     * @return 回傳轉換後的Avro
     */
    toAvro(schemaRegistry: SchemaRegistry, topic: string, json: any): Promise<Buffer | Buffer[]>;
    /**
     * 從Avro轉JSON物件
     *
     * @method public
     * @param schemaRegistry Schema Registry
     * @param buffer         Avro
     * @return 回傳轉換後的JSON物件
     */
    toJson<T>(schemaRegistry: SchemaRegistry, buffer: Buffer): Promise<T>;
}
