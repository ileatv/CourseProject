// Получаем имя папки проекта
import * as nodePath from 'path'; //Импортируем модуль path
const rootFolder = nodePath.basename(nodePath.resolve()); //Получаем имя папки проекта

const buildFolder = `./dist`; //Путь к папке с результатом
const srcFolder = `./src`; //Путь к папке с исходными файлами

// Объект path, в котором хранится вся информация о пути к тому или иному файлу или папке
export const path = { // export - используем для того, чтобы экспортировать эту константу и чтобы мы могли использовать пути, что указаны ниже
    build: {
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        images: `${buildFolder}/img/`,
        files: `${buildFolder}/files/`,
        fonts: `${buildFolder}/fonts/`
    }, // Объект путей к папке с результатом
    src: {
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        scss: `${srcFolder}/scss/style.scss`,
        html: `${srcFolder}/*.html`,
        files: `${srcFolder}/files/**/*.*`, // Запись означает, что нас интересуют все файлы и папки внутри src
        svgicons: `${srcFolder}/svgicons/*.svg`,
    }, // Объект путей к исходным файлам
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/**/*.html`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
        files: `${srcFolder}/files/**/*.*` //Звездочки - это маски
    }, // Объект, где указываем пути к файлам и папка за которыми должен следить галп, и при любых изменениях выполнять определённые действия
    clean: buildFolder, //buildFolder - папка с результатом
    buildFolder: buildFolder, //buildFolder - папка с результатом
    srcFolder: srcFolder, //srcFolder - папка с исходниками
    rootFolder: rootFolder, // rootFolder - название текущей папки проекта
    ftp: `` //В кавычках вбить название папки, для установки её на удаленном сервере, например test
}