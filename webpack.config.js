const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle1.0.0.js',
    path: path.resolve(__dirname, 'dist'),
  },
};