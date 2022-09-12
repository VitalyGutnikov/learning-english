const time = document.querySelector('.time'); //* вывод времени
const getHoursTime = document.querySelector('.time-hours'); 
const getMinutessTime = document.querySelector('.time-minutes'); 
const getSecondsTime = document.querySelector('.time-seconds'); 
const dateTime = document.querySelector('.date') //* вывод даты

const wordsContainer = document.querySelector('.footer-center-block');
const changeQuote = document.querySelector('.change-quote');
const word = document.querySelector('.word');
const translation = document.querySelector('.translation');

//! time & date start
const datashowDate = ['en-US', 'ru-RU'];
let indexshowDate = 0;

Number.prototype.pad = function(n) {
	for (var r = this.toString(); r.length < n; r = 0 + r);
	return r;
  };

function showTime() {
	const date = new Date();
	let sec = date.getSeconds(),
    	min = date.getMinutes(),
   		hou = date.getHours();
	getHoursTime.textContent = `${hou.pad(2)}`;
	getMinutessTime.textContent = `${min.pad(2)}`;
	getSecondsTime.textContent = `${sec.pad(2)}`;
	showDate();
	setTimeout(showTime, 1000);
  }
  showTime();

  function showDate() {
	const date = new Date();
	const options = {weekday: 'long' ,month: 'long', day: 'numeric'};
	const currentDate = date.toLocaleDateString(`${datashowDate[indexshowDate]}`, options);
	dateTime.textContent = `${currentDate}`;
}
showDate()
//! time & date end

//! local storage start
function setLocalStorage() {
	localStorage.setItem('quoteState', settingsCheckboxQuote.value);
	localStorage.setItem('fullscreenState', settingsCheckboxFullscreen.value);
	localStorage.setItem('language', settingsCheckboxLng.value);
}
  window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {

	if(localStorage.getItem('quoteState')) {
		settingsCheckboxWord.value = localStorage.getItem('quoteState');
		if(settingsCheckboxWord.value === 'on'){
			wordsContainer.style.opacity = '1';
			settingsCheckboxWord.checked = false;
		} else {
			wordsContainer.style.opacity = '0';
			settingsCheckboxWord.checked = true;
			settingsCheckboxWord = false;
		}
	}

	if(localStorage.getItem('fullscreenState')) {
		settingsCheckboxFullscreen.value = localStorage.getItem('fullscreenState');
		if(settingsCheckboxFullscreen.value === 'on'){
			fullscreenOnBtn.style.opacity = '1';
			settingsCheckboxFullscreen.checked = false;
		} else {
			fullscreenOnBtn.style.opacity = '0';
			settingsCheckboxFullscreen.checked = true;
			isChangeCheckboxFullscreen = false;
		}
	}


	if(localStorage.getItem('language')) {
		settingsCheckboxLng.value = localStorage.getItem('language');
		if(settingsCheckboxLng.value === 'en'){
			indexOfLanguage = 1;
			changeSettingsLng.textContent = 'Settings';
			changeTimeLng.textContent = 'Time';
			changeDateLng.textContent = 'Date';
			changeWordsLng.textContent = 'Words';
			changeFullscreenLng.textContent = 'Fullscreen';
			changeLanguageLng.textContent = 'Language';
			indexshowDate = 0;
			
			getQuotes();
		} else {
			indexOfLanguage = 0;
			settingsCheckboxLng.checked = true;
			isChangeCheckboxLng = false;
			changeSettingsLng.textContent = 'Настройки';
			changeTimeLng.textContent = 'Время';
			changeDateLng.textContent = 'Дата';
			changeWordsLng.textContent = 'Слова';
			changeFullscreenLng.textContent = 'Полный экран';
			changeLanguageLng.textContent = 'Язык';
			indexshowDate = 1;
			
			getQuotes();
		}
	}
}
window.addEventListener('load', getLocalStorage)

//! local storage end

//! Words start
let randomNum;
let data;
const getTranslation = document.querySelector('.get-translation');
let isClickButtonTranslation = true;

function getRandomNum() {
	randomNum = Math.random() * 33;
	randomNum = Math.round(randomNum) 
  	return randomNum
} 
getRandomNum()

