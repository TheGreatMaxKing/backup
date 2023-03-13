/**
 * 專案名稱： @wisrtoni40/confluent-schema
 * 部門代號： ML8100
 * 檔案說明： Confluent Avro解析策略單元測試
 * @CREATE Fri Jan 29 2021 下午1:26:38
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import * as should from 'should';
import { ConfluentAvroStrategy, ConfluentMultiRegistry } from './../../src';
import { BUFF_FROM_AVRO, JSON_TO_BUFF, SCHEMA_MODEL } from './../mock';
import { createStubInstance } from './../sinon';

/**
 * Confluent Avro解析策略單元測試
 */
describe('ConfluentAvroStrategy', () => {
  /**
   * Confluent Avro解析策略
   */
  const strategy = new ConfluentAvroStrategy();

  /**
   * 測試將JSON物件轉Avro
   */
  it('toAvro: convert json to confluent avro', async () => {
    // Arrange
    const schemaRegistry = createStubInstance(ConfluentMultiRegistry);
    const topic = 'testing.topic';
    const schemaId = 1;
    const content = JSON_TO_BUFF;
    const expect = BUFF_FROM_AVRO;

    schemaRegistry.stubs.getLatestSchemaId
      .withArgs(topic)
      .returns(Promise.resolve(schemaId));
    schemaRegistry.stubs.getSchemaById
      .withArgs(schemaId)
      .returns(Promise.resolve(SCHEMA_MODEL));

    // Act
    const result = (await strategy.toAvro(
      schemaRegistry,
      topic,
      content
    )) as Buffer;

    // Assert
    should(Buffer.compare(result, expect)).be.equal(0);
  });

  /**
   * 測試從Avro轉JSON物件
   */
  it('toJson: convert confluent avro to json', async () => {
    // Arrange
    const schemaRegistry = createStubInstance(ConfluentMultiRegistry);
    const schemaId = 1;
    const buffer = BUFF_FROM_AVRO;
    const expect = JSON_TO_BUFF;

    schemaRegistry.stubs.getSchemaById
      .withArgs(schemaId)
      .returns(Promise.resolve(SCHEMA_MODEL));

    // Act
    const result = await strategy.toJson(schemaRegistry, buffer);

    // Assert
    should(result).containDeep(expect);
  });
});
