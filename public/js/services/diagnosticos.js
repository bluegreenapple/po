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
        
        var nx = this.n_x(c2h2, c2h4);
        var ny = this.n_y(ch4, h2);
        var nz = this.n_z(c2h4, c2h6);
        if      (nx == 0 && ny == 0 && nz ==0) {return {"casoN": "A", "diagnostico":"Condição Normal"};}
        else if (nx == 0 && ny == 1 && nz ==0) {return {"casoN": "B", "diagnostico":"Descargas parciais de pequena densidade de energia"};}
        else if (nx == 1 && ny == 1 && nz ==0) {return {"casoN": "C", "diagnostico":"Descargas parciais de alta intensidade de energia"};}
        else if ((nx >= 1 && nx <= 2) && ny == 0 && (nz >=1 && nz <= 2)) {return {"casoN": "D", "diagnostico":"Descargas elétricas de energia reduzida (Arco)"};}
        else if (nx == 1 && ny == 0 && nz ==2) {return {"casoN": "E", "diagnostico":"Descargas elétricas de alta energia (Arco)"};}
        else if (nx == 0 && ny == 0 && nz ==1) {return {"casoN": "F", "diagnostico":"Falha técnica de baixa temperatura <150oC"};}
        else if (nx == 0 && ny == 2 && nz ==0) {return {"casoN": "G", "diagnostico":"Falha técnica de baixa temperatura entre 150oC e 300oC"};}
        else if (nx == 0 && ny == 2 && nz ==1) {return {"casoN": "H", "diagnostico":"Falha técnica de média temperatura entre 300oC e 700oC"};}
        else if (nx == 0 && ny == 2 && nz ==2) {return {"casoN": "I", "diagnostico":"Falha técnica de alta temperatura >700oC"};}
        else {return '-'};
        
    };     
});

