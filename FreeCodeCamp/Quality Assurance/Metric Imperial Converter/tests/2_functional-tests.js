const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Convert 10L to gal", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert")
      .query({ input: "10L" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        assert.approximately(res.body.returnNum, 2.64172, 0.1);
        assert.equal(res.body.returnUnit, "gal");
        assert.equal(res.body.string, "10 liters converts to 2.64172 gallons");
        done();
      });
  });

  test("Convert 32g (INVALID UNIT)", function (done) { // Fixed: Removed comma
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert")
      .query({ input: "32g" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, "invalid unit");
        done();
      });
  });

  test("Convert 3/7.2/4kg (INVALID NUMBER)", function (done) { // Fixed: Removed comma
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert")
      .query({ input: "3/7.2/4kg" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, "invalid number");
        done();
      });
  });

  test("Convert 3/7.2/4kilomegagram (INVALID NUMBER AND UNIT)", function (done) { // Fixed: Removed comma
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert")
      .query({ input: "3/7.2/4kilomegagram" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, "invalid number and unit");
        done();
      });
  });

  test("Convert with no number", function (done) { // Fixed: Removed comma
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert")
      .query({ input: "kg" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        done();
      });
  });
});