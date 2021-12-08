#!/usr/bin/env node
const fs = require('fs');
const prompt = require('prompt-sync')();

const VpfParser = require('./parser_final.js');

const { program } = require("@caporal/core");
const { group } = require('console');
const path = require("path");
//const { scaleTypePrecedence } = require('vega-lite/build/src/scale');

const vg = require('vega');
const vegalite = require('vega-lite');

program
    .command('essai', "juste des tests")
    //pas d'argument
    .action((logger) => {

        let pathName="./SujetB_data/EM-U4-p32_33-Review.gift";

        fs.readFile(pathName, 'utf8', function (err,data) {
            if (err) {
                return logger.warn(err);
            }
            
            let analyzer=new VpfParser();
            let analyz2=new VpfParser();
            //analyz2.parse(data);
            analyzer.test(data);
        })   
    })




    // Sert à séparer le fichier par question
    //.version('vpf-parser-cli')
    //.version('0.07')
    //Spec 1
    .command('contact', "Générer un fichier d'identification vCard")
    //pas d'argument
    .action((logger) => {

        function isNumber(n) {
            return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
        }

        function isString(o) {
            return typeof o == "string" || (typeof o == "object" && o.constructor === String);
        }


        let N = prompt("Enter a last name (nom de famille) in lowercases : ");

        //check d'erreur : si ce n'est pas un string, ou qu'il contient un ou plusieurs chiffres
        while (!isString(N) || N.match(/\d+/g) !== null){
            N = prompt("Wrong input. Enter a last name (nom de famille) in lowercases : ");
        }

        let FN = prompt("Enter a first name (prenom) in lowercases : ");

        while (!isString(FN) || FN.match(/\d+/g) !== null){
            FN = prompt("Wrong input. Enter a first name (prenom) in lowercases : ");
        }

        //on crée/append un autre fichier, qui contient la liste des noms de tous ceux qui ont
        fs.appendFile('ListVCard.txt', '*',function (err) {
            if (err) {
                return console.log(err);
                console.log('Erreur pour le fichier ListVCard.txt.');
            }
        })

        //on check si le fichier existe déjà
        fs.readFile('ListVCard.txt', 'utf8', function (err,data) {
            if (err) {
                return logger.warn(err);
            }
            if (data.includes(N+' '+FN)) {
                console.log("Contact déjà existant.\n");
            } else {

                //on demande les infos
                let typeEmail = prompt("Before entering the email : Is it a HOME mail or a WORK mail(type in uppercases)? ");
                while (typeEmail !== 'HOME' && typeEmail !== 'WORK'){
                    typeEmail = prompt("Wrong input. Is it a HOME mail or a WORK mail(type in uppercases)? ");
                }
                let email = prompt("Enter the email : ");
                let typeTel = prompt("Before entering the phone number : is it HOME, CELL or WORK? (type the word in uppercases) ");
                while (typeTel !== 'HOME' && typeTel !== 'WORK' && typeTel !== 'CELL'){
                    typeTel = prompt("Wrong input. Is it a HOME mail or a WORK mail(type in uppercases)? ");
                }
                let tel = prompt("Enter a phone number (without white spaces) : ");
                while (!isNumber(tel) || tel.length > 10) {
                    tel = prompt("Wrong input. Enter a number with maximum 10 digits : ");
                }

                //on génère un nouveau fichier vCard
                fs.appendFile(N + '_' + FN + '.vcf',
                    'BEGIN:VCARD\nVERSION:4.0\nN:' + N + ';' + FN + '\nFN:' + FN + ' ' + N + '\nEMAIL;' + typeEmail + ':' + email + '\nTEL;' + typeTel + ':' + tel + '\nEND:VCARD',
                    function (err) {
                        if (err) {
                            return console.log(err);
                            console.log('Erreur pour le fichier (nom_prenom).vcf');
                        }
                    });

                //On ajoute le nom au fichier ListVCard.txt
                fs.appendFile('ListVCard.txt', N + ' ' + FN + '\n', function (err) {
                    if (err) {
                        return console.log(err);
                        console.log('Erreur pour le fichier ListVCard.txt.');
                    }
                })
            }
        })
    })

    //**************************************************************
    //Spec2
    // Sert à séparer le fichier par question
    .command('group', 'Ajouter une question à un fichier examen souhaité')
    .argument("<numF>", "C'est le numéro du fichier souhaité")
    .argument("<numEnonce>", "C'est le num de l'énoncé qu'il faut indiquer")
    .argument("<numQ>", "C'est le numéro de la question souhaitée")
    .argument("<nomF>", "C'est le nom du fichier d'examen souhaité")
    .action(({args,logger}) => {

        //On définit la Map pour pouvoir associer le numéro de fichier à un path
        const myMap = new Map();
        myMap.set(0, "./SujetB_data/EM-U4-p32_33-Review.gift");
        myMap.set(1, "./SujetB_data/EM-U5-p34-Gra-Expressions_of_quantity.gift");
        myMap.set(2, "./SujetB_data/EM-U5-p34-Voc.gift");
        myMap.set(3, "./SujetB_data/EM-U5-p35-Gra-Subject_verb_agreement.gift");
        myMap.set(4, "./SujetB_data/EM-U5-p36_37-Reading.gift");
        myMap.set(5, "./SujetB_data/EM-U5-p38-Passive.gift");
        myMap.set(6, "./SujetB_data/EM-U6-p46_47-4.gift");
        myMap.set(7, "./SujetB_data/EM-U42-Ultimate.gift");
        myMap.set(8, "./SujetB_data/U1-p7-Adverbs.gift");
        myMap.set(9, "./SujetB_data/U1-p8_9-Reading-Coachella.gift");
        myMap.set(10, "./SujetB_data/U1-p10-Gra-Present_tenses_habits.gift");
        myMap.set(11, "./SujetB_data/U2-p22-Gra-Ing_or_inf.gift");
        myMap.set(12, "./SujetB_data/U3-p30-Reading.gift");
        myMap.set(13, "./SujetB_data/U3-p31-Gra-ed_adjectives_prepositions.gift");
        myMap.set(14, "./SujetB_data/U3-p32-Gra-Present_perfect_simple_vs_continuous.gift");
        myMap.set(15, "./SujetB_data/U3-p32-GR-Present_perfect_vs_past_simple.gift");
        myMap.set(16, "./SujetB_data/U3-p33-Gra-As_like.gift");
        myMap.set(17, "./SujetB_data/U3-p33-UoE-Hygge.gift");
        myMap.set(18, "./SujetB_data/U4-p39-Reading-xmen.gift");
        myMap.set(19, "./SujetB_data/U4-p42_43-Listening.gift");
        myMap.set(20, "./SujetB_data/U5-p49-GR1-Expressions_of_quantity.gift");
        myMap.set(21, "./SujetB_data/U5-p49-Subject_verb_agreement.gift");
        myMap.set(22, "./SujetB_data/U5-p52-Reading-The_death_of_cooking.gift");
        myMap.set(23, "./SujetB_data/U5-p54-6-Passive.gift");
        myMap.set(24, "./SujetB_data/U5-p54-GR4-Passive-reporting.gift");
        myMap.set(25, "./SujetB_data/U5-p57-Review.gift");
        myMap.set(26, "./SujetB_data/U6-p59-Vocabulary.gift");
        myMap.set(27, "./SujetB_data/U6-p60-Listening.gift");
        myMap.set(28, "./SujetB_data/U6-p61-5-Future-forms.gift");
        myMap.set(29, "./SujetB_data/U6-p61-GR-Future_forms.gift");
        myMap.set(30, "./SujetB_data/U6-p62_63-Reading.gift");
        myMap.set(31, "./SujetB_data/U6-p64-Future-perfect-&-continuous.gift");
        myMap.set(32, "./SujetB_data/U6-p65-Voc-Expressions_with_get.gift");
        myMap.set(33, "./SujetB_data/U6-p67-Review.gift");
        myMap.set(34, "./SujetB_data/U6-p68_69-ProgressTest2.gift");
        myMap.set(35, "./SujetB_data/U7-p76_77-So,such,too,enough.gift");
        myMap.set(36, "./SujetB_data/U7-p76-Relative_clauses.gift");
        myMap.set(37, "./SujetB_data/U7-p77-6.gift");
        myMap.set(38, "./SujetB_data/U7-p77-It is,there is.gift");
        myMap.set(39, "./SujetB_data/U7-p79-Review-3.gift");
        myMap.set(40, "./SujetB_data/U8-p84-Voc-Linking_words.gift");
        myMap.set(41, "./SujetB_data/U9-p94-Listening.gift");
        myMap.set(42, "./SujetB_data/U9-p95-Third_cond-4.gift");
        myMap.set(43, "./SujetB_data/U10-p106-Reading.gift");
        myMap.set(44, "./SujetB_data/U11-p114-Mixed_conditionals.gift");
        myMap.set(45, "./SujetB_data/U4-p47-Review.gift");
        myMap.set(46, "./SujetB_data/U5-p50-Use_of_English.gift");

        var numF=args.numF;
        var numEnonce=args.numEnonce;
        var numQ=args.numQ;
        var nomF=args.nomF;

        console.log("Voici le numero du fichier:"+numF);
        console.log("Voici le numero de l'énoncé':"+numEnonce);
        console.log("Voici le numero de la question:"+numQ);
        console.log("Voici le nom du fichier:"+nomF);


        var path=myMap.get(numF);

        fs.readFile(path, 'utf8', function (err,data) {
            if (err) {
                return logger.warn(err);
            }

            console.log("on lit le fichier");
            //Le path du fichier
            var pathNewFile=nomF+'.gift';

            var analyzer=new VpfParser();
            analyzer.parse(data);

            //on écrit l'énoncé et la question qui lui correspond
            //Si l'énoncé est égale à -1--> il n'y a pas d'énoncé à cette question donc on affiche pas l'énoncé
            if(numEnonce===(-1)){
                if(analyzer.question[numQ]==null){
                    logger.info("Cette question n'existe pas !");
                }
                else{
                    var data=analyzer.question[numQ];
                    data=data.toString();
                    fs.appendFile(pathNewFile, data, function (err) {
                        if (err) return console.log(err);
                    });
                }
            }
            else{
                if(analyzer.question[numEnonce][numQ]==null){
                    logger.info("Cette question n'existe pas !");
                }
                else{
                    var data=analyzer.enonce[numEnonce];
                    var data2=analyzer.question[numEnonce][numQ];
                    data=data.toString();
                    data2=data2.toString();
                    fs.appendFile(pathNewFile, data, function (err) {
                        if (err) return console.log(err);
                    });
                    fs.appendFile(pathNewFile, data2, function (err) {
                        if (err) return console.log(err);
                    });
                }
            }

        })

    })

    //**************************************************************
    //Spec3
    .command('viewer', 'Pour rechercher et visualiser une question')
    .action(({logger}) => {
        console.log("C'est bon")
        const myMap = new Map();
        myMap.set(0, "./SujetB_data/EM-U4-p32_33-Review.gift");
        myMap.set(1, "./SujetB_data/EM-U5-p34-Gra-Expressions_of_quantity.gift");
        myMap.set(2, "./SujetB_data/EM-U5-p34-Voc.gift");
        myMap.set(3, "./SujetB_data/EM-U5-p35-Gra-Subject_verb_agreement.gift");
        myMap.set(4, "./SujetB_data/EM-U5-p36_37-Reading.gift");
        myMap.set(5, "./SujetB_data/EM-U5-p38-Passive.gift");
        myMap.set(6, "./SujetB_data/EM-U6-p46_47-4.gift");
        myMap.set(7, "./SujetB_data/EM-U42-Ultimate.gift");
        myMap.set(8, "./SujetB_data/U1-p7-Adverbs.gift");
        myMap.set(9, "./SujetB_data/U1-p8_9-Reading-Coachella.gift");
        myMap.set(10, "./SujetB_data/U1-p10-Gra-Present_tenses_habits.gift");
        myMap.set(11, "./SujetB_data/U2-p22-Gra-Ing_or_inf.gift");
        myMap.set(12, "./SujetB_data/U3-p30-Reading.gift");
        myMap.set(13, "./SujetB_data/U3-p31-Gra-ed_adjectives_prepositions.gift");
        myMap.set(14, "./SujetB_data/U3-p32-Gra-Present_perfect_simple_vs_continuous.gift");
        myMap.set(15, "./SujetB_data/U3-p32-GR-Present_perfect_vs_past_simple.gift");
        myMap.set(16, "./SujetB_data/U3-p33-Gra-As_like.gift");
        myMap.set(17, "./SujetB_data/U3-p33-UoE-Hygge.gift");
        myMap.set(18, "./SujetB_data/U4-p39-Reading-xmen.gift");
        myMap.set(19, "./SujetB_data/U4-p42_43-Listening.gift");
        myMap.set(20, "./SujetB_data/U5-p49-GR1-Expressions_of_quantity.gift");
        myMap.set(21, "./SujetB_data/U5-p49-Subject_verb_agreement.gift");
        myMap.set(22, "./SujetB_data/U5-p52-Reading-The_death_of_cooking.gift");
        myMap.set(23, "./SujetB_data/U5-p54-6-Passive.gift");
        myMap.set(24, "./SujetB_data/U5-p54-GR4-Passive-reporting.gift");
        myMap.set(25, "./SujetB_data/U5-p57-Review.gift");
        myMap.set(26, "./SujetB_data/U6-p59-Vocabulary.gift");
        myMap.set(27, "./SujetB_data/U6-p60-Listening.gift");
        myMap.set(28, "./SujetB_data/U6-p61-5-Future-forms.gift");
        myMap.set(29, "./SujetB_data/U6-p61-GR-Future_forms.gift");
        myMap.set(30, "./SujetB_data/U6-p62_63-Reading.gift");
        myMap.set(31, "./SujetB_data/U6-p64-Future-perfect-&-continuous.gift");
        myMap.set(32, "./SujetB_data/U6-p65-Voc-Expressions_with_get.gift");
        myMap.set(33, "./SujetB_data/U6-p67-Review.gift");
        myMap.set(34, "./SujetB_data/U6-p68_69-ProgressTest2.gift");
        myMap.set(35, "./SujetB_data/U7-p76_77-So,such,too,enough.gift");
        myMap.set(36, "./SujetB_data/U7-p76-Relative_clauses.gift");
        myMap.set(37, "./SujetB_data/U7-p77-6.gift");
        myMap.set(38, "./SujetB_data/U7-p77-It is,there is.gift");
        myMap.set(39, "./SujetB_data/U7-p79-Review-3.gift");
        myMap.set(40, "./SujetB_data/U8-p84-Voc-Linking_words.gift");
        myMap.set(41, "./SujetB_data/U9-p94-Listening.gift");
        myMap.set(42, "./SujetB_data/U9-p95-Third_cond-4.gift");
        myMap.set(43, "./SujetB_data/U10-p106-Reading.gift");
        myMap.set(44, "./SujetB_data/U11-p114-Mixed_conditionals.gift");
        myMap.set(45, "./SujetB_data/U4-p47-Review.gift");
        myMap.set(46, "./SujetB_data/U5-p50-Use_of_English.gift");
        //appeler les fonctions du fichier search.js

        console.log("Pour placer une question dans votre fichier d'examen, vous devez spécifier un numéro de fichier, un numéro d'énoncé et un numéro de question")
        console.log("Ainsi, retenez bien ces différentes données pour sélectionner la question correspondantes");
        //Il faut faire un while qui lit tous les fichiers du dossier SujetB tant qu'on n'a pas trouvé la question qu'on veut
        let typeExercice = prompt('Quel type d\'exercice recherchez vous ? ');
        console.log('Vous avez choisi ce type d\'exercice : ' + typeExercice);

        //Tableau qui contient les caractéristiques de recherche
        var recherche=new Array();
        var FichierCorrespondant=new Array();

        for (let i = 0; i < 47; i++) {
            let path = myMap.get(i);
            //console.log("Le path est : " + path);
            fs.readFile(path, 'utf8', function (err,data){
                if (err) {
                    return logger.warn(err)
                }
                if(data.includes(typeExercice)){	//toLowerCase() pour ne pas être sensible à la casse
                    //On affiche le fichier
                    console.log("Le fichier numéro " + i + " correspond à vos recherches");

                    //On stock les fichiers correspondant dans un tableau
                    FichierCorrespondant.push(i);
                    console.log("taille: "+FichierCorrespondant.length);
                }
            })
        }
        setTimeout(function() {
            console.log("WEWEWEW"+FichierCorrespondant);
            for(let i=0;i<FichierCorrespondant.length;i++){

                let path = myMap.get(FichierCorrespondant[i]);
                //console.log("Le path est : " + path);
                fs.readFile(path, 'utf8', function (err,data){
                    if (err) {
                        return logger.warn(err)
                    }
    
                    //On parse le fichier
                    let analyzer=new VpfParser();
                    analyzer.parse(data);
    
                    //console.log("Voici this.Question "+analyzer.question);
                    console.log("taille enonce"+analyzer.enonce.length);
                    
                    if(analyzer.enonce.length>=2){
    
                        //On a les énoncés associés à toutes les questions
                        //On vérifie quels énoncés contiennent ce mot
                        for(let k=0;k<analyzer.enonce.length;k++){
                            if(analyzer.enonce[k].includes(typeExercice)){
                                
                                
                                //Il faut penser à afficher les questions sans énoncés avant le premier énoncé qui peuvent contenir ce mot aussi
                                for(let y=0;y<analyzer.question[0].length;y++){
                                    if(analyzer.question[0].includes(typeExercice)){
                                        console.log("Choississez le numéro de question"+y+" si vous voulez cette question");
                                        console.log(analyzer.question[0][y]);
    
                                        console.log("Cette question correspond");
                                        console.log("Numéro de fichier: "+FichierCorrespondant[i]);
                                        console.log("Numéro d'énoncés: "+0);
                                        console.log("Numéro de question: "+y);
                                    }
                                }
                                
                                //On affiche toutes les questions
                                for(let y=0;y<analyzer.question[k].length;y++){
                                    console.log("Choississez le numéro de question"+y+" si vous voulez cette question");
                                    console.log(analyzer.question[k][y]);
    
                                    console.log("Cette question correspond");
                                    console.log("Numéro de fichier: "+FichierCorrespondant[i]);
                                    console.log("Numéro d'énoncé: "+k);
                                    console.log("Numéro de questions: "+y);                                 
                                }
                            }
                            //Si aucun énoncé ne contient ce mot
                            //On affiche seulement les questions qui les contiennent dans ces énoncés
                            else{
                                for(let y=0;y<analyzer.question[k].length;y++){
                                    if(analyzer.question[k][y].includes(typeExercice)){
    
                                        console.log(analyzer.question[k][y]);
    
                                        console.log("Cette question correspond");
                                        console.log("Numéro de fichier: "+FichierCorrespondant[i]);
                                        console.log("Numéro d'énoncé: "+k);
                                        console.log("Numéro de question: "+y); 
                                    }  
                                }
                            }
                        }
                    }
                    //Il n'y a pas d'énoncé
                    else{
                        for(let y=0;y<analyzer.question.length;y++){
                            if(analyzer.question[y].includes(typeExercice)){
    
                                console.log(analyzer.question[y]);
    
                                console.log("Cette question correspond");
                                console.log("Numéro de fichier: "+FichierCorrespondant[i]);
                                console.log("Numéro d'énoncé: "+(-1));
                                console.log("Numéro de question: "+y); 
                            }  
                        }
                    }  
                })    
            }
        
    
        }, 1000);     
    })

    /////////############# SPEC 4
    //Spec 4
    .command("check", 'Vérifier la qualité des données d’examen')
    .argument("<file>", "Nom du fichier à vérifier")
    .action(({args, logger}) => {
        console.log("C'est bon")
        const myMap = new Map();
        myMap.set(0, "./SujetB_data/EM-U4-p32_33-Review.gift");
        myMap.set(1, "./SujetB_data/EM-U5-p34-Gra-Expressions_of_quantity.gift");
        myMap.set(2, "./SujetB_data/EM-U5-p34-Voc.gift");
        myMap.set(3, "./SujetB_data/EM-U5-p35-Gra-Subject_verb_agreement.gift");
        myMap.set(4, "./SujetB_data/EM-U5-p36_37-Reading.gift");
        myMap.set(5, "./SujetB_data/EM-U5-p38-Passive.gift");
        myMap.set(6, "./SujetB_data/EM-U6-p46_47-4.gift");
        myMap.set(7, "./SujetB_data/EM-U42-Ultimate.gift");
        myMap.set(8, "./SujetB_data/U1-p7-Adverbs.gift");
        myMap.set(9, "./SujetB_data/U1-p8_9-Reading-Coachella.gift");
        myMap.set(10, "./SujetB_data/U1-p10-Gra-Present_tenses_habits.gift");
        myMap.set(11, "./SujetB_data/U2-p22-Gra-Ing_or_inf.gift");
        myMap.set(12, "./SujetB_data/U3-p30-Reading.gift");
        myMap.set(13, "./SujetB_data/U3-p31-Gra-ed_adjectives_prepositions.gift");
        myMap.set(14, "./SujetB_data/U3-p32-Gra-Present_perfect_simple_vs_continuous.gift");
        myMap.set(15, "./SujetB_data/U3-p32-GR-Present_perfect_vs_past_simple.gift");
        myMap.set(16, "./SujetB_data/U3-p33-Gra-As_like.gift");
        myMap.set(17, "./SujetB_data/U3-p33-UoE-Hygge.gift");
        myMap.set(18, "./SujetB_data/U4-p39-Reading-xmen.gift");
        myMap.set(19, "./SujetB_data/U4-p42_43-Listening.gift");
        myMap.set(20, "./SujetB_data/U5-p49-GR1-Expressions_of_quantity.gift");
        myMap.set(21, "./SujetB_data/U5-p49-Subject_verb_agreement.gift");
        myMap.set(22, "./SujetB_data/U5-p52-Reading-The_death_of_cooking.gift");
        myMap.set(23, "./SujetB_data/U5-p54-6-Passive.gift");
        myMap.set(24, "./SujetB_data/U5-p54-GR4-Passive-reporting.gift");
        myMap.set(25, "./SujetB_data/U5-p57-Review.gift");
        myMap.set(26, "./SujetB_data/U6-p59-Vocabulary.gift");
        myMap.set(27, "./SujetB_data/U6-p60-Listening.gift");
        myMap.set(28, "./SujetB_data/U6-p61-5-Future-forms.gift");
        myMap.set(29, "./SujetB_data/U6-p61-GR-Future_forms.gift");
        myMap.set(30, "./SujetB_data/U6-p62_63-Reading.gift");
        myMap.set(31, "./SujetB_data/U6-p64-Future-perfect-&-continuous.gift");
        myMap.set(32, "./SujetB_data/U6-p65-Voc-Expressions_with_get.gift");
        myMap.set(33, "./SujetB_data/U6-p67-Review.gift");
        myMap.set(34, "./SujetB_data/U6-p68_69-ProgressTest2.gift");
        myMap.set(35, "./SujetB_data/U7-p76_77-So,such,too,enough.gift");
        myMap.set(36, "./SujetB_data/U7-p76-Relative_clauses.gift");
        myMap.set(37, "./SujetB_data/U7-p77-6.gift");
        myMap.set(38, "./SujetB_data/U7-p77-It is,there is.gift");
        myMap.set(39, "./SujetB_data/U7-p79-Review-3.gift");
        myMap.set(40, "./SujetB_data/U8-p84-Voc-Linking_words.gift");
        myMap.set(41, "./SujetB_data/U9-p94-Listening.gift");
        myMap.set(42, "./SujetB_data/U9-p95-Third_cond-4.gift");
        myMap.set(43, "./SujetB_data/U10-p106-Reading.gift");
        myMap.set(44, "./SujetB_data/U11-p114-Mixed_conditionals.gift");
        myMap.set(45, "./SujetB_data/U4-p47-Review.gift");
        myMap.set(46, "./SujetB_data/U5-p50-Use_of_English.gift");

        let path = args.file;
        console.log("Vous avez choisi de vérifier la qualité des données d'examen du fichier : " + args.file);
        //On recherche s'il y a des questions en double
        let trouve = false;
        let separator;
        let compteur = 0;
        let question;
        let i=1;   //permet de compter le nombre de fois qu'on exécute le while
        fs.readFile(path.toString(), 'utf8', function (err,data) {
            /*if (err) {
               return logger.warn(err)
            }*/
            if(path[14]==="U"){
                separator = ('::U');
            }
            else{//Le fichier commence par EM
                separator=('::EM')
            }

            //Ca marche, https://www.it-swarm-fr.com/fr/javascript/lire-un-fichier-ligne-par-ligne-dans-node.js/972842073/
            /*var lineReader = require('readline').createInterface({   //On définie une nouvelle constante pour lire
               input: require('fs').createReadStream(path.toString()) //path.toString()});
            });

            lineReader.on('line', function (line){
               console.log('Line from file:', line);
            })*/

            //Idée à faire : split le fichier dans un tableau
            //Tester tab[i] = line
            //On teste dans une lecture d'une ligne où on incrémente le compteur et "trouve" et si matche
            let tabLine;
            let tabCompteur;
            tabLine = data.toString().split(separator);

            /*console.log("\ntab[0] = " + tabLine[0]);
            console.log("tab[1] = " + tabLine[2]);
            console.log("tab[2] = " + tabLine[1]);
            console.log("La taille du tableau est de " + tabLine.length)*/

            //console.log("----- Le tableau est -----");
            //console.log(tabLine);

            for (let j = 0; j < tabLine.length; j++) {
                compteur=0;
                for (let k = 0; k < tabLine.length; k++) {
                    if(tabLine[k] === tabLine[j]){
                        //console.log("compteur" + j + " ++");
                        compteur++;
                        //console.log("compteur = " + compteur);
                    }
                    if(compteur >= 2){
                        trouve = true;
                        //console.log("trouve " + j + " " + trouve);
                        tabCompteur = compteur;
                    }
                }
            }

            //On communique les résultats
            if(trouve ===true){
                console.log("\nNous avons trouvé " + tabCompteur + " fois la même question");
                console.log("\nLe fichier n'est donc pas valide");
            }
            else{
                console.log("\nLe fichier est valide, chaque question n'est présente qu'une seule fois");
            }
        })
    })

    //****************************************************************
    //Spec 5
    .command('QualitéNombre', 'Check if <file> is a valid: contains between 15 and 20 questions')
    .argument("<file>", "C'est le chemin du fichier à tester")
    .action(({args,logger}) => {

        fs.readFile(path, 'utf8', function (err,data) {
            if (err) {
                return logger.warn(err);
            }
            //On parse le fichier pour séparer les questions des énoncés et compter les questions
            var analyzer=new VpfParser();
            analyzer.parse(data);

            var count=0;
            //On compte le nombre de questions
            for(let i=0;i<analyzer.enonce.length;i++){
                for(let y=0;y<analyzer.question[i].length;y++){

                    count++;
                }
            }

            console.log("Le nombre de questions est:"+count);

            if(count<15 || count>20){
                console.log("ERREUR! Le nombre de questions est invalide.");
                console.log("Il doit être compris entre 15 et 20");
            }


        })
    })



    //***************************************************************
    //SPEC 6
    // Pour faire passer un test à un étudiant
    // Il faut trier les questions et les réponses
    .command('test', 'Fonction qui fait passer le test à un étudiant')
    .argument('<fileExam>', 'Le fichier de type examen')
    .action(({args, logger}) => {

        let pathExam = args.fileExam.toString();
        let dataReadExam;
        let nbErreurs=0;
        let analyzerExam = new VpfParser();
        let analyzerResultat = new VpfParser();

        fs.readFile(pathExam, 'utf8', function (err,dataExam) {
            if (err) {
                return logger.warn(err);
            }

            dataReadExam=dataExam;

            analyzerExam.parse(dataExam, pathExam);
            //console.log("On a parsé");

            let pathReponses = prompt("Quel nom voulez vous donner au fichier contenant vos réponses au test ? ");
            pathReponses = "./" + pathReponses + ".gift";

            analyzerResultat.test(dataExam, pathExam);

            //On crée un tableau pour stocker les résultats
            let reponse = new Array(analyzerExam.question.length);
            const symbole1 = /=/g;
            const symbole2 = /{/g;

            console.log("\n----- Vous allez passer un examen composé de " + analyzerExam.question.length + " exercices -----");
            for (let i = 0; i < analyzerExam.question.length; i++) {
                reponse[i] = new Array(analyzerExam.question[i].match(symbole2).length) //Il y a autant de réponses à une question que de questions
                console.log("\n----- Exercice " + (i+1) + " -----");    //+1 pour pas avoir d'exercice 0
                //S'il y a un énoncé on doit l'afficher
                if(analyzerResultat.enonce[i] !== undefined) {
                    console.log(analyzerResultat.enonce[i]);    //0 pour l'énoncer
                }

                //On affiche la ou les questions
                console.log("-- Informations sur l'exercice --");
                //console.log("Dans l'exercice il y a " + analyzerResultat.filTest[i][1].length + " questions");
                console.log("Type de l'exercice :");
                switch (analyzerResultat.filTest[i][2]) {
                    case 1 :
                        console.log("C'est un QCM");
                        break;
                    case 2 :
                        console.log("C'est un vrai/faux");
                        break;
                    case 3 :
                        console.log("C'est une correspondance");
                        break;
                    case 4 :
                        console.log("C'est un mot manquant");
                        break;
                    case 5 :
                        console.log("C'est un numérique");
                        break;
                    case 6 :
                        console.log("C'est une question ouverte");
                        break;
                    default :
                        console.log("Type de question non valide.\n") ;
                    break;
                }
                console.log("\nL'exercice est :\n" + analyzerResultat.filTest[i][0]);

                if(analyzerExam.question[i].match(symbole2).length >= 2){  //On a plusieurs questions pour 1 exercice
                    for (let j = 0; j < analyzerResultat.filTest[i][1].length; j++) {
                        if(analyzerResultat.filTest[i][2] === 1){
                            console.log("Voici les choix possibles :");
                            for (let k = (4*j); k < (4*j+(3+1)); k++) {
                                if(analyzerResultat.filTest[i][3][k].localeCompare('') !== 0) { //On affiche les mauvaises réponses
                                    console.log("- " + analyzerResultat.filTest[i][3][k]);
                                }
                            }
                            //On affiche la bonne réponse
                            console.log("- " + analyzerResultat.filTest[i][3][3*(analyzerResultat.filTest[i][1].length)+j+analyzerResultat.filTest[i][1].length]);
                        }
                        reponse[i][j] = prompt("Veuillez rentrer votre réponse à la question n°" + j + ", si vous ne voulez rien mettre tapez un \"-\" ");
                        fs.appendFile(pathReponses, reponse[i][j]+'\n', function (err) {
                            if (err) return console.log(err);
                        });
                    }
                }
                else if(analyzerResultat.filTest[i][2] === 3){  //matching question
                    console.log("Voici les choix possibles :");
                    console.log("Les premières parties possibles sont avant le -, les deuxièmes parties après le - ");
                    for (let j = 0; j < analyzerResultat.filTest[i][1].length/2; j++) {
                        for (let k = 0; k < (analyzerResultat.filTest[i][1].length/2); k++) {
                            if(analyzerResultat.filTest[i][1][k].localeCompare('') !== 0){
                                //let aAfficher = analyzerResultat.filTest[i][1][k].replace(">", '')
                                console.log(analyzerResultat.filTest[i][1][k]);
                            }
                        }
                        console.log("Rentrez la réponse de cette manière : Je vais - à l'école");
                        reponse[i][j] = prompt("Veuillez rentrer votre réponse pour la ligne " + j + ", si vous ne voulez rien mettre tapez un \"-\" ");
                        fs.appendFile(pathReponses, reponse[i][0]+'\n', function (err) {
                            if (err) return console.log(err);
                        });
                    }

                }
                else{   //On a 1 question pour 1 exercice
                    if(analyzerResultat.filTest[i][2] === 1){
                        console.log("\nVoici les choix possibles :");
                        for (let k = 0; k < analyzerResultat.filTest[i][3].length; k++) {
                            if(analyzerResultat.filTest[i][3][k].localeCompare('') !== 0){
                                console.log(analyzerResultat.filTest[i][3][k]);
                            }
                        }
                    }
                    reponse[i][0] = prompt("Veuillez rentrer votre réponse à la question, si vous ne voulez rien mettre tapez un \"-\" ");
                    fs.appendFile(pathReponses, reponse[i][0]+'\n', function (err) {
                        if (err) return console.log(err);
                    });
                }
            }


            console.log("pathReponses = " + pathReponses);

            console.log("----- Vérification du test -----");
            fs.readFile(pathReponses, 'utf8', function (err,dataReponses){
                let exerciceAvecPlusieursQuestions  = 0;

                for (let i = 0; i < analyzerExam.question.length; i++) {
                    console.log("\n----- Résultat exercice " + (i+1) + " -----");   //+1 pour pas avoir d'exercice 0
                    if(analyzerResultat.filTest[i][2] === 3) {  //matching question
                        console.log("Matching question");
                        for (let j = 0; j < analyzerResultat.filTest[i][1].length/2; j++) {
                            console.log("Réponse de la base de données à comparer : " + analyzerResultat.filTest[i][1][j]);
                            console.log("Réponse entrée par l'utilisateur : " + reponse[i][j]);
                            if(analyzerResultat.filTest[i][1][j].includes(reponse[i][j])){
                                console.log("Vous avez la bonne réponse !");
                            } else {
                                console.log("Vous n'avez pas la bonne réponse, la bonne réponse était " + analyzerResultat.filTest[i][1][j]);
                                nbErreurs++;
                            }
                        }
                    }
                    else if (reponse[i].length === 1 && analyzerExam.question[i].match(symbole2).length===analyzerExam.question[i].match(symbole1).length) {  //Une seule réponse juste pour la question
                        console.log("Réponse de la base de données à comparer : " + analyzerResultat.filTest[i][1][0]);
                        console.log("Réponse entrée par l'utilisateur : " + reponse[i][0]);
                        if (analyzerResultat.filTest[i][1][0].trim().localeCompare(reponse[i][0]) === 0) {   //trim pour supprimer les espaces inutiles
                            console.log("Vous avez la bonne réponse !");
                        } else {
                            console.log("Vous n'avez pas la bonne réponse, la bonne réponse était " + analyzerResultat.filTest[i][1]);
                            nbErreurs++;
                        }
                    }
                    else if(reponse[i].length !== 1){   //1 réponse pour 1 question d’un exercice comportant plusieurs questions, ici il faut tester quand Alexis aura mis à jour le parser EnonceQuestion(), s'il met une question par case on test sur le nombdre de EnonceQuestion
                        //Sinon on doit
                        for (let j = 0; j < reponse[i].length; j++) {
                            console.log("Réponse entrée par l'utilisateur : " + reponse[i][j]);
                            console.log("Réponse de la base de données à comparer : " + analyzerResultat.filTest[i][1][j]);
                            if (analyzerResultat.filTest[i][1][j].trim().localeCompare(reponse[i][j]) === 0) {
                                console.log("Vous avez la bonne réponse !");
                            }
                            else{
                                console.log("Vous n'avez pas la bonne réponse, la bonne réponse était " + analyzerResultat.filTest[i][1][j]);
                                nbErreurs++;
                            }
                        }
                        //On actualise exerciceAvecPlusieursQuestions
                        exerciceAvecPlusieursQuestions = exerciceAvecPlusieursQuestions - 1 + analyzerResultat.filTest[i][1].length;
                    }
                    else{  //Plusieurs réponses pour la question
                        let bon = false;
                        for (let j = 0; j < analyzerResultat.filTest[i][1].length; j++) {
                            if (analyzerResultat.filTest[i][1][j].trim().localeCompare(reponse[i][0]) === 0) {
                                console.log("Vous avez la bonne réponse !");
                                bon = true;
                            }
                        }
                        if(bon===false){
                            console.log("Vous n'avez pas la bonne réponse, les bonnes réponses étaient " + analyzerResultat.filTest[i][1]);
                            nbErreurs++;
                        }
                    }
                }

                console.log("----- Récapitulatif de l'examen -----")
                console.log("Au final, sur " + analyzerExam.question.length + " exercice(s), vous avez fait " + nbErreurs + " erreurs");

            })
        })
    })



    //**************************************************************
    //Spec 7
    .command("profil", "Dresser le profil d'un fichier GIFT, et l'afficher sous forme d'un histogramme")
    .alias("profil")
    .argument('<file>', 'Le fichier GIFT à étudier')
    .action(({args, options, logger}) => {

        const data = lireFichier(args.file.toString());
        //fs.readFile(args.file.toString(), 'utf8', function (err,data) {
            /*if (err) {
                return logger.warn(err);
            }*/
            //appel du parser avec analyzer sur le premier fichier
            let analyzer = new VpfParser();
            analyzer.test(data);

        console.log("Il y a " + analyzer.filTest.length + " questions");

            let types = Array(analyzer.filTest.length);

            //Extraction des types de questions, sous forme d'un tableau à 1 dimension
            for(let i=0 ; i < analyzer.filTest.length ; i++){
                types[i] = analyzer.filTest[i][2];
            }

            //test avec une liste toute faite
            //let list=[1,2,1,1,1,3,4,5,1];

            if(/*analyzer.errorCount*/0 === 0){ //l'attibut errorCount sera à creer dans le parser

                //On initialise le compte des différents types à 0.
                let i = 0;
                let nbQCM = 0;
                let nbVF = 0;
                let nbCORR = 0;
                let nbMM = 0;
                let nbNUM = 0;
                let nbOUV = 0;

                for (i = 0 ; /*i < 9*/ /*list.length()*/ i < types.length; i++){
                    switch (types[i]) {
                        case 1 : nbQCM++; break;
                        case 2 : nbVF++ ; break;
                        case 3 : nbCORR++ ; break;
                        case 4 : nbMM++ ; break;
                        case 5 : nbNUM++ ; break;
                        case 6 : nbOUV++ ; break;
                        default : console.log("Type de question non valide.\n") ; break;
                    }
                }

                /*console.log("On affiche les données : ");
                console.log(nbQCM);
                console.log(nbVF);
                console.log(nbCORR);
                console.log(nbMM);
                console.log(nbNUM);
                console.log(nbOUV);*/

                var profile = {
                    "data" : {
                        "values" : [{"Type" : "QCM","Nombre" : nbQCM}, {"Type" : "Vrai-Faux","Nombre" : nbVF}, {"Type" : "Correspondance","Nombre" : nbCORR}, {"Type" : "Mot manquant","Nombre" : nbMM}, {"Type" : "Numérique","Nombre" : nbNUM}, {"Type" : "Ouverte","Nombre" : nbOUV}
                        ]
                    },
                    "mark" : "bar",
                    "encoding" : {
                        "x" : {"field" : "Type", "type" : "nominal"},
                        "y" : {"aggregate" : "average", "field" : "Nombre", "type" : "quantitative",
                            "axis" : {"title" : "Nombre d'occurrence"}}
                    }
                }



                const myProfile = vegalite.compile(profile).spec;

                /* SVG version */
                var runtime = vg.parse(myProfile);
                var view = new vg.View(runtime).renderer('svg').run();
                var mySvg = view.toSVG();
                mySvg.then(function(res){
                    fs.writeFileSync("./Profile.svg", res)
                    view.finalize();
                    logger.info("Profil savegardé dans : ./Profile.svg");
                });

            }else{
                logger.info("The .vpf file contains error".red);
            }
        //})



    })


    //***************************************************************
    //Spec 8
    .command("comparer", "comparer un fichier d'examen avec des fichiers de la banque de question")
    .argument('<file>', 'Le fichier Examen à étudier')
    .action(({args,logger}) => {

        let tabExamenExtrait = Array();

        const dataExam = lireFichier(args.file.toString());
        //fs.readFile(args.file.toString(), 'utf8', function (err,data) {
            /*if (err) {
                return logger.warn(err);
            }*/

            //appel du parser avec analyzer sur le premier fichier
            let analyzer = new VpfParser();
            analyzer.test(dataExam);

            //Extraction des types de questions, sous forme d'un tableau à 1 dimension
            for(let i=0 ; i < analyzer.filTest.length ; i++){
                tabExamenExtrait[i] = analyzer.filTest[i][2];
            }
            //test avec une liste toute faite :
            //let list=[1,2,1,1,1,3,4,5,1];
            if(/*analyzer.errorCount*/0 === 0) { //l'attibut errorCount sera à creer dans le parser

                //On initialise le compte des différents types à 0.
                let nbQCMExamen = 0;
                let nbVFExamen = 0;
                let nbCORRExamen = 0;
                let nbMMExamen = 0;
                let nbNUMExamen = 0;
                let nbOUVExamen = 0;

                for (i = 0; i < tabExamenExtrait.length; i++) {
                    switch (tabExamenExtrait[i]) {
                        case 1 :
                            nbQCMExamen++;
                            break;
                        case 2 :
                            nbVFExamen++;
                            break;
                        case 3 :
                            nbCORRExamen++;
                            break;
                        case 4 :
                            nbMMExamen++;
                            break;
                        case 5 :
                            nbNUMExamen++;
                            break;
                        case 6 :
                            nbOUVExamen++;
                            break;
                        default :
                            console.log("Type de question non valide.\n");
                            break;
                    }
                }

                //On crée un tableau à 2 dimensions, contenant les listes des types de tous les fichiers
                //ex : on a 3 fichiers de la banque en entrée : [[1,1,5,3,2],[1],[4,4,4]]
                //Pour créer un tableau à 2 dimensions, on doit avoir les memes dimensions de listes ; on complete avec des 0
                //ex : [[1,1,5,3,2],[1,0,0,0,0],[4,4,4,0,0]]

                let nbFichiers = prompt("Combien de fichiers voulez-vous comparer au fichier examen ?");
                let matrice = new Array(nbFichiers); //la matrice qui va contenir tous les tableaux de type de toutes les questions

                let nbQCMBanque = 0;
                let nbVFBanque = 0;
                let nbCORRBanque = 0;
                let nbMMBanque = 0;
                let nbNUMBanque = 0;
                let nbOUVBanque = 0;

                for (let i = 0 ; i < nbFichiers ; i++){

                    let path = prompt("Entrer le chemin du fichier "+(i+1)+" de la banque de question (avec .gift à la fin): ");
                    let data = lireFichier(path);
                    //fs.readFile(path, 'utf8', function (err,data) {
                    // if (err) {
                    //     return logger.warn(err);
                    // }
                    //appel du parser avec analyzer sur le premier fichier
                    let parseur = new VpfParser();
                    parseur.test(data);

                    matrice[i] = new Array(parseur.filTest.length);
                    //Extraction des types de questions, sous forme d'un tableau à 1 dimension
                    for(let j=0 ; j < parseur.filTest.length ; j++){
                        switch(parseur.filTest[j][2]){
                            case 0 : break;
                            case 1 :
                                nbQCMBanque++;
                                break;
                            case 2 :
                                nbVFBanque++;
                                break;
                            case 3 :
                                nbCORRBanque++;
                                break;
                            case 4 :
                                nbMMBanque++;
                                break;
                            case 5 :
                                nbNUMBanque++;
                                break;
                            case 6 :
                                nbOUVBanque++;
                                break;
                            default :
                                console.log("Type de question non valide.\n");
                                break;
                        }
                    }
                    /*console.log("Les données du fichier sont : ");
                    console.log(nbQCMBanque);
                    console.log(nbVFBanque);
                    console.log(nbCORRBanque);
                    console.log(nbMMBanque);
                    console.log(nbNUMBanque);
                    console.log(nbOUVBanque);*/

                    /*//puis on calcule l'occurrence moyenne, en divisant par le nombre de fichiers
                    nbQCMBanque /= nbFichiers;
                    nbVFBanque /= nbFichiers;
                    nbCORRBanque /= nbFichiers;
                    nbMMBanque /= nbFichiers;
                    nbNUMBanque /= nbFichiers;
                    nbOUVBanque /= nbFichiers;*/
                }

                console.log("Les données sont : ");
                console.log(nbQCMBanque);
                console.log(nbVFBanque);
                console.log(nbCORRBanque);
                console.log(nbMMBanque);
                console.log(nbNUMBanque);
                console.log(nbOUVBanque);

                //puis on calcule l'occurrence moyenne, en divisant par le nombre de fichiers
                nbQCMBanque /= nbFichiers;
                nbVFBanque /= nbFichiers;
                nbCORRBanque /= nbFichiers;
                nbMMBanque /= nbFichiers;
                nbNUMBanque /= nbFichiers;
                nbOUVBanque /= nbFichiers;

                console.log("Les données du fichier sont : ");
                console.log(nbQCMBanque);
                console.log(nbVFBanque);
                console.log(nbCORRBanque);
                console.log(nbMMBanque);
                console.log(nbNUMBanque);
                console.log(nbOUVBanque);

                let comparaison = {
                    "data": {
                        "values": [
                            {"fichier": "Examen", "type": ["QCM", "Vrai-Faux","Correspondance", "Mot-manquant", "Numerique","Ouverte"], "nombre": [nbQCMExamen, nbVFExamen,nbCORRExamen,nbMMExamen,nbNUMExamen,nbOUVExamen]},
                            {"fichier": "Banque (moyenne)", "type": ["QCM", "Vrai-Faux","Correspondance", "Mot-manquant", "Numerique","Ouverte"], "nombre": [nbQCMBanque, nbVFBanque,nbCORRBanque,nbMMBanque,nbNUMBanque,nbOUVBanque]}
                        ]
                    },
                    "transform": [{"flatten": ["type", "nombre"]}],
                    "mark": "bar",
                    "encoding": {
                        "x": {"field": "type", "type": "nominal"},
                        "y": {"field": "nombre", "type": "quantitative"},
                        "color": {"field": "fichier", "type": "nominal"}
                    }
                }

                const maComparaison = vegalite.compile(comparaison).spec;

                /* SVG version */
                var runtime = vg.parse(maComparaison);
                var view = new vg.View(runtime).renderer('svg').run();
                var mySvg = view.toSVG();
                mySvg.then(function(res){
                    fs.writeFileSync("./ProfilComparaison.svg", res)
                    view.finalize();
                    console.log("Profil sauvegardé dans : ./ProfilComparaison.svg");
                });
            }
        //})
    })

type: module;

function lireFichier(path){
    let fichier = fs.readFileSync(path, 'utf8');
    return fichier;
}
program.run()

