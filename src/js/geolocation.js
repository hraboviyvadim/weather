import config from './config';
import {showNotification, hidePreloader} from './helpers';

// check if browser supports geolocation
export const isGeolocation = () => navigator.geolocation ? true : false;

export const catchLocationError = (error) => {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            hidePreloader();
            showNotification(config.notAllowedMsg.className, config.notAllowedMsg.text);
            break;
        case error.POSITION_UNAVAILABLE:
        case error.TIMEOUT:
        case error.UNKNOWN_ERROR:
            hidePreloader();
            showNotification(config.errorLocationMsg.className, error.message);
            break;
    }
};

export const getLocation = (success, error) => {
    navigator.geolocation.getCurrentPosition(success, error);
};

export const saveCoords = (lat, long) => {
    let coords = {};
    coords.latitude = lat;
    coords.longitude = long;

    window.localStorage.coords = JSON.stringify(coords);
};

export const getSavedCoords = () => {
    return JSON.parse(window.localStorage.coords);
};