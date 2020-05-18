const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Charlie Coleman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Charlie Coleman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Thank you for visiting the help page',
        name: 'Charlie Coleman'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({error})
        } 
        forecast(latitude, longtitude, (error, forecastdata) => {
        if (error) {
            return res.send({error})
        }
        return res.send({
                address: req.query.address,
                location,
                forecast: forecastdata
        })
    })
})
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        errorMessage: 'Help Page Not Found',
        name: 'Charlie Coleman'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        errorMessage: 'This page has not been found',
        name: 'Charlie Coleman'
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})