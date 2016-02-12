module.exports = function () {
  var config = {
    temp: './assets/tmp/',
    alljs: [
      './src/**/*.js',
      './*.js'
    ],
    stylus: './src/styles/*.styl'
  };

  return config;
};
