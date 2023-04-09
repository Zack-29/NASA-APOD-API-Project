const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { url } = require("inspector");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req,res){

    res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res){
    
    const apiKey = "jIB59kNeCZC0U9RFnJpFrV8WWXjPmCar7dMI9z58";
    const apodDate = req.body.ymdDate
    const url = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey + "&date=" + apodDate;

    https.get(url, function(response){

            response.on("data", function(data){
                const apodData = JSON.parse(data);
                const imageURL = apodData.hdurl;
                const title = apodData.title;
                const description = apodData.explanation;
                const date = apodData.date
                
                res.write("<h1>" + title + "</h1>");
                res.write(`<img src =${imageURL} width = 500 , height = 500 >`);
                res.write("<p>" + description + "</p>");
                res.write("<p>" + date + "</p>");
                res.send();

            })
    })
})

app.listen(3000, function(){
    console.log("server is running on port 3000");
})