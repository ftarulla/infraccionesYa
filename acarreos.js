var exports = module.exports = {};

var depositos = [{

        id: 01,
        nombre: 'Nos llevamos su auto S.A.',
        direccion: 'Av. AlláLejos',
        telefono: '555-0001',
        horarios: '09.00hs a 18.00hs'

    }
]


var infos = [{

        infraccionId: 42,
        patente: 'AAA000',
        depositoId: 01

    }, {

        infraccionId: 07,
        patente: 'BBB111',
        depositoId: 01

    }
]

exports.get = function(infraccionId) {
    var info = infos.filter( acarreo => acarreo.infraccionId == infraccionId )[0];

    if(info) {
        info.deposito = depositos.filter( deposito => deposito.id == info.depositoId)[0];
        //delete info.depositoId;
    }

    return info;
}