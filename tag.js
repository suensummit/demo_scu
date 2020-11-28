/*
 * A RESTful route template.
 */

var router = require('express').Router()
  , model_tagss = require('../../models/Tag')
  , model_genre = require('../../models/Genre')
  , model_keyword = require('../../models/Keyword')
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