let indexOfLanguage = 1;
async function getQuotes() {  
	const quotes = 'js/data.json';
	const res = await fetch(quotes);
	data = await res.json(); 
	console.log(data[0])
	let i = randomNum;
	let j = indexOfLanguage;
	word.textContent = data[j][i].text;
	translation.textContent = data[j][i].translation;
	
	return data
  }
  getQuotes();

  function getQuotesNext(){
	randomNum < 33 ? randomNum++ : randomNum = 0;
	console.log(data[0])
	getQuotes()
}
  
  function showHidaTranslation() {
	if(!isClickButtonTranslation) {
		isClickButtonTranslation = true;
		// getTranslation.textContent = 'Show translation';
		getTranslation.classList.toggle('get-translation-hide')
		// data[0].push({text: 'hello', translation: 'привет'})
		console.log(data[0])
		translation.style.opacity = '0';
		settingsCheckboxTime.value = 'on';
  	} else {
		isClickButtonTranslation = false;
		// getTranslation.textContent = 'Hide translation';
		getTranslation.classList.toggle('get-translation-hide')
		translation.style.opacity = '1';
		settingsCheckboxTime.value = 'off';
  	}	
  }

	changeQuote.addEventListener('click', getQuotesNext)
	getTranslation.addEventListener('click', showHidaTranslation)

//! Words end

//!settings start
const settingsBtn = document.querySelector('.settings');
const settingsCloseBtn = document.querySelector('.modal-close');
const modalSettings = document.querySelector('.settings-section');
const settingsBackgroundClosed = document.querySelector('.settings-bg-closed')
const containerSettings = document.querySelector('.modal-container');
const settingsCheckboxTime = document.querySelector('.checkbox-time');
const settingsCheckboxDate = document.querySelector('.checkbox-date');
const settingsCheckboxWord = document.querySelector('.checkbox-word');
const settingsCheckboxFullscreen = document.querySelector('.checkbox-fullscreen');
const fullscreenOnBtn = document.querySelector('.fullscreen-button');
const settingsCheckboxLng = document.querySelector('.checkbox-lng');
let isOpenModal = false;
let isChangeCheckboxtime = true;
let isChangeCheckboxDate = true;
let isChangeCheckboxWord= true;
let isChangeCheckboxFullscreen = true;
let isChangeCheckboxLng = true;

function openModalSettings () {
	if(!isOpenModal) {
		isOpenModal = true;
		modalSettings.style.zIndex = '4';
		settingsBackgroundClosed.style.zIndex = '0';
		settingsBackgroundClosed.style.background = 'rgba(0, 0, 0, 0.5)';
		containerSettings.style.opacity = '1';
		containerSettings.style.zIndex = '6';
		settingsBtn.style.zIndex = '6';
  	} else {
		isOpenModal = false;
		modalSettings.style.zIndex = '-2';
		settingsBackgroundClosed.style.zIndex = '-2';
		settingsBackgroundClosed.style.background = 'none';
		containerSettings.style.zIndex = '-2';
		containerSettings.style.opacity = '0';
  	}	
}
function closeModalSettings () {
	isOpenModal = false;
	modalSettings.style.zIndex = '-2';
	settingsBackgroundClosed.style.zIndex = '-2';
	settingsBackgroundClosed.style.background = 'none';
	containerSettings.style.zIndex = '-2';
	containerSettings.style.opacity = '0';
}
settingsBtn.addEventListener('click', openModalSettings);
settingsCloseBtn.addEventListener('click', closeModalSettings);
settingsBackgroundClosed.addEventListener('click', closeModalSettings);

//*time Container
function openCloseCheckBoxTime () {
	if(!isChangeCheckboxtime) {
		isChangeCheckboxtime = true;
		time.style.opacity = '1';
		settingsCheckboxTime.value = 'on';
  	} else {
		isChangeCheckboxtime = false;
		time.style.opacity = '0';
		settingsCheckboxTime.value = 'off';
  	}	
}
settingsCheckboxTime.addEventListener('click', openCloseCheckBoxTime);

