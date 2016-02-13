module.exports = function () {
  var config = {
    styles: './assets/styles/',
    alljs: [
      './source/**/*.js',
      './*.js'
    ],
    stylus: './source/styles/*.styl'
  };

  return config;
};
