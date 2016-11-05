module.exports = function(grunt){
  require("load-grunt-tasks")(grunt);

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-package-modules');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-multi-dest');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-force-task');
  grunt.loadNpmTasks('grunt-contrib-jshint');	

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ["dist"],
    
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        ignores: ['src/bower_components/**', 'src/**/external/**'],
      },
      src: ['Gruntfile.js', 'src/**/*.js'],
    },
    copy: {
      main: {
        cwd: 'src',
        expand: true,
        src: ['**/*', '!**/*.js', '!**/*.ts', '!**/*.scss', '!img/**/*'],
        dest: 'dist'
      },
      externals: {
        cwd: 'src',
        expand: true,
        src: ['**/external/*'],
        dest: 'dist'
      },
      bower_libs: {
        cwd: 'bower_components/echarts-ng/dist',
        expand: true,
        src: ['echarts-ng.js'],
        dest: 'dist/libs/'
      },
      echarts_libs: {
        cwd: 'node_modules/echarts/dist',
        expand: true,
        src: ['echarts.common.js', 'echarts.js'],
        dest: 'dist/libs/'
      },
      echarts_min_libs: {
        cwd: 'node_modules/echarts/dist',
        expand: true,
        src: ['echarts.common.min.js', 'echarts.min.js'],
        dest: 'dist/libs/'
      },
      img_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['img/**/*'],
        dest: 'dist/img/'
      },
      pluginDef: {
        expand: true,
        src: [ 'README.md'],
        dest: 'dist',
      }
    },

    multidest: {
        copy_some_files: {
            tasks: [
                "copy:main",
                "copy:externals",
                "copy:pluginDef"
            ],
            dest: ["dist"]
        },
    },

    packageModules: {
        dist: {
          src: 'package.json',
          dest: 'dist/src'
        },
    },

    concat: {
      dist: {
        src: ['src/node_modules/**/*.js'],
        dest: 'dist/src/<%= pkg.namelower %>-<%= pkg.version %>.js'
      }
    },

    watch: {
      rebuild_all: {
        files: ['src/**/*', 'README.md', '!src/node_modules/**', '!src/bower_components/**'],
        tasks: ['default'],
        options: {spawn: false}
      },
    },

    babel: {
      options: {
        ignore: ['**/bower_components/*','**/external/*'],
        sourceMap: true,
        presets:  ["es2015"],
        plugins: ['transform-es2015-modules-systemjs', "transform-es2015-for-of"],
      },
      dist: {
        files: [{
          cwd: 'src',
          expand: true,
          src: ['**/*.js'],
          dest: 'dist',
          ext:'.js'
        }]
      },
    },
  });
  grunt.registerTask('default', [
          'jshint',
          'multidest',
          'copy:echarts_libs',
          'copy:bower_libs',
          'copy:img_to_dist',
          'babel']);
  grunt.registerTask('release', ['jshint', 'clean', 'multidest', 'copy:echarts_min_libs', 'copy:img_to_dist', 'copy:bower_libs', 'packageModules', 'babel']);
};
