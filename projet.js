#!/usr/bin/env node
const fs = require('fs');
const prompt = require('prompt-sync')();
const VpfParser = require('./parser.js');
const groupp = require('./group.js');

const cli = require("@caporal/core").default;
const question = require('./objet.js');
//const { group, Console } = require('console');

//Faire un objet question avec numéro de question, type de question,question, titre, forme de la question en fonction du type de celle-ci
cli
	 // Sert à séparer le fichier par question
	.version('vpf-parser-cli')
	.version('0.07')
	.command('group', 'Check if <file> is a valid Vpf file, add one question to a file')
	.argument("<numQ>", "C'est le numéro de la question souhaitée")
	.argument("<numF>", "C'est le numéro du fichier souhiaté")
	.argument("<nomF>", "C'est le nom du fichier d'exmen souhaité")
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

	console.log("Voici le numero du fichier:"+args.numF);
	console.log("Voici le nom du fichier:"+args.nomF);
	console.log("Voici le numero de la question:"+args.numQ);
	

	var path=myMap.get(numF);
	console.log("hhhhhhhhhhhh"+path[14]);

	fs.readFile(path, 'utf8', function (err,data) {
		if (err) {
			return logger.warn(err);
		}

		console.log("on lit le fichier");

		//Il faut trier le fichier écrit

		if(path[14]=="U"){
			separator = ('::U');
		}
			else{//Le fichier commence par EM
			separator=('::EM')
			}
		
		//On split les datas
		data=data.toString();
		data = data.split(separator);
		//On filtre: on retire tout ce qui est le séparateur
		data = data.filter((val, idx) => !val.match(separator));
			
		//DEBUG
		console.log("La question a bien été ajoutée"+typeof data);
		var pathNewFile=nomF+'.gift';

		console.log("Voici la question:"+data[numQ]);
		
		fs.appendFile(pathNewFile, '::U'+data[numQ], function (err) {
			if (err) return console.log(err);
		});	
	})
		
	})

	// Sert à séparer le fichier par question
	//N'est plus d'actualité c'était pour le premier fichier!!!!!!!!!!!c'est juste là à tritre d'exemple
	.command('check', 'Check if <file> is a valid Vpf file, sépare les questions')
	.argument('<file>', 'The file to check with Vpf parser')
	.action(({args, logger}) => {
		
		fs.readFile(args.file, 'utf8', function (err,data) {
			if (err) {
				return logger.warn(err);
			}
	  
			var analyzer = new VpfParser();
			analyzer.parse(data);
      //Maintenant le tableau de questions est dans l'objet VpfParser.parsedPOI
      //Mainteant--> essayer de mettre le numéro de la question dans objet.num

      //on créée un objet objet
      var triQ=new question();

      //On appelle une fonction dans le fichier parser.js avec en paramètre le parser.parsedPOI
      var string=analyzer.parsedPOI[0];
      triQ.tri(string);


		});
			
	})






  //Exemple
  .command('coucou', 'Yeahozjhh')
  .argument("<name>", "Name to greet")
  .action(({ logger, args }) => {
    logger.info("coucou tiri, %s!", args.name)
  })
cli.run(process.argv.slice(2));