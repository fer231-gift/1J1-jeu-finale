// === VARIABLES
let oCanvasHTML = document.querySelector("canvas");
let oContexte = oCanvasHTML.getContext("2d");

let nHauteurCanvas = oCanvasHTML.height;
let nLargeurCanvas = oCanvasHTML.width;

let sEtat = "intro";

let scores = [4, 7, 5, 30, 50, 35, 100, 80, 66, 94, 83, 75, -5];

scores.sort(trierScore);
    // console.log(scores);

function trierScore (elementA, elementB){
    // console.log(elementA, elementB)

    if (elementA < elementB){
        return -1
    } else if (elementA > elementB){
        return 1;
    } else {
        return 0;
    }
}

let mot = ["patate", "carotte", "radis", "tomate", "brocoli", "épinards", "endives", "melon-d'eau", "Poireau"];

mot.sort(triermot);
    // console.log(mot);

function triermot (elementA, elementB){
    // console.log(elementA, elementB)

    if (elementA < elementB){
        return -1
    } else if (elementA > elementB){
        return 1;
    } else {
        return 0;
    }
}



let listeCartes = [
    { x: 0, y: 0, hauteur: 140, largeur: 100, couleur: "red", estVisible: false },
    { x: 0, y: 0, hauteur: 140, largeur: 100, couleur: "red", estVisible: false },
    { x: 0, y: 0, hauteur: 140, largeur: 100, couleur: "blue", estVisible: false },
    { x: 0, y: 0, hauteur: 140, largeur: 100, couleur: "blue", estVisible: false },
    { x: 0, y: 0, hauteur: 140, largeur: 100, couleur: "green", estVisible: false },
    { x: 0, y: 0, hauteur: 140, largeur: 100, couleur: "green", estVisible: false },
    { x: 0, y: 0, hauteur: 140, largeur: 100, couleur: "yellow", estVisible: false },
    { x: 0, y: 0, hauteur: 140, largeur: 100, couleur: "yellow", estVisible: false },
    { x: 0, y: 0, hauteur: 140, largeur: 100, couleur: "purple", estVisible: false },
    { x: 0, y: 0, hauteur: 140, largeur: 100, couleur: "purple", estVisible: false },
    { x: 0, y: 0, hauteur: 140, largeur: 100, couleur: "orange", estVisible: false },
    { x: 0, y: 0, hauteur: 140, largeur: 100, couleur: "orange", estVisible: false },
];

let nbPairesTrouvees = 0;
let nbvies = 4;

// Cartes choisies par le joueur, si c'est null, aucune carte n'a été choisie
let choixCarte1 = null;
let choixCarte2 = null;

// Bouton pour démarrer sur l'écran d'intro
let oBoutonDemarrer = { x: nLargeurCanvas / 2 - 100 , y: nHauteurCanvas - 100, largeur: 150, hauteur: 50, texte: "DÉMARRER", teinte: 0 };

// sons du jeu
let sons = {
    paireTrouvee: new Audio("assets/audio/sonPaire.wav"),
    finPartie: new Audio("assets/audio/sonFinPartie.wav"),
    erreur: new Audio("assets/audio/sonErreur.wav"),
};

sons.paireTrouvee.volume = 0.2;
sons.finPartie.volume = 0.2;
sons.erreur.volume = 0.8;

// === FONCTION D'INITIALISATION DU JEU ===
function initialiser() {
    setInterval(boucleJeu, 1000 / 60);
    window.addEventListener("click", onClicCanvas);
    redemarrerJeu();

}

function redemarrerJeu() {
    melangerCartes();
}

// === Boucle de jeu ===
function boucleJeu() {
    oContexte.clearRect(0, 0, nLargeurCanvas, nHauteurCanvas);

    if (sEtat == "intro") {
        dessinerMenu();
    } else if (sEtat == "jeu") {
        dessinerCartes();
        dessinerUI();
        dessinervies();
    }
}

//=== FONCTIONS D'ÉCOUTEURs D'ÉVÉNEMENTS ===
function onClicCanvas(evenement) {
    let curseurX = evenement.offsetX;
    let curseurY = evenement.offsetY;

    if (sEtat == "intro" && detecterClicObjet(curseurX, curseurY, oBoutonDemarrer) == true) {
        sEtat = "jeu";
    } else if (sEtat == "jeu") {
        //TODO: Trouver la carte cliquée avec la fonction trouverCarte
        //SI UNE CARTE EST TROUVÉE
        let carteTrouvee = null;


        for( let i = 0; i < listeCartes.length; i++){
            let carte = listeCartes[i];

            let collisionClic = detecterClicObjet(curseurX, curseurY, carte);
            
                if(collisionClic == true){
                    carteTrouvee = carte;
                    break;
                }
        } //fin for

        if (carteTrouvee != null){
                if(choixCarte1 == null){
                choixCarte1 = carteTrouvee;
                carteTrouvee.estVisible = true;
            } else if ( choixCarte2 == null && carteTrouvee != choixCarte1){
                choixCarte2 = carteTrouvee;
                carteTrouvee.estVisible = true;
            
                validerFin();
                
            }
        }
    }
}

