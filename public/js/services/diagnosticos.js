var diagServ = angular.module('diagnosticosServices', []);

//simple service for creating Duval diagnostics
diagServ.service('DuvalService', function() {

    this.m = function(ch4, c2h2, c2h4) {
        return (100. * +ch4) / (+ch4 + +c2h2 + +c2h4);
    };

    this.a = function(ch4, c2h2, c2h4) {
        return (100. * +c2h2) / (+ch4 + +c2h2 + +c2h4);
    };

    this.y = function(ch4, c2h2, c2h4) {
        return (100. * +c2h4) / (+ch4 + +c2h2 + +c2h4);
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
});

//simple service for creating Dornemburg diagnostics
diagServ.service('DornemburgService', function() {

    this.w = function(ch4, h2) {
        return +ch4 / +h2;
    };

    this.x = function(c2h2, c2h4) {
        return +c2h2 / +c2h4;
    };

    this.y = function(c2h6, c2h2) {
        return +c2h6 / +c2h2;
    };

    this.z = function(c2h2, ch4) {
        return +c2h2 / +ch4;
    };

    this.wMod = function(ch4, h2) {
        return this.w(ch4,h2)*0.127;
    };

    this.xMod = function(c2h2, c2h4) {
        return this.x(c2h2,c2h4)*1.44;
    };

    this.yMod = function(c2h6, c2h2) {
        return this.y(c2h6,c2h2)*0.44;
    };

    this.zMod = function(c2h2, ch4) {
        return this.z(c2h2, ch4)*0.359;
    };
    
    this.diagnostico = function(h2, ch4, c2h2, c2h4, c2h6) {
        
        var dornemburg_w = this.w(ch4, h2);
        var dornemburg_x = this.x(c2h2, c2h4);
        var dornemburg_y = this.y(c2h6, c2h2);
        var dornemburg_z = this.z(c2h2, ch4);

        if (dornemburg_w >1 && dornemburg_x <0.75 && dornemburg_y >0.4 && dornemburg_z <0.3) {
            return "Pontos Quentes";
        }
        else if (dornemburg_w >1 && dornemburg_y >0.4 && dornemburg_z <0.3) {
            return "Descarga Parcial";
        }
        else if ((dornemburg_w >0.1 && dornemburg_w <1) && dornemburg_x >0.75 && dornemburg_y <0.4 && dornemburg_z >0.3) {
            return "Outros tipos de descarga";
        }
        else{
            return "-";
        }
    };     

    this.diagnosticoMod = function(h2, ch4, c2h2, c2h4, c2h6) {
        
        var dornemburg_w = this.wMod(ch4, h2);
        var dornemburg_x = this.xMod(c2h2, c2h4);
        var dornemburg_y = this.yMod(c2h6, c2h2);
        var dornemburg_z = this.zMod(c2h2, ch4);

        if (dornemburg_w >0.1 && dornemburg_x <1.0 && dornemburg_y >0.2 && dornemburg_z <0.1) {
            return "Pontos Quentes";
        }
        else if (dornemburg_w <0.01 && dornemburg_y >0.2 && dornemburg_z <0.1) {
            return "Descarga Internas";
        }
        else if ((dornemburg_w >0.01 && dornemburg_w <0.1) && dornemburg_x >1 && dornemburg_y <0.2 && dornemburg_z <0.1) {
            return "Descargas Elétricas (exceto descargas internas)";
        }
        else{
            return "-";
        }
    }; 
});

//simple service for creating Rogers diagnostics
diagServ.service('RogersService', function() {

    this.w = function(ch4, h2) {
        return +ch4 / +h2;
    };

    this.x = function(c2h6, ch4) {
        return +c2h6 / +ch4;
    };

    this.y = function(c2h4, c2h6) {
        return +c2h4 / +c2h6;
    };

    this.z = function(c2h2, c2h4) {
        return +c2h2 / +c2h4;
    };

    this.n_w = function(ch4, h2) {
        var rogers_w = this.w(ch4,h2);
        if (rogers_w >0 && rogers_w <=0.1) {
            return 1;
        }
        else if (rogers_w ==0 || (rogers_w >0.1 && rogers_w <1)) {
            return 2;
        }
        else if(rogers_w >=1 && rogers_w <3){
            return 3;
        }
        else {
            return 4;
        }
    };

    this.n_x = function(c2h6, ch4) {
        var rogers_x = this.x(c2h6,ch4);
        if (rogers_x <1) {
            return 0;
        }
        else {
            return 1;
        }
    };

    this.n_y = function(c2h4, c2h6) {
        var rogers_y = this.y(c2h4, c2h6);
        if (rogers_y <1) {
            return 0;
        }
        else if (rogers_y >=1 && rogers_y < 3) {
            return 1;
        }
        else {
            return 2;
        }
    };

    this.n_z = function(c2h2, c2h4) {
        var rogers_z = this.z(c2h2, c2h4);
        if (rogers_z <0.5) {
            return 0;
        }
        else if (rogers_z >=0.5 && rogers_z < 3) {
            return 1;
        }
        else {
            return 2;
        }
    };
    
    this.diagnostico = function(h2, ch4, c2h2, c2h4, c2h6) {
        
        var nw = this.n_w(ch4,h2);
        var nx = this.n_x(c2h6,ch4);
        var ny = this.n_y(c2h4,c2h6);
        var nz = this.n_z(c2h2,c2h4);
        if      (nw == 2 && nx == 0 && ny == 0 && nz ==0) {return "Deterioração Normal";}
        else if (nw == 1 && nx == 0 && ny == 0 && nz ==0) {return "Descargas Parcias (Corona)";}
        else if (nw == 3 && nx == 0 && ny == 0 && nz ==0) {return "Pequeno Sobreaquecimento - abaixo de 150oC";}
        else if (nw == 4 && nx == 0 && ny == 0 && nz ==0) {return "Pequeno Sobreaquecimento - abaixo de 150oC";}
        else if (nw == 3 && nx == 1 && ny == 0 && nz ==0) {return "Sobreaquecimento de 150oC- 200oC";}
        else if (nw == 4 && nx == 1 && ny == 0 && nz ==0) {return "Sobreaquecimento de 150oC- 200oC";}
        else if (nw == 2 && nx == 1 && ny == 0 && nz ==0) {return "Sobreaquecimento de 200oC- 300oC";}
        else if (nw == 2 && nx == 0 && ny == 1 && nz ==0) {return "Sobreaquecimento geral nos condutores";}
        else if (nw == 3 && nx == 0 && ny == 1 && nz ==0) {return "Correntes de circulação nos enrolamentos";}
        else if (nw == 3 && nx == 0 && ny == 2 && nz ==0) {return "Correntes de circulação no núcleo e tanque, sobreaquecimento em conexões";}
        else if (nw == 2 && nx == 0 && ny == 0 && nz ==1) {return "Descarga Parcial com baixa densidade de energia";}
        else if (nw == 2 && nx == 0 && ny == 1 && nz ==1) {return "Arco com alta densidade de energia";}
        else if (nw == 2 && nx == 0 && ny == 1 && nz ==2) {return "Arco com alta densidade de energia";}
        else if (nw == 2 && nx == 0 && ny == 2 && nz ==1) {return "Arco com alta densidade de energia";}
        else if (nw == 2 && nx == 0 && ny == 2 && nz ==2) {return "Descarga contínua de baixo potencial";}
        else if (nw == 1 && nx == 0 && ny == 0 && nz ==1) {return "Descarga Parcial envolvendo o papel";}
        else if (nw == 1 && nx == 0 && ny == 0 && nz ==2) {return "Descarga Parcial envolvendo o papel";}
        else {return '-'};
        
    };     
});