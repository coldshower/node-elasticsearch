const elasticsearch = require('elasticsearch');
const fs = require('fs');

const esClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error'
});

const bulkIndex = function (index, type, data) {
  let bulkBody = [];

  data.forEach(item => {
    bulkBody.push({
      index: {
        _index: index,
        _type: type,
        _id: item.id
      }
    });

    bulkBody.push(item);
  });

  esClient.bulk({ body: bulkBody })
  .then(res => {
    console.log('here');
    let errorCount = 0;
    res.items.forEach(item => {
      if (item.index && item.index.error) {
        errorCount += 1;
        console.log(errorCount, item.index.error);
      }
    });
   
   console.log('Successfully indexed ' + (data.length - errorCount) + ' out of ' + data.length + ' items.');

  })
  .catch(console.error);
}

const test = function () {
  const articlesRaw = fs.readFileSync('./data.json');
  const articles = JSON.parse(articlesRaw);
  bulkIndex('library', 'article', articles);
}

test();