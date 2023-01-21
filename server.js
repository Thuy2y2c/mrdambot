const express = require('express');
const server = express();
server.all('/', (req, res)=>{
   res.setHeader('Content-Type', 'text/html');
   res.write('<link href="https://fonts.googleapis.com/css?family=Roboto Condensed" orel="stylesheet"> <style> body {font-family: "Roboto Condensed";font-size: 22px;} <p>Hosting Active</p>');
   res.end();
})

function keepAlive(){
   server.listen(3000, ()=>{console.log(`Bot của bạn đang được hoạt động.`)});
}

module.exports = keepAlive;
