(() => {
    // Create promise with fetch weather for Lviv city
    const promise = new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=LVIV&units=metric&APPID=5d066958a60d315387d9492393935c19');
            if(response) {
                resolve(response.json());
            };    
        } catch (error) {
            reject(error);
        };
    });

    promise
        .then(data => showWeather(data))
        .catch(error => console.log(error));

    // In case of success response create card with data and put it to DOM
    function showWeather (data) {
        const weatherCard = document.createElement('div');
        weatherCard.classList.add('weatherCard');
        weatherCard.innerHTML = createCard(data);
        document.querySelector('.result').appendChild(weatherCard);
    }; 

    function createCard (data) {
        // Get icon with weather description using fetch
       getIcon(data.weather[0].icon);
        // Create innerHTML for weather card
        return (
            `<div class="weatherCard">
                <div class="title">
                    <h2 class="city">${data.name}</h2>
                </div>
                <p>Температура повітря: ${data.main.temp}&deg;</p>
                <p>Тиск: ${data.main.pressure} hPa</p>
                <p>Опис: ${data.weather[0].description}</p>
                <p>Вологість повітря: ${data.main.humidity} %</p>
                <p>Швидкість вітру: ${data.wind.speed} m/s</p>
                <p>Напрям вітру: ${data.wind.deg} degrees</p>
             </div>`
        );
    }

    function getIcon (number) {
        const promise = new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`http://openweathermap.org/img/w/${number}.png`);
                if(response) {
                    resolve(response.blob());
                };    
            } catch (error) {
                reject(error);
            };
        });
        // Put icon to DOM
        promise
            .then(data => {
                const url = URL.createObjectURL(data);
                const icon = document.createElement('img');
                icon.classList.add('icon');
                icon.src = url;
                document.querySelector('.title').appendChild(icon);
            })
            .catch(error => console.log(error));
    }
})();