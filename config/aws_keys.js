if (process.env.NODE_ENV === 'production') {
  module.exports = require('./aws_keys_prod');
} else {
  module.exports = require('./aws_keys_dev');
}
