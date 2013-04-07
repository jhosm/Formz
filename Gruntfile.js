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
    //grunt jshint
    jshint: {
      options: {
        browser: true,
        globals: {
          angular: false,
          Showdown: false,
          _: false,
          ActiveXObject: false,
          describe: false,
          it: false,
          expect: false,
          input: false,
          element: false,
          beforeEach: false,
          browser: false,
          repeater: false,
          module: false,
          inject: false
        }
      },
      all: ['Gruntfile.js', 'app/js/**/*.js', 'test/unit/**/*.js', 'test/e2e/**/*.js']
    },
    karma: {
      continuous: {
        configFile: './config/karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      },
      dev: {
        configFile: './config/karma.conf.js',
        reporters: 'dots'
      },
      e2e: {
        configFile: './config/karma-e2e.conf.js',
        browsers: ['PhantomJS']
      }
    },
    docker: {
      app: {
        expand: true,
        src: ['app/js', 'app/locales', 'app/partials', 'app/index*.html', 'test/e2e', 'test/unit', 'README.md', 'Gruntfile.js'],
        dest: './doc',
        options: {
          ignoreHidden: true,
          exclude: 'lib',
          extras: ['fileSearch']
        }
      }
    },
    bgShell: {
      _defaults: {
        bg: true,
        fail: true
      },
      runWebServer: {
        cmd: 'node scripts/web-server.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-docker');
  grunt.loadNpmTasks('grunt-bg-shell');

  // Default task(s).
  grunt.registerTask('default', ['karma:dev']);

  // Travis CI task.
  grunt.registerTask('travis', ['bgShell:runWebServer', 'karma:continuous', 'karma:e2e', 'docker', 'jshint']);

};