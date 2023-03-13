const config = require('./config.json');

// publish kafka1.0
// const { sendToKafka1 } = require('./share/kafka1sender');
// const { publishKafkaTopic } = config.kafka1;
// let messages = []
// setTimeout(()=>{
//     // console.log(new Date().toLocaleString());
//     let msg = {
//         date:new Date().toLocaleString(),
//         publishBy:"job"
//     }
//     messages.push({
//         topic: publishKafkaTopic.testtopic,
//         messages: JSON.stringify(msg),
//         key: 'testtopic',
//         // partition:0
//     })
//     sendToKafka1(messages)
// },5000)

// consumer kafka1.0
// const { consumerFromKafka1 } = require('./share/kafka1consumer');
// consumerFromKafka1((message)=>{
//     console.log('Kafka1 messages ',message);
// });

// publish kafka2.0
const { sendToKafka2 } = require('./share/kafka2sender')
const { publishKafkaTopic } = config.kafka2;
let messages=[
    {
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
    }
]

setTimeout(()=>{
    // console.log(messages);
    sendToKafka2(publishKafkaTopic.testtopic,messages)
},5000);

// consumer kafka2.0
const { consumerFromKafka2 } = require('./share/kafka2consumer')
consumerFromKafka2((message)=>{
    console.log(message);
})