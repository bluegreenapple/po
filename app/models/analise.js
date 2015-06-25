var mongoose = require('mongoose');
  
var Schema = mongoose.Schema;  

var analiseSchema = new Schema({  
    tagDoEquipamento: { type: String, required: true },
    nDaAnaliseDoLaboratorio: { type: String, required: true },  
    laboratorio: { type: String, required: true },  
    dataDaAnalise: { type: Date, required: true },  
    umidadeRelativaDoAr: { type: String, required: true },  
    temperaturaAmbiente: { type: String, required: true },  
    emOperacao: { type: String, required: true },  
    pontoDeColeta: { type: String, required: true },  
    temperaturaDoOleo   : { type: String, required: true },  


    // cromatográfico
    h2: { type: String, required: true },  
    o2: { type: String, required: true },  
    n2: { type: String, required: true },  
    ch4: { type: String, required: true },  
    co: { type: String, required: true },  
    co2: { type: String, required: true },  
    c2h4: { type: String, required: true },  
    c2h6: { type: String, required: true },
    c2h2: { type: String, required: true },
    tgc: { type: String, required: true },
    tgg: { type: String, required: true },
    conclusoesCroma: { type: String, required: true },

    //fisico quimico
});
module.exports = mongoose.model('Analise', analiseSchema);
