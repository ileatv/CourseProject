import {configFTP} from '../config/ftp.js';
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';

export const ftp = () => {
    configFTP.log = util.log;
    const ftpConnect = vinylFTP.create(configFTP); //В константу ftpConnect создаем подключение
    return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {}) //Получаем все файлы в папке результата
    .pipe(app.plugins.plumber(
        app.plugins.notify(
            app.plugins.notify.onError({
                title: "FTP",
                message: "Error: <%= error.message %>"
            })
        )
    ))
    .pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`));
}