let map; 
let markersLayer; 

// Fonction pour afficher un onglet
function afficherOnglet(id) {
    document.querySelectorAll(".onglet").forEach(o => o.classList.remove("actif"));
    document.getElementById(id).classList.add("actif");

    if (id === "carte" && !window.mapInitialisee) {
        initialiserCarte();
        window.mapInitialisee = true;
    }
}

// Initialisation de la carte Leaflet
function initialiserCarte() {
    map = L.map('map').setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Couche pour les marqueurs
    markersLayer = L.layerGroup().addTo(map);
}

// ✅ Ajouter un marqueur météo
function ajouterMarqueurCarte(lat, lon, ville, temp) {
    if (!map) return; // si la carte n’est pas encore affichée

    markersLayer.clearLayers(); // supprimer ancien marqueur

    let marker = L.marker([lat, lon]).addTo(markersLayer);
    marker.bindPopup(`<b>${ville}</b><br>🌡️ ${temp}°C`).openPopup();

    map.setView([lat, lon], 8); // centrer sur la ville
}
