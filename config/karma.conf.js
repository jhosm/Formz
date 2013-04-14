basePath = '../app/';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  
  'components/jquery/jquery.min.js',
  'components/angular/angular.min.js',
  'components/angular-resource/angular-resource.min.js',
  'components/underscore/underscore-min.js',
  'components/showdown/compressed/showdown.js',
  'lib/angular/angular-bootstrap.min.js',
  'components/angular-mocks/angular-mocks.js',
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
