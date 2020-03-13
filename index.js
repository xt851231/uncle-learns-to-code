const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
const app = express();
app.listen(3000, () => console.log('listending at port 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        response.json(data);
        //console.log(data_json.body);
    })
}
)

app.post('/api', (request, response) => {
    const data = request.body;
    const timeStamp = Date.now();
    data.timeStamp = timeStamp;
    database.insert(data);
})

app.get('/weather/:latlon', async (request, response) => {
    console.log(request.params);
    const latlon = request.params.latlon.split(',');
    console.log(latlon);
    const lat = latlon[0];
    const lon = latlon[1];
    const api_url = `https://api.darksky.net/forecast/4631ea146a47b3a523b72c4f251139fe/${lat},${lon}`;
    const weatherInfo = await fetch(api_url);
    const json = await weatherInfo.json();


    const aq_api_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
    const apInfo = await fetch(aq_api_url);
    const aq_json = await apInfo.json();

    const data = {
        weatherData: json,
        aqData: aq_json

    }

    response.json(data);
}
)