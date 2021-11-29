#!/usr/bin/env node
const fs = require('fs');

const VpfParser = require('./parser.js');

const { program } = require("@caporal/core");
const question = require('./objet.js');
const { group } = require('console');

//Faire un objet question avec numéro de question, type de question,question, titre, forme de la question en fonction du type de celle-ci
program
 
   // Sert à séparer le fichier par question
	.command('group', 'Check if <file> is a valid Vpf file, add one question to a file')
	.action(({ logger}) => {
		
	//Pour remplacer prompt
	const readline = require('readline').createInterface({
		input: process.stdin,
		output: process.stdout
	  });
	   
	  readline.question('Quel fichier voulez-vous?', data => {
		console.log(`Vous avez choisi le fichier: ${data}!`);
		readline.close();
	  });
	
  	//console.log(data);
	var analyzer = new group();
	analyzer.group(data);

	//console.log("Voici le tabQuestions"+analyzer.tabQuestion);
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

type: module;
program.run()