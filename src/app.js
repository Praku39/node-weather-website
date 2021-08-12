const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname, '../public');
const aboutDirectoryPath=path.join(__dirname, '../public/About.html');
const helpDirectoryPath=path.join(__dirname, '../public/help.html')

const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.use(express.static(aboutDirectoryPath));
app.use(express.static(helpDirectoryPath));

app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Prakash'
    });
})

app.get('/about',(req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Prakash'
    });
})  

app.get('/help',(req, res)=>{
    res.render('help', {
        helpTxt: 'This is some helpful text',
        title: 'Help page',
        name: 'Prakash'
    });
}) 

// app.get('',(req, res)=>{
//     res.send('<h1>Hello Express!</h1>');
// })

// app.get('/help',(req, res)=>{
//     res.send([{name:'Prakash'}, {name:'Rangnath'}, {name: 'Sunil'}]);
// })

// app.get('/about',(req, res)=>{
//     res.send('<h1>About Page</h1>');
// })

app.get('/weather',(req, res)=>{
    const address =req.query.address;
    if(!address){
        return res.send({error : 'You must provide a address'})
    }

    geoCode(address, (error, { location }={}) => {
        if (error) {
            return res.send({error})
        }

        forecast(address, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send([
                {
                    forecast: forecastData, 
                    location,
                    address: req.query.address
            }]);
        })
    })
    console.log(req.query)
    // res.send([
    //     {
    //         forecast: 'It is snowing', 
    //         location : 'madhugiri',
    //         address: req.query.address
    // }]);
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({error : 'You must provide a search term'})
    }
    console.log(req.query)
    res.send({products:[]});
})

app.get('/help/*',(req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Prakash',
        errorMessage: 'Help article not found'
    });
})

app.get('*',(req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Prakash',
        errorMessage: 'Page not found'
    });
})

const port = process.env.PORT || 3000
app.listen(port, ()=>{console.log(`Server is up on port ${port}.`)});