'use strict';

const Highcharts = require('highcharts');

import config from './config';
import * as helpers from './helpers';
import {isGeolocation, catchLocationError, getLocation, saveCoords, getSavedCoords} from './geolocation';
import {getWeatherByCoors, getWeatherByCityName, getForecastByCoors, getForecastByCityName} from './getData';
import {renderWeatherContent} from './weather';
import {tempForecastArr, dailyForecast, renderForecastContent} from './forecast';
import {initMap} from './googlemaps';
import Modal from './modal';

const app = () => {

    //const forecastTemp
    let tempChart;
    const tempForecastChart = () => {
        Highcharts.setOptions({
            colors: ['#19b88a', '#4a4a4a', '#18966E', '#f5f6f7', '#fff', '#ff7373']
        });

        let data = tempForecastArr();
        let startTime = JSON.parse(window.localStorage.forecast).list[0].dt;
        tempChart = Highcharts.chart('temp-chart', {
            chart: {
                backgroundColor: Highcharts.getOptions().colors[4],
                panning: true,
                panKey: 'shift'
            },
            title: {
                text: 'Temperature forecast'
            },
            legend: {
                enabled: false
            },
            xAxis: {
                type: 'datetime',
                title: '',
                lineColor: 'transparent',
                gridLineWidth: 1,
                gridLineColor: Highcharts.getOptions().colors[2],
                gridLineDashStyle: 'ShortDot',
                tickWidth: 0,
                tickInterval: 3 * 36e5,
                labels: {
                    style: {
                        color: Highcharts.getOptions().colors[1],
                        fontSize: '12px'
                    }
                }
            },
            yAxis: {
                title: {
                    text: null
                },
                gridLineWidth: 1,
                gridLineColor: Highcharts.getOptions().colors[2],
                gridLineDashStyle: 'ShortDot',
                tickInterval: 2,
                minTickInterval: 1,
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            plotOptions: {
                series: {
                    fillColor: {
                        linearGradient: [0, 0, 0, 300],
                        stops: [
                            [0, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.5).get('rgba')],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    }
                }
            },
            series: [{
                name: 'Temperature:',
                data: data,
                type: 'areaspline',
                pointStart: startTime*1000,
                pointInterval: 3 * 36e5
            }]
        });
        tempChart.xAxis[0].setExtremes(startTime*1000, startTime*1000 + 24*36e5);
    };

    // get weather for current location after page is loaded
    const localWeather = () => {
        if(isGeolocation()){
            helpers.showPreloader();

            if(window.localStorage.coords) {
                let coords = getSavedCoords();
                getWeatherByCoors(coords.latitude, coords.longitude)
                    .then((data) => {
                        helpers.showResultsBox();
                        renderWeatherContent(data);
                        window.localStorage.weather = JSON.stringify(data);
                    })
                    .catch((error) => {
                        helpers.showNotification(config.errorLocationMsg.className, error.text);
                        helpers.hidePreloader();
                        helpers.hideResultsBox();
                    });

                getForecastByCoors(coords.latitude, coords.longitude)
                    .then((data) => {
                        window.localStorage.forecast = JSON.stringify(data);
                        renderForecastContent(data);
                        if(typeof(tempChart) == 'undefined' ){
                            tempForecastChart();

                        } else {
                            tempChart.series[0].setData(tempForecastArr(),true);
                        }
                    })
                    .catch((error) => {
                        helpers.showNotification(config.errorLocationMsg.className, error.text);
                        helpers.hidePreloader();
                        helpers.hideResultsBox();
                    });

            } else {
                getLocation((response) => {

                    let latitude = response.coords.latitude;
                    let longitude = response.coords.longitude;

                    saveCoords(latitude, longitude);

                    getWeatherByCoors(latitude, longitude)
                        .then((data) => {
                            helpers.showResultsBox();
                            renderWeatherContent(data);
                            window.localStorage.weather = JSON.stringify(data);
                        })
                        .catch((error) => {
                            helpers.showNotification(config.errorLocationMsg.className, error.text);
                            helpers.hidePreloader();
                            helpers.hideResultsBox();
                        });

                    getForecastByCoors(latitude, longitude)
                        .then((data) => {
                            window.localStorage.forecast = JSON.stringify(data);
                            renderForecastContent(data);
                            tempForecastChart();
                        })
                        .catch((error) => {
                            helpers.showNotification(config.errorLocationMsg.className, error.text);
                            helpers.hidePreloader();
                            helpers.hideResultsBox();
                        });

                }, catchLocationError);
            }
        }
        else {
            helpers.showNotification(config.notSupportedMsg.className, config.notSupportedMsg.text);
        }
    };
    localWeather();

    document.getElementById('localWeather').addEventListener('click', localWeather);

    function showMap() {
        let wrap = document.getElementById('map-wrap');
        let map = document.getElementById('map');

        if(wrap.classList.contains('open')){
            wrap.classList.remove('open');
            this.textContent = 'Select on map';
        } else {
            wrap.classList.add('open');
            this.textContent = 'Close map';
            if(!map.classList.contains('loaded')){
                initMap();
            }
        }
    };

    const hideMap = () => {
        let wrap = document.getElementById('map-wrap');
        wrap.classList.remove('open');
        document.getElementById('showMap').textContent = 'Select on map';
    };

    document.getElementById('showMap').addEventListener('click', showMap);
    document.querySelector('.close-map').addEventListener('click', hideMap);

    // get weather for city from input
    const cityWeather = function (city, country) {
        helpers.showPreloader();
        helpers.hideNotification();
        getWeatherByCityName(city, country)
            .then((data) => {
                helpers.showResultsBox();
                renderWeatherContent(data);
                hideMap();
                this.value = '';
                window.localStorage.weather = JSON.stringify(data);
            })
            .catch((error) => {
                helpers.showNotification(config.errorCityMsg.className, config.errorCityMsg.text);
                helpers.hidePreloader();
                helpers.hideResultsBox();
            });

        getForecastByCityName(city, country)
            .then((data) => {
                window.localStorage.forecast = JSON.stringify(data);
                renderForecastContent(data);
                if(typeof(tempChart) == 'undefined' ){
                    tempForecastChart();

                } else {
                    tempChart.series[0].setData(tempForecastArr(),true);
                }
            })
            .catch((error) => {
                helpers.showNotification(config.errorCityMsg.className, error.message);
            });
    };

    // submit form with city name as a target
    (() => {
        let formCity = document.getElementById('formCity');
        formCity.addEventListener('submit', function (e) {
            e.preventDefault();

            let input = this.querySelector('input');
            let valueArr = input.value.split(', ');

            cityWeather.call(input, valueArr[0], valueArr[1]);

        });
    })();

    // get weather for coordinates from input
    const coordsWeather = function (lat, long) {
        helpers.showPreloader();
        helpers.hideNotification();
        getWeatherByCoors(lat, long)
            .then((data) => {
                helpers.showResultsBox();
                renderWeatherContent(data);
                hideMap();
                this.value = '';
                window.localStorage.weather = JSON.stringify(data);
            })
            .catch((error) => {
                helpers.showNotification(config.errorCoordsMsg.className, config.errorCoordsMsg.text);
                helpers.hidePreloader();
                helpers.hideResultsBox();
            });

        getForecastByCoors(lat, long)
            .then((data) => {
                window.localStorage.forecast = JSON.stringify(data);
                renderForecastContent(JSON.parse(window.localStorage.forecast));
                if(typeof(tempChart) == 'undefined' ){
                    tempForecastChart();

                } else {
                    tempChart.series[0].setData(tempForecastArr(),true);
                }
            })
            .catch((error) => {
                helpers.showNotification(config.errorLocationMsg.className, error.text);
                helpers.hidePreloader();
                helpers.hideResultsBox();
            });
    };

    // submit form with coordinates as a target
    (() => {
        let formCoords = document.getElementById('formCoords');
        formCoords.addEventListener('submit', function (e) {
            e.preventDefault();

            let input = this.querySelector('input');
            let valueArr = input.value.split(', ');

            coordsWeather.call(input, valueArr[0], valueArr[1]);
        });
    })();

    // modals
    let popup = new Modal();

    // init select
    let select = document.querySelectorAll('.js-select');
    helpers.selectChange(select);

    // config units change select
    helpers.setUnitsFormatSelect();

    // change units format
    config.unitsSelect.addEventListener('change', function () {
        // save new unots format to localStorage
        window.localStorage.units = this.value;

        // get current weather data
        let d = JSON.parse(window.localStorage.weather);
        // get current forecast data
        let f = JSON.parse(window.localStorage.forecast);

        //change temperature and speed values according to new units format
        d.main.temp = helpers.transformTemp(d.main.temp, helpers.getUnits());
        d.wind.speed = helpers.transformSpeed(d.wind.speed, helpers.getUnits());
        f.list.forEach((cast) => {
            cast.main.temp = helpers.transformTemp(cast.main.temp, helpers.getUnits());
            cast.wind.speed = helpers.transformTemp(cast.wind.speed, helpers.getUnits());
        });


        // update saved weather data
        window.localStorage.weather = JSON.stringify(d);
        window.localStorage.forecast = JSON.stringify(f);

        // render view with values transformed to new units format
        renderWeatherContent(JSON.parse(window.localStorage.weather));
        renderForecastContent(JSON.parse(window.localStorage.forecast));

        //close popup
        popup.close();

        // redraw chart with new format units
        tempChart.series[0].setData(tempForecastArr(),true);

    });

    // move tempChart to selected date
    let forecastDays = document.querySelectorAll('.forecast__item');
    forecastDays.forEach((item) => {
        item.addEventListener('click', function () {
            forecastDays.forEach((day) => {
                day.classList.remove('active');
            });
            this.classList.add('active');
            let counter = JSON.parse(window.localStorage.forecast).list.length - 1;
            let start = this.getAttribute('starttime');
            let end = JSON.parse(window.localStorage.forecast).list[counter].dt;

            if(this.classList.contains('last')){
                tempChart.xAxis[0].setExtremes(start*1000, end*1000);
            } else {
                tempChart.xAxis[0].setExtremes(start*1000, start*1000 + 24*36e5);
            }
        });
    });

};

if (document.readyState === 'complete' || document.readyState !== 'loading') {
    app();
} else {
    document.addEventListener('DOMContentLoaded', app);
}
