angular.module('diagnosticosServices', [])

    //simple service for creating Duval diagnostics
    .factory('Duval', function() {


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
            var duval_m = m(ch4,c2h2,c2h4);
            var duval_a = a(ch4,c2h2,c2h4);
            var duval_y = y(ch4,c2h2,c2h4);
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