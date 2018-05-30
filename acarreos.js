var exports = module.exports = {};

var Coordinate = function(lat, lon) {
    return {
        lat: lat,
        lon: lon
    }
}

var depositos = [{
        id: 01,
        nombre: 'Nos llevamos su auto S.A.',
        direccion: 'Av. AlláLejos',
        telefono: '555-0001',
        horarios: '09.00hs a 18.00hs',
        ubicacion: new Coordinate(-34.5460985, -58.7104065)
    }, {
        id: 02,
        nombre: 'No tenemos su auto! S.A.',
        direccion: 'Av. NoTenemosDirección 100',
        telefono: '555-0002',
        horarios: '09.00hs a 09.15hs',
        ubicacion: new Coordinate(-34.541765, -58.7160749)
    }
]

var infos = [{
        infraccionId: 42,
        patente: 'ABC123',
        depositoId: 01
    }, {
        infraccionId: 24,
        patente: 'BBB111',
        depositoId: 02
    }
]

exports.list = function() {
    return depositos;
}

exports.get = function(patente, infraccionId) {
    var info = infos.filter(acarreo => acarreo.infraccionId == infraccionId &&
                                       acarreo.patente == patente)[0];

    var res = null;

    if(info) {
        res = {
            infraccionId: info.infraccionId,
            patente: info.patente,
            deposito: depositos.filter(deposito => deposito.id == info.depositoId)[0]
        };
    }

    return res;
}
