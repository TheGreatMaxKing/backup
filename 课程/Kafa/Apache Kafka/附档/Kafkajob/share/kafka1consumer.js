'use strict';

const config = require('../config.json');
const { ConsumerGroup } = require('kafka-node');
const {
  requestKafkaTopic,
  kafkaHost,
  clientId,
} = config.kafka1;

// Consumer配置项
const consumerOptions = {
  kafkaHost: kafkaHost,
  clientId: clientId,
  groupId: 'reqConsumer_KafkaJS' + clientId,
  sessionTimeout: 15000,
  fromOffset: 'earliest',
  outOfRangeOffset: 'latest',
};

// 產生Consumer實例
const consumer = new ConsumerGroup(consumerOptions, [
  requestKafkaTopic.testtopic
  ]);

consumer.on('error',function(err){
  console.log('consumer err:',err)
});

async function consumerFromKafka1(callback) {
  
  consumer.on('message', async (message)=> {
    // console.log(`Consume Kafka Message`, message);
    if (message === null || message === undefined) return;
    // 对messages进行处理
    callback(message);
  });
}

module.exports = {
  consumerFromKafka1
};