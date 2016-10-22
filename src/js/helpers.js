// helpers
import config from './config';
import {renderWeatherContent} from './weather';

// Return the first matched element by provided selector, traversing from current element to document
export const closest = (el, selector) => {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        } else {
            el = el.parentElement;
        }
    }
    return null;
};

// render notification about some event
export const showNotification = (className, message) => {
    let container = document.getElementById('notification');
    container.innerHTML = '<p></p>';

    let inner = container.querySelector('p');
    container.classList.add('open');
    inner.classList.add(className);
    inner.textContent = message || 'Undefined error, try again';
};

// hide notification
export const hideNotification = () => {
    let container = document.getElementById('notification');

    container.innerHTML = '';
};

// get current date in format: 12:21, October, 9, 2016
export const currentFullDate = () => {
    let now = new Date();

    return `${now.getHours()}:${now.getMinutes()}, ${config.months[now.getMonth()]}, ${now.getDate()}, ${now.getFullYear()}`;
};

// get day name
export const weekday = (timestamp) => {
    let n = new Date(timestamp).getDay();
    return config.days[n];
};

// transform wind meteorological degrees into humanfriendly string, e.g. 191.504 => 'South-southwest'
export const windDirection = (deg) => config.windDirections[((Math.floor(deg/22.5 + 0.5)) % 16)];

// show preloader
export const showPreloader = () => {
    let preloader = document.getElementById('preloader');
    preloader.classList.remove('is-hidden');
};

// hide preloader
export const hidePreloader = () => {
    let preloader = document.getElementById('preloader');
    preloader.classList.add('is-hidden');
};

// hide results block
export const hideResultsBox = () => {
    let target =  document.getElementById('dataBox');
    target.style.display = 'none';
};

// show results block
export const showResultsBox = () => {
    let target =  document.getElementById('dataBox');
    target.style.display = 'block';
};

// custom select
export const selectChange = (el) => {

    el.forEach(function (item) {
        let select = item.querySelector('select');
        let valueBox = item.querySelector('.select__value');
        
        select.addEventListener('change', function () {
            valueBox.textContent = this.value;
        });
    });

};

// get current units
export const getUnits = () => {
    let a;
    if(typeof(window.localStorage.units) === 'undefined'){
        a = 'metric';
    } else {
        a = window.localStorage.units;
    }
    return a;
};

// trasnform units names
export const transformUnits = (format) => {
    let units = {};
    if (format == 'metric'){
        units.tempUnits = `°C`;
        units.speedUnits = 'm/s';
    } else if (format == 'imperial') {
        units.tempUnits = `°F`;
        units.speedUnits = 'miles/h';
    }
    return units;
};

// transform units
export const transformTemp = (val, format) => {
    if(format == 'metric') {
        return Math.floor((val - 32)/1.8);
    } else if (format == 'imperial') {
        return Math.floor(val * 1.8 + 32);
    }
};
export const transformSpeed = (val, format) => {
    if(format == 'metric') {
        return Math.floor(val * 0.44704 * 100) / 100;
    } else if (format == 'imperial') {
        return Math.floor(val * 2.23694 * 100) / 100;
    }
};

// predefine state of units format select
export const setUnitsFormatSelect = () => {
    let select = config.unitsSelect;
    let valueBox = select.closest('.js-select').querySelector('.select__value');

    // set current units format on page load
    select.value = getUnits();
    valueBox.textContent = select.value;
};

// get start time for forecast
export const convertDate = (timestamp) => {
    let startTime = timestamp * 1000;
    return new Date(startTime);
};
