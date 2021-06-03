import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from "./routes";
import jwt from "./config/jwt";
import swaggerUi from 'swagger-ui-express';
import yamljs from 'yamljs';

const swaggerDoc = yamljs.load('swagger.yaml');
/*import swaggerJsDoc from 'swagger-jsdoc';*/

export default class Server {

    /**
     * Config server
     * @returns {Express}
     */
    static config() {
        const app = express();
        app.use(jwt());
        /*const swaggerDoc = swaggerJsDoc({
            swaggerDefinition: {
                info: {
                    title: 'Netflix API',
                    version: '1.0.0',
                    description: 'Netflix API'
                },
                securityDefinitions: {
                    bearerAuth: {
                        type: 'apiKey',
                        name: 'Authorization',
                        scheme: 'bearer',
                        in: 'header'
                    }
                }
            },
            apis: ["src/controllers/!*.js"]
        });*/

        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
        app.use('/uploads', express.static('uploads'));

        //Configuration de l'app
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
        app.use(cors({origin: true}));

        //Configuration des routes de l'API depuis routes.js
        app.use('/', router);
        return app;
    }
}
