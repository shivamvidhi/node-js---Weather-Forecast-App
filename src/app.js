const path = require('path');
const express = require('express');
const geoCode = require('./utils/Geo-Code.js')
const forecast = require('./utils/Weather-Forecast.js')

//for sending mail
var nodemailer = require('nodemailer');




// to use partial templates eg. headers and footers in web pages. We need to require hbs.
const hbs = require('hbs');

const app = express();


// for heroku we need the post number because it doesnot run on port 3000
const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname,'../public');
const htmlDirPath = path.join(__dirname,'../public/html');


// to use hbs ... to setup handlebars 
// for this we don't need to explicitly require hbs. We just need to install it.
app.set('view engine', 'hbs');


// ->  if you don't want to name folder as views then we need to tell express to look to a folder where our views i.e. hbs files are present
// to do so ->
// 1. create a folder say templates say in public folder. And create a folder name Views in Templates where all hbs files will be present.
// 2. now create a path for templates folder.
const templatesViewsPath = path.join(__dirname, '../public/templates/views');

// 3. now tell the express to search for views go to templates folder.
app.set('views', templatesViewsPath);
// done :)




// setting up partials.
const templatesPartialsPath = path.join(__dirname, '../public/templates/partials');
hbs.registerPartials(templatesPartialsPath);





// setup static directory to serve.
// it will use index.html because express.static searches for index.html file and it routes it to the main page.
app.use(express.static(htmlDirPath));

app.use(express.static(publicDirPath));

// index route
app.get('', (req, res) => {

    // for static page we use send method
    // res.send('Welcome user :)');

    // for dynamic pages we use render method
    res.render('index', {
        title:'Weather app',
        name: 'Shivam Arora'
    });

});


// '/help' route
app.get('/help', (req, res) => {
    
    // for static page we use send method
    // res.send('How may I help you :)');

    // for dynamic pages we use render method
    res.render('help', {
        title:'Help',
        name: 'Shivam Arora'
    });

});


// '/about' route
app.get('/about', (req, res) => {
    
    // for static page we use send method
    // res.send(`I'm the developer of this website`);

    // for dynamic pages we use render method
    res.render('about', {
        title:'About',
        name: 'Shivam Arora'
    });

});


// '/weather' route
app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({error:'You have not provided the address, please provide the address.'} );
    }

    // now we have the address
    geoCode(req.query.address,(error,cordinates)=>{
        if(error)
        {
            return res.send({error:'unable to fetch cordinates'});    
        }
        forecast(cordinates.latitude,cordinates.longitude,(error, data)=>{   
        if(error)
            {
                console.log(cordinates.longitude,cordinates.latitude) //-> They will go "undefined"
                return res.send({error:'unable to find weather of the given location'})         
                    
            }
            res.send({
                cordinates: cordinates,
                Weather : data
            })
               
        })
    })
    
    // // for static page we use send method
    //  res.send({
    //     forecast:'It is raining',
    //     location:req.query.address
    //     });
});


// corona route
app.get('/corona',(req, res) => {
    // for dynamic pages we use render method
    res.render('corona',{
        title:'',
        name:'Shivam Arora'
    });
});


// sending email api
app.get('/mail',(req, res)=>{

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'feedbackweatherforecastapp@gmail.com',
          pass: 'Feedback@123'
        }
      });
    
      var sender = req.query.from;
      var textBody = req.query.text;

      var mailOptions = {
        from: sender,
        to: 'feedbackweatherforecastapp@gmail.com',
        subject: sender,
        text: textBody
      };
      console.log(mailOptions);



      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send(info);
        }
      });
});


// for other api's that are not defined. We can give 404 error 
app.get('*',(req, res) => {
    res.render('pageNotFound',{
        title:'404 Error',
        name: 'Shivam Arora'
    });
});


app.listen(port, () => {

console.log('server is up on port '+port);

});