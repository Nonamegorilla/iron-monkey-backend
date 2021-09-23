const express =  require('express');
const cors =  require('cors');
const mongoose = require('mongoose');
const Deneme = require('./models/deneme')
// const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

const PORT= 3000;
const server = express();

server.use(cors());
server.use(express.json())
server.use(bodyParser.json())

const dbUrl= "mongodb+srv://Kaan:12300321mk@mongodb.zpfds.mongodb.net/deneme?retryWrites=true&w=majority";

mongoose.connect(dbUrl, {useNewUrlParser: true})
    .then((result) => console.log("bağlantı oky"))
    .catch((err) => console.log("olmadı", err))



server.get('/', (req,res) =>{
    res.send('selam')
})


server.post('/auth', (req,res,next)=>{
    if(req.body.firstname){
        const newUser = new Deneme({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            birthday: req.body.birthday,
            wight: req.body.weight,
            tall: req.body.tall,
        });

        newUser.save(err => {
            if(err){
                return res.status(400).json({
                    error: 'email in use',
                    title: error
                })
            }
            return res.status(200).json({
                title: 'register is successfuly',
            })
        })
    }
    else{
        Deneme.findOne({ email: req.body.email}, (err,user) => {
            if(err) return res.status(500).json({
                title: 'server error',
                error: err
            })
            if(!user){
                return res.status(401).json({
                    title: 'user not found',
                    error: 'invalid credentials'
                })
            }
            // if(!bcrypt.compareSync(req.body.password, user.password)){
            //     return res.status(401).json({
            //         title: 'login failed',
            //         error: 'invalid credentials'
            //     })
            // }
            let token = jwt.sign({ userId: user._id}, 'secretkey');
            return res.status(200).json({
                title: 'login success',
                token: token
            })
        })
    }
})


server.listen(3000, ()=>{
    console.log(`server started on port ${PORT}`)
})
