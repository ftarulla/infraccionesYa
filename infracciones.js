
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
        existeAcarreo: true,

    }, {
        id: 08,
        fechaHoraRegistro: new Date("October 19, 2016 18:18:01").toUTCString(),
        fechaHoraActualizacion: new Date("October 19, 2016 18:18:01").toUTCString(),
        direccionRegistrada: '',
        tipoInfraccion: 02,
        montoAPagar: '$100000',
        existeAcarreo: true,
    }, {
        id: 24,
        fechaHoraRegistro: new Date("October 19, 2016 18:18:01").toUTCString(),
        fechaHoraActualizacion: new Date("October 19, 2016 18:18:01").toUTCString(),
        direccionRegistrada: '',
        tipoInfraccion: 04,
        montoAPagar: '$250',
        existeAcarreo: false,
    }

]

exports.list = function() {
    return infracciones;
}

exports.get = function(id) {
    return infracciones.filter( infraccion => infraccion.id == id )[0];
}