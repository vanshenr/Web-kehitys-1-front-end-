//TEHTÄVÄ 1
function changeHeading() {
    const otsikko = document.querySelector("h2");
    otsikko.textContent = "Muokattu otsikko!";
}

function secondButton() {
    const h2 = document.querySelector("h2:nth-of-type(2)");
    h2.style.fontSize = "32px";
    h2.style.fontStyle = "italic";
    h2.style.color = "white";
    h2.style.backgroundColor = "red";
}

function thirdButton() {
    const lorem = document.getElementById("lorem");
    lorem.innerHTML = `"Tähän piti laittaa muuta tekstiä, kun painetaan Nappia #3."`;
}
//TEHTÄVÄ 2
const sisalto = document.querySelector("#sisalto"); //div sisalto etsiminen

const otsikko = document.createElement("h3"); //h3 luominen otsikolla "Etusivun uutinen"
otsikko.textContent = "Etusivun uutinen";

otsikko.style.color = "red"; //otsikon tyylittelyä
otsikko.style.fontFamily = "italic";
otsikko.style.fontSize = "26px";
otsikko.style.marginBottom = "10px";

sisalto.appendChild(otsikko); //otsikon lisääminen diviin

const kuva = document.createElement("img");
kuva.src = "https://www.topgear.com/sites/default/files/2023/06/_DSF4308_ret_lores.jpg"; //auton url

kuva.style.width = "300px"; //kuvan tyylittelyä
kuva.style.borderRadius = "80px";
kuva.style.marginBottom = "15px";

sisalto.appendChild(kuva); //kuva diviin

const piilotaBtn = document.createElement("button"); //nappien luominen
piilotaBtn.textContent = "Piilota DIV";

const naytaBtn = document.createElement("button");
naytaBtn.textContent = "Näytä DIV";

document.body.appendChild(piilotaBtn); //nappien lisääminen bodyyn
document.body.appendChild(naytaBtn);

piilotaBtn.addEventListener("click", () => { //piilotus ja näyttö kuuntelijat napeille
    sisalto.style.display = "none";
});

naytaBtn.addEventListener("click", () => {
    sisalto.style.display = "block";
});

//TEHTÄVÄ 3
const select = document.querySelector("#mySelect"); //Alasvetovalikko ja kuva
const carImage = document.querySelector("#carimage");


const carImages = { //Autojen urlit merkeittäin
    BMW: "https://www.bmw.fi/content/dam/bmw/common/all-models/m-series/m8-coupe/2022/navigation/bmw-8series-coupe-modellfinder.png",
    Audi: "https://www.edmunds.com/assets/m/cs/blt7643030e805f67ab/670d2c4aa24001ae34f4c569/Original-13465-a244287-large_1280.jpg",
    Mercedes: "https://wallpapers4screen.com/Uploads/14-1-2023/59280/thumb-2023-mercedes-amg-e63-s-wagon-front-view-exterior-tuning.jpg",
    Volvo: "https://saysite.fi/attachments/16568829875624115825326842047518-webp.8685/"
};

select.addEventListener("change", function () { //kuuntelija alasvetovalikolle
    const valinta = select.value;
    alert("Valitsit: " + valinta); //ilmoitus merkin mukaisesti
    carImage.src = carImages[valinta];
});

carImage.addEventListener("mouseover", function () { //kuvaan reunus hiiren ollessa kuvan päällä
    carImage.style.border = "5px solid red";
    carImage.style.borderRadius = "10px";
});

carImage.addEventListener("mouseout", function () { //reunus pois hiiren lähtiessä kuvan päältä
    carImage.style.border = "none";
});

//TEHTÄVÄ 4

const nimiInput = document.querySelector("#nimi"); // Haetaan lomakekentät ja nappi
const tehtavaInput = document.querySelector("#tehtava");
const palkkaInput = document.querySelector("#palkka");
const insertBtn = document.querySelector("#Insert");

const table = document.querySelector("#data").getElementsByTagName("tbody")[0]; // Haetaan taulukko

insertBtn.addEventListener("click", function () { // Kuuntelija napille

    const nimi = nimiInput.value.trim();
    const tehtava = tehtavaInput.value.trim();
    const palkka = palkkaInput.value.trim();

// VALIDOINTI

    if (nimi.length <= 5) { // Nimi väh.5 merkkiä
        alert("Nimen tulee olla yli 5 merkkiä pitkä.");
        return;
}

    
    if (tehtava === 0) { // Tehtävä ei saa olla tyhjä
        alert("Tehtävä-kenttä ei saa olla tyhjä.");
        return;
}

    
if (palkka === "" || isNaN(Number(palkka)) || Number(palkka) <= 0) {
     alert("Palkan tulee olla numero ja suurempi kuin 0."); 
     return; 
}

    const newRow = table.insertRow(); // Uuden rivin luominen taulukkoon

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3); // poistonappi

    cell1.textContent = nimi;
    cell2.textContent = tehtava;
    cell3.textContent = "$" + palkka;

    const deleteBtn = document.createElement("button"); // Poistonapin luominen uudelle riville
    deleteBtn.textContent = "Poista";
    deleteBtn.style.padding = "4px 8px";
    deleteBtn.style.marginLeft = "10px";

    deleteBtn.addEventListener("click", function () {
        table.removeChild(newRow);
    });

    cell4.appendChild(deleteBtn);

    nimiInput.value = "";  // Kenttien tyhjennys
    tehtavaInput.value = "";
    palkkaInput.value = "";
});

//BONUSTEHTÄVÄ

function changePosition() { //Siirrä kuva 200px vasemmalle ja 500px alas
    const car = document.getElementById("carimage");
    car.style.position = "relative";
    car.style.left = "-200px";
    car.style.top = "500px";
}

let direction = 1; //Animoi kuvaa edestakaisin
let x = 0;

function doMove() {
    const car = document.getElementById("carimage");
    car.style.position = "relative";

    x += 20 * direction;
    car.style.left = x + "px";
    if (x > 400) direction = -1; //Vaihda suuntaa kun reuna tulee vastaan
    if (x < 0) direction = 1;
}

let opacity = 1.0; //Häivytä kuva (opacity 1 → 0)

function fadeOut() {
    const car = document.getElementById("carimage");

    if (opacity > 0) {
        opacity -= 0.05;
        car.style.opacity = opacity;
    }
}

function remove() { //Poista kuva kokonaan
    const car = document.getElementById("carimage");
    car.remove();
}








