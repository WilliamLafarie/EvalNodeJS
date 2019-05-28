/*
Imports 
*/

const express = require('express');
const frontRouter = express.Router();
const userCollection = require('../../data/users');
//

/* 
Config.
*/
class FrontRouterClass {

    constructor() {}

    init() {
        this.routes();
        return frontRouter;
    }

    routes() {
        frontRouter.get('/', (req, res) => {
    
            res.render('index', {
                titleName: 'Accueil',
                connectedUser: false,
                userCollection: userCollection
            });
        });

        frontRouter.get('/login', (req, res) => {
            res.render('login', {
                titleName: 'Connexion',
                connectedUser: false,
                userCollection: userCollection
            });
        });

        frontRouter.get('/me', (req, res) => {
            
            let cookie = req.cookies.id

            if(!cookie) { 
                res.redirect('/')
            }

            res.render('account', {
                titleName: 'Mon Compte',
                connectedUser: cookie,
                userCollection: userCollection
            });

        });

        frontRouter.get('/logout', (req, res) => {
            res.clearCookie('id')
            res.redirect('/')
            
        });
    }
}
//

/* 
Export 
*/
module.exports = {
    FrontRouterClass
};
//