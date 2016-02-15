module.exports = function () {
  temp = './temp/';
  var config = {
    src        : './source/',
    dest       : './assets/',
    styles     : {
      src      : 'styles/*.styl',
      dest     : 'styles/'
    },
    scripts    : {
      src      : 'scripts/*.js',
      dest     : 'scripts/'
    },
    optimized  : {
      style    : {
        name   :'app.css',
        vendor : 'lib.css'
      },
      script   : {
        name   : 'app.js',
        vendor : 'lib.js'
      }
    },
    alljs      : [
      './source/**/*.js',
      './*.js'
    ],
    temp     : temp
  };

  return config;
};
