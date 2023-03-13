'use strict';

const request = require('request');

class SchemaRegistryManager {
  constructor(host) {
    this.host = host;
    this.schemaPool = {};
  }

  getSubjectsUrl() {
    return `${this.host}/subjects`;
  }

  getSubjectVersionsUrl(topic) {
    return `${this.getSubjectsUrl()}/${topic}-value/versions`;
  }

  getSubjects() {
    return new Promise((resolve, reject) => {
      request(this.getSubjectsUrl(), (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          if (response.statusCode === 200) {
            resolve(JSON.parse(body));
          } else {
            reject(new Error(JSON.parse(body).message));
          }
        }
      });
    });
  }

  getVersions(topic) {
    return new Promise((resolve, reject) => {
      request(this.getSubjectVersionsUrl(topic), (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          if (response.statusCode === 200) {
            resolve(JSON.parse(body));
          } else {
            reject(new Error(JSON.parse(body).message));
          }
        }
      });
    });
  }

  getSchema(topic, version) {
    return new Promise((resolve, reject) => {
      let schemas = Object.values(this.schemaPool);
      let target = schemas.filter(x => x.subject === `${topic}-value` && x.version === version);
      if (target.length > 0) {
        resolve(target[0]);
      } else {
        request(`${this.getSubjectVersionsUrl(topic)}/${version}`, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            if (response.statusCode === 200) {
              let result = JSON.parse(body);
              this.schemaPool[result.id] = result;
              resolve(result);
            } else {
              reject(new Error(JSON.parse(body).message));
            }
          }
        });
      }
    });
  }

  getLatestSchema(topic) {
    return new Promise((resolve, reject) => {
      this.getVersions(topic)
        .then(versions => {
          this.getSchema(topic, Math.max(...versions))
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    });
  }

  getSchemaById(id) {
    return new Promise((resolve, reject) => {
      request(`${this.host}/schemas/ids/${id}`, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          if (response.statusCode === 200) {
            let result = JSON.parse(body);
            resolve(result);
          } else {
            reject(new Error(JSON.parse(body).message));
          }
        }
      });
    });
  }

  getLatestSchemaId(topic) {
    return new Promise((resolve, reject) => {
      this.getLatestSchema(topic)
        .then((result) => resolve(result.id))
        .catch(reject);
    });
  }
}

module.exports = SchemaRegistryManager;
