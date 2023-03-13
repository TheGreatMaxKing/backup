const config = require('../config.json');
const AvroHelper = require('./avro-helper');
const SchemaRegistryManager = require('./schema-registry-manager');
const { ConsumerGroup } = require('kafka-node');
const {
    schemaHost,
    kafkaHost,
    clientId,
    kafkaUsername,
    kafkaPassword,
    requestKafkaTopic
} = config.kafka2;

const schemaRegistry = new SchemaRegistryManager(schemaHost);

// Consumer設置項目
const consumerOptions = {
    kafkaHost: kafkaHost,
    clientId: clientId,
    groupId: 'reqConsumer_KafkaJS' + clientId,
    sessionTimeout: 15000,
    fromOffset: 'latest',
    outOfRangeOffset: 'latest',
    encoding: 'buffer',
    sasl: {
        mechanism: 'plain',
        username: kafkaUsername,
        password: kafkaPassword
    }
};

// 產生Consumer實例
const consumer = new ConsumerGroup(consumerOptions, [
    requestKafkaTopic.testtopic
]);

async function consumerFromKafka2(callback) {
    consumer.on('message', async function (message) {
        console.log(`Consume Kafka Message`, message);
        if (message === null || message === undefined) return;

        const schemaId = message.value.readUInt32BE(1);
        // console.log(schemaId);
        const res = await schemaRegistry.getSchemaById(schemaId);
        const schema = JSON.parse(res.schema);
        // console.log(schema);
        message.value = await AvroHelper.fromAvro(schema, message.value.slice(5));
        // // 对messages进行处理
        callback(message.value)
    });
}

// consumerFromKafka2((message)=>{
//     console.log(message);
// })

module.exports = {
    consumerFromKafka2
};