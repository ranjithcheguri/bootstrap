'use strict';

var gulp = require('gulp'),
	sass= require('gulp-sass'),	
	browserSync = require('browser-sync'),				//gulp is code based way of configuring tasks
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	uglify = require('gulp-uglify'),
	usemin = require('gulp-usemin'),
	rev = require('gulp-rev'),
	cleanCss = require('gulp-clean-css'),
	flatmap = require('gulp-flatmap'),
	htmlmin = require('gulp-htmlmin'); 									

gulp.task('sass',function(){
	return gulp.src('./css/*.scss')
	.pipe(sass().on('error',sass.logError))				// convert scss files to css with sass()
	.pipe(gulp.dest('./css'));
});

gulp.task('sass:watch',function(){
	gulp.watch('./css/*.scss',['sass']);				// watch plugin is not req,its inbuilt, it watches changes in scss files if any and trigger sass
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

gulp.task('clean',function(){
	return del(['dist']);								// del plugin is used for cleaning
});
	
gulp.task('copyfonts',function(){						// copy is inbuilt, no plugin required
	gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
	.pipe(gulp.dest('./dist/fonts'));
});

gulp.task('imagemin',function(){
	return gulp.src('img/*.{png,jpg,gif}')				// as of now not sure, when to use return statement
	.pipe(imagemin({optimizationLevel : 3, progressive:true, interlaced: true }))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('usemin',function(){							//usemin allows to do transformation to combine all html,cs,js files and put into dist folder
	return gulp.src('./*.html')
	.pipe(flatmap(function(stream,file){				//flatmap takes multiple html files and starts parallel pipelining, and then converging to same destination
		return stream
		.pipe(usemin({
			css : [rev()],
			html : [function(){	return htmlmin({collapseWhitespace : true})}],	
			js : [uglify(),rev()],
			inlinejs : [uglify()],
			inlinecss : [cleanCss(),'concat']
		}))
	}))
	.pipe(gulp.dest('dist/'));
});

gulp.task('build',['clean'],function(){					// clean task should be done first and others next
	gulp.start('copyfonts','imagemin','usemin');
});


