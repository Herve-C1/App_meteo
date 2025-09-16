let btn = document.getElementById("btn");
let input = document.getElementById("ville");
let resultat = document.getElementById("resultat");

// ⚠️ Mets ici ta propre clé API OpenWeatherMap
const apiKey = "583cd3dc0148b2707404bdf88ca06662";

btn.addEventListener("click", async () => {
    let ville = input.value;
    if (!ville) {
        resultat.textContent = "⚠️ Entrez une ville.";
        return;
    }

    try {
        let response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}&units=metric&lang=fr`
        );

        if (!response.ok) {
            throw new Error("Ville non trouvée !");
        }

        let data = await response.json();
        console.log(data); // Pour voir tout l’objet JSON en console

        resultat.textContent = `🌍 ${data.name} : ${data.main.temp}°C, ${data.weather[0].description}`;
    } catch (error) {
        resultat.textContent = "❌ Erreur : " + error.message;
    }
});
