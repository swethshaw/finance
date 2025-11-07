const express = require("express");
const fs = require("fs");
const path = require("path");
const session=require("express-session");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
const PORT = 3050;
const Client1 = require("./mongo/register");
const Clientfeed1 = require("./mongo/feedback");
const Clientadd1 = require("./mongo/add"); 
const { register } = require("module");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(express.static(path.join(__dirname)));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "/html/index.html"));
});


app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, "/html/index.html"));
});


app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, "/html/index.html"));
});


app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, "/html/register.html"));
});


app.post('/register', async (req, res) => {
  try {
    const clientData = req.body;
    const newClient = new Client1(clientData);
    await newClient.save();
    res.redirect('/login.html');
  } catch (err) {
    console.error(err);
    res.redirect(302, '/register.html')
  }
});


app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, "/html/login.html"));
});


app.post('/login', async (req, res) => {
  const { contact, email, password } = req.body;

  try {
    const user = await Client1.findOne({ contact, email, password });
    if (user) {
      req.session.userId = user._id;
      res.redirect('/');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/log',(req,res)=>{
  if(req.session.userId){
      res.json({loggedIn: true});
  }
  else{
      res.json({loggedIn: false});
  }
})


app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.redirect('/');
    }
  });
});


app.get('/profile.html',async (req,res)=>{
  try{
    if (!req.session.userId) {
      res.redirect('/login.html');
    } else {
      res.sendFile(path.join(__dirname, '/html/profile.html'));
    }
  }catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/profile',async (req,res)=>{
  try{
    if (!req.session.userId) {
      res.redirect('/login.html');
    } else {
      res.sendFile(path.join(__dirname, '/html/profile.html'));
    }
  }catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/update-profile', async (req, res) => {
  try {
    const clientprofile=req.body;
    const details = await Client1.findOneAndUpdate({ _id: req.session.userId },{ $set: clientprofile },{ new: true });
    console.log(details);
    if (details) {
      return res.redirect('/profile');
    } else {
      return res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).send('Internal Server Error');
  }
});


app.get('/profile-data',async(req,res)=>{
  try{
    const client =await Client1.findOne({ _id: req.session.userId  });
    res.json({userData : client});
  }
  catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
})


app.get('/delete', async (req, res) => {
  try {
      if (!req.session.userId) {
        return res.status(401).send('Unauthorized');
      }
      const result = await Client1.deleteOne({ _id: req.session.userId  });
      const resultadd = await Clientadd1.deleteOne({ userId: req.session.userId  });
      res.redirect('/logout');
  } catch (error) { 
      console.error('Error deleting document:', error);
      res.status(500).send('Internal Server Error');
  }
});


app.get('/add.html', (req, res) => {
  try{
    if (!req.session.userId) {
      res.redirect('/login.html');
    } else {
    res.sendFile(path.join(__dirname, "/html/add.html"));
    }
  }catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.post("/add", async (req, res) => {
  try {
    if (!req.session.userId) {
      res.redirect("/login.html");
    }else{
      const client = await Clientadd1.findOne({ userId: req.session.userId });
      if (!client) {
        const clientadd = { userId: req.session.userId };
        const newaddClient = new Clientadd1(clientadd);
        await newaddClient.save();
      }
      
      const date = req.body.Date;
      const total = req.body.Total;
      const updatedUser = await Clientadd1.findOneAndUpdate(
        { userId: req.session.userId },
        {
          $push: {
            dates: date,
            totals: total,
          },
        },
        { new: true }
      );
      if (updatedUser) {
        res.redirect('/add.html');
      } else {
        res.status(404).send("User not found");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


app.get('/view.html', (req, res) => {
  try{
    if (!req.session.userId) {
      res.redirect('/login.html');
    } else {
    res.sendFile(path.join(__dirname, "/html/view.html"));
    }
  }catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/get-transactions',async(req,res)=>{
  try{
    const transaction =await Clientadd1.findOne({userId: req.session.userId});
    res.json({userData : transaction});
  }
  catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
})


app.get('/feedback.html', (req, res) => {
  try{
    if (!req.session.userId) {
      res.redirect('/login.html');
    } else {
    res.sendFile(path.join(__dirname, "/html/feedback.html"));
    }
  }catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/feedback', async (req, res) => {
  try {
    const clientfeed = req.body;
    const newClient = new Clientfeed1(clientfeed);
    await newClient.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/lander.html', (req, res) => {
  try{
    if (!req.session.userId) {
      res.redirect('/login.html');
    } else {
    res.sendFile(path.join(__dirname, "/html/lander.html"));
    }
  }catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/notification.html', (req, res) => {
  try{
    if (!req.session.userId) {
      res.redirect('/login.html');
    } else {
    res.sendFile(path.join(__dirname, "/html/notification.html"));
    }
  }catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/payment.html', (req, res) => {
  try{
    if (!req.session.userId) {
      res.redirect('/login.html');
    } else {
      res.sendFile(path.join(__dirname, "/html/payment.html"));
    }
  }catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/phone.html', (req, res) => {
  try{
    if (!req.session.userId) {
      res.redirect('/login.html');
    } else {
    res.sendFile(path.join(__dirname, "/html/phone.html"));
    }
  }catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});



app.get('/term.html', (req, res) => {
  res.sendFile(path.join(__dirname, "/html/term.html"));
});



app.get('/wallet.html', (req, res) => {
  try{
    if (!req.session.userId) {
      res.redirect('/login.html');
    } else {
    res.sendFile(path.join(__dirname, "/html/wallet.html"));
    }
  }catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.use((req, res) => {
  res.status(404).send("404 Not Found");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
