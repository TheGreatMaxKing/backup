'use strict';

const config = require('../config.json');
const { KafkaClient, Producer } = require("kafka-node");
const {
    kafkaHost,
    clientId,
  } = config.kafka1;

const client = new KafkaClient({
  kafkaHost: kafkaHost,
  clientId: clientId,
  requestTimeout: 30000
});

const producer = new Producer(client);


// producer.on('ready', () => {
//   console.log('Kafka Producer Ready!');
// });

producer.on('error', (err) => {
  console.log('Kafka Producer Error!', err);
});

/**
 * 发送信息至Kafka
 * 
 * @param {array} payloads  信息包阵列
 * 
 * [
 *   {
 *     topic: '',
 *     messages: '',
 *     key: ''
 *   }
 * ]
 */
async function sendToKafka1(payloads) {
  producer.send(payloads, (err, data) => {
    if (err) {
      console.log('publish fail', err);
    }
    console.log('publish success', data);
  });
}

module.exports = {
  sendToKafka1
};