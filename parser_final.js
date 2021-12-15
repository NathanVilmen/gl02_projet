let VpfParser = function () {
	// The list of POI parsed from the input file.
	this.question = new Array();
	this.enonce = new Array();
	this.filTest = new Array();
};

//On spépare les questions et énoncés du fichier
VpfParser.prototype.separer = function (data) {
	//On détecte l'énoncé lorsqu'il n'y a pas d'accolade
	//Il faut trier le fichier écrit
	let separator;
	if (data.includes("::U")) {
		separator = "::U";
	} else if (data.includes("::EM")) {
		//Le fichier commence par EM
		separator = "::EM";
	} else {
		logger.info("Erreur, le fichier n'est pas en format GIFT");
	}

	data = data.split(separator);
	data = data.filter((val, idx) => !val.match(separator));

	//On supprime le premier élément car ce n'est ni un énoncé s'il contient le mot Unit (c'est ni un énoncé ni une uestion)
	if (!data[0].includes(separator)) {
		data.shift();
	}

	let tabQuestions = [];
	let tabEnonce = [];

	//Faut associer toutes les questions à chaque énoncé s'il y en un
	let marqueur = 0;

	let count = 0;
	tabQuestions[count] = [];
	tabEnonce[count] = [];

	//On compte le nombre d'énoncé pour déterminer la taille de la première dimenision des tableaux
	for (let i = 0; i < data.length; i++) {
		if (!data[i].includes("{")) {
			//C'est un énoncé

			count++;
			tabQuestions[count] = [];
			tabEnonce[count] = [];
		}
	}

	//On ajoute à ce tableau les questions
	//On mets dans la première dimension et à chaque fois qu'il y a un énoncé on change de dimension
	for (let i = 0; i < data.length; i++) {
		if (data[i].includes("{")) {
			//C'est une question

			if (count >= 1) {
				data[i] = "::U" + data[i];
				tabQuestions[marqueur].push(data[i]);
			} else {
				data[i] = "::U" + data[i];
				tabQuestions[i] = data[i];
			}
		} else {
			//C'est un énoncé, on enlève les "titres" des fichiers if (data[i].includes("::"))

			//dès qu'il ya un énoncé, on incrémente marqueur pour changer de dimensions
			data[i] = "::U" + data[i];
			marqueur++;
			tabEnonce[marqueur] = data[i];
		}
	}
	this.question = tabQuestions;
	this.enonce = tabEnonce;
};

// parse : analyze data by calling the first non terminal rule of the grammar
VpfParser.prototype.parse = function (data) {
	this.separer(data);
};

VpfParser.prototype.test = function (data) {
	this.triAffichage(data);
};

VpfParser.prototype.triAffichage = function (data) {
	let separator;
	if (data.includes("::U")) {
		separator = "::U";
	} else if (data.includes("::EM")) {
		//Le fichier commence par EM
		separator = "::EM";
	} else {
		logger.info("Erreur, le fichier n'est pas en format GIFT");
	}

	data = data.split(separator);
	data = data.filter((val, idx) => !val.match(separator));

	//On supprime le premier élément car ce n'est ni un énoncé s'il contient le mot Unit (c'est ni un énoncé ni une uestion)
	if (!data[0].includes(separator)) {
		data.shift();
	} else if (!data[0].includes(separator)) {
		data.shift();
	}

	for (let i = 0; i < data.length; i++) {
		//On initialise le tableau à 2 dimensions à la bonne dimmension
		//Il sera de taille 4:
		//0:Enoncé ou question
		//1:Affichage de réponses si il y a
		//2:Réponses de l'utilisateur
		//3:Réponses correctes
		//4:Type de la question
		this.filTest[i] = new Array();
	}

	for (let i = 0; i < this.filTest.length; i++) {
		this.filTest[i][0] = this.EnonceQuestion(data, i);

		this.filTest[i][1] = this.Reponses(data, i);

		this.filTest[i][2] = this.TypeQuestion(data, i);
		this.filTest[i][3] = this.ReponsesPossibles(data, i);
	}
};

