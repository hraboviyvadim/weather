// render weather block
import config from './config';
import {currentFullDate, windDirection, hidePreloader, getUnits, transformUnits} from './helpers';



export const renderWeatherContent = (data) => {

    let tempUnit = transformUnits(getUnits()).tempUnits;
    let tempValue = Math.floor(data.main.temp);

    let speedUnit = transformUnits(getUnits()).speedUnits;
    let speedValue = data.wind.speed;

    config.weather.cityBox.textContent =  data.name;
    config.weather.descrBox.textContent = data.weather[0].description;
    config.weather.tempBox.textContent = `${tempValue} ${tempUnit}`;
    config.weather.countryBox.textContent = data.sys.country;
    config.weather.timeBox.textContent = currentFullDate();
    config.weather.windSpeed.textContent = `${speedValue} ${speedUnit}`;
    config.weather.windDir.textContent = windDirection(data.wind.deg);
    config.weather.pressureBox.textContent = Math.floor(+data.main.pressure * 0.750061561303);
    config.weather.humidityBox.textContent = data.main.humidity;
    config.weather.iconBox.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`;

    hidePreloader();

};