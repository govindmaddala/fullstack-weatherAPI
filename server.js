const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const http = require('https');
const path = require('path')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,"/build")))
app.use(express.json())
app.use(cors());

app.post('/weather', async (req, res) => {
    const { cityName } = req.body;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a80e09962afb6bcde440998015cb5721&units=metric`;
    if (cityName === "" || cityName === null || cityName === undefined) {
        return res.status(400).json({ success: false, message: "Enter city name" })
    }
    var weatherReport;
    http.get(url, (response) => {
        response.on('data', (data) => {
            weatherReport = JSON.parse(data);
            return res.status(200).json({ success: true, reportData: weatherReport })
        })
    })
})

const port = process.env.PORT || 5000;

app.listen(port)