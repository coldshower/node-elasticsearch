const elasticsearch = require('elasticsearch');

const esClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error'
});

const search = function (index, body) {
  return esClient.search({
    index: index,
    body: body
  });
};

const test = function () {
  let body = {
    size: 5,
    from: 0,
    query: {
      bool: {
        must: [
          {
            query_string: {
              query: '(authors.firstname:D* OR authors.lastname:H*) AND (title:excepteur)'
            }
          }
        ],
        should: [
          {
            match: {
              body: {
                query: 'Elit nisi fugiat dolore amet',
                type: 'phrase'
              }
            }
          }
        ],
        must_not: [
          {
            range: {
              year: {
                gte: 1990,
                lte: 2000
              }
            }
          }
        ]
      }
    }
  };

  search('library', body)
  .then(results => {
    console.log(`found ${results.hits.total} items in ${results.took}ms`);
    if (results.hits.total > 0) {
      console.log(`returned article titles:`);
      results.hits.hits.forEach((hit, idx) => {
        console.log(`\t${body.from + ++idx} - ${hit._source.title} (score: ${hit._score})`);
      });
    }
  })
  .catch(console.error);
};

test();