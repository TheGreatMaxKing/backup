'use strict';

const config = require('../config.json');
const { KafkaClient, Producer } = require("kafka-node");
const SchemaRegistryManager = require('./schema-registry-manager');
const AvroHelper = require('./avro-helper');
const {
    schemaHost,
    kafkaHost,
    clientId,
    kafkaUsername,
    kafkaPassword
} = config.kafka2;

const schemaRegistry = new SchemaRegistryManager(schemaHost);

const clientOptions = {
    kafkaHost: kafkaHost,
    clientId: clientId,
    connectTimeout: 10000,
    requestTimeout: 30000,
    autoConnect: true,
    connectRetryOptions: {
        retries: 5,
        factor: 0,
        minTimeout: 1000,
        maxTimeout: 1000,
        randomize: false,
    },
    idleConnection: 5 * 60 * 1000,
    maxAsyncRequests: 10,
    sasl: {
        mechanism: 'plain',
        username: kafkaUsername,
        password: kafkaPassword
    }
}
const client = new KafkaClient(clientOptions);
const producerOption = {
    requireAcks: 1,
    ackTimeoutMs: 100,
    partitionerType: 2, //默认为第一个分区
};
const producer = new Producer(client, producerOption);

producer.on('ready', () => {
    console.log('Kafka Producer Ready!');
});

producer.on('error', (err) => {
    console.log('Kafka Producer Error!', err);
});

async function sendToKafka2(topic,messages) {
    let payloads = [];
    const schemaId = await schemaRegistry.getLatestSchemaId(topic);
    const res = await schemaRegistry.getSchemaById(schemaId);
    const schema = JSON.parse(res.schema);
    messages.map((item)=>{
        let msg=AvroHelper.toAvro(schemaId,schema,item);
        payloads.push({topic,messages:msg})
    })
    console.log(payloads);
    producer.send(payloads, (err, data) => {
        if (err) {
            console.log('publish fail', err);
        }
        console.log('publish success', data);
    });
}

module.exports = {
    sendToKafka2
};