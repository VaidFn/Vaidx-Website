// verification.js
function checkPseudoValide() {
    if (!sessionStorage.getItem('pseudoValide')) {
        window.location.href = 'index.html'; // Rediriger vers la page de vérification
    }
}

// Appeler la fonction pour vérifier le pseudo au chargement de la page
window.onload = checkPseudoValide;
