#!/usr/bin/env node
const fs = require("fs");
const prompt = require("prompt-sync")();

const VpfParser = require("./parser.js");

const { program } = require("@caporal/core");
//const question = require('./objet.js');
const { group } = require("console");
const path = require("path");
//const { logger } = require("logger/index");

//Faire un objet question avec numéro de question, type de question,question, titre, forme de la question en fonction du type de celle-ci
program

	// Sert à séparer le fichier par question
	.version("vpf-parser-cli")
	.version("0.07")
	.command(
		"group",
		"Check if <file> is a valid Vpf file, add one question to a file"
	)
	.argument("<numQ>", "C'est le numéro de la question souhaitée")
	.argument("<numF>", "C'est le numéro du fichier souhiaté")
	.argument("<nomF>", "C'est le nom du fichier d'exmen souhaité")
	.action(({ args, logger }) => {
		//On définit la Map pour pouvoir associer le numéro de fichier à un path
		const myMap = new Map();
		myMap.set(0, "./SujetB_data/EM-U4-p32_33-Review.gift");
		myMap.set(
			1,
			"./SujetB_data/EM-U5-p34-Gra-Expressions_of_quantity.gift"
		);
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
		myMap.set(
			13,
			"./SujetB_data/U3-p31-Gra-ed_adjectives_prepositions.gift"
		);
		myMap.set(
			14,
			"./SujetB_data/U3-p32-Gra-Present_perfect_simple_vs_continuous.gift"
		);
		myMap.set(
			15,
			"./SujetB_data/U3-p32-GR-Present_perfect_vs_past_simple.gift"
		);
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

		let numF = args.numF;
		let nomF = args.nomF;
		let numQ = args.numQ;

		console.log("Voici le numero du fichier:" + args.numF);
		console.log("Voici le nom du fichier:" + args.nomF);
		console.log("Voici le numero de la question:" + args.numQ);

		let path = myMap.get(numF);

		fs.readFile(path, "utf8", function (err, data) {
			if (err) {
				return logger.warn(err);
			}

			console.log("on lit le fichier");

			//Il faut trier le fichier écrit

			if (path[14] === "U") {
				separator = "::U";
			} else {
				//Le fichier commence par EM
				separator = "::EM";
			}

			//On split les datas
			data = data.toString();
			data = data.split(separator);
			//On filtre: on retire tout ce qui est le séparateur
			data = data.filter((val, idx) => !val.match(separator));

			//DEBUG
			console.log("La question a bien été ajoutée " + typeof data);
			let pathNewFile = nomF + ".gift";

			console.log("Voici la question:" + data[numQ]);

			fs.appendFile(pathNewFile, "::U" + data[numQ], function (err) {
				if (err) return console.log(err);
			});
		});
	})

	//Pour rechercher et visualiser une question
	.command("viewer", "Pour rechercher et visualiser une question")
	.action(({ logger }) => {
		console.log("C'est bon");
		const myMap = new Map();
		myMap.set(0, "./SujetB_data/EM-U4-p32_33-Review.gift");
		myMap.set(
			1,
			"./SujetB_data/EM-U5-p34-Gra-Expressions_of_quantity.gift"
		);
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
		myMap.set(
			13,
			"./SujetB_data/U3-p31-Gra-ed_adjectives_prepositions.gift"
		);
		myMap.set(
			14,
			"./SujetB_data/U3-p32-Gra-Present_perfect_simple_vs_continuous.gift"
		);
		myMap.set(
			15,
			"./SujetB_data/U3-p32-GR-Present_perfect_vs_past_simple.gift"
		);
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

		//Je sais pas à quoi ça sert mais comme tu l'as mit je le met :)
		/*const readline = require('readline').createInterface({
			input: process.stdin,
			output: process.stdout
		});

		readline.question('Quel nom d\'exerice voulez vous ?', nomExercice => {
			console.log(`Vous avez choisi ce nom de question: ${nomExercice}!`)
			readline.close()
		});*/

		//Il faut faire un while qui lit tous les fichiers du dossier SujetB tant qu'on n'a pas trouvé la question qu'on veut
		let typeExercice = prompt("Quel type d'exercice recherchez vous ? ");
		console.log("Vous avez choisi ce type d'exercice : " + typeExercice);

		for (let i = 0; i < 47; i++) {
			let path = myMap.get(i);
			console.log("Le path est : " + path);
			fs.readFile(path, "utf8", function (err, data) {
				if (err) {
					return logger.warn(err);
				}
				if (data.toLowerCase().includes(typeExercice.toLowerCase())) {
					//toLowerCase() pour ne pas être sensible à la casse
					//On affiche le fichier
					console.log("----- FICHIER numéro " + i + " -----");
					console.log(data);
				}
			});
		}
		//Du coup, comment parcourir tous les fichiers d'un dossier ?
		//Ensuite on parse le fichier s'il correspond
		//Puis on l'affiche
		//On lui dit le numéro du fichier

		//let analyzer = new viewer();
		//analyzer.rechercher(nomExercice);
	})

	//Spec 4
	.command("check", "Vérifier la qualité des données d’examen")
	.argument("<file>", "Nom du fichier à vérifier")
	.action(({ args, logger }) => {
		console.log("C'est bon");
		const myMap = new Map();
		myMap.set(0, "./SujetB_data/EM-U4-p32_33-Review.gift");
		myMap.set(
			1,
			"./SujetB_data/EM-U5-p34-Gra-Expressions_of_quantity.gift"
		);
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
		myMap.set(
			13,
			"./SujetB_data/U3-p31-Gra-ed_adjectives_prepositions.gift"
		);
		myMap.set(
			14,
			"./SujetB_data/U3-p32-Gra-Present_perfect_simple_vs_continuous.gift"
		);
		myMap.set(
			15,
			"./SujetB_data/U3-p32-GR-Present_perfect_vs_past_simple.gift"
		);
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
		console.log(
			"Vous avez choisi de vérifier la qualité des données d'examen du fichier : " +
				args.file
		);
		//On recherche s'il y a des questions en double
		let trouve = false;
		let separator;
		let compteur = 0;
		let question;
		let i = 1; //permet de compter le nombre de fois qu'on exécute le while
		fs.readFile(path.toString(), "utf8", function (err, data) {
			/*if (err) {
				return logger.warn(err)
			}*/
			if (path[14] === "U") {
				separator = "::U";
			} else {
				//Le fichier commence par EM
				separator = "::EM";
			}

			//Ca marche, https://www.it-swarm-fr.com/fr/javascript/lire-un-fichier-ligne-par-ligne-dans-node.js/972842073/
			/*let lineReader = require('readline').createInterface({	//On définie une nouvelle constante pour lire
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

			for (let j = 0; j < tabLine.length; j++) {
				compteur = 0;
				for (let k = 0; k < tabLine.length; k++) {
					if (tabLine[k] === tabLine[j]) {
						compteur++;
					}
					if (compteur >= 2) {
						trouve = true;

						tabCompteur = compteur;
					}
				}
			}

			//On communique les résultats
			if (trouve === true) {
				console.log(
					"\nNous avons trouvé " +
						tabCompteur +
						" fois la même question"
				);
				console.log("\nLe fichier n'est donc pas valide");
			} else {
				console.log(
					"\nLe fichier est valide, chaque question n'est présente qu'une seule fois"
				);
			}
		});
	})

	// Pour faire passer un test à un étudiant
	// Il faut trier les questions et les réponses
	.command("test", "Fonction qui fait passer le test à un étudiant")
	.argument("<fileExam>", "Le fichier de type examen")
	.action(({ args, logger }) => {
		let pathExam = args.fileExam.toString();
		let dataReadExam;
		let nbErreurs = 0;
		let analyzerExam = new VpfParser();
		let analyzerResultat = new VpfParser();

		fs.readFile(pathExam, "utf8", function (err, dataExam) {
			if (err) {
				return logger.warn(err);
			}

			dataReadExam = dataExam;
			console.log("dataExam = " + dataExam);
			console.log("dataReadExam = " + dataReadExam);

			analyzerExam.parse(dataExam, pathExam);
			console.log("On a parsé");

			console.log(
				"----- Vous allez passer un examen composé de " +
					analyzerExam.question.length +
					" exercices -----"
			);
			let pathReponses = prompt(
				"Quel nom voulez vous donner au fichier contenant vos réponses au test ? "
			);
			pathReponses = "./" + pathReponses + ".gift"; //On génère un fichier en .gift mais ici ça n'a pas d'importance, un fichier .txt aurait marché

			console.log();

			for (let i = 0; i < analyzerExam.question.length; i++) {
				console.log("\n-- Exercice " + i + " --");
				console.log(analyzerExam.question[i]);
				let reponse = prompt(
					'Veuillez rentrer votre réponse, si vous ne voulez rien mettre tapez un "-" '
				);
				fs.appendFile(pathReponses, reponse + "\n", function (err) {
					if (err) return console.log(err);
				});
			}

			console.log("pathReponses = " + pathReponses);

			console.log("----- Vérification du test -----");
			fs.readFile(pathReponses, "utf8", function (err, dataReponses) {
				console.log(dataReponses);
				dataReponses = dataReponses.toString().split("\n");

				console.log("Vos réponses sont : " + dataReponses);
				analyzerResultat.test(
					analyzerExam.question,
					pathExam,
					dataReponses
				);

				for (let i = 0; i < analyzerExam.question.length; i++) {
					console.log("\n-- Résultat exercice " + i + " --");
					console.log(
						"filTest[" +
							i +
							"][1].length = " +
							analyzerResultat.filTest[i][1].length
					);
					//Trouver autre chose à tester pour la taille. Parce que si c'est un tableau ça nous donne le nombre de case mais si c'est juste une chaine de caractère ça nous donne la taille du String
					if (analyzerResultat.filTest[i][1].length === 1) {
						//Une seule réponse pour la question
						console.log(
							"Réponse à comparer : " +
								analyzerResultat.filTest[i][1][0]
						);
						console.log(
							"Réponse entrée : " + analyzerResultat.filTest[i][2]
						);
						if (
							analyzerResultat.filTest[i][1][0].localeCompare(
								analyzerResultat.filTest[i][2]
							) === 0
						) {
							console.log("Vous avez la bonne réponse !");
						} else {
							console.log(
								"Vous n'avez pas la bonne réponse, la bonne réponse était " +
									analyzerResultat.filTest[i][1]
							);
							nbErreurs++;
						}
					} else {
						//Plusieurs réponses pour la question
						let bon = false;
						for (
							let j = 0;
							j < analyzerResultat.filTest[i][1].length;
							j++
						) {
							if (
								analyzerResultat.filTest[i][1][j].localeCompare(
									analyzerResultat.filTest[i][2]
								) === 0
							) {
								console.log("Vous avez la bonne réponse !");
								bon = true;
							}
						}
						if (bon === false) {
							console.log(
								"Vous n'avez pas la bonne réponse, les bonnes réponses étaient " +
									analyzerResultat.filTest[i][1]
							);
							nbErreurs++;
						}
					}
				}
				console.log(
					"Au final, sur " +
						analyzerExam.question.length +
						" exercices, vous avez fait " +
						nbErreurs +
						" erreurs"
				);

				//On affiche l'énoncé et les questions en rapport avec l'énoncé
				//On affiche ensuite les réponses possibles
				//Puis on affiche un bilan de réponses
			});
		});
	})

	//Tests Réponses() du parser
	.command("reponse", "afficher la réponses")
	.argument("<file>", "Path du fichier")
	.action(({ logger, args }) => {
		let path = args.file.toString();
		//C'est juste en test mais sinon faudrait mettre args.file dans le fs.Read
		fs.readFile(path, "utf8", function (err, data) {
			if (err) {
				return logger.warn(err);
			}

			console.log("on est dans la command reponse");
			//On appelle le parser pour qu'il tri le fichier
			let analyzer = new VpfParser();

			//On appelle la fonction teste qui trie les réponses de chaque question
			analyzer.Reponses(data, 1);

			//On affiche l'énoncé et les questions en rapport avec l'énoncé
			//On affiche ensuite les réponses possibles
			//Puis on affiche un bilan de réponses
		});
	})

	//Exemple
	.command("coucou", "Yeahozjhh")
	.argument("<name>", "Name to greet")
	.action(({ logger, args }) => {
		logger.info("coucou tiri, %s!", args.name);
	});

type: module;
program.run();

// Sert à séparer le fichier par question
//N'est plus d'actualité c'était pour le premier fichier!!!!!!!!!!!c'est juste là à tritre d'exemple
/*.command('check', 'Check if <file> is a valid Vpf file, sépare les questions')
.argument('<file>', 'The file to check with Vpf parser')
.action(({args, logger}) => {

    fs.readFile(args.file, 'utf8', function (err,data) {
        if (err) {
            return logger.warn(err);
        }

        let analyzer = new VpfParser();
        analyzer.parse(data);
  //Maintenant le tableau de questions est dans l'objet VpfParser.parsedPOI
  //Mainteant--> essayer de mettre le numéro de la question dans objet.num

  //on créée un objet objet
  let triQ=new question();

  //On appelle une fonction dans le fichier parser.js avec en paramètre le parser.parsedPOI
  let string=analyzer.parsedPOI[0];
  triQ.tri(string);

    });
})*/
