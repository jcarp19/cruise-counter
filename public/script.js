const times = [
  { index: "flight", date: new Date("2024/03/15 10:06") },
  { index: "hotel", date: new Date("2024/03/15 14:00") },
  { index: "checkin", date: new Date("2024/03/16 10:30") },
  { index: "cruise", date: new Date("2024/03/16 16:30") },
  { index: "counter", date: new Date("2024/03/16 16:30") },
];

var timer;

const updateCounter = () => {
  times.forEach((e) => {
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var _year = _day * 365;

    var now = new Date();
    var distance = e.date - now;
    if (distance < 0) {
      clearInterval(timer);
      document.getElementById(`${e.index}-countdown`).innerHTML =
        "Enjoy the cruise!";

      return;
    }

    var years = Math.floor(distance / _year);
    var days = Math.floor((distance % _year) / _day);
    var hours = Math.floor((distance % _day) / _hour);
    var minutes = Math.floor((distance % _hour) / _minute);
    var seconds = Math.floor((distance % _minute) / _second);

    document.getElementById(`${e.index}-days`).innerHTML = days;
    document.getElementById(`${e.index}-days`).innerHTML = days;
    document.getElementById(`${e.index}-hours`).innerHTML = hours;
    document.getElementById(`${e.index}-minutes`).innerHTML = minutes;
    document.getElementById(`${e.index}-seconds`).innerHTML = seconds;
  });
};
timer = setInterval(updateCounter, 1000);

// GET WEATHER DATA
const locations = [
  { index: "rom", city: "Romulus", lat: 42.2221, lon: -83.395 },
  { index: "ftl", city: "Fort Lauderdale", lat: 26.1002, lon: -80.1268 },
  { index: "pte", city: "Port Everglades", lat: 26.0872, lon: -80.1205 },
  { index: "cay", city: "CoCo Cay", lat: 25.8203, lon: -77.9378 },
  { index: "ora", city: "Oranjestad", lat: 12.5238, lon: -70.0362 },
  { index: "wil", city: "Wilemstad", lat: 12.1052, lon: -68.9333 },
];

const apiURL = "https://api.openweathermap.org/data/3.0/onecall?";
const myKey = "e76129712c8e55a552d1aec830ff1ac0";

// WEATHER
locations.map((loc) => {
  fetch(
    `${apiURL}lat=${loc.lat}&lon=${loc.lon}&appid=${myKey}&units=imperial&exclude=minutely,hourly,alerts`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("The response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const temperture = Math.round(data.current.temp);
      const condition = data.current.weather[0].description;
      const highTemp = Math.round(data.daily[0].temp.max);
      const lowTemp = Math.round(data.daily[0].temp.min);
      const icon = data.current.weather[0].icon;
      // console.log(data);
      document.getElementById(
        `${loc.index}-weather`
      ).innerHTML = `<div class="card__weather-location">
      <div class="card__weather-temp">${temperture}<span class="sm-text">°</span></div>
      <!-- <div class="card__weather-icon"><img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather conditions icon" /></div> -->
      <div class="card__weather-city-cond-wrap">
        <div class="card__weather-city">${loc.city}</div>
        <div class="card__weather-cond">${condition}</div>
      </div>
        <div class="card__weather-high-low-wrap"><p>H: ${highTemp}°</p><p>L: ${lowTemp}°</p></div>
        </div>`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
