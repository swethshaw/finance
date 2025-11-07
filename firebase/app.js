const http = require("http");
const fs = require("fs");
const path = require("path");
const qs = require("querystring");
const express=require("express");
const app=express();
const body1=require('body-parser');
// require("./index")
const Client1=require("../mongo/register");
const encoded=body1.urlencoded({extended:false});
const server = http.createServer((req, res) => {
if (req.method === "GET") {
  const filePath = path.join(__dirname, req.url);
  const fileExtension = path.extname(filePath);
  if (req.url === "/" || req.url === "/index.html" || req.url === "/index") {
    fs.readFile(path.join(__dirname, "/html/index.html"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/register.html") {
    fs.readFile(path.join(__dirname, "/html/register.html"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/login.html" || req.url === "/login") {
    fs.readFile(path.join(__dirname, "/html/login.html"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/view.html" || req.url === "/viewbill") {
    fs.readFile(path.join(__dirname, "/html/view.html"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/term.html" || req.url === "/termsandconditions") {
    fs.readFile(path.join(__dirname, "/html/term.html"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/profile.html" || req.url === "/myaccount") {
    fs.readFile(path.join(__dirname, "/html/profile.html"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/phone.html" || req.url === "/phone") {
    fs.readFile(path.join(__dirname, "/html/phone.html"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/wallet.html" || req.url === "/wallet") {
    fs.readFile(path.join(__dirname, "/html/wallet.html"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/payment.html" || req.url === "/payment") {
    fs.readFile(path.join(__dirname, "/html/payment.html"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/notification.html" || req.url === "/notification") {
    fs.readFile(path.join(__dirname, "/html/notification.html"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/lander.html" || req.url === "/changelander") {
    fs.readFile(path.join(__dirname, "/html/lander.html"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/add.html" || req.url === "/addbill") {
    fs.readFile(path.join(__dirname, "/html/add.html"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url === "/feedback.html" || req.url === "/feedback") {
    fs.readFile(path.join(__dirname, "/html/feedback.html"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.url.startsWith("/img/")) {
    // Serve image files from the 'images' directory
    const imagePath = path.join(__dirname, req.url);
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
      } else {
        // Determine the content type based on the file extension
        const contentType = getContentType(req.url);
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      }
    });
  }else if (fileExtension === ".css") {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      }
    });
  }else if (fileExtension === ".js") {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(data);
      }
    });
  }else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
}else if(req.method === "POST"){
  app.post('/register',encoded,async(req,res)=>{
    try{
      const client= req.body;
      const newClient = new Client1(client);
      await newClient.save();
      res.send(`user register successfully!`);
    }catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
}else{
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
};
});

function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    default:
      return "application/octet-stream";
  }
}

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
