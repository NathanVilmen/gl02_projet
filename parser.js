const { logger } = require("logger/index");

var VpfParser=function(){
	// The list of POI parsed from the input file.
	this.question = new Array();
    this.enonce=new Array();
    this.filTest=new Array();
}

//On spépare les questions et énoncés du fichier
VpfParser.prototype.separer = function(data){

    console.log("On est dans separer");
    console.log(path);
    //On détecte l'énoncé lorsqu'il n'y a pas d'accolade!!
	//Il faut trier le fichier écrit
    var seoarator;
    if(data.includes('::U')){
        separator = ('::U');
    }
    else if(data.includes('::EM')){//Le fichier commence par EM
        separator=('::EM')
    }
    else{
        logger.info("Erreur, le fichier n'est pas en format GIFT");
    }

	string = string.replace(/::U/gi, ","+separator);
	string = string.split(",");

    //On supprime le premier élément car ce n'est ni un énoncé s'il contient le mot Unit (c'est ni un énoncé ni une uestion)
    if(data[0].includes(separator)){
        data.shift();
    }
    else if(data[0].includes(separator)){
        data.shift();
    }

    //Créer le tableau de questions (ça comprends toute la question avec titre et tt)+ tab énoncés
    let tabQuestions=new Array();
    let tabEnonce=new Array();
    
    //Faut associer toutes les questions à chaque énoncé s'il y en un
    var marqueur=0;

    //On compte le nombre d'énoncé pour déterminer la taille de la première dimenision des tableaux
    for(let i=0;i<data.length;i++){
        if(!data[i].includes("{")){//C'est un énoncé
            tabQuestions[i]=new Array();
            tabEnonce[i]=new Array();
    }

    //On ajoute à ce tableau les questions
    //On mets dans la première dimension et à chaque fois qu'il y a un énocé on change de dimension
    for(let i=0;i<data.length;i++){
        if(data[i].includes("{")){//C'est une question

            data[i]="U::"+data[i];
            tabQuestions[i][marqueur].push(data[i]);
            console.log("C'est une question:"+data[i]);      
        }
        else if(data[i].includes("::")){//C'est un énoncé, on enlève les "titres" des fichiers

            //dès qu'il ya un énoncé, on incrémente marqueur pour changer de dimensions
            marqueur++;
            data[i]="U::"+data[i];
            tabEnonce[i].push(data[i]);
            console.log("C'est un énoncé:"+data[i]);  
        }
        
    }
    console.log("########################################");
    console.log("Voici le tableau de questions:"+tabQuestions);
    console.log("########################################");
    console.log("Voici le tableau d'énoncés':"+tabEnonce);

    this.enonce=tabQuestions;
    this.question=tabEnonce;

    console.log("########################################");
    console.log("Voici le tableau de questions dans l'objet:"+this.question);
    console.log("########################################");
    console.log("Voici le tableau d'énoncés dans l'objet:"+this.enonce);
}

// parse : analyze data by calling the first non terminal rule of the grammar
VpfParser.prototype.parse = function(data){

    console.log("on est dans parse");
	this.separer(data,path);

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
        separator = ('U::');
    }
    else{
        separator = ('E::');
    }

    //On sépare tous les blocs
    data=data.split(separator);
    for(let i=0;i<data.length;i++){
        //On initialise le tableau à 2 dimensions à la bonne dimmensions
        //Il sera de taille 4:
        //0:Enoncé ou question
        //1:Affichage de réponses si il y a
        //2:Réponses correctes
        //3:Type de la question
        this.filTest[i]=new Array(4);
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
    

    //on parse cet énoncé 
    var EnonceParsed;
    EnonceParsed=data[numero];
   //On enlève les éléments parasites
    var re = /(<i>)|(<\/i>)|(<p>)|(<\/p>)|(<u>)|(<\/u>)|(<b>)|(<\/b>)|(\[html\])|(<br>)|(::)|(\[marked\])|(<\/small>)|(<small>)/gi;

    //Si c'est un énoncé
    if(!EnonceParsed.includes("{")){
        EnonceParsed=EnonceParsed.replace(re,'');
    }
    else{//Si c'est une question --> on retire les réponses et on ajoute __ à la place
        EnonceParsed=EnonceParsed.replace(re,'');
        //Ca enlèvetoutes les réponses
        EnonceParsed=EnonceParsed.replace(/{[\s\S]*}/,"_");
    }
    
    return EnonceParsed;
}

VpfParser.prototype.TypeQuestion = function(data,numero){

    console.log("On est dans tri Type Question");
    //Il y a choix multiples (1), vrai-faux (2),correspondance (3), mot manquant (4), numérique (5),question ouverte (6)
    //Repères dans les {}
    //Correspondance--> "->"
    //VraiFaux-->'F'| 'TRUE'|'T'|'FALSE'
    //Question ouvertes-->''
    //Numériques--> 'digit..digit'|'digit:digit'|'=digit'
    //Mot manquant--> une seule proposition de réponse {}=xxxx}
    //Multiple choice--> les autres 

    var EnonceParsed;
    EnonceParsed=data[numero];

    //On cherche ou se situe la première réponses
    var separator=('{');
    EnonceParsed=EnonceParsed.split(separator);
    EnonceParsed=EnonceParsed[1];
    EnonceParsed=EnonceParsed.toString();
    EnonceParsed=EnonceParsed.split('}');
    EnonceParsed=EnonceParsed[0];
    EnonceParsed=EnonceParsed.toString();
    console.log("Contenu de la première réponse:"+EnonceParsed);
    console.log("Type de EnonceParsed "+typeof EnonceParsed);

    //La variable qu'on renvoit
    let correspondance;

    //On a le contenu de la réponses
    //Si il contient une flèche c'est un type "correspondance"--> on renvoie 3
    if(EnonceParsed.includes("->")){
        correspondance=3;
        console.log("C'est une correspondance");
    }
    //Il reste que question libre -->on renvoie 6
    else if(EnonceParsed.length===0){
        correspondance=6;
        console.log("C'est une question ouverte");
    }
    //S'il contient true ou false c'est un type vrai/faux --> on renvoie 2
    //| 'TRUE'|'T'|'FALSE'
    else if((EnonceParsed.includes('F') || EnonceParsed.includes('T') || EnonceParsed.includes('TRUE')) || (EnonceParsed.includes('FALSE')) && (!EnonceParsed.includes('='))){
        correspondance=2;
        console.log("C'est un vrai/faux");
    }
    //S'il contient qu'un "=" et pas de "~" il y a un choix donc c'est un mot manquant--> on renvoie 4
    //EnonceParsed.match(/~/g).length!== 0 && 
    else if(EnonceParsed.match(/~/g)!== null && !EnonceParsed.match(/~/g).length<1){
        correspondance=4;
        console.log("C'est un mot manquant");
    }
    //Il reste que MC--> on renvoie 1
    //S'il contient plusieurs "~"  il y a plusieurs choix donc c'est un MC--> on renvoie 1
    else if(EnonceParsed.match(/~/g)!== null && EnonceParsed.match(/~/g).length>1){
        correspondance=1;
        console.log("C'est un MC");
    }
    //Il reste que question libre -->on renvoie 6
    //S'il contient 'digit..digit'|'digit:digit'|'=digit' c'est un type numérique --> on renvoie 5
    //else if(EnonceParsed.includes('[0-9]..[0-9]'|'[0-9]:[0-9]'|'=[0-9]')){
    else{
        correspondance=5;
        console.log("C'est un numérique");
    }
    console.log(correspondance);
    return correspondance;
}
module.exports = VpfParser;

}
