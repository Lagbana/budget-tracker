const WebpackPwaManifest = require('webpack-pwa-manifest')
const path = require('path')

const config = {
  mode: 'production',
  entry: {
    app: './assets/js/index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new WebpackPwaManifest({
      name: 'Budget tracker app',
      short_name: 'Budget tracker',
      description:
        'An application that allows you make an offline or online budget and download as a desktop webapp',
      background_color: '#01579b',
      theme_color: '#ffffff',
      'theme-color': '#ffffff',
      start_url: '/',
      inject: false,
      fingerprints: false,
      display: 'standalone',
      icons: [
        {
          src: path.resolve('assets/icons/icon-512x512.png'),
          sizes: [24, 36, 48, 56, 64, 72, 96, 128, 144, 152, 192, 256, 384, 512],
          destination: path.join('assets', 'icons')
        }
      ]
    })
  ]
}

module.exports = config
