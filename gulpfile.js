/*===========GULP==============*/
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var minify = require('gulp-minify');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require('gulp-rename');
var del = require('del');
var cache = require('gulp-cache');
var babel = require('gulp-babel');
var env = require('babel-preset-env');
var es2015 = require('babel-preset-es2015');
var es2016 = require('babel-preset-es2016');
var imagemin = require('gulp-imagemin');
/*===========Compile SCSS==============*/
gulp.task('sass', function() {
	gulp.src('assets/stylesheet/styles.scss')
		.pipe(sass())
		.pipe(gulp.dest('assets/stylesheet/'))
		.pipe(plumber())
		.pipe(sass({errLogToConsole: true}))
		.pipe(browserSync.reload({
			stream: true
		}))
});
/*===========Minify CSS==============*/
gulp.task('mincss', function() {
	gulp.src('./assets/stylesheet/styles.css')
		.pipe(minifyCSS())
		//.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('dist'));
});


// js uglify
gulp.task('js-compile-uglify', function(){
	gulp.src(['./assets/javascript/index.js'])
		.pipe(babel({
			presets: ['es2015', 'es2016'] // env에 대해서 알아볼 것. require 등이 제대로 컴파일이 안됨
		}))
		.pipe(uglify())
		.pipe(concat('bundle.min.js'))
		.pipe(gulp.dest('dist'))
});

// auto delete in dist
gulp.task('clean:dist', function(){
	return del('dist/*', {force:true});
});

// TODO 왜 이게 필요한지 확인한 후에 사용하자.
gulp.task('clean', function(callback) {
	del('dist');
	return cache.clearAll(callback);
});

/*===========Watch==============*/
// gulp.task('watch', ['browserSync', 'sass'], function (){
// 	gulp.watch('assets/stylesheet/styles.scss', ['sass']);
// 	gulp.watch('dist/*.html', browserSync.reload);
// 	gulp.watch('assets/javascript/*.js', browserSync.reload);
// });

/*===========ON-Line synchronization from browsers==============*/

// var browserSync = require('browser-sync');
//
// gulp.task('browserSync', function() {
// 	browserSync({
// 		server: {
// 			baseDir: '/dist/'
// 		}
// 	})
// });



/*===========Join files for CSS==============*/




// gulp.task('useref', function(){
// 	var assets = useref.assets();
//
// 	return gulp.src('*.html')
// 		.pipe(assets)
// 		.pipe(gulpIf('assets/javascript/*.js', uglify()))
// 		.pipe(assets.restore())
// 		.pipe(useref())
// 		.pipe(gulp.dest('dist'))
// });


/*===========Minimization IMAGE==============*/

//
// var imagemin = require('gulp-imagemin');
//
// gulp.task('images', function(){
// 	return gulp.src('html/img/**/*.+(png|jpg|gif|svg)')
// 		.pipe(imagemin())
// 		.pipe(gulp.dest('dist/img'))
// });
//
// var cache = require('gulp-cache');
//
// gulp.task('images', function(){
// 	return gulp.src('html/img/**/*.+(png|jpg|jpeg|gif|svg)')
// 		.pipe(cache(imagemin({
// 			interlaced: true
// 		})))
// 		.pipe(gulp.dest('dist/img'))
// });
//
//
// gulp.task('compress', function() {
// 	gulp.src('html/img/*')
// 		.pipe(imagemin())
// 		.pipe(gulp.dest('dist/img'));
// });


/*=============Copy Fonts==============*/
// 각종 폰트 및 fontawesome 관련 연결할 때 사용할 것.
// gulp.task('fonts', function() {
// 	return gulp.src('html/fonts/**/*')
// 		.pipe(gulp.dest('dist/fonts'))
// });



/*=============Join tasks==============*/

var runSequence = require('run-sequence');

gulp.task('default', function(callback) {
	//runSequence(['sass', 'browserSync', 'watch'],
	runSequence(['sass', 'mincss', 'js-compile-uglify'],
		callback
	)
});

gulp.task('build', function(callback) {
	runSequence(
		['clean:dist', 'sass', 'mincss', 'js-compile-uglify'],
		callback
	)
});