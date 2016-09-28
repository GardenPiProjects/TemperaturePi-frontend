"use strict";
const MongoClient = require('mongodb').MongoClient;
const chalk = require('chalk');

module.exports = {
  init(app){
    app.get('/', (req, res) => {
      res.render('index.ejs');
    });
    app.get('/data/:limit', (req, res) => {
      MongoClient.connect(process.env.MONGO_URL, function (err, db) {
        if (err) {
          console.log(err);
          res.status(500).send({ error: 'something blew up' });
        }
        const collection = db.collection('data');
        collection.find({}, { sort: { timestamp: -1 }, limit: parseInt(req.params.limit) }).toArray((err, docs) => {
        if (err) {
          console.log(err);
          res.status(500).send({ error: 'something blew up' });
        }
          res.json(docs);
          res.end();
        });
        db.close();
      });
    }).listen(app.get('port'), () => {
      console.log('%s Express server listening on port %d in %s mode.', chalk.green('✓'), app.get('port'), app.get('env'));
    });
  }
}