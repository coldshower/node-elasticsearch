const elasticsearch = require('elasticsearch');

const esClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error'
});

const indices = function () {
  return esClient.cat.indices({ v: true })
  .then(console.log)
  .catch(err => console.err('Error connecting to the es client: ' + err));
}

const test = function () {
  console.log('elasticsearch indices info');
  indices();
}

test();