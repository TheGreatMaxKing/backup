# wisrtoni40-confluent-schema

# Install

```
npm i wisrtoni40-confluent-schema --save
```

# Table of Contents

- [Quickstart](#Quickstart)
- [Feature](#Feature)
- [API](#API)
  - [ConfluentMultiRegistry](#ConfluentMultiRegistry)
  - [ConfluentAvroStrategy](#ConfluentAvroStrategy)
  - [ConfluentSubResolveStrategy](#ConfluentSubResolveStrategy)
  - [ConfluentPubResolveStrategy](#ConfluentPubResolveStrategy)

# Quickstart

## Consumer

[Full Example](https://github.com/SteveLin100132/-wisrtoni40-confluent-schema/blob/master/examples/confluent-kafka-consumer.ts)

```typescript
import {
  ConfluentAvroStrategy,
  ConfluentMultiRegistry,
  ConfluentSubResolveStrategy,
} from 'wisrtoni40-confluent-schema';

const registryHost = 'http://localhost:8585,http://localhost:8585,http://localhost:8585';

const schemaRegistry = new ConfluentMultiRegistry(registryHost);
const avro = new ConfluentAvroStrategy();
const resolver = new ConfluentSubResolveStrategy(schemaRegistry, avro);

const data = new Buffer();
resolver.resolve(data).then(val => console.log(val));
```

## Producer

[Full Example](https://github.com/SteveLin100132/-wisrtoni40-confluent-schema/blob/master/examples/confluent-kafka-producer.ts)

```typescript
import {
  ConfluentAvroStrategy,
  ConfluentMultiRegistry,
  ConfluentPubResolveStrategy,
} from 'wisrtoni40-confluent-schema';

const registryHost = 'http://localhost:8585,http://localhost:8585,http://localhost:8585';
const topic = 'testing.topic'

const schemaRegistry = new ConfluentMultiRegistry(registryHost);
const avro = new ConfluentAvroStrategy();
const resolver = new ConfluentPubResolveStrategy(schemaRegistry, avro, topic);

const data = { name: 'name', age: 18 };
resolver.resolve(data).then(buf => console.log(buf));
```

# Feature

* 提供多個Brokers的Confluent Avro Schema解析API

# API

## **ConfluentMultiRegistry**

**Class implements SchemaRegistry**，多個Brokers的Confluent Schema Registry

### constructor

ConfluentMultiRegistry的建構值

Parameter | Type | Required | Default | Description
|:-----|:-----:|:-----:|:-----:|:-----|
| host | string | Required | ```undefined``` | Brokers Host 多筆可用```,```隔開，如: 'http://localhost:8585,http://localhost:8585,http://localhost:8585' |

## **ConfluentAvroStrategy**

**Class implements AvroResolveStrategy**，Confluent Avro Schema的解析策略

## **ConfluentSubResolveStrategy**

**Class implements ConsumerResolveStrategy**，Confluent Schema Consumer的解析器

### constructor

ConfluentSubResolveStrategy的建構值

Parameter | Type | Required | Default | Description
|:-----|:-----:|:-----:|:-----:|:-----|
| schemaRegistry | SchemaRegistry | Required | ```undefined``` | Schema Registry |
| avroResolver | AvroResolveStrategy | Required | ```undefined``` | Avro解析策略 |

### Methods

#### resolve

將Avro資料解析成特定JSON格式

Parameter | Type | Required | Default | Description
|:-----|:-----:|:-----:|:-----:|:-----|
| input | string &#124; Buffer | Required | ```undefined``` | 要解析的資料 |
| returns | Promise&lt;T&gt; | Required | ```undefined``` | 回傳解析後的資料 |

## **ConfluentPubResolveStrategy**

**Class implements ProducerResolveStrategy**，Confluent Schema Producer的解析器

### constructor

ConfluentPubResolveStrategy的建構值

Parameter | Type | Required | Default | Description
|:-----|:-----:|:-----:|:-----:|:-----|
| schemaRegistry | SchemaRegistry | Required | ```undefined``` | Schema Registry |
| avroResolver | AvroResolveStrategy | Required | ```undefined``` | Avro解析策略 |
| destination | string | Required | ```undefined``` | 發送資料的目的地 |

#### resolve

將特定JSON資料解析成Avro

Parameter | Type | Required | Default | Description
|:-----|:-----:|:-----:|:-----:|:-----|
| input | any &#124; any[] | Required | ```undefined``` | 要解析的資料 |
| returns | Promise&lt;Buffer &#124; Buffer[]&gt; | Required | ```undefined``` | 回傳解析後的Avro |