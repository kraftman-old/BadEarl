
const validateParams = require('../../src/middleware/validateurl.js').validateParams;
const assert = require('assert')

const getFakeReq = function() {
    return {
        query: {}
    }
}

const getFakeRes = function() {
    return {
        locals: {},
        status: function() {

        },
        send: function() {

        }
    }
}

const getFakeNext = function() {
    return function(value) {
        this.called = true;
        this.calledWith = value;
    }
}

describe('url validation', function() {
    it('is case insensitive when checking urls', function() {
        const req = getFakeReq();
        const res = getFakeRes();
        const next = getFakeNext();
        req.query.url = 'faKEdomaIN'
        validateParams(req, res, next);
        assert.equal(res.locals.url, req.query.url.toLowerCase());
    })

    // it('checks the url is valid', function() {

    // })

       // https://tools.ietf.org/html/rfc4343
    it('is case insensitive when checking urls', function() {
        const req = getFakeReq();
        const res = getFakeRes();
        let nextCalled = false;
        const next = function() {
            nextCalled = true;
        };
        validateParams(req, res, next);
        assert.ok(nextCalled);

    })

})