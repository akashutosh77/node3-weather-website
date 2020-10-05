const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { response } = require('express');
const app = express();
const port = process.env.PORT || 3000


// Define paths for express config
const publicDirectoryPath = express.static(path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory to server
app.use(publicDirectoryPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ashutosh Kumar'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ashutosh Kumar'
    });
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpMsg: 'This is a help page',
        title: 'help',
        name: 'Ashutosh Kumar'
    });
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address is required'
        })
    }

    geoCode(req.query.address, (error, { latitute, longitute, location } = {}) => {

        if (error) {
            return res.send({
                error: error,
            })
        }
        forecast(latitute, longitute, (error, { forecastData } = {}) => {
            if (error) {
                return res.send({
                    error: error,
                })
            }
            //console.log(location);
            //console.log(weatherDescription + ' it is ' + temperatute + ' degrees. It feels like ' + feelsLike);
            return res.send({ forecast: forecastData, location, address: req.query.address });

        });
    });

})
app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide the search term!!'
        })
    }
    console.log(req.query.search);
    res.send({
        product: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help article not found',
        name: 'Ashutosh Kumar'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page Not Found!!!',
        name: 'Ashutosh Kumar'
    });
})

app.listen(port, () => {
    console.log('Server has started on port ' + port);
})