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
    
    this.diagnosticoCod = function(ch4, c2h2, c2h4) {
        
        var duval_m = this.m(ch4,c2h2,c2h4);
        var duval_a = this.a(ch4,c2h2,c2h4);
        var duval_y = this.y(ch4,c2h2,c2h4);
        if ((duval_m >=0 && duval_m <=96) && (duval_a >=0 && duval_a <=16) && (duval_y >=0 && duval_y <=100)) {
            return 1;
        }
        else if ((duval_m >=0 && duval_m <=59) && (duval_a >=16 && duval_a <=75) && (duval_y >=25 && duval_y <=84)) {
            return 2;
        }
        else if ((duval_m >=0 && duval_m <=84) && (duval_a >=16 && duval_a <=100) && (duval_y >=0 && duval_y <=25)) {
            return 3;
        }
        else if ((duval_m >=96 && duval_m <=100) && (duval_a >=0 && duval_a <=4) && (duval_y >=0 && duval_y <=4)) {
            return 4;
        }
        else{
            return 5;
        }
    };   

    this.diagnostico = function(ch4, c2h2, c2h4) {
        
        var cod = this.diagnosticoCod(ch4, c2h2, c2h4);
        if      (cod == 1) { return 'Pontos Quentes';}
        else if (cod == 2) { return 'Arcos de Alta Energia';}
        else if (cod == 3) { return 'Arcos de Baixa Energia';}
        else if (cod == 4) { return 'Arcos de Baixa Energia';}
        else               { return '-';}
    };

    this.diagnosticoClass = function(ch4, c2h2, c2h4) {
        
        var cod = this.diagnosticoCod(ch4, c2h2, c2h4);

        if      (cod == 1) { return 'duval_01';}
        else if (cod == 2) { return 'duval_02';}
        else if (cod == 3) { return 'duval_03';}
        else if (cod == 4) { return 'duval_04';}
        else               { return 'duval_00';}
    };      
});

