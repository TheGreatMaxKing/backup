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

import * as avro from 'avsc';
import { SchemaRegistry } from '../schema-registry';
import { AvroResolveStrategy } from './avro-resolve.strategy';

/**
 * Confluent Avro解析策略
 */
export class ConfluentAvroStrategy implements AvroResolveStrategy {
  /**
   * 進行Avro編碼
   *
   * @method private
   * @param schema   Avro Schema
   * @param schemaId Schema ID
   * @param obj      要進行編碼的資料
   * @return 回傳編碼結果
   */
  private encoded(schema: any, schemaId: number, obj: any): Buffer {
    let buf: Buffer;
    const type = avro.Type.forSchema(schema);
    if (typeof obj === 'string') {
      buf = type.toBuffer(JSON.parse(obj));
    } else {
      buf = type.toBuffer(obj);
    }
    const result = Buffer.alloc(buf.length + 5);
    result.writeUInt8(0, 0);
    result.writeUInt32BE(schemaId, 1);
    buf.copy(result, 5);
    return result;
  }

  /**
   * 將JSON物件轉Avro
   *
   * @method public
   * @param schemaRegistry Schema Registry
   * @param topic          Topic
   * @param json           JSON物件
   * @return 回傳轉換後的Avro
   */
  public async toAvro(
    schemaRegistry: SchemaRegistry,
    topic: string,
    json: any | any[]
  ): Promise<Buffer | Buffer[]> {
    const schemaId = await schemaRegistry.getLatestSchemaId(topic);
    const res = await schemaRegistry.getSchemaById(schemaId);

    if (res) {
      const schema = JSON.parse(res.schema);
      const results: Buffer[] = [];

      if (Array.isArray(json)) {
        json.forEach((obj) => {
          const result = this.encoded(schema, schemaId, obj);
          results.push(result);
        });
        return results;
      } else {
        return this.encoded(schema, schemaId, json);
      }
    } else {
      throw new Error('Avro schema not found');
    }
  }

  /**
   * 從Avro轉JSON物件
   *
   * @method public
   * @param schema Avro Schema
   * @param buffer Avro
   * @return 回傳轉換後的JSON物件
   */
  public async toJson<T>(
    schemaRegistry: SchemaRegistry,
    buffer: Buffer
  ): Promise<T> {
    try {
      if (buffer.readUInt8(0) === 0) {
        const schemaId = buffer.readUInt32BE(1);
        const res = await schemaRegistry.getSchemaById(schemaId);
        if (res) {
          const schema = JSON.parse(res.schema);
          const type = avro.Type.forSchema(schema);
          return type.fromBuffer(buffer.slice(5));
        } else {
          throw new Error('Avro schema not found');
        }
      } else {
        throw new Error(`Not Avro Encoded Message: ${JSON.stringify(buffer)}`);
      }
    } catch (error) {
      return error;
    }
  }
}
