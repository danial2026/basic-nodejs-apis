var logger = require('morgan'),
    cors = require('cors'),
    http = require('http'),
    express = require('express'),
    errorhandler = require('errorhandler'),
    dotenv = require('dotenv'),
    bodyParser = require('body-parser');

// start generate swagger function
const generateSwagger = async() => {

    const swaggerAutogen = require('swagger-autogen')();
    const configJsonFile = require('./src/config/config.json');

    const { readFile, writeFile } = require('fs');

    const doc = {
        info: {
            title: "dayspay API Docs",
            description: 'Description',
        },
        host: 'api.dayspay.ca',
        schemes: ['https'],

        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "https",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [{
            bearerAuth: [],
        }, ],
    };

    const outputFile = './swagger-output.json';
    const endpointsFiles = ['./src/port/*.js', './src/domains/*.js', './src/config/config.json'];

    await swaggerAutogen(outputFile, endpointsFiles, doc);

    readFile('./swagger-output.json', 'utf-8', function(err, contents) {
        if (err) {
            console.log(err);
            return;
        }

        const replaced = contents.replaceAll('config.apiVersionPrefix', configJsonFile.apiVersionPrefix);

        writeFile('./swagger-output.json', replaced, 'utf-8', function(err) {
            if (err) {
                console.log(err);
                return;
            }
        });
    });

}

// end generate swagger function

generateSwagger()

var app = express();

dotenv.load();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(err, req, res, next) {
    if (err.name === 'StatusError') {
        res.send(err.status, err.message);
    } else {
        next(err);
    }
});

if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
    app.use(errorhandler())
}

app.use(require('./src/port/job-routes'));

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function(err) {
    console.log('listening in 0.0.0.0:' + port);
});