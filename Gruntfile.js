(function () {
   'use strict';
}());

module.exports = function(grunt) {

  grunt.initConfig({
    dirs: {
      handlebars: 'templates'
    },
    //for sass: #1: ruby -v to see if you have ruby installed
    //#2: gem install sass
    clean: ['../_stage/*'],
    copy: {
      dist: {
        files: [
          {expand: true, src: ['*.html', 'LICENSE-MIT'], dest: '../_stage/'},
          {expand: true, src: ['css/*', 'css/**/*'], dest: '../_stage/'},
          {expand: true, src: ['img/*', 'img/**/*'], dest: '../_stage/'},
          {expand: true, src: ['interfaces/*', 'interfaces/**/*'], dest: '../_stage/'},
          {expand: true, src: ['js/*', 'js/**/*'], dest: '../_stage/'},
          {expand: true, src: ['page_segments/*', 'page_segments/**/*'], dest: '../_stage/'},
          {expand: true, src: ['shims/*', 'shims/**/*'], dest: '../_stage/'},
          {expand: true, src: ['templates/*.js'], dest: '../_stage/'}
        ]
      }
    },
    sass: {
      dist: {
          files: {
            'css/main.css' : 'css/sass/main.scss'
          },
          options: {
            'style': 'expanded'
          }
        }
    },
    jshint: {
      options: {
        jshintrc: true,
        reporterOutput: "",
        'esversion': 6
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['*.js', 'js/*.js', 'src/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    watch: {
      sass: {
        files: ['css/sass/main.scss'],
        tasks: ['sass:dist']
      },
      handlebars: {
        files: ['<%= handlebars.compile.src %>'],
        tasks: ['handlebars:compile']
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      js: {
        files: ['*.js', 'js/*.js', 'test/*.js', 'applications/*.js', 'page_segments/*.js', 'page_segments/**/*.js',
                'templates/_templateController.js', 'shims/*.js', 'interfaces/*.js'],
        tasks: ['jshint:src']
      },
      options: {
        debounceDelay: 500,
        reload: true
      }
    },
    handlebars: {
      compile: {
        src: ['templates/*.handlebars', 'templates/**/*.handlebars'],
        dest: 'templates/compiledHandlebars.js'
      },
      options: {
        namespace: 'DD'
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task.
  grunt.registerTask('default', ['jshint', 'handlebars']);
  grunt.registerTask('stage', ['clean', 'copy']);
};
