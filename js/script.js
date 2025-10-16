document.addEventListener("DOMContentLoaded", async () => {

const dataPersonnage = await fetch("https://hp-api.onrender.com/api/characters").then(response => response.json());
console.log(dataPersonnage);

const personnages = document.querySelector(".characters");

//Liste des backgrounds en fonction de la maison
const houseColors = {
    "Gryffindor": "var(--red, #b71713)",
    "Hufflepuff": "var(--yellow, #e1b50c)",
    "Ravenclaw": "var(--blue, #078cb1)",
    "Slytherin": "var(--green, #124b10)",
    "NoHouse": "var(--light-gray, #d3d3d3)"
};

// Afficher seulement les 12 premiers personnages
for (let i = 0; i < 12; i++) {
    const personnage = dataPersonnage[i];
    const house = personnage.house || "NoHouse";

    //Couleur de fond selon la maison
    const color = houseColors[house];

    // Conteneur principal du personnage
    const charDiv = document.createElement("div");
    charDiv.className = "character-card " + house;

    // Image du personnage
    const img = document.createElement("img");
    img.src = personnage.image;
    img.alt = personnage.name;
    img.style.border = `8px solid ${color}`;

    // Nom du personnage (en dessous de l'image)
    const link = document.createElement("a");
    link.textContent = personnage.name;
    link.href = `details.html?id=${personnage.id}`;
    link.style.color = color;
    const nameWrapper = document.createElement("p");
    nameWrapper.appendChild(link);

    // Assemblage
    charDiv.appendChild(img);
    charDiv.appendChild(nameWrapper);
    personnages.appendChild(charDiv);
}

//tri selon la maison
const houseElements = document.querySelectorAll('.houses div img');
console.log(houseElements);
houseElements.forEach(houseElement => {
    houseElement.addEventListener('click', () => {
        const selectedHouse = houseElement.alt;
        console.log("Maison sélectionnée :", selectedHouse);
        const characterCards = document.querySelectorAll('.character-card');
        characterCards.forEach(card => {
            if (selectedHouse === "All" || card.classList.contains(selectedHouse)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

});