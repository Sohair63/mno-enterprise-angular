const conf = require('./gulp.conf');
const wiredep = require('wiredep');

module.exports = function listFiles() {
  const wiredepOptions = Object.assign({}, conf.wiredep, {
    dependencies: true,
    devDependencies: true
  });

  const patterns = wiredep(wiredepOptions).js.concat([
    'node_modules/babel-polyfill/browser.js',
    // Stubbed config
    'gulp_tasks/tests/mnoConfiguration.js',
    `!${conf.path.tmp('**/*.spec.js')}`,
    conf.path.tmp('app/index.module.js'),
    conf.path.tmp('app/index.*.js'),
    conf.path.tmp('app/components/*.js'),
    conf.path.tmp('**/*.js'),
    conf.path.src('**/*.html')
  ]);

  const files = patterns.map(pattern => ({pattern}));
  files.push({
    pattern: conf.path.src('assets/**/*'),
    included: false,
    served: true,
    watched: false
  });
  return files;
};