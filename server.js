/* 
Imports
*/
// NodeJS
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const cookieParser = require('cookie-parser')
 


// Inner
const mainRouter = require('./routes/main.routes');
//


/* 
Configuration
*/
const server = express();
const port = process.env.PORT;

class ServerClass {

    init() {
        // Config du dossier client
        server.set('views', __dirname + '/www');
        server.use(express.static(path.join(__dirname, 'www')));

        // Config du moteur de rendu
        server.set('view engine', 'ejs');

        // Body-parser
        server.use(bodyParser.json({
            limit: '10mb'
        }));

        // Cookie-parser
        server.use(cookieParser())

        server.use(bodyParser.urlencoded({
            extended: true
        }));

        // Configurer les routes
        server.use('/', mainRouter);


        // Lancer le serveur
        this.launch();
    }

    launch() {
        server.listen(port, () => {
            console.log(`Server is active on port ${port}`);
        });
    }

}
//


/* 
Démarrer le serveur
*/
new ServerClass().init();
//