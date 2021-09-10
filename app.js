const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
	res.sendFile(__dirname+"/index.html");
})


app.post("/weather",function(req,res){
	const city = req.body.city;
	const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=16d51a8b1f6d6335b11b3067a8327cc8";
	https.get(url,function(response){
		response.on("data",function(data){
			const weatherData = JSON.parse(data);
			const weatherDescription = weatherData.weather[0].description;
			const temp = weatherData.main.temp;
			const country = weatherData.sys.country;
			const iconId = weatherData.weather[0].icon;
			const imgURL = "http://openweathermap.org/img/wn/"+iconId+"@2x.png";
			res.write("<p>The weather of "+city+" is currently <b>"+weatherDescription+"</b> <p>");
			res.write("<h1>The temperature in "+city+" is "+temp+" degrees Celcius.</h1>");
			res.write("<img src="+imgURL+">");
			res.write("<h2>Country: "+country+"</h2>");
			res.send();
		})
	})
})

app.listen(3000,function(){
	console.log("Server started at port 3000");
})


