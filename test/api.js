var crlf = require('..');
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

  describe('get()', function() {
    it('can check line ending settings for linux', function(done) {
      fs.writeFileSync(fileLocation, lines.join('\n'));
      crlf.get(fileLocation, null, function(err, ending) {
        assert.equal(ending, 'LF');
        done();
      });
    });

    it('can check line ending settings for old mac os', function(done) {
      fs.writeFileSync(fileLocation, lines.join('\r'));
      crlf.get(fileLocation, null, function(err, ending) {
        assert.equal(ending, 'CR');
        done();
      });
    });

    it('can check line ending settings for linux', function(done) {
      fs.writeFileSync(fileLocation, lines.join('\r\n'));
      crlf.get(fileLocation, null, function(err, ending) {
        assert.equal(ending, 'CRLF');
        done();
      });
    });

    it('can handle files with no newlines', function(done) {
      fs.writeFileSync(fileLocation, lines.join('#'));
      crlf.get(fileLocation, null, function(err, ending) {
        assert.equal(ending, 'NA');
        done();
      });
    });
  });

  describe('set()', function() {

    it('can handle src === dest', function(done) {
      fs.writeFileSync(fileLocation, lines.join('\n'));
      crlf.set(fileLocation, 'LF', function() {
        var fileContents = fs.readFileSync(fileLocation).toString();
        assert.equal(fileContents, lines.join('\n'));
        done();
      });
    });

    it('can handle same size endings', function(done) {
      fs.writeFileSync(fileLocation, lines.join('\r'));
      crlf.set(fileLocation, 'LF', function() {
        var fileContents = fs.readFileSync(fileLocation).toString();
        assert.equal(fileContents, lines.join('\n'));
        done();
      });
    });

    it('can handle smaller endings', function(done) {
      fs.writeFileSync(fileLocation, lines.join('\r\n'));
      crlf.set(fileLocation, 'LF', function() {
        var fileContents = fs.readFileSync(fileLocation).toString();
        assert.equal(fileContents, lines.join('\n'));
        done();
      });
    });

    it('can handle longer endings', function(done) {
      fs.writeFileSync(fileLocation, lines.join('\r'));
      crlf.set(fileLocation, 'CRLF', function() {
        var fileContents = fs.readFileSync(fileLocation).toString();
        assert.equal(fileContents, lines.join('\r\n'));
        done();
      });
    });

  });


});
