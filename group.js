const fs = require('fs');
const prompt = require('prompt-sync')();

var groupp=function(name){
    this.tabQuestion=[];
    this.name=name;
}

//On groupe des questions
groupp.prototype.group2 = function(string){
	
    console.log("On est dans group");
    console.log(typeof string);
/*
    try{
        const data=fs.ReadFileSync('text.gift','utf-8')
        console.log("DAAAAAAAMN"+data);
    }catch(err){
        console.error(err);
    }
    */
    fs.readFile('text.gift', 'utf8', function (err,data) {
        if (err) {
            return logger.warn(err);
        }

        console.log("on lit le fichier");
        console.log(this.name);
        //Il faut trier le fichier écrit
        var questionNumber = prompt('What is the question number?');
	 	console.log(`Here is the question number: ${questionNumber}`);

        var finale=triQuestion(data,questionNumber);

        console.log(finale);
        //On stock dans tabQuestions
        stringArr = [];
        stringArr.push(finale);
        this.tabQuestion.push(finale);
        console.log("La question a bien été ajoutée");
        console.log(this.tabQuestion);
        
    })
}

//ici il faut un parser qui tri toutes les questions de tous les fichiers 
groupp.prototype.triQuestion=function(data, numero){
   
    //on définit le séparateur
    //Si le fichier commence par U1,U2, etc....
    var separator= ('::U');
    /*
    if(data[0]=="U"){
        separator = ('::U');
    }
    else{//Le fichier commence par EM
        separator=('::EM')
    }
    */
    console.log("On est dans la fonction tri");
    
    //On split les datas
	data = data.split(separator);
   
    //On filtre: on retire tout ce qui est le séparateur
	data = data.filter((val, idx) => !val.match(separator));
    
   //On return le numero de la question (c'est le bon chiffre car le premier truc d =u tableau n'est pas une question)
   return data;

}



module.exports = groupp;
