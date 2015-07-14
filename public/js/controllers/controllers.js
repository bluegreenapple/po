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

app.controller('DiagController', ["limitToFilter", "$http", '$scope','Analises' ,function (limitToFilter,$http,$scope, Analises) {



  // $scope.tag= "2313";
  $scope.loading = true;

  // console.log('lalalal'+ $scope.tag);  

  // $scope.findUltimaAnalise = function() {
  //   alert('piro');
  //   console.log('touch');
  //     Analises.getByTag($scope.tag)
  //     .success(function(data) {
  //       $scope.analise =  _.last(_.sortBy(data, 'dataDaAnalise'));
  //       $scope.loading = false;
  //     });
  // };


  
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
      
      $scope.changedValue();
    });

    
  $scope.changedValue = function() {
      
    $scope.analise = _.find($scope.analises, function(aAnalise){ return aAnalise.tagDoEquipamento == $scope.selectedTag;  });
    if ($scope.analise == undefined) {
      $scope.loading = true;
    }
    else{
      $scope.loading = false;
    }
  };   

  if(!angular.isUndefined(window.equipamento)){
    $scope.selectedTag = window.equipamento.tag;
    
    $scope.changedValue();
  }
  
  // Analises.getByTag($scope.tag)
  //     .success(function(data) {
  //       console.log('lalalal');
  //       $scope.analise =  _.last(_.sortBy(data, 'dataDaAnalise'));
  //       // console.log('analise: ' + $scope.analise.tagDoEquipamento);
  //     });
}]);