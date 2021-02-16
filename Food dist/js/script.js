import tabs from './modules/tabs';
    import modal from './modules/modal';
    import timer from './modules/timer';
    import forms from './modules/forms';
    import cards from './modules/cards';
    import slider from './modules/slider';
    import calc from './modules/calc';
    import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
   
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2021-06-05');
    forms('form', modalTimerId);
    cards();
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        slide: '.offer__slide',
        
    });
    calc();

});   
