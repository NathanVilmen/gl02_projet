# GL02_projet

Git pour le projet de GL02

# Projet Tempete glacee : gestion de fichiers GIFT

Le projet Tempete glacee (projet_final.js) est un outil de gestion et preparation de tests et examens en ligne. 
Il gere des fichiers au format GIFT.

## Installation

Installation des packages 
`$ npm install`

(S'assurer que le dossier node_modules ainsi créé contient @Caporal, prompt-sync et Vega)

## Utilisation

Commande d'exécution générale 
`$ node projet_final.js <command> [argument]`

### <command> : contact

`$ node projet_final.js contact`

- Cette fonction permet de generer un fichier de contact VCard à partir des informations demandées

- -h or --help 	: affiche l'aide du programme quant à l'utilisation de la fonction

### <command> : group [argument]

`$ node projet_final.js group [numF] [numEnonce] [numQ] [nomF]`

- Cette fonction permet de regrouper un ensemble de questions. Cet ensemble constitueras un fichier examen GIFT
- `[numF]` : numero de fichier souhaite
- `[numEnonce]` :  numero de l'énonce souhaite
- `[numQ]` : numero de la question souhaite
- `[nomF]` : nom qu'on veut donner au fichier examen

- -h or --help 	: affiche l'aide du programme quant à l'utilisation de la fonction

### <command> : viewer

`$ node projet_final.js viewer`

- Cette fonction permet de rechercher et visualiser une question, afin de la choisir

- -h or --help 	: affiche l'aide du programme quant à l'utilisation de la fonction

### <command> : check [file]

`$ node projet_final.js check [file]`

- Cette fonction permet de verifier que le fichier d'examen est valide (pas de double)
- `[file]` : chemin du fichier a verifier

- -h or --help 	: affiche l'aide du programme quant à l'utilisation de la fonction

### <command> : qualiteNombre [file]

`$ node projet_final.js qualiteNombre [file]`

- Cette fonction permet de verifier que le fichier examen contient bien 15 à 20 questions
- `[file]` : chemin du fichier a verifier

- -h or --help 	: affiche l'aide du programme quant à l'utilisation de la fonction

### <command> : test [file]

`$ node projet_final.js test [file]`

- Cette fonction permet de simuler la passation d'un examen
- [file] : chemin du fichier examen

- -h or --help 	: affiche l'aide du programme quant à l'utilisation de la fonction

### <command> : profil [file]

`$ node projet_final.js profil [file]`

- permet à l’utilisateur d’établir un profil des types de questions pour un examen. Genere un diagramme .svg

- [file] : fichier pour lequel on veut etablir un profil

- -h or --help 	: affiche l'aide du programme quant à l'utilisation de la fonction

### <command> : comparer [file]

`$ node projet_final.js comparer [file]`

- Cette fonction permet a l'utilisateur de comparer le profil du fichier de son examen avec un nombre [n] de fichiers de la banque d’examen. Génère un histogramme de comparaison .svg

- -h or --help 	: affiche l'aide du programme quant à l'utilisation de la fonction

### <command> : readme

`$ node projet_final.js readme`

- Cette fonction permet d'afficher le fichier README.md 

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

**Développeurs principaux**

Alexis HOOREWEGE, Maxime MIRGALET et Nathan VILMEN.

**Développeurs maintenance**

Tom BOULESTEIX, Théo KOENIGS, Simon GAUTIER, Maëly TAN

## Dates de développement

Novembre - Decembre 2021

## License

Ce projet est sous license GNU General Public License v3.0. [En savoir plus](https://choosealicense.com/licenses/gpl-3.0/)
