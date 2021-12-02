var VpfParser = function(){
	// The list of POI parsed from the input file.
	this.question = [];
    this.enonce=[];
}

//On spépare les questions et énoncés du fichier
VpfParser.prototype.separer = function(data,path){

    console.log("On est dans separer");
    console.log(path);
    //On détecte l'énoncé lorsqu'il n'y a pas d'accolade!!
	//Il faut trier le fichier écrit
    var seoarator;
    if(path[14]=="U"){
        separator = ('::U');
    }
    else{//Le fichier commence par EM
        separator=('::EM')
    }

	data = data.split(separator);
	data = data.filter((val,idx) => !val.match(separator)); 

    //Créer le tableau de questions (ça comprends toute la question avec titre et tt)+ tab énoncés
    let tabQuestions=[];
    let tabEnonce=[];

    //On ajoute à ce tableau les questions
    for(let i=0;i<data.length;i++){
        if(data[i].includes("{")){//C'est une question

            data[i]="U::"+data[i];
            tabQuestions.push(data[i]);
            console.log("C'est une question:"+data[i]);      
        }
        else if(data[i].includes("::")){//C'est un énoncé, on enlève les "titres" des fichiers

            data[i]="U::"+data[i];
            tabEnonce.push(data[i]);
            console.log("C'est un énoncé:"+data[i]);  
        }
        
    }
    console.log("########################################");
    console.log("Voici le tableau de questions:"+tabQuestions);
    console.log("########################################");
    console.log("Voici le tableau d'énoncé':"+tabEnonce);
    var retour=[];
    retour[0]=tabEnonce;
    retour[1]=tabQuestions;
    return retour;
}

// parse : analyze data by calling the first non terminal rule of the grammar
VpfParser.prototype.parse = function(data,path){

    console.log("on est dans parse");
	var retour = this.separer(data,path);
	this.enonce=retour[0];
    this.question=retour[1];
    console.log("###################");
    console.log("Voici le tableau de question dans l'objet"+this.question);
    console.log("Voici le tableau d'énoncé' dans l'objet"+this.enonce);
    console.log("Voici la question numéro 2"+this.question[1]);
}




module.exports = VpfParser;

