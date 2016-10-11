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
var uriInfraccion = '/infracciones/';
router.route(uriInfraccion)
    .get(function(req, res) {
        console.log("GET: " + uriInfraccion);

        res.json(infracciones.list());
    });
router.route(uriInfraccion + ':infraccion_id')
    .get(function(req, res) {
        console.log("GET: " + uriInfraccion + ':infraccion_id');

        var id = req.params.infraccion_id;
        console.log(id);

        var infraccion = infracciones.get(id);
        console.log(infraccion);

        if (infraccion) {
            res.json(infraccion);
        }

        // http://stackoverflow.com/questions/8393275/how-to-programmatically-send-a-404-response-with-express-node
        res.status(404)
           .send('Infracción inexistente.');
    });


// Types
var uriType = '/infracciones/tipoInfraccion/';
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
        }

        // http://stackoverflow.com/questions/8393275/how-to-programmatically-send-a-404-response-with-express-node
        res.status(404)
           .send('Tipo de infracción inexistente.');
    });


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started at port ' + port);
});


//limitless-falls-59407