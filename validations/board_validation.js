const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateBoard(data) {
    let errors = {};

    data.name = validText(data.name) ? data.name : '';
    data.backgroundImageUrl = validText(data.backgroundImageUrl) ? data.backgroundImageUrl : '';

    //name validations
    if (!Validator.isLength(data.name, {min:3, max: undefined})) {
        errors.name = 'Game must be a minimum of 3 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Game must have a name';
    }
    //backgroundImageUrl validations
    // if (Validator.isURL(data.backgroundImageUrl),   {protocols: ['http', 'https']}) {
    //     console.log(data.backgroundImageUrl)
    //     errors.backgroundImageUrl = 'Background image must have valid url.';
    // }
    if (Validator.isEmpty(data.backgroundImageUrl)) {
        errors.backgroundImageUrl = 'Background image must to be uploaded.';
    }


    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };

};
