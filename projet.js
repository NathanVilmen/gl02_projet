#!/usr/bin/env node
const fs = require('fs');
const prompt = require('prompt-sync')();
const {VpfParser} = require('./parser.js');
const groupp = require('./group.js');

const cli = require("@caporal/core").default;
const question = require('./objet.js');
//const { group, Console } = require('console');

//Ici SPEC 2,3,5 plus une fonction test !!!!!
cli
	// Sert à séparer le fichier par question
	.version('vpf-parser-cli')
	.version('0.07')
	.command('group', 'Check if <file> is a valid Vpf file, add one question to a file')
	.argument("<numQ>", "C'est le numéro de la question souhaitée")
	.argument("<numF>", "C'est le numéro du fichier souhiaté")
	.argument("<nomF>", "C'est le nom du fichier d'exmen souhaité")
	.argument("<nomEnonce>", "C'est le num de l'énoncé qu'il faut indiquer")
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
	var nomF=args.nomF;
	var numQ=args.numQ;
	var numEnonce=args.numEnonce;

	console.log("Voici le numero du fichier:"+numF);
	console.log("Voici le nom du fichier:"+nomF);
	console.log("Voici le numero de la question:"+numQ);
	console.log("Voici le numero de la question:"+numEnonce);
	

	var path=myMap.get(numF);

	fs.readFile(path, 'utf8', function (err,data) {
		if (err) {
			return logger.warn(err);
		}

		console.log("on lit le fichier");
		//Le path du fichier
		var pathNewFile=nomF+'.gift';

		var analyzer=new VpfParser();
		analyzer.parse(data)


		console.log("Voici la question:"+analyzer.question[numEnonce][numQ]);
		
		//on écrit l'énoncé et la question qui lui correspond
		fs.appendFile(pathNewFile, '::U'+analyzer.enonce[numEnonce]+analyzer.question[numEnonce][numQ], function (err) {
			if (err) return console.log(err);
		});	
	})
		
	})


	// Pour faire passer un test à un étudiant
	// Il faut trier les questions et les réponses 
	.command('test', 'Fonction qui fait passer le test à un étudiant')
	.argument('<file>', 'Le fichier de type examen')
	.action(({args, logger}) => {
		
		//U1-p7-Adverbs
		var path="./SujetB_data/U1-p7-Adverbs.gift"
		//C'est juste en test mais sinon faudrait mettre args.file dans le fs.Read
		fs.readFile(path, 'utf8', function (err,data) {
			if (err) {
				return logger.warn(err);
			}
	  
			console.log("on est dans test");
			//On appelle le parser pour qu'il tri le fichier 
			//function x(a,b,c){}
			//new x(1,2,3);
			
			var analyzer=new VpfParser();

			//On appelle la fonction teste qui trie les réponses de chaque question
			analyzer.test(data,path);

			//On affiche l'énoncé et les questions en rapport avec l'énoncé 
			//On affiche ensuite les réponses possibles
			//Puis on affiche un bilan de réponses
		});
			
	})

  //Pour rechercher et visualiser une question
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

		for (let i = 0; i < 47; i++) {
			let path = myMap.get(i);
			//console.log("Le path est : " + path);

			fs.readFile(path, 'utf8', function (err,data){
				if (err) {
					return logger.warn(err)
				}
				if(data.toLowerCase().includes(typeExercice.toLowerCase())){	//toLowerCase() pour ne pas être sensible à la casse
					//On affiche le fichier
					console.log("Le fichier numéro " + i + " correspond à vos recherches");
					
					//On parse le fichier 
					var analyzer=new VpfParser();
					analyzer.separer(data);

					//On a les énoncés associés à toutes les questions
					//On vérifie quels énoncés contiennent ce mot
					for(let k=0;k<this.enonce.length;k++){
						if(this.enonce[k].toLowerCase().includes(typeExercice.toLowerCase())){

							console.log("L'énoncé numéro "+k+" correspond à votre recherche");
							//On affiche toutes les questions 

							for(let y=0;y<this.question[k][y].length;y++){
								console.log("Choississez le numéro de question"+y+" si vous voulez cette question");
								console.log(question[k][y]);

								var choixQ=prompt("Choisissez vous cette question? (Vous pourrez en chosir une autre après)");

								recherche[0]=i;
								recherche[1]=k;
								recherche[2]=choixQ;
							}
						}
					}
				}
			})
		}

		//Affichage des choix
		console.log("Vous avez choisi le fichier numéro "+recherche[0]);
		console.log("Vous avez choisi l'énoncé' numéro "+recherche[1]);
		console.log("Vous avez choisi la question numéro "+recherche[2]);
	})

	//Spec entre 15 et 20 questions
	.command('QualitéNombre', 'Check if <file> is a valid: contains between 15 and 20 questions')
	.argument("<file>", "C'est le numéro de la question souhaitée")
	.action(({args,logger}) => {

		fs.readFile(path, 'utf8', function (err,data) {
			if (err) {
				return logger.warn(err);
			}
			//On parse le fichier pour séparer les questions des énoncés et compter les questions
			var analyze=new VpfParser();
			analyzer.parse();

			var count=0;
			//On compte le nombre de questions
			for(let i=0;i<analyzer.enonce.length;i++){

				for(let y=0;y<analyzer[i].length;y++){

					count++;
					console.log("Le nombre de questions est:"+count);
				}
			}

			if(count<15 || count>20){
				console.log("ERREUR! Le nombre de questions est invalide.");
				console.log("Il doit être compris entre 15 et 20");
			}
		

		})
	})
cli.run(process.argv.slice(2));