/* Задания на урок#33 :

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
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
        list = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),//родитель списка фильмов
       checkbox = addForm.querySelector('[type = "checkbox"]'); 
        // btn = document.getElementsByTagName('button'),//"кнопка подтвердить"
      
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorit = checkbox.checked;

        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }
            if (favorit) {
                console.log("Добавляем любимый фильм");
            }

        movieDB.movies.push(newFilm);
        sortArr(movieDB.movies);

        createMoviList(movieDB.movies, list);     
        }
        
        event.target.reset();

    });


    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });//задание 1
    };

    

    const makeChanges = () => {
    genre.textContent = 'драма';//задание 2
    
    bg.style.backgroundImage = 'url("img/bg.jpg")';//задание 3
    };
    
    
    
    const sortArr = (arr) => {
      arr.sort();//сортировка объекта с фильмами  
    };

    

    function createMoviList(films, parent) {
    parent.innerHTML = "";//очистка списка фильмов

    sortArr(films);
    
    films.forEach((film, i) => {
        parent.innerHTML +=`
        <li class="promo__interactive-item">${i + 1} ${film}
            <div class="delete"></div>
        </li>`;//формирование замещающей динамической html структуры с нумерацией и фильмами  
    });//задания 4 и 5

    document.querySelectorAll('.delete').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            movieDB.movies.splice(i, 1);

            createMoviList(films, parent);
        });
    });

    }

    deleteAdv(adv);
    makeChanges();
    createMoviList(movieDB.movies, list);

});