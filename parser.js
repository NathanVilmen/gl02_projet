var VpfParser = function(){
	// The list of POI parsed from the input file.
	this.parsedPOI = [];

}

// tokenize : tranform the data input into a list
//Faire un bjet question avec type de question,question, titre, forme de la question en fonction du type de celle-ci
// <eol> = CRLF
VpfParser.prototype.separer = function(data){
	var separator = ('// Part');
	data = data.split(separator);
	data = data.filter((val,idx) => !val.match(separator)); 
    //On supprime le premier élément vide
    data.shift();
    //Créer le tableau de questions (ça comprends toute la question avec titre et tt)
    let tabQuestions=[];

    //On ajoute à ce tableau les questions
    for(let i=0;i<data.length;i++){
        tabQuestions.push(data[i]);
    }
    //On renvoie ce tableau --> ainsi le parsedPOI contiendra les questions séparées
    return tabQuestions;
}

// parse : analyze data by calling the first non terminal rule of the grammar
VpfParser.prototype.parse = function(data){
	var tQuestions = this.separer(data);
	//console.log(tQuestions);
	parsedPOI=(this.tQuestions);
}




module.exports = VpfParser;

