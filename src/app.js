
const path = require('path')
const express = require('express');
const hbs = require('hbs')
const app = express();
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast');
const e = require('express');


//paths 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup hbs engines and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectoryPath))



app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Albi Hoti"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Albi Hoti"
        
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Page",
        name:"Albi Hoti",
        text:"This a help page"
    })
})
app.get('/weather',(req,res)=>{
    const address= req.query.address
    if(!address){
        return res.send({
            error:"The address must be provided"
        })
    }
     geoCode(address, (error, {latitude, longitude, location})=>{
        if(error){
            return res.send({error})
        }
            
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
               return  res.send({
                error:error
               })
            }
             res.send({
                forecast:forecastdata,
                location:address

             })
           
          })
    })

    
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:"You must provide a search term"
        })

    }
    console.log(req.query.search);
    res.send({
        products:[]
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title:"404",
        text:"Help article not found",
        name:"Albi Hoti"
    })
    
})
app.get('*',(req,res)=>{
        res.render('404page',{
            title:"404",
            text:"404 page ",
            name:"Albi Hoti"
        })
})


app.listen(3000, ()=>{
    console.log("This app is running on port 3000s")
    console.log("test")
})







