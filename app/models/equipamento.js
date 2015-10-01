var mongoose = require('mongoose');
  
var Schema = mongoose.Schema;  

var equipamentoSchema = new Schema({  
    tag: { type: String, required: true },  
    nSerie: { type: String, required: true },  
    fabricante: { type: String, required: true },  
    dataDeFabricacao: { type: Date, required: true },  
    dataDoUltimoReparo: { type: Date, required: true },  
    tipo: { type: String, required: true },  
    potencia: { type: String, required: true },  
    tensao: { type: String, required: true },  
    comutacaoComCarga: { type: String, required: true },  
    local: { type: String, required: true },  
    tanqueSeparado: { type: String, required: true },  
    tipoDeOleo: { type: String, required: true },  
    volumeDeOleo: { type: String, required: true },  
    sistemaDePrevencao: { type: String, required: true },
    comentarios: { type: String, required: false },
    isFavorite: { type: Boolean, required: true}, 
});
module.exports = mongoose.model('Equipamento', equipamentoSchema);
