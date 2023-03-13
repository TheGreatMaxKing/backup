/**
 * 專案名稱： @wisrtoni40/confluent-schema
 * 部門代號： ML8100
 * 檔案說明： Schema假資料
 * @CREATE Fri Jan 29 2021 下午1:54:08
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

/**
 * Schema假資料
 */
export const SCHEMA = `{
  "type": "record",
  "name": "test",
  "namespace": "namespace",
  "fields": [
    {
      "name": "param1",
      "type": ["string"],
      "doc": "param1"
    }
  ]
}`;

/**
 * Schema Model假資料
 */
export const SCHEMA_MODEL = {
  version: 1,
  id: 1,
  subject: 'testing.topic-value',
  schema: SCHEMA,
};

/**
 * 要轉換Buffer的假資料
 */
export const JSON_TO_BUFF = { param1: 'test' };

/**
 * 透過Avro轉換成的Buffer假資料
 */
export const BUFF_FROM_AVRO = Buffer.from([
  0x00,
  0x00,
  0x00,
  0x00,
  0x01,
  0x00,
  0x08,
  0x74,
  0x65,
  0x73,
  0x74,
]);