// === FONCTIONS D'AFFICHAGE DES ÉLÉMENTS DE JEU ===
function dessinerMenu() {
    oBoutonDemarrer.teinte++;

    if (oBoutonDemarrer.teinte >= 360) {
        oBoutonDemarrer.teinte = 0;
    }

    // Titre
    oContexte.fillStyle = "#333";
    oContexte.font = "bold 40px Arial";
    oContexte.textAlign = "center";
    oContexte.fillText("JEU DES PAIRES", nLargeurCanvas / 2, 100);

    // Instructions
    oContexte.font = "20px Arial";
    oContexte.fillText("Trouvez toutes les paires", nLargeurCanvas / 2, 150);

    // Bouton démarrer
    oContexte.fillStyle = `hsl(${oBoutonDemarrer.teinte}, 50%, 50%)`;
    oContexte.fillRect(oBoutonDemarrer.x, oBoutonDemarrer.y, oBoutonDemarrer.largeur, oBoutonDemarrer.hauteur);

    // Texte
    oContexte.fillStyle = "#fff";
    oContexte.font = "bold 24px Arial";
    oContexte.textAlign = "center";
    oContexte.fillText(oBoutonDemarrer.texte, oBoutonDemarrer.x + oBoutonDemarrer.largeur / 2 , oBoutonDemarrer.y + oBoutonDemarrer.hauteur / 2 + 8);
}

function dessinerCartes() {
    for(let i = 0; i < listeCartes.length; i++){
        let carte = listeCartes[i];

        let colonne = i % 4;
        let rangee = Math.floor( i / 4);

        let paddingX = colonne * 12;
        let paddingY = rangee * 10;

        let marginX = 40;
        let marginY = 60;

        carte.x = colonne * carte.largeur + paddingX + marginX;
        carte.y = rangee * carte.hauteur + paddingY + marginY;

        if(carte.estVisible == true){
            oContexte.fillStyle = carte.couleur;
        } else {
            oContexte.fillStyle = "grey";
        }

        oContexte.fillRect(carte.x, carte.y, carte.largeur, carte.hauteur);

    }








    //TODO: Dessiner chaque carte de la liste
    // Pour afficher les cartes en grille, on calcule la colonne et la ligne
    // Ex: si i = 3, colonne = 3, ligne = 0
    // Ex: si i = 5, colonne = 1, ligne = 1
    // On utilise le modulo (%) pour la colonne et la division entière (Math.floor) pour la ligne
    //En ce moment, on affiche 4 cartes par ligne et on espace les cartes de 10 pixels
    //Calculer la colonn et la ligne
    // Calculer la position de la carte
    // On place la carte en fonction de sa colonne et de sa ligne
    // On ajoute les marges et les décalages
    //Si la carte est visible, on utilise sa couleur, sinon on utilise la couleur grise
    // Dessiner la carte
}

function dessinerUI() {
    oContexte.fillStyle = "#333";
    oContexte.font = "bold 30px Arial";
    oContexte.textAlign = "center";
    oContexte.fillText(`Paires Trouvées: ${nbPairesTrouvees}`, 180, 40 );

}

function dessinervies(){
    oContexte.fillStyle = "#333";
    oContexte.font = "bold 30px Arial";
    oContexte.textAlign = "center";
    oContexte.fillText(`vies: ${nbvies}`, 400, 40 );
}

// === FONCTIONS DE LOGIQUE DES CARTES ===
function melangerCartes() {
    listeCartes.sort( triAleatoire)
}

function triAleatoire(elementA, elementB){
    //Retourne un nombre aléatoire entre -0.5 et 0.5
    //Si le nombre est négatif, l'élément A sera avant l'élément B
    //Si le nombre est positif, l'élément B sera avant l'élément A
    //TODO: Trier la liste des cartes avec la fonction sort et une fonction fléchée
    let tri = Math.random() * 2 - 1;
    return tri;

}
function trouverCarte(curseurX, curseurY) {
    //POUR CHAQUE CARTE DANS LA LISTE
    //SI LE CURSEUR EST DESSUS LA CARTE AVEC LA FONCTION detecterClicObjet
    //RETOURNER LA CARTE
    //RETOURNER null SI AUCUNE CARTE N'EST TROUVÉE
}

function validerFin() {
    if( choixCarte1.couleur == choixCarte2.couleur){
       
        nbPairesTrouvees++;
        choixCarte1 = null;
        choixCarte2 = null;
        sons.paireTrouvee.play();
    } else if ( choixCarte1.couleur != choixCarte2.couleur){
        nbvies--;
        sons.erreur.play();
        setTimeout(() => {
        choixCarte1.estVisible = false
        choixCarte2.estVisible = false
        choixCarte1 = null;
        choixCarte2 = null;
        }, 1000);
    }

    if ( nbPairesTrouvees >= listeCartes.length / 2){
        sEtat = "intro";
        sons.finPartie.play();
        alert("Félicitations! Vous avez trouvé toutes les paires!");
    } else if ( nbvies <= 0){
        sEtat = "intro";
        sons.finPartie.play();
        alert("Partie terminée! Vous n'avez plus de vies.");
    
    } 



}

// === FONCTIONS UTILITAIRES ===
function detecterClicObjet(curseurX, curseurY, objet) {
    if (curseurX >= objet.x && curseurX <= objet.x + objet.largeur && curseurY >= objet.y && curseurY <= objet.y + objet.hauteur) {
        return true;
    }
    return false;
}

window.addEventListener("load", initialiser);
