/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const adv = document.querySelectorAll('.promo__adv img'),//реклама справа картинки
    bg = document.querySelector('.promo__bg'),//блок текста в центре
    genre = bg.querySelector('.promo__genre'),//строка комедия в блоке текста
    list = document.querySelector('.promo__interactive-list');//родитель списка фильмов

adv.forEach(item => {
    item.remove();
});//задание 1

genre.textContent = 'драма';//задание 2

bg.style.backgroundImage = 'url("img/bg.jpg")';//задание 3

list.innerHTML = "";//очистка списка фильмов

movieDB.movies.sort();//сортировка объекта с фильмами

movieDB.movies.forEach((film, i) => {
    list.innerHTML +=`
    <li class="promo__interactive-item">${i + 1} ${film}
        <div class="delete"></div>
    </li>
    `;//формирование замещающей динамической html структуры с нумерацией и фильмами  
});//задания 4 и 5
