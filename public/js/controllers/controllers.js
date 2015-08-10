var app = angular.module('appDiag', ['ui.bootstrap','diagnosticosServices','analiseService']);
var _ = require('underscore');

app.controller('DuvalController', ['$scope','$filter','DuvalService','Analises' ,function ($scope,$filter, DuvalService, Analises) {
    
    $scope.m = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return DuvalService.m(analise.ch4, analise.c2h2, analise.c2h4);
    };
    $scope.a = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return DuvalService.a(analise.ch4, analise.c2h2, analise.c2h4);
    };
    $scope.y = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return DuvalService.y(analise.ch4, analise.c2h2, analise.c2h4);
    };
    $scope.diagnostico = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return DuvalService.diagnostico(analise.ch4, analise.c2h2, analise.c2h4);
    };

}]);

app.controller('DornemburgController', ['$scope','$filter','DornemburgService','Analises' ,function ($scope,$filter, DornemburgService, Analises) {
    
    $scope.w = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return DornemburgService.w(analise.ch4, analise.h2);
    };
    $scope.x = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return DornemburgService.x(analise.c2h2, analise.c2h4);
    };
    $scope.y = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return DornemburgService.y(analise.c2h6, analise.c2h2);
    };
    $scope.z = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return DornemburgService.z(analise.c2h2, analise.ch4);
    };

    $scope.wMod = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return DornemburgService.wMod(analise.ch4, analise.h2);
    };
    $scope.xMod = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return DornemburgService.xMod(analise.c2h2, analise.c2h4);
    };
    $scope.yMod = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return DornemburgService.yMod(analise.c2h6, analise.c2h2);
    };
    $scope.zMod = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return DornemburgService.zMod(analise.c2h2, analise.ch4);
    };

    $scope.isValidPrincipal2 = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return DornemburgService.isValidPrincipal2(analise.h2,analise.ch4, analise.c2h2, analise.c2h4, analise.c2h6);
    };
    $scope.isValidAuxiliar2 = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return DornemburgService.isValidAuxiliar2(analise.h2,analise.ch4, analise.c2h2, analise.c2h4, analise.c2h6);
    };

    $scope.diagnostico = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return DornemburgService.diagnostico(analise.h2,analise.ch4, analise.c2h2, analise.c2h4, analise.c2h6);
    };
    $scope.diagnosticoMod = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return DornemburgService.diagnosticoMod(analise.h2,analise.ch4, analise.c2h2, analise.c2h4, analise.c2h6);
    };
}]);

