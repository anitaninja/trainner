module.exports = function (grunt) {
  grunt.initConfig({
    execute: {
      target: {
        src: ['login.js']
      }
    },
    watch: {
      scripts: {
        files: ['login.js'],
        tasks: ['execute'],
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-execute');
};