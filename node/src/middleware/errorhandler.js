
const InputValidationError = require('../errors/InputValidationError');

module.exports = function(err, req, res, next) {
    console.error(err);
    let status = 500;
    let message = 'Internal server error'
    if (err instanceof InputValidationError) {
        status = 400;
        message = err
    } 
    res.status(status)
    .json({
        error: {
            status: status,
            mesage: message,
        }
    })
}