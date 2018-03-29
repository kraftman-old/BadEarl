

module.exports = function(err, req, res, next) {
    console.error(err);
    res.status(500)
    .json({
        error: {
            status: 500,
            mesage: 'Internal server error',
        }
    })
}