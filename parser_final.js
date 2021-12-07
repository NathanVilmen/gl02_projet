//const { logger } = require("logger/index");

var VpfParser=function(){
    // The list of POI parsed from the input file.
    this.question = new Array();
    this.enonce=new Array();
    this.filTest=new Array();
}

//On spépare les questions et énoncés du fichier
VpfParser.prototype.separer = function(data) {

    console.log("On est dans separer");
    console.log("***********************");
    
    //On détecte l'énoncé lorsqu'il n'y a pas d'accolade!!
    //Il faut trier le fichier écrit
    var separator;
    if (data.includes('::U')) {
        separator = ('::U');
    } else if (data.includes('::EM')) {//Le fichier commence par EM
        separator = ('::EM')
    } else {
        logger.info("Erreur, le fichier n'est pas en format GIFT");
    }

    //data = data.replace(/::U/gi, ",::U");
    data = data.split(separator);
    data = data.filter((val,idx) => !val.match(separator));

    //On supprime le premier élément car ce n'est ni un énoncé s'il contient le mot Unit (c'est ni un énoncé ni une uestion)
    if (!data[0].includes(separator)) {
        data.shift();
    }
    
    let tabQuestions =[];
    let tabEnonce = [];

    //Faut associer toutes les questions à chaque énoncé s'il y en un
    var marqueur = 0;
    
    let count=0;
    tabQuestions[count] = [];
    tabEnonce[count] = [];
    
    //On compte le nombre d'énoncé pour déterminer la taille de la première dimenision des tableaux
    for (let i = 0; i < data.length; i++) {
        if (!data[i].includes("{")) {//C'est un énoncé

            count++;
            tabQuestions[count] = [];
            tabEnonce[count] = [];
        }
    }

    //On ajoute à ce tableau les questions
    //On mets dans la première dimension et à chaque fois qu'il y a un énoncé on change de dimension
    for (let i = 0; i < data.length; i++) {
        if (data[i].includes("{")) {//C'est une question

            if(count>=1){
                data[i]="::U"+data[i];
                tabQuestions[marqueur].push(data[i]);
                //console.log("C'est une question:" + data[i]);
            }
            else{
                console.log(tabQuestions);
                data[i]="::U"+data[i];
                tabQuestions[i]=data[i];
                //console.log("C'est une question:" + data[i]);
            }   
        } 
        else{//C'est un énoncé, on enlève les "titres" des fichiers if (data[i].includes("::"))

            //dès qu'il ya un énoncé, on incrémente marqueur pour changer de dimensions
            data[i]="::U"+data[i];
            marqueur++;
            tabEnonce[marqueur]=data[i];
            //console.log("C'est un énoncé:" + data[i]);
        }

    }
    this.question = tabQuestions;
    this.enonce = tabEnonce; 
}

// parse : analyze data by calling the first non terminal rule of the grammar
VpfParser.prototype.parse = function(data){

    console.log("on est dans parse");
    this.separer(data);
    //console.log("Voici le tableau de question dans l'objet"+this.question);
    //console.log("Voici le tableau d'énoncé' dans l'objet"+this.enonce);
}

VpfParser.prototype.test = function(data){

    //On refait un parseur avec un élément de l'objet pasrer qui contient ce qu'on doit afficher dans l'ordre
    //Par exemple: retour[0]--> ça affiche enoncé ou question
    //On peux faire un tableau à deux dimensions:
    //1er index c'est le numéro de la question et pour chaque index il y a l'enoncé ou questions et les réponses et la propositions et un numéro qui indique le type de question
    //Parce que suivant le type de questions on affiche ou non des propositions
    //Du coup faire une double boucle qui affiche en fonction des paramètres
    //Pas besoin de définir le type pour cette fonction mais en vrai faut le faire pour les dernières specs donc go
    //Cas d'un simple énoncé: on mets tous les autres cases à zéro
    console.log("on est dans test");
    console.log("###################");
    this.triAffichage(data);
    
}

