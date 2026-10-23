let score = 0;
let cout_auto = 10;
let cout_click = 10;
let auto_power = 0;
let click_power = 1;

clic.onclick = () => { score = score + click_power; afficher(); };

document.addEventListener("keydown", (event) => {
    if (event.repeat || (event.code !== "Space" && event.code !== "KeyS")) return;
    if (event.code === "Space" && event.target instanceof HTMLButtonElement) return;
    if (event.code === "Space") event.preventDefault();
    clic.click();
});

achat_auto.onclick = () => {
    if (score < cout_auto) return;
    score -= cout_auto;
    auto_power++;
    cout_auto = Math.floor(cout_auto * 1.15) + 1;
    afficher();
};

achat_click.onclick = () => {
    if (score < cout_click) return;
    score -= cout_click;
    cout_click = Math.floor(cout_click * 1.15) + 1;
    click_power++;
    afficher();
}

setInterval(() => { score += auto_power / 10; afficher(); }, 100);

function afficher() {
    // Score
    document.getElementById("score").textContent = Math.floor(score);

    // Boutons
    document.getElementById("clic_prod").textContent = click_power;
    document.getElementById("auto_prod").textContent = auto_power;

    // Update cout
    document.getElementById("achat_auto").textContent = "ACHETER AUTO (" + cout_auto + ")";
    document.getElementById("achat_auto").disabled = score < cout_auto;

    document.getElementById("achat_click").textContent = "ACHETER CLICK (" + cout_click + ")";
    document.getElementById("achat_click").disabled = score < cout_click;
}
afficher();