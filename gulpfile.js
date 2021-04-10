const gulp = require("gulp");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
/* gulp.task("test1", done => {
    console.log("hello gulp1");
    done();
});
gulp.task("test2", done => {
    console.log("hello gulp2");
    done();
}); */

//gulp.task("default", gulp.series("test1", "test2"));
//gulp.task("default", gulp.parallel("test1", "test2"));

//拷贝某个文件
gulp.task("copyHtml", done => {

    gulp.src("*.html").pipe(gulp.dest("dist")).pipe(connect.reload());

    done();
})
//拷贝一类文件
/* gulp.task("copyImg", done => {
    gulp.src("img/*.jpg").pipe(gulp.dest("dist/img"));
    done();
}) */
//拷贝不同类型文件
/* gulp.task("copyImg", done => {
    gulp.src("img/*.{jpg,png}").pipe(gulp.dest("dist/img"));
    done();
}) */
//拷贝目录下所有文件
/* gulp.task("copyImg", done => {
    gulp.src("img/**").pipe(gulp.dest("dist/img"));
    done();
}) */

//拷贝不同目录下文件拷贝同一目录下
/* gulp.task("copyData", done => {
    gulp.src(["xml/a.xml", "json/a.json"]).pipe(gulp.dest("dist/data"));
    done();
}) */

//将sass转换成css
gulp.task("sass", done => {

    gulp.src("sass/*.scss").pipe(sass()).pipe(gulp.dest("dist/css")).pipe(connect.reload());

    done();
})
//合并并压缩并重命名文件
gulp.task("concat", done => {

    gulp.src(["js/a.js", "js/b.js"])
        .pipe(concat("main.js"))
        .pipe(gulp.dest("dist/js"))
        .pipe(uglify())
        .pipe(rename("main.min.js"))
        .pipe(gulp.dest("dist/js"));

    done();
});

gulp.task("uglify", done => {

    gulp.src(["js/a.js", "js/b.js"])
        .pipe(gulp.dest("dist/js"))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist/js"));

    done();
});

//将高版本的js转换成ES5

gulp.task("babel", done => {
    gulp.src("js/b.js")
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest("dist/js"));
    done();
})



//监听文件变化，一旦监听的文件发生变化，就执行指定的任务
gulp.task("watch", done => {

    gulp.watch("*.html", gulp.series("copyHtml"));
    gulp.watch("sass/*.scss", gulp.series("sass"));

    done();
})
//创建服务器
gulp.task("server", done => {

    connect.server({
        root: "dist",
        livereload: true
    })

    done();
});
//gulp.task("build",gulp.series("copyHtml","copyCss"))
gulp.task("default", gulp.series("server", "watch"));