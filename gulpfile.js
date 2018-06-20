'use strict';

var gulp = require('gulp'),
	sass= require('gulp-sass'),
	browserSync = require('browser-sync'); 	//gulp is code based way of configuring tasks

gulp.task('sass',function(){
	return gulp.src('./css/*.scss')
	.pipe(sass().on('error',sass.logError))				// convert scss files to css with sass()
	.pipe(gulp.dest('./css'));
});

gulp.task('sass:watch',function(){
	gulp.watch('./css/*.scss',['sass']);				// watch changes in scss files if any and trigger sass
});

gulp.task('browser-sync',function(){
	var files = [
		'./*.html',
		'./css/*.css',									// give file details that browser needs to load your website
		'./js/*.js',
		'./img/*.img{png,jpg,gif}'
	];

	browserSync.init(files,{
		server:{
			baseDir:'./'								// server directory browserSync to use
		}
	});
});

gulp.task('default',['browser-sync'],function(){		// make sure browser is up before running watch task.
	gulp.start('sass:watch');
});