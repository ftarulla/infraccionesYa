
var exports = module.exports = {};


var infracciones = [

    {
        id:42,
        registroTimeStamp: new Date("2016-08-20"),
        monto: '$1500'
    }

]

exports.list = function() {
    return infracciones;
}
