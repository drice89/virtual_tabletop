const Validator = require('validator');

module.exports = function validatePiece(data) {
    let errors = {};

    if (Validator.isEmpty(data.imageUrl)) {
        errors.imageUrl = 'Piece must have an image url.';
    }


    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };

};