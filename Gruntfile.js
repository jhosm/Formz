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
    },
    docker: {
      app: {
      expand: true,
      src: ['app/js', 'app/locales', 'app/partials', 'app/index*.html', 'test/e2e', 'test/unit', 'README.md'],
      dest: './doc',
      options: {
        ignoreHidden: true,
        exclude: 'lib',
        extras: ['fileSearch']
      }
    }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-docker');

  // Default task(s).
  grunt.registerTask('default', ['karma:dev']);

  // Travis CI task.
  grunt.registerTask('travis', ['karma:continuous', 'docker']);

};