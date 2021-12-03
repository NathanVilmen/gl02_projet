var VpfParser = function(){
	// The list of POI parsed from the input file.
	this.question = new Array();
    this.enonce=new Array();

    this.filTest=new Array();
    this.questionAffichage=[];
    this.enonceAffichage=[];
    this.reponseAffichage=[];
}

//On spépare les questions et énoncés du fichier
VpfParser.prototype.separer = function(data,path,valeur){

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
    let tabQuestions=new Array();
    let tabEnonce=new Array();

    //On ajoute à ce tableau les questions
    //On mets dans la première dimension et à chaque fois qu'il y a un énocé on change de dimension
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
    console.log("Voici le tableau d'énoncés':"+tabEnonce);

    var retour=new Array();
    retour[0]=tabEnonce;
    retour[1]=tabQuestions;
    return retour;
}

// parse : analyze data by calling the first non terminal rule of the grammar
VpfParser.prototype.parse = function(data,path){

    console.log("on est dans parse");
	retour = this.separer(data,path);

	this.enonce=retour[0];
    this.question=retour[1];
    console.log("###################");
    console.log("Voici le tableau de question dans l'objet"+this.question);
    console.log("Voici le tableau d'énoncé' dans l'objet"+this.enonce);
    console.log("Voici la question numéro 2"+this.question[1]);  
}

VpfParser.prototype.test = function(data,path){

    //On refait un parseur avec un élément de l'objet pasrer qui contient ce qu'on doit afficher dans l'ordre
    //Par exemple: retour[0]--> ça affiche enoncé ou question
    //On peux faire un tableau à deux dimensions: 
    //1er index c'est le numéro de la question et pour chaque index il y a l'enoncé ou questions et les réponses et la propositions et un numéro qui indique le type de question
    //Parce que suivant le type de questions on affiche ou non des propositions
    //Du coup faire une double boucle qui affiche en fonction des paramètres
    //Pas besoin de définir le type pour cette fonction mais en vrai faut le faire pour les dernières specs donc go
    //Cas d'un simple énoncé: on mets tous les autres cases à zéro
    console.log("on est dans test");
    var retour=new Array();
	retour = this.triAffichage(data,path);
    console.log("###################");
}

VpfParser.prototype.triAffichage = function(data,path){

    console.log("on est dans triAffichage");
    
    var separator;
    //On cherche le nombre de questions du fichier
    if(data.includes("U::")){
        separator = ('::U');
    }
    else{
        separator = ('::E');
    }

    //On sépare tous les blocs
    data=data.split(separator);
    for(let i=0;i<data.length;i++){
        if(data[i].includes("{")){//C'est une question
            //On initialise le tableau à 2 dimensions à la bonne dimmensions
            //Il sera de taille 4:
            //0:Enoncé ou question
            //1:Affichage de réponses si il y a
            //2:Réponses correctes
            //3:Type de la question
            this.filTest[i]=new Array(4);
        } 
    }

    for(let i=0;i<this.filTest.length;i++){
        this.filTest[i][0]=this.EnonceQuestion(data,i);
        this.filTest[i][1]=this.Reponses(data,i);
        this.filTest[i][2]=this.ReponsesCorectes(data,i);
        this.filTest[i][3]=this.TypeQuestion(data,i);
    }

    console.log("Le fichier est trié");	
}

VpfParser.prototype.EnonceQuestion = function(data,numero){
    console.log("on est dans EnonceQuestion");
    
    //Test si c'est un énoncé
    if(!data[numero].includes("{")){
        //on parse cet énoncé 
        var EnonceParsed;
        EnonceParsed=data[numero];
        //On enlève les éléments parasites
        EnonceParsed=EnonceParsed.replace(/[:]/g,'');
            if(EnonceParsed.includes("[html]")){
                //Si c'est un énoncé de type html
                var re = /(<i>)|(<\/i>)|(<p>)|(<\/p>)|(<u>)|(<\/u>)|(<b>)|(<\/b>)|(\[html\])|(<br>)|(::)/gi;
                EnonceParsed=EnonceParsed.replace(re,'');
        }
        else{
            var re = /(<i>)|(<\/i>)|(<p>)|(<\/p>)|(<u>)|(<\/u>)|(<b>)|(<\/b>)|(\[html\])|(<br>)|(::)/gi;
                EnonceParsed=EnonceParsed.replace(re,'');
        }
       
    }
    else{
        //On parse la question
        data[0][0];
    }
    
}


module.exports = VpfParser;

