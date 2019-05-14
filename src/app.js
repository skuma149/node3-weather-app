const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geo  = require('./utility')

//Define paths
const staticDirPath = path.join(__dirname,'../public')
const dynamicDirPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
const app = express()
//set hbs
app.set('view engine','hbs')
app.set('views',dynamicDirPath)
hbs.registerPartials(partialPath)

//set up static directory
app.use(express.static(staticDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather page',
        name:'suryanshu kumar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about page',
        name:'Suryanshu kumar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help page',
        name:'Suryanshu kumar'
    })
})

app.get('/weather',(req,res)=>{
    const inputAddress = req.query.address
    if(!req.query.address){
        return res.send({error:'address param is missing'})
    }

    geo.geocode(inputAddress,(error,data)=>{
        if(error){
            return res.send({error})
        }
        const {latitude,longitude} = data
         geo.getForecast(latitude,longitude,(error,data)=>{
             if(error){
                 return res.send({error})
             }
             res.send({
                 forecast:data,
                 location:inputAddress
             })
         })
     })
})

app.get('/help/*',(req,res)=>{
    res.render('pageNotFound',{
        title:'Error page',
        message:'Help article not found',
        name:'Suryanshu kumar'
    })
})

app.get('*',(req,res)=>{
    res.render('pageNotFound',{
        title:'Error page',
        message:'This is 404 page',
        name:'Suryanshu kumar'
    })
})

app.listen(3000,()=>{
    console.log('Server is up running on port 3000')
})