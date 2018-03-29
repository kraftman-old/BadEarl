
const InputValidationError = require('../errors/InputValidationError');

module.exports = function(err, req, res, next) {
    console.error(err);
    let status = 500;
    if (err instanceof InputValidationError) {
        status = 400;
    } 
    res.status(status)
    .json({
        error: {
            status: status,
            mesage: 'Internal server error',
        }
    })
}