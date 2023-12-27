const ApiError = require('../exceptions/api-error');
const errorsNames = require('../exceptions/errors-names');
module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: errorsNames.unexpected });
};
