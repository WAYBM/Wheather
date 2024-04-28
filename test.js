const accessKey = 'ba2b8be9-6adf-49c9-9958-b30429baddf0';

const headers = {
    'X-Yandex-Weather-Key': accessKey
};

fetch('https://api.weather.yandex.ru/v2/forecast?lat=52.37125&lon=4.89388', { headers })
    .then(response => response.json())
    .then(json => console.log(json));