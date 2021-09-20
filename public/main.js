// Foursquare API Info
const clientId = 'BBTM3S1WQVRCSD3Y12PF1IIX23FTEAILWFLRVNYMVMGHS0TN';
const clientSecret = 'KSLQAXO54M4GD4I3D5VJFTLP1L3HLLVKNE4SPSFBEBU03IQT';
const credentials = `client_id=${clientId}&client_secret=${clientSecret}`;
const url = 'https://api.foursquare.com/v2/venues/';

// OpenWeather Info
const openWeatherKey = '26f2ba634ee57d431ea10b804ada3bff';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"), $("#venue5"), $("#venue6"), $("#venue7")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getDate = () => {
  const d = new Date();
  const year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  ++month;
  if (month < 10)
    return `${year}0${month}${day}`
}

// Add AJAX functions here:
let limit = 10;

const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url}explore?near=${city}&limit=${limit}&${credentials}&v=${getDate()}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok){
      const json = await response.json();
      const venues = await json.response.groups[0].items.map(key => key.venue);
      venues.sort(() => 0.5 - Math.random());
      return venues
    }

    throw new Error('Request failed.')

  } catch (error){
    console.log(error);
  }
}

// const getVenuePhotos = async (venues) => {
//   console.log(venues);
//   const venueIds = await venues.map(venue => venue.id);
//   console.log(venueIds);

//   for (let i=0; i<venueIds.length; ++i){
//     try {
//       const response = await fetch(`${url}${venueIds[i]}/photos?limit=1&${credentials}&v=${getDate()}`);
//       if (response.ok){
//         let json = await response.json();
//         let image = await json.response.photos.items[0];
//         let imageURL = `${image.prefix}300${image.suffix}`
//         venues[i].photos = imageURL;
//         if (i === venues.length-1)
//           console.log(venues);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
  

const getForecast = async () => {
  const query = $input.val();
  const urlToFetch = `${weatherUrl}?q=${query}&appid=${openWeatherKey}`

  try {
    const response = await fetch(urlToFetch);
    if (response.ok){
      const json = await response.json();
      return json;
    }

    throw new Error('Request failed.')
  } catch (error){
    console.log(error);
  }
}

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  const weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues()
    .then(venues => {
      renderVenues(venues)
    })
  getVenues()
    .then(venues => {
      getVenuePhotos(venues)
    });
  getForecast()
    .then(forecast => {
      renderForecast(forecast)
    })
  return false;
}

$submit.click(executeSearch)