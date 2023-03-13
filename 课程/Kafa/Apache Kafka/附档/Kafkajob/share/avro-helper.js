'use strict';

const avro = require('avsc');

module.exports = {

    toAvro: (schemaId, schema, obj) => {
        let type = avro.Type.forSchema(schema);
        let buf = type.toBuffer(obj);
        let result = Buffer.alloc(buf.length + 5);

        result.writeUInt8(0, 1);
        //result.writeUInt8(0);
        result.writeUInt32BE(schemaId, 1);
        buf.copy(result, 5);
        return result;
    },

    fromAvro: (schema, obj) => {
        // console.log('fromAvroSchema:', schema);
        let type = avro.Type.forSchema(schema);
        let value = type.fromBuffer(obj);
        return value;
    }
};
