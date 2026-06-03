// Harjoitus 1
document.addEventListener("DOMContentLoaded", () => {

    const btnNimet = document.getElementById("btnNimet"); // Haetaan sivulta nappi btnNimet
    const btnKaikki = document.getElementById("btnKaikki"); // Haetaan sivulta nappi btnKaikki
    const jsonDiv = document.getElementById("jsondata"); // Haetaan sivulta div, johon data näytetään

    const text = '{ "employees" : [' + // Määritellään merkkijono, joka sisältää JSON-muotoista tekstiä
        '{ "firstName":"John" , "lastName":"Doe" },' +
        '{ "firstName":"Anna" , "lastName":"Smith" },' +
        '{ "firstName":"Peter" , "lastName":"Jones" } ]}';

    const data = JSON.parse(text); // Parsitaan JSON-merkkijono JS-olioksi, jotta dataa voidaan käsitellä

    btnNimet.addEventListener("click", () => { // Lisätään tapahtumankuuntelija btnNimet napille
        let html = ""; // Alustetaan tyhjä merkkijono
        data.employees.forEach(e => { // Käydään läpi jokainen työntekijä data.employees-taulukosta
            html += `${e.firstName} ${e.lastName}<br>`; // Lisätään etunimi ja sukunimi rivinvaihdolla HTML-muuttujaan
        });
        jsonDiv.innerHTML = html; // Asetetaan HTML jsonDiv-elementin sisällöksi
    });

    btnKaikki.addEventListener("click", () => { // Lisätään tapahtumankuuntelija btnKaikki-napille
        let html = ""; // Alustetaan tyhjä merkkijono
        data.employees.forEach(e => { // Käydään läpi jokainen työntekijä data.employees-taulukosta
            html += `Etunimi: ${e.firstName}, Sukunimi: ${e.lastName}<br>`; // Lisätään merkkijonoon etunimi ja sukunimi
        });
        jsonDiv.innerHTML = html; // Asetetaan koottu HTML jsonDiv-elementin sisällöksi
    });

// Harjoitus 2
    const btnDlRaaka = document.getElementById("btnDlraakadata"); // Haetaan DOMista nappi, jonka id on btnDlraakadata
    const btnDlParsi = document.getElementById("btnDLparsi"); // Haetaan DOMista nappi, jonka id on btnDLparsi
    const raakaDiv = document.getElementById("raakadata"); // Haetaan div-elementti, johon ladattu data näytetään

    const omdbUrl = "https://www.omdbapi.com/?s=star+wars&apikey=cbbc6750";

    // Raakadatan lataus
    async function loadRawData() {
        const response = await fetch(omdbUrl); // HTTP GET pyyntö annettuun URL:iin ja odotetaan vastausta
        const text = await response.text(); // Luetaan vastaus tekstinä, näin näemme raakatekstin
        raakaDiv.textContent = text; // Asetetaan haettu raakateksti divin textContentiksi
    }

    // Parsitun datan lataus
    async function loadParsedData() { // Tehdään HTTP GET pyyntö samaan URL:iin ja odotetaan vastausta
        const response = await fetch(omdbUrl); 
        const json = await response.json(); // Parsitaan vastaus suoraan JSON-olioksi

        let html = "<table border='5'><tr><th>Poster</th><th>Title</th><th>Year</th><th>Type</th></tr>"; // HTML-taulukon rakentaminen merkkijonona

        if (json.Search) { // Tarkistetaan, löytyykö JSON-objektista Search-taulukko (OMDb palauttaa Search-kentän)
            json.Search.forEach(item => { // Käydään läpi jokainen hakutulos
                html += "<tr>"; // aloitetaan uusi taulukkorivi
                html += `<td>${item.Poster !== "N/A" ? `<img src="${item.Poster}" width="70">` : "Ei kuvaa"}</td>`;
                html += `<td>${item.Title}</td>`; // Lisätään otsikko-solu
                html += `<td>${item.Year}</td>`; // Lisätään vuosi-solu
                html += `<td>${item.Type}</td>`;// Lisätään tyyppi-solu
                html += "</tr>"; // suljetaan taulukkorivi
            });
        } else {
            html += "<tr><td colspan='4'>Ei tuloksia</td></tr>"; // Jos Search-kenttää ei ole, näytetään yksi rivi ilmoituksella "Ei tuloksia"
        }

        html += "</table>"; // Suljetaan taulukko
        raakaDiv.innerHTML = html; // Asetetaan rakennettu HTML raakaDivin sisällöksi
    }

    btnDlRaaka.addEventListener("click", loadRawData); // Liitetään nappeihin tapahtumankuuntelijat, jotka kutsuvat edellä määriteltyjä funktioita klikkauksella
    btnDlParsi.addEventListener("click", loadParsedData);
// Harjoitus 3
    const btnSaa = document.getElementById("btnSaa"); // Haetaan elementti, jonka id on "btnSaa"
    const citySelect = document.getElementById("city"); // Haetaan pudotusvalikko elementti, jonka id on "city"
    const citySearch = document.getElementById("citysearch"); // Haetaan tekstikenttä, johon käyttäjä voi kirjoittaa haettavan kaupungin
    const searchBtn = document.getElementById("search"); // Haetaan hakupainike elementti id:llä
    const weatherDiv = document.getElementById("weatherdata"); // Haetaan div-elementti, johon säädata tullaan näyttämään

    async function loadWeather(city) { // Määritellään asynkroninen funktio, joka hakee ja näyttää sään parametrina annetulle kaupungille
        if (!city) return; // Jos funktiolle ei annettu kaupunkia, lopetetaan funktio

        const apiKey = "02b1123ae81a59cbcae4d02edd8c5de8"; // API-avain
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`;
        const geoResponse = await fetch(geoUrl); // Tehdään HTTP GET -pyyntö geokoodaus-URL:iin
        const geoData = await geoResponse.json(); 

        if (!geoData || geoData.length === 0) { // Jos geokoodaus ei palauta dataa tai taulukko on tyhjä, ilmoitetaan käyttäjälle ja lopetetaan
            weatherDiv.innerHTML = "Kaupunkia ei löytynyt.";
            return;
        }

        const lat = geoData[0].lat; // Otetaan ensimmäisen tuloksen leveysaste
        const lon = geoData[0].lon; // Otetaan ensimmäisen tuloksen pituusaste
        const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const weatherResponse = await fetch(weatherUrl); // Tehdään HTTP GET -pyyntö sää-URL:iin
        const weatherData = await weatherResponse.json(); // Parsitaan säävastaus JSON-muotoon

        // Näytetään haettu säädata käyttäjälle    
        weatherDiv.innerHTML = `
            <p><b>Kaupunki:</b> ${city}</p>
            <p><b>Lämpötila:</b> ${weatherData.current.temp} °C</p>
            <p><b>Pilvisyys:</b> ${weatherData.current.clouds} %</p>
            <p><b>Ilmankosteus:</b> ${weatherData.current.humidity} %</p>
        `;
    }

    btnSaa.addEventListener("click", () => loadWeather(citySelect.value)); // Liitetään tapahtumankuuntelija säänapille
    citySelect.addEventListener("change", () => loadWeather(citySelect.value));// Liitetään tapahtumankuuntelija pudotusvalikkoon
    searchBtn.addEventListener("click", () => loadWeather(citySearch.value));// Liitetään tapahtumankuuntelija hakupainikkeeseen

});