app.controller('RogersController', ['$scope','$filter','RogersService','Analises' ,function ($scope,$filter, RogersService, Analises) {
  
    $scope.rogersCodigos = 
    [
      {
        "relacao": "W = CH4/H2", "faixas": [
                                            {"faixa": "0 < W < = 0.1", "codigo":1},
                                            {"faixa": "0.1 < W < 1 ou W = 0", "codigo":2},
                                            {"faixa": "1 <= W < 3", "codigo":3},
                                            {"faixa": "W >= 3", "codigo":4},
                                            ]
      },
      {
        "relacao": "X = C2H6/CH4", "faixas": [
                                            {"faixa": "X < 1", "codigo":0},
                                            {"faixa": "X >= 1", "codigo":1},
                                            ]
      },
      {
        "relacao": "Y = C2H4/C2H6", "faixas": [
                                            {"faixa": "Y < 1", "codigo":0},
                                            {"faixa": "1 <= Y < 3", "codigo":1},
                                            {"faixa": "Y >= 3", "codigo":2},
                                            ]
      },
      {
        "relacao": "Z = C2H2/C2H4", "faixas": [
                                            {"faixa": "Z < 0.5", "codigo":0},
                                            {"faixa": "0.5 <= Z < 3", "codigo":1},
                                            {"faixa": "Z >= 3", "codigo":2},
                                            ]
      },
    ];
    

    $scope.rogersDiags = 
    [
      {"w": 2, "x": 0, "y": 0, "z": 0, "diagnostico": "Deterioração Normal"},
      {"w": 1, "x": 0, "y": 0, "z": 0, "diagnostico": "Descargas Parciais (Corona)"},
      {"w": 3, "x": 0, "y": 0, "z": 0, "diagnostico": "Pequeno sobreaquecimento - abaixo de 150oC"},
      {"w": 4, "x": 0, "y": 0, "z": 0, "diagnostico": "Pequeno sobreaquecimento - abaixo de 150oC"},
      {"w": 3, "x": 1, "y": 0, "z": 0, "diagnostico": "Sobreaquecimento de 150oC - 200oC"},
      {"w": 4, "x": 1, "y": 0, "z": 0, "diagnostico": "Sobreaquecimento de 150oC - 200oC"},
      {"w": 2, "x": 1, "y": 0, "z": 0, "diagnostico": "Sobreaquecimento de 200oC - 300oC"},
      {"w": 2, "x": 0, "y": 1, "z": 0, "diagnostico": "Sobreaquecimento geral nos condutores"},
      {"w": 3, "x": 0, "y": 1, "z": 0, "diagnostico": "Correntes de circulação nos enrolamentos"},
      {"w": 3, "x": 0, "y": 2, "z": 0, "diagnostico": "Correntes de circulação no núcleo e tanque, sobreaquecimento em conexões"},
      {"w": 2, "x": 0, "y": 0, "z": 1, "diagnostico": "Descarga parcial com baixa densidade de energia"},
      {"w": 2, "x": 0, "y": 1, "z": 1, "diagnostico": "Arco com alta densidade de energia"},
      {"w": 2, "x": 0, "y": 1, "z": 2, "diagnostico": "Arco com alta densidade de energia"},
      {"w": 2, "x": 0, "y": 2, "z": 1, "diagnostico": "Arco com alta densidade de energia"},
      {"w": 2, "x": 0, "y": 2, "z": 2, "diagnostico": "Descarga contínua de baixo potencial"},
      {"w": 1, "x": 0, "y": 0, "z": 1, "diagnostico": "Descarga parcial envolvendo o papel"},
      {"w": 1, "x": 0, "y": 0, "z": 2, "diagnostico": "Descarga parcial envolvendo o papel"}
    ];

    $scope.w = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return RogersService.w(analise.ch4, analise.h2);
    };
    $scope.x = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return RogersService.x(analise.c2h6, analise.ch4);
    };
    $scope.y = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return RogersService.y(analise.c2h4, analise.c2h6);
    };
    $scope.z = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return RogersService.z(analise.c2h2, analise.c2h4);
    };

    $scope.nw = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return RogersService.n_w(analise.ch4, analise.h2);
    };
    $scope.nx = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return RogersService.n_x(analise.c2h6, analise.ch4);
    };
    $scope.ny = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return RogersService.n_y(analise.c2h4, analise.c2h6);
    };
    $scope.nz = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return RogersService.n_z(analise.c2h2, analise.c2h4);
    };
    
    $scope.diagnostico = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return RogersService.diagnostico(analise.h2, analise.ch4, analise.c2h2, analise.c2h4, analise.c2h6);
    };

}]);

