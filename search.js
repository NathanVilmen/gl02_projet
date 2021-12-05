const fs = require('fs');
const VpfParser = require('./parser.js');


var viewer = function(){
    this.question=null; //Je sais pas si on peut mettre à null avant
}

//On sélectionne des questions
viewer.prototype.viewer = function(data){

    fs.readFile(data.file, 'utf8', function (err,data) {
        if (err) {
            return logger.warn(err);
        }

        //Il faut trier le fichier écrit
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Quel nom d\'exerice voulez vous ?', nomExercice => {
            console.log(`Vous avez choisi ce nom de question: ${nomExercice}!`);
            readline.close();
        });

        this.rechercher(data, nomExercice);

        //On stock dans question
        this.question.push(trouvee);
        console.log("La question a bien été trouvée, la voici");
        console.log(this.tabQuestion);
    })

}

//On crée une fonction qui va nous permettre de rechercher un nom de question
viewer.prototype.rechercher=function (nomExercice) {



    //Une fois qu'on a trouvé le fichier on le parse
    var analyzer = new VpfParser();
    analyzer.parse(data);   //il faut mettre en argument un fichier


    //On définit le séparateur
    if(data[0]=="U"){   //Si le fichier commence par U1,U2, etc....
        separator = ('::U');
    }
    else{   //Le fichier commence par EM
        separator=('::EM')
    }

    for (let i = 0; i < 47; i++) {//on parcourt les 47 fichiers du sujet B

        if (){  //On a trouvé la question, je sais pas quoi mettre dans la condition
            //On sépare la question     .split(/,| /)
            //--> le deuxième membre est le titre
            data=data.split(separator);
            //On filtre: on retire tout ce qui est le séparateur
            data=data.filter((val, idx) => !val.match(separator));

            var questionTrouvee = date[nomExercice];
            return questionTrouvee;
        }
    }
    return //Si on arrive à cette ligne c'est que le for n'a rien trouvé. Mais comment retourner une erreur sachant que le type de retour est une question


}

module.exports = viewer();
type: module;