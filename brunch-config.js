// See http://brunch.io for documentation.
module.exports = {
  server: {
    port: 8000,
    hostname: '0.0.0.0',
    stripSlashes: true
  },
  files: {
    javascripts: {
      joinTo: 'build.js'
    },
    stylesheets: {
      joinTo: 'build.css'
    }
  },
  plugins: {
    babel: {presets: ['latest', 'react']},
    postcss: {processors: [require('autoprefixer')]},
    sass: {
      mode: 'native'
    },
    sassLint: {
      file: 'sass-lint.yml',
      warnOnly: false
    },
    eslint: {
      pattern: /^app\/.*\.js?x?$/,
    },
    nameCleaner: path => path.replace(/^app\//, ''),
  }
};
