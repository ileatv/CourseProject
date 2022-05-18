import replace from "gulp-replace"; //Поиск и замена
import plumber from "gulp-plumber"; //Обработка ошибок
import notify from "gulp-notify"; //Сообщение (подсказки)
import browsersync from "browser-sync"; //Локальный сервер
import newer from "gulp-newer"; //Проверка обновления картинок(обновилась ли картинка действительно или нет)
import ifPlugin from "gulp-if"; //Условное ветвление

//Экспортируем объект плагинов
export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin
}