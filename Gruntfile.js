module.exports = function(grunt) {

  var releaseDir = 'release/';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: [releaseDir],
    copy: {
      release: {
        files: [
          {src: ['app/**', 'test/**', 'config/**', 'scripts/**'], dest: releaseDir} // includes files in path and its subdirs
        ]
      },
      publishDemoSite: {
        files: [
          {src: [releaseDir + 'app/**', '!**/components/**'], dest: './doc/demo/'}, // includes files in path and its subdirs
          {src: [releaseDir + 'app/components/bootstrap/docs/assets/css/bootstrap.css', 
                 releaseDir + 'app/components/angular/angular.min.js', 
                 releaseDir + 'app/components/angular-resource/angular-resource.min.js', 
                 releaseDir + 'app/components/underscore/underscore-min.js', 
                 releaseDir + 'app/components/showdown/compressed/showdown.js', 
                 releaseDir + 'app/lib/angular/angular-bootstrap.min.js'],
           dest: './doc/demo/'} // includes files in path and its subdirs
        ]
      },
      docsIndex: {
        files: [
          {src: ['doc/README.md.html'], dest: 'doc/index.html'} // includes files in path and its subdirs
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
      js: releaseDir + 'app/js/all.min.js'
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
        reporters: 'dots',
        browsers: ['PhantomJS']
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
        bg: false,
        fail: false // Do not like it, but it's a quick way to ignore bower install warnings. If there's a problem, the build will fail soon after this task...
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
  grunt.registerTask('travis', ['bgShell:bowerInstall', 'karma:continuous', 'docker', 'copy:docsIndex', 'jshint', 'package', 'copy:publishDemoSite']);

  grunt.registerTask('package', ['clean', 'copy:release', 'useminPrepare', 'concat', 'uglify', 'rev', 'usemin', 'bgShell:runWebServerRelease', 'karma:e2e']);

  // Default task(s).
  grunt.registerTask('unitTests', ['bgShell:bowerInstall', 'karma:dev']);
  grunt.registerTask('e2eTests', ['bgShell:bowerInstall', 'bgShell:runWebServer', 'karma:e2e']);
  grunt.registerTask('runWebServer', ['bgShell:runWebServer']);
  grunt.registerTask('killWebServer', ['bgShell:killWebServer']);

};