//simple service for creating Iec156 diagnostics
diagServ.service('LaborelecService', function() {


    this.ppm_h2 = function(h2, tgg) {
        return +h2 / +tgg *1000000.;
    };

    this.ppm_x = function(ch4, c2h4, c2h6, tgg) {
        return (+ch4 + +c2h4 + +c2h6) / +tgg *1000000.;
    };

    this.ppm_y = function(ch4, h2, tgg) {
        return +ch4 / +h2 / +tgg;
    };

    this.ppm_c2h2 = function(c2h2, tgg) {
        return +c2h2 / +tgg *1000000.;
    };

    this.ppm_co = function(co, tgg) {
        return +co / +tgg *1000000.;
    };

    
    this.diagnostico = function(h2, co, ch4, c2h2, c2h4, c2h6 ,tgg) {
        
        var ppm_h2 = this.ppm_h2(h2, tgg);
        var ppm_x = this.ppm_x(ch4, c2h4, c2h6, tgg);
        var ppm_y = this.ppm_y(ch4, h2, tgg);
        var ppm_co = this.ppm_co(co, tgg);
        var ppm_c2h2 = this.ppm_c2h2(c2h2, tgg);
        
        if      (ppm_h2 <= 200 && ppm_x <= 300 && ppm_co <= 400) {return {"indice": "A", "diagnostico":"Normal", "recomendacao": "Evolução Normal"};}
        
        else if ((ppm_h2 >= 201 && ppm_h2 <= 300) && ppm_x <= 300 && ppm_y<=0.15) {return {"indice": "B1", "diagnostico":"Descargas parciais (óleo) - Média", "recomendacao": "Próximo controle: Entre 6 e 12 meses"};}
        else if ((ppm_h2 >= 201 && ppm_h2 <= 300) && ppm_x <= 300 && (ppm_y>=0.16 && ppm_y<=1) && ppm_c2h2<=20) {return {"indice": "B2", "diagnostico":"Centelhamento (óleo) - Média", "recomendacao": "Próximo controle: Entre 6 e 12 meses"};}
        else if ((ppm_h2 >= 201 && ppm_h2 <= 300) && ppm_x <= 300 && (ppm_y>=0.16 && ppm_y<=1) && ppm_c2h2>20) {return {"indice": "B3", "diagnostico":"Centelhamento (óleo) ou Gás proveniente do comutador - Média", "recomendacao": "Próximo controle: Entre 6 e 12 meses"};}
        
        else if (ppm_h2 <= 200 && (ppm_x >= 301 && ppm_x <= 400) && ppm_y>=0.61 && ppm_co<=400) {return {"indice": "B4", "diagnostico":"Térmica (óleo) - Média", "recomendacao": "Próximo controle: Entre 6 e 12 meses"};}
        else if (ppm_h2 <= 200 && (ppm_x >= 301 && ppm_x <= 400) && ppm_y>=0.61 && ppm_co>400) {return {"indice": "B5", "diagnostico":"Térmica (óleo + papel) - Média", "recomendacao": "Próximo controle: Entre 6 e 12 meses"};}
        else if (ppm_h2 <= 200 && (ppm_x >= 301 && ppm_x <= 400) && ppm_y>=0.60 && ppm_c2h2>20 && ppm_co<=400) {return {"indice": "B6", "diagnostico":"Térmica (óleo) ou Gás proveniente do comutador - Média", "recomendacao": "Próximo controle: Entre 6 e 12 meses"};}
        else if (ppm_h2 <= 200 && (ppm_x >= 301 && ppm_x <= 400) && ppm_y>=0.60 && ppm_c2h2>20 && ppm_co>400) {return {"indice": "B7", "diagnostico":"Térmica (óleo+papel) ou Gás proveniente do comutador - Média", "recomendacao": "Próximo controle: Entre 6 e 12 meses"};}
        
        else if ((ppm_h2 >= 201 && ppm_h2 <= 300) && ppm_x <= 300 && ppm_c2h2>20) {return {"indice": "B3", "diagnostico":"Centelhamento (óleo) ou Gás proveniente do comutador - Média", "recomendacao": "Próximo controle: Entre 6 e 12 meses"};}
        else if ((ppm_h2 >= 201 && ppm_h2 <= 300) && ppm_x <= 300 && ppm_c2h2<=20) {return {"indice": "B4", "diagnostico":"Térmica (óleo) - Média", "recomendacao": "Próximo controle: Entre 6 e 12 meses"};}
        
        else if (ppm_h2 <= 200 && ppm_x <= 300 && ppm_co > 400) {return {"indice": "B9", "diagnostico":"Térmica (papel) - Média", "recomendacao": "Próximo controle: Entre 6 e 12 meses"};}
        
        else if ((ppm_h2 >= 301 && ppm_h2 <= 600) && ppm_x <= 400 && ppm_y<=0.15) {return {"indice": "C1", "diagnostico":"Descargas parciais (óleo) – Importante", "recomendacao": "Próximo controle: Entre 3 e 6 meses"};}
        else if ((ppm_h2 >= 301 && ppm_h2 <= 600) && ppm_x <= 400 && (ppm_y>=0.16 && ppm_y<=1) && ppm_c2h2 <=50) {return {"indice": "C2", "diagnostico":"Centelhamento (óleo) – Importante", "recomendacao": "Próximo controle: Entre 3 e 6 meses"};}
        else if ((ppm_h2 >= 301 && ppm_h2 <= 600) && ppm_x <= 400 && (ppm_y>=0.16 && ppm_y<=1) && ppm_c2h2 >50) {return {"indice": "C3", "diagnostico":"Centelhamento (óleo) ou Gás proveniente do comutador – Importante", "recomendacao": "Próximo controle: Entre 3 e 6 meses"};}
        
        else if (ppm_h2 <= 300 && (ppm_x >= 401 && ppm_x <= 800) && ppm_y>=0.61 && ppm_co<=500) {return {"indice": "C4", "diagnostico":"Térmica (óleo) – Importante", "recomendacao": "Próximo controle: Entre 3 e 6 meses"};}
        else if (ppm_h2 <= 300 && (ppm_x >= 401 && ppm_x <= 800) && ppm_y>=0.61 && ppm_co>500) {return {"indice": "C5", "diagnostico":"Térmica (óleo + papel) – Importante", "recomendacao": "Próximo controle: Entre 3 e 6 meses"};}
        else if (ppm_h2 <= 300 && (ppm_x >= 401 && ppm_x <= 800) && ppm_y>=0.60 && ppm_c2h2>50 && ppm_co<=500) {return {"indice": "C6", "diagnostico":"Térmica (óleo) ou Gás proveniente do comutador – Importante", "recomendacao": "Próximo controle: Entre 3 e 6 meses"};}
        else if (ppm_h2 <= 300 && (ppm_x >= 401 && ppm_x <= 800) && ppm_y>=0.60 && ppm_c2h2>50 && ppm_co>500) {return {"indice": "C7", "diagnostico":"Térmica (óleo+papel) ou Gás proveniente do comutador – Importante", "recomendacao": "Próximo controle: Entre 3 e 6 meses"};}
        
        else if ((ppm_h2 >= 301 && ppm_h2 <= 600) && (ppm_x >= 401 && ppm_x <= 800) && ppm_c2h2>50) {return {"indice": "C8", "diagnostico":"Arco no óleo ou Gás proveniente do comutador – Importante", "recomendacao": "Próximo controle: Entre 3 e 6 meses"};}
        else if ((ppm_h2 >= 301 && ppm_h2 <= 600) && (ppm_x >= 401 && ppm_x <= 800) && ppm_c2h2<=50 && ppm_co<=500) {return {"indice": "C4", "diagnostico":"Térmica (óleo) – Importante", "recomendacao": "Próximo controle: Entre 3 e 6 meses"};}
        else if ((ppm_h2 >= 301 && ppm_h2 <= 600) && (ppm_x >= 401 && ppm_x <= 800) && ppm_c2h2<=50 && ppm_co>500) {return {"indice": "C5", "diagnostico":"Térmica (óleo + papel) – Importante", "recomendacao": "Próximo controle: Entre 3 e 6 meses"};}
        
        else if (ppm_h2 >= 601 && ppm_x <= 800 && ppm_y<=0.15) {return {"indice": "D1", "diagnostico":"Descargas parciais (óleo) – Muito", "recomendacao": "Para todos os índices “D” – próximo controle entre 1 e 3 meses/Nova medição do nível de descargas parciais no transformador"};}
        else if (ppm_h2 >= 601 && ppm_x <= 800 && (ppm_y>=0.16 && ppm_y<=1) && ppm_c2h2<=50) {return {"indice": "D2",  "diagnostico":"Centelhamento (óleo) – Muito", "recomendacao": "Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões do transformador"};}
        else if (ppm_h2 >= 601 && ppm_x <= 800 && (ppm_y>=0.16 && ppm_y<=1) && ppm_c2h2>50) {return {"indice": "D3", "diagnostico":"Centelhamento (óleo) ou Gás proveniente do comutador – Muito", "recomendacao": "Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões do transformador"};}

        else if (ppm_h2 <= 600 && ppm_x >= 801 && ppm_y>=0.61 && ppm_co<=700) {return {"indice": "D4", "diagnostico":"Térmica (óleo) – Muito", "recomendacao": "Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões (pontos quentes) e revisão no sistema de resfriamento"};}
        else if (ppm_h2 <= 600 && ppm_x >= 801 && ppm_y>=0.61 && ppm_co>700) {return {"indice": "D5", "diagnostico":"Térmica (óleo + papel) – Muito", "recomendacao": "Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões (pontos quentes) e revisão no sistema de resfriamento"};}
        else if (ppm_h2 <= 600 && ppm_x >= 801 && ppm_y>=0.60 && ppm_c2h2>50 && ppm_co<=700) {return {"indice": "D6", "diagnostico":"Térmica (óleo) ou Gás proveniente do comutador – Muito", "recomendacao": "Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões (pontos quentes) e revisão no sistema de resfriamento"};}
        else if (ppm_h2 <= 600 && ppm_x >= 801 && ppm_y>=0.60 && ppm_c2h2>50 && ppm_co>700) {return {"indice": "D7", "diagnostico":"Térmica (óleo+papel) ou Gás proveniente do comutador – Muito", "recomendacao": "Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões (pontos quentes) e revisão no sistema de resfriamento"};}

        else if (ppm_h2 >= 601 && ppm_x >= 801 && ppm_c2h2>100) {return {"indice": "D8", "diagnostico":"Arco no óleo ou Gás proveniente do comutador – Muito", "recomendacao": "Para todos os índices “D” – próximo controle entre 1 e 3 meses/Inspeção nas conexões/determinação da resistência de isolamento (se valor baixo, considerar um reparo em oficina). Para o transformador reentrar em operação promover desgaseificação e retornar ao esquema de amostragem normal."};}
        else if (ppm_h2 >= 601 && ppm_x >= 801 && ppm_c2h2<=100 && ppm_co<=700) {return {"indice": "D4", "diagnostico":"Térmica (óleo) – Muito", "recomendacao": "Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões (pontos quentes) e revisão no sistema de resfriamento"};}
        else if (ppm_h2 >= 601 && ppm_x >= 801 && ppm_c2h2<=100 && ppm_co>700) {return {"indice": "D5", "diagnostico":"Térmica (óleo + papel) – Muito", "recomendacao": "Térmica (óleo + papel)", "recomendacao":"Para todos os índices “D” – próximo controle entre 1 e 3 meses/Possíveis gases formados no LTC, senão, inspecionar as conexões (pontos quentes) e revisão no sistema de resfriamento"};}


        else {return {"indice":"-","diagnostico":"-", "recomendacao": "-"}};
        
    };     
});