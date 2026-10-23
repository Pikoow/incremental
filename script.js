let score = 10;
let cout_addition = 10;
let cout_multiplicateur = 10;
let production = 0;
let production_addition = 1;
let multiplicateur = 1;
let multiplicateur_addition = 1;
let production_upgrades = 0;
let multiplicateur_upgrades = 0;
let nombre_achat = 1;

document.querySelectorAll("[data-buy-amount]").forEach((button) => {
    button.addEventListener("click", () => {
        const amount = button.dataset.buyAmount;
        nombre_achat = amount === "max" ? "max" : Number(amount);
        document.querySelectorAll("[data-buy-amount]").forEach((option) => {
            option.setAttribute("aria-pressed", String(option === button));
        });
        afficher();
    });
});

document.getElementById("achat_addition").onclick = () => acheter("production");
document.getElementById("achat_multiplicateur").onclick = () => acheter("multiplicateur");

setInterval(() => {
    score += production * multiplicateur / 10;
    afficher();
}, 100);

function details_achat(cout, quantite) {
    let total = 0;
    let prochain_cout = cout;
    let nombre = 0;

    while (
        (quantite === "max" ? total + prochain_cout <= score : nombre < quantite)
    ) {
        total += prochain_cout;
        prochain_cout = Math.floor(prochain_cout * 1.15) + 1;
        nombre++;
    }

    return {
        nombre,
        total,
        prochain_cout,
        possible: nombre > 0 && (quantite === "max" || total <= score)
    };
}

function acheter(type) {
    const productionUpgrade = type === "production";
    const details = details_achat(
        productionUpgrade ? cout_addition : cout_multiplicateur,
        nombre_achat
    );
    if (!details.possible) return;

    score -= details.total;
    if (productionUpgrade) {
        production += details.nombre * production_addition;
        production_upgrades += details.nombre;
        cout_addition = details.prochain_cout;
    } else {
        multiplicateur += details.nombre * multiplicateur_addition;
        multiplicateur_upgrades += details.nombre;
        cout_multiplicateur = details.prochain_cout;
    }
    afficher();
}

function afficher() {
    document.getElementById("score").textContent = Math.floor(score);
    document.getElementById("production").textContent = production * multiplicateur;
    document.getElementById("multiplicateur").textContent = multiplicateur;
    document.getElementById("compte_addition").textContent = production_upgrades;
    document.getElementById("compte_multiplicateur").textContent = multiplicateur_upgrades;

    const boutonAddition = document.getElementById("achat_addition");
    const detailsAddition = details_achat(cout_addition, nombre_achat);
    boutonAddition.textContent = `ACHETER ${libelle_quantite(detailsAddition)} (${detailsAddition.total})`;
    boutonAddition.disabled = !detailsAddition.possible;

    const boutonMultiplicateur = document.getElementById("achat_multiplicateur");
    const detailsMultiplicateur = details_achat(cout_multiplicateur, nombre_achat);
    boutonMultiplicateur.textContent = `ACHETER ${libelle_quantite(detailsMultiplicateur)} (${detailsMultiplicateur.total})`;
    boutonMultiplicateur.disabled = !detailsMultiplicateur.possible;
}

function libelle_quantite(details) {
    return nombre_achat === "max" ? `MAX (${details.nombre})` : nombre_achat;
}

afficher();
