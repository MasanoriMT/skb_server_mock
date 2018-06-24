var express = require('express');
var router = express.Router();
var xml2js = require('xml2js');
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  res.header('Content-Type', 'text/xml');
  res.end(mockXml());
});

router.post('/hoge', function(req, res, next) {
  fs.readFile('routes/response.xml',
    function(err, file) {
      console.log(err);
      res.header('Content-Type', 'text/xml');
      res.end(file);
  });
});

function mockXml() {
  var obj = {
    "hoge": {
        "foo": [ 1, null ],
        "baz": {
          "foo": [ true, "bar" ],
          "baz": "qux"
        }
    }
  }
  var opt =  {
      "headless": true
  }

  var builder = new xml2js.Builder(opt);
  return builder.buildObject(obj);
}

module.exports = router;
