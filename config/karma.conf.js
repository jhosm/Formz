basePath = '../app/';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  
  'lib/jquery/jquery-1.9.1.min.js',
  'lib/angular/angular.js',
  'lib/angular/angular-*.js',
  'lib/underscore/underscore-min.js',
  'lib/showdown/showdown.js',
  '../test/lib/angular/angular-mocks.js',
  'js/**/*.js',
  '../test/unit/**/*.js',

  // templates
  'partials/directives/*.html',

  //xsd Samples
  'xsd/samples/*.xsd'
];

// generate js files from html templates
preprocessors = {
  '**/*.xsd': 'html2js',
  '**/*.html': 'html2js'
};

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
