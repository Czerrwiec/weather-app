const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';

const API_KEY = '&appid=56cc15ea412dde439e138982af15aca1';

const API_UNITS = '&units=metric';

Number.prototype.between = function (a, b) {
	let min = Math.min.apply(Math, [a, b]),
		max = Math.max.apply(Math, [a, b]);
	return this >= min && this <= max;
};

const enterKey = (e) => {
	if (e.key === 'Enter') {
		getWeather();
	}
};

const getWeather = () => {
	const city = input.value || 'Wągrowiec';
	const URL = API_LINK + city + API_KEY + API_UNITS;

	axios
		.get(URL)
		.then((res) => {
			const temp = res.data.main.temp;
			const hum = res.data.main.humidity;
			const status = Object.assign({}, ...res.data.weather);

			cityName.textContent = res.data.name;
			temperature.textContent = Math.floor(temp) + '°C';
			humidity.textContent = hum + '%';
			weather.textContent = status.main;

			warning.textContent = '';
			input.value = '';

			if (status.id.between(200, 232)) {
				photo.setAttribute('src', '.img/thunderstorm.png');
			} else if (status.id.between(300, 321)) {
				photo.setAttribute('src', './img/drizzle.png');
			} else if (status.id.between(500, 531)) {
				photo.setAttribute('src', './img/rain.png');
			} else if (status.id.between(600, 622)) {
				photo.setAttribute('src', './img/ice.png');
			} else if (status.id.between(700, 781)) {
				photo.setAttribute('src', './img/fog.png');
			} else if (status.id.between(801, 804)) {
				photo.setAttribute('src', './img/cloud.png');
			} else if (status.id === 800) {
				photo.setAttribute('src', './img/sun.png');
			}
		})
		.catch(() => (warning.textContent = 'Wpisz poprawną nazwę miasta!'));
};

getWeather();

button.addEventListener('click', getWeather);
input.addEventListener('keyup', enterKey);