VpfParser.prototype.triAffichage = function(data){

    console.log("on est dans triAffichage");

    var separator;
    if (data.includes('::U')) {
        separator = ('::U');
    } else if (data.includes('::EM')) {//Le fichier commence par EM
        separator = ('::EM')
    } else {
        logger.info("Erreur, le fichier n'est pas en format GIFT");
    }

    data = data.split(separator);
    data = data.filter((val,idx) => !val.match(separator));

    //On supprime le premier élément car ce n'est ni un énoncé s'il contient le mot Unit (c'est ni un énoncé ni une uestion)
    if (!data[0].includes(separator)) {
        data.shift();
    } else if (!data[0].includes(separator)) {
        data.shift();
    }

    for(let i=0;i<data.length;i++){
        
        //On initialise le tableau à 2 dimensions à la bonne dimmension
        //Il sera de taille 4:
        //0:Enoncé ou question
        //1:Affichage de réponses si il y a
        //2:Réponses de l'utilisateur
        //3:Réponses correctes
        //4:Type de la question
        this.filTest[i]=new Array();
    }
    console.log("taille: "+this.filTest.length);

    for(let i=0;i<this.filTest.length;i++){
        this.filTest[i][0]=this.EnonceQuestion(data,i);
        //console.log("Énoncé de la question : " + this.filTest[i][0]);
        this.filTest[i][1]=this.Reponses(data,i);
        //console.log("Réponse : " + i + " est : " + this.filTest[i][1][0]);
        this.filTest[i][2]=this.TypeQuestion(data,i);
    }

    console.log("Le fichier est trié");
}

VpfParser.prototype.EnonceQuestion = function(data,numero){

    console.log("on est dans EnonceQuestion");
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
        EnonceParsed=EnonceParsed.replace(/({)/gi,'ù*{');
        EnonceParsed=EnonceParsed.split('ù*');
        
        //Ca enlève toutes les réponses
        for(let i=0;i<EnonceParsed.length;i++){
            
            EnonceParsed[i]=EnonceParsed[i].replace(/{[\s\S]*}/,"_");
        }   
    }

    console.log("Dans EnonceQuestion:" + EnonceParsed);
    return EnonceParsed;
}


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

    //console.log("data toString() " + data);
    //La réponse se situe après le =
    //S'il la réponse est de ne rien mettre, exemple pour a/the/an/-, il faut que l'utilisateur rentre -
    //On récupère tout ce qu'il y a à partir du = jusqu'à ~ ou }

    //Premièrement on veut savoir combien de réponses il y a dans le fichier
    const symboleReponse = /=/g;
    if(question[numero].indexOf('{') !== -1) //C'est une question
    {
        nbReponses = question[numero].match(symboleReponse);
        if(nbReponses !== null) {
            console.log("Il y a " + nbReponses.length + " réponses");

            let indexReponses;
            let caractereLu;

            if (nbReponses.length === 1) {
                reponse = new Array(1);
                reponse[0] = '';
                //Premièrement on récupère l'index du premier { pour savoir où sont les réponses
                indexReponses = question[numero].indexOf('=');
                //console.log("indexReponses = " + indexReponses);
                caractereLu = question[numero].charAt(indexReponses + 1);
                do {
                    indexReponses++;
                    //console.log(indexReponses);
                    caractereLu = question[numero].charAt(indexReponses);
                    //console.log("Le caractère lu est : " + caractereLu);
                    //console.log("tilde : " + caractereLu.localeCompare('~'));
                    //console.log("accolade " + caractereLu.localeCompare('{'));
                    if (caractereLu.localeCompare('~') !== 0 && caractereLu.localeCompare('}') !== 0) {
                        //reponse.append(caractereLu);
                        reponse[0] = reponse[0] + caractereLu;
                        //On supprime les \n de la réponse
                        reponse[0]=reponse[0].replace(/\n|\r|\t/g, '');
                    }
                    //console.log("La réponse est maintenant : " + reponse)
                } while (caractereLu.localeCompare('~') !== 0 && caractereLu.localeCompare('}') !== 0);
            } else {
                reponse = new Array(nbReponses.length);
                for (let i = 0; i < nbReponses.length; i++) {
                    reponse[i] = '';
                    //Premièrement on récupère l'index du premier { pour savoir où sont les réponses
                    if (i === 0) indexReponses = question[numero].indexOf('=');
                    else indexReponses = question[numero].indexOf('=', indexReponses);
                    //console.log("indexReponses = " + indexReponses);
                    caractereLu = question[numero].charAt(indexReponses + 1);
                    do {
                        indexReponses++;
                        caractereLu = question[numero].charAt(indexReponses);
                        //console.log("Le caractère lu est : " + caractereLu);
                        //console.log("tilde : " + caractereLu.localeCompare('~'));
                        //console.log("accolade " + caractereLu.localeCompare('{'));

                        if (caractereLu.localeCompare('~') !== 0 && caractereLu.localeCompare('}') !== 0 && caractereLu.localeCompare('=') !== 0) {
                            //reponse.append(caractereLu);
                            reponse[i] = reponse[i] + caractereLu;

                            //On supprime les \n de la réponse
                            reponse[i]=reponse[i].replace(/\n|\r|\t/g, '');
                        }
                        //console.log("La réponse est maintenant : " + reponse[i])
                    } while (caractereLu.localeCompare('~') !== 0 && caractereLu.localeCompare('}') !== 0 && caractereLu.localeCompare('=') !== 0);
                }
            }


            if (nbReponses.length === 1) console.log("La réponse de la question est : " + reponse);
            else console.log("Les réponses possibles à la question sont : " + reponse);
            return reponse;
        }
    }
    return null;

    //Il faut traiter le numéro de la question
    //Askip ça marche pas pour un type de données
    //Il faut enregistrer les réponses dans filTest avec un return
}

