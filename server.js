const express = require('express');
const mongoose = require('mongoose');
var multer = require('multer');
var upload = multer();
var bodyParser = require('body-parser');
const app = express();
const Users = require('./Schemas/registration-schema');
const sweetalert = require('sweetalert');
const { ObjectId } = require('mongodb');
const { Auth, LoginCredentials } = require("two-step-auth");
var springedge = require('springedge');

let confirm_otp , Name , Age, Gender , Email , Number;

let url = 'mongodb://localhost:27017/registration';

function fun()
{
    mongoose.connect(url , ()=>console.log("connected to data base"));
}
fun();

app.set('view engine' , 'ejs');
app.use(express.static('views'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

app.get('/' , (req , res)=>{

    res.render('registration')
})

app.post('/success', (req , res)=>{
    
    if(req.body.otp == `${confirm_otp}` && req.body.otp2 == "hello")
    {
        console.log('i am here')
        
        Users.create({Name : `${Name}` , Age : `${Age}`, Email:`${Email}` , Gender : `${Gender}` , Mobile : `${Number}`});
        
        console.log('i am there')

        res.render('success'); 
        
        
    }
    else
    {
        res.render("optFILE2");
    }
})

app.post('/' , (req,res)=>{

    const { name, email, number, age, gender } = req.body; // here always give id name to variables

    async function hand()
    {
        {
            if(name.length === 0 || age.length >= 3 || number.length >10 || number.length < 10)
            {
                await res.render('redirect');
            }
        }

    }

    hand()
    
    
    Name = name;
    Age = age;
    Email = email;
    Gender = gender;
    Number = number;

    try
    {
        Users.findOne({Email: email }, function (err, user){ 
            if(err)
            {
                res.status(400).json({message : err})
            } 
            else
            {
                if(user){
                    res.render("presentData");
                }
                else
                {
    
                    Users.findOne({Mobile : number}, function (err, user){ 
                        if(user){
                            res.render("presentData");
                        }
                        else
                        {
                            async function login(emailId) {
                                // const resi = await Auth(emailId);
                                // You can follow this approach,
                                // but the second approach is suggested,
                                // as the mails will be treated as important
                                    try
                                    {
                                        const resi = await Auth(emailId, "idris's Company");
                                        console.log(resi);
                                        console.log(resi.mail);
                                        console.log(resi.OTP);
                                        confirm_otp = resi.OTP;
                                        console.log(resi.success);
            
            
                                        var params = {
                                            'apikey': '6ojfpx3g160a1vv2279dtl3m42x9qekd', // API Key
                                            'sender': 'SEDEMO', // Sender Name
                                            'to': [
                                              `${Number}`  //Moblie Number
                                            ],
                                            'message': 'Hello, This is a test message from spring edge',
                                            'format': 'json'
                                          };
                                          
                                          springedge.messages.send(params, 5000, function (err, response) {
                                            if (err) {
                                              return console.log(err);
                                            }
                                            console.log(response);
                                          });
                                    }
                                    catch(err)
                                    {
                                        res.status(404);
                                        // res.render()
                                        console.log(err);
                                    }  
                                }
                            
            
                                login(email);
            
                                res.render('otpFILE');
                        }
    
                    });
                        
                }
            }

                
        
        });
    }
    catch(err)
    {
        console.log(err);
    }
})

app.listen(5000 , ()=>{
    console.log('connected')
})
