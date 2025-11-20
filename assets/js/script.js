// === VARIABLES
let oCanvasHTML = document.querySelector("canvas");
let oContexte = oCanvasHTML.getContext("2d");

let nHauteurCanvas = oCanvasHTML.height;
let nLargeurCanvas = oCanvasHTML.width;

let sEtat = "intro";
let nPoints = 0;
let nTempsPasse = 0; // en secondes



let listeQuestions = [
    {
        nom: "Quelle est la capitale du Brésil ?",
        reponse: "Brasília",
        choix: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
        points: 1,
    },
    

]       



let oBoutonDemarrer = { x: nLargeurCanvas / 2 - 100 , y: nHauteurCanvas / 2, largeur: 200, hauteur: 50, texte: "DÉMARRER", teinte: 0 };

function initialiser() {
    setInterval(boucleJeu, 1000 / 60);
    window.addEventListener("click", onClicCanvas);

}

function boucleJeu() {
    oContexte.clearRect(0, 0, nLargeurCanvas, nHauteurCanvas);

    if (sEtat == "intro") {
        dessinerMenu();
     }else if (sEtat == "jeu") {
        // Dessiner le jeu ici
        


    }
}




function dessinerMenu() {
    oBoutonDemarrer.teinte++;

    if (oBoutonDemarrer.teinte >= 360) {
        oBoutonDemarrer.teinte = 0;
    }

        // Titre
    oContexte.fillStyle = "#333";
    oContexte.font = "bold 40px Arial";
    oContexte.textAlign = "center";
    oContexte.fillText("Questionaire sur l'Amérique Latine ", nLargeurCanvas / 2, 100);

    // Instructions
    oContexte.font = "20px Arial";
    oContexte.fillText("Répondez à autant de questions que possible avant que le chronomètre n'atteigne 0.", nLargeurCanvas / 2, 150);


    // Bouton démarrer
    oContexte.fillStyle = `hsl(${oBoutonDemarrer.teinte}, 50%, 50%)`;
    oContexte.fillRect(oBoutonDemarrer.x, oBoutonDemarrer.y, oBoutonDemarrer.largeur, oBoutonDemarrer.hauteur);

    // Texte
    oContexte.fillStyle = "#fff";
    oContexte.font = "bold 24px Arial";
    oContexte.textAlign = "center";
    oContexte.fillText(oBoutonDemarrer.texte, oBoutonDemarrer.x + oBoutonDemarrer.largeur / 2, oBoutonDemarrer.y + oBoutonDemarrer.hauteur / 2 + 8);
}



function onClicCanvas(evenement) {
    let curseurX = evenement.offsetX;
    let curseurY = evenement.offsetY;

    if (sEtat == "intro" && detecterClicObjet(curseurX, curseurY, oBoutonDemarrer) == true) {
        sEtat = "jeu";
    } 

}











function detecterClicObjet(curseurX, curseurY, objet) {
    if (curseurX >= objet.x && curseurX <= objet.x + objet.largeur && curseurY >= objet.y && curseurY <= objet.y + objet.hauteur) {
        return true;
    }
    return false;
}

window.addEventListener("load", initialiser);
