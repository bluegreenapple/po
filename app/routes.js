var Equipamento = require('./models/equipamento');
var Qs = require('qs');
var _ = require('underscore');

function getEquipamentos(res){
	Equipamento.find(function(err, equipamentos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(equipamentos); // return all equipamentos in JSON format
		});
};


module.exports = function(app) {

	// // application -------------------------------------------------------------
	app.get('/api/equipamentos/tags/', function(req, res) {

		// use mongoose to get all tags (good for cadastro de analise)
		// return them in alphabetical order
		Equipamento.find({ }, {_id: 0, tag: 1}, function(err, equipamentoTagObjects) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute			
			if (err)
				res.send(err)
			var tags = _.pluck(equipamentoTagObjects,'tag');

			res.json(tags.sort()); // return all equipamentos in JSON format
		});
	});


	app.get('/api/equipamentos/tags/:equipamento_tags_queryString', function(req, res) {

		// use mongoose to get one specific todo in the database
		var queryObj = Qs.parse(req.params.equipamento_tags_queryString);

		// console.log('equipamento_tags_queryString: '+req.params.equipamento_tags_queryString);
		// console.log('queryObj: '+queryObj.tag);

		Equipamento.find({"tag":{"$in":queryObj.tag}}, function(err, equipamento) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(equipamento); // return the todo in JSON format
		});
	});

	app.get('/api/equipamentos/tag/:equipamento_tag', function(req, res) {

		// use mongoose to get one specific todo in the database
		var queryObj = Qs.parse(req.params.equipamento_tag);

		// console.log('equipamentoTag: '+req.params.equipamento_tag);
		// console.log('queryObj: '+queryObj.tag);

		Equipamento.findOne({tag : queryObj.tag}, function(err, equipamento) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(equipamento); // return the todo in JSON format
		});
	});

	app.get('/api/equipamentos/:equipamento_id', function(req, res) {

		// use mongoose to get one specific todo in the database
		Equipamento.findOne({_id : req.params.equipamento_id}, function(err, equipamento) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(equipamento); // return the todo in JSON format
		});
	});

	// get all equipamentos
	app.get('/api/equipamentos', function(req, res) {

		// use mongoose to get all equipamentos in the database
		getEquipamentos(res);
	});

	// create equipamento and send back all equipamentos after creation
	app.post('/api/equipamentos', function(req, res) {

		// create a equipamento, information comes from AJAX request from Angular
		Equipamento.create({
			tag: req.body.tag,  
    		nSerie: req.body.nSerie,  
    		fabricante: req.body.fabricante,  
    		dataDeFabricacao: req.body.dataDeFabricacao,  
    		dataDoUltimoReparo: req.body.dataDoUltimoReparo,  
    		tipo: req.body.tipo,  
    		potencia: req.body.potencia,  
    		tensao: req.body.tensao,  
    		comutacaoComCarga: req.body.comutacaoComCarga,  
    		local: req.body.local,  
    		tanqueSeparado: req.body.tanqueSeparado,  
    		tipoDeOleo: req.body.tipoDeOleo,  
    		volumeDeOleo: req.body.volumeDeOleo,  
    		sistemaDePrevencao: req.body.sistemaDePrevencao,
    		comentarios: req.body.comentarios,
    		isFavorite: req.body.isFavorite,
			done : false
		}, function(err, equipamento) {
			if (err)
				res.send(err);

			// get and return all the equipamentos after you create another
			getEquipamentos(res);
		});

	});

	//update a equipamento
	app.put('/api/equipamentos/', function(req, res) {

		// use our equipamento model to find the equipamento we want
        Equipamento.findById(req.body._id, function(err, equipamento) {
        	
            if (err)
                res.send(err);

            equipamento.tag= req.body.tag;  
    		equipamento.nSerie= req.body.nSerie;  
    		equipamento.fabricante= req.body.fabricante;  
    		equipamento.dataDeFabricacao= req.body.dataDeFabricacao;  
    		equipamento.dataDoUltimoReparo= req.body.dataDoUltimoReparo;  
    		equipamento.tipo= req.body.tipo;  
    		equipamento.potencia= req.body.potencia;  
    		equipamento.tensao= req.body.tensao;  
    		equipamento.comutacaoComCarga= req.body.comutacaoComCarga;  
    		equipamento.local= req.body.local;  
    		equipamento.tanqueSeparado= req.body.tanqueSeparado;  
    		equipamento.tipoDeOleo= req.body.tipoDeOleo;  
    		equipamento.volumeDeOleo= req.body.volumeDeOleo;  
    		equipamento.sistemaDePrevencao= req.body.sistemaDePrevencao;
    		equipamento.comentarios= req.body.comentarios;
    		equipamento.isFavorite= req.body.isFavorite;

            // save the equipamento
            equipamento.save(function(err) {
                if (err)
                    res.send(err);

                getEquipamentos(res);
            });

        });

	});
	

	// delete a equipamento
	app.delete('/api/equipamentos/:equipamentos_id', function(req, res) {
		Equipamento.remove({
			_id : req.params.equipamentos_id
		}, function(err, equipamentos) {
			if (err)
				res.send(err);

			getEquipamentos(res);
		});

	});

};