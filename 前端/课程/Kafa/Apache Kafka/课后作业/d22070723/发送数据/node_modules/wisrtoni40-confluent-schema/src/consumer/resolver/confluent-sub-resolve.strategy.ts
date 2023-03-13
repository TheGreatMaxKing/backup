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

import { AvroResolveStrategy } from '../../avro/avro-resolve.strategy';
import { SchemaRegistry } from '../../schema-registry';
import { ConsumerResolveStrategy } from './consumer-resolve.strategy';

/**
 * Confluent Avro資料解析策略
 */
export class ConfluentSubResolveStrategy implements ConsumerResolveStrategy {
  /**
   * @param schemaRegistry Schema Registry
   * @param avroResolver   Avro解析策略
   */
  constructor(
    private readonly schemaRegistry: SchemaRegistry,
    private readonly avroResolver: AvroResolveStrategy
  ) {}

  /**
   * 解析Avro編碼
   *
   * @method private
   * @param message 要解析的數據
   * @return 回傳解析結果
   */
  private async decoded<T>(message: Buffer): Promise<T> {
    const schemaRegistry = this.schemaRegistry;
    const result = await this.avroResolver.toJson<T>(schemaRegistry, message);
    return result;
  }

  /**
   * 解析資料
   *
   * @method public
   * @param input 解析前的資料
   * @return 回傳解析後的資料
   */
  public async resolve<T>(input: string | Buffer): Promise<T | undefined> {
    if (typeof input !== 'string') {
      try {
        return await this.decoded<T>(input);
      } catch (error) {
        return undefined;
      }
    } else {
      return undefined;
    }
  }
}
