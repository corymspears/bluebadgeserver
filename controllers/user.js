const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.post('/signup', (req, res,) => {
    User.create({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    .then(
        createSuccess = (user) => {
            console.log(process.env.JWT_SECRET);
            let token = jwt.sign({id:user.id}, process.env.JWT_SECRET,{expiresIn: 60 * 80 * 24});
            res.json({
                user: user,
                message:'User created',
                sessionToken: token
            })
        }
    )
})

router.post('/signin', (req, res) => {
    User.findOne({where:{email:req.body.email}})
        .then(user=> {
            if(user){
                bcrypt.compare(req.body.password, user.password,(err,matches) =>{
                    if(matches){
                        let token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
                        res.json({
                            user:user,
                            message:'successfully authenticated',
                            sessionToken:token
                        })
                    } else {
                        res.status(502).send({error:'No no, you wrong'})
                    }
                })
            } else {
                res.status(500).send({error:'No authentication, mofo'})
            }    
        },
        err => res.status(501).send({error:'failed to process'})
        )
})

module.exports = router;