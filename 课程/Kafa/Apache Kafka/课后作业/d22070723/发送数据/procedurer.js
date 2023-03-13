var kafka_node_1 = require("kafka-node");
var uuid_1 = require("uuid");
var wisrtoni40_confluent_schema_1 = require("wisrtoni40-confluent-schema");

var kafkaHost = 'datdata01.wks.wistron.com.cn:9193,datdata02.wks.wistron.com.cn:9193,datdata03.wks.wistron.com.cn:9193';
var topic = 'wcd.cim.mtct.fms';
var registryHost = 'http://datdata01.wks.wistron.com.cn:8585';


const kafkaClient = new kafka_node_1.KafkaClient({
  kafkaHost,
  clientId: (0, uuid_1.v4)(),
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
    username: 'wcd.cim',
    password: '3MuS%q2021',
  },
});

const producer = new kafka_node_1.HighLevelProducer(kafkaClient, {
  requireAcks: 1,
  ackTimeoutMs: 100,
});


const schemaRegistry = new wisrtoni40_confluent_schema_1.ConfluentMultiRegistry(registryHost);
const avro = new wisrtoni40_confluent_schema_1.ConfluentAvroStrategy();
const resolver = new wisrtoni40_confluent_schema_1.ConfluentPubResolveStrategy(schemaRegistry, avro, topic);

let messages={
        "evt_ns": "wcd.cim",
        "evt_tp": "mtct.fms",
        "pubBy": "job.Maxwell_0103",
        "evt_dt": new Date().valueOf(),
        "plant": "F721",
        "line": "ASBA",
        "startdate": 0,
        "enddate": 0,
        "plandate": 1670688000000,
        "lastdate": 1670083200000,
        "lasttype": "M",
        "nextdate": 0
    };


(async () => {
  const data = messages;
  const processedData = await resolver.resolve(data);
  producer.send([{ topic, messages: processedData }], (error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log(result);
    }
  });
})();
