/*
 * A RESTful route template.
 */

var router = require('express').Router()
  , model_tag = require('../../models/Tag')
  , Q = require('q')
  ;

// List
router.get('/', function(req, res) {
  model_tag.index()
  .then(function(items) {
    res.json(items);
  })
  .done();
});

// Retrieve
router.get('/:id', function(req, res) {
  var id = req.params.id;
  res.end('RETRIEVE ' + id);
});

// Create
router.post('/', function(req, res) {
  model_tag
  .updateOrCreate(req.body)
  .then(function(item) {
    res.json(item);
  })
  .done()
});

router.post('/bulk', function(req, res) {
  var promises = [];
  for (var i=0; i<req.body.length; i++) {
    promises.push(model_tag.updateOrCreate(req.body[i]))
  }

  Q
  .allSettled(promises)
  .then(function(result) {
    res.json(result);
  })
  .done()
});

module.exports = router;