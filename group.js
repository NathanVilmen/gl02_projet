const fs = require("fs");

var group = function () {
	this.tabQuestion = [];
};

//On groupe des questions
group.prototype.group = function (data) {
	fs.readFile(data.file, "utf8", function (err, data) {
		if (err) {
			return logger.warn(err);
		}

		//Il faut trier le fichier écrit
		const readline = require("readline").createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		readline.question(
			"Quel est le numero de la question choisie?",
			(numero) => {
				console.log(`Vous avez choisi la question: ${numero}!`);
				readline.close();
			}
		);

		this.triQuestion(data, numero);

		//On stock dans tabQuestions
		this.tabQuestion.push(finale);
		console.log("La question a bien été ajoutée");
		console.log(this.tabQuestion);
	});
};

//ici il faut un parser qui tri toutes les questions de tous les fichiers
group.prototype.triQuestion = function (data, numero) {
	//on définit le séparateur
	//Si le fichier commence par U1,U2, etc....
	var separator;
	if (data[0] == "U") {
		separator = "::U";
	} else {
		//Le fichier commence par EM
		separator = "::EM";
	}

	//On sépare la question     .split(/,| /)
	//--> le deuxième membre est le titre
	data = data.split(separator3);
	//On filtre: on retire tout ce qui est le séparateur
	data = data.filter((val, idx) => !val.match(separator3));

	//On return le numero de la question (c'est le bon chiffre car le premier truc d =u tableau n'est pas une question)
	var finale = data[numero];
	return finale;
};

module.exports = group;
type: module;
