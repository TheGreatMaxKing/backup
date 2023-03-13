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
import {
  ConfluentAvroStrategy,
  ConfluentMultiRegistry,
  ConfluentPubResolveStrategy,
} from 'wisrtoni40-confluent-schema';

/**
 * -----------------------------------------------------------------------------
 * Config
 * -----------------------------------------------------------------------------
 */

const kafkaHost = 'localhost:9193,localhost:9193,localhost:9193';
const topic = 'input.your.topic';
const registryHost =
  'http://localhost:8585,http://localhost:8585,http://localhost:8585';

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
  sasl: {
    mechanism: 'plain',
    username: 'username',
    password: 'password',
  },
});

const producer = new HighLevelProducer(kafkaClient, {
  requireAcks: 1,
  ackTimeoutMs: 100,
});

/**
 * -----------------------------------------------------------------------------
 * Confluent Resolver
 * -----------------------------------------------------------------------------
 */

const schemaRegistry = new ConfluentMultiRegistry(registryHost);
const avro = new ConfluentAvroStrategy();
const resolver = new ConfluentPubResolveStrategy(schemaRegistry, avro, topic);

/**
 * -----------------------------------------------------------------------------
 * Produce
 * -----------------------------------------------------------------------------
 */

(async () => {
  const data = {
    params1: 100,
    params2: 'param2',
  };
  const processedData = await resolver.resolve(data);
  producer.send([{ topic, messages: processedData }], (error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log(result);
    }
  });
})();
