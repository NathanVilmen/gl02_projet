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
	.version('vpf-parser-cli')
	.version('0.07')
   // Sert à séparer le fichier par question
	.command('group', 'Check if <file> is a valid Vpf file, add one question to a file')
	.action(() => {
	
	  var nbrQuestion = prompt('What is the number of questions?');
	  console.log(`Voici le nombre dde questions: ${nbrQuestion}`);

	  while(nbrQuestion<1 || nbrQuestion>20){
		
		console.log("You can only choose a number between 15 and 20");
		nbrQuestion = prompt('What is the number of questions?');
	 	console.log(`Voici le nombre dde questions: ${nbrQuestion}`);
	  }

	  
	  
	  	
		var questionNumber;
	  	var questionNumber;
		var file;
	  	for (let pas=0;pas<nbrQuestion;pas++){

			fs.readFile('text.gift', 'utf8', function (err,data) {
				if (err) {
					return logger.warn(err);
				}

				console.log("On est dans projet voici le pas"+pas);
				file = prompt('What is the file name?');//U4-p39-Reading-xmen
				string = file.toString();
	 			console.log(`Here is the file name: ${string}`);
				console.log("on lit le fichier");

				//Il faut trier le fichier écrit
				questionNumber = prompt('What is the question number?');
				console.log(`Here is the question number: ${questionNumber}`);
	
				separator= ('::U');
			 	/*
			 	if(data[0]=="U"){
				 	separator = ('::U');
			 	}
				 else{//Le fichier commence par EM
				 	separator=('::EM')
				 }
			 	*/
			 
			 //On split les datas
			 	data = data.split(separator);
			
			 //On filtre: on retire tout ce qui est le séparateur
			// data = data.filter((val, idx) => !val.match(separator));
	

			//On stock dans tabQuestions
			
			console.log("La question a bien été ajoutée");
			//console.log("Voici le tabQuestions"+analyzer.tabQuestion);
			fs.appendFile('helloworld.txt', '::U', function (err) {
				if (err) return console.log(err);
			});	

			fs.appendFile('helloworld.txt', data[questionNumber], function (err) {
				if (err) return console.log(err);
			});	
		})
		}
	
		console.log("Le tableau final");
		
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