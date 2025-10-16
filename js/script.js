document.addEventListener("DOMContentLoaded", async () => {

const data = await fetch("https://hp-api.onrender.com/api/characters").then(response => response.json());
console.log(data);

const personnages = document.querySelector(".characters");

// Afficher seulement les 12 premiers personnages
for (let i = 0; i < 12; i++) 
{
     const personnage = data[i];

    // Conteneur principal du personnage
    const charDiv = document.createElement("div");
    charDiv.className = "character-card " + (personnage.house || "NoHouse");

    // Image du personnage
    const img = document.createElement("img");
    img.src = personnage.image || "./images/characters/default.png";
    img.alt = personnage.name;

    // Nom du personnage (en dessous de l'image)
    const name = document.createElement("p");
    name.textContent = personnage.name;

    // Assemblage
    charDiv.appendChild(img);
    charDiv.appendChild(name);
    personnages.appendChild(charDiv);
}
});