VpfParser.prototype.EnonceQuestion = function (data, numero) {
	let EnonceParsed;
	EnonceParsed = data[numero];

	//On enlève les éléments parasites
	let re =
		/(<i>)|(<\/i>)|(<p>)|(<\/p>)|(<u>)|(<\/u>)|(<b>)|(<\/b>)|(\[html\])|(<br>)|(::)|(\[marked\])|(<\/small>)|(<small>)|(<h4>)|(<\/h4>)|(<\/blockquote>)|(<blockquote>)|(\[markdown\])/gi;

	//Si c'est un énoncé
	if (!EnonceParsed.includes("{")) {
		EnonceParsed = EnonceParsed.replace(re, "");
	} else {
		//Si c'est une question --> on retire les réponses et on ajoute __ à la place
		EnonceParsed = EnonceParsed.replace(re, "");
		EnonceParsed = EnonceParsed.replace(/({)/gi, "ù*{");
		EnonceParsed = EnonceParsed.split("ù*");

		//Ca enlève toutes les réponses
		for (let i = 0; i < EnonceParsed.length; i++) {
			EnonceParsed[i] = EnonceParsed[i].replace(/{[\s\S]*}/, "_");
		}
	}

	return EnonceParsed;
};

VpfParser.prototype.Reponses = function (question, numero) {
	let nbReponses = 0;
	let reponse;

	//Premièrement on veut savoir combien de réponses il y a dans le fichier
	const symboleReponse = /=/g;
	if (question[numero].indexOf("{") !== -1) {
		//C'est une question
		nbReponses = question[numero].match(symboleReponse);
		if (nbReponses !== null) {
			let indexReponses;
			let caractereLu;

			if (question[numero].includes("->") === false) {
				//Ce n'est pas une matching question
				if (nbReponses.length === 1) {
					reponse = new Array(1);
					reponse[0] = "";
					//Premièrement on récupère l'index du premier { pour savoir où sont les réponses
					indexReponses = question[numero].indexOf("=");

					caractereLu = question[numero].charAt(indexReponses + 1);
					do {
						indexReponses++;

						caractereLu = question[numero].charAt(indexReponses);

						if (
							caractereLu.localeCompare("~") !== 0 &&
							caractereLu.localeCompare("}") !== 0
						) {
							//reponse.append(caractereLu);
							reponse[0] = reponse[0] + caractereLu;
							//On supprime les \n de la réponse
							reponse[0] = reponse[0].replace(/\n|\r|\t/g, "");
						}
					} while (
						caractereLu.localeCompare("~") !== 0 &&
						caractereLu.localeCompare("}") !== 0
					);
				} else {
					reponse = new Array(nbReponses.length);
					for (let i = 0; i < nbReponses.length; i++) {
						reponse[i] = "";
						//Premièrement on récupère l'index du premier { pour savoir où sont les réponses
						if (i === 0)
							indexReponses = question[numero].indexOf("=");
						else
							indexReponses = question[numero].indexOf(
								"=",
								indexReponses
							);

						caractereLu = question[numero].charAt(
							indexReponses + 1
						);
						do {
							indexReponses++;
							caractereLu =
								question[numero].charAt(indexReponses);

							if (
								caractereLu.localeCompare("~") !== 0 &&
								caractereLu.localeCompare("}") !== 0 &&
								caractereLu.localeCompare("=") !== 0
							) {
								//reponse.append(caractereLu);
								reponse[i] = reponse[i] + caractereLu;

								//On supprime les \n de la réponse
								reponse[i] = reponse[i].replace(
									/\n|\r|\t/g,
									""
								);
							}
						} while (
							caractereLu.localeCompare("~") !== 0 &&
							caractereLu.localeCompare("}") !== 0 &&
							caractereLu.localeCompare("=") !== 0
						);
					}
				}
				return reponse;
			} else {
				//C'est une matching question
				reponse = new Array(nbReponses.length * 2);
				let i = 0;
				for (i = 0; i < nbReponses.length; i++) {
					//On récupère tous les =
					reponse[i] = "";
					//Premièrement on récupère l'index du premier { pour savoir où sont les réponses
					if (i === 0) indexReponses = question[numero].indexOf("=");
					else
						indexReponses = question[numero].indexOf(
							"=",
							indexReponses
						);

					caractereLu = question[numero].charAt(indexReponses + 1);
					do {
						indexReponses++;
						caractereLu = question[numero].charAt(indexReponses);

						if (
							caractereLu.localeCompare("~") !== 0 &&
							caractereLu.localeCompare("}") !== 0 &&
							caractereLu.localeCompare("=") !== 0 &&
							caractereLu.localeCompare("->") !== 0
						) {
							//reponse.append(caractereLu);
							reponse[i] = reponse[i] + caractereLu;

							//On supprime les \n de la réponse
							reponse[i] = reponse[i].replace(/\n|\r|\t/g, "");
						}
					} while (
						caractereLu.localeCompare("~") !== 0 &&
						caractereLu.localeCompare("}") !== 0 &&
						caractereLu.localeCompare("=") !== 0 &&
						caractereLu.localeCompare("->") !== 0
					);
				}
				for (
					let j = nbReponses.length;
					j < nbReponses.length * 2;
					j++
				) {
					//On récupère tous les ->
					reponse[j] = "";
					//Premièrement on récupère l'index du premier { pour savoir où sont les réponses
					if (j === nbReponses.length)
						indexReponses = question[numero].indexOf("->");
					else
						indexReponses = question[numero].indexOf(
							"->",
							indexReponses
						);

					caractereLu = question[numero].charAt(indexReponses + 1);
					do {
						indexReponses++;
						caractereLu = question[numero].charAt(indexReponses);

						if (
							caractereLu.localeCompare("~") !== 0 &&
							caractereLu.localeCompare("}") !== 0 &&
							caractereLu.localeCompare("=") !== 0 &&
							caractereLu.localeCompare("->") !== 0
						) {
							reponse[j] = reponse[j] + caractereLu;

							//On supprime les \n de la réponse
							reponse[j] = reponse[j].replace(/\n|\r|\t/g, "");
						}
					} while (
						caractereLu.localeCompare("~") !== 0 &&
						caractereLu.localeCompare("}") !== 0 &&
						caractereLu.localeCompare("=") !== 0 &&
						caractereLu.localeCompare("->") !== 0
					);
				}
			}
			return reponse;
		}
	}
	return null;
};

VpfParser.prototype.ReponsesPossibles = function (question, numero) {
	//Sert pour un QCM

	let nbReponses = 0;
	let nbReponsesJustes = 0;
	const symboleReponsesProposees = /[=~]/g;
	let indexReponses;
	let caractereLu;
	let reponse;

	if (question[numero].indexOf("{") !== -1) {
		//C'est une question
		nbReponses = question[numero].match(symboleReponsesProposees).length;
		if (nbReponses !== null) {
			reponse = new Array(nbReponses.length);

			nbReponsesJustes = question[numero].match(/=/g).length;

			for (let i = 0; i < nbReponses - nbReponsesJustes; i++) {
				//On lit les mauvaises réponses : '~'
				reponse[i] = "";
				//Premièrement on récupère l'index du premier { pour savoir où sont les réponses possibles
				if (i === 0) {
					indexReponses = question[numero].indexOf("~");
				} else {
					indexReponses = question[numero].indexOf(
						"~",
						indexReponses
					);
				}
				caractereLu = question[numero].charAt(indexReponses + 1);
				do {
					indexReponses++;
					caractereLu = question[numero].charAt(indexReponses);
					if (
						caractereLu.localeCompare("~") !== 0 &&
						caractereLu.localeCompare("}") !== 0 &&
						caractereLu.localeCompare("=") !== 0
					) {
						reponse[i] = reponse[i] + caractereLu;

						//On supprime les \n de la réponse
						reponse[i] = reponse[i].replace(/\n|\r|\t/g, "");
					}
				} while (
					caractereLu.localeCompare("~") !== 0 &&
					caractereLu.localeCompare("}") !== 0 &&
					caractereLu.localeCompare("=") !== 0
				);
			}

			//On lit les bonnes réponses : '='
			for (let i = nbReponses - nbReponsesJustes; i < nbReponses; i++) {
				reponse[i] = "";
				//Premièrement on récupère l'index du premier { pour savoir où sont les réponses possibles
				if (i === nbReponses - nbReponsesJustes) {
					indexReponses = question[numero].indexOf("=");
				} else {
					indexReponses = question[numero].indexOf(
						"=",
						indexReponses
					);
				}
				caractereLu = question[numero].charAt(indexReponses + 1);
				do {
					indexReponses++;
					caractereLu = question[numero].charAt(indexReponses);

					if (
						caractereLu.localeCompare("~") !== 0 &&
						caractereLu.localeCompare("}") !== 0 &&
						caractereLu.localeCompare("=") !== 0
					) {
						reponse[i] = reponse[i] + caractereLu;

						//On supprime les \n de la réponse
						reponse[i] = reponse[i].replace(/\n|\r|\t/g, "");
					}
				} while (
					caractereLu.localeCompare("~") !== 0 &&
					caractereLu.localeCompare("}") !== 0 &&
					caractereLu.localeCompare("=") !== 0
				);
			}
		}

		return reponse;
	}
	return null;
};

VpfParser.prototype.TypeQuestion = function (data, numero) {
	//La variable qu'on renvoit
	let correspondance;
	//Si c'est une question on effectue le tri
	if (data[numero].includes("{")) {
		//Il y a choix multiples (1), vrai-faux (2),correspondance (3), mot manquant (4), numérique (5),question ouverte (6)
		//Repères dans les {}
		//Correspondance--> "->"
		//VraiFaux-->'F'| 'TRUE'|'T'|'FALSE'
		//Question ouvertes-->''
		//Numériques--> 'digit..digit'|'digit:digit'|'=digit'
		//Mot manquant--> une seule proposition de réponse {}=xxxx}
		//Multiple choice--> les autres

		let EnonceParsed;
		EnonceParsed = data[numero];

		//On cherche ou se situe la première réponses
		let separator = "{";
		EnonceParsed = EnonceParsed.split(separator);
		data = data.filter((val, idx) => !val.match(separator));
		EnonceParsed = EnonceParsed[1];
		EnonceParsed = EnonceParsed.toString();
		EnonceParsed = EnonceParsed.split("}");
		data = data.filter((val, idx) => !val.match(separator));
		EnonceParsed = EnonceParsed[0];

		//On a le contenu de la réponses
		//Si il contient une flèche c'est un type "correspondance"--> on renvoie 3
		if (EnonceParsed.includes("->")) {
			correspondance = 3;
		}
		//Question libre -->on renvoie 6
		else if (EnonceParsed.length === 0) {
			correspondance = 6;
		}
		//S'il contient plusieurs "~"  il y a plusieurs choix donc c'est un MC--> on renvoie 1
		else if (
			EnonceParsed.match(/~/g) !== null &&
			EnonceParsed.match(/~/g).length >= 1
		) {
			correspondance = 1;
		}
		//S'il contient qu'un "=" et pas de "~" il y a un choix donc c'est un mot manquant--> on renvoie 4
		else if (EnonceParsed.match(/~/g) == null) {
			correspondance = 4;
		}
		//S'il contient true ou false c'est un type vrai/faux --> on renvoie 2
		//| 'TRUE'|'T'|'FALSE'
		else if (
			EnonceParsed.includes("F") ||
			EnonceParsed.includes("T") ||
			EnonceParsed.includes("TRUE") ||
			(EnonceParsed.includes("FALSE") && !EnonceParsed.includes("="))
		) {
			correspondance = 2;
		}
		//S'il contient 'digit..digit'|'digit:digit'|'=digit' c'est un type numérique --> on renvoie 5
		//else if(EnonceParsed.includes('[0-9]..[0-9]'|'[0-9]:[0-9]'|'=[0-9]')){
		else {
			correspondance = 5;
		}
	} else {
		correspondance = 0;
	}

	return correspondance;
};
module.exports = VpfParser;
