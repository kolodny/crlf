var fs = require('fs');
var transformFile = require('transform-file');

exports.get = get;
exports.set = set;

function get(fileLocation, _, callback) {
  fs.exists(fileLocation, function(exists) {
    if (!exists) {
      return callback(new Error(fileLocation + ': No such file or directory'));
    }

    var reader = fs.createReadStream(fileLocation);
    var ran = false;
    reader.on('data', function(buffer) {
      if (!ran) {
        var matched = buffer.toString().match(/\r\n|\r|\n/);
        var returned = {
          '\r': 'CR',
          '\n': 'LF',
          '\r\n': 'CRLF',
        }[matched];
        if (matched) {
          ran = true;
          reader.destroy();
          callback(null, returned);
        }
      }
    });
    reader.on('end', function(buffer) {
      if (!ran) {
        ran = true;
        callback(null, 'NA');
      }
    });
  });
}

function set(fileLocation, endingType, callback) {
  get(fileLocation, null, function(err, currentEndingType) {
    if (err) {
      return callback(err);
    }
    if (currentEndingType === endingType) {

      // early success
      return callback(null, currentEndingType);
    }
    if (currentEndingType === 'NA') {
      return callback(null, 'NA');
    }
    var matcher = {
      CR: /\r/g,
      LF: /\n/g,
      CRLF: /\r\n/g,
    }[currentEndingType];
    var endingTypeStr = {
      CR: '\r',
      LF: '\n',
      CRLF: '\r\n',
    }[endingType]
    transformFile(fileLocation, function(buffer) {
      return buffer.toString().replace(matcher, endingTypeStr)
    }, function(err) {
      callback(err, currentEndingType);
    })
  });
}
