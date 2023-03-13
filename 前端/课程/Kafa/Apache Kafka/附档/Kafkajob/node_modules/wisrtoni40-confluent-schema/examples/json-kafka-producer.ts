/**
 * 專案名稱： @wisrtoni40/confluent-schema
 * 部門代號： ML8100
 * 檔案說明： Confluent Kafka Producer
 * @CREATE Wed Jan 13 2021 下午1:47:20
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { HighLevelProducer, KafkaClient } from 'kafka-node';
import { v4 as uuidv4 } from 'uuid';
import { JsonPubResolveStrategy } from 'wisrtoni40-confluent-schema';

/**
 * -----------------------------------------------------------------------------
 * Config
 * -----------------------------------------------------------------------------
 */

const kafkaHost = 'localhost:9092';
const topic = 'wks.dx.bnft.result2';

/**
 * -----------------------------------------------------------------------------
 * Kafka Client and Producer
 * -----------------------------------------------------------------------------
 */

const kafkaClient = new KafkaClient({
  kafkaHost,
  clientId: uuidv4(),
  connectTimeout: 60000,
  requestTimeout: 60000,
  connectRetryOptions: {
    retries: 5,
    factor: 0,
    minTimeout: 1000,
    maxTimeout: 1000,
    randomize: false,
  },
});

const producer = new HighLevelProducer(kafkaClient, {
  requireAcks: 1,
  ackTimeoutMs: 100,
});

/**
 * -----------------------------------------------------------------------------
 * JSON Resolver
 * -----------------------------------------------------------------------------
 */

const resolver = new JsonPubResolveStrategy();

/**
 * -----------------------------------------------------------------------------
 * Produce
 * -----------------------------------------------------------------------------
 */

(async () => {
  const data = {
    evt_dt: 1660924800000,
    site: 'WKS',
    plant: 'F232',
    plant_name: 'WKS-5',
    pillar: 'dpm',
    system_id: 'aecc',
    index_type_id: 'direct',
    kpi_id: 'idl_cost',
    value: 100,
    unit: 'RMB',
    amount: 1000,
    currency: 'RMB',
    params: [
      {
        name: 'idl_pay',
        value: 100,
        type: 'VAR',
      },
      {
        name: 'idl_hr',
        value: 10,
        type: 'CONST',
      },
    ],
  };
  const processedData = await resolver.resolve(data);
  producer.send(
    [
      {
        topic,
        messages: processedData,
        key: '1660924800000.WKS.F232.dpm.aecc.idl_cost',
      },
    ],
    (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
      }
    },
  );
})();
