let gulp = require('gulp')
let clean = require('gulp-clean')
let LessPluginAutoPrefix = require('less-plugin-autoprefix')
let autoprefix = new LessPluginAutoPrefix({browsers: ['iOS >= 8', 'Android >= 4.1']})
let htmlmin = require('gulp-htmlmin')
let less = require('gulp-less')
let jsonminify = require('gulp-jsonminify2')
let babel = require('gulp-babel')
let rename = require('gulp-rename')
let minifycss = require('gulp-minify-css')
let runSequence = require('run-sequence')
let LessPluginFuction = require('less-plugin-functions')
let lessFunction = new LessPluginFuction()
let ts = require('gulp-typescript')
let tsProject = ts.createProject('tsconfig.json')
let uglify = require('gulp-uglify')
let gulpif = require('gulp-if')
let minimist = require('minimist')

let knownOptions = {
  string: 'env',
  default: {env: process.env.NODE_ENV || 'prod'}
}

let options = minimist(process.argv.slice(2), knownOptions)
let isProd = options.env === 'prod'

gulp.task('clean', () => {
  return gulp.src('dist').pipe(clean())
})

gulp.task('compile:wxml', () => {
  gulp.src('src/**/*.wxml').pipe(gulpif(isProd, htmlmin({
    collapseWhitespace: true,
    removeComments: true,
    keepClosingSlash: true
  }))).pipe(gulp.dest('dist'))
})

gulp.task('compile:ts', () => {
  gulp.src('src/**/*.ts').pipe(tsProject()).pipe(babel({presets: ['es2015']})).pipe(gulpif(isProd, uglify({compress: true}))).pipe(gulp.dest('dist'))
})

gulp.task('compile:js', () => {
  gulp.src('src/**/*.js').pipe(babel({
    presets: ['es2015']
  })).pipe(gulpif(isProd, uglify({compress: true}))).pipe(gulp.dest('dist'))
})

gulp.task('compile:less', () => {
  gulp.src('src/**/*.less').pipe(less({plugins: [lessFunction, autoprefix]})).pipe(gulpif(isProd, minifycss())).pipe(rename({extname: '.wxss'})).pipe(gulp.dest('dist'))
})

gulp.task('compile:json', () => {
  gulp.src('src/**/*.json').pipe(gulpif(isProd, jsonminify())).pipe(gulp.dest('dist'))
})

gulp.task('compile', ['compile:wxml', 'compile:ts', 'compile:js', 'compile:less', 'compile:json'])

gulp.task('extras', () => {
  gulp.src([
    'src/**/*.{jpe?g,png,gif}'
  ]).pipe(gulp.dest('dist'))
})

gulp.task('watch', () => {
  gulp.watch('src/**/*.*', () => {
    const now = new Date()
    console.info('\n====> 已重新编译', now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + '.' + now.getMilliseconds())
    runSequence('clean', 'compile', 'extras')
  })
})

gulp.task('default', () => {
  const now = new Date()
  console.info('\n====> 编译成功', now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + '.' + now.getMilliseconds())
  runSequence('clean', 'compile', 'extras', 'watch')
})
