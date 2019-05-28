/* 
Imports
*/
const express = require('express');
const router = express.Router();
const userCollection = require('../../data/users');

//


/* 
Configuration
*/
class AuthRouterClass {
    routes() {

        router.post('/', (req, res) => {
            res.json({
                msg: 'Hello API'
            })
        })

        router.post('/login', (req, res, next) => {
            if (
                !!req.body.email && req.body.email.length > 4 &&
                !!req.body.password && req.body.password.length > 4
            ) {

                let email = req.body.email
                let password = req.body.password

                for (let item of userCollection) {
                    if (item.email === email && item.password === password) {

                        res.cookie('id', item._id)

                        res.send({
                            Status: 'OK'
                        })

                        /**
                         * EXPLICATION PROBLEME
                         * 
                         * --> Lorsque je voulais faire une redirection avec res.redirect('/me'),
                         *     j'obtenais l'erreur suivante: Unexpected token < in JSON at position 0
                         *     En cherchant j'ai constaté que la response était une page html et donc
                         *     ne pouvait pas être parsé.
                         *     
                         */


                    }
                }
            } else {
                res.json({
                    msg: 'Bad fields provided'
                })
            }

        });
    }

    init() {
        this.routes();
        return router
    }
}
//

/* 
Export
*/
module.exports = {
    AuthRouterClass
};
//