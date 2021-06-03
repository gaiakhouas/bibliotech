import Server from "./src/Server";
import Database from "./src/Database";
import {Router} from 'express';
import bodyParser from 'body-parser'
import User from './src/models/User'
import cors from 'cors' ; 

import requireAuth from './src/middlewares/requireAuth';
const router = Router();

const app = Server.config();
const {APP_CONFIG, APP_PORT, DB_NAME, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD} = process.env;

app.use(bodyParser.json());
app.use(cors());
app.use(User);

let urlDB;
if (APP_CONFIG === 'local') {
    urlDB = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
} else if (APP_CONFIG === 'production') {
    urlDB = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
}

Database.init(urlDB)
    .then(() => {
        console.log(`La base de données est connectée sur le port ${DB_PORT}...`);
        app.listen(APP_PORT, () => {
            console.log(`Le serveur est connecté sur le port ${APP_PORT}...`);
        });
});

app.get('/', requireAuth, (req, res, next) => {
        const { email, pseudo } = req.user;
        res.send({ email, pseudo });
        next();
});
