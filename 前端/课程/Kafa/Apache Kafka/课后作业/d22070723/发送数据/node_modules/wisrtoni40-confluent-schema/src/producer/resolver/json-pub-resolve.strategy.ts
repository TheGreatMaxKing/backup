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

import { ProducerResolveStrategy } from './producer-resolve.strategy';

/**
 * Kafka2.0 Producer資料解析策略
 */
export class JsonPubResolveStrategy extends ProducerResolveStrategy {
  /**
   * 解析資料
   *
   * @method public
   * @param input 解析前的資料
   * @return 回傳解析後的資料
   */
  public async resolve<T = any>(input: T | T[]): Promise<string | string[]> {
    if (Array.isArray(input)) {
      return input.map(item => JSON.stringify(item));
    } else {
      return JSON.stringify(input);
    }
  }
}
