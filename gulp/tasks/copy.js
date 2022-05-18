export const copy = () => {
    return app.gulp.src(app.path.src.files) // Получаем доступ к нужным файлам и папкам
    .pipe(app.gulp.dest(app.path.build.files)) // Переносим файлы
}