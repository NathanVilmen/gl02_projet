const fs = require("fs");
let VpfParser = function () {
	// The list of POI parsed from the input file.
	this.question = new Array();
	this.enonce = new Array();

	this.filTest = new Array();
	this.questionAffichage = [];
	this.enonceAffichage = [];
	this.reponseAffichage = [];
};

//On spépare les questions et énoncés du fichier
VpfParser.prototype.separer = function (data, path, valeur) {
	//On détecte l'énoncé lorsqu'il n'y a pas d'accolade!!
	//Il faut trier le fichier écrit
	let separator;
	if (path[14] == "U") {
		separator = "::U";
	} else {
		//Le fichier commence par EM
		separator = "::EM";
	}

	data = data.split(separator);
	data = data.filter((val, idx) => !val.match(separator));

	//Créer le tableau de questions (ça comprends toute la question avec titre et tt)+ tab énoncés
	let tabQuestions = new Array();
	let tabEnonce = new Array();

	//On ajoute à ce tableau les questions
	//On mets dans la première dimension et à chaque fois qu'il y a un énocé on change de dimension
	for (let i = 0; i < data.length; i++) {
		if (data[i].includes("{")) {
			//C'est une question

			data[i] = "U::" + data[i];
			tabQuestions.push(data[i]);
		} else if (data[i].includes("::")) {
			//C'est un énoncé, on enlève les "titres" des fichiers
			data[i] = "U::" + data[i];
			tabEnonce.push(data[i]);
		}
	}

	let retour = new Array();
	retour[0] = tabEnonce;
	retour[1] = tabQuestions;
	return retour;
};

// parse : analyze data by calling the first non terminal rule of the grammar
VpfParser.prototype.parse = function (data, path) {
	retour = this.separer(data, path);

	this.enonce = retour[0];
	this.question = retour[1];
};

VpfParser.prototype.test = function (question, pathExam, dataReponses) {
	//On refait un parseur avec un élément de l'objet pasrer qui contient ce qu'on doit afficher dans l'ordre
	//Par exemple: retour[0]--> ça affiche enoncé ou question
	//On peux faire un tableau à deux dimensions:
	//1er index c'est le numéro de la question et pour chaque index il y a l'enoncé ou questions et les réponses et la propositions et un numéro qui indique le type de question
	//Parce que suivant le type de questions on affiche ou non des propositions
	//Du coup faire une double boucle qui affiche en fonction des paramètres
	//Pas besoin de définir le type pour cette fonction mais en vrai faut le faire pour les dernières specs donc go
	//Cas d'un simple énoncé: on mets tous les autres cases à zéro
	let retour = new Array();
	retour = this.triAffichage(question, pathExam, dataReponses);
};

VpfParser.prototype.triAffichage = function (question, pathExam, dataReponses) {
	/*let separator;
    //On cherche le nombre de questions du fichier
    if(dataExam.includes("::U")){
        separator = ('::U');
    }
    else{
        separator = ('::E');
    }*/

	//On sépare tous les blocs
	//dataExam=dataExam.toString().split(separator);

	/*for(let i=0;i<dataExam.length;i++){
        console.log("dataExam[" + i + "] = " + dataExam[i]);
        if(dataExam[i].includes("{")){//C'est une question
            console.log("on passe dans le if");
            //On initialise le tableau à 2 dimensions à la bonne dimmension
            //Il sera de taille 4:
            //0:Enoncé ou question
            //1:Affichage de réponses si il y a
            //2:Réponses de l'utilisateur
            //3:Réponses correctes
            //4:Type de la question
            this.filTest[i]=new Array(5);
        }
    }*/

	this.filTest[0] = new Array(5); //Pour mon test
	//this.filTest[1]= new Array(5);  //Pour mon test

	//On sépare les réponses de l'utilisateur
	//dataReponses = dataReponses.toString().split('\n');

	/*//On supprime les cases du tableau dans lequel il y a ''
    for (let i = 0; i < dataReponses.length; i++) {
        if(dataReponses[i]===''){
            console.log("On splice");
            dataReponses.splice(i, 1);
        }
    }
    console.log("data après le splice : " + dataReponses);*/

	for (let i = 0; i < this.filTest.length; i++) {
		//this.filTest[i][0]=this.EnonceQuestion(dataExam,i);
		this.filTest[i][1] = this.Reponses(question, i);
		this.filTest[i][2] = dataReponses[i];
		//this.filTest[i][3]=this.reponsesCorrectes(question, i);
		//this.filTest[i][4]=this.ReponsesUtilisateur(dataReponses,i);  Inutile en fait
		//this.filTest[i][5]=this.TypeQuestion(data,i);
	}

	return this.filTest;
};

