module.exports = function (grunt) {
  grunt.initConfig({
    execute: {
      target: {
        src: ['user_login.js']
      }
    },
    watch: {
      scripts: {
        files: ['user_login.js'],
        tasks: ['execute'],
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-execute');
};