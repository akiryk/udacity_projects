/*
 * https://medium.com/@verpixelt/get-started-with-grunt-76d29dc25b01
 */
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
            'dev/js/libs/jquery.js',
            // 'dev/js/libs/*.js',
            'dev/js/main.js',
        ],
        dest: 'prod/js/unminified.js',
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          livereload: true
        }
      }
    },
    pagespeed: {
      options: {
        nokey: true,
        url: "https://developers.google.com"
      },
      prod: {
        options: {
          url: "http://kbia.org/",
          locale: "en_GB",
          strategy: "desktop",
          threshold: 70
        }
      },
      paths: {
        options: {
          paths: ["/speed/docs/insights/v1/getting_started", "/speed/docs/about"],
          locale: "en_GB",
          strategy: "desktop",
          threshold: 80
        }
      }
    },
    respimg: {
      default: {
            files: [{
                expand: true,
                cwd: 'assets/images/',
                src: ['**.{gif,jpg,png,svg}'],
                dest: 'prod/images/'
            }]
        }
    },
    responsive_images: {
      resize: {
        options: {
          quality: 70,
          sizes: [{
            suffix: '_small',
            width: 320
          },{
            suffix: '_medium',
            width: 618
          },{
            suffix: '_large',
            width: 1268
          }]
        },
        files: [{
          expand: true,
          src: ['images/**.{jpg,gif,png}'],
          cwd: 'assets/',
          dest: 'prod/'
        }]
      }
    },
    uglify: {
      build: {
        src: 'prod/js/production.js',
        dest: 'prod/js/production.min.js'
      }
    },
    processhtml: {
      dev: {
        files: {
          'index.html': ['index.html'] // 'destination.html': ['source.html']
        }
      },
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'prod/css/style.css': 'dev/scss/style.scss',
           // 'destination': 'source'
        }
      }
    },
    watch: {
      scripts: {
        files: [
                'dev/js/libs/*.js',
                'dev/js/plugins/*.js',
                'dev/js/*.js',
                ],
        tasks: ['concat'],
        options: {
            spawn: false,
            livereload: true
        },
      },
      css: {
        files: ['dev/scss/**/*.scss',
                'dev/scss/*.scss',
                ],
        tasks: [ 'sass' ],
        options: {
          spawn: false,
          livereload: true
        }
      },
      html: {
        files: ['index.html'],
        options: {
            livereload: true
        }
      }
    },
    watchForProduction: {
      scripts: {
        files: [
                'dev/js/libs/*.js',
                'dev/js/plugins/*.js',
                'dev/js/*.js',
                ],
        tasks: ['concatForProduction'],
        options: {
            spawn: false,
            livereload: true
        },
      },
      css: {
        files: ['dev/scss/**/*.scss',
                'dev/scss/*.scss',
                ],
        tasks: [ 'sass' ],
        options: {
          spawn: false,
          livereload: true
        }
      },
      html: {
        files: ['index.html'],
        options: {
            livereload: false
        }
      }
    }
  });

  // Load Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-respimg');
  grunt.loadNpmTasks('grunt-pagespeed');

  // Default task(s).
  grunt.registerTask('default', [
    'connect',
    'sass',
    'watch'
    ]);

  grunt.registerTask('optimize', [
    'respimg',
    ]);

  grunt.registerTask('resize', [
    'responsive_images',
    ]);

  grunt.registerTask('speed', [
    'pagespeed',
    ]);

  grunt.registerTask('compile-sass', [
    'sass',
    ]);

  grunt.registerTask('build', [
    'connect',
    'sass',
    'watchForProduction',
    'processhtml',
    'uglify'
    ]);

};