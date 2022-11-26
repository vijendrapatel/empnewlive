const express = require('express');
const app = express();
const validator = require('validator');
var db=require('../../database');


async function login(req, res) {
// app.post('/login', (req, res) => {
    const mail = validator.escape(req.body.mail);
    const pass = validator.escape(req.body.pass);
    console.log("mail ---------- "+mail)
    console.log("pass ---------- "+pass)
    const sqlSelect = "SELECT * FROM login_tbl WHERE username ='"+mail+"' AND password = '"+pass+"'";
    db.query(sqlSelect, [mail, pass], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            req.session.user = result;
            req.session.loggedIn = true;
            console.log(req.session.user);

            res.send({message: 'success', session: req.session});
            
        }
        else {
            res.send({message: 'Invalid Email or Password !'});
        }
    })
    
}
async function checklogin(req, res) {
    console.log(req.session.user);
    if (req.session.user){
        res.send({
            session: req.session,
            message: 'logged'
        });
    }
    else {
        res.send({
            message: 'Not logged'
        });
    }
};
module.exports = {login,checklogin};