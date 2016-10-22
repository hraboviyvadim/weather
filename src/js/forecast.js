import {getUnits, transformUnits, convertDate, weekday} from './helpers';

// get array of temperature values
export const tempForecastArr = () => {
    let arr = JSON.parse(window.localStorage.forecast).list;
    let tempArr = [];

    arr.forEach((item) => {
        tempArr.push(Math.floor(item.main.temp*10)/10);
    });

    return tempArr;
};

const getMaxOfArray = (numArray) => {
    return Math.max.apply(null, numArray);
};
const getMinOfArray = (numArray) => {
    return Math.min.apply(null, numArray);
};

export const dailyForecast = () => {
    let arr = JSON.parse(window.localStorage.forecast).list;

    let today = new Date();
    let todayYear = today.getFullYear();
    let todayMonth = today.getMonth();
    let todayDate = today.getDate();

    let day1 = new Date(todayYear, todayMonth, todayDate + 1).getDate();
    let day2 = new Date(todayYear, todayMonth, todayDate + 2).getDate();
    let day3 = new Date(todayYear, todayMonth, todayDate + 3).getDate();
    let day4 = new Date(todayYear, todayMonth, todayDate + 4).getDate();

    let todayForecast = [];
    let day1Forecast = [];
    let day2Forecast = [];
    let day3Forecast = [];
    let day4Forecast = [];

    arr.forEach((item) => {
        let date = convertDate(item.dt).getUTCDate();
        switch(date) {
            case todayDate:
                todayForecast.push(item);
                break;
            case day1:
                day1Forecast.push(item);
                break;
            case day2:
                day2Forecast.push(item);
                break;
            case day3:
                day3Forecast.push(item);
                break;
            case day4:
                day4Forecast.push(item);
                break;
        }
    });

    const getDailyTempArr = (arr) => {
        let result = [];
        arr.forEach((item) => {
            result.push(item.main.temp);
        });
        return result;
    };
    const getDailyIcon = (arr) => {
        let n = Math.floor(arr.length / 2);
        return arr[n].weather[0].icon;
    };
    const getWeekday = (arr) => {
        return weekday(arr[0].dt*1000);
    };

    return [
        {
            day: getWeekday(todayForecast),
            icon: getDailyIcon(todayForecast),
            max: getMaxOfArray(getDailyTempArr(todayForecast)),
            min: getMinOfArray(getDailyTempArr(todayForecast)),
            startPoint: todayForecast[0].dt
        },
        {
            day: getWeekday(day1Forecast),
            icon: getDailyIcon(day1Forecast),
            max: getMaxOfArray(getDailyTempArr(day1Forecast)),
            min: getMinOfArray(getDailyTempArr(day1Forecast)),
            startPoint: day1Forecast[0].dt
        },
        {
            day: getWeekday(day2Forecast),
            icon: getDailyIcon(day2Forecast),
            max: getMaxOfArray(getDailyTempArr(day2Forecast)),
            min: getMinOfArray(getDailyTempArr(day2Forecast)),
            startPoint: day2Forecast[0].dt
        },
        {
            day: getWeekday(day3Forecast),
            icon: getDailyIcon(day3Forecast),
            max: getMaxOfArray(getDailyTempArr(day3Forecast)),
            min: getMinOfArray(getDailyTempArr(day3Forecast)),
            startPoint: day3Forecast[0].dt
        },
        {
            day: getWeekday(day4Forecast),
            icon: getDailyIcon(day4Forecast),
            max: getMaxOfArray(getDailyTempArr(day4Forecast)),
            min: getMinOfArray(getDailyTempArr(day4Forecast)),
            startPoint: day4Forecast[0].dt
        }
    ];
};


// render forecast

export const renderForecastContent = (data) => {

    let arr = dailyForecast();

    let tempUnit = transformUnits(getUnits()).tempUnits;
    let speedUnit = transformUnits(getUnits()).speedUnits;

    let item = document.querySelectorAll('.forecast__item');
    let maxBox = document.querySelectorAll('.forecast__maxtemp');
    let minBox = document.querySelectorAll('.forecast__mintemp');
    let iconBox = document.querySelectorAll('.forecast__icon');
    let dayBox = document.querySelectorAll('.forecast__day');

    for (let i = 0; i < arr.length; i++) {
        item[i].setAttribute('starttime', arr[i].startPoint);
        maxBox[i].textContent = `${Math.round(arr[i].max)} ${tempUnit}`;
        minBox[i].textContent = `${Math.round(arr[i].min)} ${tempUnit}`;
        iconBox[i].innerHTML = `<img src="http://openweathermap.org/img/w/${arr[i].icon}.png">`;
        dayBox[i].textContent = arr[i].day;
    }

};