document.addEventListener("DOMContentLoaded", async () => {
  // Récupérer l'ID du personnage depuis l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const personnageId = urlParams.get('id');

  if (!personnageId) {
    console.error("Aucun ID de personnage fourni !");
    return;
  }

  try {
    // On récupère directement le personnage via l'API
    const response = await fetch(`https://hp-api.onrender.com/api/character/${personnageId}`);
    if (!response.ok) throw new Error("Personnage introuvable");

    const personnage = await response.json();
    console.log("Personnage récupéré :", personnage);

    // Afficher les détails du personnage
    const detailsSection = document.querySelector("main");
    const charDiv = document.createElement("div");
    charDiv.className = "character-details";
    charDiv.innerHTML = `
        <section>
            <h3>${personnage.name}</h3>
            <div class="perso">
                <figure class="perso__left">
                    <img src="${personnage.image}" alt="${personnage.name}" />
                    <figcaption>${personnage.actor}</figcaption>
                </figure>
                <div class="perso__right">
                    <div><p>Gender</p> <p class="attr">${personnage.gender}</p></div>
                    <div><p>Eye</p> <p class="attr">${personnage.eyeColor}</p></div>
                    <div><p>Hair</p> <p class="attr">${personnage.hairColor}</p></div>
                    <div><p>Date of Birth</p> <p class="attr">${personnage.dateOfBirth}</p></div>
                    <div><p>Patronus</p> <p class="attr">${personnage.patronus}</p></div>
                </div>
            </div>
        </section>
        <section class="house__perso">
            <img src="./images/logo/${personnage.house}.png" alt="" />
        </section>
    `;
    detailsSection.appendChild(charDiv);

  } catch (error) {
    console.error("Erreur :", error);
    document.querySelector("main").textContent = "Personnage introuvable !";
  }
});
