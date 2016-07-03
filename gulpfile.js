const gulp =require('gulp');
const browserSync =require('browser-sync').create();
const gulpLoadPlugins = require('gulp-load-plugins');
const $=gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('serve',['css','js','html'],function () {
    browserSync.init({
        server:{
            baseDir:"app"
        }
    });
    gulp.watch("app/css/*.css",['css']);
    gulp.watch('app/js/*.js',['js']);
    gulp.watch("app/*.html").on('change',reload);
})

// scss编译后的css将注入到浏览器里实现更新
gulp.task('css', function() {
    return gulp.src("app/css/*.css")
        .pipe($.cssnano())
        .pipe(gulp.dest("dist/css"))
        .pipe(reload({stream: true}));
});

gulp.task('js',function(){
    return gulp.src('app/js/*.js') 
            .pipe($.uglify())
            .pipe(gulp.dest('dist/js'))
            .pipe(reload({stream: true}));
});

gulp.task('html', ['css', 'js'], () => {
  return gulp.src('app/*.html')
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('serve:dist',function () {
    browserSync.init({
        server:{
            baseDir:"dist"
        },
        port:175
    });
})