app.controller('Iec156Controller', ['$scope','$filter','Iec156Service','Analises' ,function ($scope,$filter, Iec156Service, Analises) {
  
    $scope.iec156Codigos = 
    [
      {
        "faixa": "0.1 > R",
        "codigo1": 0,
        "codigo2": 1,
        "codigo3": 0,
      },
      {
        "faixa": "0.1 < R < 1",
        "codigo1": 1,
        "codigo2": 0,
        "codigo3": 0,
      },
      {
        "faixa": "1 < R < 3",
        "codigo1": 1,
        "codigo2": 2,
        "codigo3": 1,
      },
      {
        "relacao": "Z = C2H4/C2H6",
        "faixa": "3 < R",
        "codigo1": 2,
        "codigo2": 2,
        "codigo3": 2,
      },
    ];
    

    $scope.iec156Diags = 
    [
      {"casoN": "A", "x": "0", "y": "0", "z": "0", "diagnostico": "Condição Normal Normal",},
      {"casoN": "B", "x": "0", "y": "1", "z": "0", "diagnostico": "Descargas Parciais de pequena densidade de energia"},
      {"casoN": "C", "x": "1", "y": "1", "z": "0", "diagnostico": "Descargas Parciais de alta densidade de energia"},
      {"casoN": "D", "x": "1-2", "y": "0", "z": "1-2", "diagnostico": "Descargas elétricas de energia reduzida (Arco)"},
      {"casoN": "E", "x": "1", "y": "0", "z": "2", "diagnostico": "Descargas elétricas de alta energia (Arco)"},
      {"casoN": "F", "x": "0", "y": "0", "z": "1", "diagnostico": "Falha Técnica de Baixa Temperatura < 150oC"},
      {"casoN": "G", "x": "0", "y": "2", "z": "0", "diagnostico": "Falha Técnica de Baixa Temperatura entre 150oC e 300oC"},
      {"casoN": "H", "x": "0", "y": "2", "z": "1", "diagnostico": "Falha Técnica de Média Temperatura entre 300oC e 700oC"},
      {"casoN": "I", "x": "0", "y": "2", "z": "2", "diagnostico": "Falha Técnica de Alta Temperatura > 700oC"},
    ];

    $scope.x = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return Iec156Service.x(analise.c2h2, analise.c2h4);
    };
    $scope.y = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return Iec156Service.y(analise.ch4, analise.h2);
    };
    $scope.z = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return Iec156Service.z(analise.c2h4, analise.c2h6);
    };

    
    $scope.nx = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return Iec156Service.n_x(analise.c2h2, analise.c2h4);
    };
    $scope.ny = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return Iec156Service.n_y(analise.ch4, analise.h2);
    };
    $scope.nz = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return Iec156Service.n_z(analise.c2h4, analise.c2h6);
    };
    
    $scope.diagnostico = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return Iec156Service.diagnostico(analise.h2, analise.ch4, analise.c2h2, analise.c2h4, analise.c2h6);
    };

}]);

