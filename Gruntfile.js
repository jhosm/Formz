module.exports = function(grunt) {

  var releaseDir = 'release/';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: [releaseDir],
    copy: {
      main: {
        files: [
          {src: ['app/**', 'test/**', 'config/**', 'scripts/**'], dest: releaseDir} // includes files in path and its subdirs
        ]
      }
    },
    useminPrepare: {
      html: releaseDir + 'app/index.html'
    },
    usemin: {
      html: [releaseDir + 'app/index.html']
    },
    rev: {
      js: releaseDir + 'app/js/all.js'
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
      },
      runWebServerRelease: {
        cmd: 'node scripts/web-server.js',
        execOpts: {
          cwd: './' + releaseDir
        }
      },
      bowerInstall: {
        cmd: 'bower install',
        bg: false
      },
      killWebServer: {
        cmd: 'kill `lsof -t -i tcp:8000`'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-docker');
  grunt.loadNpmTasks('grunt-bg-shell');


  // Travis CI task.
  grunt.registerTask('travis', ['bgShell:bowerInstall', 'karma:continuous', 'docker', 'jshint', 'package']);

  grunt.registerTask('package', ['clean', 'copy:main', 'useminPrepare', 'concat', 'uglify', 'rev', 'usemin', 'bgShell:runWebServerRelease', 'karma:e2e']);

  // Default task(s).
  grunt.registerTask('unitTests', ['karma:dev']);
  grunt.registerTask('runWebServer', ['bgShell:runWebServer']);
  grunt.registerTask('killWebServer', ['bgShell:killWebServer']);

};