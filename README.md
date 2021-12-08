# GL02_projet

Git pour le projet de GL02

# Projet Tempete glacee : gestion de fichiers GIFT

Le projet Tempete glacee (projet_final.js) est un outil de gestion et preparation de tests et examens en ligne. 
Il gere des fichiers au format GIFT.

## Installation

$ npm install

(S'assurer que le dossier node_modules ainsi cree contient @Caporal, prompt-sync et Vega)

## Utilisation

$ node projet_final.js <command> [argument]

### <command> : contact

- Cette fonction permet de generer un fichier de contact VCard a partir des informations demandees


- -h or --help 	: affiche l'aide du programme quant à l'utilisation de la fonction


### <command> : group [argument]

- Cette fonction permet de regrouper un ensemble de questions. Cet ensemble constitueras un fichier examen GIFT
- [argument] : numero de fichier souhaite, numero de l'énonce souhaite, numero de la question souhaite, nom qu'on veut donner au fichier examen

- -h or --help 	: affiche l'aide du programme quant à l'utilisation de la fonction

### <command> : viewer

- Cette fonction permet de rechercher et visualiser une question, afin de la choisir

- -h or --help 	: affiche l'aide du programme quant à l'utilisation de la fonction


### <command> : check [file]

- Cette fonction permet de verifier que le fichier d'examen est valide (pas de double)
- [file] : chemin du fichier a verifier

- -h or --help 	: affiche l'aide du programme quant à l'utilisation de la fonction

### <command> : qualiteNombre [file]

- Cette fonction permet de verifier que le fichier examen contient bien 15 à 20 questions
- [file] : chemin du fichier a verifier

- -h or --help 	: affiche l'aide du programme quant à l'utilisation de la fonction

### <command> : test [file]

- Cette fonction permet de simuler la passation d'un examen
- [file] : chemin du fichier examen

- -h or --help 	: affiche l'aide du programme quant à l'utilisation de la fonction

### <command> : profil [file]

- permet à l’utilisateur d’établir un profil des types de questions pour un examen. Genere un diagramme .svg

- [file] : fichier pour lequel on veut etablir un profil

- -h or --help 	: affiche l'aide du programme quant à l'utilisation de la fonction

### <command> : comparer [file]

- Cette fonction permet a l'utilisateur de comparer le profil du fichier de son examen avec un nombre [n] de fichiers de la banque d’examen. Génère un histogramme de comparaison .svg

- -h or --help 	: affiche l'aide du programme quant à l'utilisation de la fonction

### <command> : readme

- Cette fonction permet d'afficher le fichier README.txt.

- -h or --help 	: affiche l'aide du programme quant à l'utilisation de la fonction

## Historique des versions

### Version 0.1 :

Creation du parser (parser_final.js), appropriation des fichiers.

### Version 0.2 :

Creation du programme principal (projet_final.js). Creation de la fonction contact.

### Version 0.3 : 

Creation des fonctions group et viewer simultanement.

### Version 0.4 :

Creation des fonctions check et qualiteNombre simultanement.

### Version 0.5 :

Creation de la fonction profil, et debut de creation de creation de la fonction test.

### Version 0.6 :

Finalisation de la fonction test, et création de la fonction comparer.

### Version 0.7 :

Realisation de tests unitaires sur la fichier VCard, via la creation de testunitaire.js.

### Version 0.8 :

Programme teste et ameliore. Creation du fichier README.txt, et de la fonction associee (readme).

### Version 0.9 :
Programme fonctionnel et pret a être livre.


## Liste des contributeurs

Alexis HOOREWEGE, Maxime MIRGALET et Nathan VILMEN.

Novembre - Decembre 2021

## License

Tous droits reserves.
