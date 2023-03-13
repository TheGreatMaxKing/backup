/**
 * 專案名稱： @wisrtoni40/confluent-schema
 * 部門代號： ML8100
 * 檔案說明： Confluent Kafka Consumer
 * @CREATE Wed Jan 13 2021 下午1:21:40
 * @author Steve Y Lin
 * @contact Steve_Y_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { ConsumerGroup } from 'kafka-node';
import { v4 as uuidv4 } from 'uuid';
import { JsonSubResolveStrategy } from 'wisrtoni40-confluent-schema';

/**
 * -----------------------------------------------------------------------------
 * Config
 * -----------------------------------------------------------------------------
 */

const kafkaHost = 'localhost:9092';
const topic = 'wks.dx.bnft.result2';

/**
 * -----------------------------------------------------------------------------
 * Kafka Consumer
 * -----------------------------------------------------------------------------
 */

const consumer = new ConsumerGroup(
  {
    kafkaHost,
    groupId: uuidv4(),
    sessionTimeout: 15000,
    protocol: ['roundrobin'],
    encoding: 'buffer',
    fromOffset: 'latest',
    outOfRangeOffset: 'latest',
  },
  topic,
);

/**
 * -----------------------------------------------------------------------------
 * JSON Resolver
 * -----------------------------------------------------------------------------
 */

const resolver = new JsonSubResolveStrategy();

/**
 * -----------------------------------------------------------------------------
 * Consume
 * -----------------------------------------------------------------------------
 */

consumer.on('message', async msg => {
  const result = await resolver.resolve(msg.value as string);
  console.log(msg.offset);
  console.log(result);
});
