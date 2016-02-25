
module.exports = function(config) {
  config.set({
     basePath: '',
     frameworks: ['jasmine'],
     files: [
          'node_modules/angular/angular.js',
          'node_modules/angular-mocks/angular-mocks.js',
          'node_modules/angular-route/angular-route.js',
          'node_modules/angular-resource/angular-resource.js',
          'app/script.js',
          'app/resource.js',
          'app/controller.js',
          '*.js',
          'app/**/*.js',
          'Tests/app/*.spec.js'
     ],
     browsers: ['Chrome'],
     singleRun: false,
     autoWatch: true,
     reporters: ['progress', 'coverage'],
     preprocessors: { 'app/**/*.js': ['coverage'] }
  })
}