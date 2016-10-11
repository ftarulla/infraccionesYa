
var exports = module.exports = {};


var infracciones = [{

        id: 42,
        fechaHoraRegistro: new Date("August 20, 2016 02:00:01").toUTCString(),
        fechaHoraActualizacion: new Date("August 20, 2016 02:00:01").toUTCString(),
        direccionRegistrada: '',
        tipoInfraccion: 00,
        montoAPagar: '$1500',
        existeAcarreo: true,

    }, {

        id: 07,
        fechaHoraRegistro: new Date("September 18, 2016 18:18:01").toUTCString(),
        fechaHoraActualizacion: new Date("September 18, 2016 18:18:01").toUTCString(),
        direccionRegistrada: '',
        tipoInfraccion: 01,
        montoAPagar: '$200',
        existeAcarreo: false,

    }, {

    }

]

exports.list = function() {
    return infracciones;
}

exports.get = function(id) {
    return infracciones.filter( infraccion => infraccion.id == id )[0];
}