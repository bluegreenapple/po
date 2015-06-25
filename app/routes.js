var Equipamento = require('./models/equipamento');

function getEquipamentos(res){
	Equipamento.find(function(err, equipamentos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(equipamentos); // return all equipamentos in JSON format
		});
};

var Analise = require('./models/analise');

function getAnalises(res){
	Analise.find(function(err, analises) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(analises); // return all analises in JSON format
		});
};

module.exports = function(app) {

	// // application -------------------------------------------------------------
	// app.get('*', function(req, res) {
	// 	res.sendfile('./public/indexCadTransf.html'); // load the single view file (angular will handle the page changes on the front-end)
	// });

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
    		tipo: req.body.tipo,  
    		potencia: req.body.potencia,  
    		tensao: req.body.tensao,  
    		comutacaoComCarga: req.body.comutacaoComCarga,  
    		local: req.body.local,  
    		tanqueSeparado: req.body.tanqueSeparado,  
    		tipoDeOleo: req.body.tipoDeOleo,  
    		volumeDeOleo: req.body.volumeDeOleo,  
    		sistemaDePrevencao: req.body.sistemaDePrevencao,
			done : false
		}, function(err, equipamento) {
			if (err)
				res.send(err);

			// get and return all the equipamentos after you create another
			getEquipamentos(res);
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



	// analise
	app.get('/api/analises/:analise_id', function(req, res) {

		// use mongoose to get one specific todo in the database
		Analise.findOne({_id : req.params.analise_id}, function(err, analise) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(analise); // return the todo in JSON format
		});
	});

	// get all analises
	app.get('/api/analises', function(req, res) {

		// use mongoose to get all analises in the database
		getAnalises(res);
	});

	// create analise and send back all analises after creation
	app.post('/api/analises', function(req, res) {

		// create a analise, information comes from AJAX request from Angular
		Analise.create({
			tagDoEquipamento: req.body.tagDoEquipamento,  
		    nDaAnaliseDoLaboratorio: req.body.nDaAnaliseDoLaboratorio,  
		    laboratorio: req.body.laboratorio,  
		    dataDaAnalise: req.body.dataDaAnalise,  
		    tipo: req.body.tipo,  

		    //cromatográfico
		    h2: req.body.h2,  
		    o2: req.body.o2,  
		    n2: req.body.n2,  
		    ch4: req.body.ch4,  
		    co: req.body.co,  
		    co2: req.body.co2,  
		    c2h4: req.body.c2h4,  
		    c2h6: req.body.c2h6,
		    c2h2: req.body.c2h2,
		    tgc: req.body.tgc,
		    tgg: req.body.tgg,
		    conclusoesCroma: req.body.conclusoesCroma,
			
			//fisico quimico

			done : false
		}, function(err, analise) {
			if (err)
				res.send(err);

			// get and return all the analises after you create another
			getAnalises(res);
		});

	});

	// delete a analise
	app.delete('/api/analises/:analises_id', function(req, res) {
		Analise.remove({
			_id : req.params.analises_id
		}, function(err, analises) {
			if (err)
				res.send(err);

			getAnalises(res);
		});
	});
};