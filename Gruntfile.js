module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'app/js/app.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js']
    },
    karma: {
      options: {
        configFile: './config/karma.conf.js',
      },
      continuous: {
        singleRun: true,
        browsers: ['PhantomJS']
      },
      dev: {
        reporters: 'dots'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');

  // Default task(s).
  grunt.registerTask('default', ['karma:continuous']);

  // Travis CI task.
  grunt.registerTask('travis', ['karma:continuous']);

};