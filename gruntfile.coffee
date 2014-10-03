module.exports = (grunt) ->
  
  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    uglify:
      prod:
        options:
          banner: "/*! <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"

        files:
          "js/main.min.js": ["js-dev/skillsdata.js", "js-dev/skill.js"]

    less:
      dev:
        options:
          paths: ["css"]

        files:
          "www/bundle.css": "client/less/index.less"

      prod:
        options:
          paths: ["css"]
          cleancss: true
          modifyVars:
            imgPath: "\"http://mycdn.com/path/to/images\""
            bgColor: "red"

        files:
          "css/style.css": "less/style.less"

    express:
      all:
        options:
          bases: ["./"]
          port: 8080
          hostname: "0.0.0.0"
          livereload: true

    exec:
      browserify: 'browserify -t [ reactify --es6 --everything ] client/run.js -o www/bundle.js -d'
    
    # grunt-watch will monitor the projects files
    # https://github.com/gruntjs/grunt-contrib-watch
    watch:
      all:
        files: [
          "**/*.html"
          "**/*.js"
          "**/*.css"
        ]
        options:
          livereload: true

      js:
        files: "**/*.js"
        tasks: ["exec"]
        options:
          livereload: true

      css:
        files: "**/*.less"
        tasks: ["less:dev"]
        options:
          livereload: true

  
  # Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-less"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-express"
  grunt.loadNpmTasks "grunt-exec"
  
  # Default task(s).
  grunt.registerTask "default", [
    "less:dev"
    "exec"
    "express"
    "watch"
  ]
  grunt.registerTask "prod", [
    "less:prod"
    "jade:prod"
    "uglify:prod"
  ]
  grunt.registerTask "pub", [
    "less:prod"
    "jade:prod"
    "uglify:prod"
    "copy"
  ]
  return