//simple service for creating Doble diagnostics
diagServ.service('DobleService', function() {

    this.h2 = function(h2, tgc) {
        return +h2 / +tgc *100.;
    };

    this.ch4 = function(ch4, tgc) {
        return +ch4 / +tgc *100.;
    };

    this.c2h4 = function(c2h4, tgc) {
        return +c2h4 / +tgc *100.;
    };

    this.c2h6 = function(c2h6, tgc) {
        return +c2h6 / +tgc *100.;
    };

    this.c2h2 = function(c2h2, tgc) {
        return +c2h2 / +tgc *100.;
    };

    this.co = function(co, tgc) {
        return +co / +tgc *100.;
    };
    
    this.diagnostico = function(h2, ch4, c2h2, c2h4, c2h6, tgc) {
        
        
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
    
    this.isValidPrincipal = function(h2, ch4, c2h2, c2h4, c2h6) {
        return (h2>2*100 || ch4>2*120 || c2h6>2*65 || c2h4>2*50 || c2h2>2*35);
    };

    this.isValidAuxiliar = function(ch4, c2h2, c2h4, c2h6) {
        return (c2h6>65 || c2h4>50 || c2h2>35);
    };

    this.isValidPrincipal2= function(h2, ch4, c2h2, c2h4, c2h6) {
        if (this.isValidPrincipal(h2, ch4, c2h2, c2h4, c2h6)) {return 'sim'};
        return 'não';
    };

    this.isValidAuxiliar2 = function(ch4, c2h2, c2h4, c2h6) {
        if (this.isValidAuxiliar(ch4, c2h2, c2h4, c2h6)) {return 'sim'};
        return 'não';
    };

    this.isValid = function(h2, ch4, c2h2, c2h4, c2h6) {
        return this.isValidPrincipal(h2, ch4, c2h2, c2h4, c2h6) && this.isValidAuxiliar(ch4, c2h2, c2h4, c2h6);
    };


    this.diagnosticoCod = function(h2, ch4, c2h2, c2h4, c2h6) {
        
        if (!this.isValid(h2, ch4, c2h2, c2h4, c2h6)) {return 'critério não se aplica'};

        var dornemburg_w = this.w(ch4, h2);
        var dornemburg_x = this.x(c2h2, c2h4);
        var dornemburg_y = this.y(c2h6, c2h2);
        var dornemburg_z = this.z(c2h2, ch4);

        if (dornemburg_w >1 && dornemburg_x <0.75 && dornemburg_y >0.4 && dornemburg_z <0.3) {
            return 1;
        }
        else if (dornemburg_w >1 && dornemburg_y >0.4 && dornemburg_z <0.3) {
            return 2;
        }
        else if ((dornemburg_w >0.1 && dornemburg_w <1) && dornemburg_x >0.75 && dornemburg_y <0.4 && dornemburg_z >0.3) {
            return 3;
        }
        else{
            return 0;
        }
    };     

    this.diagnostico = function(h2, ch4, c2h2, c2h4, c2h6) {
        
        var cod = this.diagnosticoCod(h2, ch4, c2h2, c2h4, c2h6);
        if      (cod == 1) { return 'Pontos Quentes';}
        else if (cod == 2) { return 'Descarga Parcial';}
        else if (cod == 3) { return 'Outros tipos de descarga';}
        else               { return 'Normal';}
    };

    this.diagnosticoClass = function(h2, ch4, c2h2, c2h4, c2h6) {
        
        var cod = this.diagnosticoCod(h2, ch4, c2h2, c2h4, c2h6);

        if      (cod == 1) { return 'dornemburg_01';}
        else if (cod == 2) { return 'dornemburg_02';}
        else if (cod == 3) { return 'dornemburg_03';}
        else               { return 'dornemburg_00';}
    };   

    this.diagnosticoModCod = function(h2, ch4, c2h2, c2h4, c2h6) {
        
        var dornemburg_w = this.wMod(ch4, h2);
        var dornemburg_x = this.xMod(c2h2, c2h4);
        var dornemburg_y = this.yMod(c2h6, c2h2);
        var dornemburg_z = this.zMod(c2h2, ch4);

        if (dornemburg_w >0.1 && dornemburg_x <1.0 && dornemburg_y >0.2 && dornemburg_z <0.1) {
            return 1;
        }
        else if (dornemburg_w <0.01 && dornemburg_y >0.2 && dornemburg_z <0.1) {
            return 2;
        }
        else if ((dornemburg_w >0.01 && dornemburg_w <0.1) && dornemburg_x >1 && dornemburg_y <0.2 && dornemburg_z <0.1) {
            return 3;
        }
        else{
            return 0;
        }
    }; 

    this.diagnosticoMod = function(ch4, c2h2, c2h4) {
        
        var cod = this.diagnosticoModCod(h2, ch4, c2h2, c2h4, c2h6);
        if      (cod == 1) { return 'Pontos Quentes';}
        else if (cod == 2) { return 'Descarga Parcial';}
        else if (cod == 3) { return 'Outros tipos de descarga';}
        else               { return 'Normal';}
    };

    this.diagnosticoModClass = function(ch4, c2h2, c2h4) {
        
        var cod = this.diagnosticoModCod(h2, ch4, c2h2, c2h4, c2h6);

        if      (cod == 1) { return 'dornemburg_01';}
        else if (cod == 2) { return 'dornemburg_02';}
        else if (cod == 3) { return 'dornemburg_03';}
        else               { return 'dornemburg_00';}
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
    
    this.diagnosticoCod = function(h2, ch4, c2h2, c2h4, c2h6) {
        
        var nw = this.n_w(ch4,h2);
        var nx = this.n_x(c2h6,ch4);
        var ny = this.n_y(c2h4,c2h6);
        var nz = this.n_z(c2h2,c2h4);
        if      (nw == 2 && nx == 0 && ny == 0 && nz ==0) {return 1;}
        else if (nw == 1 && nx == 0 && ny == 0 && nz ==0) {return 2;}
        else if (nw == 3 && nx == 0 && ny == 0 && nz ==0) {return 3;}
        else if (nw == 4 && nx == 0 && ny == 0 && nz ==0) {return 4;}
        else if (nw == 3 && nx == 1 && ny == 0 && nz ==0) {return 5;}
        else if (nw == 4 && nx == 1 && ny == 0 && nz ==0) {return 6;}
        else if (nw == 2 && nx == 1 && ny == 0 && nz ==0) {return 7;}
        else if (nw == 2 && nx == 0 && ny == 1 && nz ==0) {return 8;}
        else if (nw == 3 && nx == 0 && ny == 1 && nz ==0) {return 9;}
        else if (nw == 3 && nx == 0 && ny == 2 && nz ==0) {return 10;}
        else if (nw == 2 && nx == 0 && ny == 0 && nz ==1) {return 11;}
        else if (nw == 2 && nx == 0 && ny == 1 && nz ==1) {return 12;}
        else if (nw == 2 && nx == 0 && ny == 1 && nz ==2) {return 13;}
        else if (nw == 2 && nx == 0 && ny == 2 && nz ==1) {return 14;}
        else if (nw == 2 && nx == 0 && ny == 2 && nz ==2) {return 15;}
        else if (nw == 1 && nx == 0 && ny == 0 && nz ==1) {return 16;}
        else if (nw == 1 && nx == 0 && ny == 0 && nz ==2) {return 17;}
        else {return 0;};
        
    };   

    this.diagnostico = function(h2, ch4, c2h2, c2h4, c2h6) {
        
        var cod = this.diagnosticoCod(h2, ch4, c2h2, c2h4, c2h6);

        if      (cod == 1) {return "Deterioração Normal";}
        else if (cod == 2) {return "Descargas Parcias (Corona)";}
        else if (cod == 3) {return "Pequeno Sobreaquecimento - abaixo de 150oC";}
        else if (cod == 4) {return "Pequeno Sobreaquecimento - abaixo de 150oC";}
        else if (cod == 5) {return "Sobreaquecimento de 150oC- 200oC";}
        else if (cod == 6) {return "Sobreaquecimento de 150oC- 200oC";}
        else if (cod == 7) {return "Sobreaquecimento de 200oC- 300oC";}
        else if (cod == 8) {return "Sobreaquecimento geral nos condutores";}
        else if (cod == 9) {return "Correntes de circulação nos enrolamentos";}
        else if (cod == 10) {return "Correntes de circulação no núcleo e tanque, sobreaquecimento em conexões";}
        else if (cod == 11) {return "Descarga Parcial com baixa densidade de energia";}
        else if (cod == 12) {return "Arco com alta densidade de energia";}
        else if (cod == 13) {return "Arco com alta densidade de energia";}
        else if (cod == 14) {return "Arco com alta densidade de energia";}
        else if (cod == 15) {return "Descarga contínua de baixo potencial";}
        else if (cod == 16) {return "Descarga Parcial envolvendo o papel";}
        else if (cod == 17) {return "Descarga Parcial envolvendo o papel";}
        else {return '-'};
        
    }; 

    this.diagnosticoClass = function(h2, ch4, c2h2, c2h4, c2h6) {
        
        var cod = this.diagnosticoCod(h2, ch4, c2h2, c2h4, c2h6);

        if      (cod == 1) {return "rogers_01";}
        else if (cod == 2) {return "rogers_02";}
        else if (cod == 3) {return "rogers_03";}
        else if (cod == 4) {return "rogers_04";}
        else if (cod == 5) {return "rogers_05";}
        else if (cod == 6) {return "rogers_06";}
        else if (cod == 7) {return "rogers_07";}
        else if (cod == 8) {return "rogers_08";}
        else if (cod == 9) {return "rogers_09";}
        else if (cod == 10) {return "rogers_10";}
        else if (cod == 11) {return "rogers_11";}
        else if (cod == 12) {return "rogers_12";}
        else if (cod == 13) {return "rogers_13";}
        else if (cod == 14) {return "rogers_14";}
        else if (cod == 15) {return "rogers_15";}
        else if (cod == 16) {return "rogers_16";}
        else if (cod == 17) {return "rogers_17";}
        else {return 'rogers_00'};
        
    }; 
});

//simple service for creating Iec156 diagnostics
diagServ.service('Iec156Service', function() {

    this.x = function(c2h2, c2h4) {
        return +c2h2 / +c2h4;
    };

    this.y = function(ch4, h2) {
        return +ch4 / +h2;
    };

    this.z = function(c2h4, c2h6) {
        return +c2h4 / +c2h6;
    };


    this.n_x = function(c2h2, c2h4) {
        var iec156_x = this.x(c2h2, c2h4);
        if (iec156_x < 0.1) {
            return 0;
        }
        else if (iec156_x >= 0.1 && iec156_x < 1.0) {
            return 1;
        }
        else if (iec156_x >= 1 && iec156_x < 3) {
            return 1;
        }
        else {
            return 2;
        }
    };

    this.n_y = function(ch4, h2) {
        var iec156_y = this.x(ch4, h2);
        if (iec156_y < 0.1) {
            return 1;
        }
        else if (iec156_y >= 0.1 && iec156_y < 1.0) {
            return 0;
        }
        else if (iec156_y >= 1 && iec156_y < 3) {
            return 2;
        }
        else {
            return 2;
        }
    };

    this.n_z = function(c2h4, c2h6) {
        var iec156_z = this.x(c2h4, c2h6);
        if (iec156_z < 0.1) {
            return 0;
        }
        else if (iec156_z >= 0.1 && iec156_z < 1.0) {
            return 0;
        }
        else if (iec156_z >= 1 && iec156_z < 3) {
            return 1;
        }
        else {
            return 2;
        }
    };
    
    this.diagnostico = function(h2, ch4, c2h2, c2h4, c2h6) {
        
        var cod = this.diagnosticoCod(h2, ch4, c2h2, c2h4, c2h6);

        if      (cod == 1) {return {"casoN": "A", "diagnostico":"Condição Normal"};}
        else if (cod == 2) {return {"casoN": "B", "diagnostico":"Descargas parciais de pequena densidade de energia"};}
        else if (cod == 3) {return {"casoN": "C", "diagnostico":"Descargas parciais de alta intensidade de energia"};}
        else if (cod == 4) {return {"casoN": "D", "diagnostico":"Descargas elétricas de energia reduzida (Arco)"};}
        else if (cod == 5) {return {"casoN": "E", "diagnostico":"Descargas elétricas de alta energia (Arco)"};}
        else if (cod == 6) {return {"casoN": "F", "diagnostico":"Falha técnica de baixa temperatura <150oC"};}
        else if (cod == 7) {return {"casoN": "G", "diagnostico":"Falha técnica de baixa temperatura entre 150oC e 300oC"};}
        else if (cod == 8) {return {"casoN": "H", "diagnostico":"Falha técnica de média temperatura entre 300oC e 700oC"};}
        else if (cod) {return {"casoN": "I", "diagnostico":"Falha técnica de alta temperatura >700oC"};}
        else {return '-';}
        
    };    

    this.diagnosticoCod = function(h2, ch4, c2h2, c2h4, c2h6) {
        
        var nx = this.n_x(c2h2, c2h4);
        var ny = this.n_y(ch4, h2);
        var nz = this.n_z(c2h4, c2h6);
        if      (nx == 0 && ny == 0 && nz ==0) {return 1;}
        else if (nx == 0 && ny == 1 && nz ==0) {return 2;}
        else if (nx == 1 && ny == 1 && nz ==0) {return 3;}
        else if ((nx >= 1 && nx <= 2) && ny == 0 && (nz >=1 && nz <= 2)) {return 4;}
        else if (nx == 1 && ny == 0 && nz ==2) {return 5;}
        else if (nx == 0 && ny == 0 && nz ==1) {return 6;}
        else if (nx == 0 && ny == 2 && nz ==0) {return 7;}
        else if (nx == 0 && ny == 2 && nz ==1) {return 8;}
        else if (nx == 0 && ny == 2 && nz ==2) {return 9;}
        else {return 0;}
        
    };  

     this.diagnosticoClass = function(h2, ch4, c2h2, c2h4, c2h6) {
        
        // return 'iec156_01';
        var cod = this.diagnosticoCod(h2, ch4, c2h2, c2h4, c2h6);

        if      (cod == 0) {return 'iec156_01';}
        else if (cod == 1) {return 'iec156_02';}
        else if (cod == 2) {return 'iec156_03';}
        else if (cod == 3) {return 'iec156_04';}
        else if (cod == 4) {return 'iec156_05';}
        else if (cod == 5) {return 'iec156_06';}
        else if (cod == 6) {return 'iec156_07';}
        else if (cod == 7) {return 'iec156_08';}
        else if (cod == 8) {return 'iec156_09';}
        else {return 'iec156_00';}
        
    };  
});

//simple service for creating Iec156 diagnostics
diagServ.service('LaborelecService', function() {


    this.ppm_h2 = function(h2) {
        return +h2;
    };

    this.ppm_x = function(ch4, c2h4, c2h6) {
        return (+ch4 + +c2h4 + +c2h6);
    };

    this.ppm_y = function(ch4, h2) {
        return +ch4 / +h2;
    };

    this.ppm_c2h2 = function(c2h2) {
        return +c2h2;
    };

    this.ppm_co = function(co) {
        return +co;
    };

    
    this.diagnostico = function(h2, co, ch4, c2h2, c2h4, c2h6) {
        
        var cod = this.diagnosticoCod(h2, co, ch4, c2h2, c2h4, c2h6);

        if      (cod == 1) {return {"indice": "A", "diagnostico":"Normal", "recomendacao": "Evolução Normal"};}
        
        else if (cod == 2) {return {"indice": "B1", "diagnostico":"Descargas parciais (óleo) - Média", "recomendacao": "Próximo controle: Entre 6 e 12 meses"};}
        else if (cod == 3) {return {"indice": "B2", "diagnostico":"Centelhamento (óleo) - Média", "recomendacao": "Próximo controle: Entre 6 e 12 meses"};}
        else if (cod == 4) {return {"indice": "B3", "diagnostico":"Centelhamento (óleo) ou Gás proveniente do comutador - Média", "recomendacao": "Próximo controle: Entre 6 e 12 meses"};}
        
        else if (cod == 5) {return {"indice": "B4", "diagnostico":"Térmica (óleo) - Média", "recomendacao": "Próximo controle: Entre 6 e 12 meses"};}
        else if (cod == 6) {return {"indice": "B5", "diagnostico":"Térmica (óleo + papel) - Média", "recomendacao": "Próximo controle: Entre 6 e 12 meses"};}
        else if (cod == 7) {return {"indice": "B6", "diagnostico":"Térmica (óleo) ou Gás proveniente do comutador - Média", "recomendacao": "Próximo controle: Entre 6 e 12 meses"};}
        else if (cod == 8) {return {"indice": "B7", "diagnostico":"Térmica (óleo+papel) ou Gás proveniente do comutador - Média", "recomendacao": "Próximo controle: Entre 6 e 12 meses"};}
        
        else if (cod == 9) {return {"indice": "B3", "diagnostico":"Centelhamento (óleo) ou Gás proveniente do comutador - Média", "recomendacao": "Próximo controle: Entre 6 e 12 meses"};}
        else if (cod == 10) {return {"indice": "B4", "diagnostico":"Térmica (óleo) - Média", "recomendacao": "Próximo controle: Entre 6 e 12 meses"};}
        
        else if (cod == 11) {return {"indice": "B9", "diagnostico":"Térmica (papel) - Média", "recomendacao": "Próximo controle: Entre 6 e 12 meses"};}
        
        else if (cod == 12) {return {"indice": "C1", "diagnostico":"Descargas parciais (óleo) – Importante", "recomendacao": "Próximo controle: Entre 3 e 6 meses"};}
        else if (cod == 13) {return {"indice": "C2", "diagnostico":"Centelhamento (óleo) – Importante", "recomendacao": "Próximo controle: Entre 3 e 6 meses"};}
        else if (cod == 14) {return {"indice": "C3", "diagnostico":"Centelhamento (óleo) ou Gás proveniente do comutador – Importante", "recomendacao": "Próximo controle: Entre 3 e 6 meses"};}
    
        else if (cod == 15) {return {"indice": "C4", "diagnostico":"Térmica (óleo) – Importante", "recomendacao": "Próximo controle: Entre 3 e 6 meses"};}
        else if (cod == 16) {return {"indice": "C5", "diagnostico":"Térmica (óleo + papel) – Importante", "recomendacao": "Próximo controle: Entre 3 e 6 meses"};}
        else if (cod == 17) {return {"indice": "C6", "diagnostico":"Térmica (óleo) ou Gás proveniente do comutador – Importante", "recomendacao": "Próximo controle: Entre 3 e 6 meses"};}
        else if (cod == 18) {return {"indice": "C7", "diagnostico":"Térmica (óleo+papel) ou Gás proveniente do comutador – Importante", "recomendacao": "Próximo controle: Entre 3 e 6 meses"};}
        
        else if (cod == 19) {return {"indice": "C8", "diagnostico":"Arco no óleo ou Gás proveniente do comutador – Importante", "recomendacao": "Próximo controle: Entre 3 e 6 meses"};}
        else if (cod == 20) {return {"indice": "C4", "diagnostico":"Térmica (óleo) – Importante", "recomendacao": "Próximo controle: Entre 3 e 6 meses"};}
        else if (cod == 21) {return {"indice": "C5", "diagnostico":"Térmica (óleo + papel) – Importante", "recomendacao": "Próximo controle: Entre 3 e 6 meses"};}
        
        else if (cod == 22) {return {"indice": "D1", "diagnostico":"Descargas parciais (óleo) – Muito", "recomendacao": "Para todos os índices “D” – próximo controle entre 1 e 3 meses/Nova medição do nível de descargas parciais no transformador"};}
        else if (cod == 23) {return {"indice": "D2",  "diagnostico":"Centelhamento (óleo) – Muito", "recomendacao": "Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões do transformador"};}
        else if (cod == 24) {return {"indice": "D3", "diagnostico":"Centelhamento (óleo) ou Gás proveniente do comutador – Muito", "recomendacao": "Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões do transformador"};}

        else if (cod == 25) {return {"indice": "D4", "diagnostico":"Térmica (óleo) – Muito", "recomendacao": "Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões (pontos quentes) e revisão no sistema de resfriamento"};}
        else if (cod == 26) {return {"indice": "D5", "diagnostico":"Térmica (óleo + papel) – Muito", "recomendacao": "Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões (pontos quentes) e revisão no sistema de resfriamento"};}
        else if (cod == 27) {return {"indice": "D6", "diagnostico":"Térmica (óleo) ou Gás proveniente do comutador – Muito", "recomendacao": "Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões (pontos quentes) e revisão no sistema de resfriamento"};}
        else if (cod == 28) {return {"indice": "D7", "diagnostico":"Térmica (óleo+papel) ou Gás proveniente do comutador – Muito", "recomendacao": "Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões (pontos quentes) e revisão no sistema de resfriamento"};}

        else if (cod == 29) {return {"indice": "D8", "diagnostico":"Arco no óleo ou Gás proveniente do comutador – Muito", "recomendacao": "Para todos os índices “D” – próximo controle entre 1 e 3 meses/Inspeção nas conexões/determinação da resistência de isolamento (se valor baixo, considerar um reparo em oficina). Para o transformador reentrar em operação promover desgaseificação e retornar ao esquema de amostragem normal."};}
        else if (cod == 30) {return {"indice": "D4", "diagnostico":"Térmica (óleo) – Muito", "recomendacao": "Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões (pontos quentes) e revisão no sistema de resfriamento"};}
        else if (cod == 31) {return {"indice": "D5", "diagnostico":"Térmica (óleo + papel) – Muito", "recomendacao": "Térmica (óleo + papel)", "recomendacao":"Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões (pontos quentes) e revisão no sistema de resfriamento"};}

        else {return {"indice":"-","diagnostico":"-", "recomendacao": "-"}};
        
    }; 

    this.diagnosticoCod = function(h2, co, ch4, c2h2, c2h4, c2h6) {
        
        var ppm_h2 = this.ppm_h2(h2);
        var ppm_x = this.ppm_x(ch4, c2h4, c2h6);
        var ppm_y = this.ppm_y(ch4, h2);
        var ppm_co = this.ppm_co(co);
        var ppm_c2h2 = this.ppm_c2h2(c2h2);
        
        if      (ppm_h2 <= 200 && ppm_x <= 300 && ppm_co <= 400) {return 1;}
        
        else if ((ppm_h2 >= 201 && ppm_h2 <= 300) && ppm_x <= 300 && ppm_y<=0.15) {return 2;}
        else if ((ppm_h2 >= 201 && ppm_h2 <= 300) && ppm_x <= 300 && (ppm_y>=0.16 && ppm_y<=1) && ppm_c2h2<=20) {return 3;}
        else if ((ppm_h2 >= 201 && ppm_h2 <= 300) && ppm_x <= 300 && (ppm_y>=0.16 && ppm_y<=1) && ppm_c2h2>20) {return 4;}
        
        else if (ppm_h2 <= 200 && (ppm_x >= 301 && ppm_x <= 400) && ppm_y>=0.61 && ppm_co<=400) {return 5;}
        else if (ppm_h2 <= 200 && (ppm_x >= 301 && ppm_x <= 400) && ppm_y>=0.61 && ppm_co>400) {return 6;}
        else if (ppm_h2 <= 200 && (ppm_x >= 301 && ppm_x <= 400) && ppm_y>=0.60 && ppm_c2h2>20 && ppm_co<=400) {return 7;}
        else if (ppm_h2 <= 200 && (ppm_x >= 301 && ppm_x <= 400) && ppm_y>=0.60 && ppm_c2h2>20 && ppm_co>400) {return 8;}
        
        else if ((ppm_h2 >= 201 && ppm_h2 <= 300) && ppm_x <= 300 && ppm_c2h2>20) {return 9;}
        else if ((ppm_h2 >= 201 && ppm_h2 <= 300) && ppm_x <= 300 && ppm_c2h2<=20) {return 10;}
        
        else if (ppm_h2 <= 200 && ppm_x <= 300 && ppm_co > 400) {return 11;}
        
        else if ((ppm_h2 >= 301 && ppm_h2 <= 600) && ppm_x <= 400 && ppm_y<=0.15) {return 12;}
        else if ((ppm_h2 >= 301 && ppm_h2 <= 600) && ppm_x <= 400 && (ppm_y>=0.16 && ppm_y<=1) && ppm_c2h2 <=50) {return 13;}
        else if ((ppm_h2 >= 301 && ppm_h2 <= 600) && ppm_x <= 400 && (ppm_y>=0.16 && ppm_y<=1) && ppm_c2h2 >50) {return 14;}
        
        else if (ppm_h2 <= 300 && (ppm_x >= 401 && ppm_x <= 800) && ppm_y>=0.61 && ppm_co<=500) {return 15;}
        else if (ppm_h2 <= 300 && (ppm_x >= 401 && ppm_x <= 800) && ppm_y>=0.61 && ppm_co>500) {return 16;}
        else if (ppm_h2 <= 300 && (ppm_x >= 401 && ppm_x <= 800) && ppm_y>=0.60 && ppm_c2h2>50 && ppm_co<=500) {return 17;}
        else if (ppm_h2 <= 300 && (ppm_x >= 401 && ppm_x <= 800) && ppm_y>=0.60 && ppm_c2h2>50 && ppm_co>500) {return 18;}
        
        else if ((ppm_h2 >= 301 && ppm_h2 <= 600) && (ppm_x >= 401 && ppm_x <= 800) && ppm_c2h2>50) {return 19;}
        else if ((ppm_h2 >= 301 && ppm_h2 <= 600) && (ppm_x >= 401 && ppm_x <= 800) && ppm_c2h2<=50 && ppm_co<=500) {return 20;}
        else if ((ppm_h2 >= 301 && ppm_h2 <= 600) && (ppm_x >= 401 && ppm_x <= 800) && ppm_c2h2<=50 && ppm_co>500) {return 21;}
        
        else if (ppm_h2 >= 601 && ppm_x <= 800 && ppm_y<=0.15) {return 22;}
        else if (ppm_h2 >= 601 && ppm_x <= 800 && (ppm_y>=0.16 && ppm_y<=1) && ppm_c2h2<=50) {return 23;}
        else if (ppm_h2 >= 601 && ppm_x <= 800 && (ppm_y>=0.16 && ppm_y<=1) && ppm_c2h2>50) {return 24;}

        else if (ppm_h2 <= 600 && ppm_x >= 801 && ppm_y>=0.61 && ppm_co<=700) {return 25;}
        else if (ppm_h2 <= 600 && ppm_x >= 801 && ppm_y>=0.61 && ppm_co>700) {return 26;}
        else if (ppm_h2 <= 600 && ppm_x >= 801 && ppm_y>=0.60 && ppm_c2h2>50 && ppm_co<=700) {return 27;}
        else if (ppm_h2 <= 600 && ppm_x >= 801 && ppm_y>=0.60 && ppm_c2h2>50 && ppm_co>700) {return 28;}

        else if (ppm_h2 >= 601 && ppm_x >= 801 && ppm_c2h2>100) {return 29;}
        else if (ppm_h2 >= 601 && ppm_x >= 801 && ppm_c2h2<=100 && ppm_co<=700) {return 30;}
        else if (ppm_h2 >= 601 && ppm_x >= 801 && ppm_c2h2<=100 && ppm_co>700) {return 31;}


        else {return 0;}
        
    };   
 
    this.diagnosticoClass = function(h2, co, ch4, c2h2, c2h4, c2h6) {
        return "laborelec_01";
        var cod = this.diagnosticoCod(h2, co, ch4, c2h2, c2h4, c2h6);

        if      (cod == 1) {return "laborelec_01";}
        else if (cod == 2) {return "laborelec_02";}
        else if (cod == 3) {return "laborelec_03";}
        else if (cod == 4) {return "laborelec_04";}
        else if (cod == 5) {return "laborelec_05";}
        else if (cod == 6) {return "laborelec_06";}
        else if (cod == 7) {return "laborelec_07";}
        else if (cod == 8) {return "laborelec_08";}
        else if (cod == 9) {return "laborelec_09";}
        else if (cod == 10) {return "laborelec_10";}
        else if (cod == 11) {return "laborelec_11";}
        else if (cod == 12) {return "laborelec_12";}
        else if (cod == 13) {return "laborelec_13";}
        else if (cod == 14) {return "laborelec_14";}
        else if (cod == 15) {return "laborelec_15";}
        else if (cod == 16) {return "laborelec_16";}
        else if (cod == 17) {return "laborelec_17";}
        else if (cod == 18) {return "laborelec_18";}
        else if (cod == 19) {return "laborelec_19";}
        else if (cod == 20) {return "laborelec_20";}
        else if (cod == 21) {return "laborelec_21";}
        else if (cod == 22) {return "laborelec_22";}
        else if (cod == 23) {return "laborelec_23";}
        else if (cod == 24) {return "laborelec_24";}
        else if (cod == 25) {return "laborelec_25";}
        else if (cod == 26) {return "laborelec_26";}
        else if (cod == 27) {return "laborelec_27";}
        else if (cod == 28) {return "laborelec_28";}
        else if (cod == 29) {return "laborelec_29";}
        else if (cod == 30) {return "laborelec_30";}
        else if (cod == 31) {return "laborelec_31";}

        else {return "laborelec_00";}
        
    };   
});