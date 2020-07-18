var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const tsify = require("tsify");
var babelify = require('babelify');
const { glob } = require('glob');
const es = require('event-stream')
const rename = require('gulp-rename')

gulp.task('pug', function () {
	return gulp.src('app/pug/**/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('app/'));
});
gulp.task('sass', function () {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
});
gulp.task('useref', function () {
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'))
});
gulp.task('images', function () {
	return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
		.pipe(cache(imagemin({
			interlaced: true
		})))
		.pipe(gulp.dest('dist/images'))
});
gulp.task('fonts', function () {
	return gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))
});
gulp.task('clean:dist', function () {
	return del.sync('dist');
});
gulp.task('ts', function () {
	return tsProject.src()
		.pipe(tsProject())
		.js.pipe(gulp.dest('./app/js'));
});
gulp.task('watch', function () {
	gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
	gulp.watch('app/pug/*.pug', gulp.series('pug'));
	gulp.watch('app/ts/**/*.ts', gulp.series('ts'));
});

gulp.task('build', function (callback) {
	runSequence('clean:dist',
		['pug', 'sass', 'useref', 'images', 'fonts'],
		callback
	)
});


gulp.task('ts-new', (done) => {
	// 利用 glob 指令找出需要打包的 TS 檔案
	glob('./app/ts/layout_**.ts', (err, files) => {
		if (err) done(err);

		// 依序將檔案打包
		var tasks = files.map(function (entry) {
			// 利用 browserify 將多檔案引用變成一包
			return browserify({
				entries: [entry],
			})
				// 因為使用 typescript 開發所以要用 tsify 套件
				.plugin(tsify)
				// 將新的寫法改成早期的 => let , const , promise ㄋ
				.transform(babelify, { extensions: ['.tsx', '.ts'] })
				// 開始打包
				.bundle()
				.pipe(source(entry))
				// 將打包的名稱加個後綴	
				.pipe(rename({
					dirname: './', // 指定打包路徑，如果不設定為變成 ./app/js/app/ts
					extname: '.bundle.js'
				}))
				// 指定打包根目錄
				.pipe(gulp.dest('./app/js'));
		});
		es.merge(tasks).on('end', done);
	})
})