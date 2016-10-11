
var exports = module.exports = {};


var types = [{
        id: 00,
        descripcion: "Estacionamiento."
    }, {
        id: 01,
        descripcion: "Velocidad."
    }, {
        id: 02,
        descripcion: "Semáforo."
    }, {
        id: 03,
        descripcion: "Cruce Ferrocarril."
    }, {
        id: 04,
        descripcion: "Documentación Obligatoria."
    }, {
        id: 05,
        descripcion: "Otros."
    }
]

exports.list = function() {
    return types;
}

exports.get = function(id) {
    return types.filter( type => type.id == id )[0];
}