var app = angular.module('appDiag', ['ui.bootstrap']);

app.controller('DuvalController', ['$scope','DuvalService' ,function ($scope, DuvalService) {
    $scope.formData = {
        ch4: 0,
        c2h2: 0,
        c2h4: 0
    };
    $scope.m = 0;
    $scope.a = 0;
    $scope.y = 0;
    $scope.diagnostico = '';
    $scope.calculaM = function() {
        alert('I submit1');
        $scope.m = DuvalService.m($scope.formData.ch4, $scope.formData.c2h2, $scope.formData.c2h4);
        $scope.a = DuvalService.a($scope.formData.ch4, $scope.formData.c2h2, $scope.formData.c2h4);
        $scope.y = DuvalService.y($scope.formData.ch4, $scope.formData.c2h2, $scope.formData.c2h4);
        $scope.diagnostico = DuvalService.diagnostico($scope.formData.ch4, $scope.formData.c2h2, $scope.formData.c2h4);
    };


}]);

app.controller('TabsDemoCtrl', function ($scope, $window) {
    // $scope.curAnalise;
    // $scope.formData = {};
    $scope.createAnalise = function() {
        alert('I submit1');
        
    };
});



app.controller('ItemController', function ($scope) {
    $scope.items = [{
        title: 'Pencil',
        quantity: 81,
        price: 4.2
    }, {
        title: 'Pen',
        quantity: 2,
        price: 5.2
    }, {
        title: 'Watch',
        quantity: 3,
        price: 10.2
    }];
});

//simple service for creating Duval diagnostics
app.service('DuvalService', function() {


        this.m = function(ch4, c2h2, c2h4) {
            return (100. * ch4) / (ch4 + c2h2 + c2h4);
        };

        this.a = function(ch4, c2h2, c2h4) {
            return (100. * c2h2) / (ch4 + c2h2 + c2h4);
        };

        this.y = function(ch4, c2h2, c2h4) {
            return (100. * c2h4) / (ch4 + c2h2 + c2h4);
        };
        
        this.diagnostico = function(ch4, c2h2, c2h4) {
            
            var duval_m = this.m(ch4,c2h2,c2h4);
            var duval_a = this.a(ch4,c2h2,c2h4);
            var duval_y = this.y(ch4,c2h2,c2h4);
            if ((duval_m >=0 && duval_m <=96) && (duval_a >=0 && duval_a <=16) && (duval_y >=0 && duval_y <=100)) {
                return "Pontos Quentes";
            }
            else if ((duval_m >=0 && duval_m <=59) && (duval_a >=16 && duval_a <=75) && (duval_y >=25 && duval_y <=84)) {
                return "Arcos de Alta Energia";
            }
            else if ((duval_m >=0 && duval_m <=84) && (duval_a >=16 && duval_a <=100) && (duval_y >=0 && duval_y <=25)) {
                return "Arcos de Baixa Energia";
            }
            else if ((duval_m >=96 && duval_m <=100) && (duval_a >=0 && duval_a <=4) && (duval_y >=0 && duval_y <=4)) {
                return "Arcos de Baixa Energia";
            }
            else{
                return "-";
            }
        };

        this.diagnostico2 = function(analise) {
            return diagnostico(analise.ch4,analise.c2h2,analise.c2h4);
        };

});