app.controller('LaborelecController', ['$scope','$filter','LaborelecService','Analises' ,function ($scope,$filter, LaborelecService, Analises) {
    
    $scope.laborelecData = 
    [
      {"h2":"<=200", "x":"<=300", "y":"", "c2h2":"", "co":"<=400", "indice":"A", "diagnostico":"-", "recomendacao":"Evolução Normal"},
      {"h2":"201-300", "x":"<=300", "y":"<=0.15", "c2h2":"", "co":"", "indice":"B1", "diagnostico":"Descargas parciais (óleo)", "recomendacao":"Próximo controle: Entre 6 e 12 meses"},
      {"h2":"201-300", "x":"<=300", "y":"0.16-1", "c2h2":"<=20", "co":"", "indice":"B2", "diagnostico":"Centelhamento (óleo)", "recomendacao":"Próximo controle: Entre 6 e 12 meses"},
      {"h2":"201-300", "x":"<=300", "y":"0.16-1", "c2h2":">20", "co":"", "indice":"B3", "diagnostico":"Centelhamento (óleo) ou Gás proveniente do comutador", "recomendacao":"Próximo controle: Entre 6 e 12 meses"},
      {"h2":"<=200", "x":"301-400", "y":">=0.61", "c2h2":"", "co":"<=400", "indice":"B4", "diagnostico":"Térmica (óleo)", "recomendacao":"Próximo controle: Entre 6 e 12 meses"},
      {"h2":"<=200", "x":"301-400", "y":">=0.61", "c2h2":"", "co":">400", "indice":"B5", "diagnostico":"Térmica (óleo + papel)", "recomendacao":"Próximo controle: Entre 6 e 12 meses"},
      {"h2":"<=200", "x":"301-400", "y":">=0.60", "c2h2":">20", "co":"<=400", "indice":"B6", "diagnostico":"Térmica (óleo) ou Gás proveniente do comutador", "recomendacao":"Próximo controle: Entre 6 e 12 meses"},
      {"h2":"<=200", "x":"301-400", "y":">=0.60", "c2h2":">20", "co":">400", "indice":"B7", "diagnostico":"Térmica (óleo+papel) ou Gás proveniente do comutador", "recomendacao":"Próximo controle: Entre 6 e 12 meses"},
      {"h2":"201-300", "x":"301-400", "y":"", "c2h2":">20", "co":"", "indice":"B3", "diagnostico":"", "recomendacao":"Próximo controle: Entre 6 e 12 meses"},
      {"h2":"201-300", "x":"301-400", "y":"", "c2h2":"<=20", "co":"", "indice":"B4", "diagnostico":"Térmica (óleo)", "recomendacao":"Próximo controle: Entre 6 e 12 meses"},
      {"h2":"<=200", "x":"<=300", "y":"", "c2h2":"", "co":">400", "indice":"B9", "diagnostico":"Térmica (papel)", "recomendacao":"Próximo controle: Entre 6 e 12 meses"},
      {"h2":"301-600", "x":"<=400", "y":"<=0.15", "c2h2":"", "co":"", "indice":"C1", "diagnostico":"Descargas parciais (óleo)", "recomendacao":"Próximo controle: Entre 3 e 6 meses"},
      {"h2":"301-600", "x":"<=400", "y":"0.16-1.0", "c2h2":"<=50", "co":"", "indice":"C2", "diagnostico":"Centelhamento (óleo)", "recomendacao":"Próximo controle: Entre 3 e 6 meses"},
      {"h2":"301-600", "x":"<=400", "y":"0.16-1.0", "c2h2":">50", "co":"", "indice":"C3", "diagnostico":"Centelhamento (óleo) ou Gás proveniente do comutador", "recomendacao":"Próximo controle: Entre 3 e 6 meses"},
      {"h2":"<=300", "x":"401-800", "y":">=0.61", "c2h2":"", "co":"<=500", "indice":"C4", "diagnostico":"Térmica (óleo)", "recomendacao":"Próximo controle: Entre 3 e 6 meses"},
      {"h2":"<=<=300300", "x":"401-800", "y":">=0.61", "c2h2":"", "co":">500", "indice":"C5", "diagnostico":"Térmica (óleo + papel)", "recomendacao":"Próximo controle: Entre 3 e 6 meses"},
      {"h2":"<=300", "x":"401-800", "y":"<=0.60", "c2h2":">50", "co":"<=500", "indice":"C6", "diagnostico":"Térmica (óleo) ou Gás proveniente do comutador", "recomendacao":""},
      {"h2":"<=300", "x":"401-800", "y":"<=0.60", "c2h2":">50", "co":">500", "indice":"C7", "diagnostico":"Térmica (óleo+papel) ou Gás proveniente do comutador", "recomendacao":"Próximo controle: Entre 3 e 6 meses"},
      {"h2":"301-600", "x":"401-800", "y":"", "c2h2":">50", "co":"", "indice":"C8", "diagnostico":"Arco no óleo ou Gás proveniente do comutador", "recomendacao":"Próximo controle: Entre 3 e 6 meses"},
      {"h2":"301-600", "x":"401-800", "y":"", "c2h2":"<=50", "co":"<=500", "indice":"C4", "diagnostico":"Térmica (óleo)", "recomendacao":"Próximo controle: Entre 3 e 6 meses"},
      {"h2":"301-600", "x":"401-800", "y":"", "c2h2":"<=50", "co":">500", "indice":"C5", "diagnostico":"Térmica (óleo + papel)", "recomendacao":"Próximo controle: Entre 3 e 6 meses"},
      {"h2":">=601", "x":"<=800", "y":"<=0.15", "c2h2":"", "co":"", "indice":"D1", "diagnostico":"Descargas parciais (óleo)", "recomendacao":"Para todos os índices “D” – próximo controle entre 1 e 3 meses/Nova medição do nível de descargas parciais no transformador"},
      {"h2":">=601", "x":"<=800", "y":"0.16-1.0", "c2h2":"<=50", "co":"", "indice":"D2", "diagnostico":"Centelhamento (óleo)", "recomendacao":"Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões do transformador"},
      {"h2":">=601", "x":"<=800", "y":"0.16-1.0", "c2h2":">50", "co":"", "indice":"D3", "diagnostico":"Centelhamento (óleo) ou Gás proveniente do comutador", "recomendacao":"Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões do transformador"},
      {"h2":"<=600", "x":">=801", "y":">=0.61", "c2h2":"", "co":"<=700", "indice":"D4", "diagnostico":"Térmica (óleo)", "recomendacao":"Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões (pontos quentes) e revisão no sistema de resfriamento"},
      {"h2":"<=600", "x":">=801", "y":">=0.61", "c2h2":"", "co":">700", "indice":"D5", "diagnostico":"Térmica (óleo + papel)", "recomendacao":"Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões (pontos quentes) e revisão no sistema de resfriamento"},
      {"h2":"<=600", "x":">=801", "y":"<=0.60", "c2h2":">50", "co":"<=700", "indice":"D6", "diagnostico":"Térmica (óleo) ou Gás proveniente do comutador", "recomendacao":"Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões (pontos quentes) e revisão no sistema de resfriamento"},
      {"h2":"<=600", "x":">=801", "y":"<=0.60", "c2h2":">50", "co":">700", "indice":"D7", "diagnostico":"Térmica (óleo+papel) ou Gás proveniente do comutador", "recomendacao":"Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões (pontos quentes) e revisão no sistema de resfriamento"},
      {"h2":">=601", "x":">=801", "y":"", "c2h2":">100", "co":"", "indice":"D8", "diagnostico":"Arco no óleo ou Gás proveniente do comutador", "recomendacao":"Para todos os índices “D” – próximo controle entre 1 e 3 meses/Inspeção nas conexões/determinação da resistência de isolamento (se valor baixo, considerar um reparo em oficina). Para o transformador reentrar em operação promover desgaseificação e retornar ao esquema de amostragem normal."},
      {"h2":">=601", "x":">=801", "y":"", "c2h2":"<=100", "co":"<=700", "indice":"D4", "diagnostico":"Térmica (óleo)", "recomendacao":"Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões (pontos quentes) e revisão no sistema de resfriamento"},
      {"h2":">=601", "x":">=801", "y":"", "c2h2":"<=100", "co":">700", "indice":"D5", "diagnostico":"Térmica (óleo + papel)", "recomendacao":"Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões (pontos quentes) e revisão no sistema de resfriamento"},
    ];

    $scope.ppm_h2 = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return LaborelecService.ppm_h2(analise.h2);
    };
    $scope.ppm_x = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return LaborelecService.ppm_x(analise.ch4, analise.c2h4, analise.c2h6);
    };
    $scope.ppm_y = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return LaborelecService.ppm_y(analise.ch4, analise.h2);
    };
    $scope.ppm_co = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return LaborelecService.ppm_co(analise.co);
    };
    $scope.ppm_c2h2 = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return LaborelecService.ppm_c2h2(analise.c2h2);
    };
    $scope.diagnostico = function(analise) {
      if (angular.isUndefined(analise)) {return '-'};
      return LaborelecService.diagnostico(analise.h2, analise.co, analise.ch4, analise.c2h2, analise.c2h4, analise.c2h6);
    };

}]);