VpfParser.prototype.TypeQuestion = function(data,numero){

    //La variable qu'on renvoit
    let correspondance;
    //Si c'est une question on effectue le tri
    if(data[numero].includes("{")){
        
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
        data = data.filter((val,idx) => !val.match(separator));
        EnonceParsed=EnonceParsed[1];
        EnonceParsed=EnonceParsed.toString();
        EnonceParsed=EnonceParsed.split('}');
        data = data.filter((val,idx) => !val.match(separator));
        EnonceParsed=EnonceParsed[0];

        console.log("Contenu de la première réponse:"+EnonceParsed);

        console.log("********** L'énonce parsed est : " + EnonceParsed);

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
        //S'il contient plusieurs "~"  il y a plusieurs choix donc c'est un MC--> on renvoie 1
            //@Alexis je pense que même si on a un "~" ça peut être un MC quand même
        else if(EnonceParsed.match(/~/g)!== null && EnonceParsed.match(/~/g).length>=1){
            correspondance=1;
            console.log("C'est un MC");
        }
            //S'il contient true ou false c'est un type vrai/faux --> on renvoie 2
        //| 'TRUE'|'T'|'FALSE'
        else if((EnonceParsed.includes('F') || EnonceParsed.includes('T') || EnonceParsed.includes('TRUE')) || (EnonceParsed.includes('FALSE')) && (!EnonceParsed.includes('='))){
            correspondance=2;
            console.log("C'est un vrai/faux");
        }
        //S'il contient qu'un "=" et pas de "~" il y a un choix donc c'est un mot manquant--> on renvoie 4
        else if(EnonceParsed.match(/~/g)== null){
            correspondance=4;
            console.log("C'est un mot manquant");
        }
            //Il reste que question libre -->on renvoie 6
            //S'il contient 'digit..digit'|'digit:digit'|'=digit' c'est un type numérique --> on renvoie 5
        //else if(EnonceParsed.includes('[0-9]..[0-9]'|'[0-9]:[0-9]'|'=[0-9]')){
        else{
            correspondance=5;
            console.log("C'est un numérique");
        }
        console.log(correspondance);
    }

    else{
        console.log("C'est un énoncé, il n'a pas de type");
        correspondance=0;
    }

    
    return correspondance;
}
module.exports = VpfParser;


