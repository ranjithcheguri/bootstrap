'use strict';

module.exports= function(grunt){

	require('time-grunt')(grunt);
	require('jit-grunt')(grunt,{
		useminPrepare : 'grunt-usemin'
	}); //load any other grunt plugins/node modules that are required in the other modules. so we dont have to manually load all

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
		},

		copy:{
			html:{
				files: [{  						//syntax**
					expand:  true,
					dot:     true,
					cwd:     './',
					src:     ['*.html'],
					dest:    'dist'
				}]
			},
			fonts:{
				files:[{
					expand:  true,
					dot:     true,
					cwd:     'node_modules/font-awesome',
					src: 	['fonts/*.*'],
					dest:    'dist'
				}]
			}
		},

		
		clean: {
			build:{
				src:['dist/']
			}
		},

		imagemin: {
			dynamic: {
				files : [{
				expand:  true,
				cwd:     './',
				src: 	['img/*.{png,jpg,gif}'],
				dest:    'dist/'
				}]
			}
		},

		useminPrepare: {			// prepares usemin to work
			foo: {
				dest:'dist/',
				src:['contactus.html','aboutus.html','index.html']
			},
			options: {
				flow : {
					steps : {
						css:['cssmin'],
						js:['uglify']						
					},
					post:{
						css:[{
							name: 'cssmin',
							createConfig: function(context,block){
							var generated =context.options.generated;
								generated.options = {
									keepSpecialComments:0, rebase : false		//font-awesome doesnot work correctly without all this
								};												//ERROR : ; missed
							}
						}]
					}
				}
			}
		},

		concat: {
			options: {
				seperator : ';'
			},
			dist: {}
		},

		uglify: {
			dist:{}
		},

		cssmin: {
			dist:{}							// empty are configured else usemin seems to be not working properly
		},

		filerev: {							// when you have uploaded your new version of website and users browser might have already cached oldversion css,js etc code. so file rev adds an extension of css and js file
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 20				//ERROR : 20 mentioned in quotes before
			},
			release: {
				files : [{
					src : [
						'dist/js/*.js',
						'dist/css/*.css',
					]
				}]
			}
		},

		usemin : {
			html :['dist/contactus.html','dist/aboutus.html','dist/index.html'],
			options : {
				assetsDirs: ['dist','dist/css','dist/js']
			}
		},

		htmlmin : {
			dist : {
				options: {
					collapseWhitespace: true							//htmlmin should be applied after usemin
				},
				files : {
					'dist/index.html' : 'dist/index.html',
					'dist/aboutus.html' : 'dist/aboutus.html',
					'dist/contactus.html' : 'dist/contactus.html',
				}
			}
		}


	});


	grunt.registerTask('css',['sass']);
	grunt.registerTask('default',['browserSync','watch']);	//watch task should be generally last, it should be executed after browserSync here.
	grunt.registerTask('build',[
		'clean',
		'copy',
		'imagemin',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'filerev',
		'usemin',
		'htmlmin'
	]);
};