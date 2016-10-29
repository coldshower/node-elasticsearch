const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error'
});

const search = function (index, body) {
  return esClient.search({ index: index, body: body });
};

const test = function () {
  let body = {
    size: 20,
    from: 0,
    query: {
      match: {
        title: {
          query: 'Quist partiatur asdefsdaf safafevve asfddfaeew',
        }
      }
    }
  }

  search('library', body)
  .then(results => {
    console.log(results)
  })
  .catch(console.error);
};

test();

