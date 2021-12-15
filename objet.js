let question = function () {
	this.num = 0;
	this.type = [];
	this.titre = [];
	this.question = [];
	this.reponse = [];
	this.instruction = [];
	this.localisation = [];
};

//Fonction qui mets le numéro de la question dans l'objet objet.num
//le paramère data est le parsedPOI
question.prototype.triNum = function (data) {
	//on définit le séparateur
	let separator2 = ": ";
	//On sépare la question en deux si ça marche
	//--> le premier membre est le numéro et deuxième est le reste
	data = data.split(separator2);
	//On filtre: n retire tout ce qui est le séparateur
	data = data.filter((val, idx) => !val.match(separator2));
	return data[0];
};

question.prototype.triTitre1 = function (data) {
	//on définit le séparateur
	let separator3 = "<b>";
	//On sépare la question     .split(/,| /)
	//--> le deuxième membre est le titre
	data = data.split(separator3);
	//On filtre: on retire tout ce qui est le séparateur
	data = data.filter((val, idx) => !val.match(separator3));

	//On return le titre
	return data[1];
};

question.prototype.triTitre2 = function (data) {
	//on définit le séparateur
	let separator3 = "</b>";
	//On sépare la question     .split(/,| /)
	//--> le deuxième membre est le titre
	data = data.split(separator3);
	//On filtre: on retire tout ce qui est le séparateur
	data = data.filter((val, idx) => !val.match(separator3));

	//On return le titre
	return data[0];
};

question.prototype.triLocalisation = function (data) {
	//on définit le séparateur
	let separator3 = "::";
	//On sépare la question     .split(/,| /)
	//--> le deuxième membre est le titre
	data = data.split(separator3);
	//On filtre: on retire tout ce qui est le séparateur
	data = data.filter((val, idx) => !val.match(separator3));

	//On return le titre
	return data[1];
};

question.prototype.triType1 = function (data) {
	//on définit le séparateur
	let separator3 = ": ";
	//On sépare la question     .split(/,| /)
	//--> le deuxième membre est le titre
	data = data.split(separator3);
	//On filtre: on retire tout ce qui est le séparateur
	data = data.filter((val, idx) => !val.match(separator3));

	//On return le titre
	return data[1];
};

question.prototype.triType2 = function (data) {
	//on définit le séparateur
	let separator3 = "::";
	//On sépare la question     .split(/,| /)
	//--> le deuxième membre est le titre
	data = data.split(separator3);
	//On filtre: on retire tout ce qui est le séparateur
	data = data.filter((val, idx) => !val.match(separator3));

	//On return le titre
	return data[0];
};

question.prototype.triInstruction1 = function (data) {
	//on définit le séparateur
	let separator3 = "::";
	//On sépare la question     .split(/,| /)
	//--> le deuxième membre est le titre
	data = data.split(separator3);
	//On filtre: on retire tout ce qui est le séparateur
	data = data.filter((val, idx) => !val.match(separator3));

	//On return le titre
	return data[2];
};

question.prototype.triInstruction2 = function (data) {
	//on définit le séparateur
	let separator3 = "<";
	//On sépare la question     .split(/,| /)
	//--> le deuxième membre est le titre
	data = data.split(separator3);
	//On filtre: on retire tout ce qui est le séparateur
	data = data.filter((val, idx) => !val.match(separator3));

	//On return le titre
	return data[0];
};

question.prototype.tri = function (data) {
	//Avoir le numéro
	let numero = this.triNum(data);
	this.num = numero;
	console.log(this.num);

	//Avoir le titre
	let titre = this.triTitre1(data);

	let titreFinale = this.triTitre2(titre);
	this.titre = titre;

	//Avoir la localisation
	let localisation = this.triLocalisation(data);
	this.localisation = localisation;

	//Avoir l'instruction
	let instruction = this.triInstruction1(data);

	let instructionFinale = this.triInstruction2(instruction);
	this.instruction = instructionFinale;

	//Avoir le type
	let type = this.triType1(data);

	let typeFinale = this.triType2(type);
	this.type = instructionFinale;

	if (this.type == "Multiple Choice") {
		let phrase1 = this.triQuestionMC1(data);
		let phrase1Intermediaire = this.triQuestionMC2(phrase1);
		phrase1Intermediaire = phrase1Intermediaire + "<insert answer>";
		let phrase1PreFinale = this.triQuestionMC3(phrase1Intermediaire);
		let phrase1Finale = this.triQuestionMC4(phrase1PreFinale);

		console.log(
			"People are attracted to attempting extreme activities for a <insert answer> of reasons" +
				phrase1Finale
		);
		this.question[0] = phrase1Finale;
	} else if (this.type == "Open Cloze") {
	} else if (this.type == "Word formation") {
	} else {
		//Key word transformation
	}
};

module.exports = question;
