// /* ========================================
//    EXERCICE : DEEZER API + DOM MANIPULATION
//    ======================================== */

// /* OBJECTIFS :
//    1. Sélectionner des éléments du DOM
//    2. Créer un eventListener sur le bouton
//    3. Récupérer des données depuis l'API Deezer
//    4. Créer dynamiquement des cartes pour chaque chanson
//    5. Ajouter une interaction pour jouer un extrait audio
// */

// /* CONSEILS :
//    - Testez chaque étape avec console.log()
//    - Regardez dans la console du navigateur pour voir les erreurs
//    - L'API Deezer retourne toujours 25 résultats maximum
// */


// //* ===== ÉTAPE 1 : SÉLECTIONNER LES ÉLÉMENTS DU DOM =====
// // Bien regarder comment est construit le code HTML

// // TODO: Sélectionner le bouton de recherche avec getElementById
// const searchBtn = document.getElementById("search-btn");
// // TODO: Sélectionner l'input de recherche
// const artistInput = document.getElementById("artist-input");
// // TODO: Sélectionner le conteneur des résultats
// const resultsContainer = document.getElementById("results-container");
// // TODO: Sélectionner l'élément audio pour jouer la musique
// const audio = document.getElementById("audio-player");



// //* ===== ÉTAPE 2 : CRÉER UN EVENT LISTENER =====
// // Quand on clique sur le bouton, on appelle la fonction searchArtist()

// // TODO: Ajouter un addEventListener "click" sur le bouton




// //* ===== ÉTAPE 3 : FONCTION POUR CHERCHER UN ARTISTE =====
// function searchArtist() {
//    // 1. Vider le conteneur avant d'afficher les nouveaux résultats


//    // 2. Récupérer ce que l'utilisateur a tapé dans l'input


//    // 3. Vérifier si artistName est vide
//    //    - Si oui : afficher un message dans le conteneur
//    //    - Puis faire "return;" pour arrêter la fonction


//    // 4. Construire l'URL de l'API avec le nom de l'artiste
//    const API_URL = `https://corsproxy.io/?https://api.deezer.com/search?q=${artistName}`;


//    //**! PAS TOUCHE!!! */
//    fetch(API_URL)
//       .then(response => response.json())
//       .then(data => {
//          console.log('Données récupérées avec succès :', data);

//          // data.data = tableau de morceaux (tracks)

//          // TODO: Parcourir data.data avec forEach
//          // Pour chaque track, appeler la fonction afficherTrack(track)

//       })
//       .catch(error => console.error('Erreur lors de la récupération des données :', error));
//    //**! FIN FETCH */
// }



// //* ===== ÉTAPE 4 : CRÉER UNE CARTE POUR CHAQUE CHANSON =====
// function afficherTrack(track) {
//    // track = un objet qui représente une chanson
//    // Exemple : track.title, track.artist.name, track.album.cover_medium, track.preview

//    // 1. Vérifier que track.preview existe (certains morceaux n'ont pas de preview)
//    //    Si pas de preview, on ne crée pas de carte.


//    // 2. Créer un élément div pour la carte
//    //    - lui ajouter la classe "track-card"


//    // 3. Ajouter le HTML de la carte dans la div avec innerHTML :
//    //    - une div.cover-container
//    //    - une image avec la pochette
//    //    - un overlay avec l’icône ▶️
//    //    - un titre (h3) avec le nom de la chanson
//    //    - un paragraphe (p) avec le nom de l’artiste
//    //
//    // Exemple de structure HTML à reproduire :
//    //
//    // <div class="track-card">
//    //   <div class="cover-container">
//    //      <img src="URL_DE_L_IMAGE" class="cover-image">
//    //      <div class="play-overlay">
//    //         <span class="play-icon">▶️</span>
//    //      </div>
//    //   </div>
//    //   <h3>Titre de la chanson</h3>
//    //   <p>Nom de l’artiste</p>
//    // </div>
//    //


//    // 4. Ajouter un événement "click" sur la carte
//    //    Quand on clique :
//    //      - changer la source de l'audio (audio.src = track.preview)
//    //      - lancer la lecture (audio.play())
//    //


//    // 5. Ajouter la carte dans le conteneur des résultats
// }



// //* ===== BONUS : AJOUTER DES AMÉLIORATIONS (OPTIONNEL) =====
// // - Mettre en surbrillance (classe CSS) la carte en cours de lecture
// // - Permettre de lancer une recherche en appuyant sur la touche "Entrée" dans l'input
// // - POssibilté de mettre pause sur la preview de la musique.
//* ===== ÉTAPE 1 : SÉLECTIONNER LES ÉLÉMENTS DU DOM =====
const searchBtn = document.getElementById("search-btn");
const artistInput = document.getElementById("artist-input");
const resultsContainer = document.getElementById("results-container");
const audio = document.getElementById("audio-player");

let currentCard = null;


//* ===== ÉTAPE 2 : CRÉER UN EVENT LISTENER =====
searchBtn.addEventListener("click", searchArtist);

artistInput.addEventListener("keydown", (e) => {
   if (e.key === "Enter") {
      searchArtist();
   }
});


//* ===== ÉTAPE 3 : FONCTION POUR CHERCHER UN ARTISTE =====
function searchArtist() {
   resultsContainer.innerHTML = "";

   const artistName = artistInput.value.trim();

   if (artistName === "") {
      resultsContainer.innerHTML = "<p>Veuillez entrer un nom d’artiste.</p>";
      return;
   }

   const API_URL = `https://corsproxy.io/?https://api.deezer.com/search?q=${artistName}`;

   fetch(API_URL)
      .then(response => response.json())
      .then(data => {
         console.log("Résultats Deezer :", data);

         data.data.forEach(track => {
            afficherTrack(track);
         });
      })
      .catch(error => {
         console.error("Erreur API :", error);
         resultsContainer.innerHTML = "<p>Erreur lors du chargement des données.</p>";
      });
}


//* ===== ÉTAPE 4 : CRÉER UNE CARTE POUR CHAQUE CHANSON =====
function afficherTrack(track) {
   if (!track.preview) return;

   const card = document.createElement("div");
   card.classList.add("track-card");

   card.innerHTML = `
      <div class="cover-container">
         <img src="${track.album.cover_medium}" class="cover-image">
         <div class="play-overlay">
            <span class="play-icon">▶️</span>
         </div>
      </div>
      <h3>${track.title}</h3>
      <p>${track.artist.name}</p>
   `;

   card.addEventListener("click", () => {
      if (currentCard === card) {
         if (!audio.paused) {
            audio.pause();
            card.classList.remove("playing");
         } else {
            audio.play();
            card.classList.add("playing");
         }
         return;
      }

      if (currentCard) {
         currentCard.classList.remove("playing");
      }

      audio.src = track.preview;
      audio.play();

      card.classList.add("playing");
      currentCard = card;
   });

   resultsContainer.appendChild(card);
}