//*date Container
function openCloseCheckBoxDate () {
	if(!isChangeCheckboxDate) {
		isChangeCheckboxDate = true;
		dateTime.style.opacity = '1';
		settingsCheckboxDate.value = 'on';
  	} else {
		isChangeCheckboxDate = false;
		dateTime.style.opacity = '0';
		settingsCheckboxDate.value = 'off';
  	}	
}
settingsCheckboxDate.addEventListener('click', openCloseCheckBoxDate);

//*Word Container
function openCloseCheckBoxWord () {
	if(!isChangeCheckboxWord) {
		isChangeCheckboxWord = true;
		wordsContainer.style.opacity = '1';
		settingsCheckboxWord.value = 'on';
  	} else {
		isChangeCheckboxWord = false;
		wordsContainer.style.opacity = '0';
		settingsCheckboxWord.value = 'off';
  	}	
}
settingsCheckboxWord.addEventListener('click', openCloseCheckBoxWord);

//* fullscreen Container
function openCloseCheckBoxFullscreen () {
	if(!isChangeCheckboxFullscreen) {
		isChangeCheckboxFullscreen = true;
		fullscreenOnBtn.style.opacity = '1';
		settingsCheckboxFullscreen.value = 'on';
  	} else {
		isChangeCheckboxFullscreen = false;
		fullscreenOnBtn.style.opacity = '0';
		settingsCheckboxFullscreen.value = 'off';
  	}	
}
settingsCheckboxFullscreen.addEventListener('click', openCloseCheckBoxFullscreen);

const changeSettingsLng = document.querySelector('.lng-settings');
const changeTimeLng = document.querySelector('.lng-time');
const changeDateLng = document.querySelector('.lng-date');
const changeWordsLng = document.querySelector('.lng-words');
const changeFullscreenLng = document.querySelector('.lng-fullscreen');
const changeLanguageLng = document.querySelector('.lng-language');

//* language Container
function openCloseCheckBoxLng () {
	if(!isChangeCheckboxLng) {
		isChangeCheckboxLng = true;
		settingsCheckboxLng.value = 'en';

		indexshowDate = 0;
		indexOfLanguage = 1;

		changeSettingsLng.textContent = 'Settings';
		changeTimeLng.textContent = 'Time';
		changeDateLng.textContent = 'Date';
		changeWordsLng.textContent = 'Words';
		changeFullscreenLng.textContent = 'Fullscreen';
		changeLanguageLng.textContent = 'Language';

		getQuotes();
  	} else {
		isChangeCheckboxLng = false;
		settingsCheckboxLng.value = 'ru';

		indexshowDate = 1;
		indexOfLanguage = 0;

		changeSettingsLng.textContent = 'Настройки';
		changeTimeLng.textContent = 'Время';
		changeDateLng.textContent = 'Дата';
		changeWordsLng.textContent = 'Слова';
		changeFullscreenLng.textContent = 'Полный экран';
		changeLanguageLng.textContent = 'Язык';

		getQuotes();
  	}	
}
settingsCheckboxLng.addEventListener('click', openCloseCheckBoxLng);

const lngRuBtn = document.querySelector('.lng-btn-ru');
const lngEnBtn = document.querySelector('.lng-btn-en');

lngRuBtn.addEventListener('click', () => {
	settingsCheckboxLng.checked = true;
	settingsCheckboxLng.value = 'ru';
	if (isChangeCheckboxLng === true){
		openCloseCheckBoxLng ()
	}
});

lngEnBtn.addEventListener('click', () => {
	settingsCheckboxLng.checked = false;
	settingsCheckboxLng.value = 'en';
	if (!isChangeCheckboxLng){
		openCloseCheckBoxLng ()
	}
});

//! settings end

document.addEventListener('click', function (event) {

//* fullscreen container
	// Игнорируем клики, которые не относятся к нашей кнопке
	if (!event.target.hasAttribute('data-fullscreen')) return;

	if (document.fullscreenElement) {
		fullscreenOnBtn.classList.remove('fullscreen-button-off');
	  document.exitFullscreen();
	} else {
		fullscreenOnBtn.classList.add('fullscreen-button-off');
	  document.documentElement.requestFullscreen();
	}
  }, false);
