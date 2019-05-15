const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteToFilePlugin = require('write-to-file-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: ['@babel/polyfill', './lib/index.js'],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      utilities: path.resolve(__dirname, 'lib/utilities/')
    }
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: 'README.md', to: path.resolve(__dirname, 'dist', 'README.md') },
      { from: 'package.json', to: path.resolve(__dirname, 'dist', 'package.json') }
    ]),
    new WriteToFilePlugin({
      filename: path.resolve(__dirname, 'dist', 'index.js'),
      data () {
        const content = fs.readFileSync(path.resolve(__dirname, 'dist', 'index.js'));
        // Add #!/usr/bin/env node to the index.js
        return `#!/usr/bin/env node \n ${content.toString()}`;
      }
    })
  ],
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: '/node_modules/'
  }
};
