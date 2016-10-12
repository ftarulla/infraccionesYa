var express    = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var infracciones = require("./infracciones.js");
var types = require("./types.js");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router); // routes will be /api/whatever
//app.use('/', router);

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to InfraccionesYa!' });
});

// router.route('/api-search/by-url')

//     .get(function(req, res) {
//         console.log(req.query);
//         res.json(responses.random());
//     });

// Infracciones
var uriInfraccion = '/:patente/infracciones/';
router.route(uriInfraccion)
    .get(function(req, res) {
        console.log("GET: " + uriInfraccion);

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
router.route(uriInfraccion + ':infraccion_id')
    .get(function(req, res) {
        console.log("GET: " + uriInfraccion + ':infraccion_id');

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
var uriType = '/tiposInfraccion/';
router.route(uriType)
    .get(function(req, res) {
        console.log("GET: " + uriType);

        res.json(types.list());
    });
router.route(uriType + ':type_id')
    .get(function(req, res) {
        console.log("GET: " + uriType + ":type_id");

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


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started at port ' + port);
});


//limitless-falls-59407