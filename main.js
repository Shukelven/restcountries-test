const flag = document.querySelector('#flag');
const countryName = document.querySelector('#country-name');
const inputName = document.querySelector('#name-search');
const capital = document.querySelector('#capital');
const region = document.querySelector('#region');
const population = document.querySelector('#population');
const languages = document.querySelector('#languages-list');

//H3 TITLES
const capitalTitle = document.querySelector('#capital-title');
const regionTitle = document.querySelector('#region-title');
const languagesTitle = document.querySelector('#languages-title');
const populationTitle = document.querySelector('#population-title');

let map = L.map('map').setView([0, 0], 1);

    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=ocfT0w5bNvmcGXkbDdBR', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);

let marker = L.marker([0, 0], {opacity: 0.0}).addTo(map);


async function SearchByName() {

    const response = await fetch(`https://restcountries.eu/rest/v2/name/${inputName.value}`);

    const data = await response.json();
    console.log(data);

    let lat = data[0].latlng[0];
    let lng = data[0].latlng[1];

    //UPDATE DOM
    const langs = data[0].languages.map((lang) => {
        return lang.name;
    });

    //TITLES
    capitalTitle.textContent = 'Capital';
    regionTitle.textContent = 'Region';
    populationTitle.textContent = 'Population';
    languagesTitle.textContent = 'Languages';
    
    //PARAGRAPHS
    flag.src = data[0].flag;
    countryName.textContent = data[0].name;
    capital.textContent = data[0].capital;
    region.textContent = data[0].region;
    population.textContent = NumberFormatter(data[0].population);

    // Erase the languages text from last country
    languages.innerHTML = '';

    //Create a list item for each language of the country
    //and append it to the unordered list
    langs.forEach(language => {
        const listItem = document.createElement('li');
        listItem.textContent = language;
        languages.appendChild(listItem);
    });

    //MAP
    map.setView([lat, lng], 5);
    marker.setLatLng([lat, lng]);
    marker.setOpacity(1);
    
}

inputName.addEventListener("keyup", (e) => {
    if(e.keyCode == 13) {

        SearchByName();

        // console.log(inputName.value);
        inputName.value = '';
    }
})

//Function to format numbers with commas
function NumberFormatter(num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }