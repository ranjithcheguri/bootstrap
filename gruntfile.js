'use strict';

module.exports= function(grunt){

	require('time-grunt')(grunt);
	require('jit-grunt')(grunt); //load any other grunt plugins/node modules that are required in the other modules. so we dont have to manually load all

	grunt.initConfig({

		sass:{
			dist:{
				files:{
					'css/styles.css' : 'css/styles.scss'
				}
			}
		}, //be careful of comma

		watch:{
			files:  'css/*.scss',
			tasks: ['sass']
		},

		browserSync : {
			dev: {
				bsfiles: {
					src: [
						'css/*.css',
						'*.html',
						'js/*.js'
					]
				},

				options: {
					watchTask:true,
					server: {
						baseDir:'./'
					}
				}
			}
		}



	});


	grunt.registerTask('css',['sass']);
	grunt.registerTask('default',['browserSync','watch']);	//watch task should be generally last, it should be executed after browserSync here.

}