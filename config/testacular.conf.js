basePath = '../app/';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  
  'lib/jquery/jquery-1.9.1.js',
  'lib/angular/angular.js',
  'lib/angular/angular-*.js',
  'lib/underscore/underscore-min.js',
  '../test/lib/angular/angular-mocks.js',
  'js/**/*.js',
  '../test/unit/**/*.js',

  // templates
  'partials/directives/*.html'
];

// generate js files from html templates
preprocessors = {
  '**/*.html': 'html2js'
};

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
