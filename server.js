var express    = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var infracciones = require("./infracciones.js");
var types = require("./types.js");
var acarreos = require("./acarreos.js");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router); // routes will be /api/whatever
//app.use('/', router);


var urlInfraccion = '/:patente/infracciones/';
var urlType = '/tiposInfraccion/';
var urlAcarreo = '/acarreo/';

var help = {
    welcome: 'Bienvenidos a Infracciones Ya!',
    urls: {
        'GET': {
            '/api/:patente/infracciones/': {
                "descripción": "Lista las infracciones pertenecientes a la patente :patente",
                "ejemplo": "/api/ABC123/infracciones/"
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
            '/api/acarreo/:infraccion': {
                "descripción": "Obtiene la información de acarreo para la infracción con id :infraccion",
                "ejemplo": "/api/acarreo/42"
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
            version: {
                id: '0.0.1',
                name: 'meteor',
                lastupdate: Date.now()
            }
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
            version: {
                id: '0.0.1',
                name: 'meteor',
                lastupdate: Date.now()
            }
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
router.route(urlAcarreo + ':infraccion')
    .get(function(req, res) {
        console.log("GET: " + urlType + ":infraccion");

        var infraccion = req.params.infraccion;
        console.log(infraccion);

        var acarreo = acarreos.get(infraccion);
        console.log(acarreo);

        if (acarreo) {
            res.json(acarreo);
        } else {
            // http://stackoverflow.com/questions/8393275/how-to-programmatically-send-a-404-response-with-express-node
            res.status(404)
               .send('No existe información de acarreo para la infracción dada.');
        }

    });


// Server up!
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started at port ' + port);
});


//limitless-falls-59407