app.controller('DiagController', ["limitToFilter", "$http", '$scope','Analises' ,function (limitToFilter,$http,$scope, Analises) {

  $scope.loading = true;
  $scope.tags = [];
  $scope.analises = [];

  Analises.get()
    .success(function(data) {
      
      //first sort data by most recent date (descending order)
      $scope.analises = _.sortBy(data, 'dataDaAnalise').reverse();

      //(optional) second only take the first (most recent) Analise for each tagDoEquipamento
      //there is a bug in underscore: when isSorted = true, it doesnt work at all!
      $scope.analises = _.uniq($scope.analises,false, function(aAnalise){ return aAnalise.tagDoEquipamento; });

      //third get the tags array for requesting the equipamentos
      $scope.tags =  _.pluck($scope.analises, 'tagDoEquipamento');
      $scope.tags = _.uniq($scope.tags,true);
      
      $scope.changedValue;
    });

    
  $scope.changedValue = function() {
      
    $scope.analise = _.find($scope.analises, function(aAnalise){ return aAnalise.tagDoEquipamento == $scope.selectedTag;  });

    if ($scope.analise == undefined) {
      $scope.loading = true;
    }
    else{
      $scope.loading = false;
      console.log('changedValue new tag: '+$scope.analise.tagDoEquipamento);
    }
  };   

  if(!angular.isUndefined(window.equipamento)){
    $scope.selectedTag = window.equipamento.tag;
    console.log('tagFromWindow: '+window.equipamento.tag);
    $scope.changedValue;
  }
  
  $scope.change = function(){
    $scope.selectedTag = window.equipamento.tag;
    $scope.changedValue;
  }

}]);