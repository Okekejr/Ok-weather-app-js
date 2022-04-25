// Javascript code goes here

// Elements
const temp = document.querySelector(".temp");
const timezone = document.querySelector(".timeZone");
const todayIcon = document.querySelector(".todayIcon");
const iconText = document.querySelector(".iconText");
const feelsLike = document.querySelector(".feelsLike");
const humidity = document.querySelector(".humidity");
const background = document.getElementById("cover");
const form = document.querySelector("form");
const inputForm = document.querySelector(".input-form");

// Day1 elements
const day1 = document.querySelector(".day1");
const dayOneTemp = document.querySelector(".day1Temp");
const nightOneTemp = document.querySelector(".night1Temp");
const iconDayOne = document.querySelector(".day1Icon");

// Day2 Elements
const day2 = document.querySelector(".day2");
const dayTwoTemp = document.querySelector(".day2Temp");
const nightTwoTemp = document.querySelector(".night2Temp");
const iconDayTwo = document.querySelector(".day2Icon");

// Day3 Elements
const day3 = document.querySelector(".day3");
const dayThreeTemp = document.querySelector(".day3Temp");
const nightThreeTemp = document.querySelector(".night3Temp");
const iconDayThree = document.querySelector(".day3Icon");

// Day4 Elements
const day4 = document.querySelector(".day4");
const dayFourTemp = document.querySelector(".day4Temp");
const nightFourTemp = document.querySelector(".night4Temp");
const iconDayFour = document.querySelector(".day4Icon");

// Day5 Elements
const day5 = document.querySelector(".day5");
const dayFiveTemp = document.querySelector(".day5Temp");
const nightFiveTemp = document.querySelector(".night5Temp");
const iconDayFive = document.querySelector(".day5Icon");

// Day6 Elements
const day6 = document.querySelector(".day6");
const daySixTemp = document.querySelector(".day6Temp");
const nightSixTemp = document.querySelector(".night6Temp");
const iconDaySix = document.querySelector(".day6Icon");

// Day7 Elements
const day7 = document.querySelector(".day7");
const daySevenTemp = document.querySelector(".day7Temp");
const nightSevenTemp = document.querySelector(".night7Temp");
const iconDaySeven = document.querySelector(".day7Icon");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const cities = inputForm.value;

  const search = async function (city) {
    // using gecoding to get latitude and longitude coordinates
    const location = await fetch(`https://geocode.xyz/${city}?json=1`);
    const cords = await location.json();
    const latitude = cords.latt;
    const longitude = cords.longt;

    //   requesting data from API using promises
    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutelyweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&units=metric&appid=80a892b16dd01568415e7239894b5f58`
    );
    const data = weatherData.json();
    const printData = await data;
    console.log(printData);
    dataMani(printData);
  };

  search(cities);

  // clear input field after request
  inputForm.value = "";
});

const iconsAndImages = function (datas) {
  const icon = datas.weather[0].main;
  iconText.textContent = icon;
  if (icon == "Clouds") {
    todayIcon.src = "cloudy.svg";
    background.style.backgroundImage = "url(cloudyBackground.jpg)";
  }
  if (icon == "Rain") {
    todayIcon.src = "rainy.svg";
    background.style.backgroundImage = "url(rainyBackground.jpg)";
  }
  if (icon == "Clear") {
    todayIcon.src = "day.svg";
    background.style.backgroundImage = "url(clearBackground.jpg)";
  }
  if (icon == "Thunderstorm") {
    todayIcon.src = "thunder.svg";
    background.style.backgroundImage = "url(thunderBackground.jpg)";
  }
};

const dailyWeather = function (data, day, night, icon) {
  const day1 = data;
  const weather = day1.weather[0].main;
  const dayilyTemp = day1.temp;
  const tempDay = Math.round(Object.values(dayilyTemp)[0]);
  const tempNight = Math.round(Object.values(dayilyTemp)[5]);

  // update UI depending on day
  day.innerHTML = `${tempDay}°c`;
  night.innerHTML = `${tempNight}°c`;
  if (weather == "Clouds") {
    icon.src = "cloudy.svg";
  }
  if (weather == "Rain") {
    icon.src = "rainy.svg";
  }
  if (weather == "Clear") {
    icon.src = "day.svg";
  }
  if (weather == "Thunderstorm") {
    icon.src = "thunder.svg";
  }
};

const whatDay = function (data) {
  // extracting date stamps in UnixTime stamp from API
  const dt = data.dt;
  console.log(dt);

  // generate todays date
  const now = new Date();

  // converting todays date to unixTimestamp
  const nowdt = Math.round(+now.getTime() / 1000);

  // converting UnixTime stamp to milliseconds and then actual date format
  const dateObject = new Date(+dt * 1000);
  const day = dateObject.toLocaleString("en-US", { weekday: "short" });
  const date = dateObject.toLocaleString("en-US", { day: "numeric" });

  // calculate days ahead
  const calcDay = Math.round(Math.abs(+nowdt - +dt) / (60 * 60 * 24));
  console.log(calcDay);

  if (calcDay === 1) {
    day1.innerHTML = "Tomorrow";
  }
  if (calcDay === 2) {
    day2.innerHTML = `${day} ${date}`;
  }
  if (calcDay === 3) {
    day3.innerHTML = `${day} ${date}`;
  }
  if (calcDay === 4) {
    day4.innerHTML = `${day} ${date}`;
  }
  if (calcDay === 5) {
    day5.innerHTML = `${day} ${date}`;
  }
  if (calcDay === 6) {
    day6.innerHTML = `${day} ${date}`;
  }
  if (calcDay === 7) {
    day7.innerHTML = `${day} ${date}`;
  }
};

const dataMani = async function (data) {
  // Current Weather display
  const today = await data.current;
  //   extracting temperature
  const todayy = today.temp.toFixed(0);
  //   extracting feels-like
  const feelslike = today.feels_like.toFixed(0);

  //   temprature display
  temp.innerHTML = `${todayy}°c`;
  //   timezone display
  timezone.innerHTML = `Timezone : ${data.timezone}`;
  //   Feels-like and humidity
  feelsLike.innerHTML = `Feels like ${feelslike}°c`;
  humidity.innerHTML = `Humidity ${today.humidity}%`;

  //   updating icons and images
  iconsAndImages(today);

  //   <--- Daily display --->
  const daily = await data.daily;

  // Day 1
  dailyWeather(daily[1], dayOneTemp, nightOneTemp, iconDayOne);
  // Update Dates
  whatDay(daily[1]);

  // Day 2
  dailyWeather(daily[2], dayTwoTemp, nightTwoTemp, iconDayTwo);
  // Update Dates
  whatDay(daily[2]);

  // Day 3
  dailyWeather(daily[3], dayThreeTemp, nightThreeTemp, iconDayThree);
  // Update Dates
  whatDay(daily[3]);

  // Day 4
  dailyWeather(daily[4], dayFourTemp, nightFourTemp, iconDayFour);
  // Update Dates
  whatDay(daily[4]);

  // Day 5
  dailyWeather(daily[5], dayFiveTemp, nightFiveTemp, iconDayFive);
  // Update Dates
  whatDay(daily[5]);

  // Day 6
  dailyWeather(daily[6], daySixTemp, nightSixTemp, iconDaySix);
  // Update Dates
  whatDay(daily[6]);

  // Day 7
  dailyWeather(daily[7], daySevenTemp, nightSevenTemp, iconDaySeven);
  // Update Dates
  whatDay(daily[7]);
};
