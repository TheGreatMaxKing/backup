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

import { AvroResolveStrategy } from './../../avro';
import { SchemaRegistry } from './../../schema-registry';
import { ProducerResolveStrategy } from './producer-resolve.strategy';

/**
 * Kafka2.0 Producer資料解析策略
 */
export class ConfluentPubResolveStrategy extends ProducerResolveStrategy {
  /**
   * @param schemaRegistry Schema Registry
   * @param avroResolver   Avro解析策略
   * @param destination    發送資料的目的地
   */
  constructor(
    private readonly schemaRegistry: SchemaRegistry,
    private readonly avroResolver: AvroResolveStrategy,
    public destination: string,
  ) {
    super(destination);
  }

  /**
   * 進行Avro編碼
   *
   * @method private
   * @param message 要編碼的數據
   * @return 回傳編碼結果
   */
  private async encoded(
    message: any | any[],
  ): Promise<Buffer | Buffer[] | Error> {
    try {
      const schemaRegistry = this.schemaRegistry;
      const result = await this.avroResolver.toAvro(
        schemaRegistry,
        this.destination,
        message,
      );
      return result;
    } catch (error) {
      console.error(error);
      return error as Error;
    }
  }

  /**
   * 解析資料
   *
   * @method public
   * @param input 解析前的資料
   * @return 回傳解析後的資料
   */
  public async resolve(input: any | any[]): Promise<Buffer | Buffer[] | Error> {
    try {
      const avroMessage = await this.encoded(input);
      return avroMessage;
    } catch (error) {
      console.error(error);
      return error as Error;
    }
  }
}