VpfParser.prototype.EnonceQuestion = function (data, numero) {
	console.log("on est dans EnonceQuestion");

	//on parse cet énoncé
	let EnonceParsed;
	EnonceParsed = data[numero];
	//On enlève les éléments parasites
	let re =
		/(<i>)|(<\/i>)|(<p>)|(<\/p>)|(<u>)|(<\/u>)|(<b>)|(<\/b>)|(\[html\])|(<br>)|(::)|(\[marked\])|(<\/small>)|(<small>)/gi;

	//Si c'est un énoncé
	if (EnonceParsed.includes("{")) {
		EnonceParsed = EnonceParsed.replace(re, "");
	} else {
		//Si c'est une question --> on retire les réponses et on ajoute __ à la place
		EnonceParsed = EnonceParsed.replace(re, "");
		//Ca enlèvetoutes les réponses
		EnonceParsed = EnonceParsed.replace(/{[\s\S]*}/, "_");
	}

	if (EnonceParsed === null) {
		return null;
	} else {
		return EnonceParsed;
	}
};

VpfParser.prototype.Reponses = function (question, numero) {
	console.log("On est dans Reponses()");
	let nbReponses = 0;
	let reponse;
	//numero = 1;
	/*let separator;
    if(data.includes("::U")){
        separator = ('::U');
    }
    else{
        separator = ('::E');
    }

    data=data.split(separator);
    console.log("data split : " + data);*/

	console.log("question = " + question);
	//data[numero]=data[numero].toString();
	console.log("question[" + numero + "] = " + question[numero]);

	/*//On supprime les cases du tableau dans lequel il y a ''
    for (let i = 0; i < data.length; i++) {
        if(data[i]===''){
            console.log("On splice");
            data.splice(i, 1);
        }
    }
    console.log("data après le splice : " + data);*/

	//La réponse se situe après le =
	//S'il la réponse est de ne rien mettre, exemple pour a/the/an/-, il faut que l'utilisateur rentre -
	//On récupère tout ce qu'il y a à partir du = jusqu'à ~ ou }

	//Premièrement on veut savoir combien de réponses il y a dans le fichier
	const symboleReponse = /=/g;
	nbReponses = question[numero].match(symboleReponse);
	console.log("Il y a " + nbReponses.length + " réponses");

	let indexReponses;
	let caractereLu;

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
			if (i === 0) indexReponses = question[numero].indexOf("=");
			else indexReponses = question[numero].indexOf("=", indexReponses);

			caractereLu = question[numero].charAt(indexReponses + 1);
			do {
				indexReponses++;
				caractereLu = question[numero].charAt(indexReponses);

				if (
					caractereLu.localeCompare("~") !== 0 &&
					caractereLu.localeCompare("}") !== 0 &&
					caractereLu.localeCompare("=") !== 0
				) {
					//reponse.append(caractereLu);
					reponse[i] = reponse[i] + caractereLu;
				}
			} while (
				caractereLu.localeCompare("~") !== 0 &&
				caractereLu.localeCompare("}") !== 0 &&
				caractereLu.localeCompare("=") !== 0
			);
		}
	}

	if (nbReponses.length === 1)
		console.log("La réponse de la question est : " + reponse);
	else console.log("Les réponses possibles à la question sont : " + reponse);
	return reponse;

	//Il faut traiter le numéro de la question
	//Askip ça marche pas pour un type de données
	//Il faut enregistrer les réponses dans filTest avec un return
};

/*VpfParser.prototype.ReponsesUtilisateur = function (dataReponse, numero) {
    console.log("On est dans ReponsesUtilisateur()");
    return dataReponse[numero];
}*/

module.exports = VpfParser;
