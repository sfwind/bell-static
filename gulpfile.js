let gulp = require('gulp')
let clean = require('gulp-clean')
let LessPluginAutoPrefix = require('less-plugin-autoprefix')
let autoprefix = new LessPluginAutoPrefix({ browsers: ['iOS >= 8', 'Android >= 4.1'] })
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
  default: { env: process.env.NODE_ENV || 'prod' }
}

let options = minimist(process.argv.slice(2), knownOptions)
let isProd = options.env === 'prod'

gulp.task('clean', () => {
  console.log('【清理】清理文件成功...')
  return gulp.src('dist').pipe(clean())
})

gulp.task('compile:wxml', () => {
  console.log('【编译】开始编译 wxml...')
  gulp.src('src/**/*.wxml').pipe(gulpif(isProd, htmlmin({
    collapseWhitespace: true,
    removeComments: true,
    keepClosingSlash: true
  }))).pipe(gulp.dest('dist'))
})

gulp.task('compile:ts', () => {
  console.log('【编译】开始编译 ts...')
  gulp.src('src/**/*.ts').pipe(tsProject()).pipe(babel({ presets: ['es2015'] })).pipe(gulpif(isProd, uglify({ compress: true }))).pipe(gulp.dest('dist'))
})

gulp.task('compile:js', () => {
  console.log('【编译】开始编译 js...')
  gulp.src('src/**/*.js').pipe(babel({
    presets: ['es2015']
  })).pipe(gulpif(isProd, uglify({ compress: true }))).pipe(gulp.dest('dist'))
})

gulp.task('compile:less', () => {
  console.log('【编译】开始编译 less...')
  gulp.src('src/**/*.less').pipe(less({ plugins: [lessFunction, autoprefix] })).pipe(gulpif(isProd, minifycss())).pipe(rename({ extname: '.wxss' })).pipe(gulp.dest('dist'))
})

gulp.task('compile:json', () => {
  console.log('【编译】开始编译 json...')
  gulp.src('src/**/*.json').pipe(gulpif(isProd, jsonminify())).pipe(gulp.dest('dist'))
})

gulp.task('compile:image', () => {
  console.log('【编译】开始处理其他文件...')
  gulp.src(['src/**/*.{jpe?g,png,gif}']).pipe(gulp.dest('dist'))
})

gulp.task('compile', ['compile:wxml', 'compile:ts', 'compile:js', 'compile:less', 'compile:json', 'compile:image'])

gulp.task('watch', () => {
  console.log('【成功】编译成功')
  console.log('【观察】持续观察文件中...')
  gulp.watch('src/**/*.*', () => {
    runSequence('clean', 'compile', () => {
      console.log('【成功】编译成功')
      console.log('【观察】持续观察文件中...\n\n')
    })
  })
})

gulp.task('default', () => {
  // runSequence('clean', 'compile', 'watch')
  runSequence('clean', 'compile')
})