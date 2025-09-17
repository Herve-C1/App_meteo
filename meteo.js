const apiKey = "583cd3dc0148b2707404bdf88ca06662"; // Mets ta clé OpenWeatherMap ici

document.getElementById("btn").addEventListener("click", () => {
  let ville = document.getElementById("ville").value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}&units=metric&lang=fr`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        document.getElementById("resultat").textContent = "Ville non trouvée ❌";
        return;
      }

      // Afficher météo
      document.getElementById("resultat").textContent =
        `🌡️ ${data.main.temp}°C | ${data.weather[0].description}`;
      
      let icon = document.getElementById("icon");
      icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      icon.style.display = "inline";

      // ✅ Ajouter marqueur sur la carte
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      ajouterMarqueurCarte(lat, lon, ville, data.main.temp);
    })
    .catch(error => console.error("Erreur API :", error));
});
