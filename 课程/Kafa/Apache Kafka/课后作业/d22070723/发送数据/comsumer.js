var kafka_node_1 = require("kafka-node");
var uuid_1 = require("uuid");
var wisrtoni40_confluent_schema_1 = require("wisrtoni40-confluent-schema");

var kafkaHost = 'datdata01.wks.wistron.com.cn:9193,datdata02.wks.wistron.com.cn:9193,datdata03.wks.wistron.com.cn:9193';
var topic = 'wcd.cim.mtct.fms';
var registryHost = 'http://datdata01.wks.wistron.com.cn:8585';


var consumer = new kafka_node_1.ConsumerGroup({
  kafkaHost: kafkaHost,
  groupId: (0, uuid_1.v4)(),
  sessionTimeout: 15000,
  protocol: ['roundrobin'],
  encoding: 'buffer',
  fromOffset: 'latest',
  outOfRangeOffset: 'latest',
  sasl: {
    mechanism: 'plain',
    username: 'wcd.cim',
    password: '3MuS%q2021',
  }
}, topic);



var schemaRegistry = new wisrtoni40_confluent_schema_1.ConfluentMultiRegistry(registryHost);
var avro = new wisrtoni40_confluent_schema_1.ConfluentAvroStrategy();
var resolver = new wisrtoni40_confluent_schema_1.ConfluentSubResolveStrategy(schemaRegistry, avro);


consumer.on('message', async function (msg) {
  const result = await resolver.resolve(msg.value);
  console.log('consumer',msg.offset);
  console.log(result);
});
