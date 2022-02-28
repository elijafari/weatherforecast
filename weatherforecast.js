
const form = document.querySelector(".header-section form");
const input = document.querySelector(".header-section input");
const msg = document.querySelector(".header-section .msg");
const list = document.querySelector(".result-section .cities")
const apiKey = "//put your key here";
window.onload = init();
form.addEventListener("submit", e => {
    e.preventDefault();
    const inputCity = input.value;
    loadWeatherForecast(inputCity);
});

function loadWeatherForecast(inputCity) {
const listItems = list.querySelectorAll(".result-section .city");

//result here
const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`;

fetch(url).then(response => 
    response.json())
    .then(data => {
    const { main, name, sys, weather, wind } = data;
    const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
    const li = document.createElement("li");
    li.classList.add("city");
    const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <div class="city-wind">Wind speed ${Math.round(wind.speed)}</div>
        <figure>
        <img class="city-icon" src=${icon} alt=${weather[0]["main"]} >
        <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
    `;
    li.innerHTML = markup;
    list.prepend(li);
    })
    .catch(() => {
    msg.textContent = "Please enter a valid city! 👻";
});

msg.textContent = "";
form.reset();
};

function init(){
    loadWeatherForecast("Vancouver");
}
