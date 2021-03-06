/**!
 * cnpmjs.org - test/controllers/registry/package/download.test.js
 *
 * Copyright(c) fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

'use strict';

/**
 * Module dependencies.
 */

var request = require('supertest');
var app = require('../../../../servers/registry');
var utils = require('../../../utils');

describe('controllers/registry/package/download.test.js', function () {
  before(function (done) {
    var pkg = utils.getPackage('@cnpmtest/download-test-module', '1.0.0', utils.admin);
    request(app.listen())
    .put('/' + pkg.name)
    .set('authorization', utils.adminAuth)
    .send(pkg)
    .expect(201, done);
  });

  describe('GET /:name/download/:filename', function () {
    it('should download a file with 200', function (done) {
      request(app.listen())
      .get('/@cnpmtest/download-test-module/download/@cnpmtest/download-test-module-1.0.0.tgz')
      .expect(200, done);
    });

    it('should alias /:name/-/:filename to /:name/download/:filename', function (done) {
      request(app.listen())
      .get('/@cnpmtest/download-test-module/-/@cnpmtest/download-test-module-1.0.0.tgz')
      .expect(200, done);
    });

    it('should 404 when package not exists', function (done) {
      request(app.listen())
      .get('/@cnpmtest/download-test-module-not-exists/download/@cnpmtest/download-test-module-not-exists-1.0.0.tgz')
      .expect(404, done);
    });
  });
});
