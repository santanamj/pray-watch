const Mes = require('./../model/mes.js');
const Dia = require('./../model/dia.js');
const Horas = require('./../model/horas.js');
const Agenda = require('./../model/agenda.js');
const Subproduct = require('./../model/subproducts');
const config = require('./../config/database');
const moment = require('moment');
const horas = require('./../model/horas.js');
const agenda = require('./../model/agenda.js');
var fs = require('fs');
var Excel = require('exceljs');
var workbook = new Excel.Workbook();
var worksheet = workbook.addWorksheet('My Sheet');
exports.newMes = (req, res, nex) => {
    const mes = new Mes({
        title: 'setembro'
    });
    mes.save((err) => {
        if (err) {
            res.json({ success: false, message: err })
        } else {
            res.json({ success: true, message: 'created mes' });
        }
    })
}
exports.newDay = (req, res, nex) => {
    var dt = new Date();
    var month = dt.getMonth() + 1;
    var year = dt.getFullYear();
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    console.log(days.length)
    for (let i = 0; i < days.length; i++) {
        const dia = new Dia({
            dia: days[i]
        });
        dia.save((err) => {
            if (days.length == i) {
                res.json({ success: true, message: 'created dia' });
            }
        })
    }
}
exports.newHora = (req, res, nex) => {
    const hora = new Hora({
        hora: '23'
    });
    hora.save((err) => {
        if (err) {
            res.json({ success: false, message: err })
        } else {
            res.json({ success: true, message: 'created hora' });
        }
    })
}
exports.addAgenda = (req, res, next) => {
    // var dt = new Date();
    // var month = dt.getMonth() + 1;
    // var year = dt.getFullYear();
    // var date = new Date(year, month, 1);
    // var days = [];
    // while (date.getMonth() === month) {
    //   days.push(new Date(date));
    //   date.setDate(date.getDate() + 1);
    // }
    // console.log(days[2])
    const agenda = new Agenda({
        hora: req.body.hora,
        diaSemana: req.body.diaSemana,
        mes: 'setembro',
        userId: req.body.userId,
        datadia: req.body.datadia,
        name: req.body.name,
        dia: req.body.dia,
        phone: req.body.phone
    });
    // console.log(agenda)
    Agenda.find({ datadia: { $in: req.body.datadia }, 'hora': req.body.hora }, (err, agendas) => {
        try {
            if (agendas.length) {
                res.json({ success: false, message: "Horário já reservedado por favor escolher outro" })
            } else {
                agenda.save((err, agenda) => {
                    res.json({ success: true, message: 'Horário reservado com sucesso' });
                })
            }
        } catch (error) {
            res.json({ success: false, message: err })
        }


    })
    // agenda.save((err, agenda)=>{
    //     if(err){
    //         res.json({success: false, message: err})
    //     }else{
    //         console.log('agenda', agenda)
    //         res.json({success: true, message: 'Horário reservado com sucesso'});
    //     }
    // })   
}
exports.agendaHoracoes = (req, res) => {
    Agenda.find({}, (err, agendas) => {
        if (err) {
            res.json({ success: false, message: err })
        } else {
            res.json(agendas)
        }
    })
}
exports.agendaUser = (req, res) => {
    console.log(req.params.id)
    Agenda.find({ 'userId': req.params.id }, (err, agendas) => {
        if (err) {
            res.json({ success: false, message: err })
        } else {

            // for(let i = 0; i < agendas.length; i++){
            //     newHoras[i] = Object.values(agendas[i][0].datadia) ; 
            //     console.log('newHoras[i]', newHoras)               
            //  }

            // const dados = 
            res.json(agendas)
        }
    })
}
exports.getAgenda = async (req, res, next) => {
    console.log(req.params)
    const day = req.params.dia

    Agenda.find({ diaSemana: { $eq: day } }, (err, agendas) => {
        console.log('agenda', agendas)
        const newAgenda = agendas.map(item => item.hora);
        Horas.find({ hora: { $in: newAgenda } }, (err, horas) => {
            var newHours = horas.filter((item, i) => horas.indexOf(item) === i);
            console.log('newHours', newHours); //dá ['foo', 'bar']

        })
        res.json(agendas)
        // console.log(agendas)

    })
}
exports.getAgendaDay = async (req, res, next) => {
    console.log(req.params)
    const day = req.params.dia
    Agenda.find({ 'dia': day }, (err, agendas) => {
        console.log('agenda', agendas)
        console.log(agendas)
        res.json(agendas)
    }).sort({ 'hora': +1 })
}
exports.deleteAgenda = (req, res) => {
    console.log(req.params)
    if (!req.params.id) {
        res.json({ success: false, message: 'No id provided' }); // Return error message
    } else {
        Agenda.findOne({ _id: req.params.id }, (err, agenda) => {
            console.log('antes', req.params.id)
            if (err) {
                res.json({ success: false, message: 'Invalid id' }); // Return error message
            } else {
                // Check if dependente was found in database
                if (!agenda) {
                    res.json({ success: false, messasge: 'Horário não encontrado' }); // Return error message
                } else {
                    agenda.remove((err) => {
                        if (err) {
                            res.json({ success: false, message: err }); // Return error message
                        } else {
                            res.json({ success: true, message: 'Horário deletado!' }); // Return success message
                        }
                    });
                }
            }
        });
    }
};
exports.getAgendaPray = async (req, res, next) => {

    const dados = req.query;
    console.log('req.query', dados.dia, dados.hora)
    const day = dados.hora;

    const lossday = Number(day) - 1;
    const plusday = Number(day) + 1;
    var horaanterior = lossday;
    var horadepois = plusday;

    if (lossday < 10) {
        var horaanterior = `0${String(lossday)}`
        console.log('menos', horaanterior)
    }

    if (plusday < 10 && plusday != "00") {
        horadepois = `0${String(plusday)}`
        console.log('depois fora zero', horaanterior)
    }
    //00 HORAS
    if (day == '00') {
        horaanterior = null
        console.log('depois', horaanterior)
    }
    if (day == '00') {
        horadepois == '01'
    }
    //23:00 HORAS 
    if (day == '23') {
        horadepois = null
    }




    console.log('horarios', horadepois, horaanterior)
    Agenda.find({ hora: { $in: [horadepois, String(horaanterior)] }, dia: String(dados.dia) }, (err, agendas) => {
        console.log('agendas', agendas)
        var newdate = '';
        var nextDate = '';
        console.log('dados.dia', dados.dia)
        if (day == '00') {
            switch (dados.dia) {
                case dados.dia = 'Domingo':
                    newdate = 'Sabado'
                    break;
                case dados.dia = 'Segunda-feira':
                    newdate = 'Domingo'
                    break;
                case dados.dia = 'Terça-feira':
                    newdate = 'Segunda-feira'
                    break;
                case dados.dia = 'Quarta-feira':
                    newdate = 'Terça-feira'
                    break;
                case dados.dia = 'Quinta-feira':
                    newdate = 'Quarta-feira'
                    break;
                case dados.dia = 'Sexta-feira':
                    newdate = 'Quinta-feira'
                    break;
                case dados.dia = 'Sábado':
                    newdate == 'Sexta-feira'
                    break;
            }
            console.log('newdate', newdate)
            Agenda.find({ hora: { $in: '23' }, dia: newdate }, (err, listagendas) => {
                var listaagendas = agendas.concat(listagendas)
                console.log('agenda', listaagendas)
                res.json(listaagendas)
            })
        } else if (day == '23') {
            switch (dados.dia) {
                case dados.dia = 'Sábado':
                    nextdate = 'Domingo'
                    break;
                case dados.dia = 'Domingo':
                    nextdate = 'Segunda-feira'
                    break;
                case dados.dia = 'Segunda-feira':
                    nextdate = 'Terça-feira'
                    break;
                case dados.dia = 'Terça-feira':
                    nextdate = 'Quarta-feira'
                    break;
                case dados.dia = 'Quarta-feira':
                    nextdate = 'Quinta-feira'
                    break;
                case dados.dia = 'Quinta-feira':
                    nextdate = 'Sexta-feira'
                    break;
                case dados.dia = 'Sexta-feira':
                    nextdate == 'Sábado'
            }

            Agenda.find({ hora: { $in: '00' }, dia: nextdate }, (err, listagendas) => {
                var listaagendas = agendas.concat(listagendas)
                console.log('agenda', listaagendas)
                res.json(listaagendas)
            })
        }
        else {


            console.log('agenda', agendas)
            res.json(agendas)
        }
    }).sort({ 'hora': +1 })
}

exports.agendaPedido = (req, res) => {
    console.log(req.body)

    Agenda.findOneAndUpdate({ _id: req.body.agendaId }, { $set: { "pedido": req.body.pedido } }, (err, agenda) => {
        if (err) {
            res.json({ success: false, message: 'Falhar ao enviar pedido' })
        } else {
            console.log(agenda)
            res.json({ success: true, agenda, message: 'Pedido Enviado com sucesso' })

        }
    })
}
const getRelatorio = async (req, res, next) => {

    // const day = req.params.dia

    return Agenda.find({ dia: { $eq: 'Domingo' } }, (err, agendas) => {
        console.log


        // console.log(agendas)
        return agendas
    }).sort({ 'hora': +1 })
}
exports.getAgendaRelatorio = async (req, res) => {
    var data = '';
    const newDados = await getRelatorio();
    console.log('newDados', newDados)
    for (var i = 0; i < newDados.length; i++) {
        data = data + newDados[i].name + '\t' + newDados[i].hora + '\t' + newDados[i].phone + '\t' + newDados[i].pedido + '\n';
    }
    fs.appendFile('Domingo.xls', data, (err) => {
        if (err) throw err;
        console.log('File created');
    });
    res.json(newDados)
}
