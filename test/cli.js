var exec = require('child_process').exec;
var assert = require('assert');
var fs = require('fs');

var fileLocation = __dirname + '/file.txt';

describe('crlf', function() {
  var lines = ['this', 'is', 'a', 'test'];
  var cleanup = function() {
    if (fs.existsSync(fileLocation)) {
      fs.unlinkSync(fileLocation);
    }
  };
  beforeEach(cleanup);
  afterEach(cleanup);

  describe('getting', function() {
    it('can check line ending settings', function(done) {
      fs.writeFileSync(fileLocation, lines.join('\n'));
      exec('node ' + __dirname + '/../bin/crlf ' + fileLocation, function(err, stdout) {
        stdout = stdout.trim();
        assert(/^LF .*\/file.txt$/.test(stdout));
        done();
      });
    });

  });

  describe('setting', function() {

    it('can set line ending settings', function(done) {
      fs.writeFileSync(fileLocation, lines.join('\n'));
      exec('node ' + __dirname + '/../bin/crlf --set=CRLF ' + fileLocation, function(err, stdout) {
        var fileContents = fs.readFileSync(fileLocation).toString();
        stdout = stdout.trim();
        assert.equal(fileContents, lines.join('\r\n'));
        assert(/^LF .*\/file.txt -> CRLF$/.test(stdout));
        done();
      });
    });

  });


});
