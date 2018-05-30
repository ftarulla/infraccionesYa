var express    = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var infracciones = require("./infracciones.js");
var types = require("./types.js");
var acarreos = require("./acarreos.js");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//http://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', router); // routes will be /api/whatever
//app.use('/', router);

var version = {
    id: '1.0.2',
    name: 'shootingstar',
    lastupdate: Date.now()
}

var urlInfraccion = '/:patente/infracciones/';
var urlType = '/tiposInfraccion/';
var urlAcarreoV1 = '/acarreo/';
var urlAcarreo = '/:patente/acarreos/';
var urlDepositos = '/depositos/';

var help = {
    welcome: 'Bienvenidos a Infracciones Ya!',
    urls: {
        'GET': {
            '/api/:patente/infracciones/': {
                "descripción": "Lista las infracciones pertenecientes a la patente :patente",
                "ejemplo": "/api/ABC123/infracciones/",
                "ejemplos disponibles": "[ABC123, AAA000, BBB111]"
            },
            '/api/:patente/infracciones/:infraccion_id': {
                "descripción": "Obtiene la infracción con id :infraccion_id",
                "ejemplo": "/api/ABC123/infraciones/42"
            },
            '/api/tiposInfraccion/': {
                "descripción": "Lista los tipos de infracciones.",
                "ejemplo": "/api/tiposInfraccion/"
            },
            '/api/tiposInfraccion/:type_id': {
                "descripción": "Obtiene el tipo de infracción con id :type_id",
                "ejemplo": "/api/tiposInfraccion/1"
            },
            // '/api/acarreo/:infraccion': {
            //     "descripción": "Obtiene la información de acarreo para la infracción con id :infraccion",
            //     "ejemplo": "/api/acarreo/42"
            // },
            '/api/depositos/': {
                "descripción": "Lista los depósitos.",
                "ejemplo": "/api/depositos/"
            },
            '/api/:patente/acarreos/:infraccion_id': {
                "descripción": "Obtiene la información de acarreo para la infracción con id :infraccion_id",
                "ejemplo": "/api/ABC123/acarreos/42"
            }
        }
    }
}

router.get('/', function(req, res) {
    console.log("GET /");
    res.json(help);
});

// Infracciones
router.route(urlInfraccion)
    .get(function(req, res) {
        console.log("GET: " + urlInfraccion);

        var patente = req.params.patente;
        if(!patente) {
            res.status(404)
               .send('Patente inexistente.');

            return;
        }

        console.log("Getting infracciones for: " + patente);

        var response = {
            patente: patente,
            infracciones: infracciones.list(),
            version: version
        }
        res.json(response);
    });

router.route(urlInfraccion + ':infraccion_id')
    .get(function(req, res) {
        console.log("GET: " + urlInfraccion + ':infraccion_id');

        var patente = req.params.patente;
        if(!patente) {
            res.status(404)
               .send('Patente inexistente.');

            return;
        }

        var id = req.params.infraccion_id;
        console.log(id);

        var infraccion = infracciones.get(id);
        console.log(infraccion);

        if (!infraccion) {
            // http://stackoverflow.com/questions/8393275/how-to-programmatically-send-a-404-response-with-express-node
            res.status(404)
               .send('Infracción inexistente.');

            return;
        }

        var response = {
            patente: patente,
            infraccion: infraccion,
            version: version
        }
        res.json(response);
    });

// Types
router.route(urlType)
    .get(function(req, res) {
        console.log("GET: " + urlType);

        res.json(types.list());
    });

router.route(urlType + ':type_id')
    .get(function(req, res) {
        console.log("GET: " + urlType + ":type_id");

        var id = req.params.type_id;
        console.log(id);

        var type = types.get(id);
        console.log(type);

        if (type) {
            res.json(type);
        } else {
            // http://stackoverflow.com/questions/8393275/how-to-programmatically-send-a-404-response-with-express-node
            res.status(404)
               .send('Tipo de infracción inexistente.');
        }

    });

// Acarreo
router.route(urlAcarreoV1 + ':infraccion')
    .get(function(req, res) {
        console.log("GET: " + urlAcarreoV1 + ":infraccion");
        res.status(404)
            .send('Cannot GET /api/acarreo - Deprecado - Se requiere: "/api/:patente/acarreos/:infraccion_id"');
        });

router.route(urlAcarreo + ':infraccion_id')
    .get(function(req, res) {
        console.log("GET: " + urlAcarreo + ":infraccion_id");

        var patente = req.params.patente;
        if(!patente) {
            res.status(404)
               .send('Patente inexistente.');
            return;
        }
        console.log(patente);

        var infraccionId = req.params.infraccion_id;
        console.log(infraccionId);

        var infraccion = infracciones.get(infraccionId);
        console.log(infraccion);

        var acarreo = acarreos.get(patente, infraccionId);
        console.log(acarreo);

        if (!acarreo) {
            // http://stackoverflow.com/questions/8393275/how-to-programmatically-send-a-404-response-with-express-node
            res.status(404)
               .send('No existe información de acarreo para la patente e infracción dada.');
        }

        var response = {
            patente: patente,
            infraccion: infraccionId,
            acarreo: acarreo,
            version: version
        }
        res.json(response);
    });

// Depositos
router.route(urlDepositos)
    .get(function(req, res) {
        console.log("GET: " + urlDepositos);

        res.json(acarreos.list());
    });



// Server up!
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started at port ' + port);
});

//limitless-falls-59407
