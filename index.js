if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/notify.common.min.js'); // eslint-disable-line
} else {
  module.exports = require('./dist/notify.common.js'); // eslint-disable-line
}
