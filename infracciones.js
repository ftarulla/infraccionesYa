
var exports = module.exports = {};

var infracciones = [{
        id: 42,
        patente: "ABC123",
        fechaHoraRegistro: new Date("April 20, 2018 14:00:01").toUTCString(),
        fechaHoraActualizacion: new Date("April 21, 2018 10:00:01").toUTCString(),
        direccionRegistrada: 'Av. Acá Cerquita 345',
        tipoInfraccion: 00,
        montoAPagar: '$1500',
        existeAcarreo: true,
    }, {
        id: 07,
        patente: "ABC123",
        fechaHoraRegistro: new Date("September 18, 2017 18:18:01").toUTCString(),
        fechaHoraActualizacion: new Date("September 19, 2017 10:18:00").toUTCString(),
        direccionRegistrada: 'Calle Falsa 123',
        tipoInfraccion: 01,
        montoAPagar: '$2000',
        existeAcarreo: false,
    }, {
        id: 08,
        patente: "AAA000",
        fechaHoraRegistro: new Date("May 17, 2017 11:18:00").toUTCString(),
        fechaHoraActualizacion: new Date("May 18, 2017 10:30:00").toUTCString(),
        direccionRegistrada: 'Abbey Road 3',
        tipoInfraccion: 02,
        montoAPagar: '$100000',
        existeAcarreo: false,
    }, {
        id: 24,
        patente: "BBB111",
        fechaHoraRegistro: new Date("October 19, 2016 18:18:00").toUTCString(),
        fechaHoraActualizacion: new Date("October 19, 2016 18:18:01").toUTCString(),
        direccionRegistrada: 'Av. Siempreviva 742',
        tipoInfraccion: 04,
        montoAPagar: '$1250',
        existeAcarreo: true,
    }
]

exports.list = function(patente) {
    return infracciones.filter(infraccion => infraccion.patente == patente);
}

exports.get = function(patente, id) {
    return infracciones.filter(infraccion => infraccion.id == id &&
                                             infraccion.patente == patente)[0];
}
