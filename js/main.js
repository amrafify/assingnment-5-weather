let data = {};
let searchInput = document.querySelector("#input-search");
let latitude = "";

const successCallback = (position) => {
  loca = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
  console.log(loca);
  latitude = loca.latitude;
  longitude = loca.longitude;
  getWeather(`${latitude},${longitude}`);
};
const errorCallback = (error) => {
  console.log(error);
};
console.log(latitude);
navigator.geolocation.getCurrentPosition(successCallback);
async function getWeather(location = "alex") {
  let myReq = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=9cd0c1c4a7d949e6a5802914240801&q=${location}&days=3`
  );
  data = await myReq.json();
  display();
}
getWeather();
function display() {
  let windDir = data.current.wind_dir;
  // لكتابه اسم اليوم و اسم الشهر
  const dateToDay = new Date(data.forecast.forecastday[0].date);
  const dateTomw = new Date(data.forecast.forecastday[1].date);
  const dateThird = new Date(data.forecast.forecastday[2].date);
  const dateD = new Date(data.forecast.forecastday[0].date);
  const options = { weekday: "long" };
  const optionsD = { day: "numeric", month: "long" };
  const dayName = dateToDay.toLocaleDateString("en-US", options);
  const dayNameTomo = dateTomw.toLocaleDateString("en-US", options);
  const dayName3th = dateThird.toLocaleDateString("en-US", options);
  const dayDateName = dateD.toLocaleDateString("en-US", optionsD);
  //
  let temp = `<div class="col-md-4">
  <div>
    <div class="today d-flex w-100 justify-content-between p-1">
      <h6 class="day">${dayName}</h6>
      <h6 class="date">${dayDateName}</h6>
    </div>
    <div class="today-det p-4 h-100">
      <div class="loction text-white h3">${data.location.name}</div>
      <div class="loction text-white">${data.location.country}</div>
      <div
        class="degree d-flex align-items-center justify-content-around"
      >
        <h2>${data.current.temp_c}<sup>o</sup>C</h2>
        <div class="icon">
          <img src='${data.current.condition.icon}' alt='${
    data.current.condition.text
  }'/>
        </div>
      </div>
      <div class="coustm mb-3">
        <h6 class="text-primary">${data.current.condition.text}</h6>
      </div>
      <span>
        <img
          src="img/icon-umberella@2x.png"
          width="21"
          height="21"
        />
        ${data.forecast.forecastday[0].day.daily_chance_of_rain}%
      </span>
      <span>
        <img
          src="img/icon-wind@2x.png"
          width="23"
          height="21"
        />
        ${data.current.wind_kph}km/h
      </span>
      <span>
        <img
          src="img/icon-compass@2x.png"
          width="21"
          height="21"
        />
        ${
          windDir == "N"
            ? "North"
            : windDir == "NNE"
            ? "North-Northeast	"
            : windDir == "NE"
            ? "Northeast"
            : windDir == "ENE"
            ? "East-Northeast"
            : windDir == "E"
            ? "East"
            : windDir == "ESE"
            ? "East-Southeast"
            : windDir == "SE"
            ? "Southeast"
            : windDir == "SSE"
            ? "South-Southeast"
            : windDir == "S"
            ? "South"
            : windDir == "SSW"
            ? "South-Southwest"
            : windDir == "SW"
            ? "Southwest"
            : windDir == "WSW"
            ? "West-Southwest"
            : windDir == "W"
            ? "West"
            : windDir == "WNW"
            ? "West-Northwest"
            : windDir == "NW"
            ? "Northwest"
            : windDir == "NNW"
            ? "North-Northwest"
            : windDir == "N"
            ? "North"
            : windDir
        }
      </span>
    </div>
  </div>
</div>
<div class="col-md-4">
  <div>
    <div class="dayDiv d-flex w-100 justify-content-center p-1">
      <h6 class="day">${dayNameTomo}</h6>
    </div>
    <div class="day-det h-100 p-5">
      <div class="text-center">
        <img src='${data.forecast.forecastday[1].day.condition.icon}' alt='${
    data.forecast.forecastday[1].day.condition.text
  }'/>
      </div>
      <div class="degree text-center m-4">
        <h3 class="text-white">${
          data.forecast.forecastday[1].day.maxtemp_c
        }<sup>o</sup>C</h3>
      </div>
      <div class="degree-small text-center m-3">
        <h6 class="text-white">${
          data.forecast.forecastday[1].day.mintemp_c
        }<sup>o</sup>C</h6>
      </div>
      <div class="coustm text-center mb-2">
        <h6 class="text-primary">${
          data.forecast.forecastday[1].day.condition.text
        }</h6>
      </div>
    </div>
  </div>
</div>
<div class="col-md-4">
  <div>
    <div class="today d-flex w-100 justify-content-center p-1">
      <h6 class="day">${dayName3th}</h6>
    </div>
    <div class="today-det h-100 p-5">
      <div class="text-center">
      <img src='${data.forecast.forecastday[2].day.condition.icon}' alt='${
    data.forecast.forecastday[2].day.condition.text
  }'/>
      </div>
      <div class="degree text-center m-4">
        <h3 class="text-white">${
          data.forecast.forecastday[2].day.maxtemp_c
        }<sup>o</sup>C</h3>
      </div>
      <div class="degree-small text-center m-3">
        <h6 class="text-white">${
          data.forecast.forecastday[2].day.mintemp_c
        }<sup>o</sup>C</h6>
      </div>
      <div class="coustm text-center mb-2">
        <h6 class="text-primary">${
          data.forecast.forecastday[2].day.condition.text
        }</h6>
      </div>
    </div>
  </div>
</div>`;

  document.querySelector("#myData").innerHTML = temp;
}
searchInput.addEventListener("change", () => {
  getWeather(searchInput.value);
});
