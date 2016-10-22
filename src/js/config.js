// config params and constants here

export default {
    openWeatherApi: `5483fa158981965c27b5dd39ed5074df`,
    notAllowedMsg: {
        className: `not-allowed`,
        text: `Unfortunally, magic outside the Hogwarts isn't allowed so we can't show your local weather without permision to track your location. Alternatively, you can enter your current position into search field above.`
    },
    notSupportedMsg: {
        className: `not-supported`,
        text: `Unfortunally, your browser doesn't support geolocation, but you can enter your current position into search field`
    },
    errorLocationMsg: {
        className: `error`,
        text: `geolocation error occurred, try again later`
    },
    errorZipMsg: {
        className: `error`,
        text: `Error occurred, please, check entered Zip code`
    },
    errorCityMsg: {
        className: `error`,
        text: `Error occurred, please, check entered city name`
    },
    errorCoordsMsg: {
        className: `error`,
        text: `Error occurred, please, check entered coordinates`
    },
    days: [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`],
    months: [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`],
    windDirections: [`North`, `North-northeast`, `Northeast`, `East-northeast`, `East`, `East-southeast`, `Southeast`, `South-southeast`, `South`, `South-southwest`, `Southwest`, `West-southewest`, `West`, `West-northwest`, `Northwest`, `North-northwest`],
    weather: {
        cityBox: document.getElementById('city'),
        descrBox: document.getElementById('weatherDescr'),
        tempBox: document.getElementById('temperature'),
        countryBox: document.getElementById('country'),
        timeBox: document.getElementById('time'),
        windSpeed: document.getElementById('weatherWindSpeed'),
        windDir: document.getElementById('weatherWindDirection'),
        pressureBox: document.getElementById('weatherPressure'),
        humidityBox: document.getElementById('weatherHumidity'),
        iconBox: document.getElementById('weatherIcon')
    },
    forecast: {
           
    },
    unitsSelect: document.getElementById('unitsFormat'),
    tempChart: document.getElementById('temp-chart')
};