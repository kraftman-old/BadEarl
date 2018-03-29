"use strict";

var util = require("util");

function InputValidatonError(message) {
    Error.captureStackTrace(this, this.constructor);
    this.name    = this.constructor.name;
    this.message = message;
}

util.inherits(InputValidatonError, Error);

module.exports = InputValidatonError;