import config from './config';
import {getUnits} from './helpers';

// get current weather from Open Weather Map API by coors
export const getWeatherByCoors = (lat, long) => {

    let units = getUnits();
    return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&APPID=${config.openWeatherApi}`).then((response) => {
        return response.json();
    });
};

// get forecast from Open Weather Map API by coors
export const getForecastByCoors = (lat, long) => {

    let units = getUnits();
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=${units}&APPID=${config.openWeatherApi}`).then((response) => {
        return response.json();
    });
};

// get current weather from Open Weather Map API by city name
export const getWeatherByCityName = (city, country) => {

    let units = getUnits();

    // check if user specified country as a second parameter
    if(typeof(country) == 'undefined') {
        return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&APPID=${config.openWeatherApi}`).then((response) => {
            return response.json();
        });
    }
    return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${units}&APPID=${config.openWeatherApi}`).then((response) => {
        return response.json();
    });
};

// get current weather from Open Weather Map API by city name
export const getForecastByCityName = (city, country) => {

    let units = getUnits();

    // check if user specified country as a second parameter
    if(typeof(country) == 'undefined') {
        return fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&APPID=${config.openWeatherApi}`).then((response) => {
            return response.json();
        });
    }
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=${units}&APPID=${config.openWeatherApi}`).then((response) => {
        return response.json();
    });
};