import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
    return app.gulp.src(app.path.src.images) //Получаем доступ к файлам в папке src
    .pipe(app.plugins.plumber( //Отлавливаем ошибки
        app.plugins.notify.onError({
            title: "IMAGES",
            message: "Error: <%= error.message %>"
        }))
    )
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(
        app.plugins.if(
            app.isBuild,
            webp()
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            app.gulp.dest(app.path.build.images)
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            app.gulp.src(app.path.src.images)
        )
    )
    .pipe( //Проверяем на обновление изображения
        app.plugins.if(
            app.isBuild,
            app.plugins.newer(app.path.build.images)
        )
    ) 
    .pipe(
        app.plugins.if(
            app.isBuild,
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3 // от 0 до 7
            })
        )
    )
    .pipe(app.gulp.dest(app.path.build.images)) //Копируем в папку с результатом
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.images)) //Копируем в папку с результатом
    .pipe(app.plugins.browsersync.stream()); //Выгружаем и обновляем браузер
}