//Основной модуль
import gulp from "gulp";

//Импорт путей
import { path } from "./gulp/config/path.js";

//Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js"

//Передаем значения в глобальную переменную
global.app = {
    isBuild: process.argv.includes('--build'), //Если эта переменная хранит в себе флаг --build, то режим продакшена
    isDev: !process.argv.includes('--build'), //Если не хранит, то режим разработчика
    path: path,
    gulp: gulp,
    plugins: plugins
}

//Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprites } from "./gulp/tasks/svgSprites.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

//Наблюдатель за изменениями в файлах
function watcher(){
    //gulp.series(html,ftp) - чтобы при любом изменении любых файлов они попадали на сервер FTP, например, для файлов HTML, вместо последнего слова (после запятой), заменить этой командой
    gulp.watch(path.watch.files, copy); // Первое в скобках - это путь к файлам, через запятую указывается действие
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

export { svgSprites } //Экспорт SVG-спрайтов

//Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

//Основные задачи:
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images)); //parallel - задачи будут выполняться параллельно

//Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server)); //Метод series выполняет задачи последовательно
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);


//Экспорт сценариев (чтобы их было видно из вне)
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

//Выполнение сценария по умолчанию 
gulp.task('default', dev);